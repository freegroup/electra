// The gallery's read-only data sources.
//
// Everything the gallery shows comes from the public, anonymous APIs on
// localhost: the document list of a branch (/sheets/files, /shapes/files), one
// worksheet at a time (/sheets/file?id=) and a component's description
// (/shapes/part/<uuid>/md).
//
// Deliberately NOT cached: a worksheet or a component can be edited at any
// moment, and a gallery that shows yesterday's version is worse than one that
// costs an extra localhost call. The page render dominates the request anyway.
//
// The one thing kept across requests is the LAST GOOD list per branch, used only
// when an upstream call fails - that is resilience, not freshness: without it a
// hiccup in one backend would blank the whole gallery, including the other
// branch's tree.

const LOCALHOST = process.env.LOCALHOST || "127.0.0.1"
const PORT_SHEETS = process.env.PORT_SHEETS
const PORT_SHAPES = process.env.PORT_SHAPES

// A document path -> its URL slug, i.e. the path without the branch's suffix.
function pathToSlug(branch, p) {
  return p.endsWith(branch.suffix) ? p.slice(0, -branch.suffix.length) : p
}

// Last successful list per branch slug, for the error case only (see header).
const lastGood = new Map()

// One branch's documents plus a slug -> item map, fetched fresh on every call.
async function getIndex(branch) {
  try {
    const res = await fetch(branch.listUrl(), { headers: { accept: "application/json" } })
    if (!res.ok) throw new Error(`GET ${branch.listUrl()} -> ${res.status}`)
    const json = await res.json()
    const items = (json.items || []).filter((it) => it && typeof it.path === "string")
    const bySlug = new Map()
    items.forEach((it) => bySlug.set(pathToSlug(branch, it.path), it))
    const index = { branch, items, bySlug }
    lastGood.set(branch.slug, index)
    return index
  } catch (err) {
    console.log(`[gallery] ${branch.slug} list unavailable: ${err && err.message}`)
    return lastGood.get(branch.slug) || { branch, items: [], bySlug: new Map() }
  }
}

// All branches at once - what every page needs for the tree.
function getIndexes(branches) {
  return Promise.all(branches.map(getIndex))
}

// One worksheet by its opaque handle. Returns the sheet JSON, or null when it
// cannot be read - the caller renders an empty state rather than a 500.
async function getSheet(id) {
  try {
    const url = `http://${LOCALHOST}:${PORT_SHEETS}/sheets/file?id=${encodeURIComponent(id)}`
    const res = await fetch(url, { headers: { accept: "application/json" } })
    if (!res.ok) throw new Error(`GET /sheets/file -> ${res.status}`)
    const json = await res.json()
    return json.content || null
  } catch (err) {
    console.log(`[gallery] sheet ${id} unavailable: ${err && err.message}`)
    return null
  }
}

// A component's description. The endpoint answers text/markdown, and 404 for the
// handful of components that carry none - which is a valid state, not an error,
// so it comes back as an empty string.
async function getPartMarkdown(uuid) {
  try {
    const url = `http://${LOCALHOST}:${PORT_SHAPES}/shapes/part/${encodeURIComponent(uuid)}/md`
    const res = await fetch(url)
    if (res.status === 404) return ""
    if (!res.ok) throw new Error(`GET /shapes/part/../md -> ${res.status}`)
    return await res.text()
  } catch (err) {
    console.log(`[gallery] description for ${uuid} unavailable: ${err && err.message}`)
    return ""
  }
}

module.exports = { getIndex, getIndexes, getSheet, getPartMarkdown, pathToSlug }
