// Optimistic concurrency on writes — README §6.12.
//
// A put that claims to build on the caller's own leaf version must match the
// current active leaf version, else it fails with 409 outdated. New documents
// and edits of an inherited version start a fresh leaf version without a check.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, readDoc, writeDoc, createScope, addMember, seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("concurrency")

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

test("a brand-new document becomes leaf version 1", async () => {
  const res = await writeDoc(ctx, klasseId, "n.json", asPerson("anna"), { data: { v: "a" } })
  assert.equal(res.statusCode, 201)
  assert.equal(res.json().version, 1)
})

test("editing the current leaf version succeeds and bumps the version", async () => {
  const current = (await readDoc(ctx, klasseId, "n.json", asPerson("anna"))).json()
  const res = await writeDoc(ctx, klasseId, "n.json", asPerson("anna"), {
    ...current,
    data: { v: "b" },
  })
  assert.equal(res.statusCode, 201)
  assert.equal(res.json().version, 2)
})

test("editing a stale leaf version → 409 outdated", async () => {
  // Build on version 1 while the active leaf version is already 2.
  const stale = {
    data: { v: "c" },
    scope: "electra/content/apps/klasse8a/anna",
    version: 1,
  }
  const res = await writeDoc(ctx, klasseId, "n.json", asPerson("anna"), stale)
  assert.equal(res.statusCode, 409)
  assert.equal(res.json().error.code, "outdated")
})

test("editing an inherited version starts a fresh leaf v1, no conflict", async () => {
  await seedSharedDoc(ctx, brainsId, "inh.json", { level: "brains", version: 7 })
  const inherited = (await readDoc(ctx, klasseId, "inh.json", asPerson("anna"))).json()
  assert.equal(inherited.scope, "electra/content/apps")

  // Pass the inherited doc as-is (its scope is brains, not the leaf).
  const res = await writeDoc(ctx, klasseId, "inh.json", asPerson("anna"), {
    ...inherited,
    data: { level: "anna" },
  })
  assert.equal(res.statusCode, 201)
  assert.equal(res.json().version, 1)
  assert.equal(res.json().scope, "electra/content/apps/klasse8a/anna")
})
