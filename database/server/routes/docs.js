// Doc routes (README §9.2).
//
//   GET  /database/scopes/:scopeRef/docs?path=X   — walk-up read
//   GET  /database/scopes/:scopeRef/docs          — list effective view (?prefix=)
//   PUT  /database/scopes/:scopeRef/docs?path=X   — write to caller's leaf
//
// Reads are guarded by canRead (transitive-up membership, or the world-readable
// root). Writes require explicit membership and provision the caller's leaf
// under the operating scope on first write.

const { getDoc, listDocs, putDoc } = require("../persistence/docs")
const { NotFoundError } = require("../utils/errors")
const {
  requirePathQuery,
  resolveOriginPath,
  requireRead,
  requireWriteLeaf,
} = require("./helpers")

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

async function routes(fastify) {
  fastify.get(
    "/database/scopes/:scopeRef/docs",
    { preHandler: [fastify.resolvePrincipal] },
    async (req) => {
      const scopeId = await requireRead(req.params.scopeRef, req.personRef)
      const q = req.query || {}
      if (q.path) {
        const doc = await getDoc({
          operatingScopeId: scopeId,
          personRef: req.personRef,
          docPath: String(q.path),
          resolveOriginPath,
        })
        if (!doc) {
          throw new NotFoundError(`no document at ${q.path} visible from this scope`)
        }
        return doc
      }
      const prefix = q.prefix ? String(q.prefix) : null
      const docs = await listDocs({
        operatingScopeId: scopeId,
        personRef: req.personRef,
        prefix,
        resolveOriginPath,
      })
      return { docs }
    }
  )

  fastify.put(
    "/database/scopes/:scopeRef/docs",
    { schema: { body: putBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const docPath = requirePathQuery(req)
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const { data, meta, version, scope } = req.body

      // Optimistic concurrency (§6.12) applies only when the caller edits
      // their OWN leaf version — i.e. the passed doc's origin scope is the
      // leaf. Editing an inherited version starts a fresh leaf v1 with no
      // check.
      const leafPath = await resolveOriginPath(leafId)
      const expectedVersion = scope === leafPath ? version : null

      const inserted = await putDoc({
        leafScopeId: leafId,
        docPath,
        data,
        meta,
        author: req.personRef,
        expectedVersion,
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
