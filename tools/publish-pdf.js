#!/usr/bin/env node
//
// Legt die gesetzte Fassung dort ab, wo die Website sie zum Herunterladen
// anbietet. Getrennt vom Satz selbst, damit `make` in print/ nichts ueber die
// Web-App wissen muss.
//
//   node tools/publish-pdf.js

const fs = require("fs")
const path = require("path")
const { execFileSync } = require("child_process")

const ROOT = path.resolve(__dirname, "..")
const FROM = path.join(ROOT, "print/grundkurs.pdf")
const TO = path.join(ROOT, "book/public/grundkurs-digitaltechnik.pdf")

if (!fs.existsSync(FROM)) {
  console.log(`nicht gefunden: ${FROM}\nzuerst: cd print && make`)
  process.exit(1)
}
fs.copyFileSync(FROM, TO)
const kb = Math.round(fs.statSync(TO).size / 1024)
console.log(`${path.relative(ROOT, TO)}  (${kb} KB)`)

// Die Titelseite als Vorschaubild neben dem Download. Aus dem PDF selbst, damit
// sie nicht auseinanderlaeuft - Grundkurs_deckel.tif aus dem Nachlass ist kein
// Umschlag, sondern ein Farbtestbogen der Druckerei.
const COVER = path.join(ROOT, "book/public/media/cover.jpg")
try {
  execFileSync("gs", ["-dNOPAUSE", "-dBATCH", "-sDEVICE=jpeg", "-dJPEGQ=85", "-r100",
                      "-dFirstPage=1", "-dLastPage=1", `-sOutputFile=${COVER}`, FROM],
               { stdio: "pipe" })
  console.log(`${path.relative(ROOT, COVER)}  (${Math.round(fs.statSync(COVER).size / 1024)} KB)`)
} catch (err) {
  console.log("Titelbild uebersprungen - ghostscript (gs) nicht gefunden.")
}
