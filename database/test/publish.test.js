// Publish / unpublish / anonymous public read. README §6.13.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, post, writeDoc, makeKlasseScope, seedSharedDoc,
} = require("./helpers")
setupTestSchema("publish")

let ctx, klasseId

const publish = (path) => post(ctx, `/database/scopes/${klasseId}/docs/publish`, asPerson("anna"), { path })
const unpublish = (path) => post(ctx, `/database/scopes/${klasseId}/docs/unpublish`, asPerson("anna"), { path })
const revert = (path) => post(ctx, `/database/scopes/${klasseId}/docs/revert`, asPerson("anna"), { path })
const publicRead = (id) => get(ctx, `/database/public/${id}`, {})

before(async () => {
  ctx = await newTestSchema()
  ;({ klasseId } = await makeKlasseScope(ctx, ["anna"]))
  await seedSharedDoc(ctx, klasseId, "lib/only-inherited.json", { src: "klasse" })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("publishing an own leaf version yields a public link anyone can read", async () => {
  await writeDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"), {
    data: { formula: "ax^2+bx+c" },
    meta: { title: "Quadratics" },
  })
  const pub = await publish("math/quadratic.json")
  assert.equal(pub.statusCode, 201, pub.body)
  const publicId = pub.json().publicId
  assert.match(publicId, /^[0-9a-f-]{36}$/)

  const anon = await publicRead(publicId)
  assert.equal(anon.statusCode, 200)
  assert.equal(anon.json().data.formula, "ax^2+bx+c")
  assert.equal(anon.json().meta.title, "Quadratics")
  assert.equal(anon.json().publicId, publicId)
})

test("publishing an inherited version (no own copy) → 409 not_publishable", async () => {
  const res = await publish("lib/only-inherited.json")
  assert.equal(res.statusCode, 409)
  assert.equal(res.json().error.details?.code || res.json().error.code, "not_publishable")
})

test("publishing a path that exists nowhere → 404", async () => {
  const res = await publish("does/not/exist.json")
  assert.equal(res.statusCode, 404)
})

test("publishing an already-published version → 409 already_published", async () => {
  await writeDoc(ctx, klasseId, "dup/one.json", asPerson("anna"), { data: { n: 1 } })
  assert.equal((await publish("dup/one.json")).statusCode, 201)
  const second = await publish("dup/one.json")
  assert.equal(second.statusCode, 409)
  assert.equal(second.json().error.details?.code || second.json().error.code, "already_published")
})

test("unpublish makes the public link return 410 Gone", async () => {
  await writeDoc(ctx, klasseId, "tk/down.json", asPerson("anna"), { data: { removable: true } })
  const id = (await publish("tk/down.json")).json().publicId
  assert.equal((await unpublish("tk/down.json")).statusCode, 200)
  assert.equal((await publicRead(id)).statusCode, 410)
})

test("revert deletes the published version → the link returns 404", async () => {
  await writeDoc(ctx, klasseId, "rv/pub.json", asPerson("anna"), { data: { v: 1 } })
  const id = (await publish("rv/pub.json")).json().publicId
  assert.equal((await publicRead(id)).statusCode, 200)
  await revert("rv/pub.json")
  assert.equal((await publicRead(id)).statusCode, 404)
})

test("two published versions of one path keep distinct, stable links", async () => {
  await writeDoc(ctx, klasseId, "multi/x.json", asPerson("anna"), { data: { rev: 1 } })
  const id1 = (await publish("multi/x.json")).json().publicId

  const v1 = (await get(ctx, `/database/scopes/${klasseId}/docs?path=multi/x.json`, asPerson("anna"))).json()
  await writeDoc(ctx, klasseId, "multi/x.json", asPerson("anna"), { ...v1, data: { rev: 2 } })
  const id2 = (await publish("multi/x.json")).json().publicId

  assert.notEqual(id1, id2)
  assert.equal((await publicRead(id1)).json().data.rev, 1)
  assert.equal((await publicRead(id2)).json().data.rev, 2)
})

test("an unknown public id → 404", async () => {
  const res = await publicRead("00000000-0000-0000-0000-000000000000")
  assert.equal(res.statusCode, 404)
})
