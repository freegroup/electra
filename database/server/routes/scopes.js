// Scope routes: discovery (README §9.7) + administration (README §9.8).
//
// Discovery:
//   GET  /database/scopes/mine                     — scopes the caller is a member of
//   GET  /database/scopes/by-path?name=school/x    — resolve a name → scopeRef
//   GET  /database/scopes/:scopeRef                — scope metadata
// Administration (admin-gated):
//   POST   /database/scopes/:scopeRef/scopes                  — create a sub-scope
//   DELETE /database/scopes/:scopeRef                         — remove this scope
//   POST   /database/scopes/:scopeRef/members                 — add member (+ self-enroll)
//   DELETE /database/scopes/:scopeRef/members/:personRef      — remove member
//   POST   /database/scopes/:scopeRef/admins                  — grant admin
//   DELETE /database/scopes/:scopeRef/admins/:personRef       — revoke admin
//   POST   /database/scopes/:scopeRef/reviewers               — add/update reviewer
//   DELETE /database/scopes/:scopeRef/reviewers/:personRef    — revoke reviewer
//   PATCH  /database/scopes/:scopeRef                         — set requiredApprovalScore

const { pool } = require("../persistence/pool")
const {
  pathOfScope,
  resolveScopeIdByPath,
  createScope,
  isAdmin,
  canRead,
  addMemberWithLeaf,
  removeMember,
  setAdmin,
  setReviewer,
  setRequiredApprovalScore,
  setPromoteCeiling,
  renameScope,
  setParentScope,
  myScopes,
  getScope,
} = require("../persistence/scopes")
const {
  ForbiddenError,
  BadRequestError,
  NotFoundError,
} = require("../utils/errors")
const { parseScopeRef } = require("./helpers")

const createChildBody = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", minLength: 1, pattern: "^[^/]+$" },
    requiredApprovalScore: { type: "integer", minimum: 0, default: 0 },
    promoteCeiling: { type: "boolean", default: false },
  },
  additionalProperties: false,
}

const personRefBody = {
  type: "object",
  required: ["personRef"],
  properties: { personRef: { type: "string", minLength: 1 } },
  additionalProperties: false,
}

const reviewerBody = {
  type: "object",
  required: ["personRef", "score"],
  properties: {
    personRef: { type: "string", minLength: 1 },
    score: { type: "integer", minimum: 0, maximum: 10 },
  },
  additionalProperties: false,
}

const configBody = {
  type: "object",
  minProperties: 1,
  properties: {
    requiredApprovalScore: { type: "integer", minimum: 0 },
    promoteCeiling: { type: "boolean" },
    name: { type: "string", minLength: 1, pattern: "^[^/]+$" },
    parentRef: { type: "string", pattern: "^\\d+$" },
  },
  additionalProperties: false,
}

async function routes(fastify) {
  async function requireAdmin(scopeId, personRef) {
    const client = await pool.connect()
    try {
      const scope = await getScope(client, scopeId)
      if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
      const ok = await isAdmin(client, scopeId, personRef)
      if (!ok) throw new ForbiddenError(`caller is not admin of scope id ${scopeId}`)
      return scope
    } finally {
      client.release()
    }
  }

  // ---- Discovery -----------------------------------------------------------

  fastify.get(
    "/database/scopes/mine",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const rows = await myScopes(req.personRef)
      const client = await pool.connect()
      try {
        const scopes = []
        for (const r of rows) {
          const roles = ["member"]
          if (r.is_admin) roles.push("admin")
          if (r.reviewer_score !== null) roles.push("reviewer")
          scopes.push({
            scopeRef: String(r.scope_id),
            name: await pathOfScope(client, r.scope_id),
            requiredApprovalScore: r.required_approval_score,
            promoteCeiling: r.promote_ceiling,
            roles,
          })
        }
        return { scopes }
      } finally {
        client.release()
      }
    }
  )

  fastify.get(
    "/database/scopes/by-path",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const name = (req.query && (req.query.name || req.query.path)) || null
      if (!name || typeof name !== "string") {
        throw new BadRequestError("query parameter `name` required")
      }
      const client = await pool.connect()
      let id
      try {
        id = await resolveScopeIdByPath(client, name)
      } finally {
        client.release()
      }
      if (id === null) throw new NotFoundError(`no scope at path ${name}`)
      return { scopeRef: String(id), name }
    }
  )

  fastify.get(
    "/database/scopes/:scopeRef",
    { preHandler: [fastify.resolvePrincipal] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      const client = await pool.connect()
      try {
        const scope = await getScope(client, scopeId)
        if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
        const ok = await canRead(client, scopeId, req.personRef)
        if (!ok) throw new ForbiddenError(`caller may not read scope id ${scopeId}`)
        return {
          scopeRef: String(scope.id),
          name: await pathOfScope(client, scope.id),
          parent: scope.parent_id === null ? null : String(scope.parent_id),
          requiredApprovalScore: scope.required_approval_score,
          promoteCeiling: scope.promote_ceiling,
        }
      } finally {
        client.release()
      }
    }
  )

  // ---- Administration ------------------------------------------------------

  fastify.post(
    "/database/scopes/:scopeRef/scopes",
    { schema: { body: createChildBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const parentId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(parentId, req.personRef)

      const { name, requiredApprovalScore = 0, promoteCeiling = false } = req.body
      if (name.includes("/")) {
        throw new BadRequestError('scope name must not contain "/"')
      }

      const scope = await createScope({
        parentId,
        name,
        requiredApprovalScore,
        promoteCeiling,
        createdBy: req.personRef,
      })

      const client = await pool.connect()
      let path
      try {
        path = await pathOfScope(client, scope.id)
      } finally {
        client.release()
      }

      reply.code(201)
      return {
        id: scope.id,
        scopeRef: String(scope.id),
        name: scope.name,
        path,
        requiredApprovalScore: scope.required_approval_score,
        promoteCeiling: scope.promote_ceiling,
        createdAt: scope.created_at,
        createdBy: scope.created_by,
      }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/members",
    { schema: { body: personRefBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      const { personRef } = req.body

      // Admin adds anyone; anyone may self-enroll (personRef == caller). The
      // latter lets services lazily create per-user leaves without granting
      // them admin on every bucket scope.
      if (personRef !== req.personRef) {
        await requireAdmin(scopeId, req.personRef)
      }

      const result = await addMemberWithLeaf({
        scopeId,
        personRef,
        createdBy: req.personRef,
      })
      reply.code(201)
      return { scopeRef: String(result.scopeId), leafId: String(result.leafId) }
    }
  )

  fastify.delete(
    "/database/scopes/:scopeRef/members/:personRef",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      await removeMember({ scopeId, personRef: req.params.personRef })
      return { removed: true }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/admins",
    { schema: { body: personRefBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      await setAdmin({ scopeId, personRef: req.body.personRef, isAdmin: true })
      return { granted: true }
    }
  )

  fastify.delete(
    "/database/scopes/:scopeRef/admins/:personRef",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      await setAdmin({ scopeId, personRef: req.params.personRef, isAdmin: false })
      return { revoked: true }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/reviewers",
    { schema: { body: reviewerBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      await setReviewer({ scopeId, personRef: req.body.personRef, score: req.body.score })
      return { reviewer: true, score: req.body.score }
    }
  )

  fastify.delete(
    "/database/scopes/:scopeRef/reviewers/:personRef",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      await setReviewer({ scopeId, personRef: req.params.personRef, score: null })
      return { revoked: true }
    }
  )

  fastify.patch(
    "/database/scopes/:scopeRef",
    { schema: { body: configBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      const out = {}
      if (req.body.requiredApprovalScore !== undefined) {
        await setRequiredApprovalScore({ scopeId, score: req.body.requiredApprovalScore })
        out.requiredApprovalScore = req.body.requiredApprovalScore
      }
      if (req.body.promoteCeiling !== undefined) {
        await setPromoteCeiling({ scopeId, value: req.body.promoteCeiling })
        out.promoteCeiling = req.body.promoteCeiling
      }
      if (req.body.name !== undefined) {
        const row = await renameScope({ scopeId, name: req.body.name })
        out.name = row.name
      }
      if (req.body.parentRef !== undefined) {
        // Reparenting places content into the new parent — require admin there
        // too (admin of the moved scope is already checked above).
        await requireAdmin(req.body.parentRef, req.personRef)
        const row = await setParentScope({ scopeId, newParentId: req.body.parentRef })
        out.parentRef = row.parentId
      }
      return out
    }
  )
}

module.exports = routes
