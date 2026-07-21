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
  stripPrefix,
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
  relabelScope,
  setScopeDescription,
  setParentScope,
  deleteScope,
  myScopes,
  getScope,
  listChildren,
  listMembers,
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
  // The user supplies a display `label`; the identity `name` is derived from it
  // (sanitized) server-side. `name` may still be passed directly for internal/
  // power use. At least one is required.
  anyOf: [{ required: ["label"] }, { required: ["name"] }],
  properties: {
    label: { type: "string", minLength: 1 },
    name: { type: "string", minLength: 1, pattern: "^[^/]+$" },
    description: { type: "string" },
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
    // `label` is the everyday display-name change (safe for any scope). `name`
    // is the identity rename — a god-view power tool (blocked for leaves).
    label: { type: "string", minLength: 1 },
    name: { type: "string", minLength: 1, pattern: "^[^/]+$" },
    // `description` is the optional workgroup blurb; "" clears it.
    description: { type: "string" },
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
            name: r.name,
            label: r.label,
            path: stripPrefix(await pathOfScope(client, r.scope_id)),
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
          name: scope.name,
          label: scope.label,
          description: scope.description,
          path: stripPrefix(await pathOfScope(client, scope.id)),
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
  // when no scope is selected. Anonymous callers get the public (is_anonymous)
  // scopes as their entry points; rootWorkspaces decides by personRef.
  fastify.get(
    "/database/scopes/roots",
    { preHandler: [fastify.resolvePrincipal] },
    async (req) => {
      const roots = await rootWorkspaces(req.personRef)
      return { roots }
    }
  )

  // Direct sub-workspaces of a scope — the Workspaces drill-down. A member of
  // the scope sees ALL its direct children (name/existence), each annotated with
  // the caller's own role there. An anonymous caller may drill into a public
  // (is_anonymous) scope and sees only its public children — listChildren
  // filters by personRef so private child names never leak.
  fastify.get(
    "/database/scopes/:scopeRef/children",
    { preHandler: [fastify.resolvePrincipal] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      if (req.personRef) {
        await requireMember(scopeId, req.personRef)
      } else {
        const client = await pool.connect()
        try {
          const scope = await getScope(client, scopeId)
          if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
          if (!(await canRead(client, scopeId, null))) {
            throw new ForbiddenError(`caller may not read scope id ${scopeId}`)
          }
        } finally {
          client.release()
        }
      }
      const children = await listChildren({ parentId: scopeId, personRef: req.personRef })
      return { children }
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

      const { label, name, description, requiredApprovalScore = 0, promoteCeiling = false, bootstrap = false, anonymous = false } = req.body

      // Prefer the user-supplied display label (name is derived from it). Reject
      // an empty / whitespace-only label outright — a blank display name is not
      // allowed. `name` (identity) may still be passed directly for power use.
      let cleanLabel
      if (label !== undefined) {
        cleanLabel = String(label).trim()
        if (cleanLabel === "") {
          throw new BadRequestError("label must not be empty")
        }
      }
      if (cleanLabel === undefined && (name == null || name.includes("/"))) {
        throw new BadRequestError('scope name must be provided and must not contain "/"')
      }

      const scope = await createScope({
        parentId,
        label: cleanLabel,
        name,
        description,
        requiredApprovalScore,
        promoteCeiling,
        isBootstrap: bootstrap,
        isAnonymous: anonymous,
        createdBy: req.personRef,
      })

      const client = await pool.connect()
      let path
      try {
        path = stripPrefix(await pathOfScope(client, scope.id))
      } finally {
        client.release()
      }

      reply.code(201)
      return {
        id: scope.id,
        scopeRef: String(scope.id),
        name: scope.name,
        label: scope.label,
        description: scope.description,
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

  // Delete an (empty) scope. Admin-gated; refuses if the scope still has
  // sub-scopes/leaves or document versions (structural delete, not a recursive
  // purge). Used by the admin explorer and the Workspaces UI.
  fastify.delete(
    "/database/scopes/:scopeRef",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      await requireAdmin(scopeId, req.personRef)
      return await deleteScope({ scopeId })
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/members",
    { schema: { body: personRefBody }, preHandler: [fastify.requireLogin] },
    async (req, reply) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      const { personRef } = req.body

      // Adding a member is an admin-only action — no self-enroll. A user reaches
      // their scopes two ways, both handled elsewhere: bootstrap auto-enrollment
      // on login (on_login → enrollBootstrap, limited to is_bootstrap scopes),
      // and creating a sub-scope (createScope makes the creator admin+member).
      // Joining any other existing scope always requires one of its admins to
      // add you. Guarding self-add too closes the hole where anyone could grant
      // themselves membership — hence full read/write — of any scope by id.
      await requireAdmin(scopeId, req.personRef)

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
      if (req.body.label !== undefined) {
        // Trim then reject an empty display label (a blank name is not allowed).
        const label = String(req.body.label).trim()
        if (label === "") throw new BadRequestError("label must not be empty")
        const row = await relabelScope({ scopeId, label })
        out.label = row.label
      }
      if (req.body.description !== undefined) {
        // Unlike the label, the description may be cleared ("" -> null).
        const row = await setScopeDescription({ scopeId, description: req.body.description })
        out.description = row.description
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
