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
  const n = sanitizePath(name)
  if (!SUFFIX || n.endsWith(SUFFIX)) return n
  return n + SUFFIX
}

// Build the uniform display item from a database doc/glob row.
//   scopeRef     — the operating scope (where a save lands); goes into the handle
//   docPath      — the document path; goes into the handle + shown as name/path
//   providedBy   — origin scope human path (the "Provided by" column)
//   version      — effective version
//   instanceType — "personal" | "personalCopy" | "inherit" (see globDocs)
function toItem({ scopeRef, docPath, uuid, providedBy, version, editable = true, published = false, instanceType = "inherit", original = null, promoteCeiling = false, deleteImmediate = false }) {
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
  let originalItem = null
  if (original) {
    const originalId = db.encodeId(original.scopeRef, docPath)
    originalItem = {
      id: originalId,
      uuid: original.uuid || null,
      version: original.version ?? null,
      providedBy: original.provider || null,
      thumbnailUrl: original.uuid ? `../brains/thumb?uuid=${encodeURIComponent(original.uuid)}` : null,
    }
  }
  return {
    id,
    uuid: uuid || null,
    name: docPath.split("/").pop(),
    path: docPath,
    providedBy: displayProvider,
    version: version ?? null,
    editable,
    published,
    instanceType,
    original: originalItem,
    promoteCeiling,
    // Whether a "delete this shared file" action would commit immediately or
    // open a deletion review (decided by the operating scope's review rules).
    deleteImmediate,
    thumbnailUrl: uuid ? `../brains/thumb?uuid=${encodeURIComponent(uuid)}` : null,
  }
}

function init(app) {
  // --- the finder: all docs the caller can see under the content root ------
  app.get("/brains/files", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const rootId = await db.contentRootId(auth)
      const prefix = req.query.prefix ? `&prefix=${encodeURIComponent(req.query.prefix)}` : ""
      const j = await db.call("GET", `/database/scopes/${rootId}/docs?glob=true${prefix}`, { authHeaders: auth })
      const items = (j.docs || [])
        .filter((d) => hasSuffix(d.path)) // this app owns only its own suffix
        .map((d) =>
          toItem({
            scopeRef: d.operatingScopeRef,
            docPath: d.path,
            uuid: d.uuid,
            providedBy: d.provider,
            version: d.providerVersion,
            instanceType: d.instanceType,
            original: d.original,
            promoteCeiling: d.promoteCeiling,
            deleteImmediate: d.deleteImmediate,
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
        uuid: doc.uuid,
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

  // --- resolve a public name/path to a handle ------------------------------
  // Lets links reference a shared document by name (e.g. ?global=guides/intro)
  // instead of an opaque id. Resolves the path in the shared app content
  // (electra/content/apps) and returns the handle the editor opens with. Works
  // for anonymous callers too.
  app.get("/brains/file/global", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const path = withSuffix(req.query.path || "")
      if (!hasSuffix(path)) {
        return res.status(404).json({ error: { message: `not a ${SUFFIX} document` } })
      }
      const rootId = await db.appRootId(auth)
      res.json({ id: db.encodeId(rootId, path) })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- save (create when no id) --------------------------------------------
  // Body: { id?, name?, content }. No id → new document in the caller's
  // PERSONAL workspace (electra/content/users/<email>); the write-leaf logic
  // selects the user's own folder automatically. With an id, the scope is taken
  // from the handle; a supplied name overrides the document name (save-as within
  // the same scope), preserving any directory prefix from the original path.
  app.post("/brains/file", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, name, content } = req.body || {}
      let scopeRef, path
      if (id) {
        const decoded = db.decodeId(id)
        scopeRef = decoded.scopeRef
        // name (when given) is the FULL, user-editable document path — doc_path
        // is a virtual DB key, so changing it saves under the new path. Empty
        // name keeps the current path.
        path = name ? withSuffix(name) : decoded.path
      } else {
        // No id → a brand-new document always lands in the caller's PERSONAL
        // workspace (electra/content/users/<email>), where they are member+admin.
        // From there it can later be distributed into shared workspaces.
        scopeRef = await db.personalWorkspaceId(auth)
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

  // --- request deletion of a SHARED doc for the group ----------------------
  // Request deletion of the SHARED version (README §6.9). The version is named
  // by its uuid, which pins that exact shared version — the caller's own copy of
  // the same path is a different uuid and is left untouched. The database
  // resolves the scope from the uuid, enforces membership, and applies the
  // review rules: admin / score-0 → committed immediately, a plain member in a
  // review scope → a pending deletion review.
  app.post("/brains/file/delete-shared", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { uuid, description } = req.body || {}
      if (!uuid) {
        return res.status(400).json({ error: { message: "uuid required" } })
      }
      const r = await db.call(
        "POST",
        `/database/docs/${encodeURIComponent(uuid)}/delete-request`,
        { authHeaders: auth, body: description ? { description } : {} }
      )
      res.json({ status: r.status })
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
  // Body: { id, description? } — the optional note travels to the reviewers.
  app.post("/brains/file/promote", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, description } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      const r = await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/promote?path=${encodeURIComponent(path)}`,
        { authHeaders: auth, body: description ? { description } : {} }
      )
      res.json({ status: r.status })
    } catch (err) {
      fail(res, err)
    }
  })

  // --- distribute (horizontal) ---------------------------------------------
  // Body: { id, targets: [groupId…], description? } — groupId is a plain scopeRef
  // from /groups; the optional note travels to reviewers of pending targets.
  app.post("/brains/file/distribute", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { id, targets, description } = req.body || {}
      const { scopeRef, path } = db.decodeId(id)
      const body = { path, targetScopeRefs: targets || [] }
      if (description) body.description = description
      const r = await db.call(
        "POST",
        `/database/scopes/${scopeRef}/docs/distribute`,
        { authHeaders: auth, body }
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
      res.json({ url: `../brains/public/${r.publicId}`, publicId: r.publicId, version: r.version })
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

  // --- distribute targets (for the distribute picker) ----------------------
  // The valid destination scopes for this document — decided server-side by the
  // database (excludes personal workspaces and the doc's own scope). Query: id.
  app.get("/brains/file/distribute/targets", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { scopeRef } = db.decodeId(req.query.id)
      const j = await db.call(
        "GET",
        `/database/scopes/${scopeRef}/docs/distribute/targets`,
        { authHeaders: auth }
      )
      res.json({ targets: j.targets || [] })
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

  // --- fetch one document by UUID (for review + thumbnail) ----------------
  app.get("/brains/file/doc", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const doc = await db.call(
        "GET",
        `/database/docs/${encodeURIComponent(req.query.uuid)}`,
        { authHeaders: auth }
      )
      res.json(doc)
    } catch (err) {
      fail(res, err)
    }
  })

  // --- preview thumbnail ----------------------------------------------------
  // Fetch by UUID: the preview image is embedded in the document (data.image),
  // accessible for any status (pending/committed) with a single read.
  app.get("/brains/thumb", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const doc = await db.call(
        "GET",
        `/database/docs/${encodeURIComponent(req.query.uuid)}`,
        { authHeaders: auth }
      )
      const decoded = decodeDataUrl(doc.data && doc.data.image)
      if (!decoded) return res.status(404).end()
      res.set("cache-control", "no-cache, no-store, must-revalidate")
      res.set("content-type", decoded.contentType)
      res.send(decoded.buffer)
    } catch (err) {
      res.status(err.statusCode || 404).end()
    }
  })

  // --- anonymous public read (published share link) -------------------------
  // The /database service is NOT exposed by the ingress, so the public share
  // link points here. No auth: publishing is the capability. Forwards to the
  // database public-read (which enforces published/gone state).
  app.get("/brains/public/:publicId", async (req, res) => {
    try {
      const doc = await db.call("GET", `/database/public/${encodeURIComponent(req.params.publicId)}`, {})
      res.json(doc)
    } catch (err) {
      fail(res, err)
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
// Sanitize ONE path segment (no "/"): strip separators / control chars, collapse
// dot runs.
function sanitizeSegment(seg) {
  return String(seg || "").trim().replace(/[/\\\x00-\x1f]/g, "").replace(/\.\.+/g, ".")
}
function sanitizeName(name) {
  return sanitizeSegment(name) || "untitled"
}
// Path-aware: doc_path is a virtual DB key, so keep "/" as a separator and clean
// each segment, dropping empty ones (leading/trailing/double slashes).
function sanitizePath(name) {
  const segs = String(name || "").split("/").map(sanitizeSegment).filter(Boolean)
  return segs.join("/") || "untitled"
}

function fail(res, err) {
  const code = err && err.statusCode ? err.statusCode : 500
  console.log(`[brains/files] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
