// Extracts the auth-related headers from an incoming Express request so the
// DatabaseAdapter can forward them to the database service. The
// FileSystemAdapter ignores this parameter — it uses req.get("x-hash")
// itself when it needs it.
function pickAuthHeaders(req) {
  if (!req || typeof req.get !== "function") return {}
  const headers = {}
  for (const k of ["x-role", "x-mail", "x-hash", "x-picture", "x-name"]) {
    const v = req.get(k)
    if (v) headers[k] = v
  }
  return headers
}

module.exports = { pickAuthHeaders }
