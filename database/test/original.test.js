// The "original" field on glob rows + version-pinned reads (Draft/Files finder).
//
// globDocs already collapses each path to the walk-up winner. For a personal
// copy (the caller's leaf shadows a shared version) we additionally surface the
// shared version it overlays as `original: { scopeRef, version, provider }`, so
// the finder can show/open the ORIGINAL in its "Files" pane. A version-pinned
// read (?version=) opens exactly that version, bypassing the walk-up.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, get, post, writeDoc, seedSharedDoc, createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("original")

let ctx, brainsId, klasseId

const glob = (person) =>
  get(ctx, `/database/scopes/${brainsId}/docs?glob=true`, asPerson(person))

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
  await addMember(ctx, klasseId, "anna")
  await post(ctx, "/database/on_login", asPerson("anna"))
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("personalCopy row carries `original` with the shared scope + version", async () => {
  // A shared original on the klasse, then anna overrides it in her own leaf.
  await seedSharedDoc(ctx, klasseId, "rc.brain", { origin: "klasse" })
  await writeDoc(ctx, klasseId, "rc.brain", asPerson("anna"), { data: { origin: "anna" } })

  const row = (await glob("anna")).json().docs.find((d) => d.path === "rc.brain")
  assert.equal(row.instanceType, "personalCopy")
  assert.ok(row.original, "personalCopy must carry an original")
  assert.equal(row.original.version, 1)                 // the seeded shared version
  assert.equal(row.original.provider, "electra/content/apps/klasse8a")
  assert.ok(row.original.scopeRef)
})

test("personalCopy at the APP ROOT (bootstrap scope) carries `original`", async () => {
  // The live case: a shared doc lives on the app root itself (electra/content/apps,
  // a bootstrap scope the user is auto-enrolled in), and the user edits it —
  // creating a personal copy in their leaf directly under the root. The Files
  // pane must still see the original beneath it.
  await seedSharedDoc(ctx, brainsId, "root-doc.brain", { origin: "brains" })
  await writeDoc(ctx, brainsId, "root-doc.brain", asPerson("anna"), { data: { origin: "anna" } })

  const row = (await glob("anna")).json().docs.find((d) => d.path === "root-doc.brain")
  assert.equal(row.instanceType, "personalCopy", "must be a personal copy, not personal")
  assert.ok(row.original, "personalCopy at the root must still carry an original")
  assert.equal(row.original.provider, "electra/content/apps")
})

test("personal row (no shared original) has original = null", async () => {
  await writeDoc(ctx, klasseId, "solo.brain", asPerson("anna"), { data: { mine: true } })
  const row = (await glob("anna")).json().docs.find((d) => d.path === "solo.brain")
  assert.equal(row.instanceType, "personal")
  assert.equal(row.original, null)
})

test("inherit row (no personal copy) has original = null", async () => {
  await seedSharedDoc(ctx, klasseId, "shared-only.brain", { origin: "klasse" })
  const row = (await glob("anna")).json().docs.find((d) => d.path === "shared-only.brain")
  assert.equal(row.instanceType, "inherit")
  assert.equal(row.original, null)
})

test("version-pinned read returns the ORIGINAL, not the walk-up (personal) copy", async () => {
  await seedSharedDoc(ctx, klasseId, "pin.brain", { origin: "klasse" })          // v1 shared
  await writeDoc(ctx, klasseId, "pin.brain", asPerson("anna"), { data: { origin: "anna" } }) // leaf copy

  const row = (await glob("anna")).json().docs.find((d) => d.path === "pin.brain")
  const { scopeRef, version } = row.original

  // Walk-up read (no version) → anna's copy.
  const walk = await get(ctx, `/database/scopes/${klasseId}/docs?path=pin.brain`, asPerson("anna"))
  assert.deepEqual(walk.json().data, { origin: "anna" })

  // Version-pinned read at the original's scope → the shared original.
  const pinned = await get(ctx,
    `/database/scopes/${scopeRef}/docs?path=pin.brain&version=${version}`, asPerson("anna"))
  assert.equal(pinned.statusCode, 200)
  assert.deepEqual(pinned.json().data, { origin: "klasse" })
})
