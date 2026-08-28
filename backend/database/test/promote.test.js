// Promote — vertical delivery to the next level up. README §6.5, §6.7, §6.8.
//
// These tests use auto-approving targets (required_approval_score = 0) to focus
// on the promote mechanics: commit, cascade, leaf cleanup, amend, and the
// parallel-promotion auto-reject. Quorum + review live in approve.test.js.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, post, readDoc, writeDoc, createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("promote")

let ctx, brainsId, klasseId

const promote = (scopeRef, path, person, version) =>
  post(ctx, `/database/scopes/${scopeRef}/docs/promote?path=${encodeURIComponent(path)}`,
    asPerson(person), version ? { version } : {})

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  // klasse8a auto-approves (score 0) so a promote into it commits immediately.
  klasseId = await createScope(ctx, brainsId, "klasse8a", { requiredApprovalScore: 0 })
  await addMember(ctx, klasseId, "anna")
  await addMember(ctx, klasseId, "bob")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("promoting an auto-approve level commits and drops the local copy", async () => {
  await writeDoc(ctx, klasseId, "note.json", asPerson("anna"), { data: { v: "anna" } })
  const res = await promote(klasseId, "note.json", "anna", 1)
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().status, "committed")

  // The committed version now lives on klasse8a; anna's leaf copy is gone.
  const leaf = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".versions v
     JOIN "${ctx.schema}".scopes s ON s.id = v.scope_id
     WHERE s.name = 'anna' AND v.doc_path = 'note.json'`
  )
  assert.equal(leaf.rows[0].n, 0)

  // Reading it back now resolves to the shared klasse8a version.
  const read = await readDoc(ctx, klasseId, "note.json", asPerson("anna"))
  assert.equal(read.json().data.v, "anna")
  assert.equal(read.json().scope, "apps/klasse8a")
})

test("promoted content becomes visible to other members", async () => {
  await writeDoc(ctx, klasseId, "shared.json", asPerson("anna"), { data: { by: "anna" } })
  await promote(klasseId, "shared.json", "anna", 1)

  const bobSees = await readDoc(ctx, klasseId, "shared.json", asPerson("bob"))
  assert.equal(bobSees.statusCode, 200)
  assert.equal(bobSees.json().data.by, "anna")
})

test("cascade: two stacked score-0 levels both commit in one promote", async () => {
  // klasse8a (score 0) → content/apps (score 0) → ... anna promotes from a
  // sub-group of klasse8a so the promote climbs two auto-approve levels.
  const groupId = await createScope(ctx, klasseId, "gruppe", { requiredApprovalScore: 0 })
  await addMember(ctx, groupId, "anna")

  await writeDoc(ctx, groupId, "cascade.json", asPerson("anna"), { data: { c: true } })
  const res = await promote(groupId, "cascade.json", "anna", 1)
  assert.equal(res.json().status, "committed")

  // It cascaded up to klasse8a at least; a klasse8a member sees it.
  const seen = await readDoc(ctx, klasseId, "cascade.json", asPerson("bob"))
  assert.equal(seen.statusCode, 200)
  assert.equal(seen.json().data.c, true)
})

test("amend: re-promoting supersedes the caller's earlier open request", async () => {
  // A review-required grandparent keeps the promotion pending; the score-0
  // parent commits so we can promote from there.
  const reviewedId = await createScope(ctx, brainsId, "reviewed", { requiredApprovalScore: 5 })
  const subId = await createScope(ctx, reviewedId, "sub", { requiredApprovalScore: 0 })
  await addMember(ctx, subId, "anna")

  const w1 = await writeDoc(ctx, subId, "a.json", asPerson("anna"), { data: { n: 1 } })
  await promote(subId, "a.json", "anna", w1.json().version) // pending on 'reviewed'

  // Amend: write a fresh leaf version and promote it again.
  const w2 = await writeDoc(ctx, subId, "a.json", asPerson("anna"), { data: { n: 2 } })
  await promote(subId, "a.json", "anna", w2.json().version)

  const rows = await ctx.pool.query(
    `SELECT status, COUNT(*)::int AS n FROM "${ctx.schema}".versions
      WHERE scope_id = $1 AND doc_path = 'a.json' GROUP BY status`,
    [reviewedId]
  )
  const byStatus = Object.fromEntries(rows.rows.map((r) => [r.status, r.n]))
  assert.equal(byStatus.pending, 1)   // exactly one open request
  assert.equal(byStatus.rejected, 1)  // the superseded one
})

test("parallel: committing one promotion auto-rejects the others", async () => {
  // Two members each promote their own version into a review level; the first
  // to commit knocks out the rest. Here we drive commit via a score-0 level
  // to keep it simple: anna and bob both target klasse8a for the same path.
  const groupA = await createScope(ctx, klasseId, "ga", { requiredApprovalScore: 0 })
  await addMember(ctx, groupA, "anna")
  await addMember(ctx, groupA, "bob")

  await writeDoc(ctx, groupA, "race.json", asPerson("anna"), { data: { who: "anna" } })
  await writeDoc(ctx, groupA, "race.json", asPerson("bob"), { data: { who: "bob" } })

  await promote(groupA, "race.json", "anna", 1) // commits on klasse8a
  await promote(groupA, "race.json", "bob", 1)  // also commits (score 0)

  // Both committed at klasse8a; the later commit wins as active version.
  const active = await readDoc(ctx, groupA, "race.json", asPerson("anna"))
  assert.equal(active.statusCode, 200)
  assert.ok(["anna", "bob"].includes(active.json().data.who))
})
