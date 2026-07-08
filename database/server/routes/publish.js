// Publish / unpublish / revert routes + anonymous public read.
// See README §6.10 (revert), §6.13 (publish).

const { pool } = require("../persistence/pool")
const {
  pathOfScope,
  isMember,
  leafIdForPersonUnder,
  getScope,
} = require("../persistence/scopes")
const { revertDoc } = require("../persistence/docs")
const { publish, unpublish, getByPublicId } = require("../persistence/publish")
const { ForbiddenError, NotFoundError, BadRequestError } = require("../utils/errors")

const pathOnlyBody = {
  type: "object",
  required: ["path"],
  properties: {
    path: { type: "string", minLength: 1 },
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

  async function resolveOriginPath(scopeId) {
    const client = await pool.connect()
    try {
      return await pathOfScope(client, scopeId)
    } finally {
      client.release()
    }
  }

  fastify.post(
    "/database/scopes/:scopeId/revert",
    { schema: { body: pathOnlyBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const { deleted } = await revertDoc({ leafScopeId: leafId, docPath: req.body.path })
      return { deleted }
    }
  )

  fastify.post(
    "/database/scopes/:scopeId/publish",
    { schema: { body: pathOnlyBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const result = await publish({ callerLeafId: leafId, docPath: req.body.path })
      reply.code(201)
      return {
        publicId: result.publicId,
        publishedAt: result.publishedAt,
        version: result.version,
      }
    }
  )

  fastify.post(
    "/database/scopes/:scopeId/unpublish",
    { schema: { body: pathOnlyBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const result = await unpublish({ callerLeafId: leafId, docPath: req.body.path })
      return { unpublished: result }
    }
  )

  // Anonymous public read — no auth
  fastify.get(
    "/database/public/:publicId",
    async (req, reply) => {
      const { publicId } = req.params
      if (!/^[0-9a-f-]{36}$/i.test(publicId)) {
        throw new NotFoundError("invalid public id")
      }
      const result = await getByPublicId(publicId, resolveOriginPath)
      if (result.status === "notfound") {
        throw new NotFoundError("no such public document")
      }
      if (result.status === "gone") {
        reply.code(410)
        return { error: { code: "gone", message: "this document has been unpublished" } }
      }
      return result.doc
    }
  )
}

module.exports = routes
