// Doc routes.
//
//   GET  /database/scopes/:scopeId/docs           — list effective view
//   GET  /database/scopes/:scopeId/docs/*         — walk-up lookup
//   PUT  /database/scopes/:scopeId/docs/*         — write to caller's leaf

const { pool } = require("../persistence/pool")
const {
  pathOfScope,
  isMember,
  leafIdForPersonUnder,
  getScope,
} = require("../persistence/scopes")
const { getDoc, listDocs, putDoc } = require("../persistence/docs")
const { ForbiddenError, NotFoundError, BadRequestError } = require("../utils/errors")

const putBody = {
  type: "object",
  required: ["data"],
  properties: {
    data: { type: "object" },
    meta: { type: "object" },
    scope: { type: "string" },
    path: { type: "string" },
    version: { type: "integer" },
    status: { type: "string" },
    author: { type: "string" },
    createdAt: { type: "string" },
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
        throw new ForbiddenError(`no personal leaf provisioned for caller under scope id ${scopeId}`)
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

  fastify.get(
    "/database/scopes/:scopeId/docs",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const prefix = req.query && req.query.prefix ? String(req.query.prefix) : null
      const docs = await listDocs({ callerLeafId: leafId, prefix, resolveOriginPath })
      return { docs }
    }
  )

  fastify.get(
    "/database/scopes/:scopeId/docs/*",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const docPath = req.params["*"]
      const doc = await getDoc({ callerLeafId: leafId, docPath, resolveOriginPath })
      if (!doc) {
        throw new NotFoundError(`no document at ${docPath} visible from this scope`)
      }
      return doc
    }
  )

  fastify.put(
    "/database/scopes/:scopeId/docs/*",
    {
      schema: { body: putBody },
      preHandler: [fastify.requireLogin],
    },
    async (req, reply) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const docPath = req.params["*"]
      const { data, meta } = req.body

      const inserted = await putDoc({
        leafScopeId: leafId,
        docPath,
        data,
        meta,
        author: req.personRef,
      })
      const originPath = await resolveOriginPath(inserted.scope_id)
      reply.code(201)
      return {
        data: inserted.data,
        meta: inserted.meta,
        scope: originPath,
        path: inserted.doc_path,
        version: inserted.version,
        status: inserted.status,
        author: inserted.author,
        createdAt: inserted.created_at,
      }
    }
  )
}

module.exports = routes
