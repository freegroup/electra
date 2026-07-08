// Blob routes. See README §6.14, ARCHITECTURE.md §4.12.
//
//   PUT    /database/scopes/:scopeId/blobs/:key?path=X   — raw body upload
//   GET    /database/scopes/:scopeId/blobs/:key?path=X   — walk-up read
//   DELETE /database/scopes/:scopeId/blobs/:key?path=X   — remove
//   GET    /database/public/:publicId/blobs/:key         — anonymous

const { pool } = require("../persistence/pool")
const {
  isMember,
  leafIdForPersonUnder,
  getScope,
} = require("../persistence/scopes")
const {
  putBlob,
  getBlob,
  deleteBlob,
  getBlobByPublicId,
} = require("../persistence/blobs")
const {
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors")

function parseScopeId(raw) {
  if (!/^\d+$/.test(raw)) {
    throw new BadRequestError(`scopeId must be a numeric id, got: ${raw}`)
  }
  return raw
}

function requirePathQuery(req) {
  const p = req.query && req.query.path
  if (!p || typeof p !== "string") {
    throw new BadRequestError("query parameter `path` required")
  }
  return p
}

async function routes(fastify) {
  // Register a permissive raw-body parser so PUT can carry arbitrary bytes.
  // Fastify by default only parses application/json.
  fastify.addContentTypeParser(
    /^(?!application\/json).*/,
    { parseAs: "buffer" },
    (req, body, done) => done(null, body)
  )

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

  fastify.put(
    "/database/scopes/:scopeId/blobs/:key",
    { preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const docPath = requirePathQuery(req)
      const key = req.params.key
      const contentType = req.headers["content-type"]

      // Ensure the body is a Buffer regardless of which Fastify content-type
      // parser matched. String → Buffer preserves the raw bytes.
      let body = req.body
      if (typeof body === "string") body = Buffer.from(body, "utf8")
      if (!Buffer.isBuffer(body)) {
        throw new BadRequestError(
          `request body must be raw bytes (got ${typeof body})`
        )
      }

      const result = await putBlob({
        leafScopeId: leafId,
        docPath,
        key,
        buffer: body,
        contentType,
      })
      reply.code(201)
      return result
    }
  )

  fastify.get(
    "/database/scopes/:scopeId/blobs/:key",
    { preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const docPath = requirePathQuery(req)
      const key = req.params.key
      const blob = await getBlob({
        callerLeafId: leafId,
        docPath,
        key,
      })
      if (!blob) {
        throw new NotFoundError(`no blob '${key}' visible for ${docPath}`)
      }
      reply.header("Content-Type", blob.contentType)
      reply.header("Content-Length", blob.sizeBytes)
      return blob.buffer
    }
  )

  fastify.delete(
    "/database/scopes/:scopeId/blobs/:key",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await resolveAndRequireMember(
        req.params.scopeId,
        req.personRef
      )
      const docPath = requirePathQuery(req)
      const key = req.params.key
      const { deleted } = await deleteBlob({ leafScopeId: leafId, docPath, key })
      return { deleted }
    }
  )

  // Anonymous
  fastify.get(
    "/database/public/:publicId/blobs/:key",
    async (req, reply) => {
      const { publicId, key } = req.params
      if (!/^[0-9a-f-]{36}$/i.test(publicId)) {
        throw new NotFoundError("invalid public id")
      }
      const result = await getBlobByPublicId(publicId, key)
      if (result.status === "notfound") {
        throw new NotFoundError("no such public blob")
      }
      if (result.status === "gone") {
        reply.code(410)
        return { error: { code: "gone", message: "this document has been unpublished" } }
      }
      reply.header("Content-Type", result.blob.contentType)
      reply.header("Content-Length", result.blob.sizeBytes)
      return result.blob.buffer
    }
  )
}

module.exports = routes
