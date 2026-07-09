// Rename + name-check routes. See README §6.15.

const { renameInLeaf, hasPathInLeaf } = require("../persistence/rename")
const { BadRequestError } = require("../utils/errors")
const { requireWriteLeaf } = require("./helpers")

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

async function routes(fastify) {
  fastify.post(
    "/database/scopes/:scopeRef/docs/rename",
    { schema: { body: renameBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const { path, newPath, version } = req.body
      return renameInLeaf({
        leafScopeId: leafId,
        oldPath: path,
        newPath,
        expectedVersion: version,
        callerPersonRef: req.personRef,
      })
    }
  )

  // Name-check: does the caller's own leaf have any version at ?path=X ?
  fastify.get(
    "/database/scopes/:scopeRef/docs/exists",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
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
