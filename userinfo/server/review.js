// Review API — browser-facing facade over the internal `database` review
// endpoints (same pattern as workspaces.js: proxy + shape, no logic here).
// Powers the ReviewScreen (aggregated queue, approve/reject) and the editors'
// review mode (load a pending version read-only).

const db = require("./db")

function init(app) {
  // The caller's aggregated review inbox: every pending version in every
  // scope where they hold a reviewer score.
  app.get("/userinfo/review/queue", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/review/queue`, { authHeaders: auth })
      res.json({ queue: j.queue || [] })
    } catch (err) {
      fail(res, err)
    }
  })

  // The author's own still-open promotions with their score progress —
  // powers the "in review" column of the Draft pane.
  app.get("/userinfo/review/mine", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/review/mine`, { authHeaders: auth })
      res.json({ mine: j.mine || [] })
    } catch (err) {
      fail(res, err)
    }
  })

  // UUID-based doc fetch — direct access bypassing walk-up (works for pending).
  app.get("/userinfo/review/doc", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call(
        "GET",
        `/database/docs/${encodeURIComponent(req.query.uuid || "")}`,
        { authHeaders: auth }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // A concrete pending version with full content (version-pinned read) so an
  // editor can display what is up for review. Reviewer/member — database
  // enforces the read gate.
  app.get("/userinfo/review/:ref/doc", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { path, version } = req.query || {}
      const q = `path=${encodeURIComponent(path || "")}&version=${encodeURIComponent(version || "")}`
      const j = await db.call(
        "GET",
        `/database/scopes/${encodeURIComponent(req.params.ref)}/docs?${q}`,
        { authHeaders: auth }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Approve: the caller's reviewer score is resolved and snapshotted by the
  // database service; the client only names the pending version.
  app.post("/userinfo/review/:ref/approve", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { path, version } = req.body || {}
      const j = await db.call(
        "POST",
        `/database/scopes/${encodeURIComponent(req.params.ref)}/pending/approve`,
        { authHeaders: auth, body: { path, version } }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Admin force-commit: overrides the reviewer-point threshold (database
  // enforces admin of the scope).
  app.post("/userinfo/review/:ref/accept", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { path, version } = req.body || {}
      const j = await db.call(
        "POST",
        `/database/scopes/${encodeURIComponent(req.params.ref)}/pending/accept`,
        { authHeaders: auth, body: { path, version } }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Reject ends the review request (a single reject suffices).
  app.post("/userinfo/review/:ref/reject", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { path, version, reason } = req.body || {}
      const body = reason ? { path, version, reason } : { path, version }
      const j = await db.call(
        "POST",
        `/database/scopes/${encodeURIComponent(req.params.ref)}/pending/reject`,
        { authHeaders: auth, body }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })
}

function fail(res, err) {
  const code = err && err.statusCode ? err.statusCode : 500
  console.log(`[userinfo/review] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
