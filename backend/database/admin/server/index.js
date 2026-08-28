// Database Admin Explorer — backend-for-frontend (BFF).
//
// A LOCALHOST-ONLY developer/ops tool for exploring and driving the database
// REST API. It is deliberately NOT registered in the public ingress: reach it
// via localhost or an SSH tunnel only.
//
// Two jobs:
//   1. Serve the static explorer UI from ./public.
//   2. Forward /admin/api/* to the database service on 127.0.0.1, translating
//      the browser's persona headers into the ingress-style identity headers
//      the DB expects (x-mail / x-role). The god-view calls (/admin/api/god/*)
//      get the DATABASE_ADMIN_TOKEN added here so the secret never touches the
//      browser.
//
// The DB itself has no dev-login: personas exist only as headers this BFF adds
// when calling on localhost.

const express = require("express")
const path = require("path")
const dotenv = require("dotenv")

// database/admin/server → repo root is three levels up.
const PROJECT_PATH = path.resolve(__dirname + "/../../../..")
const scriptPath = path.dirname(__filename)
dotenv.config({ debug: false, path: PROJECT_PATH + "/settings.ini" })
dotenv.config({ debug: false, path: PROJECT_PATH + "/secrets.ini" })
dotenv.config({ debug: false, path: PROJECT_PATH + "/settings.local.ini" })

function die(msg) {
  console.log(msg)
  process.exit(1)
}

const PORT = process.env.PORT_DB_ADMIN || die("missing env variable PORT_DB_ADMIN")
const PORT_DATABASE = process.env.PORT_DATABASE || die("missing env variable PORT_DATABASE")
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST")
const ADMIN_TOKEN = process.env.DATABASE_ADMIN_TOKEN || die("missing env variable DATABASE_ADMIN_TOKEN")

const DB_BASE = `http://${LOCALHOST}:${PORT_DATABASE}`

const app = express()

// Capture the raw body for every request so we can forward it verbatim
// (JSON documents and binary blob uploads alike).
app.use((req, res, next) => {
  const chunks = []
  req.on("data", (c) => chunks.push(c))
  req.on("end", () => {
    req.rawBody = chunks.length ? Buffer.concat(chunks) : null
    next()
  })
  req.on("error", next)
})

// Static UI.
app.use("/admin", express.static(scriptPath + "/../public"))

// ---------------------------------------------------------------------------
// API proxy
// ---------------------------------------------------------------------------
//
// Browser → BFF headers:
//   X-Persona-Email → x-mail   (the DB derives personRef = SHA-256(email))
//   X-Persona-Role  → x-role   (admin | user | anonym)
// Anything under /admin/api/god/* is a god-view call: it targets the DB's
// /database/admin/* endpoints and carries the X-Admin-Token.
async function forward(req, res) {
  const isGod = req.path.startsWith("/admin/api/god/")

  // Map the incoming path to a DB path.
  //   /admin/api/god/tree            → /database/admin/tree
  //   /admin/api/god/versions        → /database/admin/versions
  //   /admin/api/<rest>              → /database/<rest>
  let dbPath
  if (isGod) {
    dbPath = "/database/admin/" + req.path.slice("/admin/api/god/".length)
  } else {
    dbPath = "/database/" + req.path.slice("/admin/api/".length)
  }
  const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""
  const target = DB_BASE + dbPath + qs

  const headers = {}
  const ct = req.headers["content-type"]
  if (ct) headers["content-type"] = ct

  if (isGod) {
    headers["x-admin-token"] = ADMIN_TOKEN
  } else {
    // Translate persona headers into the DB's identity headers.
    const email = req.headers["x-persona-email"]
    const role = req.headers["x-persona-role"] || "user"
    if (email) headers["x-mail"] = String(email)
    headers["x-role"] = String(role)
  }

  const init = { method: req.method, headers }
  if (req.rawBody && req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.rawBody
  }

  try {
    const dbRes = await fetch(target, init)
    res.status(dbRes.status)
    const resType = dbRes.headers.get("content-type")
    if (resType) res.set("content-type", resType)
    const buf = Buffer.from(await dbRes.arrayBuffer())
    res.send(buf)
  } catch (err) {
    res.status(502).json({ error: { code: "bad_gateway", message: String(err) } })
  }
}

app.all("/admin/api/*", forward)

// Bind to localhost only — this tool must never be reachable from outside.
app.listen(PORT, LOCALHOST, () => {
  console.log(`Database Admin Explorer at http://${LOCALHOST}:${PORT}/admin/`)
  console.log(`  proxying to database at ${DB_BASE}`)
})
