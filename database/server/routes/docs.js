// Doc routes (README §9.2).
//
//   GET  /database/scopes/:scopeRef/docs?path=X   — walk-up read
//   GET  /database/scopes/:scopeRef/docs          — list effective view (?prefix=)
//   PUT  /database/scopes/:scopeRef/docs?path=X   — write to caller's leaf
//
// Reads are guarded by canRead (transitive-up membership, or the world-readable
// root). Writes require explicit membership and provision the caller's leaf
// under the operating scope on first write.

const { getDoc, listDocs, globDocs, putDoc, deleteDoc, historyDocs, rowToDoc } = require("../persistence/docs")
const { docAt } = require("../persistence/admin")
const { promote } = require("../persistence/promote")
const { distribute } = require("../persistence/distribute")
const { NotFoundError, BadRequestError } = require("../utils/errors")
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
        // Version-pinned read: fetch EXACTLY this scope+version, bypassing the
        // walk-up. Used to open the shared "original" of a doc even when the
        // caller has a personal copy that the walk-up would otherwise prefer.
        if (q.version != null && q.version !== "") {
          const pinned = await docAt(scopeId, String(q.path), Number(q.version))
          if (!pinned || pinned.isDeletion) {
            throw new NotFoundError(`no document at ${q.path} v${q.version} in this scope`)
          }
          const originPath = await resolveOriginPath(scopeId)
          return rowToDoc(
            {
              data: pinned.data,
              meta: pinned.meta,
              doc_path: pinned.path,
              version: pinned.version,
              status: pinned.status,
              author: pinned.author,
              created_at: pinned.createdAt,
            },
            originPath
          )
        }
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
      // Glob mode: aggregate every doc visible under this scope (as root) across
      // all the caller's groups, one row per path with its provider.
      if (q.glob === "true" || q.glob === "1") {
        const docs = await globDocs({
          rootScopeId: scopeId,
          personRef: req.personRef,
          prefix,
          resolveOriginPath,
        })
        return { docs }
      }
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
  fastify.get(
    "/database/scopes/:scopeRef/docs/history",
    { preHandler: [fastify.resolvePrincipal] },
    async (req) => {
      const docPath = requirePathQuery(req)
      const scopeId = await requireRead(req.params.scopeRef, req.personRef)
      const history = await historyDocs({
        operatingScopeId: scopeId,
        personRef: req.personRef,
        docPath,
        resolveOriginPath,
      })
      return { history }
    }
  )

  fastify.delete(
    "/database/scopes/:scopeRef/docs",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const docPath = requirePathQuery(req)
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const version = req.body && req.body.version
      // Local delete: a tombstone in the caller's own leaf hides the path from
      // their view immediately. Making it a group-wide delete is a separate
      // promote of this tombstone, which runs the normal review (README §6.9).
      const row = await deleteDoc({
        leafScopeId: leafId,
        docPath,
        author: req.personRef,
        expectedVersion: version,
      })
      return { status: "deleted-local", version: row.version }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/docs/promote",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const docPath = requirePathQuery(req)
      // Must be an explicit member of the operating scope to promote from it.
      await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const version = req.body && req.body.version
      return promote({
        operatingScopeId: req.params.scopeRef,
        personRef: req.personRef,
        docPath,
        expectedVersion: version,
      })
    }
  )
  fastify.post(
    "/database/scopes/:scopeRef/docs/distribute",
    {
      schema: {
        body: {
          type: "object",
          required: ["path", "targetScopeRefs"],
          properties: {
            path: { type: "string", minLength: 1 },
            version: { type: "integer", minimum: 1 },
            targetScopeRefs: {
              type: "array",
              items: { type: "string", pattern: "^\\d+$" },
              minItems: 1,
              uniqueItems: true,
            },
          },
          additionalProperties: false,
        },
      },
      preHandler: [fastify.requireLogin],
    },
    async (req) => {
      const { path, version, targetScopeRefs } = req.body
      // Caller must be an explicit member of the source scope.
      await requireWriteLeaf(req.params.scopeRef, req.personRef)
      return distribute({
        sourceScopeId: req.params.scopeRef,
        personRef: req.personRef,
        docPath: path,
        expectedVersion: version,
        targetScopeRefs,
      })
    }
  )
}

module.exports = routes
