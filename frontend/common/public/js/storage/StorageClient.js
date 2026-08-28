import axios from 'axios'

// Data layer for the generic, app-agnostic Finder API served by the app's own
// backend (e.g. brains). The frontend never talks to /database and never builds
// scope-based requests: every operation names a document by an opaque `id`
// handle the backend minted. Human-readable fields (name, path, providedBy,
// version) travel inside the item objects for display only.
//
// Uniform item: { id, name, path, providedBy, version, editable, published, thumbnailUrl }
class StorageClient {

  constructor(conf) {
    this.conf = conf
    this.base = conf.database.base // e.g. "../brains"
  }

  // --- the finder ----------------------------------------------------------

  // All documents visible under this app's root, uniform shape.
  files(prefix) {
    let params = { _: Date.now() } // cache-buster (see open())
    if (prefix) params.prefix = prefix
    return axios.get(`${this.base}/files`, { params })
      .then((response) => response.data.items || [])
  }

  // --- one document --------------------------------------------------------

  // Open a document (optionally a specific version). -> item + { content }
  // `_` is a cache-buster: opening the same id twice is an identical GET URL,
  // which some browsers serve from their in-memory cache even with no-store
  // response headers. A unique param per call forces a real fetch (stays GET,
  // no REST break).
  open(id, version) {
    let params = { id, _: Date.now() }
    if (version != null) params.version = version
    return axios.get(`${this.base}/file`, { params })
      .then((response) => response.data)
  }

  // Resolve a public document name/path (shared app content) to an opaque
  // handle, so links can reference docs by name. -> { id }
  resolveGlobal(path) {
    return axios.get(`${this.base}/file/global`, { params: { path, _: Date.now() } })
      .then((response) => response.data)
  }

  // Save. Omit id to create a new document (backend picks the group).
  // -> { id, version, path }
  // scopeRef (optional) targets a brand-new document at a chosen workspace;
  // ignored once the document has an id (its scope is then fixed).
  save({ id, name, content, scopeRef }) {
    return axios.post(`${this.base}/file`, { id, name, content, scopeRef })
      .then((response) => response.data)
  }

  // --- backup ---------------------------------------------------------------

  // The backup package for the given documents. The server assembles, compresses
  // and names it; this side only ever sees bytes, so the package format can
  // change without touching the browser.
  // -> { blob, filename }
  backupFiles(ids) {
    return axios.post(`${this.base}/backup`, { ids }, { responseType: "blob" })
      .then((response) => ({
        blob: response.data,
        filename: filenameFromDisposition(response.headers["content-disposition"]),
      }))
  }

  // Send a package file back. The server unpacks it and writes the documents,
  // for the same reason: only one side needs to know the format.
  // -> { imported, moved }
  importPackage(file) {
    return axios.post(`${this.base}/import`, file, {
      headers: { "Content-Type": "application/octet-stream" },
    }).then((response) => response.data)
  }

  // --- sharing -------------------------------------------------------------

  // Discard the caller's personal copy so the shared/official version shows
  // again. Not reversible.
  revert(id) {
    return axios.post(`${this.base}/file/revert`, { id })
      .then((response) => response.data)
  }

  // Delete a purely personal document (no shared version to fall back to).
  // Not reversible.
  remove(id) {
    return axios.delete(`${this.base}/file`, { params: { id } })
      .then((response) => response.data)
  }

  // Delete a SHARED document for the whole group: writes a deletion and
  // promotes it to the operating scope. Admins commit it right away; plain
  // members open a deletion review, where the optional description is shown to
  // the reviewers. -> { status: "deleted" | "pending" | ... }
  // Request deletion of the SHARED version, named by its uuid. Addressing the
  // exact version (not the doc path) is what leaves the caller's personal copy
  // of the same document untouched. Commits at once or opens a review depending
  // on the owning scope; the returned status says which.
  deleteShared(uuid, description) {
    return axios.post(`${this.base}/file/delete-shared`, description ? { uuid, description } : { uuid })
      .then((response) => response.data)
  }

  // Make the caller's personal version the shared version for everyone who
  // sees this document under the same "provided by" group. The optional
  // description is shown to the reviewers when the promote needs approval.
  promote(id, description) {
    return axios.post(`${this.base}/file/promote`, description ? { id, description } : { id })
      .then((response) => response.data)
  }

  // The scopes this document may be distributed INTO — decided server-side
  // (excludes personal workspaces and the doc's own scope).
  // -> [{ scopeRef, name, label, path }]
  distributeTargets(id) {
    return axios.get(`${this.base}/file/distribute/targets`, { params: { id } })
      .then((response) => response.data.targets || [])
  }

  // Distribute (horizontal): deliver the caller's draft into each target scope.
  // Each target applies the same review rules as promote. The optional note is
  // shown to reviewers of targets that need approval. -> { results: [...] }
  distribute(id, targets, description) {
    let body = { id, targets }
    if (description) body.description = description
    return axios.post(`${this.base}/file/distribute`, body)
      .then((response) => response.data)
  }

  publish(id, version) {
    return axios.post(`${this.base}/file/publish`, { id, version })
      .then((response) => response.data)
  }

  unpublish(id, version) {
    return axios.post(`${this.base}/file/unpublish`, { id, version })
      .then((response) => response.data)
  }

  // --- helpers -------------------------------------------------------------

  // Clean a document path. doc_path is a virtual DB key (not a filesystem path),
  // so "/" is kept as a segment separator and each segment is sanitized like a
  // file name. The app suffix is stripped (the caller re-adds it); empty / ".."
  // segments are dropped so no broken path reaches the DB.
  sanitize(name) {
    let sanitizeFilename = require("sanitize-filename")
    let suffix = this.conf.database.fileSuffix
    name = String(name || "")
    if (suffix && name.endsWith(suffix)) name = name.slice(0, -suffix.length)
    return name
      .split("/")
      .map((seg) => sanitizeFilename(seg).replace(/[.]/g, "").trim())
      .filter((seg) => seg.length > 0)
      .join("/")
  }
}

// The server names the download; fall back to a generic name if the header is
// missing (a proxy may drop it).
function filenameFromDisposition(header) {
  let m = /filename="?([^";]+)"?/.exec(header || "")
  return m ? m[1] : "electra-backup.electra"
}

export default conf => new StorageClient(conf)
