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

  // Save. Omit id to create a new document (backend picks the group).
  // -> { id, version, path }
  save({ id, name, content }) {
    return axios.post(`${this.base}/file`, { id, name, content })
      .then((response) => response.data)
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

  // Make the caller's personal version the shared version for everyone who
  // sees this document under the same "provided by" group.
  promote(id) {
    return axios.post(`${this.base}/file/promote`, { id })
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

  // Strip the file suffix and unsafe characters from a document name.
  sanitize(name) {
    let sanitize = require("sanitize-filename")
    name = sanitize(name)
    if (this.conf.database.fileSuffix) {
      name = name.replace(this.conf.database.fileSuffix, "")
    }
    return name.replace(RegExp("[.]", "g"), "")
  }
}

export default conf => new StorageClient(conf)
