// Document persistence: put / get (walk-up) / list (effective view).
//
// Milestone 1 scope only — no optimistic concurrency, no promote / delete /
// revert / history. See ARCHITECTURE.md §4.1 (walk-up), §4.2 (list), §4.3 (put).

const { pool } = require("./pool")
const { NotFoundError, BadRequestError } = require("../utils/errors")

// ---------------------------------------------------------------------------
// Doc path validation
// ---------------------------------------------------------------------------

function validateDocPath(docPath) {
  if (typeof docPath !== "string" || docPath.length === 0) {
    throw new BadRequestError("doc path must be a non-empty string")
  }
  if (docPath.length > 4096) {
    throw new BadRequestError("doc path too long")
  }
  if (docPath.startsWith("/") || docPath.endsWith("/") || docPath.includes("//")) {
    throw new BadRequestError("doc path must not have leading/trailing/duplicate slashes")
  }
}

// ---------------------------------------------------------------------------
// Result shape helpers
// ---------------------------------------------------------------------------

// Maps a versions row + a resolved origin path to the API's doc shape.
function rowToDoc(row, originScopePath) {
  return {
    data: row.data,
    meta: row.meta,
    scope: originScopePath,
    path: row.doc_path,
    version: row.version,
    status: row.status,
    author: row.author,
    createdAt: row.created_at,
  }
}

// ---------------------------------------------------------------------------
// Walk-up lookup — ARCHITECTURE.md §4.1
// ---------------------------------------------------------------------------

// Given the caller's personal leaf id and a doc_path, returns the nearest
// visible version by walking closure ancestors. Returns null if not found
// (either genuinely not present, or shadowed by a tombstone).
async function getDoc({ callerLeafId, docPath, resolveOriginPath }) {
  validateDocPath(docPath)

  const res = await pool.query(
    `SELECT v.scope_id, v.doc_path, v.version, v.status,
            v.data, v.meta, v.author, v.created_at, c.depth
     FROM versions v
     JOIN scope_closure c ON c.ancestor_id = v.scope_id
     WHERE c.descendant_id = $1
       AND v.doc_path      = $2
       AND v.status IN ('committed', 'deleted')
     ORDER BY c.depth ASC, v.version DESC
     LIMIT 1`,
    [callerLeafId, docPath]
  )
  if (res.rowCount === 0) return null
  const row = res.rows[0]
  if (row.status === "deleted") return null // tombstone → not found

  const originPath = await resolveOriginPath(row.scope_id)
  return rowToDoc(row, originPath)
}

// ---------------------------------------------------------------------------
// Effective list — ARCHITECTURE.md §4.2
// ---------------------------------------------------------------------------

async function listDocs({ callerLeafId, prefix, resolveOriginPath }) {
  const res = await pool.query(
    `WITH visible AS (
       SELECT DISTINCT ON (v.doc_path)
              v.doc_path, v.scope_id, v.version, v.status,
              v.data, v.meta, v.author, v.created_at, c.depth
       FROM versions v
       JOIN scope_closure c ON c.ancestor_id = v.scope_id
       WHERE c.descendant_id = $1
         AND v.status IN ('committed', 'deleted')
         AND ($2::text IS NULL OR v.doc_path LIKE $2 || '%')
       ORDER BY v.doc_path, c.depth ASC, v.version DESC
     )
     SELECT * FROM visible WHERE status = 'committed'
     ORDER BY doc_path`,
    [callerLeafId, prefix || null]
  )

  // Resolve origin scope paths — cached per scope_id.
  const cache = new Map()
  const out = []
  for (const row of res.rows) {
    let originPath = cache.get(row.scope_id)
    if (originPath === undefined) {
      originPath = await resolveOriginPath(row.scope_id)
      cache.set(row.scope_id, originPath)
    }
    out.push(rowToDoc(row, originPath))
  }
  return out
}

// ---------------------------------------------------------------------------
// Put — ARCHITECTURE.md §4.3 (M1: no optimistic concurrency yet)
// ---------------------------------------------------------------------------

async function putDoc({ leafScopeId, docPath, data, meta, author }) {
  validateDocPath(docPath)

  const client = await pool.connect()
  try {
    await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE")

    // Compute next version for (leaf, docPath)
    const maxRes = await client.query(
      `SELECT COALESCE(MAX(version), 0) AS max FROM versions
       WHERE scope_id = $1 AND doc_path = $2`,
      [leafScopeId, docPath]
    )
    const nextVersion = maxRes.rows[0].max + 1

    const insRes = await client.query(
      `INSERT INTO versions
         (scope_id, doc_path, version, status, is_deletion, data, meta, author)
       VALUES ($1, $2, $3, 'committed', false, $4::jsonb, $5::jsonb, $6)
       RETURNING scope_id, doc_path, version, status,
                 data, meta, author, created_at`,
      [leafScopeId, docPath, nextVersion, data || {}, meta || {}, author]
    )

    // Auto-copy blobs from the previous effective version (walk-up target).
    // See README §6.14. If the walk-up returns the new version itself
    // (because it's now the closest), the subquery excludes it explicitly.
    await client.query(
      `INSERT INTO blobs (scope_id, doc_path, version, key, content_type, size_bytes, data)
       SELECT $1::bigint, $2, $3, b.key, b.content_type, b.size_bytes, b.data
       FROM blobs b
       WHERE (b.scope_id, b.version) = (
           SELECT v.scope_id, v.version
           FROM versions v
           JOIN scope_closure c ON c.ancestor_id = v.scope_id
           WHERE c.descendant_id = $1
             AND v.doc_path      = $2
             AND v.status IN ('committed', 'deleted')
             AND NOT (v.scope_id = $1 AND v.version = $3)
           ORDER BY c.depth ASC, v.version DESC
           LIMIT 1
       )
         AND b.doc_path = $2`,
      [leafScopeId, docPath, nextVersion]
    )

    await client.query("COMMIT")
    return insRes.rows[0]
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// ---------------------------------------------------------------------------
// Revert — physical delete of all versions in caller's leaf for the given
// doc-path. See README §6.10. ON DELETE CASCADE takes care of votes (and
// later: blobs).
// ---------------------------------------------------------------------------

async function revertDoc({ leafScopeId, docPath }) {
  validateDocPath(docPath)
  const res = await pool.query(
    `DELETE FROM versions
      WHERE scope_id = $1 AND doc_path = $2`,
    [leafScopeId, docPath]
  )
  return { deleted: res.rowCount }
}

module.exports = { getDoc, listDocs, putDoc, revertDoc, rowToDoc, validateDocPath }
