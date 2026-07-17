// Review routes (README §9.4).
//
//   GET  /database/review/queue                       — aggregated review inbox
//   GET  /database/scopes/:scopeRef/pending           — pending versions here
//   POST /database/scopes/:scopeRef/pending/approve   — record an approve vote
//   POST /database/scopes/:scopeRef/pending/reject    — reject (ends the request)
//
// The scope-bound routes require the caller to be a reviewer of the scope;
// the queue spans exactly those scopes. The reviewer's current score is
// snapshotted onto the vote.

const { pool } = require("../persistence/pool")
const { getScope, reviewerScore } = require("../persistence/scopes")
const { listPending, reviewQueue, approve, reject } = require("../persistence/promote")
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
      const { scopeId, score } = await requireReviewer(req.params.scopeRef, req.personRef)
      return reject({
        scopeId,
        personRef: req.personRef,
        docPath: req.body.path,
        version: req.body.version,
        score,
        reason: req.body.reason,
      })
    }
  )
}

module.exports = routes
