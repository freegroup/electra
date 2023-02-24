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


function concatFiles(dataDirectory, scope) {
  console.log("generate index.json in: ",dataDirectory)
  return new Promise( (resolve, reject) => {
    try {
      let jsonFile = path.join(dataDirectory, "index.json")
      try {fs.unlinkSync(jsonFile);} catch (exc) { /*ignore*/ }
    
      let files = glob.sync(dataDirectory+"/**/*.sheet")
      let list = []
      files.forEach( (filename)=>  {
        let relativePath = filename.replace(dataDirectory, "")
        let fullName = relativePath.replace(".sheet", "")
        // ignore readme stuff
        if(relativePath.startsWith("readme/")){
          return
        }
       
        let name = fullName.replace(/\//g , "_").replace(/-/g , "_")
        let baseDir = path.dirname(relativePath)
        let baseName = path.basename(relativePath)
        let displayName = path.basename(relativePath, ".sheet")

        let tags = name.split("_")
        list.push({
          name: name,
          tags: tags,
          scope: scope,
          baseName: baseName,
          displayName: displayName,
          basedir: baseDir,
          fullName: fullName,
          imagePath:  fullName + ".png"
        });
      });
  
      fs.writeFileSync(jsonFile, JSON.stringify(list, undefined, 2))
      resolve()
    }
    catch( exc){
      reject(exc)
    }
  })
}

module.exports = {

  generateIndex: concatFiles,

}
