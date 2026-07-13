// Reparenting a scope (setParentScope) — closure rebuild + guards. README §9.8.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, patch, readDoc, writeDoc, seedSharedDoc,
  createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("move_scope")

let ctx, brainsId, docsId, klasseId

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
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/brains")
  docsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/docs")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("moving a scope rebuilds its closure and updates its path", async () => {
  // before: klasse8a under apps/brains
  const before = await ancestorsOf(klasseId)
  assert.ok(before.some((a) => a.id === String(brainsId) && a.depth === 1))

  const res = await patch(ctx, `/database/scopes/${klasseId}`, asRootAdmin(), { parentRef: String(docsId) })
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().parentRef, String(docsId))

  const after = await ancestorsOf(klasseId)
  // now under docs; brains is gone from the chain
  assert.ok(after.some((a) => a.id === String(docsId) && a.depth === 1), "docs is direct parent")
  assert.ok(!after.some((a) => a.id === String(brainsId)), "brains no longer an ancestor")
  assert.ok(after.some((a) => a.depth === 0 && a.id === String(klasseId)), "self row kept")

  const meta = await get(ctx, `/database/scopes/${klasseId}`, asRootAdmin())
  assert.equal(meta.json().name, "electra/apps/docs/klasse8a")
})

test("content and members survive the move (identity is the id)", async () => {
  const sub = await createScope(ctx, brainsId, "keepme")
  await addMember(ctx, sub, "anna")
  await writeDoc(ctx, sub, "note.json", asPerson("anna"), { data: { v: 1 } })

  await patch(ctx, `/database/scopes/${sub}`, asRootAdmin(), { parentRef: String(docsId) })

  // anna's doc is still readable from the moved scope
  const doc = await readDoc(ctx, sub, "note.json", asPerson("anna"))
  assert.equal(doc.statusCode, 200)
  assert.equal(doc.json().data.v, 1)
})

test("inheritance shifts to the new parent chain", async () => {
  const sub = await createScope(ctx, brainsId, "inh")
  await addMember(ctx, sub, "anna")
  // shared doc on the OLD parent (brains) and a different one on the NEW parent (docs)
  await seedSharedDoc(ctx, brainsId, "p.json", { from: "brains" })
  await seedSharedDoc(ctx, docsId, "p.json", { from: "docs" })

  const beforeRead = await readDoc(ctx, sub, "p.json", asPerson("anna"))
  assert.equal(beforeRead.json().data.from, "brains")

  await patch(ctx, `/database/scopes/${sub}`, asRootAdmin(), { parentRef: String(docsId) })

  const afterRead = await readDoc(ctx, sub, "p.json", asPerson("anna"))
  assert.equal(afterRead.json().data.from, "docs") // now inherits from the new chain
})

test("guard: moving under own descendant → 409", async () => {
  const parent = await createScope(ctx, brainsId, "p1")
  const child = await createScope(ctx, parent, "c1")
  const res = await patch(ctx, `/database/scopes/${parent}`, asRootAdmin(), { parentRef: String(child) })
  assert.equal(res.statusCode, 409)
})

test("guard: name collision at target → 409", async () => {
  await createScope(ctx, docsId, "dup")
  const src = await createScope(ctx, brainsId, "dup")
  const res = await patch(ctx, `/database/scopes/${src}`, asRootAdmin(), { parentRef: String(docsId) })
  assert.equal(res.statusCode, 409)
})

test("guard: moving the root → 400", async () => {
  const rootId = await scopeIdByPath(ctx.pool, ctx.schema, "electra")
  const res = await patch(ctx, `/database/scopes/${rootId}`, asRootAdmin(), { parentRef: String(docsId) })
  assert.equal(res.statusCode, 400)
})

test("guard: moving a personal leaf → 409", async () => {
  // The leaf owner is admin of their own leaf, so they pass the source-admin
  // gate and hit the 'personal leaf cannot be moved' guard. They must also be
  // admin of the target — make them admin of docs for this check.
  const s = await createScope(ctx, brainsId, "withleaf")
  await addMember(ctx, s, "leafy")
  await post(ctx, `/database/scopes/${docsId}/admins`, asRootAdmin(), { personRef: "leafy" })
  const leaf = await ctx.pool.query(
    `SELECT id FROM "${ctx.schema}".scopes WHERE parent_id = $1 AND name = 'leafy'`, [s])
  const res = await patch(ctx, `/database/scopes/${leaf.rows[0].id}`, asPerson("leafy"), { parentRef: String(docsId) })
  assert.equal(res.statusCode, 409)
})

test("auth: non-admin of target → 403", async () => {
  const src = await createScope(ctx, brainsId, "authsrc")
  // 'nobody' is admin of neither src nor docs
  const res = await patch(ctx, `/database/scopes/${src}`, asPerson("nobody"), { parentRef: String(docsId) })
  assert.equal(res.statusCode, 403)
})
