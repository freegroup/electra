// Effective listing — README §6.3.
//
// list() returns the caller's effective view for one operating scope: each
// path once, at its nearest visible version, with its origin scope. Tombstones
// hide a path; a leaf override replaces the inherited entry.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, writeDoc, createScope, addMember, seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("list")

let ctx, brainsId, klasseId

function list(scopeRef, prefix) {
  const url = `/database/scopes/${scopeRef}/docs` + (prefix ? `?prefix=${encodeURIComponent(prefix)}` : "")
  return get(ctx, url, asPerson("anna"))
}
const byPath = (docs) => Object.fromEntries(docs.map((d) => [d.path, d]))

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/brains")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
  await addMember(ctx, klasseId, "anna")

  await seedSharedDoc(ctx, brainsId, "math/quadratic.json", { level: "brains" })
  await seedSharedDoc(ctx, brainsId, "bio/photosynthesis.json", { level: "brains" })
  await seedSharedDoc(ctx, klasseId, "math/quadratic.json", { level: "klasse" })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("effective view dedups to the nearest version per path", async () => {
  const res = await list(klasseId)
  assert.equal(res.statusCode, 200)
  const docs = byPath(res.json().docs)
  assert.equal(Object.keys(docs).length, 2)
  assert.equal(docs["math/quadratic.json"].scope, "electra/apps/brains/klasse8a") // nearest
  assert.equal(docs["bio/photosynthesis.json"].scope, "electra/apps/brains")      // inherited
})

test("prefix filters the view", async () => {
  const res = await list(klasseId, "math/")
  const docs = res.json().docs
  assert.equal(docs.length, 1)
  assert.equal(docs[0].path, "math/quadratic.json")
})

test("a caller's own leaf override replaces the inherited entry", async () => {
  await writeDoc(ctx, klasseId, "math/quadratic.json", asPerson("anna"), { data: { level: "anna" } })
  const res = await list(klasseId)
  const docs = byPath(res.json().docs)
  assert.equal(docs["math/quadratic.json"].scope, "electra/apps/brains/klasse8a/anna")
  assert.equal(docs["math/quadratic.json"].data.level, "anna")
})
