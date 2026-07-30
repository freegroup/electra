// Version history — README §7, §9.2.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, readDoc, writeDoc,
  createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("history")

let ctx, brainsId, classId, subId

const history = (scopeRef, path, person) =>
  get(ctx, `/database/scopes/${scopeRef}/docs/history?path=${encodeURIComponent(path)}`, asPerson(person))
const promote = (scopeRef, path, person, version) =>
  post(ctx, `/database/scopes/${scopeRef}/docs/promote?path=${encodeURIComponent(path)}`,
    asPerson(person), version ? { version } : {})

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  classId = await createScope(ctx, brainsId, "class", { requiredApprovalScore: 5 })
  subId = await createScope(ctx, classId, "sub", { requiredApprovalScore: 0 })
  await addMember(ctx, subId, "anna")
  await post(ctx, `/database/scopes/${classId}/reviewers`, asRootAdmin(), { personRef: "meier", score: 5 })
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("history lists the caller's own leaf versions newest first", async () => {
  await writeDoc(ctx, subId, "h.json", asPerson("anna"), { data: { v: 1 } })
  const cur = (await readDoc(ctx, subId, "h.json", asPerson("anna"))).json()
  await writeDoc(ctx, subId, "h.json", asPerson("anna"), { ...cur, data: { v: 2 } })

  const res = await history(subId, "h.json", "anna")
  assert.equal(res.statusCode, 200)
  const versions = res.json().history.map((h) => h.version)
  assert.deepEqual(versions, [2, 1])
})

test("history records a rejected promotion with its reason and votes", async () => {
  const w = await writeDoc(ctx, subId, "r.json", asPerson("anna"), { data: {} })
  const p = await promote(subId, "r.json", "anna", w.json().version) // pending on class
  const pendingVersion = p.json().version
  await post(ctx, `/database/scopes/${classId}/pending/reject`, asPerson("meier"),
    { path: "r.json", version: pendingVersion, reason: "needs work" })

  // Read history from the class level (anna is a member below it).
  const res = await history(classId, "r.json", "anna")
  const rejected = res.json().history.find((h) => h.status === "rejected")
  assert.ok(rejected, "a rejected entry is present")
  assert.equal(rejected.rejectionReason, "needs work")
  assert.ok(rejected.votes.some((v) => v.kind === "reject" && v.voter === "meier"))
})

test("history shows committed entries with the approving votes", async () => {
  const w = await writeDoc(ctx, subId, "c.json", asPerson("anna"), { data: {} })
  const p = await promote(subId, "c.json", "anna", w.json().version)
  await post(ctx, `/database/scopes/${classId}/pending/approve`, asPerson("meier"),
    { path: "c.json", version: p.json().version })

  const res = await history(classId, "c.json", "anna")
  const committed = res.json().history.find((h) => h.scope.endsWith("/class") && h.status === "committed")
  assert.ok(committed)
  assert.ok(committed.votes.some((v) => v.kind === "approve" && v.score_snapshot === 5))
})
