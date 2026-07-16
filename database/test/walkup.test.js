// Walk-up resolution — README §6.2.
//
// From the operating scope up to the root, at EVERY level the caller's own
// leaf is checked first, then the shared version at that level. Nearest wins.
// A caller's override made while operating in a scope therefore shadows for
// them in every context that passes through that scope.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, readDoc, writeDoc, createScope, addMember, seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("walkup")

let ctx, brainsId, klasseId

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
  await addMember(ctx, klasseId, "anna")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("inherited: a version at content/apps is visible from klasse8a", async () => {
  await seedSharedDoc(ctx, brainsId, "math/quadratic.json", { level: "brains" })
  const res = await readDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"))
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.level, "brains")
  assert.equal(res.json().scope, "electra/content/apps")
})

test("nearer shared level shadows the farther one", async () => {
  await seedSharedDoc(ctx, klasseId, "math/quadratic.json", { level: "klasse" })
  const res = await readDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"))
  assert.equal(res.json().data.level, "klasse")
  assert.equal(res.json().scope, "electra/content/apps/klasse8a")
})

test("the caller's own leaf shadows the shared version", async () => {
  await writeDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"), { data: { level: "anna" } })
  const res = await readDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"))
  assert.equal(res.json().data.level, "anna")
  assert.equal(res.json().scope, "electra/content/apps/klasse8a/anna")
})

test("a foreign leaf is never part of the walk-up", async () => {
  await addMember(ctx, klasseId, "bob")
  await writeDoc(ctx, klasseId, "math/quadratic.json", asPerson("bob"), { data: { level: "bob" } })
  // Anna still sees her own version, not bob's.
  const res = await readDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"))
  assert.equal(res.json().data.level, "anna")
})

test("an override made higher up shadows for the caller lower down (per-level leaf)", async () => {
  // anna is also an explicit member of content/apps and overrides there.
  await addMember(ctx, brainsId, "anna")
  await seedSharedDoc(ctx, brainsId, "bio/cell.json", { patched: false }) // shared stays unpatched
  await writeDoc(ctx, brainsId, "bio/cell.json", asPerson("anna"), { data: { patched: true } })

  // Reading from klasse8a: the walk-up passes through brains and finds anna's
  // brains-leaf override before the shared brains version.
  const res = await readDoc(ctx, klasseId, "bio/cell.json", asPerson("anna"))
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.patched, true)
  assert.equal(res.json().scope, "electra/content/apps/anna")
})

test("depth beats slot: a nearer shared version wins over a farther leaf", async () => {
  // Shared version on klasse8a (depth 0, shared) must beat anna's brains leaf
  // override (depth 1, leaf) for the same path.
  await seedSharedDoc(ctx, klasseId, "bio/cell.json", { patched: "klasse-shared" })
  const res = await readDoc(ctx, klasseId, "bio/cell.json", asPerson("anna"))
  assert.equal(res.json().data.patched, "klasse-shared")
  assert.equal(res.json().scope, "electra/content/apps/klasse8a")
})

test("missing everywhere in the chain → 404", async () => {
  const res = await readDoc(ctx, klasseId, "does/not/exist.json", asPerson("anna"))
  assert.equal(res.statusCode, 404)
})
