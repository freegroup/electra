// Tiny client to the internal `database` service.
//
// userinfo is the account-scoped BFF: it fronts the generic scope model for
// browser callers so `/database` never has to be exposed by the ingress. This
// module is the only place that knows the database URL and forwards the caller's
// auth headers so `database` sees who is asking.

const { pickAuthHeaders } = require("./utils/auth-headers")

class DatabaseError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

let BASE_URL = null // e.g. "http://127.0.0.1:8095"

function init(conf) {
  BASE_URL = conf.database.replace(/\/+$/, "")
}

// Low-level call. Returns the raw fetch Response (caller reads json/bytes).
async function raw(method, dbPath, { authHeaders = {}, body } = {}) {
  if (!BASE_URL) throw new DatabaseError("db client not initialised", 500)
  const init = { method, headers: { ...authHeaders } }
  if (body !== undefined) {
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

module.exports = { DatabaseError, init, raw, call, pickAuthHeaders }
