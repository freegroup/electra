const DEBUGGING = false

const puppeteer = require('puppeteer')
const path = require("path")
const fs = require("fs")
const glob = require("glob")

const conf = require("./configuration")

const thisDir = path.normalize(__dirname)

const version =  process.env.VERSION || "local-version"
const DESIGNER_URL =  process.env.DESIGNER_URL || "http://localhost:3000"
const IN_K8S = process.env.KUBERNETES_SERVICE_HOST? true : false

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
        let basenamePath = relativePath.replace(".js", "")
       
        let name = basenamePath.replace(/\//g , "_").replace(/-/g , "_")
        let basename = relativePath.split('/').pop()
        let displayName = basename.replace(".js", "")
        let tags = name.split("_")
        list.push({
          name: name,
          tags: tags,
          scope: scope,
          version: version,
          basename: basename,
          displayName: displayName,
          basedir: relativePath.substring(0, relativePath.lastIndexOf('/')),
          shapePath:  basenamePath + ".shape",
          imagePath:  basenamePath + ".png"
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

        let browser = null
        if (IN_K8S) {
          console.log("Running in K8S environment")
          browser = await puppeteer.launch({ headless: true, args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox",
          ], executablePath:'chromium-browser'})
        }
        else {
          browser = await puppeteer.launch( DEBUGGING ? { headless: false, devtools: true,slowMo: 250}: {})
        }
  
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
        jsCode = jsCode.replace(/\$\{VERSION\}/g, version);
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
