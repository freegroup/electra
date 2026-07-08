// Publish / unpublish / anonymous read. See README §6.13, ARCHITECTURE.md §4.11.

const { pool } = require("./pool")
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors")
const { validateDocPath, rowToDoc } = require("./docs")

// ---------------------------------------------------------------------------
// Publish
// ---------------------------------------------------------------------------

// Publishes the caller's own leaf version at (docPath).
// Refuses if the walk-up from the caller's leaf resolves to a scope other
// than the caller's leaf itself (i.e. the doc is inherited, not local).
async function publish({ callerLeafId, docPath }) {
  validateDocPath(docPath)

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Look up the caller's own active leaf version for this path.
    const localRes = await client.query(
      `SELECT scope_id, doc_path, version, status,
              data, meta, author, created_at, public_id
       FROM versions
       WHERE scope_id = $1
         AND doc_path = $2
         AND status   = 'committed'
       ORDER BY version DESC
       LIMIT 1`,
      [callerLeafId, docPath]
    )

    if (localRes.rowCount === 0) {
      // Nothing local. Is there anything inherited? -> 409 not_publishable.
      // Nothing anywhere? -> 404.
      const walkupRes = await client.query(
        `SELECT 1 FROM versions v
         JOIN scope_closure c ON c.ancestor_id = v.scope_id
         WHERE c.descendant_id = $1
           AND v.doc_path = $2
           AND v.status IN ('committed', 'deleted')
         LIMIT 1`,
        [callerLeafId, docPath]
      )
      await client.query("ROLLBACK")
      if (walkupRes.rowCount > 0) {
        throw new ConflictError(
          "no private version to publish — modify the doc first to create a local snapshot",
          { code: "not_publishable" }
        )
      }
      throw new NotFoundError(`document ${docPath} not found`)
    }

    const row = localRes.rows[0]
    if (row.public_id) {
      await client.query("ROLLBACK")
      throw new ConflictError("this version is already published", {
        code: "already_published",
        publicId: row.public_id,
      })
    }

    const upd = await client.query(
      `UPDATE versions
          SET public_id = gen_random_uuid(),
              published_at = now()
        WHERE scope_id = $1 AND doc_path = $2 AND version = $3
        RETURNING public_id, published_at`,
      [row.scope_id, row.doc_path, row.version]
    )
    await client.query("COMMIT")

    return {
      publicId: upd.rows[0].public_id,
      publishedAt: upd.rows[0].published_at,
      scopeId: row.scope_id,
      docPath: row.doc_path,
      version: row.version,
    }
  } catch (err) {
    // If we already threw inside, transaction is rolled back. Otherwise:
    try { await client.query("ROLLBACK") } catch {}
    throw err
  } finally {
    client.release()
  }
}

// ---------------------------------------------------------------------------
// Unpublish
// ---------------------------------------------------------------------------

async function unpublish({ callerLeafId, docPath }) {
  validateDocPath(docPath)

  // Find the newest committed leaf row that is currently published + active.
  const res = await pool.query(
    `UPDATE versions
        SET unpublished_at = now()
      WHERE scope_id = $1
        AND doc_path = $2
        AND public_id IS NOT NULL
        AND unpublished_at IS NULL
      RETURNING version, public_id`,
    [callerLeafId, docPath]
  )
  if (res.rowCount === 0) {
    throw new NotFoundError(`no published version to unpublish at ${docPath}`)
  }
  return res.rows.map((r) => ({ version: r.version, publicId: r.public_id }))
}

// ---------------------------------------------------------------------------
// Anonymous read by publicId
// ---------------------------------------------------------------------------

// Returns { status: "ok" | "gone" | "notfound", doc? }.
async function getByPublicId(publicId, resolveOriginPath) {
  const res = await pool.query(
    `SELECT scope_id, doc_path, version, status,
            data, meta, author, created_at,
            public_id, published_at, unpublished_at
     FROM versions
     WHERE public_id = $1`,
    [publicId]
  )
  if (res.rowCount === 0) return { status: "notfound" }
  const row = res.rows[0]
  if (row.unpublished_at) return { status: "gone" }
  const originPath = await resolveOriginPath(row.scope_id)
  return {
    status: "ok",
    doc: {
      ...rowToDoc(row, originPath),
      publicId: row.public_id,
      publishedAt: row.published_at,
    },
  }
}

module.exports = { publish, unpublish, getByPublicId }
