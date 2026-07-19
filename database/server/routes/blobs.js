// Blob routes. See README §6.14, §9.6.
//
//   PUT    /database/scopes/:scopeRef/blobs/:key?path=X   — raw body upload
//   GET    /database/scopes/:scopeRef/blobs/:key?path=X   — walk-up read
//   DELETE /database/scopes/:scopeRef/blobs/:key?path=X   — remove
//   GET    /database/public/:publicId/blobs/:key          — anonymous

const {
  putBlob,
  getBlob,
  deleteBlob,
  getBlobByPublicId,
} = require("../persistence/blobs")
const { NotFoundError, BadRequestError } = require("../utils/errors")
const {
  requirePathQuery,
  requireRead,
  requireWriteLeaf,
} = require("./helpers")

async function routes(fastify) {
  // Register a permissive raw-body parser so PUT can carry arbitrary bytes.
  // Fastify by default only parses application/json.
  fastify.addContentTypeParser(
    /^(?!application\/json).*/,
    { parseAs: "buffer" },
    (req, body, done) => done(null, body)
  )

  fastify.put(
    "/database/scopes/:scopeRef/blobs/:key",
    { preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const docPath = requirePathQuery(req)
      const key = req.params.key
      const contentType = req.headers["content-type"]

      let body = req.body
      if (typeof body === "string") body = Buffer.from(body, "utf8")
      if (!Buffer.isBuffer(body)) {
        throw new BadRequestError(`request body must be raw bytes (got ${typeof body})`)
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
    "/database/scopes/:scopeRef/blobs/:key",
    { preHandler: [fastify.resolvePrincipal] },
    async (req, reply) => {
      const scopeId = await requireRead(req.params.scopeRef, req.personRef)
      const docPath = requirePathQuery(req)
      const key = req.params.key
      // Optional version pin — used to serve blobs for pending (review-queue)
      // versions that the walk-up would otherwise skip.
      const version = req.query.version != null ? Number(req.query.version) : null
      const blob = await getBlob({
        operatingScopeId: scopeId,
        personRef: req.personRef,
        docPath,
        key,
        version,
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
    "/database/scopes/:scopeRef/blobs/:key",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const docPath = requirePathQuery(req)
      const key = req.params.key
      const { deleted } = await deleteBlob({ leafScopeId: leafId, docPath, key })
      return { deleted }
    }
  )

  // Anonymous
  fastify.get("/database/public/:publicId/blobs/:key", async (req, reply) => {
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
  })
}

module.exports = routes
