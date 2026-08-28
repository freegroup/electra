// Rename persistence. See README §6.15, ARCHITECTURE.md §4.13.

const { pool } = require("./pool")
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
  OutdatedError,
} = require("../utils/errors")
const { validateDocPath } = require("./docs")

// Returns true if the caller's leaf has any version at path.
async function hasPathInLeaf({ leafScopeId, docPath }) {
  validateDocPath(docPath)
  const res = await pool.query(
    `SELECT 1 FROM versions WHERE scope_id = $1 AND doc_path = $2 LIMIT 1`,
    [leafScopeId, docPath]
  )
  return res.rowCount > 0
}

// Renames every version in the caller's leaf from oldPath to newPath.
// Blobs and votes follow via ON UPDATE CASCADE. Pending promotions from the
// caller for oldPath are cancelled. All in one transaction.
//
// Args:
//   leafScopeId       — the caller's personal leaf scope id
//   oldPath, newPath  — source and target doc-paths
//   expectedVersion   — client's current active leaf version at oldPath (concurrency)
//   callerPersonRef   — for rejection audit
async function renameInLeaf({ leafScopeId, oldPath, newPath, expectedVersion, callerPersonRef }) {
  validateDocPath(oldPath)
  validateDocPath(newPath)

  if (oldPath === newPath) {
    return { moved: 0 }
  }

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // 1. Concurrency check: which version is currently active in the leaf?
    const verRes = await client.query(
      `SELECT version FROM versions
       WHERE scope_id = $1 AND doc_path = $2 AND status = 'committed'
       ORDER BY version DESC LIMIT 1`,
      [leafScopeId, oldPath]
    )
    if (verRes.rowCount === 0) {
      // No committed version to rename — either brand-new or nothing exists.
      // Fall through with a not-found — nothing to move.
      await client.query("ROLLBACK")
      throw new NotFoundError(`no local version at ${oldPath}`)
    }
    const currentVersion = verRes.rows[0].version
    if (expectedVersion !== undefined && expectedVersion !== currentVersion) {
      await client.query("ROLLBACK")
      throw new OutdatedError(
        `version mismatch: caller has ${expectedVersion}, current is ${currentVersion}`,
        { currentVersion }
      )
    }

    // 2. Conflict check: any row at newPath in this leaf?
    const conflict = await client.query(
      `SELECT 1 FROM versions WHERE scope_id = $1 AND doc_path = $2 LIMIT 1`,
      [leafScopeId, newPath]
    )
    if (conflict.rowCount > 0) {
      await client.query("ROLLBACK")
      throw new ConflictError(`target path already has content in your leaf`, {
        usedPaths: [newPath],
      })
    }

    // 3. Cancel any pending promotions from this caller for oldPath.
    await client.query(
      `UPDATE versions
          SET status = 'rejected',
              finalized_at = now(),
              finalized_by = $3,
              rejection_reason = 'renamed by author'
        WHERE status = 'pending'
          AND doc_path = $1
          AND author = $2`,
      [oldPath, callerPersonRef, callerPersonRef]
    )

    // 4. The rename. blobs.doc_path and votes.doc_path follow via
    //    ON UPDATE CASCADE on the composite FK.
    const moved = await client.query(
      `UPDATE versions SET doc_path = $3
        WHERE scope_id = $1 AND doc_path = $2
        RETURNING version`,
      [leafScopeId, oldPath, newPath]
    )

    await client.query("COMMIT")
    return { moved: moved.rowCount }
  } catch (err) {
    try { await client.query("ROLLBACK") } catch {}
    throw err
  } finally {
    client.release()
  }
}

module.exports = { renameInLeaf, hasPathInLeaf }
