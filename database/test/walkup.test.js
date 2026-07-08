// Walk-up over the auto-provisioned + test-created scope tree.
// Structure:
//   electra                            (root)
//   ├── users
//   ├── apps
//   │   ├── brains
//   │   │   └── klasse8a               (created by this test)
//   │   ├── shapes
//   │   └── docs

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
} = require("./helpers")
setupTestSchema("walkup")

let ctx
let electraId, brainsId, klasseId

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
  brainsId = await scopeIdByPath("electra/apps/brains")

  // Create klasse8a under apps/brains.
  const c = await post(
    `/database/scopes/${brainsId}/children`,
    asRootAdmin(),
    { name: "klasse8a", requiredApprovalScore: 0 }
  )
  klasseId = c.json().id

  // Add anna as member of klasse8a (auto-provisions her leaf).
  await post(`/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "anna" })

  // Add root admin as an explicit member of klasse8a too — needed to have a
  // leaf there for private overrides.
  await post(`/database/scopes/${klasseId}/members`, asRootAdmin(),
    { personRef: require("./helpers").ROOT_ADMIN_HASH })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("get returns 404 when path exists nowhere", async () => {
  const res = await get(
    `/database/scopes/${klasseId}/docs/math/nothing.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 404)
})

test("walk-up: version seeded at apps/brains is visible from klasse8a", async () => {
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'math/quadratic.json', 1, 'committed', false,
             '{"src":"brains"}'::jsonb, '{}'::jsonb, 'admin')`,
    [brainsId]
  )

  const res = await get(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().data.src, "brains")
  assert.equal(res.json().scope, "electra/apps/brains")
})

test("walk-up: klasse8a version shadows apps/brains version", async () => {
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'math/quadratic.json', 1, 'committed', false,
             '{"src":"klasse"}'::jsonb, '{}'::jsonb, 'admin')`,
    [klasseId]
  )

  const res = await get(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.src, "klasse")
  assert.equal(res.json().scope, "electra/apps/brains/klasse8a")
})

test("walk-up: anna's own leaf shadows klasse8a", async () => {
  const putRes = await put(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna"),
    { data: { src: "anna" } }
  )
  assert.equal(putRes.statusCode, 201, putRes.body)

  const res = await get(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 200)
  const body = res.json()
  assert.equal(body.data.src, "anna")
  assert.equal(body.scope, "electra/apps/brains/klasse8a/anna")
  assert.equal(body.version, 1)
})

test("anna cannot see root admin's leaf overrides", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/private/for-admin.json`,
    asRootAdmin(),
    { data: { secret: true } }
  )
  const res = await get(
    `/database/scopes/${klasseId}/docs/private/for-admin.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 404)
})
