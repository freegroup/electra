#!/usr/bin/env node
//
// Second half of the one-shot conversion: the 72 figures of the manuscript,
// once per output format.
//
// The originals are Windows Metafiles from 2004 - a vector format no browser
// has ever displayed. Inkscape reads them and keeps the paths and the text, so
// the result is genuinely vector: sharp at any size, and still editable. That
// is a better position than the rest of the site is in, where the palette
// thumbnails are 1x rasters.
//
// Two derivations from the same source, on purpose: print wants heavier strokes
// and CMYK-safe blacks, the web wants contrast on a light panel. After this run
// they are independent files and may drift apart - that is the point.
//
// BOTH sides get SVG, not one SVG and one PDF. LaTeX cannot read SVG, but a
// figure you cannot open in Inkscape is a figure nobody will ever correct - and
// these are 2004 drawings that will need correcting. book/Makefile derives the
// PDFs that LaTeX wants, and only for the SVGs that actually changed.
//
// Naming comes from archive/media/figures.json, written by convert-book.js in
// document order, so image37.wmf reliably becomes abb-14 in both places.
//
//   node tools/convert-figures.js --check    report what would happen
//   node tools/convert-figures.js            convert

const fs = require("fs")
const path = require("path")
const os = require("os")
const { execFileSync } = require("child_process")

const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(ROOT, "archive/media")
const OUT_WEB = path.join(ROOT, "book/public/media")
const OUT_PRINT = path.join(ROOT, "print/media")

const INKSCAPE = process.env.INKSCAPE || "/Applications/Inkscape.app/Contents/MacOS/inkscape"
const CHECK = process.argv.includes("--check")

const figName = (no) => `abb-${String(no).padStart(2, "0")}`

// Inkscape uebernimmt die Maße des WMF und schreibt sie in Millimetern:
// width="9.07mm" fuer ein AND-Gatter. Im Browser sind das 34 Pixel, also ein
// Fleck - und weil kein viewBox dabei ist, laesst sich das per CSS auch nicht
// beheben: ohne viewBox hat das SVG kein skalierbares Koordinatensystem, eine
// groessere CSS-Breite beschneidet es nur.
//
// Also beides nachtragen: ein viewBox in den urspruenglichen Benutzereinheiten
// (ohne viewBox ist 1 Einheit = 1px, der Viewport also mm bei 96dpi), und
// width/height in Pixeln. Der Faktor haelt die Groessenverhaeltnisse des Buches
// untereinander - ein Gatter bleibt kleiner als ein ganzes Zaehlwerk - waehrend
// die Spaltenbreite im CSS nach oben deckelt.
const MM_TO_PX = 96 / 25.4
const DISPLAY_PX_PER_MM = 20

function scalable(svg) {
  const w = svg.match(/\swidth="([\d.]+)mm"/)
  const h = svg.match(/\sheight="([\d.]+)mm"/)
  if (!w || !h) return svg          // schon in px oder mit viewBox - nicht anfassen
  const mmW = parseFloat(w[1])
  const mmH = parseFloat(h[1])
  const box = ` width="${Math.round(mmW * DISPLAY_PX_PER_MM)}"`
            + ` height="${Math.round(mmH * DISPLAY_PX_PER_MM)}"`
            + ` viewBox="0 0 ${(mmW * MM_TO_PX).toFixed(3)} ${(mmH * MM_TO_PX).toFixed(3)}"`
  return (svg.slice(0, w.index) + box + svg.slice(w.index + w[0].length))
    .replace(/\sheight="[\d.]+mm"/, "")
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(path.join(SRC, "figures.json"), "utf8"))
  console.log(`${manifest.length} Abbildungen laut figures.json`)

  if (!fs.existsSync(INKSCAPE)) {
    console.log(`Inkscape nicht gefunden: ${INKSCAPE}`)
    console.log("Pfad ueber INKSCAPE= setzen.")
    process.exit(1)
  }

  const missing = manifest.filter((f) => !fs.existsSync(path.join(SRC, f.source)))
  if (missing.length) {
    console.log(`FEHL  ${missing.length} Quelldateien fehlen, z.B. ${missing[0].source}`)
    process.exit(1)
  }

  const vector = manifest.filter((f) => f.source.toLowerCase().endsWith(".wmf"))
  const raster = manifest.filter((f) => !f.source.toLowerCase().endsWith(".wmf"))
  console.log(`  ${vector.length} Vektor (wmf) -> svg, je einmal fuer Web und Druck`)
  console.log(`  ${raster.length} Raster       -> unveraendert kopiert`)
  if (CHECK) { console.log("\n--check: nichts geschrieben."); return }

  fs.mkdirSync(OUT_WEB, { recursive: true })
  fs.mkdirSync(OUT_PRINT, { recursive: true })
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "electra-figures-"))

  let done = 0
  const failed = []
  for (const f of manifest) {
    const name = figName(f.no)
    const ext = path.extname(f.source).toLowerCase()

    if (ext !== ".wmf") {
      fs.copyFileSync(path.join(SRC, f.source), path.join(OUT_WEB, name + ext))
      fs.copyFileSync(path.join(SRC, f.source), path.join(OUT_PRINT, name + ext))
      done++
      continue
    }

    // Inkscape names its output after the input, so the input is staged under
    // the target name and both formats fall out of one invocation.
    const staged = path.join(tmp, name + ".wmf")
    fs.copyFileSync(path.join(SRC, f.source), staged)
    try {
      execFileSync(INKSCAPE, ["--export-type=svg", staged], { stdio: "pipe" })
      const svg = scalable(fs.readFileSync(path.join(tmp, name + ".svg"), "utf8"))
      fs.writeFileSync(path.join(OUT_PRINT, name + ".svg"), svg)
      fs.writeFileSync(path.join(OUT_WEB, name + ".svg"), svg)
      done++
    } catch (err) {
      failed.push(`${name} (${f.source}): ${err.message.split("\n")[0]}`)
    }
    process.stdout.write(`\r  ${done + failed.length}/${manifest.length}`)
  }
  fs.rmSync(tmp, { recursive: true, force: true })

  console.log(`\n\n  umgewandelt: ${done}`)
  if (failed.length) {
    console.log(`  FEHLGESCHLAGEN: ${failed.length}`)
    failed.forEach((f) => console.log(`    ${f}`))
    process.exit(1)
  }

  // An empty SVG opens fine and shows nothing, which is the one failure mode
  // that survives a clean exit code.
  const empty = fs.readdirSync(OUT_WEB).filter((n) => n.endsWith(".svg"))
    .filter((n) => !/<(path|text|rect|image|circle|ellipse|polygon|polyline|line)\b/
      .test(fs.readFileSync(path.join(OUT_WEB, n), "utf8")))
  if (empty.length) {
    console.log(`  FEHL  ${empty.length} SVG ohne Zeicheninhalt: ${empty.join(", ")}`)
    process.exit(1)
  }
  console.log(`  alle SVG tragen Zeicheninhalt`)
  console.log(`\ngeschrieben nach:\n  ${OUT_WEB}\n  ${OUT_PRINT}`)
}

main()
