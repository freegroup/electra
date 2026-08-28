// Extracts the auth-related headers from an incoming Express request so the
// db client can forward them to the internal `database` service (which reads
// x-mail as the caller's personRef, injected by the ingress from the session).
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
