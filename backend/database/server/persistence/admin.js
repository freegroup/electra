// Admin (god-view) persistence — READ ONLY.
//
// These queries deliberately return data the normal API hides: every scope,
// every personal leaf, every member, and every version across a subtree —
// including foreign leaves. They exist solely for the localhost admin explorer
// and are reachable only behind the X-Admin-Token gate (see routes/admin.js).

const { pool } = require("./pool")

// The full scope tree with members. Each scope row carries its parent, name,
// approval score, and the list of member rows (personRef + roles). `isLeaf`
// comes straight from the scopes.is_personal_leaf column.
async function fullTree() {
  const scopeRes = await pool.query(
    `SELECT id, parent_id, name, label, required_approval_score, promote_ceiling, is_personal_leaf, is_bootstrap, is_anonymous
       FROM scopes
      ORDER BY id`
  )
  const memberRes = await pool.query(
    `SELECT scope_id, person_ref, is_member, is_admin, reviewer_score
       FROM memberships
      ORDER BY scope_id, person_ref`
  )

  const membersByScope = new Map()
  for (const m of memberRes.rows) {
    if (!membersByScope.has(m.scope_id)) membersByScope.set(m.scope_id, [])
    membersByScope.get(m.scope_id).push({
      personRef: m.person_ref,
      isMember: m.is_member,
      isAdmin: m.is_admin,
      reviewerScore: m.reviewer_score,
    })
  }

  const scopes = scopeRes.rows.map((s) => ({
    id: String(s.id),
    parentId: s.parent_id == null ? null : String(s.parent_id),
    name: s.name,
    label: s.label,
    requiredApprovalScore: s.required_approval_score,
    promoteCeiling: s.promote_ceiling,
    isLeaf: s.is_personal_leaf,
    bootstrap: s.is_bootstrap,
    anonymous: s.is_anonymous,
    members: membersByScope.get(s.id) || [],
  }))

  return { scopes }
}

// Every version row within the subtree rooted at scopeId (inclusive), across
// all descendant scopes and leaves. Origin scope is rendered as a human path.
async function versionsUnder(scopeId) {
  const res = await pool.query(
    `WITH sub AS (
       SELECT descendant_id AS id FROM scope_closure WHERE ancestor_id = $1
     ),
     paths AS (
       SELECT s.id,
              (WITH RECURSIVE up AS (
                 SELECT id, parent_id, name FROM scopes WHERE id = s.id
                 UNION ALL
                 SELECT p.id, p.parent_id, p.name
                 FROM scopes p JOIN up ON p.id = up.parent_id
               )
               SELECT string_agg(name, '/' ORDER BY id) FROM up) AS scope_path
       FROM scopes s WHERE s.id IN (SELECT id FROM sub)
     )
     SELECT p.scope_path AS scope, v.scope_id, v.doc_path AS path, v.version,
            v.status, v.is_deletion, v.author, v.public_id, v.created_at
     FROM versions v
     JOIN sub ON sub.id = v.scope_id
     JOIN paths p ON p.id = v.scope_id
     ORDER BY p.scope_path, v.doc_path, v.version`,
    [scopeId]
  )
  return res.rows.map((r) => ({
    scope: r.scope,
    scopeRef: String(r.scope_id),
    path: r.path,
    version: r.version,
    status: r.status,
    isDeletion: r.is_deletion,
    author: r.author,
    publicId: r.public_id,
    createdAt: r.created_at,
  }))
}

// The active version (highest committed/deleted) stored on EXACTLY this scope
// (no walk-up), with full content. Powers the explorer's "click any node to
// inspect it" — including foreign leaves the normal API would hide.
async function docAt(scopeId, docPath, version) {
  const res = version != null
    ? await pool.query(
        `SELECT scope_id, doc_path, version, uuid, status, is_deletion, data, meta,
                author, public_id, published_at, unpublished_at, created_at
           FROM versions
          WHERE scope_id = $1 AND doc_path = $2 AND version = $3`,
        [scopeId, docPath, version]
      )
    : await pool.query(
        `SELECT scope_id, doc_path, version, uuid, status, is_deletion, data, meta,
                author, public_id, published_at, unpublished_at, created_at
           FROM versions
          WHERE scope_id = $1 AND doc_path = $2 AND status IN ('committed', 'deleted')
          ORDER BY version DESC LIMIT 1`,
        [scopeId, docPath]
      )
  if (res.rowCount === 0) return null
  const r = res.rows[0]
  return {
    scopeRef: String(r.scope_id),
    path: r.doc_path,
    version: r.version,
    // The version's stable external id - a pinned read used to drop it, so
    // callers could not address the row's blobs.
    uuid: r.uuid,
    status: r.status,
    isDeletion: r.is_deletion,
    data: r.data,
    meta: r.meta,
    author: r.author,
    publicId: r.public_id,
    // "published & live" = has a publicId and hasn't been taken down.
    publicLive: !!r.public_id && !r.unpublished_at,
    createdAt: r.created_at,
  }
}

// All versions stored on EXACTLY this scope + path, newest first — feeds the
// explorer's version combobox. Includes each version's publish state.
async function docVersions(scopeId, docPath) {
  const res = await pool.query(
    `SELECT version, uuid, status, is_deletion, author, public_id, unpublished_at, created_at
       FROM versions
      WHERE scope_id = $1 AND doc_path = $2
      ORDER BY version DESC`,
    [scopeId, docPath]
  )
  return res.rows.map((r) => ({
    version: r.version,
    uuid: r.uuid,
    status: r.status,
    isDeletion: r.is_deletion,
    author: r.author,
    publicId: r.public_id,
    publicLive: !!r.public_id && !r.unpublished_at,
    createdAt: r.created_at,
  }))
}

module.exports = { fullTree, versionsUnder, docAt, docVersions }
