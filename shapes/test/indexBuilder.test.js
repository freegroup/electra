// The identifier a component is instantiated under is frozen: it sits in every
// stored circuit. This suite compares the new, document-based derivation against
// the catalogue the old directory-based generator produced, entry by entry.
// See Shapes-Rework.md §2.2 ("Die Ableitung Pfad -> Bezeichner darf sich nicht
// ändern") and §4.2.

const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const path = require("path")

const { build, identifierFor } = require("../server/indexBuilder")

const PROJECT = path.resolve(__dirname, "..", "..")
const LEGACY_CATALOG = path.join(PROJECT, "data/shapes/global/index.json")

const legacy = JSON.parse(fs.readFileSync(LEGACY_CATALOG, "utf-8"))

// The documents as the migration created them: the path without suffix, the
// parts in `data`. Rebuilt from the legacy catalogue so the comparison covers
// the real inventory rather than a handful of examples.
const docs = legacy.map((entry) => ({
  docPath: `${entry.fullName}.part`,
  scope: entry.scope,
  uuid: `uuid-${entry.name}`,
  data: {
    js: `// ${entry.name}`,
    // Only components that had a .shape file are "shape" in the old catalogue.
    ...(entry.type === "shape" ? { shape: "{geometry}" } : {}),
  },
}))

test("every identifier of the existing inventory is reproduced exactly", () => {
  assert.ok(legacy.length >= 100, `expected the real catalogue, got ${legacy.length}`)
  const wrong = legacy
    .map((entry) => ({ expected: entry.name, actual: identifierFor(`${entry.fullName}.part`) }))
    .filter((x) => x.expected !== x.actual)
  assert.deepEqual(wrong, [], "a differing identifier breaks every stored circuit using it")
})

test("the suffix is stripped, dashes and slashes become underscores", () => {
  assert.equal(
    identifierFor("digital/gate/IEC60617-12/AND.part"),
    "digital_gate_IEC60617_12_AND"
  )
})

test("the catalogue keeps the fields the palette reads", () => {
  const { catalog } = build(docs)
  assert.equal(catalog.length, legacy.length)

  const byName = new Map(catalog.map((e) => [e.name, e]))
  for (const old of legacy) {
    const now = byName.get(old.name)
    assert.ok(now, `missing entry ${old.name}`)
    for (const field of ["tags", "type", "scope", "baseName", "displayName", "basedir", "fullName"]) {
      assert.deepEqual(now[field], old[field], `${old.name}: ${field}`)
    }
  }
})

test("the image is addressed by uuid, no longer by path", () => {
  const { catalog } = build(docs)
  const entry = catalog[0]
  assert.ok(entry.uuid, "carries the version uuid")
  assert.equal(entry.imagePath, undefined,
    "a path cannot say which image belongs to the component once scopes overlap")
})

test("drawn and programmed components are told apart by the drawing", () => {
  const { catalog } = build(docs)
  const byName = new Map(catalog.map((e) => [e.name, e]))
  const counts = { shape: 0, code: 0 }
  for (const entry of catalog) counts[entry.type]++
  const legacyCounts = { shape: 0, code: 0 }
  for (const entry of legacy) legacyCounts[entry.type]++
  assert.deepEqual(counts, legacyCounts)
  assert.ok(legacyCounts.code > 0, "there are hand-written components")
  assert.equal(byName.get("digital_signal_VerticalBus").type, "code")
})

test("both artefacts come out of one pass, in the same order", () => {
  const { js, catalog } = build(docs)
  // The window-expose lines are emitted one per catalogue entry, in order —
  // an unambiguous witness that every catalogue name has a definition and that
  // both artefacts share one ordering.
  const exposed = [...js.matchAll(/window\["([^"]+)"\]/g)].map((m) => m[1])
  assert.deepEqual(exposed, catalog.map((e) => e.name),
    "one exposed class per catalogue entry, in the same order")
})

test("the bundle is an IIFE that survives being loaded twice", () => {
  // index.js is re-included on every document open; classic scripts share one
  // global lexical scope, so a top-level let/const/class would throw on the
  // second load. The IIFE wrapper gives each load its own scope.
  const { js } = build([
    { docPath: "a/WithHelper.part", scope: "apps", uuid: "u1",
      data: { js: "let a_WithHelperLocator = 1;\nvar a_WithHelper = { NAME: 'a_WithHelper' }" } },
  ])
  assert.match(js, /^;\(function \(\) \{/, "wrapped in an IIFE")
  assert.match(js, /\}\)\(\);/, "IIFE is invoked")
  // The figure is exposed to window; the helper stays inside.
  assert.match(js, /window\["a_WithHelper"\]/)
  assert.ok(!js.includes('window["a_WithHelperLocator"]'), "helpers are not globalised")

  // Concatenating two copies (a double include) must still parse.
  assert.doesNotThrow(() => new Function(js + "\n" + js), "two includes must not collide")
})

test("a component without code appears in neither artefact", () => {
  const { js, catalog } = build([
    { docPath: "a/Broken", scope: "global", uuid: "u1", data: { md: "no code" } },
    { docPath: "a/Fine", scope: "global", uuid: "u2", data: { js: "var fine = 1" } },
  ])
  assert.equal(catalog.length, 1)
  assert.equal(catalog[0].name, "a_Fine")
  assert.ok(!js.includes("Broken"))
})
