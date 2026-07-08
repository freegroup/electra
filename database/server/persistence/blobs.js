// Blob persistence — binary attachments per version. See README §6.14.
//
// Auto-copy on new version happens in docs.js putDoc. This module handles
// explicit PUT/GET/DELETE of individual blobs.

const { pool } = require("./pool")
const {
  NotFoundError,
  BadRequestError,
  UnsupportedMediaTypeError,
} = require("../utils/errors")

const KEY_REGEX = /^[a-zA-Z0-9_-]{1,64}$/

function validateKey(key) {
  if (!KEY_REGEX.test(key)) {
    throw new BadRequestError(
      "blob key must be 1-64 chars, [A-Za-z0-9_-] only"
    )
  }
}

// Allow-list — configurable via env var.
const DEFAULT_TYPES = "image/png,image/gif,image/svg+xml,application/pdf"
const ALLOWED_TYPES = new Set(
  (process.env.BLOB_ALLOWED_CONTENT_TYPES || DEFAULT_TYPES)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
)

function validateContentType(contentType) {
  if (!contentType) {
    throw new BadRequestError("Content-Type header required")
  }
  const normalized = contentType.split(";")[0].trim().toLowerCase()
  if (!ALLOWED_TYPES.has(normalized)) {
    throw new UnsupportedMediaTypeError(
      `unsupported content type: ${normalized}; allowed: ${[...ALLOWED_TYPES].join(", ")}`
    )
  }
  return normalized
}

// ---------------------------------------------------------------------------
// Put blob on the caller's leaf-active version
// ---------------------------------------------------------------------------
async function putBlob({ leafScopeId, docPath, key, buffer, contentType }) {
  validateKey(key)
  const normalizedType = validateContentType(contentType)

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Find the caller's active leaf version.
    const verRes = await client.query(
      `SELECT version FROM versions
       WHERE scope_id = $1 AND doc_path = $2 AND status = 'committed'
       ORDER BY version DESC LIMIT 1`,
      [leafScopeId, docPath]
    )
    if (verRes.rowCount === 0) {
      throw new NotFoundError(
        `no committed leaf version at ${docPath} — put the doc first`
      )
    }
    const version = verRes.rows[0].version

    await client.query(
      `INSERT INTO blobs (scope_id, doc_path, version, key,
                          content_type, size_bytes, data)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (scope_id, doc_path, version, key)
       DO UPDATE SET content_type = EXCLUDED.content_type,
                     size_bytes   = EXCLUDED.size_bytes,
                     data         = EXCLUDED.data,
                     created_at   = now()`,
      [leafScopeId, docPath, version, key, normalizedType, buffer.length, buffer]
    )

    await client.query("COMMIT")
    return { version, key, contentType: normalizedType, sizeBytes: buffer.length }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// ---------------------------------------------------------------------------
// Get blob via walk-up
// ---------------------------------------------------------------------------
// Blob resolution is tied to the doc walk-up: we resolve the effective doc
// version first (closest scope with a committed version), then look up the
// blob on THAT specific version. A missing blob on that version returns 404.
// The walk-up does not continue upward for the blob.
async function getBlob({ callerLeafId, docPath, key }) {
  validateKey(key)

  const res = await pool.query(
    `WITH picked AS (
       SELECT v.scope_id, v.version
       FROM versions v
       JOIN scope_closure c ON c.ancestor_id = v.scope_id
       WHERE c.descendant_id = $1
         AND v.doc_path      = $2
         AND v.status IN ('committed', 'deleted')
       ORDER BY c.depth ASC, v.version DESC
       LIMIT 1
     )
     SELECT b.content_type, b.size_bytes, b.data
     FROM blobs b
     JOIN picked p ON p.scope_id = b.scope_id AND p.version = b.version
     WHERE b.doc_path = $2 AND b.key = $3`,
    [callerLeafId, docPath, key]
  )
  if (res.rowCount === 0) return null
  const row = res.rows[0]
  return {
    contentType: row.content_type,
    sizeBytes: row.size_bytes,
    buffer: row.data,
  }
}

// ---------------------------------------------------------------------------
// Delete blob on the caller's leaf-active version
// ---------------------------------------------------------------------------
async function deleteBlob({ leafScopeId, docPath, key }) {
  validateKey(key)

  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const verRes = await client.query(
      `SELECT version FROM versions
       WHERE scope_id = $1 AND doc_path = $2 AND status = 'committed'
       ORDER BY version DESC LIMIT 1`,
      [leafScopeId, docPath]
    )
    if (verRes.rowCount === 0) {
      await client.query("ROLLBACK")
      return { deleted: 0 }
    }
    const version = verRes.rows[0].version
    const del = await client.query(
      `DELETE FROM blobs WHERE scope_id = $1 AND doc_path = $2 AND version = $3 AND key = $4`,
      [leafScopeId, docPath, version, key]
    )
    await client.query("COMMIT")
    return { deleted: del.rowCount }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// ---------------------------------------------------------------------------
// Public read by publicId (anonymous)
// ---------------------------------------------------------------------------
// Returns { status: "ok" | "gone" | "notfound", blob? }.
async function getBlobByPublicId(publicId, key) {
  validateKey(key)
  const versionRes = await pool.query(
    `SELECT scope_id, doc_path, version, unpublished_at
     FROM versions WHERE public_id = $1`,
    [publicId]
  )
  if (versionRes.rowCount === 0) return { status: "notfound" }
  const v = versionRes.rows[0]
  if (v.unpublished_at) return { status: "gone" }

  const blobRes = await pool.query(
    `SELECT content_type, size_bytes, data
     FROM blobs
     WHERE scope_id = $1 AND doc_path = $2 AND version = $3 AND key = $4`,
    [v.scope_id, v.doc_path, v.version, key]
  )
  if (blobRes.rowCount === 0) return { status: "notfound" }
  return {
    status: "ok",
    blob: {
      contentType: blobRes.rows[0].content_type,
      sizeBytes: blobRes.rows[0].size_bytes,
      buffer: blobRes.rows[0].data,
    },
  }
}

module.exports = {
  putBlob,
  getBlob,
  deleteBlob,
  getBlobByPublicId,
  validateKey,
  validateContentType,
}
