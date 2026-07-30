// Shared puppeteer launch options for the sheets converters (pdf, screenshot).
//
// Chromium comes from the project-local cache pinned in .puppeteerrc.cjs. On
// hosts where that bundled build can't run (e.g. an Apple-Silicon dev machine —
// puppeteer 19 fetches an x86_64 build), set PUPPETEER_EXECUTABLE_PATH to a
// native Chrome/Chromium to override it. --no-sandbox is needed when the
// service runs as root / in a confined environment.
const puppeteer = require("puppeteer")

function launch() {
  const opts = { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    opts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
  }
  return puppeteer.launch(opts)
}

module.exports = { launch }
