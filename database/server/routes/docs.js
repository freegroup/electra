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
const { pool } = require("../persistence/pool")
const { docAt } = require("../persistence/admin")
const { promote, requestDelete } = require("../persistence/promote")
const { distribute } = require("../persistence/distribute")
const { distributeTargets } = require("../persistence/scopes")
const { NotFoundError, BadRequestError } = require("../utils/errors")
const {
  requirePathQuery,
  resolveOriginPath,
  requireRead,
  requireGlobRead,
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
      const q = req.query || {}
      const isGlob = q.glob === "true" || q.glob === "1"
      // Glob is a filtered subtree aggregation (see requireGlobRead): an
      // anonymous caller may run it without a read grant on the root, since its
      // results are limited to public scopes inside globDocs. Every other read
      // mode keeps the normal per-scope read gate.
      const scopeId = isGlob
        ? await requireGlobRead(req.params.scopeRef, req.personRef)
        : await requireRead(req.params.scopeRef, req.personRef)
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
      const suffix = q.suffix ? String(q.suffix) : null
      // Glob mode: aggregate every doc visible under this scope (as root) across
      // all the caller's groups, one row per path with its provider.
      if (isGlob) {
        const docs = await globDocs({
          rootScopeId: scopeId,
          personRef: req.personRef,
          prefix,
          suffix,
          resolveOriginPath,
        })
        return { docs }
      }
      const docs = await listDocs({
        operatingScopeId: scopeId,
        personRef: req.personRef,
        prefix,
        // Document types are told apart by their suffix (".brain", ".part").
        // Filtering here keeps a caller from hauling every other type's data
        // across just to drop it again.
        suffix,
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
      // Snapshot the version being deleted (as the caller currently sees it) into
      // the tombstone, so a deletion that goes to review can still be previewed
      // and opened read-only. null when the path is already gone.
      const effective = await getDoc({
        operatingScopeId: req.params.scopeRef,
        personRef: req.personRef,
        docPath,
        resolveOriginPath,
      })
      // Local delete: a tombstone in the caller's own leaf hides the path from
      // their view immediately. Making it a group-wide delete is a separate
      // promote of this tombstone, which runs the normal review (README §6.9).
      const row = await deleteDoc({
        leafScopeId: leafId,
        docPath,
        author: req.personRef,
        expectedVersion: version,
        data: effective ? effective.data : undefined,
      })
      return { status: "deleted-local", version: row.version }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/docs/promote",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            version: { type: "integer", minimum: 1 },
            // Free-text note for the reviewers ("what changed and why") —
            // shown in the review queue; capped so meta stays lightweight.
            description: { type: "string", maxLength: 2000 },
          },
          additionalProperties: false,
        },
      },
      preHandler: [fastify.requireLogin],
    },
    async (req) => {
      const docPath = requirePathQuery(req)
      // Must be an explicit member of the operating scope to promote from it.
      await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const { version, description } = req.body || {}
      return promote({
        operatingScopeId: req.params.scopeRef,
        personRef: req.personRef,
        docPath,
        expectedVersion: version,
        description: (description || "").trim() || undefined,
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
            description: { type: "string" },
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
      const { path, version, targetScopeRefs, description } = req.body
      // Caller must be an explicit member of the source scope.
      await requireWriteLeaf(req.params.scopeRef, req.personRef)
      return distribute({
        sourceScopeId: req.params.scopeRef,
        personRef: req.personRef,
        docPath: path,
        expectedVersion: version,
        targetScopeRefs,
        description: (description || "").trim() || undefined,
      })
    }
  )

  // The scopes this caller may distribute the source scope's docs INTO — the
  // truthful target list for the distribute picker (excludes personal
  // workspaces and the source scope itself). Same membership gate as distribute.
  fastify.get(
    "/database/scopes/:scopeRef/docs/distribute/targets",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const targets = await distributeTargets(req.personRef, req.params.scopeRef)
      return { targets }
    }
  )

  // Request deletion of a SHARED version, named by its uuid. Distinct from the
  // scope+path DELETE above, which tombstones the caller's OWN copy: here the
  // uuid pins the exact shared version, so the caller's personal copy of the
  // same path (a different uuid) is left untouched. requestDelete resolves the
  // scope from the uuid and enforces membership there; a score-0 scope commits
  // at once, otherwise it opens a deletion review.
  fastify.post(
    "/database/docs/:uuid/delete-request",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            description: { type: "string", maxLength: 2000 },
          },
          additionalProperties: false,
        },
      },
      preHandler: [fastify.requireLogin],
    },
    async (req) => {
      const { description } = req.body || {}
      return requestDelete({
        uuid: req.params.uuid,
        personRef: req.personRef,
        description: (description || "").trim() || undefined,
      })
    }
  )

  // Direct access by UUID — bypasses walk-up and status filter, but still
  // checks that the caller may read the scope the version lives in.
  fastify.get(
    "/database/docs/:uuid",
    { preHandler: [fastify.resolvePrincipal] },
    async (req) => {
      const { uuid } = req.params
      const res = await pool.query(
        `SELECT scope_id, doc_path, version, uuid, status, is_deletion,
                data, meta, author, created_at
           FROM versions WHERE uuid = $1`,
        [uuid]
      )
      if (res.rowCount === 0) throw new NotFoundError(`no version with uuid ${uuid}`)
      const row = res.rows[0]
      // Auth: can the caller read the scope this version belongs to?
      await requireRead(String(row.scope_id), req.personRef)
      const originPath = await resolveOriginPath(row.scope_id)
      return {
        ...rowToDoc(
          {
            uuid: row.uuid,
            data: row.data,
            meta: row.meta,
            doc_path: row.doc_path,
            version: row.version,
            status: row.status,
            author: row.author,
            created_at: row.created_at,
          },
          originPath
        ),
        scopeRef: String(row.scope_id),
      }
    }
  )
}

module.exports = routes
