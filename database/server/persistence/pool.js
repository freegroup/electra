const fs = require("fs")
const path = require("path")
const die = require("../utils/die")

// Loads env from settings.ini + secrets.ini once, following the pattern
// used by gamification/server/index.js.
const dotenv = require("dotenv")
const PROJECT_PATH = path.resolve(__dirname + "/../../..")
dotenv.config({ debug: false, path: PROJECT_PATH + "/settings.ini" })
dotenv.config({ debug: false, path: PROJECT_PATH + "/secrets.ini" })
// Local override for developer machines (git-ignored)
dotenv.config({ debug: false, path: PROJECT_PATH + "/settings.local.ini" })

const { Pool } = require("pg")

const host = process.env.PG_DATABASE_HOST || die("missing env variable PG_DATABASE_HOST")
const port = parseInt(process.env.PG_DATABASE_PORT || "5432", 10)
const database = process.env.PG_DATABASE_NAME || die("missing env variable PG_DATABASE_NAME")
const user = process.env.PG_DATABASE_USER || die("missing env variable PG_DATABASE_USER")
const password = process.env.PG_DATABASE_PWD || ""
const schema = process.env.PG_DATABASE_SCHEMA || "docstore"

// SSL is off by default - the local Docker postgres speaks plaintext. A managed
// server usually refuses an unencrypted connection ("no pg_hba.conf entry ...,
// no encryption"), so set PG_DATABASE_SSL=true there. Supplying a CA file also
// turns it on. Either way the certificate itself is not verified: the managed
// host presents a chain node cannot resolve, and pinning its CA would only move
// the problem to renewal day.
const sslCa = process.env.PG_DATABASE_SSL_CA
const sslOn = sslCa || process.env.PG_DATABASE_SSL === "true"
const ssl = sslOn
  ? { rejectUnauthorized: false, ...(sslCa ? { ca: fs.readFileSync(sslCa).toString() } : {}) }
  : false

const pool = new Pool({ host, port, database, user, password, ssl })

// Every new connection sets the search_path to our schema so subsequent
// queries need not qualify table names.
pool.on("connect", (client) => {
  client.query(`SET search_path TO "${schema}", public`)
})

module.exports = { pool, schema }
