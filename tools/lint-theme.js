#!/usr/bin/env node
//
// Keeps the layer separation honest.
//
// The split only holds if it is checked. This codebase is the proof: the
// convention "structure here, colours there" existed, and 124 colour literals
// leaked into the structure layer anyway. A rule nobody verifies is a comment.
//
// Two rules, enforced:
//
//   less/layout/**    no colour literals
//                     -> everything themeable goes through var(--token)
//   less/themes/**    no layout properties
//                     -> a theme decides how something looks, never where it is
//
// And one rule that only warns: hardcoded font-size in less/layout/. There are
// 87 of them across 39 files, spread over nine sizes between 10px and 20px, and
// they cannot be fixed mechanically - each has to be mapped onto a step of a
// type scale that does not exist yet. Failing the build on them today would
// just get the whole linter switched off. They are counted on every run so the
// debt stays visible, and they become errors once the scale is in place.
//
// Escape hatch, because a rule with no exception gets switched off instead of
// followed. Put it on the same line and say why:
//
//   border-color: #d64545; /* theme-allow: review marker is intentionally
//                             the same in every theme */
//
//   node tools/lint-theme.js           report
//   node tools/lint-theme.js --quiet   only the summary, exit code carries it

const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const AREAS = ["common", "home", "simulator", "author", "designer"]

// Colour words that mean a decision was baked in. `transparent`, `currentColor`
// and `inherit` are the opposite of hardcoding, so they are fine.
const NAMED = new Set([
  "white", "black", "red", "green", "blue", "gray", "grey", "lightgray",
  "lightgrey", "darkgray", "darkgrey", "silver", "orange", "yellow", "purple",
  "pink", "brown", "navy", "teal", "olive", "maroon", "lime", "aqua", "fuchsia",
  "gold", "beige", "ivory", "coral", "salmon", "khaki", "orchid", "plum",
])

const LAYOUT_PROPS = /^(display|position|top|right|bottom|left|width|height|min-width|max-width|min-height|max-height|margin(-|$)|flex(-|$)|grid(-|$)|float|clear|overflow(-|$)|z-index|align-|justify-|gap|row-gap|column-gap|order|box-sizing)/

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".less")) out.push(p)
  }
  return out
}

// A whole file can be exempted from the layout-property rule with
//
//   /* theme-allow-file: <reason> */
//
// Per-line markers get noisy when a file has twenty violations, and twenty
// copies of the same reason is how an exception stops being read. One statement
// per file stays visible in review and greps as a to-do list. Exempted files
// are still counted and printed, so waiving is not the same as hiding.
function fileAllowed(src) {
  const m = src.match(/theme-allow-file\s*:\s*([^\n*]+)/)
  return m ? m[1].trim() : null
}

// Pull out declarations with their line number. LESS nests, so this walks the
// text rather than matching line patterns: a buffer ending in `;` is a
// declaration, a buffer ending in `{` was a selector.
function declarations(src) {
  const allow = new Set()
  src.split("\n").forEach((line, i) => {
    if (/theme-allow\s*:/.test(line)) allow.add(i + 1)
  })

  // Blank comments but keep length, so line numbers stay correct.
  const clean = src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/\/\/[^\n]*/g, (m) => " ".repeat(m.length))

  const out = []
  let buf = "", start = 0
  const lineAt = (idx) => clean.slice(0, idx).split("\n").length

  for (let i = 0; i < clean.length; i++) {
    const c = clean[i]
    if (c === "{" || c === "}") { buf = ""; start = i + 1; continue }
    if (c === ";") {
      const idx = buf.indexOf(":")
      if (idx > 0) {
        const line = lineAt(start)
        out.push({
          prop: buf.slice(0, idx).trim(),
          value: buf.slice(idx + 1).trim(),
          line,
          allowed: allow.has(line) || allow.has(lineAt(i)),
        })
      }
      buf = ""; start = i + 1
      continue
    }
    if (buf === "" && /\s/.test(c)) { start = i + 1; continue }
    buf += c
  }
  return out
}

function colourLiteralsIn(value) {
  // Data URIs and font stacks are full of hex-looking noise and quoted names.
  const v = value
    .replace(/url\([^)]*\)/gi, " ")
    .replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, " ")

  const found = []
  for (const m of v.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) found.push(m[0])
  for (const m of v.matchAll(/\b(?:rgba?|hsla?)\s*\(\s*[\d.]/gi)) found.push(m[0].trim())
  for (const m of v.matchAll(/\b[a-zA-Z]+\b/g)) if (NAMED.has(m[0].toLowerCase())) found.push(m[0])
  return found
}

const quiet = process.argv.includes("--quiet")
const problems = []   // fail the build
const warnings = []   // counted, not fatal - see the note at the top
const exempt   = []   // waived per file with theme-allow-file, still counted

for (const area of AREAS) {
  const base = path.join(ROOT, area, "public", "less")

  for (const file of walk(path.join(base, "layout"))) {
    for (const d of declarations(fs.readFileSync(file, "utf8"))) {
      if (d.allowed) continue
      const hits = colourLiteralsIn(d.value)
      if (hits.length)
        problems.push({ file, line: d.line, msg: `Farbliteral in layout/: ${d.prop}: ${hits.join(" ")}` })
      if (/^font-size$/.test(d.prop) && /^\s*[\d.]+(px|pt)\b/.test(d.value))
        warnings.push({ file, line: d.line, msg: `feste Schriftgroesse: ${d.value}` })
    }
  }

  for (const file of walk(path.join(base, "themes"))) {
    const src = fs.readFileSync(file, "utf8")
    const reason = fileAllowed(src)
    for (const d of declarations(src)) {
      if (d.allowed) continue
      if (d.prop.startsWith("--")) continue // tokens may hold any kind of value
      if (!LAYOUT_PROPS.test(d.prop)) continue
      const entry = { file, line: d.line, msg: `Layout-Eigenschaft in themes/: ${d.prop}: ${d.value}` }
      if (reason) exempt.push({ ...entry, reason })
      else problems.push(entry)
    }
  }
}

const rel = (f) => path.relative(ROOT, f)
if (!quiet) {
  const byFile = {}
  for (const p of problems) (byFile[rel(p.file)] = byFile[rel(p.file)] || []).push(p)
  for (const f of Object.keys(byFile).sort()) {
    console.log(`\n${f}`)
    for (const p of byFile[f]) console.log(`  ${String(p.line).padStart(4)}  ${p.msg}`)
  }
}

if (exempt.length) {
  const byReason = {}
  for (const e of exempt) (byReason[e.reason] = byReason[e.reason] || new Set()).add(rel(e.file))
  console.log("\nausgenommen (theme-allow-file):")
  for (const r of Object.keys(byReason))
    console.log(`  ${exempt.filter((e) => e.reason === r).length}x  ${[...byReason[r]].join(", ")}\n      ${r}`)
}

const debt = warnings.length
  ? `  (dazu ${warnings.length} feste Schriftgroessen in ${new Set(warnings.map((w) => w.file)).size} Dateien - Altlast, siehe Kopf der Datei)`
  : ""

if (problems.length === 0) {
  console.log(`lint:theme  keine Verstoesse${debt}`)
  process.exit(0)
}
console.log(`\nlint:theme  ${problems.length} Verstoesse in ${new Set(problems.map((p) => p.file)).size} Dateien${debt}`)
process.exit(1)
