// Shipped content: seed/ imported once, builtin/ reconciled on every start.
// See Shapes-Rework.md §2.2.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const os = require("os")
const path = require("path")
const {
  setupTestSchema, newTestSchema, dropSchema,
} = require("./helpers")
setupTestSchema("shipped")

let ctx, appsId, shipped, pool

// The module reads from directories next to the service. The tests need their
// own, so SEED_DIR/BUILTIN_DIR are redirected through the module's exports.
let tmpRoot, seedDir, builtinDir

const TINY_PNG = Buffer.from(
  "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D4944415478DA636400010000050001" +
  "0D0A2DB40000000049454E44AE426082",
  "hex"
)

function writeFile(base, rel, content) {
  const full = path.join(base, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content)
}

// Effective (newest) version of a path in `apps`.
async function effective(docPath) {
  const res = await pool.query(
    `SELECT version, data, meta, is_deletion FROM versions
      WHERE scope_id = $1 AND doc_path = $2
      ORDER BY version DESC LIMIT 1`,
    [appsId, docPath]
  )
  return res.rowCount ? res.rows[0] : null
}

before(async () => {
  ctx = await newTestSchema()
  pool = ctx.pool
  shipped = require("../server/persistence/shipped")

  const scopes = require("../server/persistence/scopes")
  const client = await pool.connect()
  try {
    appsId = await scopes.resolveScopeIdByPath(
      client, `${process.env.SCOPE_PREFIX || ""}/apps`)
  } finally {
    client.release()
  }
  assert.ok(appsId, "apps scope must exist")

  tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "shipped-"))
  seedDir = path.join(tmpRoot, "seed")
  builtinDir = path.join(tmpRoot, "builtin")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
  fs.rmSync(tmpRoot, { recursive: true, force: true })
})

test("a component becomes ONE .part document, the image a blob", async () => {
  const dir = "shapes/digital/gate/IEC60617-12"
  writeFile(builtinDir, `${dir}/AND.shape`, "{geometry}")
  writeFile(builtinDir, `${dir}/AND.custom`, "// custom")
  writeFile(builtinDir, `${dir}/AND.js`, "var x = 1")
  writeFile(builtinDir, `${dir}/AND.md`, "# AND")
  writeFile(builtinDir, `${dir}/AND.png`, TINY_PNG)

  const docs = shipped.assemble(builtinDir, "shapes")
  assert.equal(docs.length, 1, "five files, one document")
  const doc = docs[0]
  assert.equal(doc.docPath, "digital/gate/IEC60617-12/AND.part",
    "subfolders carry into the path; the five files become one .part document")
  assert.deepEqual(Object.keys(doc.data).sort(), ["custom", "js", "md", "shape"])
  assert.equal(doc.blobs.length, 1, "the image does not go into data")
  assert.equal(doc.blobs[0].key, "preview")
})

test("a circuit becomes one document per file, suffix kept", async () => {
  writeFile(seedDir, "brains/8-bit/mem.brain", JSON.stringify({ gates: 3 }))
  const docs = shipped.assemble(seedDir, "brains")
  assert.equal(docs.length, 1)
  assert.equal(docs[0].docPath, "8-bit/mem.brain")
  assert.deepEqual(docs[0].data, { gates: 3 })
})

test("seed imports once, then empties its folder", async () => {
  const before = await effective("8-bit/mem.brain")
  assert.equal(before, null, "not there yet")

  const first = await shipped.importSeed(appsId, seedDir)
  assert.equal(first.created, 1)

  const doc = await effective("8-bit/mem.brain")
  assert.deepEqual(doc.data, { gates: 3 })
  assert.equal(doc.meta.builtin, undefined,
    "seeded content carries no builtin marker — it belongs to the community")

  assert.equal(fs.existsSync(path.join(seedDir, "brains")), false,
    "the conveyor empties itself after a successful import")
})

test("seed does not overwrite what the community made of it", async () => {
  // The document now exists; putting the file back must leave it alone.
  await pool.query(
    `INSERT INTO versions (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, $2, 2, 'committed', false, '{"gates": 99}'::jsonb, '{}'::jsonb, 'anna')`,
    [appsId, "8-bit/mem.brain"]
  )
  writeFile(seedDir, "brains/8-bit/mem.brain", JSON.stringify({ gates: 3 }))

  const res = await shipped.importSeed(appsId, seedDir)
  assert.equal(res.created, 0)
  assert.equal(res.present, 1)

  const doc = await effective("8-bit/mem.brain")
  assert.deepEqual(doc.data, { gates: 99 }, "the community version survives")
})

test("builtin: first run creates, second run writes nothing", async () => {
  const first = await shipped.reconcileBuiltin(appsId, builtinDir)
  assert.equal(first.created, 1)

  const afterFirst = await effective("digital/gate/IEC60617-12/AND.part")
  assert.equal(afterFirst.version, 1)
  assert.equal(afterFirst.meta.builtin, true)
  assert.ok(afterFirst.meta.hash, "carries a fingerprint")

  const second = await shipped.reconcileBuiltin(appsId, builtinDir)
  assert.deepEqual(second, { created: 0, updated: 0, removed: 0 },
    "unchanged content must not write — a restart stays invisible to the caches")

  const afterSecond = await effective("digital/gate/IEC60617-12/AND.part")
  assert.equal(afterSecond.version, 1, "still version 1")
})

test("builtin: a changed file gives exactly one new version", async () => {
  writeFile(builtinDir, "shapes/digital/gate/IEC60617-12/AND.js", "var x = 2")

  const res = await shipped.reconcileBuiltin(appsId, builtinDir)
  assert.deepEqual(res, { created: 0, updated: 1, removed: 0 })

  const doc = await effective("digital/gate/IEC60617-12/AND.part")
  assert.equal(doc.version, 2)
  assert.equal(doc.data.js, "var x = 2")

  const blob = await pool.query(
    `SELECT 1 FROM blobs WHERE scope_id = $1 AND doc_path = $2 AND version = 2 AND key = 'preview'`,
    [appsId, "digital/gate/IEC60617-12/AND.part"]
  )
  assert.equal(blob.rowCount, 1, "the image travels along to the new version")
})

test("builtin: a deleted file removes the document and its blobs", async () => {
  fs.rmSync(path.join(builtinDir, "shapes/digital/gate/IEC60617-12/AND.shape"))
  fs.rmSync(path.join(builtinDir, "shapes/digital/gate/IEC60617-12/AND.custom"))
  fs.rmSync(path.join(builtinDir, "shapes/digital/gate/IEC60617-12/AND.js"))
  fs.rmSync(path.join(builtinDir, "shapes/digital/gate/IEC60617-12/AND.md"))
  fs.rmSync(path.join(builtinDir, "shapes/digital/gate/IEC60617-12/AND.png"))

  const res = await shipped.reconcileBuiltin(appsId, builtinDir)
  assert.equal(res.removed, 1)

  assert.equal(await effective("digital/gate/IEC60617-12/AND.part"), null,
    "hard delete, no tombstone: apps is the end of the walk-up")

  const blob = await pool.query(
    `SELECT 1 FROM blobs WHERE scope_id = $1 AND doc_path = $2`,
    [appsId, "digital/gate/IEC60617-12/AND.part"]
  )
  assert.equal(blob.rowCount, 0, "blobs go with the versions through the FK")
})

test("builtin never touches documents it does not own", async () => {
  const doc = await effective("8-bit/mem.brain")
  assert.ok(doc, "the seeded circuit is still there after all builtin runs")
  assert.deepEqual(doc.data, { gates: 99 })
})
