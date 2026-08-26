const fs = require('fs')
const path = require('path')
const { launch } = require('./launch')

// Per-language chrome file (header.de.html, footer.en.html, ...), falling back
// to German when a language ships none. Each file bakes in its own static
// labels and layout, so date style / left-right can diverge per language.
function chromeTemplate(base, lang) {
  let file = path.join(__dirname, `${base}.${lang}.html`)
  if (!fs.existsSync(file)) {
    file = path.join(__dirname, `${base}.de.html`)
  }
  return fs.readFileSync(file, 'utf-8')
}

module.exports = {

  // Throws on failure. Swallowing here returned undefined, and the caller then
  // died on `pdf.length` - the real cause (e.g. Chrome not launching) was lost.
  render: async (url, { lang="de", headerText="", footerText="", headerBg="white" } = {}) => {
    const templateHeader = chromeTemplate('header', lang)
      .replace("{headerText}",headerText)
      .replace("{headerBg}",headerBg)
    const templateFooter = chromeTemplate('footer', lang)
      .replace("{footerText}",footerText)

    // --no-sandbox: the service may run as root / in a confined (snap-like)
    // environment where Chromium's sandbox can't initialise.
    const browser = await launch()
    try {
      const page = await browser.newPage()
      await page.emulateMediaType('screen')
      await page.goto(url)
      await page.waitForFunction(() =>  mathMLdone === true)
      const pdf = await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,
        printBackground: true,
        headerTemplate: templateHeader,
        footerTemplate: templateFooter,
        margin: {
          bottom: 70, // minimum required for footer msg to display
          left: 20,
          right: 25,
          top: 60,
        }
      });
      // puppeteer >=23 returns a Uint8Array, not a Buffer. Express res.send()
      // treats a non-Buffer as an object and JSON-serializes it (under the
      // application/pdf header) - a corrupt download. Normalize for every caller.
      return Buffer.from(pdf)
    }
    finally {
      // Always, not just on success - a failed render used to leak the browser.
      // Never let a close error mask the render error on its way out.
      await browser.close().catch(() => {})
    }
  }
}
