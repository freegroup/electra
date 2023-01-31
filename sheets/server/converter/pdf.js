const puppeteer = require('puppeteer');
const fs = require('fs')


module.exports = {

  render: async (url) => {
    try {
      const templateHeader = fs.readFileSync(__dirname+'/header.html', 'utf-8')
      const templateFooter = fs.readFileSync(__dirname+'/footer.html', 'utf-8')
    
      let browser = await puppeteer.launch()
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
      console.log(e)
    }
  }
}
