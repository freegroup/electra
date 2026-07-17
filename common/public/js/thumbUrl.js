// thumbUrl — builds a thumbnail URL from app config + document identity.
// Used wherever a document handle needs to be built client-side (e.g. Review).
// The draft/files panes get thumbnailUrl from the server (toItem()); this
// utility is for panes that receive scopeRef+path+version directly.
//
// conf.database.base is the app's BFF base (e.g. "../brains"); thumb lives at
// conf.database.base + "/thumb".

// Encode the opaque document handle: base64url(JSON.stringify({s, p})).
// Same format as brains/sheets server db.js encodeId — the /thumb endpoint
// expects exactly this.
function encodeHandle(scopeRef, path) {
  const json = JSON.stringify({ s: String(scopeRef), p: path })
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

export function thumbUrl(conf, scopeRef, path, version) {
  const base = conf && conf.database && conf.database.base
  if (!base) return ""
  const id = encodeHandle(scopeRef, path)
  return `${base}/thumb?id=${encodeURIComponent(id)}&v=${version}`
}

export default thumbUrl
