// Publish / unpublish / revert routes + anonymous public read + render tokens.
// See README §6.10 (revert), §6.13 (publish), §9.5.

const { revertDoc, resolveEffective } = require("../persistence/docs")
const { publish, unpublish, getByPublicId } = require("../persistence/publish")
const { docAt } = require("../persistence/admin")
const rendertoken = require("../persistence/rendertoken")
const { NotFoundError } = require("../utils/errors")
const { resolveOriginPath, requireWriteLeaf, requireRead } = require("./helpers")

const pathOnlyBody = {
  type: "object",
  required: ["path"],
  properties: {
    path: { type: "string", minLength: 1 },
  },
  additionalProperties: false,
}

// publish/unpublish accept an optional explicit version (default: active).
const pubBody = {
  type: "object",
  required: ["path"],
  properties: {
    path: { type: "string", minLength: 1 },
    version: { type: "integer", minimum: 1 },
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
    { schema: { body: pubBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const result = await publish({ callerLeafId: leafId, docPath: req.body.path, version: req.body.version })
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
    { schema: { body: pubBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { leafId } = await requireWriteLeaf(req.params.scopeRef, req.personRef)
      const result = await unpublish({ callerLeafId: leafId, docPath: req.body.path, version: req.body.version })
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

  // Mint a short-lived render token for a doc the caller can read. Used by the
  // preview/PDF renderer (puppeteer) to load a single version login-free,
  // WITHOUT publishing it. Only a reader of the scope may mint (requireRead).
  // The token points at the CONCRETE version the caller sees (walk-up resolved),
  // so the anonymous render read finds it on the exact leaf/scope it lives in.
  fastify.post(
    "/database/scopes/:scopeRef/docs/render-token",
    { schema: { body: pubBody }, preHandler: [fastify.resolvePrincipal] },
    async (req) => {
      const scopeId = await requireRead(req.params.scopeRef, req.personRef)
      const eff = await resolveEffective({
        operatingScopeId: scopeId,
        personRef: req.personRef,
        docPath: req.body.path,
      })
      if (!eff) throw new NotFoundError(`no document at ${req.body.path} visible from this scope`)
      const token = rendertoken.sign({ scopeId: eff.scopeId, docPath: req.body.path, version: eff.version })
      return { token }
    }
  )

  // Anonymous render read — resolves a signed render token to exactly one
  // version. Login-free (the token is the capability), short-lived, private
  // (never lists, never exposed beyond the token holder). The token is passed
  // as a query param (it's too long for a URL path segment).
  fastify.get("/database/render", async (req) => {
    const { scopeId, docPath, version } = rendertoken.verify((req.query || {}).token)
    const doc = await docAt(scopeId, docPath, version)
    if (!doc || doc.isDeletion) throw new NotFoundError("no such document version")
    const originPath = await resolveOriginPath(scopeId)
    return {
      data: doc.data,
      meta: doc.meta,
      scope: originPath,
      path: doc.path,
      version: doc.version,
      status: doc.status,
      author: doc.author,
      createdAt: doc.createdAt,
    }
  })
}

module.exports = routes
