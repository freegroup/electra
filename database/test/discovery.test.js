// Scope discovery — README §9.7.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("discovery")

let ctx, brainsId, klasseId, agId

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/brains")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
  agId = await createScope(ctx, klasseId, "robotics-ag")
  await addMember(ctx, klasseId, "anna")
  await addMember(ctx, agId, "anna")
  await post(ctx, `/database/scopes/${klasseId}/reviewers`, asRootAdmin(), { personRef: "anna", score: 3 })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("myScopes returns the caller's explicit memberships with roles", async () => {
  const res = await get(ctx, `/database/scopes/mine`, asPerson("anna"))
  assert.equal(res.statusCode, 200)
  const byName = Object.fromEntries(res.json().scopes.map((s) => [s.name, s]))

  assert.ok(byName["electra/apps/brains/klasse8a"])
  assert.ok(byName["electra/apps/brains/klasse8a/robotics-ag"])
  // Roles are reported; anna is a reviewer of klasse8a.
  assert.ok(byName["electra/apps/brains/klasse8a"].roles.includes("member"))
  assert.ok(byName["electra/apps/brains/klasse8a"].roles.includes("reviewer"))
})

test("myScopes excludes the caller's personal leaves", async () => {
  const res = await get(ctx, `/database/scopes/mine`, asPerson("anna"))
  assert.ok(res.json().scopes.every((s) => !s.name.endsWith("/anna")))
})

test("by-path resolves a scope name to its ref", async () => {
  const res = await get(ctx, `/database/scopes/by-path?name=electra/apps/brains/klasse8a`, asPerson("anna"))
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().scopeRef, String(klasseId))
})

test("scope metadata is readable by a member", async () => {
  const res = await get(ctx, `/database/scopes/${klasseId}`, asPerson("anna"))
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().name, "electra/apps/brains/klasse8a")
  assert.equal(res.json().parent, String(brainsId))
})

test("by-path on an unknown name → 404", async () => {
  const res = await get(ctx, `/database/scopes/by-path?name=electra/nope`, asPerson("anna"))
  assert.equal(res.statusCode, 404)
})
