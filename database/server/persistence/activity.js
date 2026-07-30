// Activity feed (transparency) — a generic, account-scoped notification inbox.
//
// record() is called from inside the domain transactions (promote/approve/…)
// with the caller's `client`, so an activity row commits atomically with the
// change that produced it. Reads (listActivity/unreadCount/markSeen) run on the
// pool. The feed is a plain read by `recipient`; "what have I done" is the same
// table read by `actor`. Nothing here is document-specific — the subject is
// optional and type-specific data lives in `meta`.

const crypto = require("crypto")
const { pool } = require("./pool")

// The people who act on reviews in a scope: reviewers (reviewer_score set) or
// admins. Inverse of the reviewQueue membership filter. -> [{ ref, role }]
async function recipientsForScope(client, scopeId) {
  const res = await client.query(
    `SELECT person_ref, is_admin, reviewer_score
       FROM memberships
      WHERE scope_id = $1 AND (reviewer_score IS NOT NULL OR is_admin = true)`,
    [scopeId]
  )
  return res.rows.map((r) => ({ ref: r.person_ref, role: r.is_admin ? "admin" : "reviewer" }))
}

// Append one activity row per recipient for a single event (fan-out on write),
// using the passed transaction client. By default the actor is dropped from the
// recipients (you don't notify yourself); pass excludeActor:false for the
// author's own history rows (i_approved/i_rejected). Idempotent via
// UNIQUE(event_id, recipient). Returns the event_id.
async function record(client, {
  eventId, recipients, actor, eventType, recipientRole,
  scopeId, scopeLabel, subjectKind, subjectRef, subjectLabel, reason, meta,
  excludeActor = true,
}) {
  const id = eventId || crypto.randomUUID()
  const seen = new Set()
  for (const r of recipients || []) {
    const ref = typeof r === "string" ? r : (r && r.ref)
    if (!ref || seen.has(ref)) continue
    if (excludeActor && ref === actor) continue
    seen.add(ref)
    const role = (r && typeof r === "object" && r.role) || recipientRole || null
    await client.query(
      `INSERT INTO activity
         (event_id, recipient, actor, event_type, recipient_role,
          scope_id, scope_label, subject_kind, subject_ref, subject_label,
          reason, meta)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb)
       ON CONFLICT (event_id, recipient) DO NOTHING`,
      [id, ref, actor, eventType, role,
       scopeId ?? null, scopeLabel ?? null,
       subjectKind ?? null, subjectRef ?? null, subjectLabel ?? null,
       reason ?? null, JSON.stringify(meta || {})]
    )
  }
  return id
}

function rowToActivity(r) {
  return {
    id: String(r.id),
    actor: r.actor,
    eventType: r.event_type,
    recipientRole: r.recipient_role,
    scopeRef: r.scope_id != null ? String(r.scope_id) : null,
    scopeLabel: r.scope_label,
    subjectKind: r.subject_kind,
    subjectRef: r.subject_ref,
    subjectLabel: r.subject_label,
    reason: r.reason,
    meta: r.meta || {},
    seen: r.seen_at != null,
    createdAt: r.created_at,
  }
}

// The caller's feed, newest first. `before` (an id) paginates older entries.
async function listActivity({ personRef, limit = 50, before }) {
  const params = [personRef]
  let where = "recipient = $1"
  if (before) { params.push(before); where += ` AND id < $${params.length}` }
  params.push(Math.min(Number(limit) || 50, 100))
  const res = await pool.query(
    `SELECT id, actor, event_type, recipient_role,
            scope_id, scope_label, subject_kind, subject_ref, subject_label,
            reason, meta, seen_at, created_at
       FROM activity
      WHERE ${where}
      ORDER BY id DESC
      LIMIT $${params.length}`,
    params
  )
  return res.rows.map(rowToActivity)
}

async function unreadCount({ personRef }) {
  const res = await pool.query(
    "SELECT count(*)::int AS n FROM activity WHERE recipient = $1 AND seen_at IS NULL",
    [personRef]
  )
  return res.rows[0].n
}

// Mark the given ids seen (scoped to the caller). Empty is a no-op — we never
// blanket-mark, so rows the caller hasn't actually seen stay unread.
async function markSeen({ personRef, ids }) {
  if (!Array.isArray(ids) || ids.length === 0) return { ok: true }
  await pool.query(
    `UPDATE activity SET seen_at = now()
      WHERE recipient = $1 AND seen_at IS NULL AND id = ANY($2::bigint[])`,
    [personRef, ids]
  )
  return { ok: true }
}

module.exports = { record, recipientsForScope, listActivity, unreadCount, markSeen }
