// One worksheet document -> HTML, server-side and browser-free.
//
// This mirrors the author's render contract without loading any editor class:
//   - the page loop from author/public/js/index-page.js (visible sections only,
//     skip empty pages, a page break before every rendered page but the first),
//   - visibleIn() from author/public/js/visibility.js,
//   - each editor's render()/append() string output.
// The gallery shows the worksheet view (mode "worksheet"): cloze gaps are blank,
// solution-only cells are dropped.

const { md, mdQuestion } = require("./markdown")

const MODE = "worksheet"

// Which sheet a cell lands on - copied from author visibility.js. An "all" cell
// shows on both sheets; a restricted cell only on its own.
function visibleIn(section) {
  const visibility = section.visibility == null ? "all" : section.visibility
  return visibility === "all" || visibility === MODE
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

function escapeAttr(s) {
  return escapeHtml(s)
}

// Old image cells stored a bare data-URL string; new ones carry { src, scale }.
function imageContent(content) {
  if (!content) return { src: "", scale: 90 }
  if (typeof content === "string") return { src: content, scale: 90 }
  return content
}

// Per-type render() -> inner HTML, matching each author editor's output. Every
// call is wrapped by renderSection() so one broken cell never fails the page.
function renderByType(section) {
  switch (section.type) {
    case "markdown":
    case "wysiwyg":
      return md.render(section.content || "")
    case "cloze":
      return mdQuestion.render(section.content || "")
    case "image": {
      const c = imageContent(section.content)
      if (!c.src) return "-double click to edit image-"
      return `<div style="text-align:center"><img src="${escapeAttr(c.src)}" width="${escapeAttr(c.scale)}%"></div>`
    }
    case "brain":
      if (section.content && section.content.image) {
        return `<div style="text-align:center"><img src="${escapeAttr(section.content.image)}"></div>`
      }
      return "-double click to edit brain-"
    case "timing":
      return renderTiming(section.content)
    default:
      // Unknown type: the author shows an UnknownEditor placeholder; here it is
      // simply skipped so it never breaks a public page.
      return ""
  }
}

// WaveDrom timing diagram -> inline SVG.
//
// The author renders through wavedrom's createElement, which needs a browser
// DOM. Here the public API is used instead: renderAny returns an ONML tree and
// onml.stringify turns it into SVG markup - pure strings, no DOM. If anything
// goes wrong, a plain list of the signal names keeps the content indexable.
let wavedromParts = null
function loadWavedrom() {
  if (wavedromParts !== null) return wavedromParts
  try {
    const wavedrom = require("wavedrom")
    const skin = require("wavedrom/skins/default.js")
    wavedromParts = { wavedrom, skin }
  } catch (err) {
    console.log(`[gallery] wavedrom unavailable, timing falls back to text: ${err && err.message}`)
    wavedromParts = false
  }
  return wavedromParts
}

function renderTiming(content) {
  let json
  try {
    json = JSON.parse(content)
  } catch (err) {
    return ""
  }
  const w = loadWavedrom()
  if (w) {
    try {
      return w.wavedrom.onml.stringify(w.wavedrom.renderAny(0, json, w.skin))
    } catch (err) {
      // fall through to the text fallback
    }
  }
  return timingNames(json)
}

// Fallback for timing: the signal names as a list, so the content is indexable
// even when no SVG could be produced.
function timingNames(json) {
  const names = []
  const walk = (node) => {
    if (Array.isArray(node)) node.forEach(walk)
    else if (node && typeof node === "object" && node.name) names.push(String(node.name))
  }
  if (json && Array.isArray(json.signal)) walk(json.signal)
  if (!names.length) return ""
  const items = names.map((n) => `<li>${escapeHtml(n)}</li>`).join("")
  return `<ul>${items}</ul>`
}

// One cell. The class names are the gallery's OWN - deliberately not the
// author's .section/.sectionContent/.authorPage.
//
// Those carry editor chrome from the shared LESS (drop zones, sliders, flyover
// menus, click cursors) that a read-only page has no use for, and their heading
// scale is shared with the PDF export - so tuning it here would reach into the
// print output. With names of its own the gallery styles its documents in full
// and nothing shared can reach in.
function renderSection(section) {
  let inner = ""
  try {
    inner = renderByType(section)
  } catch (err) {
    console.log(`[gallery] section ${section && section.id} (${section && section.type}) failed: ${err && err.message}`)
    inner = ""
  }
  return `<div class="galleryCell" data-type="${escapeAttr(section.type)}">${inner}</div>`
}

// Whole document -> HTML. `doc` is the sheet JSON ({ pages:[ { sections } ] }).
function renderDocument(doc) {
  const pages = (doc && doc.pages) || []
  let html = ""
  let rendered = 0
  pages.forEach((page) => {
    const sections = (page.sections || []).filter(visibleIn)
    if (!sections.length) return
    // A separator between sheets, not a print page break: this is a screen view
    // of the document, and the reader should see where one sheet ends.
    if (rendered > 0) html += `<hr class="galleryPageBreak">`
    html += `<div class="galleryPage">${sections.map(renderSection).join("")}</div>`
    rendered++
  })
  return html
}

module.exports = { renderDocument }
