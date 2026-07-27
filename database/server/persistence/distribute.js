// Distribute — horizontal delivery to several target scopes. README §6.16.
//
// Takes one of the caller's own leaf versions and delivers it into each chosen
// target scope, applying the SAME review rules as promote per target (via the
// shared deliverToScope): required_approval_score===0 commits at once, otherwise
// a pending version is created (plus the caller's self-approval §6.6 if they are
// a reviewer there). A distribution is never immediately visible outside those
// two paths. The distributor is recorded as author; blobs are copied from the
// source version; the path is unchanged. Unlike promote, the source draft is
// KEPT (cleanupLeafId=null) — horizontal sharing into a different scope.

const { pool } = require("./pool")
const { validateDocPath } = require("./docs")
const { deliverToScope, getScopeRow, recordDocActivity } = require("./promote")
const activity = require("./activity")
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

async function distribute({ sourceScopeId, personRef, docPath, expectedVersion, targetScopeRefs, description }) {
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

    // Build the delivered meta once, mirroring promote: drop any stale review
    // note, record the lineage, and (re)attach the review note only when the
    // caller supplied one this time (shown to reviewers of pending targets).
    const baseMeta = { ...(source.meta || {}) }
    delete baseMeta._review
    const meta = {
      ...baseMeta,
      _lineage: { fromScope: String(leafId), fromVersion: source.version },
      ...(description ? { _review: { description } } : {}),
    }

    const distributions = []
    for (const targetRef of targetScopeRefs) {
      if (!(await isMember(client, targetRef, personRef))) {
        throw new ForbiddenError(`caller is not a member of target scope id ${targetRef}`)
      }
      const targetScope = await getScopeRow(client, targetRef)
      if (!targetScope) throw new NotFoundError(`target scope id ${targetRef} not found`)

      const r = await deliverToScope(client, {
        targetScope,
        docPath,
        isDeletion: source.is_deletion,
        data: source.data,
        meta,
        author: personRef,
        srcScope: leafId,
        srcVersion: source.version,
        cleanupLeafId: null, // keep the distributor's own draft
      })
      distributions.push(
        r.status === "pending"
          ? { targetScopeRef: r.scopeRef, status: "pending", pendingVersion: r.version, uuid: r.uuid }
          : { targetScopeRef: r.scopeRef, status: r.status, version: r.version, uuid: r.uuid }
      )

      // Activity: a pending delivery asks that target's reviewers to review;
      // either way the distributor sees their own action (excludeActor:false).
      const del = source.is_deletion
      if (r.status === "pending") {
        await recordDocActivity(client, {
          actor: personRef, eventType: del ? "delete_requested" : "review_requested",
          recipients: await activity.recipientsForScope(client, r.scopeRef),
          scopeRef: r.scopeRef, docPath, version: r.version, uuid: r.uuid,
        })
        await recordDocActivity(client, {
          actor: personRef, eventType: del ? "i_delete_requested" : "i_submitted",
          recipients: [{ ref: personRef, role: "author" }],
          scopeRef: r.scopeRef, docPath, version: r.version, uuid: r.uuid, excludeActor: false,
        })
      } else {
        await recordDocActivity(client, {
          actor: personRef, eventType: del ? "deleted" : "committed",
          recipients: [{ ref: personRef, role: "author" }],
          scopeRef: r.scopeRef, docPath, version: r.version, uuid: r.uuid, excludeActor: false,
        })
      }
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
