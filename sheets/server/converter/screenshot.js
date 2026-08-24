const { launch } = require('./launch')
const fs = require('fs')


module.exports = {

  // Throws on failure. Swallowing here wrote no file, and the caller then died
  // on a puzzling ENOENT instead of the real cause (e.g. Chrome not launching).
  render: async (url, location) => {
    const browser = await launch()
    try {
      const page = await browser.newPage()

      await page.emulateMediaType('screen')
      await page.goto(url)
      await page.waitForFunction(() =>  mathMLdone === true)
      await page.setViewport({ width: 700, height: 990 });
      await page.screenshot({
        path: location,
      });
    }
    finally {
      // Always, not just on success - a failed render used to leak the browser.
      // Never let a close error mask the render error on its way out.
      await browser.close().catch(() => {})
    }
  }
}
