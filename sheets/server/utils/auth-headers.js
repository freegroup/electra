// Extracts the auth-related headers from an incoming Express request so the
// db client can forward the caller's identity to the database service.
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
