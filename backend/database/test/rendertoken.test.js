// Short-lived signed render tokens (README §9.5).
//
// A render token is the ephemeral, private cousin of a publicId: an HMAC-signed
// capability that grants login-free read of exactly ONE scope/path/version
// until it expires. Two layers are tested:
//   1. the stateless sign/verify helper (no DB) — round-trip, tamper, expiry;
//   2. the HTTP surface — mint (requireRead + walk-up resolve) and the
//      anonymous /database/render read.

const { test, before, after } = require("node:test")
const assert = require("node:assert/strict")
const {
  setupTestSchema, newTestSchema, dropSchema,
  asPerson, asAnon, get, post, writeDoc, makeKlasseScope,
} = require("./helpers")
setupTestSchema("rendertoken")

// Loaded AFTER setupTestSchema so DATABASE_RENDER_SECRET (from secrets.ini via
// helpers' dotenv) is in the environment when the module reads it.
const rendertoken = require("../server/persistence/rendertoken")

let ctx, klasseId

const mint = (path, person = "anna", body = {}) =>
  post(ctx, `/database/scopes/${klasseId}/docs/render-token`, asPerson(person), { path, ...body })
const render = (token) =>
  get(ctx, `/database/render?token=${encodeURIComponent(token || "")}`, asAnon())

before(async () => {
  ctx = await newTestSchema()
  ;({ klasseId } = await makeKlasseScope(ctx, ["anna", "bob"]))
})

after(async () => {
  await ctx.fastify.close()
  await dropSchema(ctx.pool, ctx.schema)
})

// --- helper: sign / verify (no DB) -----------------------------------------

test("sign → verify round-trips scope, path and version", () => {
  const token = rendertoken.sign({ scopeId: "42", docPath: "math/x.sheet", version: 3 })
  assert.deepEqual(rendertoken.verify(token), {
    scopeId: "42",
    docPath: "math/x.sheet",
    version: 3,
  })
})

test("a tampered payload is rejected (signature no longer matches)", () => {
  const token = rendertoken.sign({ scopeId: "42", docPath: "math/x.sheet", version: 3 })
  const [, sig] = token.split(".")
  // Re-encode the payload pointing at a DIFFERENT doc, keep the old signature.
  const forgedPayload = Buffer.from(
    JSON.stringify({ s: "42", p: "secret/other.sheet", v: 3, exp: Math.floor(Date.now() / 1000) + 60 })
  ).toString("base64url")
  const forged = `${forgedPayload}.${sig}`
  assert.throws(() => rendertoken.verify(forged), /invalid render token signature/)
})

test("an expired token is rejected", () => {
  const token = rendertoken.sign({ scopeId: "42", docPath: "math/x.sheet", version: 1, ttlSeconds: -1 })
  assert.throws(() => rendertoken.verify(token), /expired/)
})

test("malformed tokens are rejected", () => {
  assert.throws(() => rendertoken.verify(""), /malformed/)
  assert.throws(() => rendertoken.verify("no-dot-here"), /malformed/)
  assert.throws(() => rendertoken.verify("abc.def"), /invalid render token signature/)
})

// --- HTTP: mint + anonymous render -----------------------------------------

test("mint then render returns exactly that document version", async () => {
  await writeDoc(ctx, klasseId, "circuit/rc.sheet", asPerson("anna"), { data: { pages: [{ n: 1 }] } })

  const minted = await mint("circuit/rc.sheet")
  assert.equal(minted.statusCode, 200, minted.body)
  const { token } = minted.json()
  assert.ok(token && token.includes("."))

  const read = await render(token)
  assert.equal(read.statusCode, 200, read.body)
  const doc = read.json()
  assert.equal(doc.path, "circuit/rc.sheet")
  assert.deepEqual(doc.data, { pages: [{ n: 1 }] })
  assert.equal(doc.version, 1)
})

test("render is login-free (works for an anonymous caller)", async () => {
  await writeDoc(ctx, klasseId, "anon/read.sheet", asPerson("anna"), { data: { ok: true } })
  const { token } = (await mint("anon/read.sheet")).json()
  const read = await render(token) // asAnon(): no identity at all
  assert.equal(read.statusCode, 200, read.body)
  assert.deepEqual(read.json().data, { ok: true })
})

test("render with a bad/blank token → 4xx, never a document", async () => {
  assert.equal((await render("")).statusCode >= 400, true)
  assert.equal((await render("garbage.signature")).statusCode >= 400, true)
})

test("mint requires read access — a non-member is refused", async () => {
  await writeDoc(ctx, klasseId, "guarded/doc.sheet", asPerson("anna"), { data: { secret: 1 } })
  const denied = await mint("guarded/doc.sheet", "carol") // carol is not a member
  assert.equal(denied.statusCode >= 400, true, `expected refusal, got ${denied.statusCode}`)
})

test("mint bakes in the CONCRETE version the caller sees (walk-up resolved)", async () => {
  // anna writes v1 then v2 in her leaf; the token must point at v2.
  await writeDoc(ctx, klasseId, "ver/doc.sheet", asPerson("anna"), { data: { v: 1 } })
  await writeDoc(ctx, klasseId, "ver/doc.sheet", asPerson("anna"), { data: { v: 2 } })

  const { token } = (await mint("ver/doc.sheet")).json()
  const decoded = rendertoken.verify(token)
  assert.equal(decoded.version, 2)

  const read = await render(token)
  assert.equal(read.statusCode, 200)
  assert.deepEqual(read.json().data, { v: 2 })
})
