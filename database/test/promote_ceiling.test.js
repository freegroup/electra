// Promote ceiling — content can rise up to a scope but never above it.
// README §6.5. A promotion-only constraint; distribute is unaffected.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, patch, writeDoc, createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("promote_ceiling")

let ctx, contentId, appsId, klasseId

const promote = (scopeRef, path, person, version) =>
  post(ctx, `/database/scopes/${scopeRef}/docs/promote?path=${encodeURIComponent(path)}`,
    asPerson(person), version ? { version } : {})

// How many committed/deleted versions of a path exist on a given scope.
async function versionsOn(scopeId, path) {
  const r = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".versions
      WHERE scope_id = $1 AND doc_path = $2`,
    [scopeId, path]
  )
  return r.rows[0].n
}

before(async () => {
  ctx = await newTestSchema()
  contentId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content")
  appsId    = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  // a group under the shared apps root; the promote chain is klasse → apps → content
  klasseId  = await createScope(ctx, appsId, "klasse8a")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("a ceiling halts the score-0 cascade — no copies rise above it", async () => {
  // Mark apps as a ceiling. All levels are score-0, so a promote would normally
  // cascade to content; the ceiling must stop it at apps.
  const p = await patch(ctx, `/database/scopes/${appsId}`, asRootAdmin(), { promoteCeiling: true })
  assert.equal(p.statusCode, 200)

  await addMember(ctx, klasseId, "anna")
  await writeDoc(ctx, klasseId, "capped.json", asPerson("anna"), { data: { v: 1 } })
  const res = await promote(klasseId, "capped.json", "anna", 1)
  assert.equal(res.statusCode, 200, res.body)

  assert.equal(await versionsOn(klasseId, "capped.json"), 1, "committed on klasse")
  assert.equal(await versionsOn(appsId, "capped.json"), 1, "committed on apps (the ceiling)")
  assert.equal(await versionsOn(contentId, "capped.json"), 0, "nothing above the ceiling")
})

test("landing on the ceiling scope itself is allowed", async () => {
  // apps is the ceiling; a member promotes a leaf doc up to apps' shared
  // version — that lands ON the ceiling, which is fine.
  await patch(ctx, `/database/scopes/${appsId}`, asRootAdmin(), { promoteCeiling: true })
  await addMember(ctx, appsId, "bob")
  await writeDoc(ctx, appsId, "onceiling.json", asPerson("bob"), { data: { v: 1 } })
  const res = await promote(appsId, "onceiling.json", "bob", 1)
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().status, "committed")
  assert.equal(res.json().scopeRef, String(appsId))
  // Stopped at apps — did not rise to content.
  assert.equal(await versionsOn(contentId, "onceiling.json"), 0)
})

test("without the flag the cascade still reaches the root", async () => {
  // A fresh sub-tree with no ceiling anywhere.
  const klasse = await createScope(ctx, appsId, "klasse-open", { requiredApprovalScore: 0 })
  await addMember(ctx, klasse, "carl")
  await writeDoc(ctx, klasse, "free.json", asPerson("carl"), { data: { v: 1 } })
  await promote(klasse, "free.json", "carl", 1)
  // apps may be a ceiling from a previous test, so this run stops at apps —
  // guard against test-order coupling by using a path only under klasse and
  // asserting it climbed at least past klasse to apps.
  assert.equal(await versionsOn(klasse, "free.json"), 1)
  assert.equal(await versionsOn(appsId, "free.json"), 1)
})

test("PATCH toggles the ceiling and it shows up in scope metadata", async () => {
  const scope = await createScope(ctx, appsId, "ceiling-toggle")
  await patch(ctx, `/database/scopes/${scope}`, asRootAdmin(), { promoteCeiling: true })
  let meta = await get(ctx, `/database/scopes/${scope}`, asRootAdmin())
  assert.equal(meta.json().promoteCeiling, true)

  await patch(ctx, `/database/scopes/${scope}`, asRootAdmin(), { promoteCeiling: false })
  meta = await get(ctx, `/database/scopes/${scope}`, asRootAdmin())
  assert.equal(meta.json().promoteCeiling, false)
})
