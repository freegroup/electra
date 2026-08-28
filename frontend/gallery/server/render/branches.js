// The two branches the gallery shows.
//
// Worksheets and components come from different backends and read differently,
// but everything AROUND them is the same: a folder tree built from paths, a
// browse view per folder, one page per document. That common part is written
// once and driven by these descriptors; only the document rendering itself is
// per branch (views.js).
//
// `slug` is the first URL segment and part of what a German search matches, so
// it is German - with `ae` rather than an umlaut, which has no place in a path.

const LOCALHOST = process.env.LOCALHOST || "127.0.0.1"

const SHEETS = {
  slug: "dokumente",
  label: "Dokumente",
  i18n: "gallery:branch.sheets",
  // The document suffix the backend reports; the URL slug is the path without it.
  suffix: ".sheet",
  listUrl: () => `http://${LOCALHOST}:${process.env.PORT_SHEETS}/sheets/files`,
}

const PARTS = {
  slug: "bauteile",
  label: "Bauteile",
  i18n: "gallery:branch.parts",
  // /shapes/files reports the outward name (.shape); .part is a backend detail
  // that only ever appears inside the opaque handle.
  suffix: ".shape",
  listUrl: () => `http://${LOCALHOST}:${process.env.PORT_SHAPES}/shapes/files`,
}

// Display order, and the order the tree and the root page list them in.
const ALL = [SHEETS, PARTS]

function by(slug) {
  return ALL.find((b) => b.slug === slug) || null
}

module.exports = { SHEETS, PARTS, ALL, by }
