// Workspaces browsing: list direct children + member roster + "any member may
// create a sub-workspace". Consumer (scoped) API — distinct from the admin
// god-view. README §9.7/§9.8.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asRootAdmin, get, post, patch, del, createScope, addMember, scopeIdByPath,
} = require("./helpers")
setupTestSchema("workspaces")

let ctx, appsId, klasseId

before(async () => {
  ctx = await newTestSchema()
  appsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/content/apps")
  klasseId = await createScope(ctx, appsId, "klasse8a")
  await addMember(ctx, klasseId, "anna")
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

test("a member sees the direct children of a scope, annotated with their role", async () => {
  await createScope(ctx, klasseId, "gruppe-mathe")
  await createScope(ctx, klasseId, "gruppe-physik")
  const res = await get(ctx, `/database/scopes/${klasseId}/children`, asPerson("anna"))
  assert.equal(res.statusCode, 200)
  const names = res.json().children.map((c) => c.name).sort()
  assert.deepEqual(names, ["gruppe-mathe", "gruppe-physik"])
  // anna is a member of klasse8a but not (yet) of the children
  for (const c of res.json().children) {
    assert.equal(c.isMember, false)
    assert.equal(c.isAdmin, false)
  }
})

test("children view excludes personal leaves", async () => {
  // anna self-enrolls under klasse8a → a personal leaf is provisioned there
  await post(ctx, `/database/scopes/${klasseId}/members`, asPerson("anna"), { personRef: "anna" })
  const res = await get(ctx, `/database/scopes/${klasseId}/children`, asPerson("anna"))
  assert.ok(!res.json().children.some((c) => c.name === "anna"), "personal leaf hidden")
})

test("a non-member cannot list a scope's children — 403", async () => {
  const res = await get(ctx, `/database/scopes/${klasseId}/children`, asPerson("stranger"))
  assert.equal(res.statusCode, 403)
})

test("any member may create a sub-workspace and becomes its admin", async () => {
  // anna is a plain member of klasse8a (not admin), yet may create under it
  const res = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), {
    name: "annas-ag",
  })
  assert.equal(res.statusCode, 201, res.body)
  const childId = res.json().scopeRef

  // she is admin of the new scope → she can read its member roster
  const members = await get(ctx, `/database/scopes/${childId}/members`, asPerson("anna"))
  assert.equal(members.statusCode, 200)
  const anna = members.json().members.find((m) => m.personRef === "anna")
  assert.ok(anna && anna.isAdmin, "creator is admin of the new workspace")
})

test("creating a sub-workspace requires membership of the parent — 403", async () => {
  const res = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("stranger"), {
    name: "hack",
  })
  assert.equal(res.statusCode, 403)
})

test("duplicate sub-workspace name under the same parent — 409", async () => {
  await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), { name: "dup" })
  const res = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), { name: "dup" })
  assert.equal(res.statusCode, 409)
})

test("member roster is admin-only", async () => {
  // bob is a plain member of klasse8a (added by root admin), not an admin
  await addMember(ctx, klasseId, "bob")
  const asBob = await get(ctx, `/database/scopes/${klasseId}/members`, asPerson("bob"))
  assert.equal(asBob.statusCode, 403, "non-admin member cannot see the roster")

  const asAdmin = await get(ctx, `/database/scopes/${klasseId}/members`, asRootAdmin())
  assert.equal(asAdmin.statusCode, 200)
  assert.ok(asAdmin.json().members.some((m) => m.personRef === "bob"))
})

test("roots returns exactly the two entry points: app root + personal workspace", async () => {
  // a fresh login provisions the personal workspace and enrolls in apps
  await post(ctx, "/database/on_login", asPerson("rooty"))

  const res = await get(ctx, "/database/scopes/roots", asPerson("rooty"))
  assert.equal(res.statusCode, 200)
  const byKind = Object.fromEntries(res.json().roots.map((r) => [r.kind, r]))

  assert.ok(byKind.apps, "app root present")
  assert.equal(byKind.apps.name, "apps")
  assert.equal(byKind.apps.isMember, true)

  assert.ok(byKind.personal, "personal workspace present")
  assert.equal(byKind.personal.name, "rooty")        // identity = email
  assert.equal(byKind.personal.label, "Personal")     // display name
  assert.equal(byKind.personal.isAdmin, true)

  // exactly two entry points — sub-workspaces do NOT leak into roots
  await post(ctx, `/database/scopes/${byKind.personal.scopeRef}/children`, asPerson("rooty"), { label: "sub" })
  const again = await get(ctx, "/database/scopes/roots", asPerson("rooty"))
  assert.equal(again.json().roots.length, 2, "still exactly two roots after creating a sub-workspace")
})

test("the personal workspace is a promote ceiling (share via distribute, not promote)", async () => {
  await post(ctx, "/database/on_login", asPerson("ceil"))
  const roots = (await get(ctx, "/database/scopes/roots", asPerson("ceil"))).json().roots
  const personal = roots.find((r) => r.kind === "personal")
  assert.ok(personal, "personal workspace present")

  const meta = (await get(ctx, `/database/scopes/${personal.scopeRef}`, asPerson("ceil"))).json()
  assert.equal(meta.promoteCeiling, true)
})

test("members cannot be added to a personal workspace", async () => {
  await post(ctx, "/database/on_login", asPerson("solo"))
  const roots = (await get(ctx, "/database/scopes/roots", asPerson("solo"))).json().roots
  const personal = roots.find((r) => r.kind === "personal")
  assert.ok(personal, "personal workspace present")

  // the owner is admin, yet inviting anyone else is forbidden by the backend
  const res = await post(ctx, `/database/scopes/${personal.scopeRef}/members`, asPerson("solo"), { personRef: "intruder" })
  assert.equal(res.statusCode, 400)

  // roster stays single-owner
  const members = (await get(ctx, `/database/scopes/${personal.scopeRef}/members`, asPerson("solo"))).json().members
  assert.deepEqual(members.map((m) => m.personRef).sort(), ["solo"])
})

test("an admin can delete an empty scope, but not one with children", async () => {
  // anna (member of klasse8a) creates a sub-workspace — she is its admin
  const created = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), { name: "temp-room" })
  assert.equal(created.statusCode, 201)
  const tempId = created.json().scopeRef

  // a non-admin may not delete it
  const forbidden = await del(ctx, `/database/scopes/${tempId}`, asPerson("stranger"))
  assert.equal(forbidden.statusCode, 403)

  // give it a child, then it cannot be deleted (has sub-scopes)
  const child = await post(ctx, `/database/scopes/${tempId}/scopes`, asPerson("anna"), { name: "child-room" })
  assert.equal(child.statusCode, 201)
  const childId = child.json().scopeRef
  const conflict = await del(ctx, `/database/scopes/${tempId}`, asPerson("anna"))
  assert.equal(conflict.statusCode, 409)

  // remove the child first (it is empty), then the parent — both succeed
  const okChild = await del(ctx, `/database/scopes/${childId}`, asPerson("anna"))
  assert.equal(okChild.statusCode, 200)
  const okParent = await del(ctx, `/database/scopes/${tempId}`, asPerson("anna"))
  assert.equal(okParent.statusCode, 200)
  assert.equal(okParent.json().deleted, true)

  // it is gone
  const gone = await get(ctx, `/database/scopes/${tempId}`, asPerson("anna"))
  assert.equal(gone.statusCode, 404)
})

test("label → sanitized lowercase name, with auto-suffix on collision", async () => {
  const a = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), { label: "My Fancy Room!" })
  assert.equal(a.statusCode, 201)
  assert.equal(a.json().label, "My Fancy Room!")   // display kept verbatim
  assert.equal(a.json().name, "my-fancy-room")      // identity sanitized + lowercase

  // a second workspace with the SAME label keeps the label but auto-suffixes name
  const b = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), { label: "My Fancy Room!" })
  assert.equal(b.json().label, "My Fancy Room!")
  assert.equal(b.json().name, "my-fancy-room-2")
})

test("empty / whitespace-only label is rejected", async () => {
  const blank = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), { label: "   " })
  assert.equal(blank.statusCode, 400)
})

test("relabel changes the display label only; identity name stays fixed", async () => {
  const created = await post(ctx, `/database/scopes/${klasseId}/scopes`, asPerson("anna"), { label: "Original" })
  const ref = created.json().scopeRef
  const name = created.json().name

  const patched = await patch(ctx, `/database/scopes/${ref}`, asPerson("anna"), { label: "Renamed Display" })
  assert.equal(patched.statusCode, 200)
  assert.equal(patched.json().label, "Renamed Display")

  const meta = (await get(ctx, `/database/scopes/${ref}`, asPerson("anna"))).json()
  assert.equal(meta.label, "Renamed Display")
  assert.equal(meta.name, name, "identity name unchanged by relabel")

  // an empty relabel is rejected
  const blank = await patch(ctx, `/database/scopes/${ref}`, asPerson("anna"), { label: "  " })
  assert.equal(blank.statusCode, 400)
})


