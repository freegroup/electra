const fs = require('fs')
const { launch } = require('./launch')

module.exports = {

  // Throws on failure. Swallowing here returned undefined, and the caller then
  // died on `pdf.length` - the real cause (e.g. Chrome not launching) was lost.
  render: async (url, headerText="", footerText="") => {
    const templateHeader = fs.readFileSync(__dirname+'/header.html', 'utf-8').replace("{headerText}",headerText)
    const templateFooter = fs.readFileSync(__dirname+'/footer.html', 'utf-8').replace("{footerText}",footerText)

    // --no-sandbox: the service may run as root / in a confined (snap-like)
    // environment where Chromium's sandbox can't initialise.
    const browser = await launch()
    try {
      const page = await browser.newPage()
      await page.emulateMediaType('screen')
      await page.goto(url)
      await page.waitForFunction(() =>  mathMLdone === true)
      return await page.pdf({
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
    }
    finally {
      // Always, not just on success - a failed render used to leak the browser.
      // Never let a close error mask the render error on its way out.
      await browser.close().catch(() => {})
    }
  }
}
