// Binary attachments (blobs). README §6.14.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, post, put, del, writeDoc, makeKlasseScope, seedSharedDoc,
} = require("./helpers")
setupTestSchema("blobs")

let ctx, klasseId

// A tiny valid 1x1 PNG used as raw blob content.
const TINY_PNG = Buffer.from(
  "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D4944415478DA636400010000050001" +
  "0D0A2DB40000000049454E44AE426082",
  "hex"
)

const blobUrl = (path, key) =>
  `/database/scopes/${klasseId}/blobs/${key}?path=${encodeURIComponent(path)}`
const uploadBlob = (path, key, person = "anna", buf = TINY_PNG, type = "image/png") =>
  put(ctx, blobUrl(path, key), { ...asPerson(person), "content-type": type }, buf)
const readBlob = (path, key, person = "anna") => get(ctx, blobUrl(path, key), asPerson(person))
const publish = (path) => post(ctx, `/database/scopes/${klasseId}/docs/publish`, asPerson("anna"), { path })
const unpublish = (path) => post(ctx, `/database/scopes/${klasseId}/docs/unpublish`, asPerson("anna"), { path })
const revert = (path) => post(ctx, `/database/scopes/${klasseId}/docs/revert`, asPerson("anna"), { path })

before(async () => {
  ctx = await newTestSchema()
  ;({ klasseId } = await makeKlasseScope(ctx, ["anna"]))
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("upload and read back a blob on the caller's own version", async () => {
  await writeDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"), { data: { formula: "x^2" } })
  const upload = await uploadBlob("math/quadratic.json", "preview")
  assert.equal(upload.statusCode, 201, upload.body)

  const read = await readBlob("math/quadratic.json", "preview")
  assert.equal(read.statusCode, 200)
  assert.equal(read.headers["content-type"], "image/png")
  assert.deepEqual(read.rawPayload, TINY_PNG)
})

test("missing blob on the resolved version → 404", async () => {
  await writeDoc(ctx, klasseId, "no/blob.json", asPerson("anna"), { data: {} })
  assert.equal((await readBlob("no/blob.json", "preview")).statusCode, 404)
})

test("disallowed content type → 415", async () => {
  await writeDoc(ctx, klasseId, "bad/type.json", asPerson("anna"), { data: {} })
  const upload = await uploadBlob("bad/type.json", "preview", "anna", Buffer.from("hi"), "text/plain")
  assert.equal(upload.statusCode, 415)
})

test("delete removes the blob", async () => {
  await writeDoc(ctx, klasseId, "del/me.json", asPerson("anna"), { data: {} })
  await uploadBlob("del/me.json", "preview")
  assert.equal((await readBlob("del/me.json", "preview")).statusCode, 200)

  const rm = await del(ctx, blobUrl("del/me.json", "preview"), asPerson("anna"))
  assert.equal(rm.json().deleted, 1)
  assert.equal((await readBlob("del/me.json", "preview")).statusCode, 404)
})

test("a new leaf version auto-copies the blob from the inherited version", async () => {
  await seedSharedDoc(ctx, klasseId, "lab/schema.json", { origin: "klasse" })
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".blobs
       (scope_id, doc_path, version, key, content_type, size_bytes, data)
     VALUES ($1, 'lab/schema.json', 1, 'preview', 'image/png', $2, $3)`,
    [klasseId, TINY_PNG.length, TINY_PNG]
  )

  await writeDoc(ctx, klasseId, "lab/schema.json", asPerson("anna"), { data: { origin: "anna" } })

  const blob = await readBlob("lab/schema.json", "preview")
  assert.equal(blob.statusCode, 200)
  assert.deepEqual(blob.rawPayload, TINY_PNG)

  const rows = await ctx.pool.query(
    `SELECT b.version FROM "${ctx.schema}".blobs b
     JOIN "${ctx.schema}".scopes s ON s.id = b.scope_id
     WHERE s.name = 'anna' AND b.doc_path = 'lab/schema.json' AND b.key = 'preview'`
  )
  assert.equal(rows.rowCount, 1)
})

test("revert cascades to the leaf's blobs", async () => {
  await writeDoc(ctx, klasseId, "rv/withblob.json", asPerson("anna"), { data: {} })
  await uploadBlob("rv/withblob.json", "preview")
  await revert("rv/withblob.json")

  const rows = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".blobs b
     JOIN "${ctx.schema}".scopes s ON s.id = b.scope_id
     WHERE s.name = 'anna' AND b.doc_path = 'rv/withblob.json'`
  )
  assert.equal(rows.rows[0].n, 0)
})

test("anonymous can read a published version's blob", async () => {
  await writeDoc(ctx, klasseId, "pub/img.json", asPerson("anna"), { data: { visible: true } })
  await uploadBlob("pub/img.json", "preview")
  const id = (await publish("pub/img.json")).json().publicId

  const anon = await get(ctx, `/database/public/${id}/blobs/preview`, {})
  assert.equal(anon.statusCode, 200)
  assert.equal(anon.headers["content-type"], "image/png")
  assert.deepEqual(anon.rawPayload, TINY_PNG)
})

test("public blob read: 410 after unpublish, 404 after revert", async () => {
  await writeDoc(ctx, klasseId, "gonepub/img.json", asPerson("anna"), { data: {} })
  await uploadBlob("gonepub/img.json", "preview")
  const id = (await publish("gonepub/img.json")).json().publicId

  await unpublish("gonepub/img.json")
  assert.equal((await get(ctx, `/database/public/${id}/blobs/preview`, {})).statusCode, 410)

  await revert("gonepub/img.json")
  assert.equal((await get(ctx, `/database/public/${id}/blobs/preview`, {})).statusCode, 404)
})
