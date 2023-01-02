#!/usr/bin/env node

const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const path = require("path")
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const scriptPath = path.dirname(__filename);
const envFile = PROJECT_PATH+'/settings.ini' 

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })


const generator = require("./thumbnails")
const conf = require("./configuration")
const indexApi = require("./handler/index")
const globalApi = require("./handler/global")
const userApi = require("./handler/user")

console.log("serving data from :", conf.absoluteGlobalDataDirectory())


function die(msg){
    console.log(msg)
    process.exit(1)
}

const PORT = process.env.PORT_SHAPES  || die("missing env variable PORT_SHAPES");

// Tell the bodyparser middleware to accept more data
//
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

indexApi.init(app)
globalApi.init(app)
userApi.init(app)

// =======================================================================
//
// The main HTTP Server and socket.io run loop. Serves the HTML files
// and the socket.io access point to change/read the GPIO pins if the server
// is running on an Raspberry Pi
//
// =======================================================================
async function  runServer() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Start Server
  // "localhost" => Service ist nicht von ausserhalb aufrufbar.
  // Wichtig, da der Server eine public IP hat und man sonst diesen Server auch ohne den Ingress aufrufen könnte.
  // Andere Lösung wäre "private network" + Loadbalancer. Die zusätzliche Infrastrcutur kostet aber wieder mehr.
  http.listen(PORT, "localhost", function () {
    console.log(`Starting /shapes at http://localhost:${PORT}/shapes`);
  });
}

generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
const { readdirSync } = require('fs')

const dirs =  readdirSync(conf.absoluteUserDataDirectory(), { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name)
dirs.forEach( (dir) => {
  generator.generateShapeIndex(path.join(conf.absoluteUserDataDirectory(), dir, "/"), "user")
})
runServer()
