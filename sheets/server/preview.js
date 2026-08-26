// The preview image of a document version.
//
// It lives as a blob on the version under the key "preview", never inside the
// document data: a thumbnail is an image, so it is served as one - raw bytes
// with a content type, from a row that a bulk read never touches.

const db = require("./db")

const KEY = "preview"

// The blob of one version, base64-encoded for a backup package. Best-effort: a
// version without a preview (or one whose blob has gone) yields {}.
async function read(uuid, auth) {
  if (!uuid) return null
  try {
    const r = await db.raw(
      "GET",
      `/database/docs/${encodeURIComponent(uuid)}/blobs/${KEY}`,
      { authHeaders: auth }
    )
    const bytes = Buffer.from(await r.arrayBuffer())
    if (bytes.length === 0) return null
    return {
      contentType: r.headers.get("content-type") || "image/png",
      base64: bytes.toString("base64"),
    }
  } catch {
    return null
  }
}

// Store a ready-made image ({ contentType, base64 }) on the caller's version.
async function store({ auth, scopeRef, path, preview }) {
  const bytes = Buffer.from(preview.base64, "base64")
  if (bytes.length === 0) return
  await db.raw(
    "PUT",
    `/database/scopes/${scopeRef}/blobs/${KEY}?path=${encodeURIComponent(path)}`,
    { authHeaders: auth, rawBody: bytes, contentType: preview.contentType || "image/png" }
  )
}

// Render the page with puppeteer and store the PNG. Uses a short-lived render
// token, so the headless browser loads the doc login-free via ?rtoken=.
async function generate({ auth, scopeRef, path }) {
  const die = require("./utils/die")
  const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS")
  const os = require("os")
  const fs = require("fs")
  const nodePath = require("path")
  const { render } = require("./converter/screenshot")

  const { token } = await db.call(
    "POST",
    `/database/scopes/${scopeRef}/docs/render-token`,
    { authHeaders: auth, body: { path } }
  )
  const url = `http://localhost:${PORT_INGRESS}/author/page.html?rtoken=${encodeURIComponent(token)}&mode=worksheet`
  const tmp = nodePath.join(os.tmpdir(), `sheet-preview-${Date.now()}.png`)
  await render(url, tmp)
  try {
    await store({ auth, scopeRef, path, preview: {
      contentType: "image/png",
      base64: fs.readFileSync(tmp).toString("base64"),
    } })
  } finally {
    try { fs.unlinkSync(tmp) } catch { /* ignore */ }
  }
}

// Fire-and-forget variant for the request paths that refresh a thumbnail after
// responding - a failed render must never break the save that triggered it.
function refresh({ auth, scopeRef, path }) {
  generate({ auth, scopeRef, path }).catch((e) =>
    console.log(`[sheets] preview generation failed: ${e && e.message}`))
}

// A shallow copy of a document's data without the (large) preview image. Only
// documents written before the move to blobs still carry one; this keeps them
// from shipping it on every open. Can go once bin/backfill-previews.js has run
// everywhere.
function withoutImage(data) {
  if (!data || typeof data !== "object") return data
  if (data.image === undefined) return data
  const { image, ...rest } = data
  return rest
}

module.exports = { KEY, read, store, generate, refresh, withoutImage }
