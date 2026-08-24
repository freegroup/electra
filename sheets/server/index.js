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
// Dev-machine overrides (e.g. PUPPETEER_EXECUTABLE_PATH for PDF rendering).
// dotenv does not overwrite already-set vars, so this only fills the gaps.
dotenv.config({  debug: false, path: PROJECT_PATH + '/settings.local.ini' })


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

// These are dynamic, per-user API responses (a document's content depends on
// the caller's walk-up and can change on every save/promote). They must never
// be cached: otherwise clicking the same id twice serves a stale document from
// the browser cache until a hard reload. Disable caching for the whole API.
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
  res.set("Pragma", "no-cache")
  res.set("Expires", "0")
  next()
})

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
