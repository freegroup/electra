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

const bodyParser = require("body-parser")
const db = require("./db")
const backup = require("./backup")
const preview = require("./preview")
const conf = require("./configuration")
const { hasSuffix, withSuffix } = require("./paths")

// Display name of whoever last committed a version. personRef is the plain
// email (database/server/auth.js), and only the part before the @ leaves the
// server — so no full address ends up on a card, nor in the JSON behind it.
function authorLabel(author) {
  if (!author) return null
  const s = String(author)
  const at = s.indexOf("@")
  return at === -1 ? s : s.slice(0, at)
}

// Where the effective version lives, for the editor header. A personal copy is
// recognised by the leaf segment, whose name IS the caller's email
// (ensureWriteLeaf: leaf name == personRef == email). The shown workspace drops
// that leaf so the header names the group; `personal` marks the caller's copy.
function displayLocation(scopePath, auth) {
  const email = auth["x-mail"] || ""
  const suffix = "/" + email
  const personal = !!email && typeof scopePath === "string" && scopePath.endsWith(suffix)
  const scope = personal ? scopePath.slice(0, -suffix.length) : (scopePath || "")
  return { scope, personal }
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
        return res.status(404).json({ error: { message: `not a ${conf.fileSuffix} document` } })
      }
      const v = req.query.version ? `&version=${encodeURIComponent(req.query.version)}` : ""
      const doc = await db.call(
        "GET",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}${v}`,
        { authHeaders: auth }
      )
      const loc = displayLocation(doc.scope, auth)
      const item = toItem({
        scopeRef,
        docPath: path,
        uuid: doc.uuid,
        providedBy: loc.scope,
        version: doc.version,
        author: doc.author,
      })
      // The preview image lives inside the document (content.image) so it stays
      // an atomic unit with the doc — but it's large and the editor doesn't need
      // it on open. Strip it here; it's served separately via /sheets/thumb.
      res.json({ ...item, personal: loc.personal, content: preview.withoutImage(doc.data) })
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
        return res.status(404).json({ error: { message: `not a ${conf.fileSuffix} document` } })
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
      const { id, name, content, scopeRef: chosenScope } = req.body || {}
      let scopeRef, path
      if (id) {
        const decoded = db.decodeId(id)
        scopeRef = decoded.scopeRef
        // name (when given) is the FULL, user-editable document path — doc_path
        // is a virtual DB key, so changing it saves under the new path. Empty
        // name keeps the current path.
        path = name ? withSuffix(name) : decoded.path
      } else {
        // No id → a brand-new document. The caller may name the workspace it
        // should live in (the New dialog offers the ones they can write to);
        // without a choice it falls back to their PERSONAL workspace, as before.
        scopeRef = chosenScope || await db.personalWorkspaceId(auth)
        path = withSuffix(name) // forces the app suffix, e.g. "MyDoc.sheet"
      }
      const stored = await db.call(
        "PUT",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`,
        // Never let an image back into `data` — the preview is a blob, written
        // by generatePreview below.
        { authHeaders: auth, body: { data: preview.withoutImage(content) } }
      )
      // Re-read the effective version so the header shows where it now lives and
      // that it is a personal copy (the write landed in the caller's leaf). The
      // id stays the OPERATING scope handle — the next save resolves the leaf
      // again server-side.
      const eff = await db.call(
        "GET",
        `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}&_=${Date.now()}`,
        { authHeaders: auth }
      )
      const loc = displayLocation(eff.scope, auth)
      res.json({
        id: db.encodeId(scopeRef, path),
        version: eff.version ?? stored.version,
        path,
        providedBy: loc.scope,
        personal: loc.personal,
      })
      // Refresh the preview thumbnail (best-effort, after responding).
      preview.refresh({ auth, scopeRef, path })
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

  // --- backup ---------------------------------------------------------------
  // The package is assembled, compressed and named in backup.js; this hands the
  // bytes to the browser.
  app.post("/sheets/backup", async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const gz = await backup.create({ auth, ids: (req.body || {}).ids })
      res.set({
        "Content-Type": "application/gzip",
        "Content-Length": gz.length,
        "Content-Disposition": `attachment; filename="${backup.filename()}"`,
      })
      res.send(gz)
    } catch (err) {
      fail(res, err)
    }
  })

  // Takes the package as raw bytes; unpacking and writing happen in backup.js.
  // Documents that arrived without a thumbnail get one rendered afterwards, so
  // the response is not held up by a browser start per document.
  app.post("/sheets/import", bodyParser.raw({ type: "*/*", limit: "50mb" }), async (req, res) => {
    try {
      const auth = db.pickAuthHeaders(req)
      const { imported, moved, needPreview } = await backup.restoreAdditive({
        auth,
        pkg: backup.parse(req.body),
      })
      res.json({ imported, moved })
      needPreview.forEach(({ scopeRef, path }) => preview.refresh({ auth, scopeRef, path }))
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
      preview.refresh({ auth, scopeRef, path })
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
      preview.refresh({ auth, scopeRef, path })
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

  // --- one document by uuid -------------------------------------------------
  // Serves the content of exactly that version. The review pane reads a pending
  // version this way, which the walk-up by path would never surface.
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
      // One call: the uuid addresses the blob of exactly that version. This used
      // to fetch the whole document first, only to read scope, path and version
      // out of it and then ask again.
      const dbRes = await db.raw(
        "GET",
        `/database/docs/${encodeURIComponent(req.query.uuid)}/blobs/${preview.KEY}`,
        { authHeaders: auth }
      )
      const ct = dbRes.headers.get("content-type")
      if (ct) res.set("content-type", ct)
      // A version never changes, so its preview never changes either. The
      // app-wide no-cache middleware also sets Pragma/Expires, which would
      // defeat this again — drop them for this one response.
      res.set("cache-control", "private, max-age=31536000, immutable")
      res.removeHeader("Pragma")
      res.removeHeader("Expires")
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

// Name of a downloaded backup: "electra-sheets-2026-08-27.electra". The content
// is in the NAME and the type in the EXTENSION - calling the file ".sheets"
// would sit one letter away from a ".sheet" document, which is unreadable in
// the one place the name has to work: a file manager.
function fail(res, err) {
  // Unusable input from the backup module is a client error; everything else
  // that carries no status is ours.
  let code = 500
  if (err instanceof backup.InvalidInput) code = 400
  else if (err && err.statusCode) code = err.statusCode
  console.log(`[sheets/files] ${code}: ${err && err.message}`)
  res.status(code).json({ error: { message: err && err.message } })
}

module.exports = { init }
