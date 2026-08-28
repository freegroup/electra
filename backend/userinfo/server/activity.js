// Activity API — browser-facing facade over the internal `database` activity
// endpoints (same pattern as review.js: proxy + shape, no logic here). Powers
// the account-scoped, cross-app Activity feed + unread badge.

const db = require("./db")

function init(app) {
  // The caller's activity feed (newest first) + unread count.
  app.get("/userinfo/activity", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const qs = []
      if (req.query.limit) qs.push(`limit=${encodeURIComponent(req.query.limit)}`)
      if (req.query.before) qs.push(`before=${encodeURIComponent(req.query.before)}`)
      const suffix = qs.length ? `?${qs.join("&")}` : ""
      const j = await db.call("GET", `/database/activity${suffix}`, { authHeaders: auth })
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Mark ids (or all, when empty) as read.
  app.post("/userinfo/activity/seen", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const ids = (req.body && req.body.ids) || []
      const j = await db.call("POST", `/database/activity/seen`, { authHeaders: auth, body: { ids } })
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })
}

function fail(res, err) {
  const code = err && err.statusCode ? err.statusCode : 500
  console.log(`[userinfo/activity] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
