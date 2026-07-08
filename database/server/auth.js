// Auth hook — Fastify equivalent of gamification's ensureLoggedIn.
//
// The ingress reverse proxy authenticates via Google OAuth2 and injects:
//   x-mail  — authenticated email
//   x-role  — "admin" | "user" | "anonym"
//
// We derive personRef = SHA-256(email) and expose it on req.personRef.
// Test mode (DATABASE_TEST_MODE=1) bypasses SHA and lets the caller pass
// x-hash directly so tests can simulate multiple identities.

const { createHash } = require("crypto")
const { ForbiddenError } = require("./utils/errors")

const TEST_MODE = process.env.DATABASE_TEST_MODE === "1"

function hashEmail(email) {
  const h = createHash("sha256")
  h.update(email)
  return h.digest("hex")
}

// Attaches personRef to the request based on the ingress headers.
// Rejects anonym.
async function requireLogin(req, reply) {
  const role = req.headers["x-role"]
  if (role !== "admin" && role !== "user") {
    throw new ForbiddenError("authentication required")
  }

  let personRef
  if (TEST_MODE && req.headers["x-hash"]) {
    personRef = req.headers["x-hash"]
  } else {
    const mail = req.headers["x-mail"]
    if (!mail) {
      throw new ForbiddenError("x-mail header missing")
    }
    personRef = hashEmail(mail)
  }

  req.personRef = personRef
  req.role = role
}

// Adds Cache-Control headers preventing intermediary caches from storing
// authenticated responses. Applied globally.
async function nocache(req, reply) {
  reply.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
  reply.header("Pragma", "no-cache")
  reply.header("Expires", "-1")
}

module.exports = { requireLogin, nocache }
