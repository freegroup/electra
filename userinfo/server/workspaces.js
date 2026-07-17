// Account-scoped Workspaces API — a thin, app-agnostic facade over the internal
// `database` scope endpoints. The browser reaches this through the ingress
// (/userinfo/workspaces/*) with its session identity; we forward that identity
// to `database` via pickAuthHeaders. No scope logic lives here — database owns
// the rules (membership, admin, name-uniqueness); this only proxies + shapes.

const db = require("./db")

function init(app) {
  // The drill-down roots: fixed entry points (app root + personal workspace),
  // decided server-side. Called when no scope is selected.
  app.get("/userinfo/workspaces/roots", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/scopes/roots`, { authHeaders: auth })
      res.json({ roots: j.roots || [] })
    } catch (err) {
      fail(res, err)
    }
  })

  // The scopes the caller is a member of (drill-down roots).
  app.get("/userinfo/workspaces/mine", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/scopes/mine`, { authHeaders: auth })
      res.json({ workspaces: j.scopes || [] })
    } catch (err) {
      fail(res, err)
    }
  })

  // Metadata of one workspace.
  app.get("/userinfo/workspaces/:ref", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/scopes/${encodeURIComponent(req.params.ref)}`, { authHeaders: auth })
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Direct sub-workspaces (member view).
  app.get("/userinfo/workspaces/:ref/children", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/scopes/${encodeURIComponent(req.params.ref)}/children`, { authHeaders: auth })
      res.json({ children: j.children || [] })
    } catch (err) {
      fail(res, err)
    }
  })

  // Member roster (admin only — database enforces).
  app.get("/userinfo/workspaces/:ref/members", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/scopes/${encodeURIComponent(req.params.ref)}/members`, { authHeaders: auth })
      res.json({ members: j.members || [] })
    } catch (err) {
      fail(res, err)
    }
  })

  // Update a workspace (admin only — database enforces): the DISPLAY LABEL
  // and/or the review threshold (requiredApprovalScore). The identity name is
  // immutable here.
  app.patch("/userinfo/workspaces/:ref", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { label, requiredApprovalScore } = req.body || {}
      const body = {}
      if (label !== undefined) body.label = label
      if (requiredApprovalScore !== undefined) body.requiredApprovalScore = requiredApprovalScore
      const j = await db.call(
        "PATCH",
        `/database/scopes/${encodeURIComponent(req.params.ref)}`,
        { authHeaders: auth, body }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Create a sub-workspace (any member may). The user supplies a display
  // `label`; database derives the identity name from it.
  app.post("/userinfo/workspaces/:ref/children", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { label } = req.body || {}
      const j = await db.call(
        "POST",
        `/database/scopes/${encodeURIComponent(req.params.ref)}/scopes`,
        { authHeaders: auth, body: { label } }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Add a member (admin only — database enforces).
  app.post("/userinfo/workspaces/:ref/members", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { personRef } = req.body || {}
      const j = await db.call(
        "POST",
        `/database/scopes/${encodeURIComponent(req.params.ref)}/members`,
        { authHeaders: auth, body: { personRef } }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })

  // Remove a member (admin only — database enforces).
  app.delete("/userinfo/workspaces/:ref/members/:personRef", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call(
        "DELETE",
        `/database/scopes/${encodeURIComponent(req.params.ref)}/members/${encodeURIComponent(req.params.personRef)}`,
        { authHeaders: auth }
      )
      res.json(j)
    } catch (err) {
      fail(res, err)
    }
  })
}

function fail(res, err) {
  const code = err && err.statusCode ? err.statusCode : 500
  console.log(`[userinfo/workspaces] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
