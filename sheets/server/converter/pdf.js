const fs = require('fs')
const { launch } = require('./launch')

module.exports = {

  render: async (url, headerText="", footerText="") => {
    try {
      const templateHeader = fs.readFileSync(__dirname+'/header.html', 'utf-8').replace("{headerText}",headerText)
      const templateFooter = fs.readFileSync(__dirname+'/footer.html', 'utf-8').replace("{footerText}",footerText)
    
      // --no-sandbox: the service may run as root / in a confined (snap-like)
      // environment where Chromium's sandbox can't initialise.
      let browser = await launch()

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

      browser.close()
      return pdf
    }
    catch(e){
      console.error(e)
    }
  }
}
