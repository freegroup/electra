// Generic, app-agnostic Finder API for brains.
//
// This is the "intelligent layer": it knows the app-root scope and the user,
// talks to the database scope model via db.js, and returns a UNIFORM shape the
// Finder renders without knowing it shows circuits. Every document is named to
// the frontend by an opaque handle (id); human-readable path/providedBy/version
// ride along for display only.
//
// Uniform item: { id, name, path, providedBy, version, editable, published,
//                 instanceType, original, thumbnailUrl }

const db = require("./db")
const conf = require("./configuration")

// This app backend owns exactly one document type, identified by file suffix
// (.brain). All app backends share ONE content scope, so the suffix — not the
// scope — is what separates the types. We enforce it on BOTH sides:
//   read  — the finder lists only matching docs; opening a foreign type 404s
//   write — save/rename force the suffix so nothing else can land here
const SUFFIX = conf.fileSuffix // e.g. ".brain"

function hasSuffix(docPath) {
  return !SUFFIX || (typeof docPath === "string" && docPath.endsWith(SUFFIX))
}

// Force the app's suffix onto a document name (used on save/rename). Idempotent.
function withSuffix(name) {
  const n = sanitizeName(name)
  if (!SUFFIX || n.endsWith(SUFFIX)) return n
  return n + SUFFIX
}

// Build the uniform display item from a database doc/glob row.
//   scopeRef     — the operating scope (where a save lands); goes into the handle
//   docPath      — the document path; goes into the handle + shown as name/path
//   providedBy   — origin scope human path (the "Provided by" column)
//   version      — effective version
//   instanceType — "personal" | "personalCopy" | "inherit" (see globDocs)
function toItem({ scopeRef, docPath, providedBy, version, editable = true, published = false, instanceType = "inherit", original = null }) {
  const id = db.encodeId(scopeRef, docPath)
  // For personal / personal-copy docs the provider path ends in the caller's
  // own leaf (named after their email — a meaningless segment to show). Show the
  // owning group instead by dropping that last segment.
  const ownLeaf = instanceType === "personal" || instanceType === "personalCopy"
  let displayProvider = providedBy || null
  if (ownLeaf && displayProvider) {
    const slash = displayProvider.lastIndexOf("/")
    if (slash !== -1) displayProvider = displayProvider.slice(0, slash)
  }
  // The shared "original" this personal copy overlays (personalCopy rows only).
  // Its own handle + version let the finder open the original directly, and its
  // provider is shown as-is (a shared scope, no personal leaf to strip).
  let originalItem = null
  if (original) {
    const originalId = db.encodeId(original.scopeRef, docPath)
    originalItem = {
      id: originalId,
      version: original.version ?? null,
      providedBy: original.provider || null,
      thumbnailUrl: `../brains/thumb?id=${encodeURIComponent(originalId)}${original.version != null ? `&v=${original.version}` : ""}`,
    }
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
    original: originalItem,
    // `v` is a cache-buster: it changes when the document (and its embedded
    // preview) changes, so the browser's <img> cache re-fetches the new image
    // instead of reusing the identical-URL copy from memory.
    thumbnailUrl: `../brains/thumb?id=${encodeURIComponent(id)}${version != null ? `&v=${version}` : ""}`,
  }
}

function init(app) {
  // --- the finder: all docs under the app root, uniform shape --------------
  app.get("/brains/files", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const rootId = await db.appRootId(auth)
      const prefix = req.query.prefix ? `&prefix=${encodeURIComponent(req.query.prefix)}` : ""
      const j = await db.call("GET", `/database/scopes/${rootId}/docs?glob=true${prefix}`, { authHeaders: auth })
      const items = (j.docs || [])
        .filter((d) => hasSuffix(d.path)) // this app owns only its own suffix
        .map((d) =>
          toItem({
            scopeRef: d.operatingScopeRef,
            docPath: d.path,
            providedBy: d.provider,
            version: d.providerVersion,
            instanceType: d.instanceType,
            original: d.original,
          })
        )
      res.json({ items })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- open one document (optionally a specific version) -------------------
  app.get("/brains/file", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId(req.query.id)
      if (!hasSuffix(path)) {
        return res.status(404).json({ error: { message: `not a ${SUFFIX} document` } })
      }
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
      // it on open. Strip it here; it's served separately via /brains/thumb.
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
  app.post("/brains/file", async (req, res) => {
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
          path = dir + withSuffix(name)
        } else {
          path = decoded.path
        }
      } else {
        scopeRef = await db.appRootId(auth)
        path = withSuffix(name) // forces the app suffix, e.g. "MyCircuit.brain"
      }
      const stored = await db.call(
        "PUT",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`,
        { authHeaders: auth, body: { data: content } }
      )
      res.json({ id: db.encodeId(scopeRef, path), version: stored.version, path })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- rename within the caller's leaf -------------------------------------
  app.post("/brains/file/rename", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, name } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      if (!hasSuffix(path)) {
        return res.status(404).json({ error: { message: `not a ${SUFFIX} document` } })
      }
      // keep any directory prefix; only the leaf name changes
      const slash = path.lastIndexOf("/")
      const dir = slash === -1 ? "" : path.slice(0, slash + 1)
      const newPath = dir + withSuffix(name)
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
  app.delete("/brains/file", async (req, res) => {
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
  app.get("/brains/file/versions", async (req, res) => {
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
  app.post("/brains/file/revert", async (req, res) => {
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
  app.post("/brains/file/promote", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId((req.body || {}).id)
      const r = await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/promote?path=${encodeURIComponent(path)}`,
        { authHeaders: auth, body: {} }
      )
      res.json({ status: r.status })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- distribute (horizontal) ---------------------------------------------
  // Body: { id, targets: [groupId…] } — groupId is a plain scopeRef from /groups.
  app.post("/brains/file/distribute", async (req, res) => {
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
  app.post("/brains/file/publish", async (req, res) => {
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
      // Return a ready-to-use public URL (through the ingress).
      res.json({ url: `../database/public/${r.publicId}`, publicId: r.publicId, version: r.version })
    } catch (err) {
      fail(res, err)
    }
  })

  app.post("/brains/file/unpublish", async (req, res) => {
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
  app.get("/brains/groups", async (req, res) => {
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
  app.get("/brains/reviews", async (req, res) => {
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

  app.post("/brains/reviews/approve", (req, res) => reviewVote(req, res, "approve"))
  app.post("/brains/reviews/reject", (req, res) => reviewVote(req, res, "reject"))

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
  // The preview is embedded in the document (content.image, a data URL) so it
  // never drifts from the doc on promote/delete/distribute. Here we read the
  // effective document (walk-up resolved by the DB), decode content.image and
  // stream it as an image. This is the ONLY endpoint that ships the preview.
  app.get("/brains/thumb", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef, path } = db.decodeId(req.query.id)
      const doc = await db.call(
        "GET",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`,
        { authHeaders: auth }
      )
      const decoded = decodeDataUrl(doc.data && doc.data.image)
      if (!decoded) return res.status(404).end()
      // Force the browser to revalidate so a saved edit's new preview is never
      // served stale from cache.
      res.set("cache-control", "no-cache, no-store, must-revalidate")
      res.set("content-type", decoded.contentType)
      res.send(decoded.buffer)
    } catch (err) {
      // a missing preview is not an error worth logging loudly
      res.status(err.statusCode || 404).end()
    }
  })
}

// Returns a shallow copy of a document's data with the (large) preview image
// removed. The image stays stored in the doc; it's just not shipped by default.
function withoutPreview(data) {
  if (!data || typeof data !== "object") return data
  if (data.image === undefined) return data
  const { image, ...rest } = data
  return rest
}

// Parse a "data:image/png;base64,...." data URL into { contentType, buffer }.
// Returns null when the input is not a usable data URL.
function decodeDataUrl(dataUrl) {
  if (typeof dataUrl !== "string") return null
  const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(dataUrl)
  if (!m) return null
  const contentType = m[1] || "application/octet-stream"
  const isBase64 = !!m[2]
  const buffer = isBase64
    ? Buffer.from(m[3], "base64")
    : Buffer.from(decodeURIComponent(m[3]), "utf8")
  if (!buffer.length) return null
  return { contentType, buffer }
}

// Strip unsafe characters from a document name (path separators, control chars,
// collapsed dot runs). Does NOT touch the suffix — that's withSuffix's job.
function sanitizeName(name) {
  let n = String(name || "untitled").trim()
  n = n.replace(/[/\\\x00-\x1f]/g, "").replace(/\.\.+/g, ".")
  return n || "untitled"
}

function fail(res, err) {
  const code = err && err.statusCode ? err.statusCode : 500
  console.log(`[brains/files] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
