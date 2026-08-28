// Rename / move within the caller's own leaf. README §6.15.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, post, put, readDoc, writeDoc, makeKlasseScope, seedSharedDoc,
} = require("./helpers")
setupTestSchema("rename")

let ctx, klasseId

const TINY_PNG = Buffer.from(
  "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D4944415478DA636400010000050001" +
  "0D0A2DB40000000049454E44AE426082",
  "hex"
)

const rename = (payload) =>
  post(ctx, `/database/scopes/${klasseId}/docs/rename`, asPerson("anna"), payload)
const blobUrl = (path, key) =>
  `/database/scopes/${klasseId}/blobs/${key}?path=${encodeURIComponent(path)}`
const uploadBlob = (path, key) =>
  put(ctx, blobUrl(path, key), { ...asPerson("anna"), "content-type": "image/png" }, TINY_PNG)

before(async () => {
  ctx = await newTestSchema()
  ;({ klasseId } = await makeKlasseScope(ctx, ["anna"]))
  await seedSharedDoc(ctx, klasseId, "lib/inherit.json", { src: "klasse" })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("basic rename: old path is gone, new path serves the doc", async () => {
  await writeDoc(ctx, klasseId, "basic/a.json", asPerson("anna"), { data: { x: 1 } })
  const rn = await rename({ path: "basic/a.json", newPath: "basic/b.json", version: 1 })
  assert.equal(rn.statusCode, 200, rn.body)
  assert.equal(rn.json().moved, 1)

  assert.equal((await readDoc(ctx, klasseId, "basic/a.json", asPerson("anna"))).statusCode, 404)
  const neu = await readDoc(ctx, klasseId, "basic/b.json", asPerson("anna"))
  assert.equal(neu.json().data.x, 1)
})

test("all versions of the path move together", async () => {
  await writeDoc(ctx, klasseId, "multi/a.json", asPerson("anna"), { data: { v: 1 } })
  const v2 = await writeDoc(ctx, klasseId, "multi/a.json", asPerson("anna"), { data: { v: 2 } })
  const rn = await rename({ path: "multi/a.json", newPath: "multi/b.json", version: v2.json().version })
  assert.equal(rn.json().moved, 2)

  const neu = await readDoc(ctx, klasseId, "multi/b.json", asPerson("anna"))
  assert.equal(neu.json().data.v, 2)
})

test("blobs follow the rename", async () => {
  await writeDoc(ctx, klasseId, "blobby/a.json", asPerson("anna"), { data: {} })
  await uploadBlob("blobby/a.json", "preview")
  await rename({ path: "blobby/a.json", newPath: "blobby/b.json", version: 1 })

  const blob = await get(ctx, blobUrl("blobby/b.json", "preview"), asPerson("anna"))
  assert.equal(blob.statusCode, 200)
  assert.deepEqual(blob.rawPayload, TINY_PNG)
})

test("a published doc keeps its public link, now serving the new path", async () => {
  await writeDoc(ctx, klasseId, "pub/orig.json", asPerson("anna"), { data: { rev: 1 } })
  const pub = await post(ctx, `/database/scopes/${klasseId}/docs/publish`, asPerson("anna"), { path: "pub/orig.json" })
  const publicId = pub.json().publicId

  await rename({ path: "pub/orig.json", newPath: "pub/renamed.json", version: 1 })

  const anon = await get(ctx, `/database/public/${publicId}`, {})
  assert.equal(anon.statusCode, 200)
  assert.equal(anon.json().data.rev, 1)
  assert.equal(anon.json().path, "pub/renamed.json")
})

test("collision with an existing leaf path → 409 with usedPaths", async () => {
  await writeDoc(ctx, klasseId, "cf/src.json", asPerson("anna"), { data: { n: 1 } })
  await writeDoc(ctx, klasseId, "cf/target.json", asPerson("anna"), { data: { n: 2 } })
  const rn = await rename({ path: "cf/src.json", newPath: "cf/target.json", version: 1 })
  assert.equal(rn.statusCode, 409)
  assert.equal(rn.json().error.code, "conflict")
  assert.deepEqual(rn.json().error.details?.usedPaths, ["cf/target.json"])
})

test("no-op when oldPath == newPath", async () => {
  await writeDoc(ctx, klasseId, "nop/a.json", asPerson("anna"), { data: {} })
  const rn = await rename({ path: "nop/a.json", newPath: "nop/a.json" })
  assert.equal(rn.json().moved, 0)
})

test("renaming a path with no local version → 404", async () => {
  const rn = await rename({ path: "nothing/here.json", newPath: "somewhere/else.json" })
  assert.equal(rn.statusCode, 404)
})

test("renaming onto an inherited-only path is allowed (shadows it)", async () => {
  await writeDoc(ctx, klasseId, "tmp/src.json", asPerson("anna"), { data: { src: "anna" } })
  const rn = await rename({ path: "tmp/src.json", newPath: "lib/inherit.json", version: 1 })
  assert.equal(rn.statusCode, 200, rn.body)

  const view = await readDoc(ctx, klasseId, "lib/inherit.json", asPerson("anna"))
  assert.equal(view.json().data.src, "anna")
})

test("exists check: false before, true after a local write", async () => {
  const url = `/database/scopes/${klasseId}/docs/exists?path=${encodeURIComponent("check/me.json")}`
  assert.equal((await get(ctx, url, asPerson("anna"))).json().exists, false)
  await writeDoc(ctx, klasseId, "check/me.json", asPerson("anna"), { data: {} })
  assert.equal((await get(ctx, url, asPerson("anna"))).json().exists, true)
})
