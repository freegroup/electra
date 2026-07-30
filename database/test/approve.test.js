// Review: approve / reject with score-based quorum. README §6.6.
//
// A promote into a review-required scope creates a pending version. Reviewers
// approve (their score is snapshotted); once the approving scores reach the
// scope's required_approval_score the version commits. A single reject ends it.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, readDoc, writeDoc,
  createScope, addMember, scopeIdByPath, ROOT_ADMIN_HASH,
} = require("./helpers")
setupTestSchema("approve")

let ctx, brainsId

// Build a fresh "class needs review" tree per test so state never leaks:
// classRef (requiredApprovalScore) with a score-0 sub-scope anna promotes from.
async function reviewedClass(name, requiredApprovalScore) {
  const classId = await createScope(ctx, brainsId, name, { requiredApprovalScore })
  const subId = await createScope(ctx, classId, "sub", { requiredApprovalScore: 0 })
  await addMember(ctx, subId, "anna")
  return { classId, subId }
}
const setReviewer = (scopeId, personRef, score) =>
  post(ctx, `/database/scopes/${scopeId}/reviewers`, asRootAdmin(), { personRef, score })
const promote = (scopeId, path, person, version) =>
  post(ctx, `/database/scopes/${scopeId}/docs/promote?path=${encodeURIComponent(path)}`,
    asPerson(person), version ? { version } : {})
const approve = (scopeId, path, person, version) =>
  post(ctx, `/database/scopes/${scopeId}/pending/approve`, asPerson(person), { path, version })
const reject = (scopeId, path, person, version, reason) =>
  post(ctx, `/database/scopes/${scopeId}/pending/reject`, asPerson(person), { path, version, reason })

before(async () => {
  ctx = await newTestSchema()
  brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("a promote into a review scope stays pending until approved", async () => {
  const { classId, subId } = await reviewedClass("c1", 5)
  await setReviewer(classId, "meier", 5)

  const w = await writeDoc(ctx, subId, "doc.json", asPerson("anna"), { data: { v: 1 } })
  const p = await promote(subId, "doc.json", "anna", w.json().version)
  assert.equal(p.json().status, "pending")
  const pendingVersion = p.json().version

  // A reviewer sees it in the pending list.
  const pend = await get(ctx, `/database/scopes/${classId}/pending`, asPerson("meier"))
  assert.equal(pend.statusCode, 200)
  assert.equal(pend.json().pending.length, 1)
  assert.equal(pend.json().pending[0].path, "doc.json")

  // A single approve worth 5 reaches the threshold → commit.
  const a = await approve(classId, "doc.json", "meier", pendingVersion)
  assert.equal(a.statusCode, 200, a.body)
  assert.equal(a.json().committed, true)

  // Now visible as the shared class version.
  const seen = await readDoc(ctx, classId, "doc.json", asRootAdmin())
  assert.equal(seen.statusCode, 200)
  assert.equal(seen.json().data.v, 1)
})

test("quorum: partial scores stay pending, the crossing vote commits", async () => {
  const { classId, subId } = await reviewedClass("c2", 5)
  await setReviewer(classId, "klaus", 2)
  await setReviewer(classId, "lisa", 2)
  await setReviewer(classId, "meier", 5)

  const w = await writeDoc(ctx, subId, "q.json", asPerson("anna"), { data: {} })
  const v = (await promote(subId, "q.json", "anna", w.json().version)).json().version

  assert.equal((await approve(classId, "q.json", "klaus", v)).json().committed, false) // 2
  assert.equal((await approve(classId, "q.json", "lisa", v)).json().committed, false)  // 4
  assert.equal((await approve(classId, "q.json", "meier", v)).json().committed, true)  // 9 ≥ 5
})

test("a single reject ends the request", async () => {
  const { classId, subId } = await reviewedClass("c3", 5)
  await setReviewer(classId, "meier", 5)

  const w = await writeDoc(ctx, subId, "r.json", asPerson("anna"), { data: {} })
  const v = (await promote(subId, "r.json", "anna", w.json().version)).json().version

  const rj = await reject(classId, "r.json", "meier", v, "not ready")
  assert.equal(rj.statusCode, 200)

  const row = await ctx.pool.query(
    `SELECT status, rejection_reason FROM "${ctx.schema}".versions
      WHERE scope_id = $1 AND doc_path = 'r.json' AND version = $2`,
    [classId, v]
  )
  assert.equal(row.rows[0].status, "rejected")
  assert.equal(row.rows[0].rejection_reason, "not ready")
})

test("approving an already-finalized request → 409 outdated", async () => {
  const { classId, subId } = await reviewedClass("c4", 5)
  await setReviewer(classId, "meier", 5)
  const w = await writeDoc(ctx, subId, "f.json", asPerson("anna"), { data: {} })
  const v = (await promote(subId, "f.json", "anna", w.json().version)).json().version

  await approve(classId, "f.json", "meier", v) // commits
  const again = await approve(classId, "f.json", "meier", v)
  assert.equal(again.statusCode, 409)
  assert.equal(again.json().error.code, "outdated")
})

test("a non-reviewer cannot approve → 403", async () => {
  const { classId, subId } = await reviewedClass("c5", 5)
  await setReviewer(classId, "meier", 5)
  const w = await writeDoc(ctx, subId, "x.json", asPerson("anna"), { data: {} })
  const v = (await promote(subId, "x.json", "anna", w.json().version)).json().version

  const res = await approve(classId, "x.json", "outsider", v)
  assert.equal(res.statusCode, 403)
})

test("self-approval: a promoting reviewer commits in one step", async () => {
  // The class admin (root admin) is a reviewer of the class with score 10.
  // They are also a member, so they can hold a leaf and promote from the class
  // sub-scope — their own approve meets the threshold immediately.
  const { classId, subId } = await reviewedClass("c6", 5)
  await addMember(ctx, subId, ROOT_ADMIN_HASH)
  await setReviewer(classId, ROOT_ADMIN_HASH, 10)

  const w = await writeDoc(ctx, subId, "self.json", asRootAdmin(), { data: { by: "boss" } })
  const p = await promote(subId, "self.json", ROOT_ADMIN_HASH, w.json().version)
  assert.equal(p.statusCode, 200, p.body)
  assert.equal(p.json().status, "committed")

  const seen = await readDoc(ctx, classId, "self.json", asRootAdmin())
  assert.equal(seen.json().data.by, "boss")
})
