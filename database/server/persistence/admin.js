// Admin (god-view) persistence — READ ONLY.
//
// These queries deliberately return data the normal API hides: every scope,
// every personal leaf, every member, and every version across a subtree —
// including foreign leaves. They exist solely for the localhost admin explorer
// and are reachable only behind the X-Admin-Token gate (see routes/admin.js).

const { pool } = require("./pool")

// The full scope tree with members. Each scope row carries its parent, name,
// approval score, and the list of member rows (personRef + roles). A scope is
// flagged `isLeaf` when its name equals a person who is a member of its parent
// — i.e. it is somebody's personal leaf.
async function fullTree() {
  const scopeRes = await pool.query(
    `SELECT id, parent_id, name, required_approval_score
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

  // A scope is a personal leaf if its name matches a person who is a member of
  // its parent scope (the leaf-naming convention).
  const byId = new Map(scopeRes.rows.map((s) => [s.id, s]))
  const scopes = scopeRes.rows.map((s) => {
    let isLeaf = false
    if (s.parent_id != null) {
      const parentMembers = membersByScope.get(s.parent_id) || []
      isLeaf = parentMembers.some((m) => m.personRef === s.name)
    }
    return {
      id: String(s.id),
      parentId: s.parent_id == null ? null : String(s.parent_id),
      name: s.name,
      requiredApprovalScore: s.required_approval_score,
      isLeaf,
      members: membersByScope.get(s.id) || [],
    }
  })

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

module.exports = { fullTree, versionsUnder }
