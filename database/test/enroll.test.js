// Bootstrap enrollment (on_login) + glob list. README §9.7.
//
// A scope flagged is_bootstrap auto-enrolls every logged-in user on login.
// The glob list aggregates all docs under a root scope across the caller's
// groups, one row per path, annotated with its provider + operating scope.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, patch, writeDoc,
  createScope, addMember, scopeIdByPath, seedSharedDoc,
} = require("./helpers")
setupTestSchema("enroll")

let ctx, appsId, extraId

before(async () => {
  ctx = await newTestSchema()
  appsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  // a plain (non-bootstrap) scope, to prove on_login joins only bootstrap ones
  extraId = await createScope(ctx, appsId, "extra")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("on_login enrolls a fresh user into every bootstrap scope", async () => {
  const before = await get(ctx, "/database/scopes/mine", asPerson("newbie"))
  assert.equal(before.json().scopes.length, 0, "new user starts in no scope")

  const res = await post(ctx, "/database/on_login", asPerson("newbie"))
  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.json().scopes, [String(appsId)], "enrolled into the bootstrap scope only")

  const mine = await get(ctx, "/database/scopes/mine", asPerson("newbie"))
  const refs = mine.json().scopes.map((s) => s.scopeRef)
  assert.ok(refs.includes(String(appsId)), "apps root now in myScopes")
  assert.ok(!refs.includes(String(extraId)), "non-bootstrap scope not joined")
})

test("on_login is idempotent — no duplicate leaves on repeat", async () => {
  await post(ctx, "/database/on_login", asPerson("repeat"))
  await post(ctx, "/database/on_login", asPerson("repeat"))
  const res = await post(ctx, "/database/on_login", asPerson("repeat"))
  assert.equal(res.statusCode, 200)

  const leaves = await ctx.pool.query(
    `SELECT count(*)::int AS n FROM "${ctx.schema}".scopes
      WHERE parent_id = $1 AND name = $2`,
    [appsId, "repeat"]
  )
  assert.equal(leaves.rows[0].n, 1, "leaf provisioned once")
})

test("PATCH toggles is_bootstrap; enrollment follows the flag", async () => {
  let mine = await post(ctx, "/database/on_login", asPerson("flagfollower"))
  assert.ok(!mine.json().scopes.includes(String(extraId)))

  const p = await patch(ctx, `/database/scopes/${extraId}`, asRootAdmin(), { bootstrap: true })
  assert.equal(p.statusCode, 200)
  assert.equal(p.json().bootstrap, true)

  const res = await post(ctx, "/database/on_login", asPerson("afterflip"))
  assert.ok(res.json().scopes.includes(String(extraId)), "joins newly-bootstrap scope")

  const meta = await get(ctx, `/database/scopes/${extraId}`, asRootAdmin())
  assert.equal(meta.json().bootstrap, true)

  // restore so later tests see the extra scope as non-bootstrap
  await patch(ctx, `/database/scopes/${extraId}`, asRootAdmin(), { bootstrap: false })
})

test("glob lists all docs under a root, one row per path, with provider", async () => {
  await seedSharedDoc(ctx, appsId, "shared.brain", { v: 1 })
  const wgId = await createScope(ctx, appsId, "wg")
  await addMember(ctx, wgId, "globber")
  await post(ctx, "/database/on_login", asPerson("globber"))
  await writeDoc(ctx, wgId, "mine.brain", asPerson("globber"), { data: { v: 1 } })

  const res = await get(ctx, `/database/scopes/${appsId}/docs?glob=true`, asPerson("globber"))
  assert.equal(res.statusCode, 200)
  const docs = res.json().docs
  const byPath = Object.fromEntries(docs.map((d) => [d.path, d]))

  const paths = docs.map((d) => d.path)
  assert.equal(new Set(paths).size, paths.length, "no duplicate paths")

  assert.ok(byPath["shared.brain"], "shared doc visible")
  assert.equal(byPath["shared.brain"].provider, "electra/content/apps")

  assert.ok(byPath["mine.brain"], "own doc visible")
  assert.equal(byPath["mine.brain"].operatingScopeRef, String(wgId))

  assert.equal(byPath["shared.brain"].data, undefined, "glob omits data")
})
