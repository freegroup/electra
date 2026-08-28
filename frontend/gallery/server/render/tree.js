// The folder navigation tree, shared by the gallery and the home page.
//
// It is built ONLY from the document paths and shows ONLY folders - never a
// document link. Every folder is a real, crawlable <a href> to its gallery
// folder page; the full hierarchy is present but collapsed via <details>, like
// the book's table of contents. `currentPath` opens and marks the active branch.
//
// Dependency-free on purpose: home requires it by relative path, and the gallery
// is always deployed alongside.

const BASE = "/gallery"

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

// A folder href keeps the segments verbatim but url-encodes each one, and is
// canonical with a trailing slash.
function folderHref(folderPath) {
  const enc = folderPath.split("/").map(encodeURIComponent).join("/")
  return `${BASE}/${enc}/`
}

// Fold the document paths into a nested folder map. The last path segment is the
// document name and is dropped - folders only.
function buildFolderTree(items) {
  const root = { name: "", path: "", children: new Map() }
  items.forEach((it) => {
    const segments = String(it.path).split("/")
    const folders = segments.slice(0, -1)
    let node = root
    let accum = ""
    folders.forEach((seg) => {
      accum = accum ? `${accum}/${seg}` : seg
      if (!node.children.has(seg)) {
        node.children.set(seg, { name: seg, path: accum, children: new Map() })
      }
      node = node.children.get(seg)
    })
  })
  return root
}

function isOnPath(folderPath, currentPath) {
  if (!currentPath) return false
  return currentPath === folderPath || currentPath.startsWith(folderPath + "/")
}

function renderNodes(children, currentPath) {
  // Folders sorted case-insensitively, so the tree reads the same every render.
  const nodes = Array.from(children.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  )
  const lis = nodes.map((node) => {
    const active = currentPath === node.path
    const linkClass = active ? ' class="active"' : ""
    const link = `<a href="${escapeHtml(folderHref(node.path))}"${linkClass}>${escapeHtml(node.name)}</a>`
    if (node.children.size === 0) {
      return `<li>${link}</li>`
    }
    const open = isOnPath(node.path, currentPath) ? " open" : ""
    return `<li><details${open}><summary>${link}</summary>${renderNodes(node.children, currentPath)}</details></li>`
  })
  return `<ul>${lis.join("")}</ul>`
}

// Inner tree markup (a <ul>...</ul>), to drop inside a <nav class="galleryTree">.
// Returns "" when there are no folders at all.
function renderTree(items, options) {
  const currentPath = (options && options.currentPath) || null
  const root = buildFolderTree(items || [])
  if (root.children.size === 0) return ""
  return renderNodes(root.children, currentPath)
}

module.exports = { renderTree }
