// Distribute — horizontal delivery to several target scopes. README §6.16.
//
// Takes one of the caller's own leaf versions and creates one delivery per
// target scope, each decided by that target's current state:
//   - no active version there                       → committed
//   - active version exists, caller authored it      → committed
//   - active version exists, someone else authored it → pending (review)
// The distributor is recorded as author on every created entry. Blobs are
// copied from the source version. The path is unchanged.

const { pool } = require("./pool")
const { validateDocPath } = require("./docs")
const {
  NotFoundError,
  ForbiddenError,
  OutdatedError,
} = require("../utils/errors")

async function leafUnder(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
    [scopeId, personRef]
  )
  return res.rowCount === 0 ? null : res.rows[0].id
}

async function activeVersion(client, scopeId, docPath) {
  const res = await client.query(
    `SELECT scope_id, doc_path, version, status, is_deletion, data, meta, author
       FROM versions
      WHERE scope_id = $1 AND doc_path = $2 AND status IN ('committed', 'deleted')
      ORDER BY version DESC LIMIT 1`,
    [scopeId, docPath]
  )
  return res.rowCount === 0 ? null : res.rows[0]
}

async function isMember(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT 1 FROM memberships
      WHERE scope_id = $1 AND person_ref = $2 AND is_member = true`,
    [scopeId, personRef]
  )
  return res.rowCount > 0
}

async function nextVersion(client, scopeId, docPath) {
  const res = await client.query(
    `SELECT COALESCE(MAX(version), 0) + 1 AS v FROM versions
      WHERE scope_id = $1 AND doc_path = $2`,
    [scopeId, docPath]
  )
  return res.rows[0].v
}

async function copyBlobs(client, srcScope, srcVer, dstScope, dstVer, docPath) {
  await client.query(
    `INSERT INTO blobs (scope_id, doc_path, version, key, content_type, size_bytes, data)
     SELECT $3::bigint, $5, $4, key, content_type, size_bytes, data
     FROM blobs
     WHERE scope_id = $1 AND doc_path = $5 AND version = $2`,
    [srcScope, srcVer, dstScope, dstVer, docPath]
  )
}

async function distribute({ sourceScopeId, personRef, docPath, expectedVersion, targetScopeRefs }) {
  validateDocPath(docPath)

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const leafId = await leafUnder(client, sourceScopeId, personRef)
    if (!leafId) throw new NotFoundError(`no local version at ${docPath} to distribute`)
    const source = await activeVersion(client, leafId, docPath)
    if (!source) throw new NotFoundError(`no local version at ${docPath} to distribute`)
    if (expectedVersion != null && expectedVersion !== source.version) {
      throw new OutdatedError(
        `leaf version is ${source.version}, caller distributed ${expectedVersion}`,
        { current: source.version, expected: expectedVersion }
      )
    }

    const distributions = []
    for (const targetRef of targetScopeRefs) {
      if (!(await isMember(client, targetRef, personRef))) {
        throw new ForbiddenError(`caller is not a member of target scope id ${targetRef}`)
      }

      const active = await activeVersion(client, targetRef, docPath)
      const commit = !active || active.author === personRef
      const status = commit ? "committed" : "pending"

      const version = await nextVersion(client, targetRef, docPath)
      const finalized = commit
      await client.query(
        `INSERT INTO versions
           (scope_id, doc_path, version, status, is_deletion, data, meta, author,
            finalized_at, finalized_by)
         VALUES ($1, $2, $3, $4::version_status, false, $5::jsonb, $6::jsonb, $7, $8, $9)`,
        [
          targetRef, docPath, version, status, source.data, source.meta, personRef,
          finalized ? new Date() : null,
          finalized ? personRef : null,
        ]
      )
      await copyBlobs(client, leafId, source.version, targetRef, version, docPath)

      distributions.push(
        commit
          ? { targetScopeRef: String(targetRef), status: "committed", version }
          : { targetScopeRef: String(targetRef), status: "pending", pendingVersion: version }
      )
    }

    await client.query("COMMIT")
    return { distributions }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

module.exports = { distribute }
