// Shared helpers for route files: scope-ref parsing, origin-path resolution,
// and the read/write guards that every doc-facing route needs.

const { pool } = require("../persistence/pool")
const {
  pathOfScope,
  canRead,
  isMember,
  ensureWriteLeaf,
  getScope,
} = require("../persistence/scopes")
const { ForbiddenError, NotFoundError, BadRequestError } = require("../utils/errors")

function parseScopeRef(raw) {
  if (!/^\d+$/.test(raw)) {
    throw new BadRequestError(`scopeRef must be a numeric id, got: ${raw}`)
  }
  return raw
}

function requirePathQuery(req) {
  const p = req.query && req.query.path
  if (!p || typeof p !== "string") {
    throw new BadRequestError("query parameter `path` required")
  }
  return p
}

// Resolves a scope id to its full human path (e.g. "electra/apps/brains").
async function resolveOriginPath(scopeId) {
  const client = await pool.connect()
  try {
    return await pathOfScope(client, scopeId)
  } finally {
    client.release()
  }
}

// Read guard: the scope must exist and the caller (possibly anonymous) must be
// allowed to read it (transitive-up membership, or the world-readable root).
async function requireRead(rawScopeRef, personRef) {
  const scopeId = parseScopeRef(rawScopeRef)
  const client = await pool.connect()
  try {
    const scope = await getScope(client, scopeId)
    if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
    const ok = await canRead(client, scopeId, personRef)
    if (!ok) throw new ForbiddenError(`caller may not read scope id ${scopeId}`)
    return scopeId
  } finally {
    client.release()
  }
}

// Write guard: the caller must be an explicit member of the operating scope.
// Their personal leaf is provisioned on demand and its id returned.
async function requireWriteLeaf(rawScopeRef, personRef) {
  const scopeId = parseScopeRef(rawScopeRef)
  const client = await pool.connect()
  let member
  try {
    const scope = await getScope(client, scopeId)
    if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
    member = await isMember(client, scopeId, personRef)
  } finally {
    client.release()
  }
  if (!member) {
    throw new ForbiddenError(`caller is not an explicit member of scope id ${scopeId}`)
  }
  const { leafId } = await ensureWriteLeaf({
    scopeId,
    personRef,
    createdBy: personRef,
  })
  return { scopeId, leafId }
}

module.exports = {
  parseScopeRef,
  requirePathQuery,
  resolveOriginPath,
  requireRead,
  requireWriteLeaf,
}
