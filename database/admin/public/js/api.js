// api.js — thin wrapper over the BFF. Every persona-scoped call carries the
// current persona's identity headers; god-view calls go to /admin/api/god/*.
// Exposed as a global `API` (no modules/bundler — plain script tags).

const API = (() => {
  const BASE = "api" // relative to /admin/ → /admin/api/...

  // Current persona, mutated by the UI (see app.js). `email` is the handle we
  // send as x-mail; the DB derives personRef = SHA-256(handle) from it (prod
  // mode). So anywhere we must name a person to the DB (add member/reviewer),
  // we send that same SHA-256 — see personRef() below.
  const persona = { email: "", role: "user" }

  // SHA-256 hex of a handle — matches the DB's personRef derivation from x-mail.
  async function personRef(handle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(handle))
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  function personaHeaders(extra = {}) {
    const h = { ...extra }
    if (persona.email) h["X-Persona-Email"] = persona.email
    h["X-Persona-Role"] = persona.role || "user"
    return h
  }

  async function parse(res) {
    const ct = res.headers.get("content-type") || ""
    const body = ct.includes("application/json") ? await res.json() : await res.text()
    return { status: res.status, ok: res.ok, body }
  }

  // Persona-scoped REST call. path is a DB path WITHOUT the /database prefix,
  // e.g. `scopes/12/docs?path=x`.
  async function call(method, path, jsonBody, extraHeaders) {
    const headers = personaHeaders(extraHeaders)
    const init = { method, headers }
    if (jsonBody !== undefined) {
      headers["content-type"] = "application/json"
      init.body = JSON.stringify(jsonBody)
    }
    return parse(await fetch(`${BASE}/${path}`, init))
  }

  // Raw binary call (blob upload).
  async function callRaw(method, path, buffer, contentType) {
    const headers = personaHeaders({ "content-type": contentType })
    return parse(await fetch(`${BASE}/${path}`, { method, headers, body: buffer }))
  }

  // God-view (token added by the BFF).
  async function god(path) {
    return parse(await fetch(`${BASE}/god/${path}`))
  }

  return { persona, personRef, call, callRaw, god }
})()
