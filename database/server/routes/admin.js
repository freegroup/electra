// Admin (god-view) routes — token-gated, localhost-only.
//
// These expose the whole tree and all versions across a subtree, bypassing the
// walk-up privacy that the normal API enforces. They are guarded by a shared
// secret (X-Admin-Token == DATABASE_ADMIN_TOKEN) and are intentionally NOT
// proxied by the public ingress — only the local admin BFF can reach them.

const { fullTree, versionsUnder, docAt, docVersions } = require("../persistence/admin")
const { getScope } = require("../persistence/scopes")
const { pool } = require("../persistence/pool")
const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} = require("../utils/errors")

const ADMIN_TOKEN = process.env.DATABASE_ADMIN_TOKEN || null

// preHandler: reject anything without the exact admin token. If no token is
// configured on the server, the endpoints are disabled entirely (fail closed).
async function requireAdminToken(req) {
  if (!ADMIN_TOKEN) {
    throw new UnauthorizedError("admin endpoints are disabled (no token configured)")
  }
  if (req.headers["x-admin-token"] !== ADMIN_TOKEN) {
    throw new UnauthorizedError("valid X-Admin-Token required")
  }
}

async function routes(fastify) {
  fastify.get(
    "/database/admin/tree",
    { preHandler: [requireAdminToken] },
    async () => fullTree()
  )

  fastify.get(
    "/database/admin/versions",
    { preHandler: [requireAdminToken] },
    async (req) => {
      const scope = req.query && req.query.scope
      if (!scope || !/^\d+$/.test(String(scope))) {
        throw new BadRequestError("query parameter `scope` (numeric id) required")
      }
      const client = await pool.connect()
      try {
        const exists = await getScope(client, scope)
        if (!exists) throw new NotFoundError(`unknown scope id ${scope}`)
      } finally {
        client.release()
      }
      const versions = await versionsUnder(scope)
      return { versions }
    }
  )
  fastify.get(
    "/database/admin/doc",
    { preHandler: [requireAdminToken] },
    async (req) => {
      const scope = req.query && req.query.scope
      const path = req.query && req.query.path
      const version = req.query && req.query.version
      if (!scope || !/^\d+$/.test(String(scope))) {
        throw new BadRequestError("query parameter `scope` (numeric id) required")
      }
      if (!path) throw new BadRequestError("query parameter `path` required")
      const v = version != null && /^\d+$/.test(String(version)) ? Number(version) : undefined
      const doc = await docAt(scope, String(path), v)
      if (!doc) throw new NotFoundError(`no version at ${path} in scope ${scope}`)
      return doc
    }
  )

  fastify.get(
    "/database/admin/doc-versions",
    { preHandler: [requireAdminToken] },
    async (req) => {
      const scope = req.query && req.query.scope
      const path = req.query && req.query.path
      if (!scope || !/^\d+$/.test(String(scope))) {
        throw new BadRequestError("query parameter `scope` (numeric id) required")
      }
      if (!path) throw new BadRequestError("query parameter `path` required")
      return { versions: await docVersions(scope, String(path)) }
    }
  )
}

module.exports = routes
