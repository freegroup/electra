// Publish / unpublish / revert routes + anonymous public read.
// See README §6.10 (revert), §6.13 (publish), §9.5.

const { revertDoc } = require("../persistence/docs")
const { publish, unpublish, getByPublicId } = require("../persistence/publish")
const { NotFoundError } = require("../utils/errors")
const { resolveOriginPath, requireWriteLeaf } = require("./helpers")

const pathOnlyBody = {
  type: "object",
  required: ["path"],
  properties: {
    path: { type: "string", minLength: 1 },
  },
  additionalProperties: false,
}

async function routes(fastify) {
  fastify.post(
    "/database/scopes/:scopeRef/docs/revert",
    { schema: { body: pathOnlyBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const { deleted } = await revertDoc({ leafScopeId: leafId, docPath: req.body.path })
      return { deleted }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/docs/publish",
    { schema: { body: pathOnlyBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
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
    "/database/scopes/:scopeRef/docs/unpublish",
    { schema: { body: pathOnlyBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const result = await unpublish({ callerLeafId: leafId, docPath: req.body.path })
      return { unpublished: result }
    }
  )

  // Anonymous public read — no auth
  fastify.get("/database/public/:publicId", async (req, reply) => {
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
  })
}

module.exports = routes
