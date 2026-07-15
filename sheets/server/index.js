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


const files = require("./files")
const db = require("./db")
const pdfApi = require("./handler/pdf")
const conf = require("./configuration")
const die = require("./utils/die")

db.init(conf)
console.log(`[sheets] database at ${conf.database}, app scope "${conf.appScopePath}"`)

const PORT = process.env.PORT_SHEETS || die("missing env variable PORT_SHEETS");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");


// Tell the bodyparser middleware to accept more data
//
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

files.init(app)
pdfApi.init(app)

// =======================================================================
//
// The main HTTP Server. Serves the generic Finder API (files.js) mapped to
// the database scope model, plus the puppeteer-backed PDF export.
//
// =======================================================================
async function  runServer() {
  http.listen(PORT, LOCALHOST, function () {
    console.log(`Running /sheets on http://${LOCALHOST}:${PORT}/`);
  });
}

runServer()
