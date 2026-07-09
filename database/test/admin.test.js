// Administration surface — README §9.8.
//
// Structural and role management is admin-gated. Membership, admin, and
// reviewer roles are independent; the required approval score is configurable.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, asAnon, get, post, patch, del, createScope, scopeIdByPath,
} = require("./helpers")
setupTestSchema("admin")

let ctx, brainsId, klasseId

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/brains")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("an admin adds and removes a member", async () => {
  const add = await post(ctx, `/database/scopes/${klasseId}/members`, asRootAdmin(), { personRef: "anna" })
  assert.equal(add.statusCode, 201)

  const rm = await del(ctx, `/database/scopes/${klasseId}/members/anna`, asRootAdmin())
  assert.equal(rm.statusCode, 200)

  const row = await ctx.pool.query(
    `SELECT is_member FROM "${ctx.schema}".memberships WHERE scope_id = $1 AND person_ref = 'anna'`,
    [klasseId]
  )
  // Either removed entirely, or is_member cleared.
  assert.ok(row.rowCount === 0 || row.rows[0].is_member === false)
})

test("granting a reviewer role is independent of membership", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/reviewers`, asRootAdmin(), { personRef: "meier", score: 4 })
  assert.equal(res.statusCode, 200)

  const row = await ctx.pool.query(
    `SELECT is_member, reviewer_score FROM "${ctx.schema}".memberships
      WHERE scope_id = $1 AND person_ref = 'meier'`,
    [klasseId]
  )
  assert.equal(row.rows[0].reviewer_score, 4)
  assert.equal(row.rows[0].is_member, false) // reviewer only, not a member
})

test("the required approval score is configurable", async () => {
  const res = await patch(ctx, `/database/scopes/${klasseId}`, asRootAdmin(), { requiredApprovalScore: 7 })
  assert.equal(res.statusCode, 200)
  const meta = await get(ctx, `/database/scopes/${klasseId}`, asRootAdmin())
  assert.equal(meta.json().requiredApprovalScore, 7)
})

test("a non-admin cannot manage a scope → 403", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/reviewers`, asPerson("nobody"), { personRef: "x", score: 1 })
  assert.equal(res.statusCode, 403)
})

test("an anonymous caller cannot manage a scope → 401", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/scopes`, asAnon(), { name: "x" })
  assert.equal(res.statusCode, 401)
})

test("self-enrollment: a caller may add themselves without being admin", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/members`, asPerson("selfie"), { personRef: "selfie" })
  assert.equal(res.statusCode, 201)
})
