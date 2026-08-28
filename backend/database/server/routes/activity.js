// Activity routes — the caller's account-scoped notification feed.
//
//   GET  /database/activity           — the caller's feed (newest first) + unread count
//   POST /database/activity/seen      — mark ids (or all) as read
//
// Everything is scoped to `req.personRef`; there is no cross-user access.

const { listActivity, unreadCount, markSeen } = require("../persistence/activity")

async function routes(fastify) {
  fastify.get(
    "/database/activity",
    { preHandler: [fastify.requireLogin] },
    async (req) => {
      const limit = req.query && req.query.limit
      const before = req.query && req.query.before
      const [items, unread] = await Promise.all([
        listActivity({ personRef: req.personRef, limit, before }),
        unreadCount({ personRef: req.personRef }),
      ])
      return { items, unread }
    }
  )

  fastify.post(
    "/database/activity/seen",
    {
      schema: {
        body: {
          type: "object",
          properties: { ids: { type: "array", items: { type: "string" } } },
          additionalProperties: false,
        },
      },
      preHandler: [fastify.requireLogin],
    },
    async (req) => {
      const ids = ((req.body && req.body.ids) || [])
        .map((x) => Number(x))
        .filter((n) => Number.isFinite(n))
      return markSeen({ personRef: req.personRef, ids })
    }
  )
}

module.exports = routes
