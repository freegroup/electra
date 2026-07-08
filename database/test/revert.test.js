// Revert = physical delete of ALL versions in caller's own leaf for the given
// doc path. See README §6.10.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
  makeKlasseScope,
} = require("./helpers")
setupTestSchema("revert")

let ctx
let klasseId

async function post(url, headers, payload) {
  return ctx.fastify.inject({ method: "POST", url, headers, payload })
}
async function put(url, headers, payload) {
  return ctx.fastify.inject({ method: "PUT", url, headers, payload })
}
async function get(url, headers) {
  return ctx.fastify.inject({ method: "GET", url, headers })
}

before(async () => {
  ctx = await newTestSchema()
  const s = await makeKlasseScope(ctx, ["anna"])
  klasseId = s.klasseId

  // Seed a klasse-level version so anna has something to walk-up to.
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'math/quadratic.json', 1, 'committed', false,
             '{"src":"klasse"}'::jsonb, '{}'::jsonb, 'admin')`,
    [klasseId]
  )
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("revert on path with no local override is a no-op", async () => {
  const res = await post(
    `/database/scopes/${klasseId}/revert`,
    asPerson("anna"),
    { path: "math/quadratic.json" }
  )
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().deleted, 0)

  const r = await get(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna")
  )
  assert.equal(r.statusCode, 200)
  assert.equal(r.json().data.src, "klasse")
})

test("revert deletes all versions in caller's own leaf", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna"),
    { data: { src: "anna-v1" } }
  )
  const v2 = await put(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna"),
    { data: { src: "anna-v2" } }
  )
  assert.equal(v2.json().version, 2)

  const beforeRevert = await get(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna")
  )
  assert.equal(beforeRevert.json().data.src, "anna-v2")

  const rev = await post(
    `/database/scopes/${klasseId}/revert`,
    asPerson("anna"),
    { path: "math/quadratic.json" }
  )
  assert.equal(rev.statusCode, 200, rev.body)
  assert.equal(rev.json().deleted, 2)

  const remaining = await ctx.pool.query(
    `SELECT COUNT(*)::int as n FROM "${ctx.schema}".versions v
     JOIN "${ctx.schema}".scopes s ON s.id = v.scope_id
     WHERE s.name = 'anna' AND v.doc_path = 'math/quadratic.json'`
  )
  assert.equal(remaining.rows[0].n, 0)

  const afterRevert = await get(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna")
  )
  assert.equal(afterRevert.statusCode, 200)
  assert.equal(afterRevert.json().data.src, "klasse")
})

test("revert on brand new doc (no walk-up hit) → 404 afterwards", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/private/only-mine.json`,
    asPerson("anna"),
    { data: { top: "secret" } }
  )
  await post(
    `/database/scopes/${klasseId}/revert`,
    asPerson("anna"),
    { path: "private/only-mine.json" }
  )
  const res = await get(
    `/database/scopes/${klasseId}/docs/private/only-mine.json`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 404)
})
