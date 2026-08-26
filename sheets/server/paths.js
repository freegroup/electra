// Document paths and the app's file suffix.
//
// This app backend owns exactly one document type, identified by its suffix
// (.sheet). All app backends share ONE content scope, so the suffix - not the
// scope - is what separates the types, and it is enforced on both sides:
//   read  - the finder lists only matching docs; opening a foreign type 404s
//   write - save/rename force the suffix so nothing else can land here

const conf = require("./configuration")

const SUFFIX = conf.fileSuffix // e.g. ".sheet"

function hasSuffix(docPath) {
  return !SUFFIX || (typeof docPath === "string" && docPath.endsWith(SUFFIX))
}

// Sanitize ONE path segment (no "/"): strip separators / control chars, collapse
// dot runs.
function sanitizeSegment(seg) {
  return String(seg || "").trim().replace(/[/\\\x00-\x1f]/g, "").replace(/\.\.+/g, ".")
}

// Path-aware: doc_path is a virtual DB key, so keep "/" as a separator and clean
// each segment, dropping empty ones (leading/trailing/double slashes).
function sanitizePath(name) {
  const segs = String(name || "").split("/").map(sanitizeSegment).filter(Boolean)
  return segs.join("/") || "untitled"
}

// Force the app's suffix onto a document name (used on save). Idempotent.
function withSuffix(name) {
  const n = sanitizePath(name)
  if (!SUFFIX || n.endsWith(SUFFIX)) return n
  return n + SUFFIX
}

module.exports = { hasSuffix, withSuffix, sanitizePath, sanitizeSegment }
