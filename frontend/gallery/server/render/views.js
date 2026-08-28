// The three article bodies the gallery serves: the root, a folder page and a
// single worksheet. Each returns ready HTML for the <article> placeholder; the
// left folder tree and the page shell are added around it by page.js.
//
// Chrome copy is German (the served default); each label also carries a
// data-i18n attribute, so the client bundle re-localizes it after load. No
// server-side i18n - German ships immediately, the client adjusts if needed.
//
// Links are plain, crawlable <a href> - folders end in a slash, documents do
// not. The action links (PDF, author) point at other apps and open in their own
// tab; they are tools, not indexable gallery content.

const { renderDocument } = require("./sections")
const { pathToSlug } = require("./list")

const BASE = "/gallery"

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

function encodeSegments(p) {
  return p.split("/").map(encodeURIComponent).join("/")
}

function folderHref(slug) {
  return `${BASE}/${encodeSegments(slug)}/`
}

function docHref(slug) {
  return `${BASE}/${encodeSegments(slug)}`
}

// Immediate children of a folder ("" = root): the next-level subfolders and the
// documents that sit directly in it.
function childrenOf(items, folderPath) {
  const prefix = folderPath ? folderPath + "/" : ""
  const subfolders = new Map() // name -> full slug
  const docs = [] // { item, name, slug }
  items.forEach((it) => {
    const slug = pathToSlug(it.path)
    if (prefix && !slug.startsWith(prefix)) return
    const rest = slug.slice(prefix.length)
    if (!rest) return
    const segs = rest.split("/")
    if (segs.length === 1) {
      docs.push({ item: it, name: segs[0], slug })
    } else if (!subfolders.has(segs[0])) {
      subfolders.set(segs[0], prefix + segs[0])
    }
  })
  const folders = Array.from(subfolders.entries())
    .map(([name, full]) => ({ name, slug: full }))
    .sort((a, b) => a.name.localeCompare(b.name, "de", { sensitivity: "base" }))
  docs.sort((a, b) => a.name.localeCompare(b.name, "de", { sensitivity: "base" }))
  return { folders, docs }
}

// Breadcrumb from the site root down to `folderPath`. When `leaf` is given it is
// appended as the current (unlinked) page - a document name.
function breadcrumb(folderPath, leaf) {
  const crumbs = [`<a href="${BASE}/">Arbeitsblätter</a>`]
  if (folderPath) {
    let accum = ""
    folderPath.split("/").forEach((seg) => {
      accum = accum ? `${accum}/${seg}` : seg
      crumbs.push(`<a href="${escapeHtml(folderHref(accum))}">${escapeHtml(seg)}</a>`)
    })
  }
  if (leaf) crumbs.push(`<span aria-current="page">${escapeHtml(leaf)}</span>`)
  return `<nav class="crumbs">${crumbs.join('<span class="sep">/</span>')}</nav>`
}

// A grid of folder and document tiles for a browse view (root or folder).
function browseGrid(items, folderPath) {
  const { folders, docs } = childrenOf(items, folderPath)
  if (!folders.length && !docs.length) {
    return `<p class="galleryEmpty" data-i18n="gallery:empty">Hier ist noch nichts.</p>`
  }
  let html = ""
  if (folders.length) {
    const tiles = folders
      .map(
        (f) =>
          `<li class="tile folderTile"><a href="${escapeHtml(folderHref(f.slug))}">` +
          `<span class="tileName">${escapeHtml(f.name)}</span></a></li>`
      )
      .join("")
    html +=
      `<h2 class="browseHead" data-i18n="gallery:section.folders">Ordner</h2>` +
      `<ul class="tileGrid">${tiles}</ul>`
  }
  if (docs.length) {
    const tiles = docs
      .map(
        (d) =>
          `<li class="tile docTile"><a href="${escapeHtml(docHref(d.slug))}">` +
          `<span class="tileName">${escapeHtml(d.name)}</span></a></li>`
      )
      .join("")
    html +=
      `<h2 class="browseHead" data-i18n="gallery:section.sheets">Blätter</h2>` +
      `<ul class="tileGrid">${tiles}</ul>`
  }
  return html
}

// The root article: title, lead and the top-level browse grid.
function rootView(items) {
  return (
    `<header class="galleryHead">` +
    `<h1 data-i18n="gallery:title">Arbeitsblätter</h1>` +
    `<p class="lead" data-i18n="gallery:lead">Anschauen, als PDF laden oder im Autor weiterbauen.</p>` +
    `</header>` +
    `<section class="galleryBrowse">${browseGrid(items, "")}</section>`
  )
}

// A folder article: breadcrumb, folder name and its browse grid.
function folderView(items, folderPath) {
  const name = folderPath.split("/").pop()
  return (
    breadcrumb(folderPath) +
    `<header class="galleryHead"><h1>${escapeHtml(name)}</h1></header>` +
    `<section class="galleryBrowse">${browseGrid(items, folderPath)}</section>`
  )
}

// A worksheet article: breadcrumb, title, action links and the rendered sheet.
function docView(item, doc) {
  const slug = pathToSlug(item.path)
  const folderPath = slug.includes("/") ? slug.slice(0, slug.lastIndexOf("/")) : ""
  const name = slug.split("/").pop()
  const id = encodeURIComponent(item.id)
  const actions =
    `<div class="galleryActions">` +
    `<a class="electra-button" href="../sheets/pdf?id=${id}&mode=all&lang=de" target="_blank" rel="noopener" data-i18n="gallery:action.pdf">PDF</a>` +
    `<a class="electra-button electra-primary" href="../author/?doc=${id}" target="_blank" rel="noopener" data-i18n="gallery:action.open">Im Autor öffnen</a>` +
    `</div>`
  const body = doc ? renderDocument(doc) : `<p class="galleryEmpty" data-i18n="gallery:empty">Hier ist noch nichts.</p>`
  return (
    breadcrumb(folderPath, name) +
    `<header class="galleryHead"><h1>${escapeHtml(name)}</h1>${actions}</header>` +
    `<div class="galleryDoc">${body}</div>`
  )
}

module.exports = { rootView, folderView, docView, browseGrid }
