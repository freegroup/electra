// Database-backed persistence adapter for brains.
//
// Implements the same PersistenceInterface as filesystem-adapter, but talks
// HTTP to the `database` service (default http://127.0.0.1:8095).
//
// Tenant conventions (brains ↔ database):
//   "global"       → scope electra/apps/brains          (root-level app content)
//   "user:<hash>"  → scope electra/users/<hash>         (private per-user scope)
//   "shared"       → NOT a scope; publicId-based read of /database/public/:id
//
// All methods take an extra `authHeaders` object with the ingress-injected
// headers (x-role, x-mail, x-hash, ...) which are forwarded to the database
// service. FileSystemAdapter ignores this parameter.
//
// Returns are ReadableStreams to match the existing PersistenceInterface
// contract — even for JSON payloads.

const { Readable } = require("stream")
const PersistenceInterface = require("./persistence-interface")

class DatabaseError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

// Wrap any object / string / Buffer into a Readable stream.
function toStream(data) {
  if (Buffer.isBuffer(data)) return Readable.from(data)
  if (typeof data === "object" && data !== null) return Readable.from(JSON.stringify(data))
  return Readable.from(String(data))
}

// Minimal doc-path validation: no traversal, no control chars, no absolute.
function validateDocPath(p) {
  if (typeof p !== "string" || p.length === 0) {
    throw new DatabaseError("doc path must be a non-empty string", 400)
  }
  if (p.includes("..") || p.startsWith("/") || /[\x00-\x1f]/.test(p)) {
    throw new DatabaseError(`invalid doc path: ${p}`, 400)
  }
}

class DatabaseAdapter extends PersistenceInterface {
  /**
   * @param {Object} config
   * @param {string} config.baseUrl        e.g. "http://127.0.0.1:8095"
   * @param {string} config.appScopePath   e.g. "electra/apps/brains"
   * @param {string} config.usersScopePath e.g. "electra/users"
   */
  constructor(config) {
    super()
    this.baseUrl = config.baseUrl.replace(/\/+$/, "")
    this.appScopePath = config.appScopePath
    this.usersScopePath = config.usersScopePath

    // Cache: string key → scope id. Filled lazily; stable per DB.
    this._scopeIdCache = new Map()
  }

  getName() {
    return "DatabaseAdapter"
  }

  // --------------------------------------------------------------------
  // HTTP helpers
  // --------------------------------------------------------------------

  async _fetch(method, url, { authHeaders = {}, body, rawBody, contentType } = {}) {
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
      res = await fetch(this.baseUrl + url, init)
    } catch (err) {
      throw new DatabaseError(`network error to ${url}: ${err.message}`, 502)
    }
    if (!res.ok) {
      let msg
      try {
        const j = await res.json()
        msg = j?.error?.message || res.statusText
      } catch {
        msg = res.statusText
      }
      throw new DatabaseError(`${method} ${url}: ${msg}`, res.status)
    }
    return res
  }

  // Resolve human path → scope id via /database/scopes/by-path. Cached.
  async _resolveScopePathToId(scopePath, authHeaders) {
    if (this._scopeIdCache.has(scopePath)) return this._scopeIdCache.get(scopePath)
    const res = await this._fetch(
      "GET",
      `/database/scopes/by-path?path=${encodeURIComponent(scopePath)}`,
      { authHeaders }
    )
    const { id } = await res.json()
    this._scopeIdCache.set(scopePath, id)
    return id
  }

  // Return the scope id for a brains tenant. Handles "global" and "user:*".
  // "shared" has no scope — callers must handle it separately.
  async _scopeIdForTenant(tenant, authHeaders) {
    if (tenant === "global") {
      return this._resolveScopePathToId(this.appScopePath, authHeaders)
    }
    if (tenant.startsWith("user:")) {
      const hash = tenant.slice("user:".length)
      const cacheKey = `user:${hash}`
      if (this._scopeIdCache.has(cacheKey)) return this._scopeIdCache.get(cacheKey)

      // Ensure the user has a leaf under electra/users/. addMember is
      // idempotent and returns the leafId. The database's transitive-
      // membership rule (§4.1) then makes the user a member of every
      // ancestor without further work.
      const usersId = await this._resolveScopePathToId(this.usersScopePath, authHeaders)
      const res = await this._fetch(
        "POST",
        `/database/scopes/${usersId}/members`,
        { authHeaders, body: { personRef: hash } }
      )
      const { leafId } = await res.json()
      this._scopeIdCache.set(cacheKey, leafId)
      return leafId
    }
    throw new DatabaseError(`unsupported tenant for scope lookup: ${tenant}`, 400)
  }

  // --------------------------------------------------------------------
  // PersistenceInterface implementations
  // --------------------------------------------------------------------

  async listFiles(tenant, subDir, authHeaders) {
    const scopeId = await this._scopeIdForTenant(tenant, authHeaders)
    const rawPrefix = (subDir || "").replace(/^\/+/, "")
    const prefix = rawPrefix
      ? (rawPrefix.endsWith("/") ? rawPrefix : rawPrefix + "/")
      : ""
    const url =
      `/database/scopes/${scopeId}/docs` +
      (prefix ? `?prefix=${encodeURIComponent(prefix)}` : "")
    const res = await this._fetch("GET", url, { authHeaders })
    const { docs } = await res.json()

    // Convert flat doc list into brains's { files: [{ name, filePath,
    // folder, type, dir }] } shape, grouping by next "/" segment.
    const seen = new Set()
    const files = []
    for (const d of docs) {
      const rest = d.path.slice(prefix.length)
      if (rest.length === 0) continue
      const slash = rest.indexOf("/")
      if (slash === -1) {
        files.push({
          name: rest,
          filePath: d.path,
          folder: prefix,
          type: "file",
          dir: false,
        })
      } else {
        const folderName = rest.slice(0, slash)
        if (!seen.has(folderName)) {
          seen.add(folderName)
          files.push({
            name: folderName,
            filePath: prefix + folderName + "/",
            folder: prefix,
            type: "dir",
            dir: true,
          })
        }
      }
    }
    return toStream({ files })
  }

  async getJSONFile(tenant, filePath, authHeaders) {
    // `shared` case: publicId lookup via anonymous public endpoint.
    if (tenant === "shared") {
      const publicId = filePath // brains uses this as the shared identifier
      const res = await this._fetch(
        "GET",
        `/database/public/${encodeURIComponent(publicId)}`,
        { authHeaders }
      )
      const doc = await res.json()
      return toStream(doc.data)
    }

    validateDocPath(filePath)
    const scopeId = await this._scopeIdForTenant(tenant, authHeaders)
    const res = await this._fetch(
      "GET",
      `/database/scopes/${scopeId}/docs/${filePath}`,
      { authHeaders }
    )
    const doc = await res.json()
    return toStream(doc.data)
  }

  async getBinaryFile(tenant, filePath, authHeaders) {
    // `shared` case: public blob lookup.
    if (tenant === "shared") {
      const publicId = filePath
      const res = await this._fetch(
        "GET",
        `/database/public/${encodeURIComponent(publicId)}/blobs/preview`,
        { authHeaders }
      )
      const buf = Buffer.from(await res.arrayBuffer())
      return Readable.from(buf)
    }

    validateDocPath(filePath)
    const scopeId = await this._scopeIdForTenant(tenant, authHeaders)
    // brains's convention: filePath is "<name>.brain" and the .png preview
    // for it lives as blob key "preview" on the same doc-path.
    const res = await this._fetch(
      "GET",
      `/database/scopes/${scopeId}/blobs/preview?path=${encodeURIComponent(filePath)}`,
      { authHeaders }
    )
    const buf = Buffer.from(await res.arrayBuffer())
    return Readable.from(buf)
  }

  async writeFile(tenant, filePath, content, authHeaders) {
    validateDocPath(filePath)
    const scopeId = await this._scopeIdForTenant(tenant, authHeaders)
    // brains sends the JSON as a string; the database wants an object under
    // `data`. Parse when possible; wrap plain text as { $raw: "..." }.
    let data
    if (typeof content === "string") {
      try {
        data = JSON.parse(content)
        if (typeof data !== "object" || data === null) data = { $raw: content }
      } catch {
        data = { $raw: content }
      }
    } else if (Buffer.isBuffer(content)) {
      data = { $raw: content.toString("utf8") }
    } else {
      data = content
    }
    const res = await this._fetch(
      "PUT",
      `/database/scopes/${scopeId}/docs/${filePath}`,
      { authHeaders, body: { data } }
    )
    const stored = await res.json()
    return toStream({
      name: filePath.split("/").pop(),
      filePath,
      version: stored.version,
    })
  }

  async delete(tenant, filePath, authHeaders) {
    validateDocPath(filePath)
    const scopeId = await this._scopeIdForTenant(tenant, authHeaders)
    // revert = physically drop all local versions for this path in the
    // caller's leaf. Matches brains's "delete my file" semantics.
    await this._fetch(
      "POST",
      `/database/scopes/${scopeId}/revert`,
      { authHeaders, body: { path: filePath } }
    )
    return toStream("true")
  }

  async rename(tenant, fromPath, toPath, authHeaders) {
    validateDocPath(fromPath)
    validateDocPath(toPath)
    const scopeId = await this._scopeIdForTenant(tenant, authHeaders)
    await this._fetch(
      "POST",
      `/database/scopes/${scopeId}/rename`,
      {
        authHeaders,
        body: { path: fromPath, newPath: toPath },
      }
    )
    return toStream({
      name: toPath.split("/").pop(),
      filePath: toPath,
    })
  }

  async createFolder(tenant, subDir, authHeaders) {
    // No folder concept in the DB. Drop an "empty.md" sentinel so the
    // folder becomes visible through listFiles. The route's follow-up
    // writeFile("placeholder.txt") coexists with this file.
    validateDocPath(subDir)
    const sentinelPath = `${subDir.replace(/\/+$/, "")}/empty.md`
    const scopeId = await this._scopeIdForTenant(tenant, authHeaders)
    await this._fetch(
      "PUT",
      `/database/scopes/${scopeId}/docs/${sentinelPath}`,
      { authHeaders, body: { data: { $raw: "-empty folder sentinel-" } } }
    )
    return toStream({
      name: subDir.split("/").filter(Boolean).pop() || subDir,
      filePath: subDir,
    })
  }

  async copy(fromTenant, fromPath, toTenant, toPath, authHeaders) {
    // The only "copy" caller in brains today is share():
    //   copy("user:<hash>", "x.brain", "shared", "<short-uuid>")
    // We treat this as publish() and return the DB's actual publicId — the
    // caller-provided short-uuid is ignored.
    if ((fromTenant === "global" || fromTenant.startsWith("user:")) && toTenant === "shared") {
      validateDocPath(fromPath)
      const scopeId = await this._scopeIdForTenant(fromTenant, authHeaders)
      const res = await this._fetch(
        "POST",
        `/database/scopes/${scopeId}/publish`,
        { authHeaders, body: { path: fromPath } }
      )
      const { publicId } = await res.json()
      return toStream({ filePath: publicId })
    }
    throw new DatabaseError(
      `unsupported copy: ${fromTenant} → ${toTenant} (only *→shared implemented)`,
      501
    )
  }
}

module.exports = DatabaseAdapter
