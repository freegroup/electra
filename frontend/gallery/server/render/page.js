// Fills the served HTML shell for one gallery page.
//
// The shell (public/index.template.html) is read once and its placeholders are
// replaced per request, so express.static never hands out a stale index.html.
// Only the head (title, canonical, description), the folder tree and the article
// content change between pages; the frame (header, footer) is drawn by the
// client bundle exactly as on every other app.

const fs = require("fs")
const path = require("path")

const SITE = "https://electra.academy"

const TEMPLATE = fs.readFileSync(path.resolve(__dirname, "../../public/index.template.html"), "utf8")

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

// Replace one placeholder token everywhere it appears. String replace (not
// regex) so content with $-sequences is inserted verbatim.
function fill(html, token, value) {
  return html.split(token).join(value)
}

// `page` = { title, description, canonicalPath, tree, content }. canonicalPath
// is the absolute in-site path (e.g. "/gallery/Logik/"); tree and content are
// ready HTML.
//
// Leaving canonicalPath out means "this page stands for no address" - the 404 -
// and then no canonical is written at all. og:url still needs a URL, so it falls
// back to the gallery entrance.
function renderPage(page) {
  const canonical = SITE + (page.canonicalPath || "/gallery/")
  const canonicalLink = page.canonicalPath
    ? `<link rel="canonical" href="${escapeHtml(canonical)}">`
    : ""
  let html = TEMPLATE
  html = fill(html, "<!--GALLERY_TITLE-->", escapeHtml(page.title))
  html = fill(html, "<!--GALLERY_DESCRIPTION-->", escapeHtml(page.description || ""))
  html = fill(html, "<!--GALLERY_CANONICAL_LINK-->", canonicalLink)
  html = fill(html, "<!--GALLERY_CANONICAL-->", escapeHtml(canonical))
  html = fill(html, "<!--GALLERY_TREE-->", page.tree || "")
  html = fill(html, "<!--GALLERY_CONTENT-->", page.content || "")
  return html
}

module.exports = { renderPage, SITE }
