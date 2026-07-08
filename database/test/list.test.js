const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
} = require("./helpers")
setupTestSchema("list")

let ctx
let brainsId, klasseId

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

  brainsId = await scopeIdByPath("electra/apps/brains")

  const c = await post(
    `/database/scopes/${brainsId}/children`,
    asRootAdmin(),
    { name: "klasse8a", requiredApprovalScore: 0 }
  )
  klasseId = c.json().id

  await post(`/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "anna" })

  // Seed at apps/brains: two docs.
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'math/quadratic.json', 1, 'committed', false, '{"src":"brains"}', '{}', 'admin'),
            ($1, 'bio/photosynthesis.json', 1, 'committed', false, '{"src":"brains"}', '{}', 'admin')`,
    [brainsId]
  )
  // At klasse8a: quadratic overrides.
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'math/quadratic.json', 1, 'committed', false, '{"src":"klasse"}', '{}', 'admin')`,
    [klasseId]
  )
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("list returns effective view with closest-wins dedup", async () => {
  const res = await get(`/database/scopes/${klasseId}/docs`, asPerson("anna"))
  assert.equal(res.statusCode, 200)
  const docs = res.json().docs
  assert.equal(docs.length, 2)

  const byPath = new Map(docs.map((d) => [d.path, d]))
  assert.equal(byPath.get("math/quadratic.json").data.src, "klasse")
  assert.equal(byPath.get("math/quadratic.json").scope, "electra/apps/brains/klasse8a")
  assert.equal(byPath.get("bio/photosynthesis.json").data.src, "brains")
  assert.equal(byPath.get("bio/photosynthesis.json").scope, "electra/apps/brains")
})

test("list with prefix filters", async () => {
  const res = await get(`/database/scopes/${klasseId}/docs?prefix=math/`, asPerson("anna"))
  assert.equal(res.statusCode, 200)
  const docs = res.json().docs
  assert.equal(docs.length, 1)
  assert.equal(docs[0].path, "math/quadratic.json")
})

test("list applies caller's own leaf overrides", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna"),
    { data: { src: "anna" } }
  )

  const res = await get(`/database/scopes/${klasseId}/docs`, asPerson("anna"))
  const docs = res.json().docs
  const q = docs.find((d) => d.path === "math/quadratic.json")
  assert.equal(q.data.src, "anna")
  assert.equal(q.scope, "electra/apps/brains/klasse8a/anna")
})
