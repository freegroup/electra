// ComponentIndex — loads the components (".part" documents) that apply to one
// document, and keeps track of which context is currently loaded.
//
// Until now both apps pulled /shapes/index.js once at boot and never again. That
// worked while there was exactly one set of components for everybody. With
// components living in scopes, WHICH set applies depends on the document being
// worked on, so the load moves from application start to document open.
//
// Shared by simulator and author: both embed the same circuit editor, so both
// need the same sequence, and having it twice is how two implementations drift.
//
// Usage:
//   await componentIndex.loadFor(docHandle)   // before instantiating figures
//   componentIndex.catalog                    // entries for the palette
//
// The bundle defines its components as globals (`var digital_gate_AND = …`), so
// loading a second one REPLACES the first. That is intended: only one context is
// ever active. It also means the two must not be loaded concurrently, hence the
// single in-flight promise.

import loadScript from "./loadScript"

class ComponentIndex {

  constructor() {
    // The catalogue of the context loaded last, for the palette to read
    // synchronously. This is current state, not a cache: every load() refetches
    // and replaces it.
    this.catalog = []
    this.pending = null
  }

  // Load the components for a document's handle, or nothing for a document that
  // does not exist yet. The previously loaded set must NOT stay: the document
  // before may have come from an entirely different scope, whose components do
  // not apply to a new one.
  loadFor(handle) {
    return this._load(`doc=${encodeURIComponent(handle || "new")}`)
  }

  // Re-resolve the SAME context that was loaded last. Used on a live "a
  // component changed" signal: the answer to "which version applies to me" is
  // the walk-up for my own open document, not whatever version someone else just
  // saved. Falls back to the default context if nothing has been loaded yet.
  reload() {
    return this._load(this.currentQuery || `doc=${encodeURIComponent("new")}`)
  }

  // Load the components for a chosen workspace, before the first save. Scopes
  // are client-visible by ref (the workspace list, distribute targets), unlike
  // document handles - so passing one here is fine. A null scopeRef falls back
  // to the scope the caller works in (same as loadFor with no handle).
  loadForScope(scopeRef) {
    return scopeRef == null
      ? this.loadFor(null)
      : this._load(`scope=${encodeURIComponent(scopeRef)}`)
  }

  // Fetch + evaluate one context, keyed by its query string. NOT cached: the
  // catalogue changes under the caller (a teacher promotes a part, someone
  // overrides one), so every open reloads. The only thing kept is the in-flight
  // promise, and only to keep two CONCURRENT identical loads from overwriting
  // each other's globals mid-flight - it is cleared as soon as the load settles.
  _load(query) {
    // Remember the context so a live change signal can re-resolve exactly it.
    this.currentQuery = query
    if (this.pending && this.pendingKey === query) return this.pending

    this.pendingKey = query
    const q = `?${query}`

    // Code first, catalogue second: the palette hands the code's identifier to
    // `eval`, so an entry whose definition has not been evaluated yet would be a
    // red label. See Shapes-Rework.md §4.3.
    this.pending = loadScript(`../shapes/index.js${q}`)
      .then(() => fetch(`../shapes/index.json${q}`, { cache: "no-store" }).then((r) => r.json()))
      .then((catalog) => {
        this.catalog = Array.isArray(catalog) ? catalog : []
        this.pending = null
        return this.catalog
      })
      .catch((err) => {
        this.pending = null
        throw err
      })

    return this.pending
  }

  // The preview of one entry. Addressed by the version uuid the catalogue
  // carries, not by a path: which image belongs to a component is the same
  // resolution as which code does, and it was already answered when the index
  // was built.
  imageUrl(entry) {
    return entry && entry.uuid
      ? `../shapes/thumb?uuid=${encodeURIComponent(entry.uuid)}`
      : null
  }
}

export default new ComponentIndex()
