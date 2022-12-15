#!/usr/bin/env node

const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const path = require("path")
const dotenv = require('dotenv')

const generator = require("./thumbnails")
const conf = require("./configuration")

const indexApi = require("./handler/index")
const globalApi = require("./handler/global")
const userApi = require("./handler/user")

console.log("serving data from :", conf.absoluteGlobalDataDirectory())


const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const scriptPath = path.dirname(__filename);


dotenv.config({ 
    debug: false,
    path: PROJECT_PATH+'/settings.ini' 
})

function die(msg){
    console.log(msg)
    process.exit(1)
}

const PORT = process.env.PORT_SHAPES || die("missing env variable PORT_SHAPES");

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

  http.listen(PORT, function () {
    console.log("============================================================================")
    console.log('| System is up and running on http://localhost:'+PORT+'/                    ');
    console.log("============================================================================")
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
