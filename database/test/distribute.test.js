// Distribute — horizontal delivery to chosen scopes. README §6.16.
//
// A member hands one of their own versions to several target scopes. Distribute
// applies the SAME review rules as promote in every target: a distribution is
// never immediately visible unless the target auto-approves
// (required_approval_score = 0) or the distributor is a reviewer there whose own
// vote reaches the threshold (§6.6 self-approval). Otherwise it lands pending in
// that target's review queue.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, post, put, get, readDoc, writeDoc, createScope, addMember,
  seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("distribute")

let ctx, brainsId, groupA, groupB

const distribute = (sourceRef, path, person, targetScopeRefs, version, description) =>
  post(ctx, `/database/scopes/${sourceRef}/docs/distribute`, asPerson(person),
    { path, targetScopeRefs, ...(version ? { version } : {}), ...(description ? { description } : {}) })
const setReviewer = (scopeId, personRef, score) =>
  post(ctx, `/database/scopes/${scopeId}/reviewers`, asRootAdmin(), { personRef, score })
const zeroScope = (name) => createScope(ctx, brainsId, name, { requiredApprovalScore: 0 })

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  groupA = await createScope(ctx, brainsId, "groupA", { requiredApprovalScore: 5 })
  groupB = await createScope(ctx, brainsId, "groupB", { requiredApprovalScore: 5 })
  // anna is a member of both groups; she works in A and distributes to B.
  await addMember(ctx, groupA, "anna")
  await addMember(ctx, groupB, "anna")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("distributing into a review-required target stays pending (never auto-commits)", async () => {
  // groupB requires approval and anna is not a reviewer there → even an empty
  // slot must NOT go live; it enters review.
  await writeDoc(ctx, groupA, "sheet.json", asPerson("anna"), { data: { n: 1 } })
  const res = await distribute(groupA, "sheet.json", "anna", [String(groupB)], 1)
  assert.equal(res.statusCode, 200, res.body)
  const d = res.json().distributions[0]
  assert.equal(d.targetScopeRef, String(groupB))
  assert.equal(d.status, "pending")
  assert.ok(d.pendingVersion)

  // Nothing committed in B yet.
  const committed = await ctx.pool.query(
    `SELECT count(*)::int AS c FROM "${ctx.schema}".versions
      WHERE scope_id = $1 AND doc_path = 'sheet.json' AND status = 'committed'`,
    [groupB]
  )
  assert.equal(committed.rows[0].c, 0)
})

test("a target with required_approval_score = 0 commits immediately", async () => {
  const zero = await zeroScope("zeroA")
  await addMember(ctx, zero, "anna")
  await writeDoc(ctx, groupA, "z.json", asPerson("anna"), { data: { n: 7 } })
  const res = await distribute(groupA, "z.json", "anna", [String(zero)], 1)
  assert.equal(res.json().distributions[0].status, "committed")
  assert.equal((await readDoc(ctx, zero, "z.json", asPerson("anna"))).json().data.n, 7)
})

test("the path is unchanged in the target", async () => {
  const zero = await zeroScope("zeroPath")
  await addMember(ctx, zero, "anna")
  await writeDoc(ctx, groupA, "keep/name.json", asPerson("anna"), { data: {} })
  const res = await distribute(groupA, "keep/name.json", "anna", [String(zero)], 1)
  assert.equal(res.json().distributions[0].status, "committed")
  const seen = await readDoc(ctx, zero, "keep/name.json", asPerson("anna"))
  assert.equal(seen.json().path, "keep/name.json")
})

test("self-approval: a distributor who is a reviewer with enough points commits immediately", async () => {
  const g = await createScope(ctx, brainsId, "selfok", { requiredApprovalScore: 5 })
  await addMember(ctx, g, "anna")
  await setReviewer(g, "anna", 5)
  await writeDoc(ctx, groupA, "s.json", asPerson("anna"), { data: { ok: true } })
  const res = await distribute(groupA, "s.json", "anna", [String(g)], 1)
  assert.equal(res.json().distributions[0].status, "committed")
  assert.equal((await readDoc(ctx, g, "s.json", asPerson("anna"))).json().data.ok, true)
})

test("self-approval below the threshold stays pending", async () => {
  const g = await createScope(ctx, brainsId, "selflow", { requiredApprovalScore: 5 })
  await addMember(ctx, g, "anna")
  await setReviewer(g, "anna", 3)
  await writeDoc(ctx, groupA, "sl.json", asPerson("anna"), { data: {} })
  const res = await distribute(groupA, "sl.json", "anna", [String(g)], 1)
  assert.equal(res.json().distributions[0].status, "pending")
})

test("distributing over someone else's active version needs review (pending)", async () => {
  // bob owns the active version in B.
  await addMember(ctx, groupB, "bob")
  await seedSharedDoc(ctx, groupB, "contested.json", { by: "bob" }, "bob")

  await writeDoc(ctx, groupA, "contested.json", asPerson("anna"), { data: { by: "anna" } })
  const res = await distribute(groupA, "contested.json", "anna", [String(groupB)], 1)
  const d = res.json().distributions[0]
  assert.equal(d.status, "pending")
  assert.ok(d.pendingVersion)

  // bob still sees his version until the pending is approved.
  assert.equal((await readDoc(ctx, groupB, "contested.json", asPerson("bob"))).json().data.by, "bob")
})

test("re-distributing over a foreign version supersedes the caller's own prior pending (last wins)", async () => {
  // carla owns the active version in B; anna needs review to overwrite it.
  await addMember(ctx, groupB, "carla")
  await seedSharedDoc(ctx, groupB, "twice.json", { by: "carla" }, "carla")

  await writeDoc(ctx, groupA, "twice.json", asPerson("anna"), { data: { rev: 1 } })
  const first = await distribute(groupA, "twice.json", "anna", [String(groupB)], 1)
  assert.equal(first.statusCode, 200, first.body)
  const firstPending = first.json().distributions[0].pendingVersion
  assert.ok(firstPending)

  // anna revises and distributes again before any reviewer acts. This must NOT
  // 500 on the one-pending-per-author index — the second supersedes the first.
  const cur = (await readDoc(ctx, groupA, "twice.json", asPerson("anna"))).json()
  await writeDoc(ctx, groupA, "twice.json", asPerson("anna"), { ...cur, data: { rev: 2 } })
  const second = await distribute(groupA, "twice.json", "anna", [String(groupB)], cur.version + 1)
  assert.equal(second.statusCode, 200, second.body)
  const secondPending = second.json().distributions[0].pendingVersion
  assert.ok(secondPending && secondPending !== firstPending)

  // Exactly one open pending from anna remains in B; the first was rejected.
  const rows = await ctx.pool.query(
    `SELECT version, status FROM "${ctx.schema}".versions
      WHERE scope_id = $1 AND doc_path = 'twice.json' AND author = 'anna'
      ORDER BY version`,
    [groupB]
  )
  const byStatus = rows.rows.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {})
  assert.equal(byStatus.pending, 1, "only the newest distribution is pending")
  assert.equal(byStatus.rejected, 1, "the superseded distribution is rejected")
  const stillPending = rows.rows.find((r) => r.status === "pending")
  assert.equal(stillPending.version, secondPending, "the surviving pending is the latest")
})

test("distributing into a scope the caller is not a member of → 403", async () => {
  const groupC = await zeroScope("groupC")
  await writeDoc(ctx, groupA, "x.json", asPerson("anna"), { data: {} })
  const res = await distribute(groupA, "x.json", "anna", [String(groupC)], 1)
  assert.equal(res.statusCode, 403)
})

test("one call targets several scopes, each deciding on its own", async () => {
  const zero = await zeroScope("multizero")
  await addMember(ctx, zero, "anna")
  await writeDoc(ctx, groupA, "multi.json", asPerson("anna"), { data: { m: true } })

  // groupB requires review (anna is no reviewer there) → pending;
  // the score-0 scope → committed at once.
  const res = await distribute(groupA, "multi.json", "anna", [String(groupB), String(zero)], 1)
  const ds = res.json().distributions
  assert.equal(ds.length, 2)
  const byRef = Object.fromEntries(ds.map((d) => [d.targetScopeRef, d.status]))
  assert.equal(byRef[String(groupB)], "pending")
  assert.equal(byRef[String(zero)], "committed")
})

test("the reviewer note travels to the target's review queue", async () => {
  const g = await createScope(ctx, brainsId, "noted", { requiredApprovalScore: 5 })
  await addMember(ctx, g, "anna")
  await writeDoc(ctx, groupA, "noted.json", asPerson("anna"), { data: {} })
  const res = await distribute(groupA, "noted.json", "anna", [String(g)], 1, "please check the gate")
  assert.equal(res.json().distributions[0].status, "pending")

  const row = await ctx.pool.query(
    `SELECT meta FROM "${ctx.schema}".versions
      WHERE scope_id = $1 AND doc_path = 'noted.json' AND status = 'pending'`,
    [g]
  )
  assert.equal(row.rows[0].meta._review.description, "please check the gate")
})

test("blobs are copied into the distributed entry", async () => {
  const TINY_PNG = Buffer.from(
    "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D4944415478DA6364000100000500010D0A2DB40000000049454E44AE426082",
    "hex"
  )
  const zero = await zeroScope("blobzero")
  await addMember(ctx, zero, "anna")
  await writeDoc(ctx, groupA, "withblob.json", asPerson("anna"), { data: {} })
  await put(ctx, `/database/scopes/${groupA}/blobs/preview?path=withblob.json`,
    { ...asPerson("anna"), "content-type": "image/png" }, TINY_PNG)

  await distribute(groupA, "withblob.json", "anna", [String(zero)], 1)

  const blob = await get(ctx, `/database/scopes/${zero}/blobs/preview?path=withblob.json`, asPerson("anna"))
  assert.equal(blob.statusCode, 200)
  assert.deepEqual(blob.rawPayload, TINY_PNG)
})
