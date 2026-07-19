// Anonymous readers and the world-readable root. README §3.6.
//
// An anonymous caller (no login) may read the root scope's shared content and
// published documents — nothing else. It owns no leaf and can never write.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asAnon, asPerson, asRootAdmin, get, patch, writeDoc, seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("anonymous")

let ctx, electraId, appsId

before(async () => {
  ctx = await newTestSchema()
  electraId = await scopeIdByPath(ctx.pool, ctx.schema, "electra")
  appsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content")
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

// ---- is_anonymous flag (non-transitive) ---------------------------------

test("flagged scope becomes anonymous-readable; sibling stays private", async () => {
  const brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  await seedSharedDoc(ctx, brainsId, "demo.json", { hello: "world" })

  // Before flagging: anonymous is denied.
  let res = await get(ctx, `/database/scopes/${brainsId}/docs?path=demo.json`, asAnon())
  assert.equal(res.statusCode, 403)

  // Admin flips the flag on.
  const p = await patch(ctx, `/database/scopes/${brainsId}`, asRootAdmin(), { anonymous: true })
  assert.equal(p.statusCode, 200)
  assert.equal(p.json().anonymous, true)

  // Now anonymous can read the flagged scope's shared doc + list it.
  res = await get(ctx, `/database/scopes/${brainsId}/docs?path=demo.json`, asAnon())
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().data.hello, "world")

  const glob = await get(ctx, `/database/scopes/${brainsId}/docs?glob=true`, asAnon())
  assert.equal(glob.statusCode, 200)
  assert.ok(glob.json().docs.some((d) => d.path === "demo.json"))

  // Non-transitive: the parent apps scope is NOT anonymous-readable.
  const parent = await get(ctx, `/database/scopes/${appsId}/docs?path=internal.json`, asAnon())
  assert.equal(parent.statusCode, 403)
})

test("anonymous still cannot write to an anonymous-readable scope → 401", async () => {
  const brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  await patch(ctx, `/database/scopes/${brainsId}`, asRootAdmin(), { anonymous: true })
  const res = await writeDoc(ctx, brainsId, "hack.json", asAnon(), { data: { x: 1 } })
  assert.equal(res.statusCode, 401)
})

// ---- anonymous discovery: public browsing (roots, glob, children) --------

test("anonymous roots returns the public scopes as entry points", async () => {
  const brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  await patch(ctx, `/database/scopes/${brainsId}`, asRootAdmin(), { anonymous: true })

  const res = await get(ctx, `/database/scopes/roots`, asAnon())
  assert.equal(res.statusCode, 200)
  const roots = res.json().roots
  assert.ok(roots.some((r) => r.scopeRef === String(brainsId)))
  // An anonymous caller holds no membership, so no root is flagged as such.
  assert.ok(roots.every((r) => r.isMember === false))
})

test("anonymous glob from a non-public ancestor still returns the public scope's docs", async () => {
  const brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  await patch(ctx, `/database/scopes/${brainsId}`, asRootAdmin(), { anonymous: true })
  await seedSharedDoc(ctx, brainsId, "public-demo.json", { visible: true })

  // appsId (electra/content) is NOT itself anonymous — a per-scope read 403s —
  // but glob aggregates only the public content beneath it, so it must not 403.
  const res = await get(ctx, `/database/scopes/${appsId}/docs?glob=true`, asAnon())
  assert.equal(res.statusCode, 200)
  assert.ok(res.json().docs.some((d) => d.path === "public-demo.json"))
})

test("anonymous children of a public scope never leak a private child", async () => {
  const brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  await patch(ctx, `/database/scopes/${brainsId}`, asRootAdmin(), { anonymous: true })

  const res = await get(ctx, `/database/scopes/${brainsId}/children`, asAnon())
  assert.equal(res.statusCode, 200)
  // Whatever surfaces must itself be public — private sub-workspaces stay hidden.
  assert.ok(res.json().children.every((c) => c.anonymous === true))
})

test("anonymous cannot list children of a non-public scope → 403", async () => {
  // appsId (electra/content) is not flagged anonymous.
  const res = await get(ctx, `/database/scopes/${appsId}/children`, asAnon())
  assert.equal(res.statusCode, 403)
})
