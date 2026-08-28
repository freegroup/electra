// The gallery's read-only data source.
//
// Everything the gallery shows comes from the public, anonymous sheets API on
// localhost: the worksheet list (/sheets/files) and one document at a time
// (/sheets/file?id=).
//
// Deliberately NOT cached: a worksheet can be edited at any moment, and a
// gallery that shows yesterday's version of a document is worse than one that
// costs an extra localhost call. Both endpoints are a process next door, and the
// page render dominates the request either way.
//
// The one thing kept across requests is the LAST GOOD list, used only when an
// upstream call fails - that is resilience, not freshness: without it a hiccup
// in the sheets service would blank the gallery and the start page's tree.

const LOCALHOST = process.env.LOCALHOST || "127.0.0.1"
const PORT_SHEETS = process.env.PORT_SHEETS
const BASE = `http://${LOCALHOST}:${PORT_SHEETS}`

// The worksheet suffix; the slug in a URL is the path without it.
const SUFFIX = ".sheet"

function pathToSlug(p) {
  return p.endsWith(SUFFIX) ? p.slice(0, -SUFFIX.length) : p
}

// Last successful list, kept for the error case only (see the header).
let lastGood = null

// The worksheet list plus a slug -> item map, fetched fresh on every call.
async function getIndex() {
  try {
    const res = await fetch(`${BASE}/sheets/files`, { headers: { accept: "application/json" } })
    if (!res.ok) throw new Error(`GET /sheets/files -> ${res.status}`)
    const json = await res.json()
    const items = (json.items || []).filter((it) => it && typeof it.path === "string")
    const bySlug = new Map()
    items.forEach((it) => bySlug.set(pathToSlug(it.path), it))
    lastGood = { items, bySlug }
    return lastGood
  } catch (err) {
    console.log(`[gallery] list unavailable: ${err && err.message}`)
    return lastGood || { items: [], bySlug: new Map() }
  }
}

// One document by its opaque handle. Returns the sheet JSON, or null when it
// cannot be read - the caller renders an empty state rather than a 500.
async function getDoc(id) {
  try {
    const res = await fetch(`${BASE}/sheets/file?id=${encodeURIComponent(id)}`, { headers: { accept: "application/json" } })
    if (!res.ok) throw new Error(`GET /sheets/file -> ${res.status}`)
    const json = await res.json()
    return json.content || null
  } catch (err) {
    console.log(`[gallery] doc ${id} unavailable: ${err && err.message}`)
    return null
  }
}

module.exports = { getIndex, getDoc, pathToSlug }
