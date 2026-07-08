// Scope routes.
//
//   POST /database/scopes/:scopeId/children   — create sub-scope
//   POST /database/scopes/:scopeId/members    — add member (+ leaf)
//   GET  /database/scopes/by-path?path=X      — resolve human path → scope id
//
// :scopeId is the numeric scopes.id (bigint) as returned by bootstrap or
// createScope.

const { pool } = require("../persistence/pool")
const {
  pathOfScope,
  resolveScopeIdByPath,
  createScope,
  isAdmin,
  addMemberWithLeaf,
  getScope,
} = require("../persistence/scopes")
const { ForbiddenError, BadRequestError, NotFoundError } = require("../utils/errors")

const createChildBody = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", minLength: 1, pattern: "^[^/]+$" },
    requiredApprovalScore: { type: "integer", minimum: 0, default: 0 },
  },
  additionalProperties: false,
}

const addMemberBody = {
  type: "object",
  required: ["personRef"],
  properties: {
    personRef: { type: "string", minLength: 1 },
  },
  additionalProperties: false,
}

function parseScopeId(raw) {
  if (!/^\d+$/.test(raw)) {
    throw new BadRequestError(`scopeId must be a numeric id, got: ${raw}`)
  }
  return raw // pg accepts bigint as string
}

async function routes(fastify) {
  async function requireAdmin(scopeId, personRef) {
    const client = await pool.connect()
    try {
      const scope = await getScope(client, scopeId)
      if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
      const ok = await isAdmin(client, scopeId, personRef)
      if (!ok) {
        throw new ForbiddenError(`caller is not admin of scope id ${scopeId}`)
      }
      return scope
    } finally {
      client.release()
    }
  }

  fastify.post(
    "/database/scopes/:scopeId/children",
    {
      schema: { body: createChildBody },
      preHandler: [fastify.requireLogin],
    },
    async (req, reply) => {
      const parentId = parseScopeId(req.params.scopeId)
      await requireAdmin(parentId, req.personRef)

      const { name, requiredApprovalScore = 0 } = req.body
      if (name.includes("/")) {
        throw new BadRequestError('scope name must not contain "/"')
      }

      const scope = await createScope({
        parentId,
        name,
        requiredApprovalScore,
        createdBy: req.personRef,
      })

      const client = await pool.connect()
      let path
      try {
        path = await pathOfScope(client, scope.id)
      } finally {
        client.release()
      }

      reply.code(201)
      return {
        id: scope.id,
        name: scope.name,
        path,
        requiredApprovalScore: scope.required_approval_score,
        createdAt: scope.created_at,
        createdBy: scope.created_by,
      }
    }
  )

  fastify.post(
    "/database/scopes/:scopeId/members",
    {
      schema: { body: addMemberBody },
      preHandler: [fastify.requireLogin],
    },
    async (req, reply) => {
      const scopeId = parseScopeId(req.params.scopeId)
      const { personRef } = req.body

      // Two allowed cases:
      //   1. Admin of the target scope adds anyone (normal path).
      //   2. Anyone adds themselves — self-enrollment. This lets services
      //      like brains lazily create per-user leafs without granting
      //      brains admin rights on every users-bucket scope.
      if (personRef !== req.personRef) {
        const client = await pool.connect()
        try {
          const scope = await getScope(client, scopeId)
          if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
          const ok = await isAdmin(client, scopeId, req.personRef)
          if (!ok) {
            throw new ForbiddenError(
              `caller is not admin of scope id ${scopeId} — self-enrollment only allows personRef == caller`
            )
          }
        } finally {
          client.release()
        }
      }

      const result = await addMemberWithLeaf({
        scopeId,
        personRef,
        createdBy: req.personRef,
      })
      reply.code(201)
      return { scopeId: result.scopeId, leafId: result.leafId }
    }
  )

  // Look up a scope id from a human path like "electra/apps/brains".
  // Used by other services (brains, shapes, ...) so they can resolve the
  // canonical scope ids declared in init.json on their first boot.
  fastify.get(
    "/database/scopes/by-path",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const p = req.query && req.query.path
      if (!p || typeof p !== "string") {
        throw new BadRequestError("query parameter `path` required")
      }
      const client = await pool.connect()
      let id
      try {
        id = await resolveScopeIdByPath(client, p)
      } finally {
        client.release()
      }
      if (id === null) {
        throw new NotFoundError(`no scope at path ${p}`)
      }
      return { id, path: p }
    }
  )
}

module.exports = routes
