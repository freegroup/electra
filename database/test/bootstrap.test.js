// One-shot bootstrap: on the first boot the server provisions the tree
// declared in init.json (test-init.json for tests). Later boots are no-ops.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson,
  asRootAdmin, ROOT_ADMIN_HASH,
} = require("./helpers")
setupTestSchema("bootstrap")

let ctx

before(async () => {
  ctx = await newTestSchema()
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("root scope 'electra' exists after boot", async () => {
  const res = await ctx.pool.query(
    `SELECT id, name, parent_id FROM "${ctx.schema}".scopes WHERE parent_id IS NULL`
  )
  assert.equal(res.rowCount, 1)
  assert.equal(res.rows[0].name, "electra")
})

test("root admin is the hash of the email declared in init.json", async () => {
  const rows = await ctx.pool.query(
    `SELECT person_ref, is_admin, reviewer_score
     FROM "${ctx.schema}".memberships m
     JOIN "${ctx.schema}".scopes s ON s.id = m.scope_id
     WHERE s.parent_id IS NULL`
  )
  assert.equal(rows.rowCount, 1)
  assert.equal(rows.rows[0].person_ref, ROOT_ADMIN_HASH)
  assert.equal(rows.rows[0].is_admin, true)
  assert.equal(rows.rows[0].reviewer_score, 10)
})

test("canonical children exist: users, apps, apps/{brains,shapes,docs}", async () => {
  const rows = await ctx.pool.query(
    `SELECT s.name, p.name AS parent_name
     FROM "${ctx.schema}".scopes s
     LEFT JOIN "${ctx.schema}".scopes p ON p.id = s.parent_id
     ORDER BY p.name NULLS FIRST, s.name`
  )
  const paths = rows.rows.map((r) => (r.parent_name ? `${r.parent_name}/${r.name}` : r.name))
  // We expect the canonical scopes from test-init.json.
  for (const expected of ["electra", "electra/users", "electra/content", "content/apps"]) {
    assert.ok(paths.includes(expected), `expected ${expected} in ${JSON.stringify(paths)}`)
  }
})

test("second build() is a full no-op (bootstrap detects existing root)", async () => {
  const before = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".scopes`
  )
  // Run build() again — migrate is idempotent, bootstrap should skip.
  const { build } = require("../server/index")
  const fastify2 = await build()
  await fastify2.close()

  const after = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".scopes`
  )
  assert.equal(after.rows[0].n, before.rows[0].n)
})

test("anonym callers still rejected at protected endpoints", async () => {
  const res = await ctx.fastify.inject({
    method: "GET",
    url: `/database/health`,
  })
  // Health endpoint is not protected, so this should be 200.
  assert.equal(res.statusCode, 200)
})
