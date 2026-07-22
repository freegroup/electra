// Promote (vertical) + review (approve/reject) — README §6.5, §6.6, §6.7, §6.8.
//
// promote() offers the caller's active leaf version to the next level up. If
// that level auto-approves (required_approval_score = 0) it commits and the
// promote cascades further up through other score-0 levels. Otherwise a
// pending version is created for that level's reviewers.
//
// A commit at a level (immediately, by cascade, or later by approval):
//   - becomes the level's new active version,
//   - auto-rejects every other open promotion for the same (scope, path) (§6.7),
//   - physically drops the caller's original leaf copy of the path (§6.8).

const { pool } = require("./pool")
const { validateDocPath } = require("./docs")
const { pathOfScope, stripPrefix } = require("./scopes")
const {
  NotFoundError,
  BadRequestError,
  OutdatedError,
  ForbiddenError,
} = require("../utils/errors")

// ---------------------------------------------------------------------------
// Small query helpers (operate on a caller-supplied client / transaction)
// ---------------------------------------------------------------------------

async function getScopeRow(client, scopeId) {
  const res = await client.query(
    `SELECT id, parent_id, required_approval_score, promote_ceiling FROM scopes WHERE id = $1`,
    [scopeId]
  )
  return res.rowCount === 0 ? null : res.rows[0]
}

async function leafUnder(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
    [scopeId, personRef]
  )
  return res.rowCount === 0 ? null : res.rows[0].id
}

// The active version row (highest committed/deleted) for a (scope, path).
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

async function nextVersion(client, scopeId, docPath) {
  const res = await client.query(
    `SELECT COALESCE(MAX(version), 0) + 1 AS v FROM versions
      WHERE scope_id = $1 AND doc_path = $2`,
    [scopeId, docPath]
  )
  return res.rows[0].v
}

// Copies blobs from one version to another (source → target) for a path.
async function copyBlobs(client, srcScope, srcVer, dstScope, dstVer, docPath) {
  await client.query(
    `INSERT INTO blobs (scope_id, doc_path, version, key, content_type, size_bytes, data)
     SELECT $3::bigint, $5, $4, key, content_type, size_bytes, data
     FROM blobs
     WHERE scope_id = $1 AND doc_path = $5 AND version = $2`,
    [srcScope, srcVer, dstScope, dstVer, docPath]
  )
}

// Supersede the caller's own still-open promotion at a level (§6.5 amend rule).
async function supersedeOwnPending(client, scopeId, docPath, author) {
  await client.query(
    `UPDATE versions
        SET status = 'rejected', finalized_at = now(), finalized_by = $3,
            rejection_reason = 'superseded by a newer version from the same author'
      WHERE scope_id = $1 AND doc_path = $2 AND author = $3 AND status = 'pending'`,
    [scopeId, docPath, author]
  )
}

// Auto-reject every OTHER open promotion for a (scope, path) once one commits
// (§6.7). `keepVersion` is the version that won and must not be rejected.
async function autoRejectOthers(client, scopeId, docPath, keepVersion) {
  await client.query(
    `UPDATE versions
        SET status = 'rejected', finalized_at = now(),
            rejection_reason = 'superseded by a committed version'
      WHERE scope_id = $1 AND doc_path = $2 AND status = 'pending' AND version <> $3`,
    [scopeId, docPath, keepVersion]
  )
}

// Physically drop the caller's original leaf copy of a path after a commit
// (§6.8). Idempotent — safe to call more than once.
async function cleanupLeaf(client, leafScopeId, docPath) {
  await client.query(
    `DELETE FROM versions WHERE scope_id = $1 AND doc_path = $2`,
    [leafScopeId, docPath]
  )
}

// Cascading cleanup when a deletion commits at the root (§6.9): every remaining
// version of the path across all descendant scopes is physically removed. The
// root tombstone itself is kept so the path reads as deleted everywhere.
async function cascadeRootDelete(client, rootScopeId, docPath) {
  await client.query(
    `DELETE FROM versions v
      USING scope_closure c
      WHERE c.ancestor_id = $1
        AND v.scope_id = c.descendant_id
        AND v.scope_id <> $1
        AND v.doc_path = $2`,
    [rootScopeId, docPath]
  )
}

// Inserts a new version row at a level and copies the source blobs into it.
// Returns the inserted version number.
async function insertVersion(client, {
  scopeId, docPath, status, isDeletion, data, meta, author,
  srcScope, srcVersion,
}) {
  const version = await nextVersion(client, scopeId, docPath)
  const finalized = status !== "pending"
  const ins = await client.query(
    `INSERT INTO versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author,
        finalized_at, finalized_by)
     VALUES ($1, $2, $3, $4::version_status, $5, $6::jsonb, $7::jsonb, $8,
             $9, $10)
     RETURNING uuid`,
    [
      scopeId, docPath, version, status, isDeletion, data, meta, author,
      finalized ? new Date() : null,
      finalized ? author : null,
    ]
  )
  if (srcScope != null) {
    await copyBlobs(client, srcScope, srcVersion, scopeId, version, docPath)
  }
  return { version, uuid: ins.rows[0].uuid }
}

// Deliver a source version's payload into ONE target scope, applying that
// scope's review rules — the shared core of promote (one level at a time) and
// distribute (each chosen target). This is the single place the "goes live vs.
// needs review" decision lives:
//   - required_approval_score === 0 → committed at once (trivial quorum),
//   - otherwise → a pending version, plus the caller's own self-approval (§6.6)
//     if they are a reviewer here (their vote may reach the threshold alone).
// `cleanupLeafId` is the caller's source leaf to physically drop once the
// delivery commits: promote passes it (the personal copy is consumed as it rises
// one level), distribute passes null (a horizontal share into a *different*
// scope must keep the distributor's own draft). Returns
// { status: "committed"|"deleted"|"pending", scopeRef, version }.
async function deliverToScope(client, {
  targetScope, docPath, isDeletion, data, meta, author,
  srcScope, srcVersion, cleanupLeafId = null,
}) {
  await supersedeOwnPending(client, targetScope.id, docPath, author)

  if (targetScope.required_approval_score === 0) {
    const { version, uuid } = await insertVersion(client, {
      scopeId: targetScope.id, docPath,
      status: isDeletion ? "deleted" : "committed",
      isDeletion, data, meta, author, srcScope, srcVersion,
    })
    await autoRejectOthers(client, targetScope.id, docPath, version)
    if (isDeletion && !targetScope.parent_id) {
      await cascadeRootDelete(client, targetScope.id, docPath)
    }
    if (cleanupLeafId != null) await cleanupLeaf(client, cleanupLeafId, docPath)
    return { status: isDeletion ? "deleted" : "committed", scopeRef: String(targetScope.id), version, uuid }
  }

  const { version, uuid } = await insertVersion(client, {
    scopeId: targetScope.id, docPath,
    status: "pending", isDeletion, data, meta, author, srcScope, srcVersion,
  })
  const committed = await maybeSelfApprove(
    client, targetScope, docPath, version, author, isDeletion, cleanupLeafId)
  return committed
    ? { status: isDeletion ? "deleted" : "committed", scopeRef: String(targetScope.id), version, uuid }
    : { status: "pending", scopeRef: String(targetScope.id), version, uuid }
}

// ---------------------------------------------------------------------------
// Promote
// ---------------------------------------------------------------------------

async function promote({ operatingScopeId, personRef, docPath, expectedVersion, description }) {
  validateDocPath(docPath)

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const leafId = await leafUnder(client, operatingScopeId, personRef)
    if (!leafId) throw new NotFoundError("no local version to promote")

    const leaf = await activeVersion(client, leafId, docPath)
    if (!leaf) throw new NotFoundError(`no local version at ${docPath} to promote`)
    if (expectedVersion != null && expectedVersion !== leaf.version) {
      throw new OutdatedError(
        `leaf version is ${leaf.version}, caller promoted ${expectedVersion}`,
        { current: leaf.version, expected: expectedVersion }
      )
    }

    const operating = await getScopeRow(client, operatingScopeId)

    // Base meta travels with the document, but the review note (_review) is
    // per-promote: a stale description from an earlier round must never stick
    // to a new promotion, so it is always dropped and only re-set when the
    // caller provided one this time.
    const baseMeta = { ...(leaf.meta || {}) }
    delete baseMeta._review
    const lineageMeta = {
      ...baseMeta,
      _lineage: { fromScope: String(leafId), fromVersion: leaf.version },
      ...(description ? { _review: { description } } : {}),
    }

    // The leaf's version is promoted to the shared version of the operating
    // scope (one level up from the leaf), then cascades further up through any
    // score-0 levels, halting at the first level that requires review or the
    // root.
    let src = { scope: leafId, version: leaf.version }
    let target = operating
    let result = null
    let committedAtImmediateParent = false
    let isImmediate = true

    while (target) {
      await supersedeOwnPending(client, target.id, docPath, personRef)

      if (target.required_approval_score === 0) {
        const { version, uuid } = await insertVersion(client, {
          scopeId: target.id, docPath,
          status: leaf.is_deletion ? "deleted" : "committed",
          isDeletion: leaf.is_deletion,
          data: leaf.data, meta: lineageMeta, author: personRef,
          srcScope: src.scope, srcVersion: src.version,
        })
        await autoRejectOthers(client, target.id, docPath, version)
        if (leaf.is_deletion && !target.parent_id) {
          await cascadeRootDelete(client, target.id, docPath)
        }
        result = { status: leaf.is_deletion ? "deleted" : "committed", scopeRef: String(target.id), version, uuid }
        if (isImmediate) committedAtImmediateParent = true

        src = { scope: target.id, version }
        // Promote ceiling (§6.5): content may land ON this scope but must not
        // rise above it — halt the cascade here even if the parent is score-0.
        target = (target.promote_ceiling || !target.parent_id)
          ? null
          : await getScopeRow(client, target.parent_id)
        isImmediate = false
        continue
      }

      // Level requires review → create a pending version.
      const { version, uuid } = await insertVersion(client, {
        scopeId: target.id, docPath,
        status: "pending", isDeletion: leaf.is_deletion,
        data: leaf.data, meta: lineageMeta, author: personRef,
        srcScope: src.scope, srcVersion: src.version,
      })
      result = { status: "pending", scopeRef: String(target.id), version, uuid }

      // Self-approval (§6.6): if the caller is a reviewer here, cast their vote
      // straight away — it may reach the threshold on its own.
      const committed = await maybeSelfApprove(client, target, docPath, version, personRef, leaf.is_deletion, leafId)
      if (committed) {
        result = { status: leaf.is_deletion ? "deleted" : "committed", scopeRef: String(target.id), version, uuid }
        if (isImmediate) committedAtImmediateParent = true
      }
      break
    }

    // Cleanup the original leaf once the immediate parent has committed (§6.8).
    if (committedAtImmediateParent) {
      await cleanupLeaf(client, leafId, docPath)
    }

    await client.query("COMMIT")
    return result
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// If the caller is a reviewer of `scope`, record their approve vote and run a
// quorum check. Returns true if the version committed as a result.
async function maybeSelfApprove(client, scope, docPath, version, personRef, isDeletion, leafId) {
  const rev = await client.query(
    `SELECT reviewer_score FROM memberships
      WHERE scope_id = $1 AND person_ref = $2 AND reviewer_score IS NOT NULL`,
    [scope.id, personRef]
  )
  if (rev.rowCount === 0) return false

  await castVote(client, scope.id, docPath, version, personRef, "approve", rev.rows[0].reviewer_score)
  return quorumCheck(client, scope, docPath, version, isDeletion, leafId)
}

async function castVote(client, scopeId, docPath, version, voter, kind, score) {
  await client.query(
    `INSERT INTO votes (scope_id, doc_path, version, voter, kind, score_snapshot)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (scope_id, doc_path, version, voter)
     DO UPDATE SET kind = $5, score_snapshot = $6, voted_at = now()`,
    [scopeId, docPath, version, voter, kind, score]
  )
}

// Commits the pending version if approve scores reached the threshold. Returns
// true on commit.
async function quorumCheck(client, scope, docPath, version, isDeletion, leafId) {
  const sumRes = await client.query(
    `SELECT COALESCE(SUM(score_snapshot), 0) AS total FROM votes
      WHERE scope_id = $1 AND doc_path = $2 AND version = $3 AND kind = 'approve'`,
    [scope.id, docPath, version]
  )
  if (sumRes.rows[0].total < scope.required_approval_score) return false

  await client.query(
    `UPDATE versions
        SET status = $4, finalized_at = now()
      WHERE scope_id = $1 AND doc_path = $2 AND version = $3`,
    [scope.id, docPath, version, isDeletion ? "deleted" : "committed"]
  )
  await autoRejectOthers(client, scope.id, docPath, version)
  if (isDeletion && !scope.parent_id) {
    await cascadeRootDelete(client, scope.id, docPath)
  }
  if (leafId != null) await cleanupLeaf(client, leafId, docPath)
  return true
}

// ---------------------------------------------------------------------------
// Reviewer side: list pending, approve, reject
// ---------------------------------------------------------------------------

async function listPending({ scopeId }) {
  const res = await pool.query(
    `SELECT scope_id, doc_path, version, status, is_deletion, data, meta,
            author, created_at
       FROM versions
      WHERE scope_id = $1 AND status = 'pending'
      ORDER BY doc_path, version`,
    [scopeId]
  )
  // Attach votes per pending row.
  const out = []
  for (const r of res.rows) {
    const votes = await pool.query(
      `SELECT voter, kind, score_snapshot, reason, voted_at FROM votes
        WHERE scope_id = $1 AND doc_path = $2 AND version = $3
        ORDER BY voted_at`,
      [r.scope_id, r.doc_path, r.version]
    )
    out.push({
      scopeRef: String(r.scope_id),
      path: r.doc_path,
      version: r.version,
      status: r.status,
      isDeletion: r.is_deletion,
      data: r.data,
      meta: r.meta,
      author: r.author,
      createdAt: r.created_at,
      votes: votes.rows,
    })
  }
  return out
}

// Aggregated review queue: every pending version in every scope where
// personRef is a reviewer, annotated with the score situation (required vs.
// already approved vs. what the caller's own vote would add) so a UI can
// render the whole inbox without further roundtrips. Content (data) is
// deliberately excluded — the editor fetches it via the version-pinned read.
async function reviewQueue({ personRef }) {
  const res = await pool.query(
    `SELECT v.scope_id, v.doc_path, v.version, v.uuid, v.is_deletion, v.author, v.created_at,
            v.meta->'_review'->>'description' AS description,
            s.label, s.required_approval_score,
            m.reviewer_score AS my_score,
            m.is_admin       AS is_admin,
            COALESCE((SELECT SUM(vt.score_snapshot)::int FROM votes vt
                       WHERE vt.scope_id = v.scope_id AND vt.doc_path = v.doc_path
                         AND vt.version = v.version AND vt.kind = 'approve'), 0) AS approved_score,
            EXISTS (SELECT 1 FROM votes vt
                     WHERE vt.scope_id = v.scope_id AND vt.doc_path = v.doc_path
                       AND vt.version = v.version AND vt.voter = $1) AS already_voted
       FROM memberships m
       JOIN scopes s   ON s.id = m.scope_id
       JOIN versions v ON v.scope_id = m.scope_id AND v.status = 'pending'
      WHERE m.person_ref = $1 AND (m.reviewer_score IS NOT NULL OR m.is_admin = true)
      ORDER BY v.created_at ASC, v.scope_id ASC, v.doc_path ASC`,
    [personRef]
  )

  const pathCache = new Map()
  const out = []
  for (const r of res.rows) {
    let scopePath = pathCache.get(r.scope_id)
    if (scopePath === undefined) {
      scopePath = stripPrefix(await pathOfScope(pool, r.scope_id))
      pathCache.set(r.scope_id, scopePath)
    }
    out.push({
      scopeRef: String(r.scope_id),
      scopePath: scopePath,
      scopeLabel: r.label,
      path: r.doc_path,
      version: r.version,
      uuid: r.uuid,
      isDeletion: r.is_deletion,
      author: r.author,
      createdAt: r.created_at,
      description: r.description || null,
      requiredScore: r.required_approval_score,
      approvedScore: r.approved_score,
      myScore: r.my_score,
      alreadyVoted: r.already_voted,
      isAdmin: r.is_admin,
      // The caller raised this request — they may withdraw it at any time.
      isAuthor: String(r.author) === String(personRef),
    })
  }
  return out
}

// The author's view of the same data: every still-open promotion the caller
// has authored, with the score situation. Lets the Draft pane show "in
// review, 2 of 5 points" on the rows whose promote is awaiting approval.
async function myPendingPromotions({ personRef }) {
  const res = await pool.query(
    `SELECT v.scope_id, v.doc_path, v.version, v.uuid, v.created_at,
            v.meta->'_review'->>'description' AS description,
            s.label, s.required_approval_score,
            COALESCE((SELECT SUM(vt.score_snapshot)::int FROM votes vt
                       WHERE vt.scope_id = v.scope_id AND vt.doc_path = v.doc_path
                         AND vt.version = v.version AND vt.kind = 'approve'), 0) AS approved_score
       FROM versions v
       JOIN scopes s ON s.id = v.scope_id
      WHERE v.status = 'pending' AND v.author = $1
      ORDER BY v.created_at ASC`,
    [personRef]
  )

  const pathCache = new Map()
  const out = []
  for (const r of res.rows) {
    let scopePath = pathCache.get(r.scope_id)
    if (scopePath === undefined) {
      scopePath = stripPrefix(await pathOfScope(pool, r.scope_id))
      pathCache.set(r.scope_id, scopePath)
    }
    out.push({
      scopeRef: String(r.scope_id),
      scopePath: scopePath,
      scopeLabel: r.label,
      path: r.doc_path,
      version: r.version,
      uuid: r.uuid,
      createdAt: r.created_at,
      description: r.description || null,
      requiredScore: r.required_approval_score,
      approvedScore: r.approved_score,
    })
  }
  return out
}

async function approve({ scopeId, personRef, docPath, version, score }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const scope = await getScopeRow(client, scopeId)
    if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)

    const pending = await pendingRow(client, scopeId, docPath, version)
    if (!pending) throw new OutdatedError("this promotion is no longer open")

    const leafId = lineageLeaf(pending.meta)
    await castVote(client, scopeId, docPath, version, personRef, "approve", score)
    const committed = await quorumCheck(client, scope, docPath, version, pending.is_deletion, leafId)

    await client.query("COMMIT")
    return { committed, status: committed ? (pending.is_deletion ? "deleted" : "committed") : "pending" }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

async function reject({ scopeId, personRef, docPath, version, score, reason, isAdmin }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const pending = await pendingRow(client, scopeId, docPath, version)
    if (!pending) throw new OutdatedError("this promotion is no longer open")

    // Once you've cast a vote you can't reject — approving and then rejecting the
    // same version is contradictory (the UI hides Reject too). An admin may
    // override this: they can reject a request outright even after voting.
    const voted = await client.query(
      `SELECT 1 FROM votes WHERE scope_id = $1 AND doc_path = $2 AND version = $3 AND voter = $4 LIMIT 1`,
      [scopeId, docPath, version, personRef]
    )
    if (voted.rowCount > 0 && !isAdmin) {
      throw new ForbiddenError("you have already voted on this version and cannot reject it")
    }

    await castVote(client, scopeId, docPath, version, personRef, "reject", score)
    await client.query(
      `UPDATE versions
          SET status = 'rejected', finalized_at = now(), finalized_by = $4,
              rejection_reason = $5
        WHERE scope_id = $1 AND doc_path = $2 AND version = $3`,
      [scopeId, docPath, version, personRef, reason || "rejected by reviewer"]
    )

    await client.query("COMMIT")
    return { rejected: true }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// Withdraw — the author cancels their own still-open request. Always allowed to
// the author, whatever the votes so far (README §9.4). Deletes the pending
// version (votes cascade). For a withdrawn DELETION we also drop the caller's
// leaf tombstone so the document reappears for them; a withdrawn change leaves
// the caller's personal copy in place.
async function withdraw({ scopeId, personRef, docPath, version }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const pending = await pendingRow(client, scopeId, docPath, version)
    if (!pending) throw new OutdatedError("this request is no longer open")
    if (String(pending.author) !== String(personRef)) {
      throw new ForbiddenError("only the author can withdraw this request")
    }

    await client.query(
      `DELETE FROM versions WHERE scope_id = $1 AND doc_path = $2 AND version = $3`,
      [scopeId, docPath, version]
    )

    if (pending.is_deletion) {
      const leafId = lineageLeaf(pending.meta)
      if (leafId != null) await cleanupLeaf(client, leafId, docPath)
    }

    await client.query("COMMIT")
    return { withdrawn: true }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// Admin force-commit: an admin of the scope commits a pending version outright,
// overriding the reviewer-point threshold. Distinct from approve (a vote that
// only commits once the quorum is reached). The route enforces admin; this just
// commits and records who accepted it.
async function accept({ scopeId, personRef, docPath, version }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const scope = await getScopeRow(client, scopeId)
    if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)

    const pending = await pendingRow(client, scopeId, docPath, version)
    if (!pending) throw new OutdatedError("this promotion is no longer open")

    await client.query(
      `UPDATE versions
          SET status = $4, finalized_at = now(), finalized_by = $5
        WHERE scope_id = $1 AND doc_path = $2 AND version = $3`,
      [scopeId, docPath, version, pending.is_deletion ? "deleted" : "committed", personRef]
    )
    await autoRejectOthers(client, scopeId, docPath, version)
    if (pending.is_deletion && !scope.parent_id) {
      await cascadeRootDelete(client, scopeId, docPath)
    }
    const leafId = lineageLeaf(pending.meta)
    if (leafId != null) await cleanupLeaf(client, leafId, docPath)

    await client.query("COMMIT")
    return { committed: true, status: pending.is_deletion ? "deleted" : "committed" }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

async function pendingRow(client, scopeId, docPath, version) {
  const res = await client.query(
    `SELECT scope_id, doc_path, version, is_deletion, meta, author
       FROM versions
      WHERE scope_id = $1 AND doc_path = $2 AND version = $3 AND status = 'pending'`,
    [scopeId, docPath, version]
  )
  return res.rowCount === 0 ? null : res.rows[0]
}

function lineageLeaf(meta) {
  const l = meta && meta._lineage
  return l && l.fromScope ? l.fromScope : null
}

module.exports = { promote, listPending, reviewQueue, myPendingPromotions, approve, reject, withdraw, accept, deliverToScope, getScopeRow }
