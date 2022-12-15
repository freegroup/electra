const puppeteer = require('puppeteer');

module.exports = {

  render: async (url) => {
    console.log(url)
    try {
      let browser = await puppeteer.launch()

      const page = await browser.newPage()
      await page.goto(url)
      await page.waitForFunction(() =>  mathMLdone === true)
      const pdf = await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,
        printBackground: true,
        footerTemplate: `
          <div style="color: lightgray; border-top: solid lightgray 1px; font-size: 10px; padding-top: 5px; text-align: center; width: 100%;">
            Document created with <a style="color: #C71D3D;" href="http://www.electra.academy/" target="_blank">Electra Academy</a> and the powerful <a style="color: #C71D3D;" href="https://github.com/freegroup/draw2d" target="_blank">Draw2D</a> library
          </div>
        `,
        margin: {
          bottom: 70, // minimum required for footer msg to display
          left: 25,
          right: 35,
          top: 30,
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
