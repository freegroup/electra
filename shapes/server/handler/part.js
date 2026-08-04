// The designer's document endpoints, over the scope model.
//
// A component is ONE .part document whose `data` holds the text members
// (shape, custom, js, md) and whose preview rides along as a blob. The designer
// only ever authors the .shape; the other members are RENDERED from it here on
// save (thumbnails.renderParts), so .custom/.js/.md/.png can never drift from
// the .shape a user actually edited.
//
//   GET  /shapes/part?id=<handle>          -> { id, name, scope, shape }
//   POST /shapes/part                      -> { id }
//        body { id?, name?, scopeRef?, shape }
//
// This is the designer's equivalent of /brains/file. It deliberately does NOT
// serve or accept the derived members: the editor round-trips only the shape.

const db = require("../db")
const conf = require("../configuration")
const generator = require("../thumbnails")
const { identifierFor } = require("../indexBuilder")

const SUFFIX = ".part"          // the document suffix, a backend detail
const SHAPE_SUFFIX = ".shape"   // the only suffix the designer ever sees
const PREVIEW_KEY = "preview"

// Internal document name for a name coming from the designer. The designer knows
// only ".shape"; the document is a ".part". Accept either (or none) and force
// ".part" — the ".part" suffix must never travel outward, see toOutward.
function withSuffix(name) {
  let n = String(name || "").replace(/^\/+/, "")
  if (n.endsWith(SHAPE_SUFFIX)) n = n.slice(0, -SHAPE_SUFFIX.length)
  return n.endsWith(SUFFIX) ? n : n + SUFFIX
}

// Outward name for a document path: the ".part" detail becomes ".shape", which
// is what the designer authors and displays.
function toOutward(docPath) {
  return docPath.endsWith(SUFFIX)
    ? docPath.slice(0, -SUFFIX.length) + SHAPE_SUFFIX
    : docPath
}

// Display name of whoever last committed a version — only the part before the @,
// so no full address reaches a card. Mirrors brains/files.js authorLabel.
function authorLabel(author) {
  if (!author) return null
  const s = String(author)
  const at = s.indexOf("@")
  return at === -1 ? s : s.slice(0, at)
}

// Where the effective version lives, for the editor header. A personal copy is
// recognised by the leaf segment, whose name IS the caller's email
// (ensureWriteLeaf: leaf name == personRef == email). The shown scope drops that
// leaf so the header names the group; `personal` marks the caller's own copy.
// Mirrors brains/sheets displayLocation.
function displayLocation(scopePath, auth) {
  const email = auth["x-mail"] || ""
  const suffix = "/" + email
  const personal = !!email && typeof scopePath === "string" && scopePath.endsWith(suffix)
  const scope = personal ? scopePath.slice(0, -suffix.length) : (scopePath || "")
  return { scope, personal }
}

// Uniform finder item from a glob row, in the shape StorageScreen renders — the
// same fields brains produces, but every outward name is ".shape" and the
// preview goes through /shapes/thumb. This is the ".part"->".shape" boundary for
// the finder.
function toItem(d) {
  const scopeRef = d.operatingScopeRef
  const docPath = d.path
  const id = db.encodeId(scopeRef, docPath)
  const instanceType = d.instanceType || "inherit"

  const ownLeaf = instanceType === "personal" || instanceType === "personalCopy"
  let displayProvider = d.provider || null
  if (ownLeaf && displayProvider) {
    const slash = displayProvider.lastIndexOf("/")
    if (slash !== -1) displayProvider = displayProvider.slice(0, slash)
  }

  let originalItem = null
  if (d.original) {
    originalItem = {
      id: db.encodeId(d.original.scopeRef, docPath),
      uuid: d.original.uuid || null,
      version: d.original.version ?? null,
      providedBy: d.original.provider || null,
      thumbnailUrl: d.original.uuid ? `../shapes/thumb?uuid=${encodeURIComponent(d.original.uuid)}` : null,
    }
  }

  const outward = toOutward(docPath)
  return {
    id,
    uuid: d.uuid || null,
    name: outward.split("/").pop(),
    path: outward,
    providedBy: displayProvider,
    version: d.providerVersion ?? null,
    author: authorLabel(d.author),
    editable: true,
    instanceType,
    original: originalItem,
    promoteCeiling: d.promoteCeiling,
    deleteImmediate: d.deleteImmediate,
    thumbnailUrl: d.uuid ? `../shapes/thumb?uuid=${encodeURIComponent(d.uuid)}` : null,
  }
}

module.exports = {
  init: function (app) {

    // The finder: every component the caller can see under the content root,
    // in the uniform item shape StorageScreen renders. Same glob as brains, but
    // filtered to .part and mapped through toItem (which shows .shape outward).
    app.get("/shapes/files", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const rootId = await db.contentRootId(auth)
        const prefix = req.query.prefix ? `&prefix=${encodeURIComponent(req.query.prefix)}` : ""
        const j = await db.call(
          "GET",
          `/database/scopes/${rootId}/docs?glob=true&suffix=${encodeURIComponent(SUFFIX)}${prefix}`,
          { authHeaders: auth }
        )
        res.json({ items: (j.docs || []).map(toItem) })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    // Open a component for editing: return just its .shape, which is all the
    // designer round-trips. The derived members are regenerated on save.
    //
    //   ?id=<handle>   the component at that scope+path (its effective version)
    app.get("/shapes/file", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const { scopeRef, path } = db.decodeId(req.query.id)
        const doc = await db.call(
          "GET",
          `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}&_=${Date.now()}`,
          { authHeaders: auth }
        )
        const shape = doc.data && doc.data.shape
        if (shape === undefined) {
          return res.status(404).json({ error: { message: "not a component document" } })
        }
        const loc = displayLocation(doc.scope, auth)
        res.json({
          id: db.encodeId(scopeRef, path),
          name: toOutward(path),
          version: doc.version,
          providedBy: loc.scope,
          personal: loc.personal,
          shape,
        })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    // Resolve a component NAME to the handle of the variant that applies inside
    // a given circuit. The simulator calls this before "Open in Designer": it
    // knows the .shape name on the stage and the circuit's own handle, but not
    // which .part version wins in that scope. The answer is the walk-up from the
    // circuit's scope — so a class's override resolves to itself, the global
    // original elsewhere. Keeps handle-minting and .part on the server; the
    // client only ever passes a .shape name and an opaque circuit handle.
    //
    //   ?name=<shape name>&inScope=<circuit handle>  -> { id }
    app.get("/shapes/file/resolve", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const path = withSuffix(req.query.name || "")
        // The scope to resolve in comes from the circuit's handle. No handle
        // (e.g. an unsaved circuit) -> resolve in the shared app root.
        let scopeRef
        if (req.query.inScope) {
          scopeRef = db.decodeId(req.query.inScope).scopeRef
        } else {
          scopeRef = await db.appsScopeId(auth)
        }
        // The walk-up read returns the effective version's real scope+path; mint
        // the handle from THAT, so ?doc= later opens exactly this variant.
        const doc = await db.call(
          "GET",
          `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}&_=${Date.now()}`,
          { authHeaders: auth }
        )
        res.json({ id: db.encodeId(doc.scopeRef ?? scopeRef, path) })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    // Resolve a shared component's path (electra/content/apps) to a handle, so
    // old ?global=<path> links keep opening. Mirrors /brains/file/global.
    app.get("/shapes/file/global", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const path = withSuffix(req.query.path || "")
        const appsId = await db.appsScopeId(auth)
        if (!appsId) return res.status(404).json({ error: { message: "no app root" } })
        res.json({ id: db.encodeId(appsId, path) })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    // Save a component. The body carries only the .shape; render the rest from
    // it, then store all text members in `data` and the preview as a blob.
    //
    // No id  -> a new component. scopeRef names the target workspace (the New
    //           dialog offers writable ones); without one it falls back to the
    //           caller's personal workspace, like the other apps.
    // With id -> a new version at the same scope+path.
    app.post("/shapes/file", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const { id, name, scopeRef: chosenScope, shape } = req.body || {}
        if (typeof shape !== "string") {
          return res.status(400).json({ error: { message: "shape (string) required" } })
        }

        let scopeRef, path
        if (id) {
          const decoded = db.decodeId(id)
          scopeRef = decoded.scopeRef
          path = name ? withSuffix(name) : decoded.path
        } else {
          scopeRef = chosenScope || await db.personalWorkspaceId(auth)
          path = withSuffix(name)
        }

        // Render the derived members from the shape. The identifier is the frozen
        // path->name derivation every stored circuit refers to (indexBuilder).
        const identifier = identifierFor(path)
        const parts = await generator.renderParts(shape, identifier)

        // Text members in `data` — shape is the source of truth, the rest is its
        // regenerated projection. The preview stays out of `data` (a blob below).
        const data = {
          shape,
          js: parts.js,
          custom: parts.custom,
          md: parts.md,
        }
        const stored = await db.call(
          "PUT",
          `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`,
          { authHeaders: auth, body: { data } }
        )

        // Preview after the document, onto the version the PUT just created; it
        // also overwrites the copy putDoc carried over from the previous version.
        if (parts.pngBase64) {
          await db.putRaw(
            `/database/scopes/${scopeRef}/blobs/${PREVIEW_KEY}?path=${encodeURIComponent(path)}`,
            Buffer.from(parts.pngBase64, "base64"),
            "image/png",
            auth
          )
        }

        // Re-read the effective version so the header shows where it now lives
        // and that it is a personal copy (the write landed in the caller's leaf).
        // The id stays the OPERATING scope handle — the next save resolves the
        // leaf again server-side.
        const eff = await db.call(
          "GET",
          `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}&_=${Date.now()}`,
          { authHeaders: auth }
        )
        const loc = displayLocation(eff.scope, auth)
        res.json({
          id: db.encodeId(scopeRef, path),
          version: eff.version ?? stored.version,
          path: toOutward(path),
          providedBy: loc.scope,
          personal: loc.personal,
        })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    // --- generic scope-model actions -----------------------------------------
    // These only pass the handle around and delegate to the database; they touch
    // neither .shape nor .part, so they mirror the brains endpoints verbatim.

    app.post("/shapes/file/revert", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const { scopeRef, path } = db.decodeId((req.body || {}).id)
        await db.call("POST", `/database/scopes/${scopeRef}/docs/revert`, { authHeaders: auth, body: { path } })
        res.json({ ok: true })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    app.delete("/shapes/file", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const { scopeRef, path } = db.decodeId(req.query.id)
        await db.call("DELETE", `/database/scopes/${scopeRef}/docs?path=${encodeURIComponent(path)}`, { authHeaders: auth })
        res.json({ ok: true })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    app.post("/shapes/file/delete-shared", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const { uuid, description } = req.body || {}
        const body = description ? { description } : {}
        const r = await db.call("POST", `/database/docs/${encodeURIComponent(uuid)}/delete-request`, { authHeaders: auth, body })
        res.json({ status: r.status })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    app.post("/shapes/file/promote", async (req, res) => {
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
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    app.post("/shapes/file/distribute", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const { id, targets, description } = req.body || {}
        const { scopeRef, path } = db.decodeId(id)
        const body = { path, targetScopeRefs: targets || [] }
        if (description) body.description = description
        const r = await db.call("POST", `/database/scopes/${scopeRef}/docs/distribute`, { authHeaders: auth, body })
        res.json({ results: r.distributions || [] })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })

    app.get("/shapes/file/distribute/targets", async (req, res) => {
      try {
        const auth = db.pickAuthHeaders(req)
        const { scopeRef } = db.decodeId(req.query.id)
        const j = await db.call("GET", `/database/scopes/${scopeRef}/docs/distribute/targets`, { authHeaders: auth })
        res.json({ targets: j.targets || [] })
      } catch (err) {
        res.status(err.statusCode || 500).json({ error: { message: err.message } })
      }
    })
  },
}
