// Revert — physical delete of ALL versions in the caller's own leaf for a
// path. README §6.10.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, post, readDoc, writeDoc, makeKlasseScope, seedSharedDoc,
} = require("./helpers")
setupTestSchema("revert")

let ctx, klasseId

const revert = (path) =>
  post(ctx, `/database/scopes/${klasseId}/docs/revert`, asPerson("anna"), { path })

before(async () => {
  ctx = await newTestSchema()
  ;({ klasseId } = await makeKlasseScope(ctx, ["anna"]))
  await seedSharedDoc(ctx, klasseId, "math/quadratic.json", { src: "klasse" })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("revert with no local override is a no-op; the inherited version remains", async () => {
  const res = await revert("math/quadratic.json")
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().deleted, 0)

  const r = await readDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"))
  assert.equal(r.statusCode, 200)
  assert.equal(r.json().data.src, "klasse")
})

test("revert deletes every local version and falls back to the shared one", async () => {
  await writeDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"), { data: { src: "anna-v1" } })
  const v2 = await writeDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"), { data: { src: "anna-v2" } })
  assert.equal(v2.json().version, 2)

  const rev = await revert("math/quadratic.json")
  assert.equal(rev.json().deleted, 2)

  const after = await readDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"))
  assert.equal(after.json().data.src, "klasse") // back to the shared version
})

test("reverting a brand-new local-only doc leaves nothing → 404", async () => {
  await writeDoc(ctx, klasseId, "private/only-mine.json", asPerson("anna"), { data: { top: "secret" } })
  await revert("private/only-mine.json")
  const res = await readDoc(ctx, klasseId, "private/only-mine.json", asPerson("anna"))
  assert.equal(res.statusCode, 404)
})
