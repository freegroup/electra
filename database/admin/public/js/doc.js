// doc.js — small helpers for the document editor panel. Exposed as `Doc`.
//
// Holds the "currently loaded doc" so mutating actions can send the right
// (scope, path, version) for optimistic concurrency, and offers JSON
// parse/format helpers for the two editors.

const Doc = (() => {
  // The doc most recently loaded via Load (as returned by the DB), or null.
  let current = null

  function setCurrent(doc) { current = doc }
  function getCurrent() { return current }
  function clear() { current = null }

  function parseEditor(textareaId) {
    const raw = document.getElementById(textareaId).value.trim()
    if (!raw) return {}
    try {
      return JSON.parse(raw)
    } catch (e) {
      throw new Error(`${textareaId}: invalid JSON — ${e.message}`)
    }
  }

  function fill(dataId, metaId, doc) {
    document.getElementById(dataId).value = JSON.stringify(doc?.data ?? {}, null, 2)
    document.getElementById(metaId).value = JSON.stringify(doc?.meta ?? {}, null, 2)
  }

  // Build the doc body for a PUT: current fields (for concurrency) + edited
  // data/meta. If we have a loaded doc, carry its scope/version so the server
  // can enforce optimistic concurrency; otherwise it's treated as new.
  function putBody(data, meta) {
    const body = { data, meta }
    if (current && current.scope && current.version != null) {
      body.scope = current.scope
      body.version = current.version
    }
    return body
  }

  return { setCurrent, getCurrent, clear, parseEditor, fill, putBody }
})()
