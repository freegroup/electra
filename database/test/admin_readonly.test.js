// God-view admin endpoints — token gate + whole-tree visibility. (Admin tool.)
//
// These endpoints intentionally return data the normal API hides (foreign
// leaves, everyone's versions). They must be locked behind X-Admin-Token.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, writeDoc, createScope, addMember, scopeIdByPath, ADMIN_TOKEN,
} = require("./helpers")
setupTestSchema("admin_readonly")

let ctx, brainsId, klasseId

const tokenHeader = (extra = {}) => ({ "x-admin-token": ADMIN_TOKEN, ...extra })

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/brains")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
  await addMember(ctx, klasseId, "anna")
  await addMember(ctx, klasseId, "bob")
  await writeDoc(ctx, klasseId, "math/quad.json", asPerson("anna"), { data: { by: "anna" } })
  await writeDoc(ctx, klasseId, "math/quad.json", asPerson("bob"), { data: { by: "bob" } })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("the tree endpoint requires the admin token → 401 without it", async () => {
  const res = await get(ctx, "/database/admin/tree", {})
  assert.equal(res.statusCode, 401)
})

test("a wrong token is rejected → 401", async () => {
  const res = await get(ctx, "/database/admin/tree", { "x-admin-token": "nope" })
  assert.equal(res.statusCode, 401)
})

test("the tree exposes every scope, its members, and flags personal leaves", async () => {
  const res = await get(ctx, "/database/admin/tree", tokenHeader())
  assert.equal(res.statusCode, 200)
  const scopes = res.json().scopes
  const byName = (n) => scopes.filter((s) => s.name === n)

  // klasse8a is present with anna + bob as members.
  const klasse = byName("klasse8a")[0]
  assert.ok(klasse)
  const memberRefs = klasse.members.filter((m) => m.isMember).map((m) => m.personRef)
  assert.ok(memberRefs.includes("anna") && memberRefs.includes("bob"))

  // Both personal leaves exist and are flagged as leaves.
  const annaLeaf = scopes.find((s) => s.name === "anna" && s.parentId === klasse.id)
  const bobLeaf = scopes.find((s) => s.name === "bob" && s.parentId === klasse.id)
  assert.ok(annaLeaf && annaLeaf.isLeaf)
  assert.ok(bobLeaf && bobLeaf.isLeaf)
})

test("the versions endpoint spans the subtree including foreign leaves", async () => {
  const res = await get(ctx, `/database/admin/versions?scope=${klasseId}`, tokenHeader())
  assert.equal(res.statusCode, 200)
  const versions = res.json().versions

  // Both anna's and bob's private versions of the same path are visible here —
  // exactly what the walk-up would hide from each other.
  const authors = versions
    .filter((v) => v.path === "math/quad.json")
    .map((v) => v.author)
  assert.ok(authors.includes("anna"))
  assert.ok(authors.includes("bob"))
})

test("versions endpoint validates the scope id", async () => {
  const bad = await get(ctx, "/database/admin/versions", tokenHeader())
  assert.equal(bad.statusCode, 400)
  const missing = await get(ctx, "/database/admin/versions?scope=999999", tokenHeader())
  assert.equal(missing.statusCode, 404)
})

test("the doc endpoint reads a foreign leaf's exact version (god-view)", async () => {
  // anna's private version lives in her leaf under klasse8a; the walk-up would
  // hide it from anyone else, but the god-view reads it directly.
  const tree = await get(ctx, "/database/admin/tree", tokenHeader())
  const annaLeaf = tree.json().scopes.find(
    (s) => s.name === "anna" && s.parentId === String(klasseId)
  )
  const res = await get(ctx, `/database/admin/doc?scope=${annaLeaf.id}&path=math/quad.json`, tokenHeader())
  assert.equal(res.statusCode, 200)
  assert.equal(res.json().author, "anna")
  assert.equal(res.json().data.by, "anna")
})

test("the doc endpoint requires the token and validates params", async () => {
  assert.equal((await get(ctx, "/database/admin/doc?scope=1&path=x", {})).statusCode, 401)
  assert.equal((await get(ctx, "/database/admin/doc?scope=1", tokenHeader())).statusCode, 400)
})
