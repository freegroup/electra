// Auth hook — Fastify equivalent of gamification's ensureLoggedIn.
//
// The ingress reverse proxy authenticates via Google OAuth2 and injects:
//   x-mail  — authenticated email
//   x-role  — "admin" | "user" | "anonym"
//
// personRef IS the clear email (req.personRef). There is deliberately no
// hashing: the admin knows who every member is anyway (members are entered by
// email), so a hash gave only pseudo-privacy. See ARCHITECTURE.md.
// Test mode (DATABASE_TEST_MODE=1) lets the caller pass x-hash as a literal
// personRef so tests can simulate multiple identities without real emails.

const { UnauthorizedError } = require("./utils/errors")

const TEST_MODE = process.env.DATABASE_TEST_MODE === "1"

// Resolves the caller's personRef from the ingress headers, or null when the
// caller is anonymous (not logged in). Never throws — read routes and public
// routes rely on this soft resolution. Sets req.personRef (string | null) and
// req.role.
async function resolvePrincipal(req) {
  const role = req.headers["x-role"]

  if (role !== "admin" && role !== "user") {
    // Anonymous (role "anonym", or missing). No identity.
    req.personRef = null
    req.role = "anonym"
    return
  }

  let personRef
  if (TEST_MODE && req.headers["x-hash"]) {
    personRef = req.headers["x-hash"]
  } else {
    const mail = req.headers["x-mail"]
    if (!mail) {
      // Claims a role but carries no identity — treat as anonymous.
      req.personRef = null
      req.role = "anonym"
      return
    }
    personRef = mail
  }

  req.personRef = personRef
  req.role = role
}

// Attaches personRef to the request based on the ingress headers. Rejects
// anonymous callers with 401 (README §9.9) — used on every write and on
// membership-scoped reads that are not world-readable.
async function requireLogin(req, reply) {
  await resolvePrincipal(req)
  if (!req.personRef) {
    throw new UnauthorizedError("authentication required")
  }
}

// Adds Cache-Control headers preventing intermediary caches from storing
// authenticated responses. Applied globally.
async function nocache(req, reply) {
  reply.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
  reply.header("Pragma", "no-cache")
  reply.header("Expires", "-1")
}

module.exports = { requireLogin, resolvePrincipal, nocache }
