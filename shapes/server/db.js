// Minimal client to the `database` service, for the shape index.
//
// Deliberately small: unlike brains/sheets this service does not write
// documents, it only reads the components resolved for one context. It needs
// the handle codec (to learn which scope a context belongs to) and one GET.
//
// A handle is base64url(JSON.stringify({ s: <scopeRef>, p: <docPath> })) - the
// same codec brains and sheets use, so a handle minted there is readable here.

const die = require("./utils/die")

// Document suffix of a component; mirrors database/persistence/shipped.js.
const PART_SUFFIX = ".part"

const BASE_URL = (process.env.PORT_DATABASE
  ? `http://${process.env.LOCALHOST || "127.0.0.1"}:${process.env.PORT_DATABASE}`
  : die("missing env variable PORT_DATABASE")).replace(/\/+$/, "")

class DatabaseError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
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

// The inverse of decodeId — the same codec brains/sheets use, so a handle this
// service mints opens in the others.
function encodeId(scopeRef, docPath) {
  return Buffer.from(JSON.stringify({ s: String(scopeRef), p: docPath }), "utf8")
    .toString("base64url")
}

// Forward the caller's identity, so the database applies the same read rules it
// would for any other request. The index is per person, not per server.
function pickAuthHeaders(req) {
  if (!req || typeof req.get !== "function") return {}
  const headers = {}
  for (const k of ["x-role", "x-mail", "x-hash", "x-picture", "x-name"]) {
    const v = req.get(k)
    if (v) headers[k] = v
  }
  return headers
}

// Raw GET — the caller reads the response itself. Used for binary payloads
// (a preview blob), where parsing to JSON would be wrong.
async function raw(dbPath, authHeaders = {}) {
  let res
  try {
    res = await fetch(BASE_URL + dbPath, { method: "GET", headers: { ...authHeaders } })
  } catch (err) {
    throw new DatabaseError(`network error to ${dbPath}: ${err.message}`, 502)
  }
  if (!res.ok) {
    throw new DatabaseError(`GET ${dbPath}: ${res.statusText}`, res.status)
  }
  return res
}

// Raw PUT of a binary body — the counterpart of raw() for uploading a blob.
async function putRaw(dbPath, body, contentType, authHeaders = {}) {
  let res
  try {
    res = await fetch(BASE_URL + dbPath, {
      method: "PUT",
      headers: { ...authHeaders, "content-type": contentType },
      body,
    })
  } catch (err) {
    throw new DatabaseError(`network error to ${dbPath}: ${err.message}`, 502)
  }
  if (!res.ok) {
    throw new DatabaseError(`PUT ${dbPath}: ${res.statusText}`, res.status)
  }
  return res
}

async function call(method, dbPath, { authHeaders = {}, body } = {}) {
  let res
  try {
    const init = { method, headers: { ...authHeaders } }
    if (body !== undefined) {
      init.headers["content-type"] = "application/json"
      init.body = JSON.stringify(body)
    }
    res = await fetch(BASE_URL + dbPath, init)
  } catch (err) {
    throw new DatabaseError(`network error to ${dbPath}: ${err.message}`, 502)
  }
  if (!res.ok) {
    let msg
    try {
      msg = (await res.json())?.error?.message || res.statusText
    } catch {
      msg = res.statusText
    }
    throw new DatabaseError(`${method} ${dbPath}: ${msg}`, res.status)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : {}
}

// Every component visible from `scopeRef`, one per path, already resolved by the
// walk-up: own leaf before shared, nearer level before farther, higher version
// last. ONE query for the whole tree - see Shapes-Rework.md §4.2. The suffix
// filter runs in the database, so no circuit's data comes along for the ride.
async function partsInScope(scopeRef, authHeaders) {
  const j = await call(
    "GET",
    `/database/scopes/${encodeURIComponent(scopeRef)}/docs` +
      `?suffix=${encodeURIComponent(PART_SUFFIX)}&_=${Date.now()}`,
    { authHeaders }
  )
  return j.docs || []
}

// A scope by its path, or null when it does not exist. Cached: these two paths
// never change while the service runs.
const scopeIdCache = new Map()
async function scopeIdByPath(scopePath, authHeaders) {
  if (scopeIdCache.has(scopePath)) return scopeIdCache.get(scopePath)
  try {
    const j = await call(
      "GET",
      `/database/scopes/by-path?name=${encodeURIComponent(scopePath)}`,
      { authHeaders }
    )
    if (j.scopeRef) scopeIdCache.set(scopePath, j.scopeRef)
    return j.scopeRef || null
  } catch (err) {
    if (err.statusCode === 404) return null
    throw err
  }
}

// The shared root every signed-in person belongs to (electra/content/apps).
function appsScopeId(authHeaders) {
  return scopeIdByPath(`${process.env.SCOPE_PREFIX || ""}/apps`, authHeaders)
}

// The content root (electra/content) — parent of apps and users. The finder
// globs from here so a member sees ALL their components in one view: shared,
// personal copies, and any sub-workspaces they belong to.
function contentRootId(authHeaders) {
  return scopeIdByPath(process.env.SCOPE_PREFIX || "", authHeaders)
}

// The caller's personal workspace (electra/content/users/<email>), or null when
// nobody is signed in.
function personalWorkspaceId(authHeaders) {
  const mail = authHeaders["x-mail"]
  if (!mail) return null   // anonymous: no personal workspace
  return scopeIdByPath(`${process.env.SCOPE_PREFIX || ""}/users/${mail}`, authHeaders)
}

// THE resolution for the component index, and the only place where two sources
// are combined.
//
// The walk-up covers the context's chain, but a component invented from scratch
// lands in the caller's personal workspace, which is a sibling of that chain -
// it would be listed in the finder and yet be unusable in any circuit. So the
// index looks there as well.
//
// This union exists for USING components and nowhere else. It must not leak into
// the general document listing: /brains/files and the Shared view would suddenly
// show documents out of users/<email>, and the separation the finder rests on
// would be gone. Editing a component still goes through the finder as usual.
//
// Nearer to the user wins, the same direction the walk-up and the concatenation
// of index.js have always had. Both artefacts are built from THIS list, so they
// cannot disagree - the failure that Schritt 0 had to repair.
// `scopeRef` null means "no document yet" — a brand-new one. Its components are
// those of the scope the caller works in, which for now is the shared root.
async function resolveComponents(scopeRef, authHeaders) {
  const personalId = await personalWorkspaceId(authHeaders)

  if (scopeRef === null) {
    const appsId = await appsScopeId(authHeaders)
    if (!appsId) return []
    scopeRef = appsId
  }

  // The personal workspace is storage, not a scope anyone works in: its chain
  // runs through `users` and never past `apps`, so resolving against it yields
  // nothing at all. A document lying there is worked on in a scope, and for now
  // that is the shared root. Once someone works in several scopes this becomes
  // "the scope last chosen" — a different value, not a different rule.
  let effective = scopeRef
  if (personalId && String(personalId) === String(scopeRef)) {
    effective = await appsScopeId(authHeaders)
    if (!effective) return []
  }

  const shared = await partsInScope(effective, authHeaders)
  if (!personalId) return shared

  const own = await partsInScope(personalId, authHeaders)
  if (!own.length) return shared

  const byPath = new Map(shared.map((d) => [d.path, d]))
  for (const doc of own) byPath.set(doc.path, doc)
  return [...byPath.values()]
}

module.exports = { DatabaseError, decodeId, encodeId, pickAuthHeaders, call, raw, putRaw, resolveComponents, appsScopeId, contentRootId, personalWorkspaceId, PART_SUFFIX }
