#!/usr/bin/env node

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
dotenv.config({  debug: false, path: envFile })


const pdfApi = require("./handler/pdf")
const sharedApi = require("./handler/shared")
const globalApi = require("./handler/global")
const userApi = require("./handler/user")
const conf = require("./configuration")
const die = require("./utils/die")

console.log("serving data from :", conf.absoluteGlobalDataDirectory())

const PORT = process.env.PORT_SHEETS || die("missing env variable PORT_SHEETS");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");


// Tell the bodyparser middleware to accept more data
//
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

pdfApi.init(app)
sharedApi.init(app)
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
  app.use('/shapes/global', express.static(conf.absoluteGlobalDataDirectory()));

  // Start Server
  // "localhost" => Service ist nicht von ausserhalb aufrufbar.
  // Wichtig, da der Server eine public IP hat und man sonst diesen Server auch ohne den Ingress aufrufen könnte.
  // Andere Lösung wäre "private network" + Loadbalancer. Die zusätzliche Infrastrcutur kostet aber wieder mehr.
  http.listen(PORT, LOCALHOST, function () {
    console.log(`Running /sheets on http://${LOCALHOST}:${PORT}/`);
  });
}


runServer()
