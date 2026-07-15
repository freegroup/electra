// Tiny client to the `database` service, plus the opaque-handle codec.
//
// sheets is the intelligent layer between the generic Finder API (files.js) and
// the database scope model. This module is the ONLY place that knows the
// database URL, resolves the app-root scope, and encodes/decodes the opaque
// document handles the frontend passes around.
//
// A handle is base64url(JSON.stringify({ s: <scopeRef>, p: <docPath> })). The
// frontend treats it as opaque; only this module reads inside it.

const { pickAuthHeaders } = require("./utils/auth-headers")

class DatabaseError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

let BASE_URL = null       // e.g. "http://127.0.0.1:8095"
let APP_SCOPE_PATH = null // e.g. "electra/apps/sheets"
const scopeIdCache = new Map()

function init(conf) {
  BASE_URL = conf.database.replace(/\/+$/, "")
  APP_SCOPE_PATH = conf.appScopePath
}

// --- opaque handle codec ---------------------------------------------------

function encodeId(scopeRef, docPath) {
  const json = JSON.stringify({ s: String(scopeRef), p: docPath })
  return Buffer.from(json, "utf8").toString("base64url")
}

function decodeId(id) {
  let obj
  try {
    obj = JSON.parse(Buffer.from(String(id), "base64url").toString("utf8"))
  } catch {
    throw new DatabaseError(`invalid handle: ${id}`, 400)
  }
  if (!obj || typeof obj.s !== "string" || typeof obj.p !== "string") {
    throw new DatabaseError(`malformed handle: ${id}`, 400)
  }
  return { scopeRef: obj.s, path: obj.p }
}

// --- HTTP ------------------------------------------------------------------

// Low-level call. Returns the raw fetch Response (caller reads json/bytes).
async function raw(method, dbPath, { authHeaders = {}, body, rawBody, contentType } = {}) {
  if (!BASE_URL) throw new DatabaseError("db client not initialised", 500)
  const init = { method, headers: { ...authHeaders } }
  if (rawBody !== undefined) {
    if (contentType) init.headers["content-type"] = contentType
    init.body = rawBody
  } else if (body !== undefined) {
    init.headers["content-type"] = "application/json"
    init.body = JSON.stringify(body)
  }
  let res
  try {
    res = await fetch(BASE_URL + dbPath, init)
  } catch (err) {
    throw new DatabaseError(`network error to ${dbPath}: ${err.message}`, 502)
  }
  if (!res.ok) {
    let msg
    try {
      const j = await res.json()
      msg = j?.error?.message || res.statusText
    } catch {
      msg = res.statusText
    }
    throw new DatabaseError(`${method} ${dbPath}: ${msg}`, res.status)
  }
  return res
}

// JSON call — parses the response body.
async function call(method, dbPath, opts) {
  const res = await raw(method, dbPath, opts)
  const text = await res.text()
  return text ? JSON.parse(text) : {}
}

// --- app-root resolution ---------------------------------------------------

// Resolve the app-root scope path → scopeRef, cached.
async function appRootId(authHeaders) {
  if (scopeIdCache.has(APP_SCOPE_PATH)) return scopeIdCache.get(APP_SCOPE_PATH)
  const j = await call("GET", `/database/scopes/by-path?name=${encodeURIComponent(APP_SCOPE_PATH)}`, { authHeaders })
  scopeIdCache.set(APP_SCOPE_PATH, j.scopeRef)
  return j.scopeRef
}

module.exports = {
  DatabaseError,
  init,
  encodeId,
  decodeId,
  raw,
  call,
  appRootId,
  pickAuthHeaders,
}
