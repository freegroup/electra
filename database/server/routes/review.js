// Review routes (README §9.4).
//
//   GET  /database/review/queue                       — aggregated review inbox
//   GET  /database/scopes/:scopeRef/pending           — pending versions here
//   POST /database/scopes/:scopeRef/pending/approve   — record an approve vote
//   POST /database/scopes/:scopeRef/pending/reject    — reject (ends the request)
//   POST /database/scopes/:scopeRef/pending/accept    — admin force-commit
//
// The approve/reject routes require the caller to be a reviewer of the scope;
// accept requires admin of the scope (overrides the threshold);
// the queue spans exactly those scopes. The reviewer's current score is
// snapshotted onto the vote.

const { pool } = require("../persistence/pool")
const { getScope, reviewerScore, isAdmin } = require("../persistence/scopes")
const { listPending, reviewQueue, myPendingPromotions, approve, reject, withdraw, accept } = require("../persistence/promote")
const {
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors")
const { parseScopeRef } = require("./helpers")

const decideBody = {
  type: "object",
  required: ["path", "version"],
  properties: {
    path: { type: "string", minLength: 1 },
    version: { type: "integer", minimum: 1 },
    reason: { type: "string" },
  },
  additionalProperties: false,
}

async function routes(fastify) {
  // Resolves the caller's reviewer score for a scope, or throws 403.
  async function requireReviewer(rawScopeRef, personRef) {
    const scopeId = parseScopeRef(rawScopeRef)
    const client = await pool.connect()
    try {
      const scope = await getScope(client, scopeId)
      if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
      const score = await reviewerScore(client, scopeId, personRef)
      if (score === null) {
        throw new ForbiddenError(`caller is not a reviewer of scope id ${scopeId}`)
      }
      return { scopeId, score }
    } finally {
      client.release()
    }
  }

  // Reject may come from a reviewer OR an admin (an admin can reject a request
  // outright, even without reviewer points and even after voting). Returns the
  // caller's reviewer score (may be null) and whether they are an admin.
  async function requireReviewerOrAdmin(rawScopeRef, personRef) {
    const scopeId = parseScopeRef(rawScopeRef)
    const client = await pool.connect()
    try {
      const scope = await getScope(client, scopeId)
      if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
      const score = await reviewerScore(client, scopeId, personRef)
      const admin = await isAdmin(client, scopeId, personRef)
      if (score === null && !admin) {
        throw new ForbiddenError(`caller is not a reviewer or admin of scope id ${scopeId}`)
      }
      return { scopeId, score, admin }
    } finally {
      client.release()
    }
  }

  // Force-commit is admin-only: verify the caller is an admin of the scope.
  async function requireAdmin(rawScopeRef, personRef) {
    const scopeId = parseScopeRef(rawScopeRef)
    const client = await pool.connect()
    try {
      const scope = await getScope(client, scopeId)
      if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
      const ok = await isAdmin(client, scopeId, personRef)
      if (!ok) throw new ForbiddenError(`caller is not an admin of scope id ${scopeId}`)
      return { scopeId }
    } finally {
      client.release()
    }
  }

  // The caller's review inbox: every pending version in every scope where
  // they hold a reviewer score. Membership alone is not enough — a non-
  // reviewer simply gets an empty queue.
  fastify.get(
    "/database/review/queue",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const queue = await reviewQueue({ personRef: req.personRef })
      return { queue }
    }
  )

  // The author's side: the caller's own still-open promotions with their
  // score progress — powers the "in review" column of the Draft pane.
  fastify.get(
    "/database/review/mine",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const mine = await myPendingPromotions({ personRef: req.personRef })
      return { mine }
    }
  )

  fastify.get(
    "/database/scopes/:scopeRef/pending",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const { scopeId } = await requireReviewer(req.params.scopeRef, req.personRef)
      const pending = await listPending({ scopeId })
      return { pending }
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/pending/approve",
    { schema: { body: decideBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { scopeId, score } = await requireReviewer(req.params.scopeRef, req.personRef)
      return approve({
        scopeId,
        personRef: req.personRef,
        docPath: req.body.path,
        version: req.body.version,
        score,
      })
    }
  )

  fastify.post(
    "/database/scopes/:scopeRef/pending/reject",
    { schema: { body: decideBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { scopeId, score, admin } = await requireReviewerOrAdmin(req.params.scopeRef, req.personRef)
      return reject({
        scopeId,
        personRef: req.personRef,
        docPath: req.body.path,
        version: req.body.version,
        score: score || 0,
        reason: req.body.reason,
        isAdmin: admin,
      })
    }
  )

  // Withdraw: the author cancels their own pending request. Author-only; the
  // persistence enforces author === caller. No reviewer/admin role needed.
  fastify.post(
    "/database/scopes/:scopeRef/pending/withdraw",
    { schema: { body: decideBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const scopeId = parseScopeRef(req.params.scopeRef)
      return withdraw({
        scopeId,
        personRef: req.personRef,
        docPath: req.body.path,
        version: req.body.version,
      })
    }
  )

  // Admin force-commit: overrides the reviewer-point threshold. Admin of the
  // scope only (not just a reviewer).
  fastify.post(
    "/database/scopes/:scopeRef/pending/accept",
    { schema: { body: decideBody }, preHandler: [fastify.requireLogin] },
    async (req) => {
      const { scopeId } = await requireAdmin(req.params.scopeRef, req.personRef)
      return accept({
        scopeId,
        personRef: req.personRef,
        docPath: req.body.path,
        version: req.body.version,
      })
    }
  )
}

module.exports = routes
