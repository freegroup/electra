#!/usr/bin/env node
//
// A regression net for the theme restructuring.
//
// The upcoming work moves ~640 rules out of the theme files into per-component
// files and replaces ~124 hardcoded colours with tokens. Both are supposed to be
// invisible: Classic must look exactly as it does today. A plain text diff of
// the compiled CSS cannot show that, because the file order changes and
// `#fff` becomes `rgb(var(--surface-base))`.
//
// So this reduces each app's stylesheet to what actually reaches the browser:
//
//   selector  ->  { property: value }
//
// with
//   - var(--x) resolved against the token table of the theme the selector
//     belongs to: a `[data-theme="modern"] …` rule is read with Modern's tokens
//     layered over :root, not with Classic's. Resolving everything against
//     :root still detects changes correctly, but prints Classic's values under
//     Modern's rules - and this output is what someone reads when deciding
//     whether a deviation is safe.
//   - colours normalised, so #fff / #FFFFFF / white / rgb(255,255,255) compare equal
//   - declarations within one selector applied in order (last wins), which is
//     what the cascade does anyway
//   - comments, whitespace and source order ignored
//
// A moved rule is therefore not a diff. A lost rule, a changed value or a
// dropped selector prefix is.
//
// What it does NOT catch: two different selectors swapping their relative order
// while both matching the same element. Keep the prefix `body.themed` intact and
// that cannot happen - which is exactly why the plan keeps it.
//
//   node tools/css-fingerprint.js            write .fingerprint/<app>.json
//   node tools/css-fingerprint.js --check    compare against the stored files
//
// Exit code 1 on any difference, so it can gate a build.

const { execFileSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const APPS = ["home", "simulator", "author", "designer"]
const OUT = path.join(ROOT, ".fingerprint")
const LESSC = path.join(ROOT, "home", "node_modules", ".bin", "lessc")

const NAMED = {
  white: "rgb(255,255,255)", black: "rgb(0,0,0)", red: "rgb(255,0,0)",
  gray: "rgb(128,128,128)", grey: "rgb(128,128,128)",
  lightgray: "rgb(211,211,211)", lightgrey: "rgb(211,211,211)",
  silver: "rgb(192,192,192)", transparent: "rgba(0,0,0,0)",
}

// #abc / #aabbcc / #aabbccdd -> rgb()/rgba(). Anything else is returned as-is.
function hexToRgb(hex) {
  let h = hex.slice(1)
  if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("")
  if (h.length !== 6 && h.length !== 8) return hex
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  if (h.length === 8) {
    const a = (parseInt(h.slice(6, 8), 16) / 255).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")
    return `rgba(${r},${g},${b},${a})`
  }
  return `rgb(${r},${g},${b})`
}

function normaliseValue(value, tokens) {
  let v = value

  // Resolve var(--x) and var(--x, fallback) against the token table. One level
  // is enough: the token layer is flat by design.
  for (let i = 0; i < 4; i++) {
    const before = v
    v = v.replace(/var\(\s*(--[\w-]+)\s*(?:,([^()]*))?\)/g, (m, name, fallback) => {
      if (tokens[name] !== undefined) return tokens[name]
      if (fallback !== undefined) return fallback.trim()
      return m
    })
    if (v === before) break
  }

  v = v.replace(/#[0-9a-fA-F]{3,8}\b/g, (m) => hexToRgb(m))
  v = v.replace(/\b[a-z]+\b/g, (m) => (NAMED[m] !== undefined ? NAMED[m] : m))
  v = v.replace(/\s*,\s*/g, ",").replace(/\s+/g, " ").trim()
  v = v.replace(/\brgba?\(([^)]*)\)/g, (m, inner) => {
    const p = inner.split(",").map((s) => s.trim())
    // rgba(r,g,b,1) renders identically to rgb(r,g,b)
    if (p.length === 4 && (p[3] === "1" || p[3] === "1.0")) return `rgb(${p[0]},${p[1]},${p[2]})`
    return m
  })
  return v.replace(/;$/, "").trim()
}

// Two scrubbed copies, both the same length as the original so offsets stay
// usable:
//
//   noComments - comments blanked, strings kept. Everything is sliced from
//                this. A comment must never reach the declaration splitter:
//                `/* sunken: a surface */` would otherwise have its colon
//                mistaken for the one in `--surface-sunken: 245,248,255`.
//   braceSafe  - additionally strings blanked, used only to find block
//                boundaries so a `{` inside a quoted value cannot derail it.
function scrub(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, (m) => " ".repeat(m.length))
  const braceSafe = noComments.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,
    (m) => " ".repeat(m.length))
  return { noComments, braceSafe }
}

function parse(css) {
  const { noComments, braceSafe } = scrub(css)
  const rules = []
  let depth = 0, selStart = 0, blockStart = -1
  const stack = []

  for (let i = 0; i < braceSafe.length; i++) {
    const c = braceSafe[i]
    if (c === "{") {
      if (depth === 0) { blockStart = i; stack.push(noComments.slice(selStart, i)) }
      depth++
    } else if (c === "}") {
      depth--
      if (depth === 0) {
        rules.push({ selector: stack.pop(), body: noComments.slice(blockStart + 1, i) })
        selStart = i + 1
      }
    }
  }
  return rules
}

// Collect every `--x: value` from the rules whose selector matches `test`.
function collectTokens(rules, test) {
  const t = {}
  for (const r of rules) {
    if (!test(r.selector.trim())) continue
    for (const d of r.body.split(";")) {
      const idx = d.indexOf(":")
      if (idx < 0) continue
      const prop = d.slice(0, idx).trim()
      if (prop.startsWith("--")) t[prop] = d.slice(idx + 1).trim()
    }
  }
  return t
}

function fingerprint(css) {
  const rules = parse(css)

  // One token table per theme. Resolving a themed selector against :root alone
  // would report Classic's values for Modern's rules - correct as a change
  // detector, but the printed before/after would be a lie, and this output is
  // what someone reads when deciding whether a deviation is safe.
  // Merge RAW and normalise afterwards, never the other way round. Classic
  // defines aliases like `--box-shadow-0: var(--elevation-0)`; normalising the
  // base table first would bake Classic's elevation into that alias, and
  // Modern's override of --elevation-0 would then arrive too late to be seen.
  // The rules would still be compared correctly, but every aliased token would
  // be PRINTED with Classic's value under a Modern selector.
  const baseRaw = collectTokens(rules, (s) => /(^|,)\s*:root\s*$/.test(s))
  const base = { ...baseRaw }
  for (const k of Object.keys(base)) base[k] = normaliseValue(base[k], base)

  const themes = {}
  for (const r of rules) {
    const m = r.selector.trim().match(/^\[data-theme="([^"]+)"\]\s*$/)
    if (m) themes[m[1]] = true
  }
  const themeTokens = {}
  for (const name of Object.keys(themes)) {
    const own = collectTokens(rules, (s) => s === `[data-theme="${name}"]`)
    const merged = { ...baseRaw, ...own }
    for (const k of Object.keys(merged)) merged[k] = normaliseValue(merged[k], merged)
    themeTokens[name] = merged
  }

  // Pick the table a selector should be read with.
  const tableFor = (sel) => {
    const m = sel.match(/\[data-theme="([^"]+)"\]/)
    return (m && themeTokens[m[1]]) || base
  }

  const map = {}
  for (const r of rules) {
    const body = r.body
    if (/^\s*@/.test(r.selector.trim())) continue // at-rules: out of scope

    for (const rawSel of r.selector.split(",")) {
      const sel = rawSel.replace(/\s+/g, " ").trim()
      if (!sel) continue
      const table = tableFor(sel)
      map[sel] = map[sel] || {}
      for (const d of body.split(";")) {
        const idx = d.indexOf(":")
        if (idx < 0) continue
        const prop = d.slice(0, idx).trim().replace(/\s+/g, " ")
        if (!prop || prop.startsWith("//")) continue
        // Custom properties are the plumbing, not the result. They are already
        // resolved into the values below, so counting them again would report
        // every newly introduced token as a change - exactly the noise this
        // tool exists to avoid.
        if (prop.startsWith("--")) continue
        map[sel][prop] = normaliseValue(d.slice(idx + 1), table)
      }
      if (Object.keys(map[sel]).length === 0) delete map[sel]
    }
  }
  return map
}

function compile(app) {
  const entry = path.join(ROOT, app, "public", "less", "index.less")
  return execFileSync(LESSC, [entry], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
}

function diff(oldMap, newMap) {
  const problems = []
  for (const sel of Object.keys(oldMap)) {
    if (!newMap[sel]) { problems.push(`SELEKTOR FEHLT   ${sel}`); continue }
    for (const p of Object.keys(oldMap[sel])) {
      if (!(p in newMap[sel])) problems.push(`REGEL FEHLT      ${sel} { ${p} }`)
      else if (newMap[sel][p] !== oldMap[sel][p])
        problems.push(`WERT GEAENDERT   ${sel} { ${p} }\n     vorher: ${oldMap[sel][p]}\n     jetzt:  ${newMap[sel][p]}`)
    }
  }
  for (const sel of Object.keys(newMap)) {
    if (!oldMap[sel]) { problems.push(`SELEKTOR NEU     ${sel}`); continue }
    for (const p of Object.keys(newMap[sel]))
      if (!(p in oldMap[sel])) problems.push(`REGEL NEU        ${sel} { ${p} }`)
  }
  return problems
}

const check = process.argv.includes("--check")
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

let failed = 0
for (const app of APPS) {
  const map = fingerprint(compile(app))
  const file = path.join(OUT, `${app}.json`)
  const rules = Object.keys(map).length
  const decls = Object.values(map).reduce((n, o) => n + Object.keys(o).length, 0)

  if (!check) {
    fs.writeFileSync(file, JSON.stringify(map, null, 1))
    console.log(`aufgenommen  ${app.padEnd(10)} ${rules} Selektoren, ${decls} Deklarationen`)
    continue
  }

  if (!fs.existsSync(file)) {
    console.error(`keine Referenz fuer ${app} - erst ohne --check laufen lassen`)
    failed = 1
    continue
  }
  const problems = diff(JSON.parse(fs.readFileSync(file, "utf8")), map)
  if (problems.length === 0) {
    console.log(`OK           ${app.padEnd(10)} ${rules} Selektoren, ${decls} Deklarationen`)
  } else {
    failed = 1
    // The tally is over ALL problems, the listing only over the first 40. Without
    // it a truncated list invites the conclusion that the rest looks the same.
    const kinds = {}
    let foreign = 0
    for (const p of problems) {
      const kind = p.split(/\s{2,}/)[0]
      kinds[kind] = (kinds[kind] || 0) + 1
      if (!/\[data-theme=/.test(p)) foreign++
    }
    const tally = Object.entries(kinds).map(([k, n]) => `${n}x ${k}`).join(", ")
    console.error(`\nABWEICHUNG   ${app}  (${problems.length}: ${tally})`)
    console.error(`             davon ohne [data-theme=…]: ${foreign}`)
    for (const p of problems.slice(0, 40)) console.error("   " + p)
    if (problems.length > 40) console.error(`   ... und ${problems.length - 40} weitere`)
  }
}
process.exit(failed)
