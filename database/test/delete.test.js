// Delete workflow — README §6.9.
//
// Deleting is a member action, not an author action: any member may delete a
// document they can see. A local delete writes a tombstone into the caller's
// own leaf (hidden from their view only). Promoting that tombstone runs the
// normal review; a commit becomes a group-wide tombstone. A delete committed
// at the root physically sweeps every remaining copy of the path.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, post, del, readDoc, writeDoc, createScope, addMember,
  seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("delete")

let ctx, brainsId, klasseId

const deleteDoc = (scopeRef, path, person, version) =>
  del(ctx, `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`,
    asPerson(person), version ? { version } : {})
const promote = (scopeRef, path, person, version) =>
  post(ctx, `/database/scopes/${scopeRef}/docs/promote?path=${encodeURIComponent(path)}`,
    asPerson(person), version ? { version } : {})

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  klasseId = await createScope(ctx, brainsId, "klasse8a", { requiredApprovalScore: 0 })
  await addMember(ctx, klasseId, "anna")
  await addMember(ctx, klasseId, "bob")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("a local delete hides the doc from the caller only", async () => {
  await seedSharedDoc(ctx, klasseId, "shared.json", { v: 1 })
  const res = await deleteDoc(klasseId, "shared.json", "anna")
  assert.equal(res.statusCode, 200, res.body)

  // Anna no longer sees it; bob still does.
  assert.equal((await readDoc(ctx, klasseId, "shared.json", asPerson("anna"))).statusCode, 404)
  assert.equal((await readDoc(ctx, klasseId, "shared.json", asPerson("bob"))).statusCode, 200)
})

test("a non-author member may delete a document", async () => {
  // bob authors it at the shared level; anna (not the author) deletes it.
  await writeDoc(ctx, klasseId, "bybob.json", asPerson("bob"), { data: { by: "bob" } })
  await promote(klasseId, "bybob.json", "bob", 1) // committed on klasse8a, by bob

  const res = await deleteDoc(klasseId, "bybob.json", "anna")
  assert.equal(res.statusCode, 200, res.body)
  assert.equal((await readDoc(ctx, klasseId, "bybob.json", asPerson("anna"))).statusCode, 404)
})

test("promoting a delete tombstones it for every member", async () => {
  await seedSharedDoc(ctx, klasseId, "group/gone.json", { v: 1 })
  // anna deletes locally, then promotes the tombstone upward (all levels here
  // auto-approve, so it commits as a group-wide delete).
  const localVersion = (await deleteDoc(klasseId, "group/gone.json", "anna")).json().version
  const p = await promote(klasseId, "group/gone.json", "anna", localVersion)
  assert.equal(p.statusCode, 200, p.body)
  assert.equal(p.json().status, "deleted")

  // Gone for every member — not just anna.
  assert.equal((await readDoc(ctx, klasseId, "group/gone.json", asPerson("anna"))).statusCode, 404)
  assert.equal((await readDoc(ctx, klasseId, "group/gone.json", asPerson("bob"))).statusCode, 404)
})

test("a delete tombstone stops at the first review level (stays local until approved)", async () => {
  // reviewed (score 5) → sub (score 0). anna deletes at sub, promotes: it
  // commits on sub (auto) but only becomes PENDING on reviewed.
  const reviewedId = await createScope(ctx, brainsId, "reviewed-del", { requiredApprovalScore: 5 })
  const subId = await createScope(ctx, reviewedId, "sub", { requiredApprovalScore: 0 })
  await addMember(ctx, subId, "anna")
  await addMember(ctx, subId, "bob")
  await seedSharedDoc(ctx, reviewedId, "d.json", { v: 1 })

  const localVersion = (await deleteDoc(subId, "d.json", "anna")).json().version
  const p = await promote(subId, "d.json", "anna", localVersion)
  // Committed as a tombstone on sub, pending on reviewed.
  assert.equal(p.json().status, "pending")

  // Gone for sub members; still visible one level up at 'reviewed'.
  assert.equal((await readDoc(ctx, subId, "d.json", asPerson("bob"))).statusCode, 404)
  assert.equal((await readDoc(ctx, reviewedId, "d.json", asPerson("anna"))).statusCode, 200)
})

test("delete concurrency: a stale version → 409 outdated", async () => {
  await writeDoc(ctx, klasseId, "cc.json", asPerson("anna"), { data: {} })   // leaf v1
  await writeDoc(ctx, klasseId, "cc.json", asPerson("anna"), { data: {} })   // leaf v2
  const res = await deleteDoc(klasseId, "cc.json", "anna", 1)                // stale
  assert.equal(res.statusCode, 409)
  assert.equal(res.json().error.code, "outdated")
})

test("cascading root delete physically sweeps all sub-scope copies", async () => {
  const rootId = await scopeIdByPath(ctx.pool, ctx.schema, "electra")
  // A doc exists at the root and is overridden in a class leaf below it.
  await seedSharedDoc(ctx, rootId, "policy.json", { v: "root" })
  await addMember(ctx, rootId, "anna")           // anna may write at the root
  await writeDoc(ctx, klasseId, "policy.json", asPerson("anna"), { data: { v: "klasse" } })

  // anna deletes at the root and promotes; the root has score 0 so it commits.
  const localV = (await deleteDoc(rootId, "policy.json", "anna")).json().version
  const p = await promote(rootId, "policy.json", "anna", localV)
  assert.equal(p.json().status, "deleted")

  // Every non-root copy of the path is physically gone; only the root
  // tombstone remains.
  const rows = await ctx.pool.query(
    `SELECT s.parent_id FROM "${ctx.schema}".versions v
       JOIN "${ctx.schema}".scopes s ON s.id = v.scope_id
      WHERE v.doc_path = 'policy.json'`
  )
  assert.ok(rows.rows.every((r) => r.parent_id === null), "only root rows remain")
})
