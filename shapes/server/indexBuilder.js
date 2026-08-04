// Builds the two shape artefacts from resolved documents instead of from a
// directory: index.js (the executable) and index.json (the palette catalogue).
// See Shapes-Rework.md §4.2, §4.3.
//
// Both come out of ONE pass over the same winner list. They must: the catalogue
// entry hands `View.js` the name it instantiates with `eval`, so a name in the
// catalogue that the bundle does not define under exactly that identifier is a
// red label instead of a component. Assembling them separately is how the two
// drifted apart in the first place.
//
// Input is what the walk-up resolved for one context — one entry per component:
//
//   { docPath, data: { js, shape?, custom?, md? }, uuid, scope }
//
// docPath is the document path including its suffix
// ("digital/gate/IEC60617-12/AND.part"); the members live in `data`, the preview
// is a blob addressed by `uuid`.

const path = require("path")

// Document suffix of a component, mirroring database/persistence/shipped.js.
// Consumers tell components apart by it, the way brains does with ".brain".
const SUFFIX = ".part"

// The path without the suffix — what the old generator called `fullName` and
// what every derived value is built from.
function baseOf(docPath) {
  return docPath.endsWith(SUFFIX) ? docPath.slice(0, -SUFFIX.length) : docPath
}

// Path -> the global identifier a component is declared and instantiated under.
//
// FROZEN. This exact derivation is baked into every stored circuit: draw2d
// serialises the figure type as this name, and View.js evals it back. Change a
// single character and no existing document opens again. Reproduced verbatim
// from the old generator (thumbnails.js concatFiles), which stripped the file
// extension for the same reason.
function identifierFor(docPath) {
  return baseOf(docPath).replace(/\//g, "_").replace(/-/g, "_")
}

// One catalogue entry, in the shape the palette has always received. `imagePath`
// is gone: which image belongs to a component is the same resolution as which
// code does, and a path cannot answer it once more than one scope is in play.
// The uuid names the exact version the entry was built from.
function catalogEntry(doc) {
  // Everything the palette reads is derived from the path WITHOUT the suffix —
  // that is what the directory-based generator used, and the values are compared
  // against its output in the tests.
  const base = baseOf(doc.docPath)
  const name = identifierFor(doc.docPath)
  return {
    name,
    tags: name.split("_"),
    // A component with a drawing was made in the designer; one without is
    // hand-written code that the designer cannot edit (Shapes-Rework.md §2.1).
    type: doc.data && doc.data.shape ? "shape" : "code",
    scope: doc.scope,
    baseName: `${path.basename(base)}.js`,
    displayName: path.basename(base),
    basedir: path.dirname(base),
    fullName: base,
    uuid: doc.uuid,
  }
}

// -> { js, catalog } for one context.
//
// `docs` must already be the resolved winner list — nearest to the user wins,
// exactly one entry per path. Nothing is merged or deduplicated here; that
// decision belongs to the walk-up, not to the artefact builder.
//
// The js is wrapped in an IIFE. index.js is fetched fresh on every document
// open (no cache — a promoted part must show up), and loadScript appends a new
// <script> each time. Classic scripts share ONE global lexical scope, so a
// top-level `let`/`const`/`class` (e.g. a shape's Locator helper) would throw
// "already declared" on the second load. Inside an IIFE every load gets a fresh
// scope, so re-loading is always safe. Only the figure classes the catalogue
// names are lifted onto `window`, which is exactly what a top-level `var NAME`
// used to do — so `eval("new NAME()")` and the draw2d reader still resolve them.
// Helper classes stay inside the IIFE and are reached through the figure's
// closure, so they need no global.
function build(docs) {
  const js = []
  const catalog = []
  for (const doc of docs) {
    const code = doc.data && doc.data.js
    // A component without code cannot be instantiated. Skipping it here would
    // leave a catalogue entry whose eval fails, so it is left out of both.
    if (!code) continue
    catalog.push(catalogEntry(doc))
    js.push(code)
  }

  if (!js.length) return { js: "", catalog }

  // Grab each figure class by name from inside the IIFE and publish it to window.
  // eval() runs in the IIFE scope, so it sees the local binding regardless of
  // whether it was declared with var/let/const/class.
  const expose = catalog
    .map((e) => `  try { window[${JSON.stringify(e.name)}] = eval(${JSON.stringify(e.name)}) } catch (e) {}`)
    .join("\n")

  const wrapped =
    ";(function () {\n" +
    js.join("\n\n\n") + "\n\n\n" +
    expose + "\n" +
    "})();\n"

  return { js: wrapped, catalog }
}

module.exports = { build, catalogEntry, identifierFor }
