// Short-lived signed render tokens.
//
// A render token grants login-free read of exactly ONE document version, until
// it expires (~60s). It's the ephemeral, private cousin of a publicId: puppeteer
// uses it to render a preview/PDF of a doc without publishing it and without the
// user's session. Stateless — a self-verifying HMAC, no store, no cleanup.
//
// Token = base64url(payloadJson) + "." + base64url(HMAC-SHA256(payloadJson)).
// payload = { s: scopeId, p: docPath, v: version|null, exp: unixSeconds }.

const { createHmac, timingSafeEqual } = require("crypto")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

const SECRET = process.env.DATABASE_RENDER_SECRET || ""

function b64url(buf) {
  return Buffer.from(buf).toString("base64url")
}

function hmac(payloadB64) {
  return createHmac("sha256", SECRET).update(payloadB64).digest()
}

// Mint a token for a specific scope/path/version. ttlSeconds defaults to 60.
function sign({ scopeId, docPath, version = null, ttlSeconds = 60 }) {
  if (!SECRET) throw new Error("DATABASE_RENDER_SECRET not configured")
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const payload = { s: String(scopeId), p: docPath, v: version, exp }
  const payloadB64 = b64url(JSON.stringify(payload))
  const sigB64 = b64url(hmac(payloadB64))
  return `${payloadB64}.${sigB64}`
}

// Verify a token → { scopeId, docPath, version }. Throws on bad shape/signature
// (BadRequest) or expiry (Unauthorized).
function verify(token) {
  if (!SECRET) throw new Error("DATABASE_RENDER_SECRET not configured")
  if (typeof token !== "string" || !token.includes(".")) {
    throw new BadRequestError("malformed render token")
  }
  const [payloadB64, sigB64] = token.split(".")
  const expected = hmac(payloadB64)
  let given
  try {
    given = Buffer.from(sigB64, "base64url")
  } catch {
    throw new BadRequestError("malformed render token")
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    throw new BadRequestError("invalid render token signature")
  }
  let payload
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"))
  } catch {
    throw new BadRequestError("malformed render token payload")
  }
  if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
    throw new UnauthorizedError("render token expired")
  }
  return { scopeId: payload.s, docPath: payload.p, version: payload.v }
}

module.exports = { sign, verify }
