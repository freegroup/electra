// Publish/Unpublish/Public-Read tests. See README §6.13.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
  makeKlasseScope,
} = require("./helpers")
setupTestSchema("publish")

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

  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'lib/only-inherited.json', 1, 'committed', false,
             '{"src":"klasse"}'::jsonb, '{}'::jsonb, 'admin')`,
    [klasseId]
  )
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("publish own leaf version → 201 with publicId; anonymous GET returns doc", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna"),
    { data: { formula: "ax^2+bx+c" }, meta: { title: "Quadratics" } }
  )
  const pub = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "math/quadratic.json" }
  )
  assert.equal(pub.statusCode, 201, pub.body)
  const publicId = pub.json().publicId
  assert.match(publicId, /^[0-9a-f-]{36}$/)

  const anon = await get(`/database/public/${publicId}`, {})
  assert.equal(anon.statusCode, 200)
  const body = anon.json()
  assert.equal(body.data.formula, "ax^2+bx+c")
  assert.equal(body.meta.title, "Quadratics")
  assert.equal(body.publicId, publicId)
})

test("publish inherited (no leaf version) → 409 not_publishable", async () => {
  const res = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "lib/only-inherited.json" }
  )
  assert.equal(res.statusCode, 409)
  assert.equal(res.json().error.details?.code || res.json().error.code, "not_publishable")
})

test("publish path with nothing anywhere → 404", async () => {
  const res = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "does/not/exist.json" }
  )
  assert.equal(res.statusCode, 404)
})

test("publish already-published version → 409 already_published", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/dup/one.json`,
    asPerson("anna"),
    { data: { n: 1 } }
  )
  const first = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "dup/one.json" }
  )
  assert.equal(first.statusCode, 201)
  const second = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "dup/one.json" }
  )
  assert.equal(second.statusCode, 409)
  assert.equal(second.json().error.details?.code || second.json().error.code, "already_published")
})

test("unpublish → GET /public/:id returns 410 Gone", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/tk/down.json`,
    asPerson("anna"),
    { data: { removable: true } }
  )
  const pub = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "tk/down.json" }
  )
  const publicId = pub.json().publicId

  const unp = await post(
    `/database/scopes/${klasseId}/unpublish`,
    asPerson("anna"),
    { path: "tk/down.json" }
  )
  assert.equal(unp.statusCode, 200)

  const anon = await get(`/database/public/${publicId}`, {})
  assert.equal(anon.statusCode, 410)
})

test("revert deletes the published version → GET /public/:id returns 404", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/rv/pub.json`,
    asPerson("anna"),
    { data: { v: 1 } }
  )
  const pub = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "rv/pub.json" }
  )
  const publicId = pub.json().publicId

  const before = await get(`/database/public/${publicId}`, {})
  assert.equal(before.statusCode, 200)

  await post(
    `/database/scopes/${klasseId}/revert`,
    asPerson("anna"),
    { path: "rv/pub.json" }
  )

  const after = await get(`/database/public/${publicId}`, {})
  assert.equal(after.statusCode, 404)
})

test("publish v1, then put v2, publish v2 → two live URLs, both stable", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/multi/x.json`,
    asPerson("anna"),
    { data: { rev: 1 } }
  )
  const pub1 = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "multi/x.json" }
  )
  const id1 = pub1.json().publicId

  await put(
    `/database/scopes/${klasseId}/docs/multi/x.json`,
    asPerson("anna"),
    { data: { rev: 2 } }
  )
  const pub2 = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "multi/x.json" }
  )
  const id2 = pub2.json().publicId
  assert.notEqual(id1, id2)

  const r1 = await get(`/database/public/${id1}`, {})
  const r2 = await get(`/database/public/${id2}`, {})
  assert.equal(r1.statusCode, 200)
  assert.equal(r2.statusCode, 200)
  assert.equal(r1.json().data.rev, 1)
  assert.equal(r2.json().data.rev, 2)
})

test("GET /public/:id with unknown uuid → 404", async () => {
  const res = await get(`/database/public/00000000-0000-0000-0000-000000000000`, {})
  assert.equal(res.statusCode, 404)
})
