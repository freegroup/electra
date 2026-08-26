// Backup packages: assembling one, reading one back, and replaying it.
//
// The package is a gzipped JSON file the user downloads. Only this service ever
// reads it, so the layout can change without touching the browser.

const zlib = require("zlib")
const conf = require("./configuration")
const db = require("./db")
const preview = require("./preview")
const { hasSuffix, withSuffix } = require("./paths")

// A package may carry the documents of several apps; this one reads its own
// attribute and leaves the rest alone.
const { backupFormat: FORMAT, backupFormatVersion: FORMAT_VERSION, backupDocsKey: DOCS_KEY } = conf

// Name of a downloaded backup: "electra-sheets-2026-08-27.electra". The content
// is in the NAME and the type in the EXTENSION - calling the file ".sheets"
// would sit one letter away from a ".sheet" document, which is unreadable in
// the one place the name has to work: a file manager.
function filename() {
  return `electra-${DOCS_KEY}-${new Date().toISOString().slice(0, 10)}.electra`
}

// Raised when the caller hands over something unusable - an empty selection, or
// bytes that are not a package. Which HTTP status that becomes is up to the
// route; this module deals in documents and bytes.
class InvalidInput extends Error {}

// A version lives in the caller's own leaf when the scope's last segment is
// their address - the leaf is named after the person who owns it.
function isOwnLeaf(scopePath, auth) {
  const email = auth["x-mail"] || ""
  return !!email && typeof scopePath === "string" && scopePath.endsWith("/" + email)
}

// The workspace a leaf belongs to ("apps/someone@x.y" -> "apps"). That is what
// an import needs: writing to the workspace lands in the caller's leaf again,
// while the leaf path itself would nest one level deeper.
function homeScope(scopePath, auth) {
  const email = auth["x-mail"] || ""
  return isOwnLeaf(scopePath, auth) ? scopePath.slice(0, -(email.length + 1)) : scopePath
}

// Assemble a package for the given document handles. Lossless: every version
// with its preview blob, so the same file also serves a later exact restore.
// Reads use the caller's auth headers, so a package holds only what they may
// already read. -> Buffer (gzipped)
async function create({ auth, ids }) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new InvalidInput("no documents selected")
  }
  const files = []
  for (const id of ids) {
    const { scopeRef, path } = db.decodeId(id)
    if (!hasSuffix(path)) continue

    // The history spans the whole scope chain, so it also carries the versions
    // of the shared original - written by other people. Only the caller's own
    // leaf goes into the package: a package sits on their disk and can be
    // edited, so foreign authorship would both leave the system here and come
    // back forged on the next import.
    const hist = await db.call(
      "GET",
      `/database/scopes/${scopeRef}/docs/history?path=${encodeURIComponent(path)}`,
      { authHeaders: auth }
    )
    const entries = (hist.history || [])
      .filter((h) => isOwnLeaf(h.scope, auth))
      .sort((a, b) => a.version - b.version)
    if (entries.length === 0) continue // nothing of the caller's own here
    const versions = []
    for (const h of entries) {
      if (!h.uuid) continue
      // Addressed by uuid: it names that exact row wherever it lives. Reading it
      // as scope+path+version would miss every version that sits in a leaf.
      const doc = await db.call(
        "GET",
        `/database/docs/${encodeURIComponent(h.uuid)}`,
        { authHeaders: auth }
      )
      const image = await preview.read(h.uuid, auth)
      versions.push({
        version: h.version,
        status: h.status,
        createdAt: h.createdAt,
        author: h.author ?? null,
        uuid: h.uuid,
        // Recorded per version: a document's history can span the shared scope
        // and the caller's leaf, and those are different places.
        scope: h.scope ?? null,
        data: doc.data ?? {},
        blobs: image ? { [preview.KEY]: image } : {},
      })
    }
    // The workspace the document belongs to - where an import puts it back.
    const newest = versions.filter((v) => v.status === "committed").pop()
    const from = (newest || versions[versions.length - 1] || {}).scope
    files.push({ path, scope: homeScope(from, auth) ?? null, versions })
  }

  const pkg = {
    format: FORMAT,
    formatVersion: FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    [DOCS_KEY]: files,
  }
  // Documents repeat a lot of markup and carry base64 previews - they compress
  // to about half.
  return zlib.gzipSync(Buffer.from(JSON.stringify(pkg), "utf8"))
}

// Unpack an uploaded package. Written gzipped; plain JSON is still accepted so
// backups taken before compression keep working.
function parse(body) {
  if (!Buffer.isBuffer(body) || body.length === 0) throw new InvalidInput("empty upload")
  const isGzip = body[0] === 0x1f && body[1] === 0x8b
  let pkg
  try {
    pkg = JSON.parse((isGzip ? zlib.gunzipSync(body) : body).toString("utf8"))
  } catch {
    throw new InvalidInput("not a readable backup")
  }
  if (!pkg || pkg.format !== FORMAT) throw new InvalidInput("not an electra backup")
  return pkg
}

// The newest committed version of a package entry. Only that one is replayed;
// the package keeps the whole history for a later exact restore.
function newestVersion(file) {
  const versions = (file.versions || []).filter((v) => v.status === "committed")
  if (versions.length === 0) return null
  return versions.reduce((a, b) => (b.version > a.version ? b : a))
}

// Write one document. It goes to the workspace it came from while that still
// exists and is writable, otherwise to the caller's own - a restore may only
// place content, because a scope carries memberships and approval rules that a
// content backup does not hold. -> { scopeRef, path, redirected, hasPreview }
async function replay({ auth, file }) {
  const newest = newestVersion(file)
  if (!newest || !file.path) return null

  const path = withSuffix(file.path)
  const personal = await db.personalWorkspaceId(auth)
  let scopeRef = (file.scope ? await db.scopeIdByRelPath(file.scope, auth) : null) || personal
  let redirected = scopeRef === personal && !!file.scope

  const write = (scope) => db.call(
    "PUT",
    `/database/scopes/${scope}/docs?path=${encodeURIComponent(path)}`,
    { authHeaders: auth, body: { data: preview.withoutImage(newest.data) } }
  )
  try {
    await write(scopeRef)
  } catch (err) {
    if (scopeRef === personal) throw err
    console.log(`[sheets] import: cannot write to "${file.scope}", using the personal workspace`)
    scopeRef = personal
    redirected = true
    await write(scopeRef)
  }

  // The package carries the thumbnail; storing it beats launching a browser to
  // reproduce the picture we were just handed.
  const image = (newest.blobs || {})[preview.KEY]
  if (image && image.base64) {
    await preview.store({ auth, scopeRef, path, preview: image }).catch((e) =>
      console.log(`[sheets] preview store failed: ${e && e.message}`))
  }
  return { scopeRef, path, redirected, hasPreview: !!(image && image.base64) }
}

// Replay a whole package: additive, so an existing document gains a version and
// a missing one appears. Writes go through the normal document path, which
// keeps the usual approval rules in force.
// -> { imported, moved, needPreview: [{ scopeRef, path }] }
async function restoreAdditive({ auth, pkg }) {
  const files = pkg[DOCS_KEY]
  if (!Array.isArray(files) || files.length === 0) {
    throw new InvalidInput("package holds nothing for this app")
  }
  let imported = 0
  let moved = 0
  const needPreview = []
  for (const file of files) {
    const done = await replay({ auth, file })
    if (!done) continue
    imported++
    if (done.redirected) moved++
    if (!done.hasPreview) needPreview.push({ scopeRef: done.scopeRef, path: done.path })
  }
  return { imported, moved, needPreview }
}

module.exports = { InvalidInput, filename, create, parse, restoreAdditive }
