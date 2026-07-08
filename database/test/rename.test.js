// Rename tests. See README §6.15.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
  makeKlasseScope,
} = require("./helpers")
setupTestSchema("rename")

let ctx
let klasseId

const TINY_PNG = Buffer.from(
  "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D4944415478DA636400010000050001" +
  "0D0A2DB40000000049454E44AE426082",
  "hex"
)

async function post(url, headers, payload) {
  return ctx.fastify.inject({ method: "POST", url, headers, payload })
}
async function put(url, headers, payload) {
  return ctx.fastify.inject({ method: "PUT", url, headers, payload })
}
async function get(url, headers) {
  return ctx.fastify.inject({ method: "GET", url, headers })
}
async function uploadBlob(scopeId, docPath, key, personRef, buffer = TINY_PNG, contentType = "image/png") {
  return ctx.fastify.inject({
    method: "PUT",
    url: `/database/scopes/${scopeId}/blobs/${key}?path=${encodeURIComponent(docPath)}`,
    headers: { ...asPerson(personRef), "content-type": contentType },
    payload: buffer,
  })
}

before(async () => {
  ctx = await newTestSchema()
  const s = await makeKlasseScope(ctx, ["anna"])
  klasseId = s.klasseId

  // Seed a klasse-level 'lib/inherit.json' so we can test rename-onto-inherited.
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'lib/inherit.json', 1, 'committed', false,
             '{"src":"klasse"}'::jsonb, '{}'::jsonb, 'admin')`,
    [klasseId]
  )
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("rename basic: old path 404s, new path returns doc", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/basic/a.json`,
    asPerson("anna"),
    { data: { x: 1 } }
  )
  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "basic/a.json", newPath: "basic/b.json", version: 1 }
  )
  assert.equal(rn.statusCode, 200, rn.body)
  assert.equal(rn.json().moved, 1)

  const old = await get(
    `/database/scopes/${klasseId}/docs/basic/a.json`,
    asPerson("anna")
  )
  assert.equal(old.statusCode, 404)

  const neu = await get(
    `/database/scopes/${klasseId}/docs/basic/b.json`,
    asPerson("anna")
  )
  assert.equal(neu.statusCode, 200)
  assert.equal(neu.json().data.x, 1)
})

test("rename moves all versions in own leaf", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/multi/a.json`,
    asPerson("anna"),
    { data: { v: 1 } }
  )
  const v2 = await put(
    `/database/scopes/${klasseId}/docs/multi/a.json`,
    asPerson("anna"),
    { data: { v: 2 } }
  )
  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "multi/a.json", newPath: "multi/b.json", version: v2.json().version }
  )
  assert.equal(rn.statusCode, 200, rn.body)
  assert.equal(rn.json().moved, 2)

  const neu = await get(
    `/database/scopes/${klasseId}/docs/multi/b.json`,
    asPerson("anna")
  )
  assert.equal(neu.statusCode, 200)
  assert.equal(neu.json().data.v, 2)
})

test("rename with blobs: blob follows via cascade", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/blobby/a.json`,
    asPerson("anna"),
    { data: {} }
  )
  await uploadBlob(klasseId, "blobby/a.json", "preview", "anna")

  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "blobby/a.json", newPath: "blobby/b.json", version: 1 }
  )
  assert.equal(rn.statusCode, 200)

  const blob = await get(
    `/database/scopes/${klasseId}/blobs/preview?path=${encodeURIComponent("blobby/b.json")}`,
    asPerson("anna")
  )
  assert.equal(blob.statusCode, 200)
  assert.deepEqual(blob.rawPayload, TINY_PNG)
})

test("rename of published doc keeps publicId live", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/pub/orig.json`,
    asPerson("anna"),
    { data: { rev: 1 } }
  )
  const pub = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "pub/orig.json" }
  )
  const publicId = pub.json().publicId

  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "pub/orig.json", newPath: "pub/renamed.json", version: 1 }
  )
  assert.equal(rn.statusCode, 200)

  const anon = await get(`/database/public/${publicId}`, {})
  assert.equal(anon.statusCode, 200)
  assert.equal(anon.json().data.rev, 1)
  assert.equal(anon.json().path, "pub/renamed.json")
})

test("rename conflict: target already used → 409 with usedPaths", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/cf/src.json`,
    asPerson("anna"),
    { data: { n: 1 } }
  )
  await put(
    `/database/scopes/${klasseId}/docs/cf/target.json`,
    asPerson("anna"),
    { data: { n: 2 } }
  )
  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "cf/src.json", newPath: "cf/target.json", version: 1 }
  )
  assert.equal(rn.statusCode, 409)
  const err = rn.json().error
  assert.equal(err.code, "conflict")
  assert.deepEqual(err.details?.usedPaths, ["cf/target.json"])
})

test("rename no-op: oldPath == newPath → moved: 0", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/nop/a.json`,
    asPerson("anna"),
    { data: {} }
  )
  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "nop/a.json", newPath: "nop/a.json" }
  )
  assert.equal(rn.statusCode, 200, rn.body)
  assert.equal(rn.json().moved, 0)
})

test("rename not-found: no local version → 404", async () => {
  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "nothing/here.json", newPath: "somewhere/else.json" }
  )
  assert.equal(rn.statusCode, 404)
})

test("rename onto inherited path is allowed", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/tmp/src.json`,
    asPerson("anna"),
    { data: { src: "anna" } }
  )
  const rn = await post(
    `/database/scopes/${klasseId}/rename`,
    asPerson("anna"),
    { path: "tmp/src.json", newPath: "lib/inherit.json", version: 1 }
  )
  assert.equal(rn.statusCode, 200, rn.body)

  const view = await get(
    `/database/scopes/${klasseId}/docs/lib/inherit.json`,
    asPerson("anna")
  )
  assert.equal(view.statusCode, 200)
  assert.equal(view.json().data.src, "anna")
})

test("exists lookup: false for absent, true after put", async () => {
  const before = await get(
    `/database/scopes/${klasseId}/docs/exists?path=${encodeURIComponent("check/me.json")}`,
    asPerson("anna")
  )
  assert.equal(before.statusCode, 200)
  assert.equal(before.json().exists, false)

  await put(
    `/database/scopes/${klasseId}/docs/check/me.json`,
    asPerson("anna"),
    { data: {} }
  )
  const after = await get(
    `/database/scopes/${klasseId}/docs/exists?path=${encodeURIComponent("check/me.json")}`,
    asPerson("anna")
  )
  assert.equal(after.statusCode, 200)
  assert.equal(after.json().exists, true)
})
