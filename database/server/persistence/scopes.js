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

    // First admin + reviewer with max score
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, is_admin, reviewer_score)
       VALUES ($1, $2, true, 10)`,
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
async function createScope({ parentId, name, requiredApprovalScore, createdBy }) {
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
        `INSERT INTO scopes (parent_id, name, required_approval_score, created_by)
         VALUES ($1, $2, $3, $4)
         RETURNING id, parent_id, name, required_approval_score, created_at, created_by`,
        [parentId, name, requiredApprovalScore, createdBy]
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

    // The creator becomes first admin + reviewer of the new scope. Without
    // this the new scope would be unreachable — nobody could add members to
    // it or promote into it.
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, is_admin, reviewer_score)
       VALUES ($1, $2, true, 10)`,
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
    `SELECT id, parent_id, name, required_approval_score, created_at, created_by
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

// Returns true if personRef is a member of scopeId — either directly (own
// membership row on scopeId) or transitively (owns a membership row on any
// descendant scope of scopeId via `scope_closure`).
//
// Rationale: if I own a leaf below X, I can see X's docs via walk-up (§6.2),
// so I am considered a member of X for read/write purposes. Foreign leafs
// under X do NOT grant me membership of X — I only benefit from my own
// descendants' rows.
async function isMember(client, scopeId, personRef) {
  const res = await client.query(
    `SELECT 1
       FROM memberships m
       JOIN scope_closure c ON c.descendant_id = m.scope_id
      WHERE c.ancestor_id = $1
        AND m.person_ref  = $2
      LIMIT 1`,
    [scopeId, personRef]
  )
  return res.rowCount > 0
}

// ---------------------------------------------------------------------------
// Membership + auto-leaf provisioning
// ---------------------------------------------------------------------------

// Adds a person as a member of scopeId and provisions their personal leaf
// scope beneath it in the same transaction. A leaf is a regular sub-scope
// whose name equals the personRef and whose only member is the person
// themselves. It is created if not already there. Idempotent.
async function addMemberWithLeaf({ scopeId, personRef, createdBy }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Check scope exists
    const scope = await getScope(client, scopeId)
    if (!scope) {
      throw new NotFoundError(`unknown scope id ${scopeId}`)
    }

    // Membership is implied by having a descendant scope with an explicit
    // membership row — see README §4 (transitive membership). We therefore
    // do NOT insert a membership row on scopeId itself; the leaf's row is
    // enough.

    // Look up the person's leaf under this scope. Convention: name == personRef.
    const leafRes = await client.query(
      `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
      [scopeId, personRef]
    )

    let leafId
    if (leafRes.rowCount > 0) {
      leafId = leafRes.rows[0].id
    } else {
      const insRes = await client.query(
        `INSERT INTO scopes (parent_id, name, required_approval_score, created_by)
         VALUES ($1, $2, 0, $3)
         RETURNING id`,
        [scopeId, personRef, createdBy]
      )
      leafId = insRes.rows[0].id

      // Closure rows for the leaf
      await client.query(
        `INSERT INTO scope_closure (ancestor_id, descendant_id, depth)
         SELECT ancestor_id, $1::bigint, depth + 1
         FROM scope_closure
         WHERE descendant_id = $2
         UNION ALL
         SELECT $1::bigint, $1::bigint, 0`,
        [leafId, scopeId]
      )

      // The person is the sole member (and admin) of their own leaf.
      // This one row, together with the closure, implies membership on
      // every ancestor scope up to the root.
      await client.query(
        `INSERT INTO memberships (scope_id, person_ref, is_admin) VALUES ($1, $2, true)`,
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

// Returns the person's personal-leaf scope id for walk-up context, given
// the scope they are addressing.
//
// Rules:
//   1. If the person has a leaf directly under scopeId (scope with
//      parent_id = scopeId, name = personRef), return that leaf id.
//   2. Otherwise: pick their deepest existing leaf that is a descendant of
//      scopeId — this is their "point of presence" inside the sub-tree. The
//      walk-up (§6.2) starts there and climbs up.
//   3. If neither exists, return null (person has no presence in this
//      sub-tree — caller is not a member per §isMember).
async function leafIdForPersonUnder(client, scopeId, personRef) {
  // First try the direct-leaf case (name convention).
  const direct = await client.query(
    `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
    [scopeId, personRef]
  )
  if (direct.rowCount > 0) return direct.rows[0].id

  // Fallback: any scope under `scopeId` where this person has an explicit
  // membership row. If there are several, pick the deepest — that's the
  // most specific "point of presence" for the walk-up.
  const transitive = await client.query(
    `SELECT m.scope_id AS id, c.depth
       FROM memberships m
       JOIN scope_closure c ON c.descendant_id = m.scope_id
      WHERE c.ancestor_id = $1
        AND m.person_ref  = $2
      ORDER BY c.depth DESC
      LIMIT 1`,
    [scopeId, personRef]
  )
  return transitive.rowCount === 0 ? null : transitive.rows[0].id
}

module.exports = {
  pathOfScope,
  resolveScopeIdByPath,
  getRoot,
  createRootScope,
  createScope,
  getScope,
  isAdmin,
  isMember,
  addMemberWithLeaf,
  leafIdForPersonUnder,
}
