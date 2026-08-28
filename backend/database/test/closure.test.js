// Verifies scope_closure population + basic scope creation flow.
// The canonical structure (electra, users, content, content/apps) is
// auto-provisioned. Tests add further sub-scopes below it.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema, asPerson, asRootAdmin,
} = require("./helpers")
setupTestSchema("closure")

let ctx
let brainsId

async function scopeIdByPath(pathString) {
  // Walk adjacency via SQL — the by-path helper endpoint was removed.
  const parts = pathString.split("/").filter(Boolean)
  let parentId = null
  for (const p of parts) {
    const res = parentId === null
      ? await ctx.pool.query(
          `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id IS NULL AND name = $1`,
          [p]
        )
      : await ctx.pool.query(
          `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id = $1 AND name = $2`,
          [parentId, p]
        )
    if (res.rowCount === 0) return null
    parentId = res.rows[0].id
  }
  return parentId
}

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath("electra/content/apps")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("root closure contains the auto-provisioned scopes", async () => {
  // 4 scopes: electra, users, content, content/apps.
  const rows = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".scopes`
  )
  assert.equal(rows.rows[0].n, 4)

  // Each of them has a self-row in the closure.
  const closureSelf = await ctx.pool.query(
    `SELECT COUNT(*)::int AS n FROM "${ctx.schema}".scope_closure
     WHERE ancestor_id = descendant_id AND depth = 0`
  )
  assert.equal(closureSelf.rows[0].n, 4)
})

test("closure for content/apps contains itself + content + electra", async () => {
  const rows = await ctx.pool.query(
    `SELECT depth FROM "${ctx.schema}".scope_closure
     WHERE descendant_id = $1 ORDER BY depth`,
    [brainsId]
  )
  assert.equal(rows.rows.length, 3)
  assert.deepEqual(rows.rows.map((r) => r.depth), [0, 1, 2])
})

test("creating a sub-scope under content/apps populates closure", async () => {
  const res = await ctx.fastify.inject({
    method: "POST",
    url: `/database/scopes/${brainsId}/scopes`,
    headers: asRootAdmin(),
    payload: { name: "klasse8a", requiredApprovalScore: 0 },
  })
  assert.equal(res.statusCode, 201, res.body)
  assert.equal(res.json().path, "apps/klasse8a")

  const klasse8aId = res.json().id
  const rows = await ctx.pool.query(
    `SELECT ancestor_id, depth FROM "${ctx.schema}".scope_closure
     WHERE descendant_id = $1 ORDER BY depth`,
    [klasse8aId]
  )
  // Self + content/apps + content + electra = 4 rows
  assert.equal(rows.rows.length, 4)
  assert.deepEqual(rows.rows.map((r) => r.depth), [0, 1, 2, 3])
})

test("non-admin cannot create sub-scopes under content/apps", async () => {
  const res = await ctx.fastify.inject({
    method: "POST",
    url: `/database/scopes/${brainsId}/scopes`,
    headers: asPerson("someone_else"),
    payload: { name: "hack", requiredApprovalScore: 0 },
  })
  assert.equal(res.statusCode, 403)
})

test("duplicate name under same parent conflicts", async () => {
  // 'klasse8a' was created above.
  const res = await ctx.fastify.inject({
    method: "POST",
    url: `/database/scopes/${brainsId}/scopes`,
    headers: asRootAdmin(),
    payload: { name: "klasse8a", requiredApprovalScore: 0 },
  })
  assert.equal(res.statusCode, 409)
})
