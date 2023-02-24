const puppeteer = require('puppeteer');
const fs = require('fs')


module.exports = {

  render: async (url, location) => {
    try {
      let browser = await puppeteer.launch()
      const page = await browser.newPage()

      await page.emulateMediaType('screen')
      await page.goto(url)
      await page.waitForFunction(() =>  mathMLdone === true)
      await page.setViewport({ width: 700, height: 990 });
      await page.screenshot({
        path: location,
      });
      await browser.close()
    }
    catch(e){
      console.log(e)
    }
  }
}
