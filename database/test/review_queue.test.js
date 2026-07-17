// Aggregated review queue (GET /database/review/queue) + opening a pending
// version via the version-pinned docs read — the backend of the ReviewScreen.
//
// The queue spans every scope where the caller holds a reviewer score and
// annotates each entry with the score situation (required / approved / mine).

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, writeDoc,
  createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("review_queue")

let ctx, brainsId, classA, classB, subA, subB

const setReviewer = (scopeId, personRef, score) =>
  post(ctx, `/database/scopes/${scopeId}/reviewers`, asRootAdmin(), { personRef, score })
const promote = (scopeId, path, person, version, description) =>
  post(ctx, `/database/scopes/${scopeId}/docs/promote?path=${encodeURIComponent(path)}`,
    asPerson(person), { ...(version ? { version } : {}), ...(description ? { description } : {}) })
const approve = (scopeId, path, person, version) =>
  post(ctx, `/database/scopes/${scopeId}/pending/approve`, asPerson(person), { path, version })
const queueOf = async (person) => {
  const res = await get(ctx, `/database/review/queue`, asPerson(person))
  assert.equal(res.statusCode, 200, res.body)
  return res.json().queue
}

// Writes a doc into the score-0 sub-scope and promotes it into the review
// scope above; returns the pending version number there.
async function stagePending(subId, path, person = "anna") {
  const w = await writeDoc(ctx, subId, path, asPerson(person), { data: { by: person } })
  assert.equal(w.statusCode, 201, w.body)
  const p = await promote(subId, path, person, w.json().version)
  assert.equal(p.statusCode, 200, p.body)
  assert.equal(p.json().status, "pending")
  return p.json().version
}

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  // Two review scopes with different thresholds; rita reviews both.
  classA = await createScope(ctx, brainsId, "classA", { requiredApprovalScore: 5 })
  classB = await createScope(ctx, brainsId, "classB", { requiredApprovalScore: 3 })
  subA = await createScope(ctx, classA, "sub", { requiredApprovalScore: 0 })
  subB = await createScope(ctx, classB, "sub", { requiredApprovalScore: 0 })
  await addMember(ctx, subA, "anna")
  await addMember(ctx, subB, "anna")
  await setReviewer(classA, "rita", 2)
  await setReviewer(classB, "rita", 3)
  await setReviewer(classA, "klaus", 2)
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("queue aggregates pending versions across all scopes I review", async () => {
  const vA = await stagePending(subA, "alpha.json")
  const vB = await stagePending(subB, "beta.json")

  const queue = await queueOf("rita")
  assert.equal(queue.length, 2)

  const a = queue.find((e) => e.path === "alpha.json")
  const b = queue.find((e) => e.path === "beta.json")
  assert.ok(a && b, "one entry per review scope")

  assert.equal(a.scopeRef, String(classA))
  assert.equal(a.scopePath, "electra/content/apps/classA")
  assert.equal(a.version, vA)
  assert.equal(a.author, "anna")
  assert.equal(a.requiredScore, 5)
  assert.equal(a.approvedScore, 0)
  assert.equal(a.myScore, 2)
  assert.equal(a.alreadyVoted, false)

  assert.equal(b.scopeRef, String(classB))
  assert.equal(b.requiredScore, 3)
  assert.equal(b.myScore, 3)
  assert.equal(b.version, vB)
})

test("a partial vote shows up as approvedScore + alreadyVoted for the voter", async () => {
  const alpha = (await queueOf("rita")).find((e) => e.path === "alpha.json")

  // klaus (2 points) approves — below the threshold of 5, stays pending.
  const res = await approve(classA, "alpha.json", "klaus", alpha.version)
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().committed, false)

  const forKlaus = (await queueOf("klaus")).find((e) => e.path === "alpha.json")
  assert.equal(forKlaus.approvedScore, 2)
  assert.equal(forKlaus.alreadyVoted, true)

  // rita sees the accumulated score but hasn't voted herself.
  const forRita = (await queueOf("rita")).find((e) => e.path === "alpha.json")
  assert.equal(forRita.approvedScore, 2)
  assert.equal(forRita.alreadyVoted, false)
})

test("a committed entry leaves the queue", async () => {
  // beta needs 3, rita gives 3 → commit.
  const beta = (await queueOf("rita")).find((e) => e.path === "beta.json")
  const res = await approve(classB, "beta.json", "rita", beta.version)
  assert.equal(res.json().committed, true)

  const queue = await queueOf("rita")
  assert.ok(!queue.some((e) => e.path === "beta.json"), "committed entry gone")
  assert.ok(queue.some((e) => e.path === "alpha.json"), "open entry remains")
})

test("a promote description travels to the queue; a fresh promote without one clears it", async () => {
  const w = await writeDoc(ctx, subA, "note.json", asPerson("anna"), { data: { rev: 1 } })
  const p = await promote(subA, "note.json", "anna", w.json().version, "fixed the carry logic of the adder")
  assert.equal(p.json().status, "pending", p.body)

  let entry = (await queueOf("rita")).find((e) => e.path === "note.json")
  assert.equal(entry.description, "fixed the carry logic of the adder")

  // anna revises and promotes again WITHOUT a note — the new pending
  // supersedes the old one and must not inherit the stale description.
  const w2 = await writeDoc(ctx, subA, "note.json", asPerson("anna"), { data: { rev: 2 } })
  const p2 = await promote(subA, "note.json", "anna", w2.json().version)
  assert.equal(p2.json().status, "pending", p2.body)

  entry = (await queueOf("rita")).find((e) => e.path === "note.json")
  assert.equal(entry.version, p2.json().version)
  assert.equal(entry.description, null, "stale description must not stick")
})

test("members without a reviewer score get an empty queue; anonymous → 401", async () => {
  assert.deepEqual(await queueOf("anna"), [])
  const anon = await get(ctx, `/database/review/queue`, {})
  assert.equal(anon.statusCode, 401)
})

test("a pure reviewer (not a member) can open the pending version via the pinned read", async () => {
  const alpha = (await queueOf("rita")).find((e) => e.path === "alpha.json")

  // rita was never added as a member of classA — the reviewer role alone must
  // grant read, otherwise she can't see what she is asked to approve.
  const res = await get(
    ctx,
    `/database/scopes/${classA}/docs?path=${encodeURIComponent("alpha.json")}&version=${alpha.version}`,
    asPerson("rita")
  )
  assert.equal(res.statusCode, 200, res.body)
  assert.equal(res.json().status, "pending")
  assert.equal(res.json().data.by, "anna")
})

test("an outsider can neither see the queue entry nor the pending version", async () => {
  assert.deepEqual(await queueOf("stranger"), [])
  const alpha = (await queueOf("rita")).find((e) => e.path === "alpha.json")
  const res = await get(
    ctx,
    `/database/scopes/${classA}/docs?path=${encodeURIComponent("alpha.json")}&version=${alpha.version}`,
    asPerson("stranger")
  )
  assert.equal(res.statusCode, 403)
})
