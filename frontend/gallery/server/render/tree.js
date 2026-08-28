// The gallery's navigation tree.
//
// Two branches at the top - Arbeitsblätter and Bauteile - each holding the
// folder hierarchy of its documents. It is built ONLY from the document paths
// and shows ONLY folders, never a document link. Every folder is a real,
// crawlable <a href>; the hierarchy is present but collapsed via <details>, like
// the book's table of contents. The branch being read is open, the other closed.
//
// Dependency-free, and the same tree is on every gallery page - which is what
// puts a link to every folder into every served document.

const BASE = "/gallery"

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

function encodeSegments(p) {
  return p.split("/").map(encodeURIComponent).join("/")
}

// Folder URLs are canonical WITH a trailing slash, and always branch-prefixed.
function folderHref(branch, folderPath) {
  return `${BASE}/${branch.slug}/${encodeSegments(folderPath)}/`
}

function branchHref(branch) {
  return `${BASE}/${branch.slug}/`
}

// Fold the document paths into a nested folder map. The last path segment is the
// document name and is dropped - folders only.
function buildFolderTree(branch, items) {
  const root = { name: "", path: "", children: new Map() }
  items.forEach((it) => {
    const folders = String(it.path).split("/").slice(0, -1)
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

function renderNodes(branch, children, currentPath) {
  // Folders sorted case-insensitively, so the tree reads the same every render.
  const nodes = Array.from(children.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  )
  const lis = nodes.map((node) => {
    const active = currentPath === node.path
    const link =
      `<a href="${escapeHtml(folderHref(branch, node.path))}"${active ? ' class="active"' : ""}>` +
      `${escapeHtml(node.name)}</a>`
    if (node.children.size === 0) {
      return `<li>${link}</li>`
    }
    const open = isOnPath(node.path, currentPath) ? " open" : ""
    return `<li><details${open}><summary>${link}</summary>${renderNodes(branch, node.children, currentPath)}</details></li>`
  })
  return `<ul>${lis.join("")}</ul>`
}

// `indexes` is one { branch, items } per branch, in display order. `options`
// names the branch being read and the folder inside it, which is what decides
// which parts of the tree ship open.
//
// Returns the inner markup for <nav class="galleryTree">.
function renderTree(indexes, options) {
  const current = (options && options.branch) || null
  const currentPath = (options && options.currentPath) || null

  const lis = indexes.map(({ branch, items }) => {
    const isCurrent = current && current.slug === branch.slug
    const label =
      `<a href="${escapeHtml(branchHref(branch))}" data-i18n="${branch.i18n}"` +
      `${isCurrent && !currentPath ? ' class="active"' : ""}>${escapeHtml(branch.label)}</a>`
    const root = buildFolderTree(branch, items)
    if (root.children.size === 0) {
      return `<li class="treeBranch">${label}</li>`
    }
    // Only the branch being read ships open - otherwise every page would start
    // with both hierarchies unfolded.
    return (
      `<li class="treeBranch"><details${isCurrent ? " open" : ""}>` +
      `<summary>${label}</summary>` +
      `${renderNodes(branch, root.children, isCurrent ? currentPath : null)}` +
      `</details></li>`
    )
  })

  return `<ul class="treeRoot">${lis.join("")}</ul>`
}

module.exports = { renderTree }
