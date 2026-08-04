const DEBUGGING = false

const puppeteer = require('puppeteer')
const path = require("path")
const fs = require("fs")
const glob = require("glob")
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
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

function fileToPackage(dataDirectory, file) {
  return file
    .replace(dataDirectory, "")
    .replace(/\.shape$/g, "")
    .replace(/-/g, "_")
    .replace(/\//g, "_");
}

function concatFiles(dataDirectory, scope) {
  console.log("generate index.js in: ",dataDirectory)
  return new Promise( (resolve, reject) => {
    try {
      let indexFile = path.join(dataDirectory, "index.js")
      let jsonFile = path.join(dataDirectory, "index.json")

      try {fs.unlinkSync(indexFile);} catch (exc) { /*ignore*/ }
      try {fs.unlinkSync(jsonFile);} catch (exc) { /*ignore*/ }
    
      let files = glob.sync(dataDirectory+"/**/*.js")
      let content = ""
      let list = []
      files.forEach( (filename)=>  {
        let relativePath = filename.replace(dataDirectory, "")
        let fullName = relativePath.replace(".js", "")
       
        let name = fullName.replace(/\//g , "_").replace(/-/g , "_")
        let baseDir = path.dirname(relativePath)
        let baseName = path.basename(relativePath)
        let displayName = path.basename(relativePath, ".js")

        // check if a *.shape" file exists. If yes, the shape is created in the designer. If not
        // the shape is created hand crafted
        //
        let isDesigner = fs.existsSync(path.join(dataDirectory,  fullName+".shape"))

        let tags = name.split("_")
        list.push({
          name: name,
          tags: tags,
          type: isDesigner?"shape":"code", 
          scope: scope,
          baseName: baseName,
          displayName: displayName,
          basedir: baseDir,
          fullName: fullName,
          imagePath:  fullName + ".png"
        });
        content += (fs.readFileSync(filename, 'utf8') + "\n\n\n")
      });
  
      fs.writeFileSync(jsonFile, JSON.stringify(list, undefined, 2))
      fs.writeFileSync(indexFile, content)
      resolve()
    }
    catch( exc){
      reject(exc)
    }
  })
}


module.exports = {

  generateShapeIndex: concatFiles,

  // Render the derived parts of a component from its .shape, WITHOUT touching the
  // filesystem. The designer saves only the .shape; this produces the .js, the
  // .custom source, the .md doc and the .png preview from it, the same way
  // thumbnail() does, but returns them for the caller to store as a .part
  // document instead of writing files next to the shape.
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
  },

  thumbnail:  (dataDirectory, shapeRelativePath) => {
    return new Promise(async (resolve, reject) => {
      let shapeAbsolutePath = path.normalize(dataDirectory + shapeRelativePath)
      console.log("shapeAbsolutePath: ", shapeAbsolutePath)
      try {
        let shapeCode = fs.readFileSync(shapeAbsolutePath,'utf8')
        let json = JSON.parse(shapeCode)
        let pkg = fileToPackage(dataDirectory, shapeAbsolutePath)
  
        json = json.draw2d
        json = JSON.stringify(json, undefined, 2)
  
        let code = fs.readFileSync(thisDir + "/template.js", 'utf8');
        let injectedCode =
          "let json=" + json + ";\n" +
          "let pkg='" + pkg + "';\n" +
          code;


        let launchOptions = DEBUGGING ?
          { headless: false, devtools: true,slowMo: 250}:
          { headless: true, args: [
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-setuid-sandbox",
          "--no-sandbox",
        ]}

        // Same override as the sheets converters (sheets/server/converter/launch.js):
        // puppeteer 19 downloads an x86_64 Chromium, which cannot be spawned on an
        // Apple-Silicon dev machine ("spawn Unknown system error -88" = EBADMACHO).
        // Point PUPPETEER_EXECUTABLE_PATH at a native Chrome/Chromium to override
        // the bundled build. Unset -> the bundled one is used, as before.
        if (process.env.PUPPETEER_EXECUTABLE_PATH) {
          launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
        }

        let browser = await puppeteer.launch(launchOptions)
  
        const page = await browser.newPage()
       
        page
          .on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
          .on('pageerror', ({ message }) => console.log(message))
          .on('response', response => console.log(`${response.status()} ${response.url()}`))
          .on('requestfailed', request =>  console.log(`${request.failure().errorText} ${request.url()}`))
         
        console.log("Navigate to: ", DESIGNER_URL)
        console.log("Chrome Version: ", await page.browser().version())
        await page.goto(DESIGNER_URL)
        await page.setViewport({width: 1500, height: 2024})
        await page.waitForFunction(() => { return 'app' in window && app != null })
        await page.mainFrame().evaluate(injectedCode)
        await page.waitForFunction(() => { return img !== null })
  
        let img = await page.evaluate(() => { return img });
        let jsCode = await page.evaluate(() => { return code });
        let customCode = await page.evaluate(() => { return customCode });
        let markdown = await page.evaluate(() => { return markdown });
  
        let pngRelativePath = shapeRelativePath.replace(/\.shape$/, ".png");
        let jsRelativePath = shapeRelativePath.replace(/\.shape$/, ".js");
        let customRelativePath = shapeRelativePath.replace(/\.shape$/, ".custom");
        let markdownRelativePath = shapeRelativePath.replace(/\.shape$/, ".md");
  
        let pngAbsolutePath = shapeAbsolutePath.replace(/\.shape$/, ".png");
        let jsAbsolutePath = shapeAbsolutePath.replace(/\.shape$/, ".js");
        let customAbsolutePath = shapeAbsolutePath.replace(/\.shape$/, ".custom");
        let markdownAbsolutePath = shapeAbsolutePath.replace(/\.shape$/, ".md");
  
        // replace the generated "testShape" with the real figure name
        //
        jsCode = jsCode.replace(/testShape/g, pkg);
        customCode = customCode.replace(/testShape/g, pkg);
  
        console.log("writing file to disc....", jsAbsolutePath)
        fs.writeFileSync(jsAbsolutePath, jsCode, 'utf8');
  
        console.log("writing file to disc....", customAbsolutePath)
        fs.writeFileSync(customAbsolutePath, customCode, 'utf8');
  
        console.log("writing file to disc....", markdownAbsolutePath)
        fs.writeFileSync(markdownAbsolutePath, markdown, 'utf8');
  
        console.log("writing file to disc....", pngAbsolutePath)
        fs.writeFileSync(pngAbsolutePath, Buffer.from(img, 'base64'), 'binary');
   
        if(!DEBUGGING) {
          browser.close()
        }
        console.log("resolve code generation")
        return resolve([
            { path: shapeRelativePath, content: Buffer.from(shapeCode).toString("base64") },
            { path: jsRelativePath, content: Buffer.from(jsCode).toString("base64") },
            { path: jsRelativePath, content: Buffer.from(jsCode).toString("base64") },
            { path: customRelativePath,content: Buffer.from(customCode).toString("base64") },
            { path: markdownRelativePath,content: Buffer.from(markdown).toString("base64") },
            { path: pngRelativePath, content: img}
            ])
      }
      catch(e){
        reject(e)
      }
    })
  }
}
