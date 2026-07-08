// Blob tests. See README §6.14.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
  makeKlasseScope,
} = require("./helpers")
setupTestSchema("blobs")

let ctx
let klasseId

// A tiny valid PNG (1x1 transparent). Used as raw blob content.
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
async function del(url, headers) {
  return ctx.fastify.inject({ method: "DELETE", url, headers })
}

async function uploadBlob(scopeId, docPath, key, personRef, buffer = TINY_PNG, contentType = "image/png") {
  return ctx.fastify.inject({
    method: "PUT",
    url: `/database/scopes/${scopeId}/blobs/${key}?path=${encodeURIComponent(docPath)}`,
    headers: {
      ...asPerson(personRef),
      "content-type": contentType,
    },
    payload: buffer,
  })
}

before(async () => {
  ctx = await newTestSchema()
  const s = await makeKlasseScope(ctx, ["anna"])
  klasseId = s.klasseId
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("put + get blob on own leaf version", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/math/quadratic.json`,
    asPerson("anna"),
    { data: { formula: "x^2" } }
  )
  const upload = await uploadBlob(klasseId, "math/quadratic.json", "preview", "anna")
  assert.equal(upload.statusCode, 201, upload.body)

  const read = await get(
    `/database/scopes/${klasseId}/blobs/preview?path=${encodeURIComponent("math/quadratic.json")}`,
    asPerson("anna")
  )
  assert.equal(read.statusCode, 200)
  assert.equal(read.headers["content-type"], "image/png")
  assert.equal(read.rawPayload.length, TINY_PNG.length)
  assert.deepEqual(read.rawPayload, TINY_PNG)
})

test("get returns 404 when no blob present for the resolved version", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/no/blob.json`,
    asPerson("anna"),
    { data: {} }
  )
  const res = await get(
    `/database/scopes/${klasseId}/blobs/preview?path=${encodeURIComponent("no/blob.json")}`,
    asPerson("anna")
  )
  assert.equal(res.statusCode, 404)
})

test("unsupported content-type → 415", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/bad/type.json`,
    asPerson("anna"),
    { data: {} }
  )
  const upload = await uploadBlob(
    klasseId, "bad/type.json", "preview", "anna",
    Buffer.from("hello", "utf8"), "text/plain"
  )
  assert.equal(upload.statusCode, 415)
})

test("delete removes the blob", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/del/me.json`,
    asPerson("anna"),
    { data: {} }
  )
  await uploadBlob(klasseId, "del/me.json", "preview", "anna")

  const before = await get(
    `/database/scopes/${klasseId}/blobs/preview?path=${encodeURIComponent("del/me.json")}`,
    asPerson("anna")
  )
  assert.equal(before.statusCode, 200)

  const rm = await del(
    `/database/scopes/${klasseId}/blobs/preview?path=${encodeURIComponent("del/me.json")}`,
    asPerson("anna")
  )
  assert.equal(rm.statusCode, 200)
  assert.equal(rm.json().deleted, 1)

  const after = await get(
    `/database/scopes/${klasseId}/blobs/preview?path=${encodeURIComponent("del/me.json")}`,
    asPerson("anna")
  )
  assert.equal(after.statusCode, 404)
})

test("auto-copy: new leaf version inherits blob from the walk-up version", async () => {
  // Seed a klasse-level version + blob directly (not in a leaf).
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, 'lab/schema.json', 1, 'committed', false,
             '{"origin":"klasse"}'::jsonb, '{}'::jsonb, 'admin')`,
    [klasseId]
  )
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".blobs
       (scope_id, doc_path, version, key, content_type, size_bytes, data)
     VALUES ($1, 'lab/schema.json', 1, 'preview', 'image/png', $2, $3)`,
    [klasseId, TINY_PNG.length, TINY_PNG]
  )

  const annaPut = await put(
    `/database/scopes/${klasseId}/docs/lab/schema.json`,
    asPerson("anna"),
    { data: { origin: "anna" } }
  )
  assert.equal(annaPut.statusCode, 201)

  const blob = await get(
    `/database/scopes/${klasseId}/blobs/preview?path=${encodeURIComponent("lab/schema.json")}`,
    asPerson("anna")
  )
  assert.equal(blob.statusCode, 200)
  assert.deepEqual(blob.rawPayload, TINY_PNG)

  const rows = await ctx.pool.query(
    `SELECT b.version FROM "${ctx.schema}".blobs b
     JOIN "${ctx.schema}".scopes s ON s.id = b.scope_id
     WHERE s.name = 'anna' AND b.doc_path = 'lab/schema.json' AND b.key = 'preview'`
  )
  assert.equal(rows.rowCount, 1)
})

test("revert deletes blobs via cascade", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/rv/withblob.json`,
    asPerson("anna"),
    { data: {} }
  )
  await uploadBlob(klasseId, "rv/withblob.json", "preview", "anna")

  await post(
    `/database/scopes/${klasseId}/revert`,
    asPerson("anna"),
    { path: "rv/withblob.json" }
  )

  const rows = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".blobs b
     JOIN "${ctx.schema}".scopes s ON s.id = b.scope_id
     WHERE s.name = 'anna' AND b.doc_path = 'rv/withblob.json'`
  )
  assert.equal(rows.rows[0].n, 0)
})

test("public blob read: anonymous GET after publish", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/pub/img.json`,
    asPerson("anna"),
    { data: { visible: true } }
  )
  await uploadBlob(klasseId, "pub/img.json", "preview", "anna")

  const pub = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "pub/img.json" }
  )
  const publicId = pub.json().publicId

  const anon = await get(`/database/public/${publicId}/blobs/preview`, {})
  assert.equal(anon.statusCode, 200)
  assert.equal(anon.headers["content-type"], "image/png")
  assert.deepEqual(anon.rawPayload, TINY_PNG)
})

test("public blob read: 410 after unpublish, 404 after revert", async () => {
  await put(
    `/database/scopes/${klasseId}/docs/gonepub/img.json`,
    asPerson("anna"),
    { data: {} }
  )
  await uploadBlob(klasseId, "gonepub/img.json", "preview", "anna")

  const pub = await post(
    `/database/scopes/${klasseId}/publish`,
    asPerson("anna"),
    { path: "gonepub/img.json" }
  )
  const publicId = pub.json().publicId

  await post(
    `/database/scopes/${klasseId}/unpublish`,
    asPerson("anna"),
    { path: "gonepub/img.json" }
  )
  const gone = await get(`/database/public/${publicId}/blobs/preview`, {})
  assert.equal(gone.statusCode, 410)

  await post(
    `/database/scopes/${klasseId}/revert`,
    asPerson("anna"),
    { path: "gonepub/img.json" }
  )
  const four = await get(`/database/public/${publicId}/blobs/preview`, {})
  assert.equal(four.statusCode, 404)
})
