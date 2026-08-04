import axios from "axios"

// Data layer for the designer, over the document model.
//
// A component is one .part document, addressed by an opaque handle (id) like
// everywhere else - no more ?user=/?global= scope split. The designer authors
// only the .shape; the server renders the other members from it on save, so
// open/save carry `shape`, never `content`.
//
// The finder actions (promote, revert, delete, distribute, targets) are generic
// scope-model operations that only pass the handle around, so they mirror the
// brains contract 1:1. That is why this fulfils the same method set the shared
// finder (StorageScreen/GenericApplication) expects of `this.storage`.
const BASE = "../shapes"

class DesignerStorage {

  constructor(conf) {
    this.conf = conf
  }

  // --- finder ---------------------------------------------------------------

  files(prefix) {
    let params = { _: Date.now() }
    if (prefix) params.prefix = prefix
    return axios.get(`${BASE}/files`, { params }).then((r) => r.data.items || [])
  }

  // --- open / save (shape-based, designer-specific) -------------------------

  // Open a component by handle. -> { id, name, scope, shape }
  open(id) {
    return axios.get(`${BASE}/file`, { params: { id, _: Date.now() } }).then((r) => r.data)
  }

  // Resolve a shared component's path to a handle (?global=<path> links). -> { id }
  resolveGlobal(path) {
    return axios.get(`${BASE}/file/global`, { params: { path, _: Date.now() } }).then((r) => r.data)
  }

  // Save. shape is the raw .shape object (draw2d wrapper). Null id creates a new
  // document; scopeRef targets its workspace. -> { id, version, path }
  save({ id, name, scopeRef, shape }) {
    return axios.post(`${BASE}/file`, { id, name, scopeRef, shape }).then((r) => r.data)
  }

  // --- generic scope-model actions (identical to brains) --------------------

  revert(id) {
    return axios.post(`${BASE}/file/revert`, { id }).then((r) => r.data)
  }

  remove(id) {
    return axios.delete(`${BASE}/file`, { params: { id } }).then((r) => r.data)
  }

  deleteShared(uuid, description) {
    return axios.post(`${BASE}/file/delete-shared`, description ? { uuid, description } : { uuid })
      .then((r) => r.data)
  }

  promote(id, description) {
    return axios.post(`${BASE}/file/promote`, description ? { id, description } : { id })
      .then((r) => r.data)
  }

  distributeTargets(id) {
    return axios.get(`${BASE}/file/distribute/targets`, { params: { id } })
      .then((r) => r.data.targets || [])
  }

  distribute(id, targets, description) {
    return axios.post(`${BASE}/file/distribute`, { id, targets, description }).then((r) => r.data)
  }

  // Same filename hygiene the other apps use before a name reaches the server.
  sanitize(name) {
    let sanitizeFilename = require("sanitize-filename")
    return String(name || "")
      .split("/")
      .map((seg) => sanitizeFilename(seg).replace(/[.]/g, "").trim())
      .filter(Boolean)
      .join("/")
  }
}

export default (conf) => new DesignerStorage(conf)
