// Generic, app-agnostic Finder API for sheets.
//
// This is the "intelligent layer": it knows the app-root scope and the user,
// talks to the database scope model via db.js, and returns a UNIFORM shape the
// Finder renders without knowing it shows sheets. Every document is named to
// the frontend by an opaque handle (id); human-readable path/providedBy/version
// ride along for display only.
//
// Uniform item: { id, name, path, providedBy, version, editable, published,
//                 instanceType, original, thumbnailUrl }

const db = require("./db")
const conf = require("./configuration")

// This app backend owns exactly one document type, identified by file suffix
// (.sheet). All app backends share ONE content scope, so the suffix — not the
// scope — is what separates the types. We enforce it on BOTH sides:
//   read  — the finder lists only matching docs; opening a foreign type 404s
//   write — save/rename force the suffix so nothing else can land here
const SUFFIX = conf.fileSuffix // e.g. ".sheet"

function hasSuffix(docPath) {
  return !SUFFIX || (typeof docPath === "string" && docPath.endsWith(SUFFIX))
}

// Force the app's suffix onto a document name (used on save/rename). Idempotent.
function withSuffix(name) {
  const n = sanitizePath(name)
  if (!SUFFIX || n.endsWith(SUFFIX)) return n
  return n + SUFFIX
}

// Display name of whoever last committed a version. personRef is the plain
// email (database/server/auth.js), and only the part before the @ leaves the
// server — so no full address ends up on a card, nor in the JSON behind it.
function authorLabel(author) {
  if (!author) return null
  const s = String(author)
  const at = s.indexOf("@")
  return at === -1 ? s : s.slice(0, at)
}

// Build the uniform display item from a database doc/glob row.
//   scopeRef     — the operating scope (where a save lands); goes into the handle
//   docPath      — the document path; goes into the handle + shown as name/path
//   providedBy   — origin scope human path (the "Provided by" column)
//   version      — effective version
//   author       — who last committed that version (shortened, see authorLabel)
//   instanceType — "personal" | "personalCopy" | "inherit" (see globDocs)
function toItem({ scopeRef, docPath, uuid, providedBy, version, author = null, editable = true, published = false, instanceType = "inherit", original = null, promoteCeiling = false, deleteImmediate = false }) {
  const id = db.encodeId(scopeRef, docPath)
  const ownLeaf = instanceType === "personal" || instanceType === "personalCopy"
  let displayProvider = providedBy || null
  if (ownLeaf && displayProvider) {
    const slash = displayProvider.lastIndexOf("/")
    if (slash !== -1) displayProvider = displayProvider.slice(0, slash)
  }
  let originalItem = null
  if (original) {
    const originalId = db.encodeId(original.scopeRef, docPath)
    originalItem = {
      id: originalId,
      uuid: original.uuid || null,
      version: original.version ?? null,
      providedBy: original.provider || null,
      thumbnailUrl: original.uuid ? `../sheets/thumb?uuid=${encodeURIComponent(original.uuid)}` : null,
    }
  }
  return {
    id,
    uuid: uuid || null,
    name: docPath.split("/").pop(),
    path: docPath,
    providedBy: displayProvider,
    version: version ?? null,
    author: authorLabel(author),
    editable,
    published,
    instanceType,
    original: originalItem,
    promoteCeiling,
    // Whether a "delete this shared file" action would commit immediately or
    // open a deletion review (decided by the operating scope's review rules).
    deleteImmediate,
    thumbnailUrl: uuid ? `../sheets/thumb?uuid=${encodeURIComponent(uuid)}` : null,
  }
}

function init(app) {
  // --- the finder: all docs under the app root, uniform shape --------------
  app.get("/sheets/files", async (req, res) => {
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
            author: d.author,
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
  app.get("/sheets/file", async (req, res) => {
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
        author: doc.author,
      })
      // The preview image lives inside the document (content.image) so it stays
      // an atomic unit with the doc — but it's large and the editor doesn't need
      // it on open. Strip it here; it's served separately via /sheets/thumb.
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
  app.get("/sheets/file/global", async (req, res) => {
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
        // name (when given) is the FULL, user-editable document path — doc_path
        // is a virtual DB key, so changing it saves under the new path. Empty
        // name keeps the current path.
        path = name ? withSuffix(name) : decoded.path
      } else {
        // No id → a brand-new document always lands in the caller's PERSONAL
        // workspace (electra/content/users/<email>), where they are member+admin.
        scopeRef = await db.personalWorkspaceId(auth)
        path = withSuffix(name) // forces the app suffix, e.g. "MyDoc.sheet"
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

  // --- request deletion of a SHARED doc for the group ----------------------
  // Body: { uuid, description? }. The uuid pins the exact shared version, so the
  // caller's personal copy of the same path (a different uuid) is left
  // untouched. The database resolves the scope from the uuid, enforces
  // membership, and applies review rules: admin / score-0 → committed as
  // 'deleted' at once, a plain member in a review scope → a pending deletion
  // review (README §6.9).
  app.post("/sheets/file/delete-shared", async (req, res) => {
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
  // Body: { id, description? } — the optional note travels to the reviewers.
  app.post("/sheets/file/promote", async (req, res) => {
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
      // The promoted (shared) version needs its own preview. Best-effort.
      generatePreview({ auth, scopeRef, path }).catch((e) =>
        console.log(`[sheets] preview generation failed: ${e && e.message}`))
    } catch (err) {
      fail(res, err)
    }
  })

  // --- distribute (horizontal) ---------------------------------------------
  // Body: { id, targets: [groupId…], description? } — groupId is a plain scopeRef
  // from /groups; the optional note travels to reviewers of pending targets.
  app.post("/sheets/file/distribute", async (req, res) => {
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
  // Publishing mints a public link. The preview is refreshed here too (best
  // effort), though save/promote already keep it current via a render token —
  // publishing no longer being the only moment a preview can be produced.
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
      res.json({ url: `../sheets/public/${r.publicId}`, publicId: r.publicId, version: r.version })
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

  // --- distribute targets (for the distribute picker) ----------------------
  // The valid destination scopes for this document — decided server-side by the
  // database (excludes personal workspaces and the doc's own scope). Query: id.
  app.get("/sheets/file/distribute/targets", async (req, res) => {
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
  // screenshot (generatePreview) refreshed on every save/promote/publish and
  // stored as a "preview" blob on the version (walk-up resolved by the DB).
  // Stream it here.
  // --- fetch one document by UUID (for review + thumbnail) ----------------
  app.get("/sheets/file/doc", async (req, res) => {
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

  // --- preview thumbnail (UUID-based) --------------------------------------
  app.get("/sheets/thumb", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      // Resolve scope+path+version via the UUID — one call, works for any status.
      const doc = await db.call(
        "GET",
        `/database/docs/${encodeURIComponent(req.query.uuid)}`,
        { authHeaders: auth }
      )
      const dbRes = await db.raw(
        "GET",
        `/database/scopes/${encodeURIComponent(doc.scopeRef)}/blobs/preview?path=${encodeURIComponent(doc.path)}&version=${encodeURIComponent(doc.version)}`,
        { authHeaders: auth }
      )
      const ct = dbRes.headers.get("content-type")
      if (ct) res.set("content-type", ct)
      res.set("cache-control", "no-cache, no-store, must-revalidate")
      res.send(Buffer.from(await dbRes.arrayBuffer()))
    } catch (err) {
      res.status(err.statusCode || 404).end()
    }
  })

  // --- anonymous public read (published share link) -------------------------
  // The /database service is NOT exposed by the ingress, so the public share
  // link points here. No auth: publishing is the capability. Forwards to the
  // database public-read (which enforces published/gone state).
  app.get("/sheets/public/:publicId", async (req, res) => {
    try {
      const doc = await db.call("GET", `/database/public/${encodeURIComponent(req.params.publicId)}`, {})
      res.json(doc)
    } catch (err) {
      fail(res, err)
    }
  })

  // A published version's preview blob, anonymous.
  app.get("/sheets/public/:publicId/blobs/:key", async (req, res) => {
    try {
      const dbRes = await db.raw(
        "GET",
        `/database/public/${encodeURIComponent(req.params.publicId)}/blobs/${encodeURIComponent(req.params.key)}`,
        {}
      )
      const ct = dbRes.headers.get("content-type")
      if (ct) res.set("content-type", ct)
      res.send(Buffer.from(await dbRes.arrayBuffer()))
    } catch (err) {
      res.status(err.statusCode || 404).end()
    }
  })

  // --- render-token read (puppeteer, localhost) -----------------------------
  // page.html (loaded by puppeteer via the ingress) fetches the doc for a
  // short-lived render token here, since /database is not exposed. Anonymous —
  // the signed token is the capability.
  app.get("/sheets/render", async (req, res) => {
    try {
      const token = encodeURIComponent(String((req.query || {}).token || ""))
      const doc = await db.call("GET", `/database/render?token=${token}`, {})
      res.json(doc)
    } catch (err) {
      fail(res, err)
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
  console.log(`[sheets/files] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
