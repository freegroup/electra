// Document persistence: put / get (walk-up) / list (effective view) / revert.
//
// Walk-up (README §6.2): from the operating scope up to the root, at EVERY
// level check the caller's own leaf first, then the shared version at that
// level. The nearest hit wins; a tombstone (deleted) ends the walk-up as
// "not found". Foreign leaves are never consulted.

const { pool } = require("./pool")
const { NotFoundError, BadRequestError, OutdatedError } = require("../utils/errors")
const { stripPrefix } = require("./scopes")

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
    uuid: row.uuid,
    data: row.data,
    meta: row.meta,
    scope: stripPrefix(originScopePath),
    path: row.doc_path,
    version: row.version,
    status: row.status,
    author: row.author,
    createdAt: row.created_at,
  }
}

// ---------------------------------------------------------------------------
// Walk-up "slots" — README §6.2
// ---------------------------------------------------------------------------
//
// For an operating scope, the closure gives every ancestor level (depth 0 =
// operating scope, increasing upward). At each level there are two candidate
// slots, in priority order:
//   slot 0 — the caller's own leaf at that level (scope whose parent is the
//            level and whose name == personRef)
//   slot 1 — the shared version stored on the level itself
// The winner is the lowest (depth, slot). personRef null (anonymous) matches
// no leaf, so only shared slots participate.
//
// $1 = operating scope id, $2 = personRef (nullable), $3 = doc path
const WALKUP_SLOTS = `
  WITH levels AS (
    SELECT c.ancestor_id AS level_id, c.depth
    FROM scope_closure c
    WHERE c.descendant_id = $1
  ),
  slots AS (
    SELECT l.depth, 0 AS slot_rank, leaf.id AS scope_id
    FROM levels l
    JOIN scopes leaf ON leaf.parent_id = l.level_id AND leaf.name = $2
    UNION ALL
    SELECT l.depth, 1 AS slot_rank, l.level_id AS scope_id
    FROM levels l
  )
`

// ---------------------------------------------------------------------------
// Walk-up lookup
// ---------------------------------------------------------------------------

async function getDoc({ operatingScopeId, personRef, docPath, resolveOriginPath }) {
  validateDocPath(docPath)

  const res = await pool.query(
    `${WALKUP_SLOTS},
     active AS (
       SELECT DISTINCT ON (s.depth, s.slot_rank)
              s.depth, s.slot_rank,
              v.scope_id, v.doc_path, v.version, v.uuid, v.status, v.is_deletion,
              v.data, v.meta, v.author, v.created_at
       FROM slots s
       JOIN versions v ON v.scope_id = s.scope_id
                      AND v.doc_path = $3
                      AND v.status IN ('committed', 'deleted')
       ORDER BY s.depth, s.slot_rank, v.version DESC
     )
     SELECT * FROM active
     ORDER BY depth ASC, slot_rank ASC
     LIMIT 1`,
    [operatingScopeId, personRef, docPath]
  )
  if (res.rowCount === 0) return null
  const row = res.rows[0]
  if (row.status === "deleted" || row.is_deletion) return null // tombstone → not found

  const originPath = await resolveOriginPath(row.scope_id)
  return rowToDoc(row, originPath)
}

// Resolve the effective version of a doc for a caller (same walk-up as getDoc)
// but return its CONCRETE location { scopeId, version } — the exact scope/leaf
// the effective version lives in. Used to mint a render token that points at
// the real version, not the operating scope (which may only inherit it).
async function resolveEffective({ operatingScopeId, personRef, docPath }) {
  validateDocPath(docPath)
  const res = await pool.query(
    `${WALKUP_SLOTS},
     active AS (
       SELECT DISTINCT ON (s.depth, s.slot_rank)
              s.depth, s.slot_rank, v.scope_id, v.version, v.status, v.is_deletion
       FROM slots s
       JOIN versions v ON v.scope_id = s.scope_id
                      AND v.doc_path = $3
                      AND v.status IN ('committed', 'deleted')
       ORDER BY s.depth, s.slot_rank, v.version DESC
     )
     SELECT * FROM active ORDER BY depth ASC, slot_rank ASC LIMIT 1`,
    [operatingScopeId, personRef, docPath]
  )
  if (res.rowCount === 0) return null
  const row = res.rows[0]
  if (row.status === "deleted" || row.is_deletion) return null
  return { scopeId: String(row.scope_id), version: row.version }
}

// ---------------------------------------------------------------------------
// Effective list
// ---------------------------------------------------------------------------

async function listDocs({ operatingScopeId, personRef, prefix, resolveOriginPath }) {
  const res = await pool.query(
    `${WALKUP_SLOTS},
     ranked AS (
       SELECT DISTINCT ON (v.doc_path)
              v.doc_path, s.depth, s.slot_rank,
              v.scope_id, v.version, v.uuid, v.status, v.is_deletion,
              v.data, v.meta, v.author, v.created_at
       FROM slots s
       JOIN versions v ON v.scope_id = s.scope_id
                      AND v.status IN ('committed', 'deleted')
                      AND ($3::text IS NULL OR v.doc_path LIKE $3 || '%')
       ORDER BY v.doc_path, s.depth ASC, s.slot_rank ASC, v.version DESC
     )
     SELECT * FROM ranked WHERE status = 'committed' AND is_deletion = false
     ORDER BY doc_path`,
    [operatingScopeId, personRef, prefix || null]
  )

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
// Glob list — aggregate across all the caller's groups under a root scope
// ---------------------------------------------------------------------------
//
// Unlike listDocs (walk-up from ONE operating scope), globDocs gives a global
// "provided by" view: every document visible to the caller anywhere under
// rootScopeId, collapsed to one row per doc_path. For each group the caller is
// an explicit member of (their operating scopes — personal leaves excluded),
// the tested walk-up runs; results merge keeping the nearest hit
// (own-leaf/slot 0 over shared/slot 1, then lowest depth, then highest version).
//
// Each row carries: path, provider (origin scope path) + providerVersion (where
// the effective version lives), author (who last committed it) and
// operatingScopeRef (the group that produced it → where a save from this row
// lands). No data/meta — the payload stays small.
async function globDocs({ rootScopeId, personRef, prefix, resolveOriginPath }) {
  // Operating scopes to walk up from:
  //   logged-in — the group scopes the caller is an explicit member of, at or
  //               under the root (personal leaves are not operable groups).
  //   anonymous — the anonymous-readable scopes at or under the root. With no
  //               personRef the walk-up's leaf slot matches nothing, so only
  //               shared versions surface (read-only, no personal copies).
  const opRes = personRef
    ? await pool.query(
        `SELECT DISTINCT m.scope_id, s.promote_ceiling,
                s.required_approval_score, m.reviewer_score
           FROM memberships m
           JOIN scope_closure c ON c.descendant_id = m.scope_id
           JOIN scopes s        ON s.id = m.scope_id
          WHERE c.ancestor_id = $1
            AND m.person_ref  = $2
            AND m.is_member   = true
            AND s.is_personal_leaf = false`,
        [rootScopeId, personRef]
      )
    : await pool.query(
        `SELECT s.id AS scope_id, s.promote_ceiling,
                s.required_approval_score, NULL::int AS reviewer_score
           FROM scopes s
           JOIN scope_closure c ON c.descendant_id = s.id
          WHERE c.ancestor_id = $1
            AND s.is_anonymous = true`,
        [rootScopeId]
      )

  // scope_id → is that operating scope a promote ceiling? (content there may not
  // rise into shared scopes; only distribute can move it out).
  const ceilingByScope = new Map(opRes.rows.map((r) => [String(r.scope_id), !!r.promote_ceiling]))
  // scope_id → would the caller's promote (e.g. a shared delete) commit right
  // away? Mirrors maybeSelfApprove: true when the scope needs no review, or the
  // caller's own reviewer points already reach the threshold. Otherwise the
  // action opens a review. (Admin-ness alone does NOT auto-commit a promote.)
  const immediateByScope = new Map(opRes.rows.map((r) => {
    const required = r.required_approval_score
    const score = r.reviewer_score
    const immediate = required === 0 || (score != null && required != null && score >= required)
    return [String(r.scope_id), immediate]
  }))

  // best[doc_path] = { row, opScopeId } — nearest hit across all operating scopes
  const best = new Map()
  for (const { scope_id: opScopeId } of opRes.rows) {
    const res = await pool.query(
      `${WALKUP_SLOTS},
       matches AS (
         SELECT v.doc_path, s.depth, s.slot_rank,
                v.scope_id, v.version, v.uuid, v.status, v.is_deletion, v.author
         FROM slots s
         JOIN versions v ON v.scope_id = s.scope_id
                        AND v.status IN ('committed', 'deleted')
                        AND ($3::text IS NULL OR v.doc_path LIKE $3 || '%')
       ),
       winner AS (
         SELECT DISTINCT ON (doc_path)
                doc_path, depth, slot_rank, scope_id, version, uuid, status, is_deletion, author
         FROM matches
         ORDER BY doc_path, depth ASC, slot_rank ASC, version DESC
       ),
       original AS (
         -- the shared version the caller's personal copy overlays (slot 1 only)
         -- — the "original". Also what a revert would restore.
         SELECT DISTINCT ON (doc_path)
                doc_path, status AS original_status, is_deletion AS original_is_deletion,
                scope_id AS original_scope_id, version AS original_version,
                uuid AS original_uuid
         FROM matches
         WHERE slot_rank = 1
         ORDER BY doc_path, depth ASC, version DESC
       )
       SELECT w.doc_path, w.depth, w.slot_rank, w.scope_id, w.version, w.uuid,
              w.status, w.is_deletion, w.author,
              COALESCE(o.original_status = 'committed' AND o.original_is_deletion = false, false) AS has_original,
              o.original_scope_id, o.original_version, o.original_uuid
       FROM winner w
       LEFT JOIN original o USING (doc_path)
       WHERE w.status = 'committed' AND w.is_deletion = false`,
      [opScopeId, personRef, prefix || null]
    )
    for (const row of res.rows) {
      const prev = best.get(row.doc_path)
      // Prefer own-leaf (lower slot_rank), then nearer level (lower depth),
      // then newer version.
      const better =
        !prev ||
        row.slot_rank < prev.row.slot_rank ||
        (row.slot_rank === prev.row.slot_rank && row.depth < prev.row.depth) ||
        (row.slot_rank === prev.row.slot_rank && row.depth === prev.row.depth && row.version > prev.row.version)
      if (better) best.set(row.doc_path, { row, opScopeId })
    }
  }

  const cache = new Map()
  const out = []
  for (const { row, opScopeId } of best.values()) {
    let providerPath = cache.get(row.scope_id)
    if (providerPath === undefined) {
      providerPath = await resolveOriginPath(row.scope_id)
      cache.set(row.scope_id, providerPath)
    }
    // Classify where the effective version comes from (README §6.2):
    //   personal      — only in the caller's own leaf; no shared version above
    //   personalCopy  — caller's leaf version shadowing a shared version above
    //   inherit       — the effective version is a shared/inherited one
    let instanceType
    if (row.slot_rank === 0) {
      instanceType = row.has_original ? "personalCopy" : "personal"
    } else {
      instanceType = "inherit"
    }
    // The shared "original" this row overlays — present only when the caller's
    // own leaf shadows a shared version (personalCopy). For personal (no shared
    // above) and inherit (the row IS the shared version) there is no separate
    // original. Carries the concrete scope+version so the caller can open the
    // original directly, bypassing the walk-up.
    let original = null
    if (instanceType === "personalCopy" && row.original_scope_id != null) {
      let originalProvider = cache.get(row.original_scope_id)
      if (originalProvider === undefined) {
        originalProvider = await resolveOriginPath(row.original_scope_id)
        cache.set(row.original_scope_id, originalProvider)
      }
      original = {
        scopeRef: String(row.original_scope_id),
        version: row.original_version,
        uuid: row.original_uuid,
        provider: stripPrefix(originalProvider),
      }
    }
    out.push({
      path: row.doc_path,
      uuid: row.uuid,
      provider: stripPrefix(providerPath),
      providerVersion: row.version,
      // Who last committed the effective version — the versions row carries it
      // anyway, so this is a column, not a join.
      author: row.author,
      operatingScopeRef: String(opScopeId),
      instanceType,
      original,
      // The operating scope is a promote ceiling → promoting here is a no-op
      // (content can't rise into shared scopes); only distribute can share it.
      promoteCeiling: ceilingByScope.get(String(opScopeId)) === true,
      // Would a shared delete here commit immediately (no review needed) or open
      // a deletion review? Drives the Delete vs Request Deletion affordance.
      deleteImmediate: immediateByScope.get(String(opScopeId)) === true,
    })
  }
  out.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
  return out
}

// ---------------------------------------------------------------------------
// Serializable write transactions with retry
// ---------------------------------------------------------------------------
//
// putDoc/deleteDoc run under SERIALIZABLE: both read MAX(version) and insert
// MAX+1, so two concurrent writers race. Postgres resolves the race by
// aborting one side — as 40001 (serialization failure, usually at COMMIT),
// 40P01 (deadlock), or 23505 (unique violation when the competitor already
// committed "our" version number). All three mean the same thing here: the
// snapshot went stale mid-transaction. Re-running the whole transaction
// recomputes MAX and re-checks expectedVersion, which yields either a clean
// append or a proper OutdatedError — never a spurious 500.
const RETRYABLE_SQLSTATES = new Set(["40001", "40P01", "23505"])

async function withSerializableRetry(run) {
  for (let attempt = 1; ; attempt++) {
    const client = await pool.connect()
    try {
      await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE")
      const result = await run(client)
      await client.query("COMMIT")
      return result
    } catch (err) {
      // After a failed COMMIT the transaction is already gone — the extra
      // ROLLBACK is a harmless no-op then, hence the swallowed rejection.
      await client.query("ROLLBACK").catch(() => {})
      if (!RETRYABLE_SQLSTATES.has(err.code) || attempt >= 5) throw err
    } finally {
      client.release()
    }
    // Brief jittered pause so the competing transaction can finish.
    await new Promise((r) => setTimeout(r, 10 * attempt + Math.floor(Math.random() * 20)))
  }
}

// ---------------------------------------------------------------------------
// Put (local override) — README §6.4, §6.12
// ---------------------------------------------------------------------------
//
// Writes a new version into the caller's leaf under the operating scope. The
// leaf is provisioned on demand on first write. Optimistic concurrency: when
// the passed doc names an existing leaf version, it must match the current
// active leaf version, else OutdatedError. A doc without a version (new doc,
// or an edit of an inherited version) starts a fresh version 1 in the leaf.
async function putDoc({ leafScopeId, docPath, data, meta, author, expectedVersion }) {
  validateDocPath(docPath)

  return withSerializableRetry(async (client) => {
    const maxRes = await client.query(
      `SELECT COALESCE(MAX(version), 0) AS max FROM versions
       WHERE scope_id = $1 AND doc_path = $2`,
      [leafScopeId, docPath]
    )
    const currentMax = maxRes.rows[0].max

    // Concurrency: an edit that claims to build on leaf version N must match
    // the current active leaf version. expectedVersion null/undefined means
    // "new document / first override" and only succeeds when the leaf has no
    // version yet OR when editing an inherited version (currentMax stays the
    // base for the next id either way).
    if (expectedVersion != null && expectedVersion !== currentMax) {
      throw new OutdatedError(
        `leaf version is ${currentMax}, caller based edit on ${expectedVersion}`,
        { current: currentMax, expected: expectedVersion }
      )
    }

    const nextVersion = currentMax + 1

    const insRes = await client.query(
      `INSERT INTO versions
         (scope_id, doc_path, version, status, is_deletion, data, meta, author)
       VALUES ($1, $2, $3, 'committed', false, $4::jsonb, $5::jsonb, $6)
       RETURNING scope_id, doc_path, version, uuid, status,
                 data, meta, author, created_at`,
      [leafScopeId, docPath, nextVersion, data || {}, meta || {}, author]
    )

    // Auto-copy blobs from the previous effective version (walk-up target).
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

    return insRes.rows[0]
  })
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

// ---------------------------------------------------------------------------
// Delete (local) — README §6.9
// ---------------------------------------------------------------------------
//
// A local delete writes a tombstone version into the caller's leaf: a new
// version with is_deletion = true. The walk-up then treats the path as gone
// for the caller only (it keys on is_deletion, not on the data) — so the
// tombstone may carry a snapshot of the deleted document's `data`. We keep that
// snapshot (the caller passes the effective version's data) so a deletion that
// goes to review can still be previewed and opened read-only by reviewers.
// Promoting this tombstone carries the deletion (and its snapshot) upward
// (see promote.js), where a commit becomes the level's `deleted` tombstone.
async function deleteDoc({ leafScopeId, docPath, author, expectedVersion, data }) {
  validateDocPath(docPath)

  return withSerializableRetry(async (client) => {
    const maxRes = await client.query(
      `SELECT COALESCE(MAX(version), 0) AS max FROM versions
       WHERE scope_id = $1 AND doc_path = $2`,
      [leafScopeId, docPath]
    )
    const currentMax = maxRes.rows[0].max
    if (expectedVersion != null && expectedVersion !== currentMax) {
      throw new OutdatedError(
        `leaf version is ${currentMax}, caller based delete on ${expectedVersion}`,
        { current: currentMax, expected: expectedVersion }
      )
    }

    const insRes = await client.query(
      `INSERT INTO versions
         (scope_id, doc_path, version, status, is_deletion, data, meta, author)
       VALUES ($1, $2, $3, 'committed', true, $5::jsonb, '{}'::jsonb, $4)
       RETURNING scope_id, doc_path, version, uuid, status, is_deletion, author, created_at`,
      [leafScopeId, docPath, currentMax + 1, author, data || {}]
    )
    return insRes.rows[0]
  })
}

// ---------------------------------------------------------------------------
// History — README §7, §9.2
// ---------------------------------------------------------------------------
//
// Every version of a path across the scopes the walk-up touches (the caller's
// leaves and each shared level from the operating scope up to the root), newest
// first, each annotated with its origin scope and reviewer votes.
async function historyDocs({ operatingScopeId, personRef, docPath, resolveOriginPath }) {
  validateDocPath(docPath)

  const res = await pool.query(
    `${WALKUP_SLOTS}
     SELECT v.scope_id, v.doc_path, v.version, v.uuid, v.status, v.is_deletion,
            v.author, v.created_at, v.finalized_at, v.rejection_reason
     FROM slots s
     JOIN versions v ON v.scope_id = s.scope_id AND v.doc_path = $3
     ORDER BY s.depth ASC, s.slot_rank ASC, v.version DESC`,
    [operatingScopeId, personRef, docPath]
  )

  const cache = new Map()
  const out = []
  for (const row of res.rows) {
    let originPath = cache.get(row.scope_id)
    if (originPath === undefined) {
      originPath = await resolveOriginPath(row.scope_id)
      cache.set(row.scope_id, originPath)
    }
    const votes = await pool.query(
      `SELECT voter, kind, score_snapshot, reason, voted_at FROM votes
        WHERE scope_id = $1 AND doc_path = $2 AND version = $3 ORDER BY voted_at`,
      [row.scope_id, row.doc_path, row.version]
    )
    out.push({
      uuid: row.uuid,
      scope: originPath,
      path: row.doc_path,
      version: row.version,
      status: row.status,
      isDeletion: row.is_deletion,
      author: row.author,
      createdAt: row.created_at,
      finalizedAt: row.finalized_at,
      rejectionReason: row.rejection_reason,
      votes: votes.rows,
    })
  }
  return out
}

module.exports = { getDoc, resolveEffective, listDocs, globDocs, putDoc, deleteDoc, revertDoc, historyDocs, rowToDoc, validateDocPath, WALKUP_SLOTS }
