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

test("on_login enrolls a fresh user into bootstrap + their personal workspace", async () => {
  const before = await get(ctx, "/database/scopes/mine", asPerson("newbie"))
  assert.equal(before.json().scopes.length, 0, "new user starts in no scope")

  const res = await post(ctx, "/database/on_login", asPerson("newbie"))
  assert.equal(res.statusCode, 200)
  // Enrolled into the bootstrap scope AND provisioned a personal workspace
  // (content/users/<person>) they are admin of.
  assert.ok(res.json().scopes.includes(String(appsId)), "enrolled into the bootstrap scope")
  assert.equal(res.json().scopes.length, 2, "bootstrap scope + personal workspace")

  const mine = await get(ctx, "/database/scopes/mine", asPerson("newbie"))
  const byName = Object.fromEntries(mine.json().scopes.map((s) => [s.name, s]))
  assert.ok(byName["electra/content/apps"], "apps root now in myScopes")
  assert.ok(byName["electra/content/users/newbie"], "personal workspace provisioned")
  assert.ok(byName["electra/content/users/newbie"].roles.includes("admin"), "admin of own workspace")
  const refs = mine.json().scopes.map((s) => s.scopeRef)
  assert.ok(!refs.includes(String(extraId)), "non-bootstrap scope not joined")
})

test("on_login is idempotent — no eager leaf, personal workspace once", async () => {
  await post(ctx, "/database/on_login", asPerson("repeat"))
  await post(ctx, "/database/on_login", asPerson("repeat"))
  const res = await post(ctx, "/database/on_login", asPerson("repeat"))
  assert.equal(res.statusCode, 200)

  // No personal LEAF is created on join anymore — it appears lazily on first
  // write, so on_login alone leaves none under the bootstrap scope.
  const leaves = await ctx.pool.query(
    `SELECT count(*)::int AS n FROM "${ctx.schema}".scopes
      WHERE parent_id = $1 AND name = $2 AND is_personal_leaf = true`,
    [appsId, "repeat"]
  )
  assert.equal(leaves.rows[0].n, 0, "no eager personal leaf on join")

  // The personal workspace, however, is provisioned exactly once (idempotent).
  const ws = await ctx.pool.query(
    `SELECT count(*)::int AS n FROM "${ctx.schema}".scopes s
       JOIN "${ctx.schema}".scopes u ON u.id = s.parent_id AND u.name = 'users'
      WHERE s.name = 'repeat'`
  )
  assert.equal(ws.rows[0].n, 1, "personal workspace provisioned once")
})

test("personal workspace is provisioned once, owned by the user", async () => {
  await post(ctx, "/database/on_login", asPerson("owner"))
  await post(ctx, "/database/on_login", asPerson("owner")) // repeat → idempotent

  // exactly one content/users/owner scope, not a personal leaf, owner is admin
  const rows = await ctx.pool.query(
    `SELECT s.id, s.is_personal_leaf, m.is_admin
       FROM "${ctx.schema}".scopes s
       JOIN "${ctx.schema}".scopes u ON u.id = s.parent_id AND u.name = 'users'
       LEFT JOIN "${ctx.schema}".memberships m ON m.scope_id = s.id AND m.person_ref = 'owner'
      WHERE s.name = 'owner'`
  )
  assert.equal(rows.rowCount, 1, "personal workspace provisioned exactly once")
  assert.equal(rows.rows[0].is_personal_leaf, false, "it is a real workspace, not a leaf")
  assert.equal(rows.rows[0].is_admin, true, "user is admin of their workspace")

  // the users container itself belongs to nobody
  const container = await ctx.pool.query(
    `SELECT count(*)::int AS n FROM "${ctx.schema}".memberships m
       JOIN "${ctx.schema}".scopes s ON s.id = m.scope_id
      WHERE s.name = 'users' AND s.parent_id = (
        SELECT id FROM "${ctx.schema}".scopes WHERE name = 'content')`
  )
  assert.equal(container.rows[0].n, 0, "the users container has no members")
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
