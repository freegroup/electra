// Optimistic concurrency on writes — README §6.12.
//
// A put that claims to build on the caller's own leaf version must match the
// current active leaf version, else it fails with 409 outdated. New documents
// and edits of an inherited version start a fresh leaf version without a check.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, readDoc, writeDoc, createScope, addMember, seedSharedDoc, scopeIdByPath,
} = require("./helpers")
setupTestSchema("concurrency")

let ctx, brainsId, klasseId

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  klasseId = await createScope(ctx, brainsId, "klasse8a")
  await addMember(ctx, klasseId, "anna")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("a brand-new document becomes leaf version 1", async () => {
  const res = await writeDoc(ctx, klasseId, "n.json", asPerson("anna"), { data: { v: "a" } })
  assert.equal(res.statusCode, 201)
  assert.equal(res.json().version, 1)
})

test("editing the current leaf version succeeds and bumps the version", async () => {
  const current = (await readDoc(ctx, klasseId, "n.json", asPerson("anna"))).json()
  const res = await writeDoc(ctx, klasseId, "n.json", asPerson("anna"), {
    ...current,
    data: { v: "b" },
  })
  assert.equal(res.statusCode, 201)
  assert.equal(res.json().version, 2)
})

test("editing a stale leaf version → 409 outdated", async () => {
  // Build on version 1 while the active leaf version is already 2.
  const stale = {
    data: { v: "c" },
    scope: "apps/klasse8a/anna",
    version: 1,
  }
  const res = await writeDoc(ctx, klasseId, "n.json", asPerson("anna"), stale)
  assert.equal(res.statusCode, 409)
  assert.equal(res.json().error.code, "outdated")
})

test("parallel appends to the same doc all land — no serialization 500", async () => {
  // Five writers hit the same new path at once, none claiming a base version.
  // Under SERIALIZABLE they race on MAX(version)+1; the losers get 40001/23505
  // from Postgres, which the persistence layer must retry — the API surface
  // must show five clean 201s stacked as versions 1..5, never a 500.
  const N = 5
  const results = await Promise.all(
    Array.from({ length: N }, (_, i) =>
      writeDoc(ctx, klasseId, "race.json", asPerson("anna"), { data: { writer: i } })
    )
  )
  for (const res of results) {
    assert.equal(res.statusCode, 201, res.body)
  }
  const versions = results.map((r) => r.json().version).sort((a, b) => a - b)
  assert.deepEqual(versions, [1, 2, 3, 4, 5], "each writer got its own version")
})

test("parallel edits of the same base version: one wins, the rest get 409 — not 500", async () => {
  await writeDoc(ctx, klasseId, "contest.json", asPerson("anna"), { data: { v: 0 } })
  const base = (await readDoc(ctx, klasseId, "contest.json", asPerson("anna"))).json()

  // Three simultaneous edits all built on the same leaf version. Exactly one
  // may commit; the others must surface as a clean optimistic-concurrency 409
  // (outdated) even when the conflict is only detected mid-transaction.
  const results = await Promise.all(
    Array.from({ length: 3 }, (_, i) =>
      writeDoc(ctx, klasseId, "contest.json", asPerson("anna"), { ...base, data: { v: i + 1 } })
    )
  )
  const codes = results.map((r) => r.statusCode).sort()
  assert.deepEqual(codes, [201, 409, 409], results.map((r) => r.body).join("\n"))
  for (const res of results) {
    if (res.statusCode === 409) assert.equal(res.json().error.code, "outdated")
  }
})

test("editing an inherited version starts a fresh leaf v1, no conflict", async () => {
  await seedSharedDoc(ctx, brainsId, "inh.json", { level: "brains", version: 7 })
  const inherited = (await readDoc(ctx, klasseId, "inh.json", asPerson("anna"))).json()
  assert.equal(inherited.scope, "apps")

  // Pass the inherited doc as-is (its scope is brains, not the leaf).
  const res = await writeDoc(ctx, klasseId, "inh.json", asPerson("anna"), {
    ...inherited,
    data: { level: "anna" },
  })
  assert.equal(res.statusCode, 201)
  assert.equal(res.json().version, 1)
  assert.equal(res.json().scope, "apps/klasse8a/anna")
})
