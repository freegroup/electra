// Transitive membership tests — see README §4.
//
// Anna has an explicit membership row only on her own leaf, deep in the tree.
// She should count as a member of every ancestor scope through the closure,
// but not as a member of sibling leaves or unrelated branches.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
} = require("./helpers")
setupTestSchema("membership")

let ctx
let electraId, appsId, brainsId, shapesId, klasseId, klasse9bId

async function post(url, headers, payload) {
  return ctx.fastify.inject({ method: "POST", url, headers, payload })
}
async function put(url, headers, payload) {
  return ctx.fastify.inject({ method: "PUT", url, headers, payload })
}
async function get(url, headers) {
  return ctx.fastify.inject({ method: "GET", url, headers })
}

async function scopeIdByPath(pathString) {
  const parts = pathString.split("/").filter(Boolean)
  let parentId = null
  for (const p of parts) {
    const res = parentId === null
      ? await ctx.pool.query(
          `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id IS NULL AND name = $1`, [p])
      : await ctx.pool.query(
          `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id = $1 AND name = $2`,
          [parentId, p])
    if (res.rowCount === 0) return null
    parentId = res.rows[0].id
  }
  return parentId
}

before(async () => {
  ctx = await newTestSchema()
  electraId = await scopeIdByPath("electra")
  appsId    = await scopeIdByPath("electra/apps")
  brainsId  = await scopeIdByPath("electra/apps/brains")
  shapesId  = await scopeIdByPath("electra/apps/shapes")

  // Build: apps/brains/klasse8a and apps/brains/klasse9b
  const k8a = await post(
    `/database/scopes/${brainsId}/children`,
    asRootAdmin(),
    { name: "klasse8a", requiredApprovalScore: 0 }
  )
  klasseId = k8a.json().id
  const k9b = await post(
    `/database/scopes/${brainsId}/children`,
    asRootAdmin(),
    { name: "klasse9b", requiredApprovalScore: 0 }
  )
  klasse9bId = k9b.json().id

  // Anna is added as member of klasse8a — this creates her leaf and
  // one membership row on that leaf.
  await post(`/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "anna" })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("addMember creates exactly one membership row (on the leaf)", async () => {
  const rows = await ctx.pool.query(
    `SELECT s.name AS scope_name
     FROM "${ctx.schema}".memberships m
     JOIN "${ctx.schema}".scopes s ON s.id = m.scope_id
     WHERE m.person_ref = 'anna'`
  )
  assert.equal(rows.rowCount, 1)
  assert.equal(rows.rows[0].scope_name, "anna")
})

test("anna can read from klasse8a (direct ancestor of her leaf)", async () => {
  // seed a doc on klasse8a
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'doc.json', 1, 'committed', false, '{"src":"klasse"}'::jsonb, '{}'::jsonb, 'admin')`,
    [klasseId]
  )
  const res = await get(
    `/database/scopes/${klasseId}/docs/doc.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.src, "klasse")
})

test("anna can read from apps/brains (transitive ancestor)", async () => {
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'inbrains.json', 1, 'committed', false, '{"src":"brains"}'::jsonb, '{}'::jsonb, 'admin')`,
    [brainsId]
  )
  const res = await get(
    `/database/scopes/${brainsId}/docs/inbrains.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.src, "brains")
})

test("anna can read from apps (transitive, 2 levels up)", async () => {
  const res = await get(
    `/database/scopes/${appsId}/docs`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 200)
})

test("anna can read from root electra (transitive, all the way up)", async () => {
  const res = await get(
    `/database/scopes/${electraId}/docs`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 200)
})

test("anna is NOT a member of a sibling scope (klasse9b) — 403", async () => {
  const res = await get(
    `/database/scopes/${klasse9bId}/docs`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 403)
})

test("anna is NOT a member of an unrelated branch (apps/shapes) — 403", async () => {
  const res = await get(
    `/database/scopes/${shapesId}/docs`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 403)
})

test("anna cannot see bob's leaf (both under klasse8a) — foreign leaf invisible", async () => {
  await post(`/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "bob" })
  // Bob writes something into his leaf.
  await put(
    `/database/scopes/${klasseId}/docs/personal/bob-file.json`,
    asPerson("bob"),
    { data: { owner: "bob" } }
  )
  // Anna queries her klasse8a view — should NOT see bob's file (walk-up
  // does not descend into siblings).
  const res = await get(
    `/database/scopes/${klasseId}/docs/personal/bob-file.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 404)
})
