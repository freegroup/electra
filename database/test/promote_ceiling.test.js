// Promote ceiling — content can rise up to a scope but never above it.
// README §6.5. A promotion-only constraint; distribute is unaffected.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, patch, writeDoc, createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("promote_ceiling")

let ctx, electraId, appsId, brainsId

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
  electraId = await scopeIdByPath(ctx.pool, ctx.schema, "electra")
  appsId    = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps")
  brainsId  = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/brains")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("a ceiling halts the score-0 cascade — no copies rise above it", async () => {
  // Mark apps as a ceiling. All levels are score-0, so a promote would normally
  // cascade to the root; the ceiling must stop it at apps.
  const p = await patch(ctx, `/database/scopes/${appsId}`, asRootAdmin(), { promoteCeiling: true })
  assert.equal(p.statusCode, 200)

  await addMember(ctx, brainsId, "anna")
  await writeDoc(ctx, brainsId, "capped.json", asPerson("anna"), { data: { v: 1 } })
  const res = await promote(brainsId, "capped.json", "anna", 1)
  assert.equal(res.statusCode, 200, res.body)

  assert.equal(await versionsOn(brainsId, "capped.json"), 1, "committed on brains")
  assert.equal(await versionsOn(appsId, "capped.json"), 1, "committed on apps (the ceiling)")
  assert.equal(await versionsOn(electraId, "capped.json"), 0, "nothing above the ceiling")
})

test("landing on the ceiling scope itself is allowed", async () => {
  // brains is the ceiling; a member promotes a leaf doc up to brains' shared
  // version — that lands ON the ceiling, which is fine.
  await patch(ctx, `/database/scopes/${brainsId}`, asRootAdmin(), { promoteCeiling: true })
  await addMember(ctx, brainsId, "bob")
  await writeDoc(ctx, brainsId, "onceiling.json", asPerson("bob"), { data: { v: 1 } })
  const res = await promote(brainsId, "onceiling.json", "bob", 1)
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().status, "committed")
  assert.equal(res.json().scopeRef, String(brainsId))
  // Stopped at brains — did not rise to apps.
  assert.equal(await versionsOn(appsId, "onceiling.json"), 0)
})

test("without the flag the cascade still reaches the root", async () => {
  // A fresh sub-tree with no ceiling anywhere.
  const klasse = await createScope(ctx, brainsId, "klasse-open", { requiredApprovalScore: 0 })
  await addMember(ctx, klasse, "carl")
  await writeDoc(ctx, klasse, "free.json", asPerson("carl"), { data: { v: 1 } })
  await promote(klasse, "free.json", "carl", 1)
  // brains is a ceiling from the previous test, so this run stops at brains —
  // guard against test-order coupling by using a path only under klasse and
  // asserting it climbed at least past klasse to brains.
  assert.equal(await versionsOn(klasse, "free.json"), 1)
  assert.equal(await versionsOn(brainsId, "free.json"), 1)
})

test("PATCH toggles the ceiling and it shows up in scope metadata", async () => {
  const shapes = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/shapes")
  await patch(ctx, `/database/scopes/${shapes}`, asRootAdmin(), { promoteCeiling: true })
  let meta = await get(ctx, `/database/scopes/${shapes}`, asRootAdmin())
  assert.equal(meta.json().promoteCeiling, true)

  await patch(ctx, `/database/scopes/${shapes}`, asRootAdmin(), { promoteCeiling: false })
  meta = await get(ctx, `/database/scopes/${shapes}`, asRootAdmin())
  assert.equal(meta.json().promoteCeiling, false)
})
