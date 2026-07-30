// Membership model — README §3.2, §4.
//
// Membership is now EXPLICIT: adding a member writes an is_member row ON the
// scope itself. Read is transitive upward (a member reads the scope and every
// ancestor); write requires explicit membership at the operating scope.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, writeDoc, createScope, addMember, seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("membership")

let ctx
let electraId, contentId, appsId, unrelatedId, klasseId, klasse9bId

before(async () => {
  ctx = await newTestSchema()
  electraId = await scopeIdByPath(ctx.pool, ctx.schema, "electra")
  contentId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content")
  appsId    = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  // an unrelated branch anna has no membership in (directly under content)
  unrelatedId = await createScope(ctx, contentId, "unrelated")

  klasseId   = await createScope(ctx, appsId, "klasse8a")
  klasse9bId = await createScope(ctx, appsId, "klasse9b")

  await addMember(ctx, klasseId, "anna")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("addMember writes an explicit is_member row on the scope", async () => {
  const row = await ctx.pool.query(
    `SELECT is_member FROM "${ctx.schema}".memberships
      WHERE scope_id = $1 AND person_ref = 'anna'`,
    [klasseId]
  )
  assert.equal(row.rowCount, 1)
  assert.equal(row.rows[0].is_member, true)
})

test("anna reads her own scope klasse8a", async () => {
  await seedSharedDoc(ctx, klasseId, "doc.json", { src: "klasse" })
  const res = await get(ctx, `/database/scopes/${klasseId}/docs?path=doc.json`, asPerson("anna"))
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.src, "klasse")
})

test("read is transitive upward: anna reads apps, content, and root", async () => {
  for (const id of [appsId, contentId, electraId]) {
    const res = await get(ctx, `/database/scopes/${id}/docs`, asPerson("anna"))
    assert.equal(res.statusCode, 200)
  }
})

test("a sibling scope (klasse9b) is not readable — 403", async () => {
  const res = await get(ctx, `/database/scopes/${klasse9bId}/docs`, asPerson("anna"))
  assert.equal(res.statusCode, 403)
})

test("an unrelated branch (content/unrelated) is not readable — 403", async () => {
  const res = await get(ctx, `/database/scopes/${unrelatedId}/docs`, asPerson("anna"))
  assert.equal(res.statusCode, 403)
})

test("write requires explicit membership: anna cannot write at an ancestor she only reads", async () => {
  // anna is a member of klasse8a → reads apps transitively, but is NOT an
  // explicit member of apps, so writing there is refused.
  const res = await writeDoc(ctx, appsId, "x.json", asPerson("anna"), { data: { a: 1 } })
  assert.equal(res.statusCode, 403)
})

test("a foreign leaf is invisible: anna never sees bob's override", async () => {
  await addMember(ctx, klasseId, "bob")
  await writeDoc(ctx, klasseId, "personal/bob.json", asPerson("bob"), { data: { owner: "bob" } })
  const res = await get(ctx, `/database/scopes/${klasseId}/docs?path=personal/bob.json`, asPerson("anna"))
  assert.equal(res.statusCode, 404)
})

test("multiple explicit memberships: anna may be a member of two branches", async () => {
  await addMember(ctx, klasse9bId, "anna")
  // Now she writes in both — each lands in its own leaf.
  const a = await writeDoc(ctx, klasseId, "note.json", asPerson("anna"), { data: { in: "8a" } })
  const b = await writeDoc(ctx, klasse9bId, "note.json", asPerson("anna"), { data: { in: "9b" } })
  assert.equal(a.statusCode, 201)
  assert.equal(b.statusCode, 201)

  const rows = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".memberships
      WHERE person_ref = 'anna' AND is_member = true`
  )
  // klasse8a + klasse9b + her two leaves = 4 explicit member rows.
  assert.equal(rows.rows[0].n, 4)
})
