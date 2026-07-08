// Rename + name-check routes. See README §6.15.

const { pool } = require("../persistence/pool")
const {
  isMember,
  leafIdForPersonUnder,
  getScope,
} = require("../persistence/scopes")
const { renameInLeaf, hasPathInLeaf } = require("../persistence/rename")
const { ForbiddenError, NotFoundError, BadRequestError } = require("../utils/errors")

const renameBody = {
  type: "object",
  required: ["path", "newPath"],
  properties: {
    path: { type: "string", minLength: 1 },
    newPath: { type: "string", minLength: 1 },
    version: { type: "integer", minimum: 1 },
  },
  additionalProperties: false,
}

function parseScopeId(raw) {
  if (!/^\d+$/.test(raw)) {
    throw new BadRequestError(`scopeId must be a numeric id, got: ${raw}`)
  }
  return raw
}

async function routes(fastify) {
  async function resolveAndRequireMember(rawScopeId, personRef) {
    const scopeId = parseScopeId(rawScopeId)
    const client = await pool.connect()
    try {
      const scope = await getScope(client, scopeId)
      if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
      const ok = await isMember(client, scopeId, personRef)
      if (!ok) {
        throw new ForbiddenError(`caller is not a member of scope id ${scopeId}`)
      }
      const leafId = await leafIdForPersonUnder(client, scopeId, personRef)
      if (!leafId) {
        throw new ForbiddenError(`no personal leaf for caller under scope id ${scopeId}`)
      }
      return { scopeId, leafId }
    } finally {
      client.release()
    }
  }

  fastify.post(
    "/database/scopes/:scopeId/rename",
    { schema: { body: renameBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const { path, newPath, version } = req.body
      const result = await renameInLeaf({
        leafScopeId: leafId,
        oldPath: path,
        newPath,
        expectedVersion: version,
        callerPersonRef: req.personRef,
      })
      return result
    }
  )

  // Name-check: does the caller's own leaf have any version at ?path=X ?
  fastify.get(
    "/database/scopes/:scopeId/docs/exists",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const p = req.query && req.query.path
      if (!p || typeof p !== "string") {
        throw new BadRequestError("query parameter `path` required")
      }
      const exists = await hasPathInLeaf({ leafScopeId: leafId, docPath: p })
      return { exists }
    }
  )
}

module.exports = routes
