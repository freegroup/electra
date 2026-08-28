const DEBUGGING = false

const puppeteer = require('puppeteer')
const path = require("path")
const fs = require("fs")
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const envFile = PROJECT_PATH+'/settings.ini' 

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })
// Optional, not in git: machine-local values that must not reach the server,
// e.g. PUPPETEER_EXECUTABLE_PATH on a dev machine. Same order as the database
// service. dotenv keeps the first value it sees, so this can only add keys that
// settings.ini does not define - it never overrides the shared config.
dotenv.config({ debug: false, path: PROJECT_PATH + '/settings.local.ini' })


const thisDir = path.normalize(__dirname)

const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const DESIGNER_URL =  `http://localhost:${PORT_INGRESS}/designer`

module.exports = {

  // Render the derived parts of a component from its .shape, WITHOUT touching the
  // filesystem. The designer saves only the .shape; this produces the .js, the
  // .custom source, the .md doc and the .png preview from it, and returns them
  // for the caller to store as a .part document.
  //
  //   shapeContent  the raw .shape JSON (string)
  //   identifier    the global name the figure is declared under
  //                 (e.g. "digital_gate_IEC60617_12_AND")
  //
  // -> { js, custom, md, pngBase64 }
  renderParts: (shapeContent, identifier) => {
    return new Promise(async (resolve, reject) => {
      let browser
      try {
        let json = JSON.parse(shapeContent).draw2d
        json = JSON.stringify(json, undefined, 2)

        let code = fs.readFileSync(thisDir + "/template.js", "utf8")
        let injectedCode =
          "let json=" + json + ";\n" +
          "let pkg='" + identifier + "';\n" +
          code

        let launchOptions = DEBUGGING
          ? { headless: false, devtools: true, slowMo: 250 }
          : { headless: true, args: [
              "--disable-gpu", "--disable-dev-shm-usage",
              "--disable-setuid-sandbox", "--no-sandbox",
            ] }
        if (process.env.PUPPETEER_EXECUTABLE_PATH) {
          launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
        }

        browser = await puppeteer.launch(launchOptions)
        const page = await browser.newPage()
        page.on("pageerror", ({ message }) => console.log(message))

        await page.goto(DESIGNER_URL)
        await page.setViewport({ width: 1500, height: 2024 })
        await page.waitForFunction(() => "app" in window && app != null)
        await page.mainFrame().evaluate(injectedCode)
        await page.waitForFunction(() => img !== null)

        let img = await page.evaluate(() => img)
        let jsCode = await page.evaluate(() => code)
        let customCode = await page.evaluate(() => customCode)
        let markdown = await page.evaluate(() => markdown)

        // The template renders under the placeholder name "testShape"; swap in
        // the real identifier so the figure is declared and instantiated by it.
        jsCode = jsCode.replace(/testShape/g, identifier)
        customCode = customCode.replace(/testShape/g, identifier)

        resolve({ js: jsCode, custom: customCode, md: markdown, pngBase64: img })
      } catch (err) {
        reject(err)
      } finally {
        if (browser && !DEBUGGING) browser.close()
      }
    })
  }
}
