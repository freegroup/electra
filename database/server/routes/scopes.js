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
  isMember,
  canRead,
  addMember,
  removeMember,
  setAdmin,
  setReviewer,
  setRequiredApprovalScore,
  setPromoteCeiling,
  setBootstrap,
  setAnonymous,
  enrollBootstrap,
  renameScope,
  setParentScope,
  myScopes,
  getScope,
  listChildren,
  listMembers,
  childNameAvailable,
  rootWorkspaces,
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
    bootstrap: { type: "boolean", default: false },
    anonymous: { type: "boolean", default: false },
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
    bootstrap: { type: "boolean" },
    anonymous: { type: "boolean" },
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

  async function requireMember(scopeId, personRef) {
    const client = await pool.connect()
    try {
      const scope = await getScope(client, scopeId)
      if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
      const ok = await isMember(client, scopeId, personRef)
      if (!ok) throw new ForbiddenError(`caller is not a member of scope id ${scopeId}`)
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
            bootstrap: r.is_bootstrap,
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
    // Soft auth: anonymous callers may resolve a name → id too (needed so an
    // app backend can find its public/app-root scope without a session). This
    // only maps a path to an id; reading the scope still goes through canRead.
    { preHandler: [fastify.resolvePrincipal] },
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
          bootstrap: scope.is_bootstrap,
          anonymous: scope.is_anonymous,
        }
      } finally {
        client.release()
      }
    }
  )

  // The Workspaces drill-down ROOTS — the fixed entry points (shared app root +
  // the caller's personal workspace), decided server-side. The UI calls this
  // when no scope is selected.
  fastify.get(
    "/database/scopes/roots",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const roots = await rootWorkspaces(req.personRef)
      return { roots }
    }
  )

  // Direct sub-workspaces of a scope — the Workspaces drill-down. A member of
  // the scope sees ALL its direct children (name/existence), each annotated with
  // the caller's own role there. Non-members are refused.
  fastify.get(
    "/database/scopes/:scopeRef/children",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireMember(scopeId, req.personRef)
      const children = await listChildren({ parentId: scopeId, personRef: req.personRef })
      return { children }
    }
  )

  // Is a sub-workspace name free under this scope? Powers the UI's live hint
  // while typing a new name. Members of the parent only.
  fastify.get(
    "/database/scopes/:scopeRef/children/available",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireMember(scopeId, req.personRef)
      const name = String((req.query || {}).name || "")
      if (!name || name.includes("/")) {
        return { available: false, reason: "invalid" }
      }
      const available = await childNameAvailable({ parentId: scopeId, name })
      return { available }
    }
  )

  // The member roster of a workspace — admins only.
  fastify.get(
    "/database/scopes/:scopeRef/members",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      const members = await listMembers({ scopeId })
      return { members }
    }
  )

  // ---- Administration ------------------------------------------------------

  // Called by the ingress after a successful login (and safely on every app
  // start). Enrolls the caller as an explicit member of every bootstrap scope,
  // provisioning their personal leaf in each. Idempotent.
  fastify.post(
    "/database/on_login",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopes = await enrollBootstrap(req.personRef)
      return { scopes }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/scopes",
    { schema: { body: createChildBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const parentId = parseScopeRef(req.params.scopeRef)
      // Any MEMBER of the parent may create a sub-workspace (createScope makes
      // the creator its admin+member, and enforces the unique name). This is the
      // "any member may create" rule — not admin-only.
      await requireMember(parentId, req.personRef)

      const { name, requiredApprovalScore = 0, promoteCeiling = false, bootstrap = false, anonymous = false } = req.body
      if (name.includes("/")) {
        throw new BadRequestError('scope name must not contain "/"')
      }

      const scope = await createScope({
        parentId,
        name,
        requiredApprovalScore,
        promoteCeiling,
        isBootstrap: bootstrap,
        isAnonymous: anonymous,
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
        bootstrap: scope.is_bootstrap,
        anonymous: scope.is_anonymous,
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

      // Admin adds anyone; anyone may self-enroll (personRef == caller).
      if (personRef !== req.personRef) {
        await requireAdmin(scopeId, req.personRef)
      }

      // Membership only — the personal leaf is provisioned lazily on first write.
      const result = await addMember({ scopeId, personRef })
      reply.code(201)
      return { scopeRef: String(result.scopeId) }
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
      if (req.body.bootstrap !== undefined) {
        await setBootstrap({ scopeId, value: req.body.bootstrap })
        out.bootstrap = req.body.bootstrap
      }
      if (req.body.anonymous !== undefined) {
        await setAnonymous({ scopeId, value: req.body.anonymous })
        out.anonymous = req.body.anonymous
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
