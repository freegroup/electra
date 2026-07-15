// Generic, app-agnostic Finder API for sheets.
//
// This is the "intelligent layer": it knows the app-root scope and the user,
// talks to the database scope model via db.js, and returns a UNIFORM shape the
// Finder renders without knowing it shows sheets. Every document is named to
// the frontend by an opaque handle (id); human-readable path/providedBy/version
// ride along for display only.
//
// Uniform item: { id, name, path, providedBy, version, editable, published, thumbnailUrl }

const db = require("./db")

// Build the uniform display item from a database doc/glob row.
//   scopeRef     — the operating scope (where a save lands); goes into the handle
//   docPath      — the document path; goes into the handle + shown as name/path
//   providedBy   — origin scope human path (the "Provided by" column)
//   version      — effective version
//   instanceType — "personal" | "personalCopy" | "inherit" (see globDocs)
function toItem({ scopeRef, docPath, providedBy, version, editable = true, published = false, instanceType = "inherit" }) {
  const id = db.encodeId(scopeRef, docPath)
  // For personal / personal-copy docs the provider path ends in the caller's
  // own leaf (named after their hash — an ugly, meaningless segment). Show the
  // owning group instead by dropping that last segment.
  const ownLeaf = instanceType === "personal" || instanceType === "personalCopy"
  let displayProvider = providedBy || null
  if (ownLeaf && displayProvider) {
    const slash = displayProvider.lastIndexOf("/")
    if (slash !== -1) displayProvider = displayProvider.slice(0, slash)
  }
  return {
    id,
    name: docPath.split("/").pop(),
    path: docPath,
    providedBy: displayProvider,
    version: version ?? null,
    editable,
    published,
    instanceType,
    // `v` is a cache-buster: it changes when the document (and its embedded
    // preview) changes, so the browser's <img> cache re-fetches the new image
    // instead of reusing the identical-URL copy from memory.
    thumbnailUrl: `../sheets/thumb?id=${encodeURIComponent(id)}${version != null ? `&v=${version}` : ""}`,
  }
}

function init(app) {
  // --- the finder: all docs under the app root, uniform shape --------------
  app.get("/sheets/files", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const rootId = await db.appRootId(auth)
      const prefix = req.query.prefix ? `&prefix=${encodeURIComponent(req.query.prefix)}` : ""
      const j = await db.call("GET", `/database/scopes/${rootId}/docs?glob=true${prefix}`, { authHeaders: auth })
      const items = (j.docs || []).map((d) =>
        toItem({
          scopeRef: d.operatingScopeRef,
          docPath: d.path,
          providedBy: d.provider,
          version: d.providerVersion,
          instanceType: d.instanceType,
        })
      )
      res.json({ items })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- open one document (optionally a specific version) -------------------
  app.get("/sheets/file", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId(req.query.id)
      const v = req.query.version ? `&version=${encodeURIComponent(req.query.version)}` : ""
      const doc = await db.call(
        "GET",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}${v}`,
        { authHeaders: auth }
      )
      const item = toItem({
        scopeRef,
        docPath: path,
        providedBy: doc.scope,
        version: doc.version,
      })
      // The preview image lives inside the document (content.image) so it stays
      // an atomic unit with the doc — but it's large and the editor doesn't need
      // it on open. Strip it here; it's served separately via /sheets/thumb.
      res.json({ ...item, content: withoutPreview(doc.data) })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- save (create when no id) --------------------------------------------
  // Body: { id?, name?, content }. No id → new document in the user's group
  // under the app root (the backend picks the scope; here that's the app root
  // itself, where bootstrap membership provisions the caller's leaf).
  // With an id, the scope is taken from the handle; a supplied name overrides
  // the document name (save-as within the same scope), preserving any directory
  // prefix from the original path.
  app.post("/sheets/file", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, name, content } = req.body || {}
      let scopeRef, path
      if (id) {
        const decoded = db.decodeId(id)
        scopeRef = decoded.scopeRef
        if (name) {
          const slash = decoded.path.lastIndexOf("/")
          const dir = slash === -1 ? "" : decoded.path.slice(0, slash + 1)
          path = dir + sanitizeName(name)
        } else {
          path = decoded.path
        }
      } else {
        scopeRef = await db.appRootId(auth)
        path = sanitizeName(name) // e.g. "MyCircuit.brain"
      }
      const stored = await db.call(
        "PUT",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`,
        { authHeaders: auth, body: { data: content } }
      )
      res.json({ id: db.encodeId(scopeRef, path), version: stored.version, path })
      // Refresh the preview thumbnail (best-effort, after responding).
      generatePreview({ auth, scopeRef, path }).catch((e) =>
        console.log(`[sheets] preview generation failed: ${e && e.message}`))
    } catch (err) {
      fail(res, err)
    }
  })

  // --- rename within the caller's leaf -------------------------------------
  app.post("/sheets/file/rename", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, name } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      // keep any directory prefix; only the leaf name changes
      const slash = path.lastIndexOf("/")
      const dir = slash === -1 ? "" : path.slice(0, slash + 1)
      const newPath = dir + sanitizeName(name)
      const r = await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/rename`,
        { authHeaders: auth, body: { path, newPath } }
      )
      res.json({ id: db.encodeId(scopeRef, r.path || newPath) })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- delete (local tombstone) --------------------------------------------
  app.delete("/sheets/file", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId(req.query.id)
      await db.call(
        "DELETE",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`,
        { authHeaders: auth, body: {} }
      )
      res.json({ ok: true })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- version history ------------------------------------------------------
  app.get("/sheets/file/versions", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId(req.query.id)
      const j = await db.call(
        "GET",
        `/database/scopes/${scopeRef}/docs/history?path=${encodeURIComponent(path)}`,
        { authHeaders: auth }
      )
      const history = (j.history || []).slice().sort((a, b) => b.version - a.version)
      const newest = history.length ? history[0].version : null
      const versions = history.map((h) => ({
        version: h.version,
        status: h.status,
        createdAt: h.createdAt,
        editable: h.version === newest,
      }))
      res.json({ versions })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- revert (discard personal copy) --------------------------------------
  // Drops all versions in the caller's own leaf for this path, so the shared /
  // official version becomes visible again. Not reversible.
  app.post("/sheets/file/revert", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId((req.body || {}).id)
      await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/revert`,
        { authHeaders: auth, body: { path } }
      )
      res.json({ ok: true })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- promote (vertical) ---------------------------------------------------
  app.post("/sheets/file/promote", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId((req.body || {}).id)
      const r = await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/promote?path=${encodeURIComponent(path)}`,
        { authHeaders: auth, body: {} }
      )
      res.json({ status: r.status })
      // The promoted (shared) version needs its own preview. Best-effort.
      generatePreview({ auth, scopeRef, path }).catch((e) =>
        console.log(`[sheets] preview generation failed: ${e && e.message}`))
    } catch (err) {
      fail(res, err)
    }
  })

  // --- distribute (horizontal) ---------------------------------------------
  // Body: { id, targets: [groupId…] } — groupId is a plain scopeRef from /groups.
  app.post("/sheets/file/distribute", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, targets } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      const r = await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/distribute`,
        { authHeaders: auth, body: { path, targetScopeRefs: targets || [] } }
      )
      res.json({ results: r.distributions || [] })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- publish / unpublish --------------------------------------------------
  // On publish we also render a preview screenshot (puppeteer) of the now-public
  // page and attach it as a "preview" blob on the published version. Author docs
  // have no client-side preview, so this is the only moment a public URL exists
  // to render — matching the legacy "screenshot on global save" behaviour.
  app.post("/sheets/file/publish", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, version } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      const body = version != null ? { path, version } : { path }
      const r = await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/publish`,
        { authHeaders: auth, body }
      )
      // Best-effort preview refresh (also covered by save; harmless here).
      generatePreview({ auth, scopeRef, path }).catch((e) =>
        console.log(`[sheets] preview generation failed: ${e && e.message}`))
      res.json({ url: `../database/public/${r.publicId}`, publicId: r.publicId, version: r.version })
    } catch (err) {
      fail(res, err)
    }
  })

  app.post("/sheets/file/unpublish", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, version } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      const body = version != null ? { path, version } : { path }
      await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/unpublish`,
        { authHeaders: auth, body }
      )
      res.json({ ok: true })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- groups (for the distribute picker) ----------------------------------
  app.get("/sheets/groups", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const j = await db.call("GET", `/database/scopes/mine`, { authHeaders: auth })
      const groups = (j.scopes || []).map((s) => ({ id: s.scopeRef, name: s.name }))
      res.json({ groups })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- review queue ---------------------------------------------------------
  app.get("/sheets/reviews", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const group = req.query.group
      if (!group) return res.json({ items: [] })
      const j = await db.call("GET", `/database/scopes/${group}/pending`, { authHeaders: auth })
      const items = (j.pending || []).map((p) => ({
        ...toItem({ scopeRef: group, docPath: p.path, version: p.version }),
        approvalScore: p.approvalScore,
        requiredApprovalScore: p.requiredApprovalScore,
      }))
      res.json({ items })
    } catch (err) {
      fail(res, err)
    }
  })

  app.post("/sheets/reviews/approve", (req, res) => reviewVote(req, res, "approve"))
  app.post("/sheets/reviews/reject", (req, res) => reviewVote(req, res, "reject"))

  async function reviewVote(req, res, decision) {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, version, reason } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      await db.call(
        "POST",
        `/database/scopes/${scopeRef}/pending/${decision}`,
        { authHeaders: auth, body: { path, version, reason } }
      )
      res.json({ ok: true })
    } catch (err) {
      fail(res, err)
    }
  }

  // --- preview thumbnail ----------------------------------------------------
  // Author docs have no client-side preview; the preview is a puppeteer
  // screenshot rendered at publish time and stored as a "preview" blob on the
  // version (walk-up resolved by the DB). Stream it here.
  app.get("/sheets/thumb", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId(req.query.id)
      const dbRes = await db.raw(
        "GET",
        `/database/scopes/${scopeRef}/blobs/preview?path=${encodeURIComponent(path)}`,
        { authHeaders: auth }
      )
      const ct = dbRes.headers.get("content-type")
      if (ct) res.set("content-type", ct)
      res.set("cache-control", "no-cache, no-store, must-revalidate")
      res.send(Buffer.from(await dbRes.arrayBuffer()))
    } catch (err) {
      // a missing preview is not an error worth logging loudly
      res.status(err.statusCode || 404).end()
    }
  })
}

// Render the page with puppeteer and store the PNG as a "preview" blob on the
// caller's version. Uses a short-lived render token (no publish needed): the
// headless browser loads the doc login-free via ?rtoken=. Best-effort.
async function generatePreview({ auth, scopeRef, path }) {
  const die = require("./utils/die")
  const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS")
  const os = require("os")
  const fs = require("fs")
  const nodePath = require("path")
  const { render } = require("./converter/screenshot")

  // Mint a render token for this exact doc (walk-up resolved server-side).
  const { token } = await db.call(
    "POST",
    `/database/scopes/${scopeRef}/docs/render-token`,
    { authHeaders: auth, body: { path } }
  )
  const url = `http://localhost:${PORT_INGRESS}/author/page.html?rtoken=${encodeURIComponent(token)}&mode=worksheet`
  const tmp = nodePath.join(os.tmpdir(), `sheet-preview-${Date.now()}.png`)
  await render(url, tmp)
  try {
    const png = fs.readFileSync(tmp)
    await db.raw(
      "PUT",
      `/database/scopes/${scopeRef}/blobs/preview?path=${encodeURIComponent(path)}`,
      { authHeaders: auth, rawBody: png, contentType: "image/png" }
    )
  } finally {
    try { fs.unlinkSync(tmp) } catch { /* ignore */ }
  }
}

// Returns a shallow copy of a document's data with the (large) preview image
// removed. The image stays stored in the doc; it's just not shipped by default.
function withoutPreview(data) {
  if (!data || typeof data !== "object") return data
  if (data.image === undefined) return data
  const { image, ...rest } = data
  return rest
}

// Strip unsafe chars; keep the app suffix untouched if already present.
function sanitizeName(name) {
  let n = String(name || "untitled").trim()
  n = n.replace(/[/\\\x00-\x1f]/g, "").replace(/\.\.+/g, ".")
  return n || "untitled"
}

function fail(res, err) {
  const code = err && err.statusCode ? err.statusCode : 500
  console.log(`[sheets/files] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
