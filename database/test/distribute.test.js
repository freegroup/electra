// Distribute — horizontal delivery to chosen scopes. README §6.16.
//
// A member hands one of their own versions to several target scopes. Each
// target decides on its own: an empty slot or the caller's own work commits
// directly; overwriting someone else's active version needs review.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, post, put, get, readDoc, writeDoc, createScope, addMember,
  seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("distribute")

let ctx, brainsId, groupA, groupB

const distribute = (sourceRef, path, person, targetScopeRefs, version) =>
  post(ctx, `/database/scopes/${sourceRef}/docs/distribute`, asPerson(person),
    { path, targetScopeRefs, ...(version ? { version } : {}) })

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

test("distributing into an empty target commits directly", async () => {
  await writeDoc(ctx, groupA, "sheet.json", asPerson("anna"), { data: { n: 1 } })
  const res = await distribute(groupA, "sheet.json", "anna", [String(groupB)], 1)
  assert.equal(res.statusCode, 200, res.body)
  const d = res.json().distributions[0]
  assert.equal(d.targetScopeRef, String(groupB))
  assert.equal(d.status, "committed")

  // Visible in B now.
  const seen = await readDoc(ctx, groupB, "sheet.json", asPerson("anna"))
  assert.equal(seen.json().data.n, 1)
})

test("the path is unchanged in the target", async () => {
  await writeDoc(ctx, groupA, "keep/name.json", asPerson("anna"), { data: {} })
  const res = await distribute(groupA, "keep/name.json", "anna", [String(groupB)], 1)
  assert.equal(res.json().distributions[0].status, "committed")
  const seen = await readDoc(ctx, groupB, "keep/name.json", asPerson("anna"))
  assert.equal(seen.json().path, "keep/name.json")
})

test("re-distributing over one's own version commits again", async () => {
  await writeDoc(ctx, groupA, "mine.json", asPerson("anna"), { data: { rev: 1 } })
  await distribute(groupA, "mine.json", "anna", [String(groupB)], 1)

  // anna updates her A copy and distributes again; B's active version is hers.
  const cur = (await readDoc(ctx, groupA, "mine.json", asPerson("anna"))).json()
  await writeDoc(ctx, groupA, "mine.json", asPerson("anna"), { ...cur, data: { rev: 2 } })
  const res = await distribute(groupA, "mine.json", "anna", [String(groupB)], cur.version + 1)
  assert.equal(res.json().distributions[0].status, "committed")
  assert.equal((await readDoc(ctx, groupB, "mine.json", asPerson("anna"))).json().data.rev, 2)
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

test("distributing into a scope the caller is not a member of → 403", async () => {
  const groupC = await createScope(ctx, brainsId, "groupC", { requiredApprovalScore: 0 })
  await writeDoc(ctx, groupA, "x.json", asPerson("anna"), { data: {} })
  const res = await distribute(groupA, "x.json", "anna", [String(groupC)], 1)
  assert.equal(res.statusCode, 403)
})

test("one call can target several scopes at once", async () => {
  const groupD = await createScope(ctx, brainsId, "groupD", { requiredApprovalScore: 0 })
  await addMember(ctx, groupD, "anna")
  await writeDoc(ctx, groupA, "multi.json", asPerson("anna"), { data: { m: true } })

  const res = await distribute(groupA, "multi.json", "anna", [String(groupB), String(groupD)], 1)
  assert.equal(res.json().distributions.length, 2)
  assert.ok(res.json().distributions.every((d) => d.status === "committed"))
})

test("blobs are copied into the distributed entry", async () => {
  const TINY_PNG = Buffer.from(
    "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D4944415478DA6364000100000500010D0A2DB40000000049454E44AE426082",
    "hex"
  )
  await writeDoc(ctx, groupA, "withblob.json", asPerson("anna"), { data: {} })
  await put(ctx, `/database/scopes/${groupA}/blobs/preview?path=withblob.json`,
    { ...asPerson("anna"), "content-type": "image/png" }, TINY_PNG)

  await distribute(groupA, "withblob.json", "anna", [String(groupB)], 1)

  const blob = await get(ctx, `/database/scopes/${groupB}/blobs/preview?path=withblob.json`, asPerson("anna"))
  assert.equal(blob.statusCode, 200)
  assert.deepEqual(blob.rawPayload, TINY_PNG)
})
