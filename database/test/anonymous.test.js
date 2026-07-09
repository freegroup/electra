// Anonymous readers and the world-readable root. README §3.6.
//
// An anonymous caller (no login) may read the root scope's shared content and
// published documents — nothing else. It owns no leaf and can never write.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asAnon, asPerson, get, writeDoc, seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("anonymous")

let ctx, electraId, appsId

before(async () => {
  ctx = await newTestSchema()
  electraId = await scopeIdByPath(ctx.pool, ctx.schema, "electra")
  appsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps")
  await seedSharedDoc(ctx, electraId, "welcome.json", { public: true })
  await seedSharedDoc(ctx, appsId, "internal.json", { public: false })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("anonymous reads a document at the root", async () => {
  const res = await get(ctx, `/database/scopes/${electraId}/docs?path=welcome.json`, asAnon())
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.public, true)
})

test("anonymous lists the root", async () => {
  const res = await get(ctx, `/database/scopes/${electraId}/docs`, asAnon())
  assert.equal(res.statusCode, 200)
  assert.ok(res.json().docs.some((d) => d.path === "welcome.json"))
})

test("anonymous cannot read a non-root scope → 403", async () => {
  const res = await get(ctx, `/database/scopes/${appsId}/docs?path=internal.json`, asAnon())
  assert.equal(res.statusCode, 403)
})

test("anonymous cannot write anywhere → 401", async () => {
  const res = await writeDoc(ctx, electraId, "hack.json", asAnon(), { data: { x: 1 } })
  assert.equal(res.statusCode, 401)
})

test("a logged-in member also reads the root transitively", async () => {
  // The root admin is a member of the root; anyone with any membership can
  // read the root. Here the root admin reads their own root doc.
  const res = await get(ctx, `/database/scopes/${electraId}/docs?path=welcome.json`, asPerson(require("./helpers").ROOT_ADMIN_HASH))
  assert.equal(res.statusCode, 200)
})
