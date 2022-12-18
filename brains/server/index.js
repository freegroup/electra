const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
dotenv.config({ 
    debug: false,
    path: PROJECT_PATH+'/settings.ini' 
})


const globalApi = require("./data/global")
const userApi = require("./data/user")
const sharedApi = require("./data/shared")
const conf = require("./configuration")
const die = require("./utils/die")

console.log("serving data from :", conf.absoluteGlobalDataDirectory())


const PORT = process.env.PORT_BRAINS || die("missing env variable PORT_BRAINS");


// Tell the bodyparser middleware to accept more data
//
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

globalApi.init(app)
sharedApi.init(app)
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
  http.listen(PORT, "localhost", function () {
    console.log("============================================================================")
    console.log('| System is up and running on http://localhost:'+PORT+'/                    ');
    console.log("============================================================================")
  });
}

runServer()
