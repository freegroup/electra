// Scope persistence: adjacency list + closure table maintenance.

const { pool } = require("./pool")
const { NotFoundError, BadRequestError, ConflictError } = require("../utils/errors")

// ---------------------------------------------------------------------------
// Path rendering (id → human path)
// ---------------------------------------------------------------------------

// Reverse: given a scope id, produces the human path (e.g. "electra/school/class-8a").
async function pathOfScope(client, scopeId) {
  const res = await client.query(
    `WITH RECURSIVE up AS (
       SELECT id, parent_id, name FROM scopes WHERE id = $1
       UNION ALL
       SELECT s.id, s.parent_id, s.name FROM scopes s JOIN up ON s.id = up.parent_id
     )
     SELECT name FROM up ORDER BY id ASC`,
    [scopeId]
  )
  return res.rows.map((r) => r.name).join("/")
}

// Forward: given a human path like "electra/apps/brains", returns the scope id
// or null if any segment is missing. Used by the /database/scopes/by-path
// endpoint so other services (brains, shapes, ...) can look up ids for the
// canonical scopes declared in init.json.
async function resolveScopeIdByPath(client, pathString) {
  if (typeof pathString !== "string") {
    throw new BadRequestError("path must be a string")
  }
  const parts = pathString.split("/").filter((p) => p.length > 0)
  if (parts.length === 0) {
    throw new BadRequestError("path must not be empty")
  }
  const root = await client.query(
    `SELECT id FROM scopes WHERE parent_id IS NULL AND name = $1`,
    [parts[0]]
  )
  if (root.rowCount === 0) return null
  let currentId = root.rows[0].id
  for (let i = 1; i < parts.length; i++) {
    const res = await client.query(
      `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
      [currentId, parts[i]]
    )
    if (res.rowCount === 0) return null
    currentId = res.rows[0].id
  }
  return currentId
}

// ---------------------------------------------------------------------------
// Root scope
// ---------------------------------------------------------------------------

async function getRoot(client) {
  const res = await client.query(
    `SELECT id, name, required_approval_score, created_at, created_by
     FROM scopes WHERE parent_id IS NULL`
  )
  return res.rowCount === 0 ? null : res.rows[0]
}

// Creates the root scope. Fails if a root already exists.
// Used only by the bootstrap endpoint.
async function createRootScope({ name, requiredApprovalScore, createdBy }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const existing = await getRoot(client)
    if (existing) {
      throw new ConflictError("root scope already exists")
    }

    const insRes = await client.query(
      `INSERT INTO scopes (parent_id, name, required_approval_score, created_by)
       VALUES (NULL, $1, $2, $3)
       RETURNING id, name, required_approval_score, created_at, created_by`,
      [name, requiredApprovalScore, createdBy]
    )
    const scope = insRes.rows[0]

    // Self-row in closure
    await client.query(
      `INSERT INTO scope_closure (ancestor_id, descendant_id, depth)
       VALUES ($1, $1, 0)`,
      [scope.id]
    )

    // First admin + reviewer with max score, and an explicit member.
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, is_member, is_admin, reviewer_score)
       VALUES ($1, $2, true, true, 10)`,
      [scope.id, createdBy]
    )

    await client.query("COMMIT")
    return scope
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// ---------------------------------------------------------------------------
// Sub-scope creation
// ---------------------------------------------------------------------------

// Inserts a new scope under parentId and populates its closure rows in the
// same transaction. The creator becomes the first admin + reviewer (score 10)
// of the new scope. See ARCHITECTURE.md §2.3.
async function createScope({ parentId, name, requiredApprovalScore, promoteCeiling = false, isBootstrap = false, isAnonymous = false, createdBy }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Verify parent exists
    const parentRes = await client.query(`SELECT id FROM scopes WHERE id = $1`, [parentId])
    if (parentRes.rowCount === 0) {
      throw new NotFoundError(`unknown parent scope id ${parentId}`)
    }

    let insRes
    try {
      insRes = await client.query(
        `INSERT INTO scopes (parent_id, name, required_approval_score, promote_ceiling, is_bootstrap, is_anonymous, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, parent_id, name, required_approval_score, promote_ceiling, is_bootstrap, is_anonymous, created_at, created_by`,
        [parentId, name, requiredApprovalScore, promoteCeiling, isBootstrap, isAnonymous, createdBy]
      )
    } catch (err) {
      // Unique (parent_id, name) violation
      if (err.code === "23505") {
        throw new ConflictError(`scope "${name}" already exists under parent ${parentId}`)
      }
      throw err
    }
    const scope = insRes.rows[0]

    // Populate closure: all ancestors of parent + self.
    await client.query(
      `INSERT INTO scope_closure (ancestor_id, descendant_id, depth)
       SELECT ancestor_id, $1::bigint, depth + 1
       FROM scope_closure
       WHERE descendant_id = $2
       UNION ALL
       SELECT $1::bigint, $1::bigint, 0`,
      [scope.id, parentId]
    )

    // The creator becomes admin + member of the new scope — but NOT a reviewer.
    // Reviewer must be granted explicitly (so a scope with a required approval
    // score enforces real review; the creator can't self-approve by default).
    // A fresh scope therefore has no reviewer until an admin appoints one.
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, is_member, is_admin)
       VALUES ($1, $2, true, true)`,
      [scope.id, createdBy]
    )

    await client.query("COMMIT")
    return scope
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// ---------------------------------------------------------------------------
// Scope fetch by id
// ---------------------------------------------------------------------------

async function getScope(client, scopeId) {
  const res = await client.query(
    `SELECT id, parent_id, name, required_approval_score, promote_ceiling, is_personal_leaf, is_bootstrap, is_anonymous, created_at, created_by
     FROM scopes WHERE id = $1`,
    [scopeId]
  )
  return res.rowCount === 0 ? null : res.rows[0]
}

// Returns true if personRef is an admin of scopeId.
// Admin rights are strictly per-scope: an admin row on a descendant scope
// does NOT grant admin rights on the ancestor.
async function isAdmin(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT 1 FROM memberships WHERE scope_id = $1 AND person_ref = $2 AND is_admin = true`,
    [scopeId, personRef]
  )
  return res.rowCount > 0
}

// Returns true if personRef is a reviewer of scopeId (reviewer_score IS NOT
// NULL). Score 0 = observer (may vote, contributes nothing). Reviewer rights
// are strictly per-scope and do not inherit.
async function isReviewer(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT 1 FROM memberships
      WHERE scope_id = $1 AND person_ref = $2 AND reviewer_score IS NOT NULL`,
    [scopeId, personRef]
  )
  return res.rowCount > 0
}

// Returns the reviewer's current score for scopeId, or null if not a reviewer.
async function reviewerScore(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT reviewer_score FROM memberships
      WHERE scope_id = $1 AND person_ref = $2`,
    [scopeId, personRef]
  )
  if (res.rowCount === 0) return null
  return res.rows[0].reviewer_score
}

// WRITE gate (README §3.2): a person may write at scopeId only with an
// EXPLICIT membership row on scopeId itself. Transitive-up read access to an
// ancestor does not grant write there.
async function isMember(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT 1 FROM memberships
      WHERE scope_id = $1 AND person_ref = $2 AND is_member = true`,
    [scopeId, personRef]
  )
  return res.rowCount > 0
}

// READ gate (README §3.2): read is transitive UPWARD. A person may read
// scopeId if they are an explicit member of scopeId or of any descendant of
// scopeId (their own point of presence lies within the sub-tree). The root
// scope is world-readable by everyone, including anonymous (personRef null).
async function canRead(client, scopeId, personRef) {
  // Root is world-readable (§3.6); an is_anonymous scope is readable by anyone
  // too (non-transitive — only the flagged scope itself).
  const rootRes = await client.query(
    `SELECT parent_id, is_anonymous FROM scopes WHERE id = $1`,
    [scopeId]
  )
  if (rootRes.rowCount === 0) return false
  if (rootRes.rows[0].parent_id === null) return true
  if (rootRes.rows[0].is_anonymous) return true

  if (!personRef) return false // anonymous: only root + anonymous scopes

  const res = await client.query(
    `SELECT 1
       FROM memberships m
       JOIN scope_closure c ON c.descendant_id = m.scope_id
      WHERE c.ancestor_id = $1
        AND m.person_ref  = $2
        AND m.is_member   = true
      LIMIT 1`,
    [scopeId, personRef]
  )
  return res.rowCount > 0
}

// ---------------------------------------------------------------------------
// Membership + auto-leaf provisioning
// ---------------------------------------------------------------------------

// Adds a person as an explicit member of scopeId and provisions their personal
// leaf scope beneath it in the same transaction (README §3.2, §3.3).
//
//   - An explicit `is_member = true` row is written ON scopeId. This is the
//     write gate: it lets the person write at scopeId and read every ancestor.
//   - A leaf child scope (name == personRef) is created if not already there,
//     with its own membership row. The leaf holds the person's local overrides.
//
// Idempotent: re-adding an existing member just re-asserts is_member = true.
async function addMemberWithLeaf({ scopeId, personRef, createdBy }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const scope = await getScope(client, scopeId)
    if (!scope) {
      throw new NotFoundError(`unknown scope id ${scopeId}`)
    }

    // Explicit membership row ON the scope — orthogonal to admin/reviewer.
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, is_member)
       VALUES ($1, $2, true)
       ON CONFLICT (scope_id, person_ref) DO UPDATE SET is_member = true`,
      [scopeId, personRef]
    )

    // Provision the personal leaf (name == personRef) if absent.
    const leafRes = await client.query(
      `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
      [scopeId, personRef]
    )

    let leafId
    if (leafRes.rowCount > 0) {
      leafId = leafRes.rows[0].id
    } else {
      const insRes = await client.query(
        `INSERT INTO scopes (parent_id, name, required_approval_score, created_by, is_personal_leaf)
         VALUES ($1, $2, 0, $3, true)
         RETURNING id`,
        [scopeId, personRef, createdBy]
      )
      leafId = insRes.rows[0].id

      await client.query(
        `INSERT INTO scope_closure (ancestor_id, descendant_id, depth)
         SELECT ancestor_id, $1::bigint, depth + 1
         FROM scope_closure
         WHERE descendant_id = $2
         UNION ALL
         SELECT $1::bigint, $1::bigint, 0`,
        [leafId, scopeId]
      )

      // The person is the sole member + admin of their own leaf.
      await client.query(
        `INSERT INTO memberships (scope_id, person_ref, is_member, is_admin)
         VALUES ($1, $2, true, true)`,
        [leafId, personRef]
      )
    }

    await client.query("COMMIT")
    return { scopeId, leafId }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// Revokes explicit membership at scopeId AND physically deletes their personal
// leaf beneath it (name == personRef), including all its versions/blobs/votes
// and any public_ids on them. This is a hard cleanup — like a forced revert of
// that leaf — chosen so removing a member never leaves an orphan leaf behind.
// All in one transaction.
async function removeMember({ scopeId, personRef }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Drop the explicit membership on the scope (keep other role rows, or
    // remove the row entirely if nothing else remains).
    await client.query(
      `UPDATE memberships SET is_member = false
        WHERE scope_id = $1 AND person_ref = $2`,
      [scopeId, personRef]
    )
    await client.query(
      `DELETE FROM memberships
        WHERE scope_id = $1 AND person_ref = $2
          AND is_member = false AND is_admin = false AND reviewer_score IS NULL`,
      [scopeId, personRef]
    )

    // Find and remove the person's personal leaf under this scope, if any.
    const leaf = await client.query(
      `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
      [scopeId, personRef]
    )
    if (leaf.rowCount > 0) {
      const leafId = leaf.rows[0].id
      // versions → scopes is ON DELETE RESTRICT, so purge content first
      // (blobs/votes cascade off versions).
      await client.query(`DELETE FROM versions WHERE scope_id = $1`, [leafId])
      await client.query(
        `DELETE FROM memberships WHERE scope_id = $1`, [leafId])
      await client.query(
        `DELETE FROM scope_closure WHERE ancestor_id = $1 OR descendant_id = $1`, [leafId])
      await client.query(`DELETE FROM scopes WHERE id = $1`, [leafId])
    }

    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// Grants / revokes the admin role on scopeId. Orthogonal to membership: the
// row is upserted, so an admin need not be a member and vice versa.
async function setAdmin({ scopeId, personRef, isAdmin }) {
  const client = await pool.connect()
  try {
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, is_admin)
       VALUES ($1, $2, $3)
       ON CONFLICT (scope_id, person_ref) DO UPDATE SET is_admin = $3`,
      [scopeId, personRef, isAdmin]
    )
    if (!isAdmin) {
      await client.query(
        `DELETE FROM memberships
          WHERE scope_id = $1 AND person_ref = $2
            AND is_member = false AND is_admin = false AND reviewer_score IS NULL`,
        [scopeId, personRef]
      )
    }
  } finally {
    client.release()
  }
}

// Adds / updates a reviewer's score (0..10) on scopeId, or revokes the role
// when score is null. Orthogonal to membership.
async function setReviewer({ scopeId, personRef, score }) {
  const client = await pool.connect()
  try {
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, reviewer_score)
       VALUES ($1, $2, $3)
       ON CONFLICT (scope_id, person_ref) DO UPDATE SET reviewer_score = $3`,
      [scopeId, personRef, score]
    )
    if (score === null) {
      await client.query(
        `DELETE FROM memberships
          WHERE scope_id = $1 AND person_ref = $2
            AND is_member = false AND is_admin = false AND reviewer_score IS NULL`,
        [scopeId, personRef]
      )
    }
  } finally {
    client.release()
  }
}

// Sets a scope's required approval score.
async function setRequiredApprovalScore({ scopeId, score }) {
  const res = await pool.query(
    `UPDATE scopes SET required_approval_score = $2 WHERE id = $1 RETURNING id`,
    [scopeId, score]
  )
  if (res.rowCount === 0) throw new NotFoundError(`unknown scope id ${scopeId}`)
}

// Marks / unmarks a scope as a promote ceiling (README §6.5). Content may be
// promoted up to a ceiling scope but never above it.
async function setPromoteCeiling({ scopeId, value }) {
  const res = await pool.query(
    `UPDATE scopes SET promote_ceiling = $2 WHERE id = $1 RETURNING id`,
    [scopeId, value]
  )
  if (res.rowCount === 0) throw new NotFoundError(`unknown scope id ${scopeId}`)
}

// Marks / unmarks a scope as a bootstrap scope. Every logged-in user is
// auto-enrolled as a member of every bootstrap scope on login (see
// enrollBootstrap).
async function setBootstrap({ scopeId, value }) {
  const res = await pool.query(
    `UPDATE scopes SET is_bootstrap = $2 WHERE id = $1 RETURNING id`,
    [scopeId, value]
  )
  if (res.rowCount === 0) throw new NotFoundError(`unknown scope id ${scopeId}`)
}

// Marks / unmarks a scope as anonymous-readable. Not transitive: applies only
// to this exact scope. Anonymous callers may then read its (shared) documents;
// writing still requires explicit membership.
async function setAnonymous({ scopeId, value }) {
  const res = await pool.query(
    `UPDATE scopes SET is_anonymous = $2 WHERE id = $1 RETURNING id`,
    [scopeId, value]
  )
  if (res.rowCount === 0) throw new NotFoundError(`unknown scope id ${scopeId}`)
}

// Enrolls a person as an explicit member of every bootstrap scope, provisioning
// their personal leaf in each. Idempotent (addMemberWithLeaf upserts), so it is
// safe to call on every login — for new and returning users alike. Returns the
// scopeRefs the person is now a member of.
async function enrollBootstrap(personRef) {
  const res = await pool.query(`SELECT id FROM scopes WHERE is_bootstrap = true`)
  const enrolled = []
  for (const row of res.rows) {
    await addMemberWithLeaf({ scopeId: row.id, personRef, createdBy: personRef })
    enrolled.push(String(row.id))
  }
  return enrolled
}

// Renames a scope. Internally cheap: everything (versions, closure, members,
// votes, blobs) keys off scopes.id, and paths are derived live from the
// parent chain — so only this one row changes, no cascade.
//
// Guards:
//   - a personal LEAF must not be renamed: the walk-up joins leaves by
//     name == personRef, so a leaf's name is load-bearing (README §6.2).
//   - the new name must not collide with a sibling (UNIQUE(parent_id, name)).
//   - a name must not contain "/" (path separator) and must be non-empty.
async function renameScope({ scopeId, name }) {
  if (typeof name !== "string" || name.length === 0) {
    throw new BadRequestError("scope name must be a non-empty string")
  }
  if (name.includes("/")) {
    throw new BadRequestError('scope name must not contain "/"')
  }
  const client = await pool.connect()
  try {
    const cur = await getScope(client, scopeId)
    if (!cur) throw new NotFoundError(`unknown scope id ${scopeId}`)
    // A personal leaf must not be renamed — its name is load-bearing for the
    // walk-up (which joins leaves by name == personRef, README §6.2).
    if (cur.is_personal_leaf) {
      throw new ConflictError("a personal leaf cannot be renamed")
    }
    try {
      const res = await client.query(
        `UPDATE scopes SET name = $2 WHERE id = $1 RETURNING id, name`,
        [scopeId, name]
      )
      return res.rows[0]
    } catch (err) {
      if (err.code === "23505") {
        throw new ConflictError(`a sibling scope named "${name}" already exists`)
      }
      throw err
    }
  } finally {
    client.release()
  }
}

// Reparents a scope (moves its whole subtree under newParentId). Identity is
// scopes.id, so documents/members/reviewers/leaves/publicIds all stay — only
// the inherited position changes. Rebuilds the transitive closure in one tx.
//
// Guards (all → throw): can't move the root; can't move a personal leaf; new
// parent must exist; no cycle (new parent must not be the scope or a
// descendant); no sibling name collision at the new parent.
async function setParentScope({ scopeId, newParentId }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const cur = await getScope(client, scopeId)
    if (!cur) throw new NotFoundError(`unknown scope id ${scopeId}`)
    if (cur.parent_id == null) throw new BadRequestError("cannot move the root scope")
    if (cur.is_personal_leaf) throw new ConflictError("a personal leaf cannot be moved")

    const np = await getScope(client, newParentId)
    if (!np) throw new NotFoundError(`unknown parent scope id ${newParentId}`)

    // Cycle: new parent must not be the scope itself nor any of its descendants.
    const cycle = await client.query(
      `SELECT 1 FROM scope_closure WHERE ancestor_id = $1 AND descendant_id = $2`,
      [scopeId, newParentId]
    )
    if (cycle.rowCount > 0) {
      throw new ConflictError("cannot move a scope under itself or its own descendant")
    }

    // Name collision at the destination.
    const clash = await client.query(
      `SELECT 1 FROM scopes WHERE parent_id = $1 AND name = $2 AND id <> $3`,
      [newParentId, cur.name, scopeId]
    )
    if (clash.rowCount > 0) {
      throw new ConflictError(`a sibling scope named "${cur.name}" already exists under the new parent`)
    }

    // 1. Detach: remove closure rows linking the subtree to its OLD ancestors.
    await client.query(
      `DELETE FROM scope_closure
        WHERE descendant_id IN (SELECT descendant_id FROM scope_closure WHERE ancestor_id = $1)
          AND ancestor_id   IN (SELECT ancestor_id  FROM scope_closure
                                 WHERE descendant_id = $1 AND ancestor_id <> descendant_id)`,
      [scopeId]
    )

    // 2. Reattach: every ancestor of (incl.) the new parent × every node in the
    //    subtree, with recomputed depth.
    await client.query(
      `INSERT INTO scope_closure (ancestor_id, descendant_id, depth)
       SELECT super.ancestor_id, sub.descendant_id, super.depth + sub.depth + 1
         FROM scope_closure super
         CROSS JOIN scope_closure sub
        WHERE super.descendant_id = $1
          AND sub.ancestor_id     = $2`,
      [newParentId, scopeId]
    )

    // 3. Update the adjacency edge.
    await client.query(
      `UPDATE scopes SET parent_id = $2 WHERE id = $1`,
      [scopeId, newParentId]
    )

    await client.query("COMMIT")
    return { scopeId: String(scopeId), parentId: String(newParentId) }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// Returns every scope the caller is an explicit member of, with their roles
// there (README §9.7). Feeds the UI's create-in / browse pickers. Excludes
// the caller's own personal leaves — those are internal storage, not scopes a
// user consciously "works in".
async function myScopes(personRef) {
  const res = await pool.query(
    `SELECT m.scope_id, s.parent_id, s.name, s.required_approval_score, s.promote_ceiling, s.is_bootstrap,
            m.is_admin, m.reviewer_score
       FROM memberships m
       JOIN scopes s ON s.id = m.scope_id
      WHERE m.person_ref = $1 AND m.is_member = true
        AND NOT (s.name = $1)          -- hide the caller's own leaves
      ORDER BY m.scope_id`,
    [personRef]
  )
  return res.rows
}

// Returns the person's personal-leaf scope id directly under scopeId, or null
// if they have none there yet. Mutating operations resolve their target leaf
// through this — a leaf is provisioned on first write (see docs.putDoc).
async function leafUnderScope(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
    [scopeId, personRef]
  )
  return res.rowCount === 0 ? null : res.rows[0].id
}

module.exports = {
  pathOfScope,
  resolveScopeIdByPath,
  getRoot,
  createRootScope,
  createScope,
  getScope,
  isAdmin,
  isReviewer,
  reviewerScore,
  isMember,
  canRead,
  addMemberWithLeaf,
  removeMember,
  setAdmin,
  setReviewer,
  setRequiredApprovalScore,
  setPromoteCeiling,
  setBootstrap,
  setAnonymous,
  enrollBootstrap,
  renameScope,
  setParentScope,
  myScopes,
  leafUnderScope,
}
