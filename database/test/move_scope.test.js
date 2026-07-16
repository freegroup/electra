// Reparenting a scope (setParentScope) — closure rebuild + guards. README §9.8.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, patch, readDoc, writeDoc, seedSharedDoc,
  createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("move_scope")

let ctx, appsId, targetId, klasseId

// closure ancestor ids (with depth) of a scope, from the DB
async function ancestorsOf(scopeId) {
  const r = await ctx.pool.query(
    `SELECT ancestor_id, depth FROM "${ctx.schema}".scope_closure
      WHERE descendant_id = $1 ORDER BY depth`,
    [scopeId]
  )
  return r.rows.map((x) => ({ id: String(x.ancestor_id), depth: x.depth }))
}

before(async () => {
  ctx = await newTestSchema()
  const contentId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content")
  appsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  // move target on a DIFFERENT branch (under content, sibling of apps) so a move
  // off the apps subtree really drops apps from the ancestor chain
  targetId = await createScope(ctx, contentId, "target")
  klasseId = await createScope(ctx, appsId, "klasse8a")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("moving a scope rebuilds its closure and updates its path", async () => {
  // before: klasse8a under content/apps
  const before = await ancestorsOf(klasseId)
  assert.ok(before.some((a) => a.id === String(appsId) && a.depth === 1))

  const res = await patch(ctx, `/database/scopes/${klasseId}`, asRootAdmin(), { parentRef: String(targetId) })
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().parentRef, String(targetId))

  const after = await ancestorsOf(klasseId)
  // now under target; apps is gone from the chain
  assert.ok(after.some((a) => a.id === String(targetId) && a.depth === 1), "target is direct parent")
  assert.ok(!after.some((a) => a.id === String(appsId)), "apps no longer an ancestor")
  assert.ok(after.some((a) => a.depth === 0 && a.id === String(klasseId)), "self row kept")

  const meta = await get(ctx, `/database/scopes/${klasseId}`, asRootAdmin())
  assert.equal(meta.json().name, "electra/content/target/klasse8a")
})

test("content and members survive the move (identity is the id)", async () => {
  const sub = await createScope(ctx, appsId, "keepme")
  await addMember(ctx, sub, "anna")
  await writeDoc(ctx, sub, "note.json", asPerson("anna"), { data: { v: 1 } })

  await patch(ctx, `/database/scopes/${sub}`, asRootAdmin(), { parentRef: String(targetId) })

  // anna's doc is still readable from the moved scope
  const doc = await readDoc(ctx, sub, "note.json", asPerson("anna"))
  assert.equal(doc.statusCode, 200)
  assert.equal(doc.json().data.v, 1)
})

test("inheritance shifts to the new parent chain", async () => {
  const sub = await createScope(ctx, appsId, "inh")
  await addMember(ctx, sub, "anna")
  // shared doc on the OLD parent (apps) and a different one on the NEW parent (target)
  await seedSharedDoc(ctx, appsId, "p.json", { from: "apps" })
  await seedSharedDoc(ctx, targetId, "p.json", { from: "target" })

  const beforeRead = await readDoc(ctx, sub, "p.json", asPerson("anna"))
  assert.equal(beforeRead.json().data.from, "apps")

  await patch(ctx, `/database/scopes/${sub}`, asRootAdmin(), { parentRef: String(targetId) })

  const afterRead = await readDoc(ctx, sub, "p.json", asPerson("anna"))
  assert.equal(afterRead.json().data.from, "target") // now inherits from the new chain
})

test("guard: moving under own descendant → 409", async () => {
  const parent = await createScope(ctx, appsId, "p1")
  const child = await createScope(ctx, parent, "c1")
  const res = await patch(ctx, `/database/scopes/${parent}`, asRootAdmin(), { parentRef: String(child) })
  assert.equal(res.statusCode, 409)
})

test("guard: name collision at target → 409", async () => {
  await createScope(ctx, targetId, "dup")
  const src = await createScope(ctx, appsId, "dup")
  const res = await patch(ctx, `/database/scopes/${src}`, asRootAdmin(), { parentRef: String(targetId) })
  assert.equal(res.statusCode, 409)
})

test("guard: moving the root → 400", async () => {
  const rootId = await scopeIdByPath(ctx.pool, ctx.schema, "electra")
  const res = await patch(ctx, `/database/scopes/${rootId}`, asRootAdmin(), { parentRef: String(targetId) })
  assert.equal(res.statusCode, 400)
})

test("guard: moving a personal leaf → 409", async () => {
  // The leaf owner is admin of their own leaf, so they pass the source-admin
  // gate and hit the 'personal leaf cannot be moved' guard. They must also be
  // admin of the target — make them admin of docs for this check.
  const s = await createScope(ctx, appsId, "withleaf")
  await addMember(ctx, s, "leafy")
  // leaf is provisioned lazily on first write
  await writeDoc(ctx, s, "n.json", asPerson("leafy"), { data: { v: 1 } })
  await post(ctx, `/database/scopes/${targetId}/admins`, asRootAdmin(), { personRef: "leafy" })
  const leaf = await ctx.pool.query(
    `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id = $1 AND name = 'leafy'`, [s])
  const res = await patch(ctx, `/database/scopes/${leaf.rows[0].id}`, asPerson("leafy"), { parentRef: String(targetId) })
  assert.equal(res.statusCode, 409)
})

test("auth: non-admin of target → 403", async () => {
  const src = await createScope(ctx, appsId, "authsrc")
  // 'nobody' is admin of neither src nor docs
  const res = await patch(ctx, `/database/scopes/${src}`, asPerson("nobody"), { parentRef: String(targetId) })
  assert.equal(res.statusCode, 403)
})
