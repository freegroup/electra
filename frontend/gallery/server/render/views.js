// The article bodies the gallery serves: the root with its two branches, a
// folder listing, one worksheet, one component. Each returns ready HTML for the
// <article> placeholder; the tree and the page shell are added by page.js.
//
// Chrome copy is German (the served default); each label also carries a
// data-i18n attribute, so the client bundle re-localizes it after load. No
// server-side i18n - German ships immediately, the client adjusts if needed.
//
// Links are plain, crawlable <a href> - folders end in a slash, documents do
// not. The action links (PDF, author, designer) point at other apps and open in
// their own tab; they are tools, not indexable gallery content.

const { renderDocument } = require("./sections")
const { md } = require("./markdown")
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

function branchHref(branch) {
  return `${BASE}/${branch.slug}/`
}

function folderHref(branch, slug) {
  return `${BASE}/${branch.slug}/${encodeSegments(slug)}/`
}

function docHref(branch, slug) {
  return `${BASE}/${branch.slug}/${encodeSegments(slug)}`
}

// Immediate children of a folder ("" = the branch root): the next-level
// subfolders and the documents that sit directly in it.
function childrenOf(branch, items, folderPath) {
  const prefix = folderPath ? folderPath + "/" : ""
  const subfolders = new Map() // name -> full slug
  const docs = [] // { item, name, slug }
  items.forEach((it) => {
    const slug = pathToSlug(branch, it.path)
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

// Breadcrumb from the gallery root through the branch down to `folderPath`. A
// `leaf` is appended as the current, unlinked page - a document name.
function breadcrumb(branch, folderPath, leaf) {
  const crumbs = [
    `<a href="${BASE}/" data-i18n="gallery:title">Galerie</a>`,
    `<a href="${escapeHtml(branchHref(branch))}" data-i18n="${branch.i18n}">${escapeHtml(branch.label)}</a>`,
  ]
  if (folderPath) {
    let accum = ""
    folderPath.split("/").forEach((seg) => {
      accum = accum ? `${accum}/${seg}` : seg
      crumbs.push(`<a href="${escapeHtml(folderHref(branch, accum))}">${escapeHtml(seg)}</a>`)
    })
  }
  if (leaf) crumbs.push(`<span aria-current="page">${escapeHtml(leaf)}</span>`)
  return `<nav class="crumbs">${crumbs.join('<span class="sep">/</span>')}</nav>`
}

// A document tile. Components carry a preview image - a list of component names
// without their symbols would be unusable, the picture IS the identification.
function docTile(branch, d) {
  const thumb = d.item.thumbnailUrl
    ? `<span class="tileThumb"><img src="${escapeHtml(d.item.thumbnailUrl)}" alt="" loading="lazy"></span>`
    : ""
  const withThumb = thumb ? " hasThumb" : ""
  return (
    `<li class="tile docTile${withThumb}"><a href="${escapeHtml(docHref(branch, d.slug))}">` +
    `${thumb}<span class="tileName">${escapeHtml(d.name)}</span></a></li>`
  )
}

// A grid of folder and document tiles for a browse view.
function browseGrid(branch, items, folderPath) {
  const { folders, docs } = childrenOf(branch, items, folderPath)
  if (!folders.length && !docs.length) {
    return `<p class="galleryEmpty" data-i18n="gallery:empty">Hier ist noch nichts.</p>`
  }
  let html = ""
  if (folders.length) {
    const tiles = folders
      .map(
        (f) =>
          `<li class="tile folderTile"><a href="${escapeHtml(folderHref(branch, f.slug))}">` +
          `<span class="tileName">${escapeHtml(f.name)}</span></a></li>`
      )
      .join("")
    html +=
      `<h2 class="browseHead" data-i18n="gallery:section.folders">Ordner</h2>` +
      `<ul class="tileGrid">${tiles}</ul>`
  }
  if (docs.length) {
    const tiles = docs.map((d) => docTile(branch, d)).join("")
    html +=
      `<h2 class="browseHead" data-i18n="${branch.i18n}">${escapeHtml(branch.label)}</h2>` +
      `<ul class="tileGrid">${tiles}</ul>`
  }
  return html
}

// The gallery root: the two branches, each as an entry tile. No breadcrumb -
// this IS the top.
function rootView(indexes) {
  const tiles = indexes
    .map(
      ({ branch, items }) =>
        `<li class="tile branchTile"><a href="${escapeHtml(branchHref(branch))}">` +
        `<span class="tileName" data-i18n="${branch.i18n}">${escapeHtml(branch.label)}</span>` +
        `<span class="tileCount">${items.length}</span></a></li>`
    )
    .join("")
  return (
    headBand(
      `<h1 data-i18n="gallery:title">Galerie</h1>` +
      `<p class="lead" data-i18n="gallery:lead">Fertige Arbeitsblätter und alle Bauteile - anschauen, laden oder weiterbauen.</p>`
    ) +
    bodyBand(`<section class="galleryBrowse"><ul class="tileGrid">${tiles}</ul></section>`)
  )
}

// A branch's entry page: its top-level folders and documents.
function branchView(branch, items) {
  return (
    breadcrumb(branch, "") +
    headBand(`<h1 data-i18n="${branch.i18n}">${escapeHtml(branch.label)}</h1>`) +
    bodyBand(`<section class="galleryBrowse">${browseGrid(branch, items, "")}</section>`)
  )
}

// A folder inside a branch.
function folderView(branch, items, folderPath) {
  const name = folderPath.split("/").pop()
  const parent = folderPath.includes("/") ? folderPath.slice(0, folderPath.lastIndexOf("/")) : ""
  return (
    breadcrumb(branch, parent, name) +
    headBand(`<h1>${escapeHtml(name)}</h1>`) +
    bodyBand(`<section class="galleryBrowse">${browseGrid(branch, items, folderPath)}</section>`)
  )
}

// Every page is built from the same four bands, so a worksheet, a component and
// a folder all read the same way:
//
//   crumbs   where you are, clickable
//   docHead  who this is - title, and for a component its symbol
//   toolbar  what you can do with it
//   body     the content itself
//
// They are separate bands rather than one block because the reader answers those
// questions in that order, and because the toolbar will hold more than one
// button before long.
function headBand(inner) {
  return `<header class="docHead">${inner}</header>`
}

function toolbarBand(actions) {
  return actions ? `<div class="docToolbar">${actions}</div>` : ""
}

function bodyBand(inner) {
  return `<div class="docBody">${inner}</div>`
}

// One worksheet: the rendered sheet, plus PDF and author links.
function sheetView(branch, item, doc) {
  const slug = pathToSlug(branch, item.path)
  const name = slug.split("/").pop()
  const folderPath = slug.includes("/") ? slug.slice(0, slug.lastIndexOf("/")) : ""
  const id = encodeURIComponent(item.id)
  const actions =
    `<a class="electra-button" href="../sheets/pdf?id=${id}&mode=all&lang=de" target="_blank" rel="noopener" data-i18n="gallery:action.pdf">PDF</a>` +
    `<a class="electra-button electra-primary" href="../author/?doc=${id}" target="_blank" rel="noopener" data-i18n="gallery:action.open">Im Autor öffnen</a>`
  const body = doc
    ? renderDocument(doc)
    : `<p class="galleryEmpty" data-i18n="gallery:empty">Hier ist noch nichts.</p>`
  return (
    breadcrumb(branch, folderPath, name) +
    headBand(`<h1>${escapeHtml(name)}</h1>`) +
    toolbarBand(actions) +
    bodyBand(`<div class="galleryDoc">${body}</div>`)
  )
}

// One component: its symbol, its description, and the way into the designer.
//
// The description is written in the designer and stored with the component; it
// runs through the same markdown pipeline as a worksheet, so its headings are
// demoted below the page title exactly the same way.
function partView(branch, item, markdown) {
  const slug = pathToSlug(branch, item.path)
  const name = slug.split("/").pop()
  const id = encodeURIComponent(item.id)
  const actions =
    `<a class="electra-button electra-primary" href="../designer/?doc=${id}" target="_blank" rel="noopener" data-i18n="gallery:action.designer">Im Symbol Editor öffnen</a>`

  // The symbol sits NEXT TO the name, not above the text: it is the component's
  // identity, the way an app icon is - and it is named in the alt text rather
  // than left decorative.
  const symbol = item.thumbnailUrl
    ? `<figure class="partSymbol"><img src="${escapeHtml(item.thumbnailUrl)}" alt="Schaltsymbol ${escapeHtml(name)}"></figure>`
    : ""

  // The folder the component lives in, as a plain category line under the name.
  const folderPath = slug.includes("/") ? slug.slice(0, slug.lastIndexOf("/")) : ""
  const category = folderPath
    ? `<div class="partCategory">${escapeHtml(folderPath.split("/").join(" / "))}</div>`
    : ""

  let body = ""
  if (markdown && markdown.trim()) {
    try {
      body = md.render(markdown)
    } catch (err) {
      console.log(`[gallery] description of ${slug} failed: ${err && err.message}`)
    }
  }

  return (
    breadcrumb(branch, folderPath, name) +
    headBand(
      `<div class="partHead">${symbol}` +
      `<div class="partHeadText"><h1>${escapeHtml(name)}</h1>${category}</div></div>`
    ) +
    toolbarBand(actions) +
    bodyBand(`<div class="galleryDoc galleryPart"><div class="galleryPage">${body}</div></div>`)
  )
}

// A dead address inside the gallery. It gets the whole page - tree, header,
// footer - so the visitor is not on a dead end but standing in the gallery with
// everything else in reach.
function notFoundView() {
  return (
    `<div class="galleryNotFound">` +
    `<div class="notFoundCode">404</div>` +
    `<h1 data-i18n="gallery:notfound.title">Hier ist eine Leitung unterbrochen.</h1>` +
    `<p data-i18n="gallery:notfound.text">Die Seite gibt es nicht (mehr). Nebenan liegen Arbeitsblätter und Bauteile.</p>` +
    `<a class="electra-button electra-primary" href="${BASE}/" data-i18n="gallery:notfound.back">Zur Galerie</a>` +
    `</div>`
  )
}

module.exports = { rootView, branchView, folderView, sheetView, partView, notFoundView }
