// Administration surface — README §9.8.
//
// Structural and role management is admin-gated. Membership, admin, and
// reviewer roles are independent; the required approval score is configurable.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, asAnon, get, post, put, patch, del, createScope, scopeIdByPath, writeDoc,
} = require("./helpers")
setupTestSchema("admin")

let ctx, brainsId, klasseId

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("an admin adds and removes a member", async () => {
  const add = await post(ctx, `/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "anna" })
  assert.equal(add.statusCode, 201)

  const rm = await del(ctx, `/database/scopes/${klasseId}/members/anna`, asRootAdmin())
  assert.equal(rm.statusCode, 200)

  const row = await ctx.pool.query(
    `SELECT is_member FROM "${ctx.schema}".memberships WHERE scope_id = $1 AND person_ref = 'anna'`,
    [klasseId]
  )
  // Either removed entirely, or is_member cleared.
  assert.ok(row.rowCount === 0 || row.rows[0].is_member === false)
})

test("removing a member physically deletes their personal leaf and its docs", async () => {
  // anna joins, writes a private doc (creating her leaf + a version), then is
  // removed → her leaf and its content must be gone.
  await post(ctx, `/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "carla" })
  await put(ctx, `/database/scopes/${klasseId}/docs?path=notes.json`, asPerson("carla"), { data: { x: 1 } })

  const before = await ctx.pool.query(
    `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id = $1 AND name = 'carla'`, [klasseId])
  assert.equal(before.rowCount, 1, "leaf exists before removal")
  const leafId = before.rows[0].id
  const docsBefore = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".versions WHERE scope_id = $1`, [leafId])
  assert.equal(docsBefore.rows[0].n, 1, "leaf has the doc")

  const rm = await del(ctx, `/database/scopes/${klasseId}/members/carla`, asRootAdmin())
  assert.equal(rm.statusCode, 200)

  const leafAfter = await ctx.pool.query(
    `SELECT id FROM "${ctx.schema}".scopes WHERE id = $1`, [leafId])
  assert.equal(leafAfter.rowCount, 0, "leaf scope is gone")
  const docsAfter = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".versions WHERE scope_id = $1`, [leafId])
  assert.equal(docsAfter.rows[0].n, 0, "leaf versions are gone")
  const closureAfter = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".scope_closure WHERE descendant_id = $1 OR ancestor_id = $1`, [leafId])
  assert.equal(closureAfter.rows[0].n, 0, "closure rows are gone")
})

test("granting a reviewer role is independent of membership", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/reviewers`, asRootAdmin(), { personRef: "meier", score: 4 })
  assert.equal(res.statusCode, 200)

  const row = await ctx.pool.query(
    `SELECT is_member, reviewer_score FROM "${ctx.schema}".memberships
      WHERE scope_id = $1 AND person_ref = 'meier'`,
    [klasseId]
  )
  assert.equal(row.rows[0].reviewer_score, 4)
  assert.equal(row.rows[0].is_member, false) // reviewer only, not a member
})

test("the required approval score is configurable", async () => {
  const res = await patch(ctx, `/database/scopes/${klasseId}`, asRootAdmin(), { requiredApprovalScore: 7 })
  assert.equal(res.statusCode, 200)
  const meta = await get(ctx, `/database/scopes/${klasseId}`, asRootAdmin())
  assert.equal(meta.json().requiredApprovalScore, 7)
})

test("a non-admin cannot manage a scope → 403", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/reviewers`, asPerson("nobody"), { personRef: "x", score: 1 })
  assert.equal(res.statusCode, 403)
})

test("an anonymous caller cannot manage a scope → 401", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/scopes`, asAnon(), { name: "x" })
  assert.equal(res.statusCode, 401)
})

test("self-enrollment: a caller may add themselves without being admin", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/members`, asPerson("selfie"), { personRef: "selfie" })
  assert.equal(res.statusCode, 201)
})

test("a scope can be renamed; path reflects it, docs are untouched", async () => {
  // Seed a doc so we can prove the rename doesn't disturb content.
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'x.json', 1, 'committed', false, '{"a":1}'::jsonb, '{}'::jsonb, 'seed')`,
    [klasseId]
  )
  const res = await patch(ctx, `/database/scopes/${klasseId}`, asRootAdmin(), { name: "klasse-8b" })
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().name, "klasse-8b")

  const meta = await get(ctx, `/database/scopes/${klasseId}`, asRootAdmin())
  assert.equal(meta.json().name, "electra/content/apps/klasse-8b")

  const doc = await ctx.pool.query(
    `SELECT data FROM "${ctx.schema}".versions WHERE scope_id = $1 AND doc_path = 'x.json'`,
    [klasseId]
  )
  assert.equal(doc.rows[0].data.a, 1) // content survived the rename
})

test("renaming onto a sibling's name → 409 conflict", async () => {
  await createScope(ctx, brainsId, "sibling")
  const res = await patch(ctx, `/database/scopes/${klasseId}`, asRootAdmin(), { name: "sibling" })
  assert.equal(res.statusCode, 409)
})

test("renaming a personal leaf is refused → 409", async () => {
  // The leaf owner is admin of their own leaf, so they pass the admin gate —
  // and then hit the 'a personal leaf cannot be renamed' guard.
  await post(ctx, `/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "leafowner" })
  // the leaf is provisioned lazily on first write, so write once to create it
  await writeDoc(ctx, klasseId, "note.json", asPerson("leafowner"), { data: { v: 1 } })
  const leaf = await ctx.pool.query(
    `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id = $1 AND name = 'leafowner'`,
    [klasseId]
  )
  const res = await patch(ctx, `/database/scopes/${leaf.rows[0].id}`, asPerson("leafowner"), { name: "renamed" })
  assert.equal(res.statusCode, 409)
})
