#!/usr/bin/env node
//
// One-shot helper for the theme restructuring: cuts the first-level blocks out
// of a `body.themed { … }` block and writes them into per-component files.
//
// Not a general LESS tool. It exists so the move is reproducible and reviewable
// instead of 47 hand edits, and so it can be re-run after a mistake. Delete it
// once the restructuring is done.
//
// A block is cut from segment boundary to segment boundary - from just after
// the previous block's closing brace up to and including its own - so the
// selector AND any comment written above it travel with the rule. Slicing from
// the selector alone is what dropped `a {` to a bare `{` on the first attempt.
//
//   node tools/split-theme.js <file.less> <targetDir> <mapping.json>

const fs = require("fs")
const path = require("path")

const [, , srcFile, targetDir, mapFile] = process.argv
if (!srcFile || !targetDir || !mapFile) {
  console.error("usage: split-theme.js <file.less> <targetDir> <mapping.json>")
  process.exit(2)
}

const src = fs.readFileSync(srcFile, "utf8")
const MAP = JSON.parse(fs.readFileSync(mapFile, "utf8"))

const WRAPPER = "body.themed {"
const at = src.indexOf(WRAPPER)
if (at < 0) { console.error(`no '${WRAPPER}' in ${srcFile}`); process.exit(2) }

// Find the matching closing brace of the wrapper.
let depth = 0, wrapEnd = -1
for (let i = at + WRAPPER.length - 1; i < src.length; i++) {
  if (src[i] === "{") depth++
  else if (src[i] === "}") { depth--; if (depth === 0) { wrapEnd = i; break } }
}
const inner = src.slice(at + WRAPPER.length, wrapEnd)

// Cut first-level blocks. segStart walks forward past each closing brace.
const blocks = []
depth = 0
let segStart = 0
for (let i = 0; i < inner.length; i++) {
  if (inner[i] === "{") {
    if (depth === 0) {
      // selector = last non-empty line of the segment, comments excluded
      const seg = inner.slice(segStart, i)
      const lines = seg.split("\n").map((l) => l.trim()).filter(Boolean)
      const sel = lines.length ? lines[lines.length - 1] : ""
      blocks.push({ sel, start: segStart })
    }
    depth++
  } else if (inner[i] === "}") {
    depth--
    if (depth === 0) {
      const b = blocks[blocks.length - 1]
      b.text = inner.slice(b.start, i + 1)
      segStart = i + 1
    }
  }
}

// Strip one level of indentation (the wrapper's), preserving relative depth.
function dedent(text) {
  const lines = text.replace(/^\n+/, "").replace(/\s+$/, "").split("\n")
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length)
  const cut = indents.length ? Math.min(...indents) : 0
  return lines.map((l) => l.slice(cut)).join("\n")
}

const groups = new Map()
const unmapped = []
for (const b of blocks) {
  const target = MAP[b.sel]
  if (!target) { unmapped.push(b.sel); continue }
  if (!groups.has(target)) groups.set(target, [])
  groups.get(target).push(dedent(b.text))
}

if (unmapped.length) {
  console.error("kein Ziel fuer:\n  " + unmapped.join("\n  "))
  process.exit(1)
}

fs.mkdirSync(targetDir, { recursive: true })
for (const [name, texts] of groups) {
  fs.writeFileSync(path.join(targetDir, `${name}.less`), texts.join("\n\n") + "\n")
}

// What is left of the source file: everything before the wrapper, plus anything
// after its closing brace. Usually that is the file dissolving entirely.
const rest = (src.slice(0, at) + src.slice(wrapEnd + 1)).trim()
console.log(`${blocks.length} Bloecke -> ${groups.size} Dateien in ${targetDir}`)
for (const [n, t] of [...groups].sort()) console.log(`   ${n}.less (${t.length})`)
console.log(`\nRest in ${path.basename(srcFile)}: ${rest ? rest.split("\n").length + " Zeilen" : "leer"}`)
fs.writeFileSync(srcFile + ".rest", rest + (rest ? "\n" : ""))
