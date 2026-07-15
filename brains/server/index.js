const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const envFile = PROJECT_PATH+'/settings.ini' 

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })


const files = require("./files")
const db = require("./db")
const conf = require("./configuration")
const die = require("./utils/die")

db.init(conf)
console.log(`[brains] database at ${conf.database}, app scope "${conf.appScopePath}"`)


const PORT = process.env.PORT_BRAINS || die("missing env variable PORT_BRAINS");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");


// Tell the bodyparser middleware to accept more data
//
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

files.init(app)

// =======================================================================
//
// The main HTTP Server run loop. Serves the generic Finder API which maps
// to the database scope model.
//
// =======================================================================
async function  runServer() {
  // Start Server
  // "localhost" => Service ist nicht von ausserhalb aufrufbar.
  // Wichtig, da der Server eine public IP hat und man sonst diesen Server auch ohne den Ingress aufrufen könnte.
  http.listen(PORT, LOCALHOST, function () {
    console.log(`Starting /brains at http://${LOCALHOST}:${PORT}/brains`);
  });
}

runServer()
