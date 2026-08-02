// Scope persistence: adjacency list + closure table maintenance.

const { pool } = require("./pool")
const { NotFoundError, BadRequestError, ConflictError } = require("../utils/errors")
const activity = require("./activity")

// ---------------------------------------------------------------------------
// Identity-name derivation (from a display label)
// ---------------------------------------------------------------------------

// Turn a free-form display label into a stable, path-safe identity name:
// lowercase, whitespace → "-", only [a-z0-9._-], no repeated/edge separators.
// Falls back to "scope" if nothing usable remains. Pure — no DB access.
function sanitizeName(label) {
  let s = String(label == null ? "" : label)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")        // whitespace runs → single dash
    .replace(/[^a-z0-9._-]/g, "") // drop anything not path-safe
    .replace(/-+/g, "-")         // collapse repeated dashes
    .replace(/^[-.]+|[-.]+$/g, "") // trim leading/trailing dash or dot
  return s.length ? s : "scope"
}

// Find a free sibling name under parentId: `base`, else `base-2`, `base-3`, …
// Uses the same lookup as createScope's uniqueness check. Requires a live
// client (called inside createScope's transaction).
async function uniqueChildName(client, parentId, base) {
  let candidate = base
  let n = 1
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await client.query(
      `SELECT 1 FROM scopes WHERE parent_id = $1 AND name = $2 LIMIT 1`,
      [parentId, candidate]
    )
    if (res.rowCount === 0) return candidate
    n += 1
    candidate = `${base}-${n}`
  }
}

// ---------------------------------------------------------------------------
// Path rendering (id → human path)
// ---------------------------------------------------------------------------

// The structural prefix that is never meaningful to external callers — read from
// the SCOPE_PREFIX env var (settings.ini). All response paths are stripped of
// this prefix before leaving the server.
const SCOPE_PREFIX = process.env.SCOPE_PREFIX || ""

// Canonical internal paths derived from SCOPE_PREFIX — used only for DB lookups.
const PATH_CONTENT = SCOPE_PREFIX                        // e.g. "electra/content"
const PATH_APPS    = `${SCOPE_PREFIX}/apps`              // e.g. "electra/content/apps"
const PATH_USERS   = `${SCOPE_PREFIX}/users`             // e.g. "electra/content/users"

// Strip the structural prefix from a path that will appear in a REST response.
// Leaves internal lookup strings (used as DB keys) untouched — only call this
// when building an object that travels over the wire to a BFF or browser.
function stripPrefix(path) {
  if (!SCOPE_PREFIX || !path) return path
  if (path === SCOPE_PREFIX) return ""
  return path.startsWith(SCOPE_PREFIX + "/") ? path.slice(SCOPE_PREFIX.length + 1) : path
}

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
      `INSERT INTO scopes (parent_id, name, label, required_approval_score, created_by)
       VALUES (NULL, $1, $1, $2, $3)
       RETURNING id, name, label, required_approval_score, created_at, created_by`,
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
async function createScope({ parentId, name, label, description = null, requiredApprovalScore, promoteCeiling = false, isBootstrap = false, isAnonymous = false, createdBy, grantCreatorAdmin = true }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Verify parent exists
    const parent = await getScope(client, parentId)
    if (!parent) {
      throw new NotFoundError(`unknown parent scope id ${parentId}`)
    }

    // A personal workspace (electra/content/users/<email>) belongs to exactly
    // one person, for good — the same rule addMember already enforces on the
    // workspace itself. Without this guard that rule is trivially bypassed:
    // create a sub-scope here (addMember does not object to a CHILD) and invite
    // whoever you like into it. The result was a shared workgroup sitting in a
    // namespace labelled "Personal", which then also has nowhere to go when its
    // owner leaves or changes their address.
    //
    // Note this can only ever reject a GROUP: createScope never sets
    // is_personal_leaf, so the caller's own leaf — provisioned by
    // ensureWriteLeaf with a direct INSERT — is unaffected. Groups belong under
    // the shared root (apps), where they inherit the shared library and have a
    // lifecycle of their own.
    if (await isPersonalWorkspace(client, parent)) {
      throw new BadRequestError("cannot create a sub-scope inside a personal workspace - create the group under the shared root instead")
    }

    // Two creation modes, decided by whether an explicit identity `name` is
    // given:
    //  • internal (explicit name): keep the name verbatim — used for the
    //    personal workspace (name == email, load-bearing for the resolver) and
    //    structural containers. An optional `label` sets the display name
    //    (e.g. "Personal"); otherwise it defaults to the name.
    //  • user-driven (no name, label given): the typed text is the display
    //    label; the identity name is DERIVED from it (sanitized) and
    //    auto-suffixed to stay unique under the parent.
    let finalName, finalLabel
    if (name != null) {
      if (String(name).includes("/")) {
        throw new BadRequestError('scope name must not contain "/"')
      }
      finalName = name
      finalLabel = (label !== undefined && label !== null && String(label).trim() !== "")
        ? String(label).trim()
        : name
    } else if (label !== undefined && label !== null && String(label).trim() !== "") {
      finalLabel = String(label).trim()
      finalName = await uniqueChildName(client, parentId, sanitizeName(finalLabel))
    } else {
      throw new BadRequestError("either a name or a non-empty label is required")
    }

    let insRes
    try {
      insRes = await client.query(
        `INSERT INTO scopes (parent_id, name, label, description, required_approval_score, promote_ceiling, is_bootstrap, is_anonymous, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id, parent_id, name, label, description, required_approval_score, promote_ceiling, is_bootstrap, is_anonymous, created_at, created_by`,
        [parentId, finalName, finalLabel, description, requiredApprovalScore, promoteCeiling, isBootstrap, isAnonymous, createdBy]
      )
    } catch (err) {
      // Unique (parent_id, name) violation
      if (err.code === "23505") {
        throw new ConflictError(`scope "${finalName}" already exists under parent ${parentId}`)
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
    // Skipped for structural container scopes (grantCreatorAdmin=false), which
    // belong to nobody — e.g. the content/users bucket that only holds per-user
    // workspaces.
    if (grantCreatorAdmin) {
      await client.query(
        `INSERT INTO memberships (scope_id, person_ref, is_member, is_admin)
         VALUES ($1, $2, true, true)`,
        [scope.id, createdBy]
      )
    }

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
    `SELECT id, parent_id, name, label, description, required_approval_score, promote_ceiling, is_personal_leaf, is_bootstrap, is_anonymous, created_at, created_by
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
// A reviewer role counts like membership here: the reviewer of a scope must
// be able to read the pending versions they are asked to judge, even when
// they were never added as a member (the roles are orthogonal).
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
        AND (m.is_member = true OR m.reviewer_score IS NOT NULL)
      LIMIT 1`,
    [scopeId, personRef]
  )
  return res.rowCount > 0
}

// ---------------------------------------------------------------------------
// Membership + auto-leaf provisioning
// ---------------------------------------------------------------------------

// Adds a person as an explicit member of scopeId — membership row ONLY, no
// personal leaf. This is the write gate + read-up grant (README §3.2). Used on
// join (adding a member, bootstrap enrollment): the personal leaf is NOT created
// eagerly here — it is provisioned lazily on the first write (see
// ensureWriteLeaf, called from the write path). Idempotent.
async function addMember({ scopeId, personRef, actorRef }) {
  const client = await pool.connect()
  try {
    const scope = await getScope(client, scopeId)
    if (!scope) throw new NotFoundError(`unknown scope id ${scopeId}`)
    // Personal workspaces (electra/content/users/<email>) are single-owner by
    // definition — you cannot invite anyone into someone's personal space. The
    // owner is already its admin via provisioning; nobody else may be added.
    if (await isPersonalWorkspace(client, scope)) {
      throw new BadRequestError("cannot add members to a personal workspace")
    }
    await client.query(
      `INSERT INTO memberships (scope_id, person_ref, is_member)
       VALUES ($1, $2, true)
       ON CONFLICT (scope_id, person_ref) DO UPDATE SET is_member = true`,
      [scopeId, personRef]
    )
    // Activity: tell the added person (a real non-document event). Skipped for
    // self-enrollment (bootstrap on login), where there is no actor. Best-effort:
    // this runs outside any wrapping transaction (the membership is already
    // persisted), so a notification failure must not fail the add.
    if (actorRef && actorRef !== personRef) {
      try {
        // Full scope path (e.g. "apps/gammel"), consistent with the doc events.
        const scopePath = stripPrefix(await pathOfScope(client, scopeId))
        await activity.record(client, {
          actor: actorRef, eventType: "member_added",
          recipients: [{ ref: personRef, role: "member" }],
          scopeId, scopeLabel: scopePath,
          subjectKind: "workspace", subjectRef: String(scopeId), subjectLabel: scopePath,
        })
      } catch (e) {
        console.log("[activity] member_added skipped:", e && e.message)
      }
    }
    return { scopeId }
  } finally {
    client.release()
  }
}

// True iff `scope` is a personal workspace — a direct child of the structural
// `electra/content/users` container (i.e. electra/content/users/<email>).
async function isPersonalWorkspace(client, scope) {
  if (!scope || scope.parent_id === null) return false
  const usersId = await resolveScopeIdByPath(client, PATH_USERS)
  return usersId !== null && String(scope.parent_id) === String(usersId)
}

// Ensures the person is a member of scopeId AND that their personal leaf scope
// exists beneath it, in one transaction (README §3.2, §3.3). Called from the
// WRITE path (requireWriteLeaf) so the leaf is provisioned lazily, on first
// write — not eagerly on join.
//
//   - An explicit `is_member = true` row is written ON scopeId. This is the
//     write gate: it lets the person write at scopeId and read every ancestor.
//   - A leaf child scope (name == personRef) is created if not already there,
//     with its own membership row. The leaf holds the person's local overrides.
//
// Idempotent: re-adding an existing member just re-asserts is_member = true.
async function ensureWriteLeaf({ scopeId, personRef, createdBy }) {
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
        `INSERT INTO scopes (parent_id, name, label, required_approval_score, created_by, is_personal_leaf)
         VALUES ($1, $2, $2, 0, $3, true)
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

// Ensures a child scope with the given name exists under parentId, returning
// its id. Idempotent: if it already exists, returns the existing id without
// touching it. `createdBy` becomes admin+member only when it is freshly created.
async function ensureChildScope({ parentId, name, label, createdBy, grantCreatorAdmin = true, promoteCeiling = false }) {
  const client = await pool.connect()
  let existing
  try {
    existing = await client.query(
      `SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`,
      [parentId, name]
    )
  } finally {
    client.release()
  }
  if (existing.rowCount > 0) return String(existing.rows[0].id)
  try {
    // Internal caller: pass an explicit name (bypass sanitize) plus an optional
    // display label (e.g. "Personal" for the user's own workspace).
    const scope = await createScope({ parentId, name, label, requiredApprovalScore: 0, createdBy, grantCreatorAdmin, promoteCeiling })
    return String(scope.id)
  } catch (err) {
    // Lost a race with a concurrent login — the scope now exists; look it up.
    if (err instanceof ConflictError) {
      const c = await pool.connect()
      try {
        const r = await c.query(`SELECT id FROM scopes WHERE parent_id = $1 AND name = $2`, [parentId, name])
        if (r.rowCount > 0) return String(r.rows[0].id)
      } finally {
        c.release()
      }
    }
    throw err
  }
}

// Provisions the caller's personal workspace: electra/content/users/<email>,
// with the caller as its admin+member. Idempotent (safe on every login). This
// is a real, browsable workspace the user owns — distinct from the per-scope
// personal LEAVES (internal doc storage). Returns its scopeRef, or null if the
// content root isn't present (should not happen post-bootstrap).
async function provisionUserWorkspace(personRef) {
  const client = await pool.connect()
  let contentId
  try {
    contentId = await resolveScopeIdByPath(client, PATH_CONTENT)
  } finally {
    client.release()
  }
  if (!contentId) return null
  // The "users" bucket is a structural container owned by nobody.
  const usersId = await ensureChildScope({ parentId: contentId, name: "users", createdBy: personRef, grantCreatorAdmin: false })
  // The user's own workspace under it — they are its admin. It is a promote
  // ceiling: content saved/promoted from here lands ON the personal workspace
  // and never rises into shared scopes. Sharing outward is only via distribute.
  // name == email (identity, load-bearing for the resolver); label = "Personal"
  // so the user never sees their raw email as the workspace title.
  const mineId = await ensureChildScope({ parentId: usersId, name: personRef, label: "Personal", createdBy: personRef, promoteCeiling: true })
  return mineId
}

// Enrolls a person as an explicit member of every bootstrap scope. Idempotent
// (addMember upserts), so it is safe to call on every login — for new and
// returning users alike. Personal leaves are NOT created here; they appear
// lazily on first write. Also ensures the caller's personal workspace
// (content/users/<email>) exists. Returns the scopeRefs the person is now a
// member of.
async function enrollBootstrap(personRef) {
  const res = await pool.query(`SELECT id FROM scopes WHERE is_bootstrap = true`)
  const enrolled = []
  for (const row of res.rows) {
    await addMember({ scopeId: row.id, personRef })
    enrolled.push(String(row.id))
  }
  // The user's own personal workspace (admin there). Not a bootstrap scope —
  // it's per-user — so provisioned explicitly here.
  const mineId = await provisionUserWorkspace(personRef)
  if (mineId && !enrolled.includes(mineId)) enrolled.push(mineId)
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

// Sets a scope's display label (free-form: spaces, mixed case, unicode ok).
// Unlike renameScope, this NEVER touches the identity `name`, so it is safe for
// any scope including personal leaves. This is the everyday "rename" users and
// admins see; renameScope (identity) stays a god-view power tool.
async function relabelScope({ scopeId, label }) {
  if (typeof label !== "string" || label.trim().length === 0) {
    throw new BadRequestError("label must be a non-empty string")
  }
  const client = await pool.connect()
  try {
    const res = await client.query(
      `UPDATE scopes SET label = $2 WHERE id = $1 RETURNING id, name, label`,
      [scopeId, label.trim()]
    )
    if (res.rowCount === 0) throw new NotFoundError(`unknown scope id ${scopeId}`)
    return res.rows[0]
  } finally {
    client.release()
  }
}

// Sets a scope's optional free-form description (shown on the workgroup card).
// Unlike the label, this may be cleared: an empty string or null stores NULL.
async function setScopeDescription({ scopeId, description }) {
  const value =
    description === undefined || description === null || String(description).trim() === ""
      ? null
      : String(description).trim()
  const client = await pool.connect()
  try {
    const res = await client.query(
      `UPDATE scopes SET description = $2 WHERE id = $1 RETURNING id, name, label, description`,
      [scopeId, value]
    )
    if (res.rowCount === 0) throw new NotFoundError(`unknown scope id ${scopeId}`)
    return res.rows[0]
  } finally {
    client.release()
  }
}

// Deletes an empty scope. Refuses if it still has sub-scopes/leaves or any
// document versions — the caller must clear those first (this is a structural
// delete, not a recursive purge). The root cannot be deleted. Removes the
// scope's own membership/closure rows in one transaction.
async function deleteScope({ scopeId }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const cur = await getScope(client, scopeId)
    if (!cur) throw new NotFoundError(`unknown scope id ${scopeId}`)
    if (cur.parent_id === null) {
      throw new ConflictError("the root scope cannot be deleted")
    }

    const kids = await client.query(
      `SELECT 1 FROM scopes WHERE parent_id = $1 LIMIT 1`,
      [scopeId]
    )
    if (kids.rowCount > 0) {
      throw new ConflictError("scope has sub-scopes/leaves; remove them first")
    }

    const vers = await client.query(
      `SELECT 1 FROM versions WHERE scope_id = $1 LIMIT 1`,
      [scopeId]
    )
    if (vers.rowCount > 0) {
      throw new ConflictError("scope has document versions; remove them first")
    }

    await client.query(`DELETE FROM memberships WHERE scope_id = $1`, [scopeId])
    await client.query(
      `DELETE FROM scope_closure WHERE ancestor_id = $1 OR descendant_id = $1`,
      [scopeId]
    )
    await client.query(`DELETE FROM scopes WHERE id = $1`, [scopeId])

    await client.query("COMMIT")
    return { deleted: true, scopeId: String(scopeId) }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
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

    // The other way into a personal workspace: build the group elsewhere, then
    // move it in. Same reason as in createScope — a personal workspace stays
    // single-owner, so nothing may be parked there.
    if (await isPersonalWorkspace(client, np)) {
      throw new BadRequestError("cannot move a scope into a personal workspace")
    }

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
// there (README §9.7). Feeds the UI's create-in / browse pickers. Excludes the
// caller's own personal LEAVES (internal doc storage) — but NOT their personal
// workspace (content/users/<email>), which is a real scope they work in and
// happens to share the name.
async function myScopes(personRef) {
  const res = await pool.query(
    `SELECT m.scope_id, s.parent_id, s.name, s.label, s.required_approval_score, s.promote_ceiling, s.is_bootstrap,
            m.is_admin, m.reviewer_score
       FROM memberships m
       JOIN scopes s ON s.id = m.scope_id
      WHERE m.person_ref = $1 AND m.is_member = true
        AND s.is_personal_leaf = false   -- hide internal per-scope leaves only
      ORDER BY m.scope_id`,
    [personRef]
  )
  return res.rows
}

// The scopes a member may distribute a document INTO (README §6.16): every scope
// they belong to, minus internal personal leaves, minus personal workspaces
// (electra/content/users/<email> — single-owner spaces you never share into),
// minus the source scope the document already lives in. This is the truthful
// target list for the distribute picker — computed on the server so no client
// decides which scopes are valid destinations.
async function distributeTargets(personRef, sourceScopeId) {
  const client = await pool.connect()
  try {
    // The structural container that holds every personal workspace; its direct
    // children are the personal workspaces to exclude.
    const usersId = await resolveScopeIdByPath(client, PATH_USERS)
    const res = await client.query(
      `SELECT m.scope_id, s.name, s.label
         FROM memberships m
         JOIN scopes s ON s.id = m.scope_id
        WHERE m.person_ref = $1 AND m.is_member = true
          AND s.is_personal_leaf = false
          AND s.parent_id IS DISTINCT FROM $2   -- exclude personal workspaces
          AND m.scope_id <> $3                  -- exclude the source scope
        ORDER BY m.scope_id`,
      [personRef, usersId, sourceScopeId]
    )
    const out = []
    for (const r of res.rows) {
      out.push({
        scopeRef: String(r.scope_id),
        name: r.name,
        label: r.label,
        path: stripPrefix(await pathOfScope(client, r.scope_id)),
      })
    }
    return out
  } finally {
    client.release()
  }
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

// Direct sub-workspaces of a scope, for the Workspaces drill-down. Consumer
// (scoped) view — NOT the admin god-view: returns only the DIRECT children of
// parentId, excludes personal leaves, and annotates each with the caller's own
// role there (member/admin) so the UI can show "you're in" vs "visible only".
// The membership check that the caller may see these children is done by the
// route (isMember of parentId).
async function listChildren({ parentId, personRef }) {
  const res = await pool.query(
    `SELECT s.id, s.name, s.label, s.description, s.is_bootstrap, s.is_anonymous,
            (m.person_ref IS NOT NULL AND m.is_member = true) AS is_member,
            COALESCE(m.is_admin, false)                       AS is_admin,
            (SELECT count(*)::int FROM memberships mc
              WHERE mc.scope_id = s.id AND mc.is_member = true) AS member_count
       FROM scopes s
       LEFT JOIN memberships m
              ON m.scope_id = s.id AND m.person_ref = $2
      WHERE s.parent_id = $1
        AND s.is_personal_leaf = false
        -- Anonymous (personRef null): only public children are visible, so
        -- private sub-workspace names never leak. Logged-in: all children.
        AND ($2::text IS NOT NULL OR s.is_anonymous = true)
      ORDER BY s.label`,
    [parentId, personRef]
  )
  return res.rows.map((r) => ({
    scopeRef: String(r.id),
    name: r.name,
    label: r.label,
    description: r.description,
    bootstrap: r.is_bootstrap,
    anonymous: r.is_anonymous,
    isMember: r.is_member,
    isAdmin: r.is_admin,
    memberCount: r.member_count,
  }))
}

// The Workspaces drill-down ROOTS: the fixed entry points shown when no scope
// is given, in the same item shape as listChildren and decided server-side (no
// client filtering). For a logged-in caller that is the shared app root
// (electra/content/apps) alone; see the comment inside for why the personal
// workspace is not among them. An anonymous caller gets the public scopes.
// `kind` labels each one so the UI never has to parse paths.
async function rootWorkspaces(personRef) {
  const client = await pool.connect()
  try {
    // Anonymous callers have no membership entry points. Their roots are the
    // public (is_anonymous) scopes themselves, each surfaced read-only. Keeps
    // the same item shape as the logged-in path below.
    if (!personRef) {
      const r = await client.query(
        `SELECT s.id, s.name, s.label, s.description, s.is_bootstrap, s.is_anonymous,
                (SELECT count(*)::int FROM memberships mc
                  WHERE mc.scope_id = s.id AND mc.is_member = true) AS member_count
           FROM scopes s
          WHERE s.is_anonymous = true
            AND s.is_personal_leaf = false
          ORDER BY s.label`
      )
      return r.rows.map((s) => ({
        scopeRef: String(s.id),
        name: s.name,
        label: s.label,
        description: s.description,
        kind: "apps",
        bootstrap: s.is_bootstrap,
        anonymous: s.is_anonymous,
        isMember: false,
        isAdmin: false,
        memberCount: s.member_count,
      }))
    }
    // The two fixed entry points, resolved by their exact paths (not pattern
    // matching): the shared app root and the caller's own personal workspace.
    // Only the shared app root. The caller's personal workspace is deliberately
    // NOT an entry point here: it belongs to one person for good, holds nothing
    // but their own leaf (no members, no review, hence no side panel), and its
    // documents are already reachable through the Drafts pane. Listing it as a
    // "workspace" alongside the shared root only ever suggested it was a place
    // to collaborate — which is exactly what createScope now refuses.
    const appsId = await resolveScopeIdByPath(client, PATH_APPS)

    const wanted = [
      { id: appsId, kind: "apps" },
    ].filter((w) => w.id != null)

    const out = []
    for (const w of wanted) {
      const r = await client.query(
        `SELECT s.id, s.name, s.label, s.description, s.is_bootstrap, s.is_anonymous,
                (m.person_ref IS NOT NULL AND m.is_member = true) AS is_member,
                COALESCE(m.is_admin, false)                       AS is_admin,
                (SELECT count(*)::int FROM memberships mc
                  WHERE mc.scope_id = s.id AND mc.is_member = true) AS member_count
           FROM scopes s
           LEFT JOIN memberships m ON m.scope_id = s.id AND m.person_ref = $2
          WHERE s.id = $1`,
        [w.id, personRef]
      )
      if (r.rowCount === 0) continue
      const s = r.rows[0]
      if (!s.is_member) continue // only entry points the caller belongs to
      out.push({
        scopeRef: String(s.id),
        name: s.name,
        label: s.label,
        description: s.description,
        kind: w.kind, // "apps" | "personal"
        bootstrap: s.is_bootstrap,
        anonymous: s.is_anonymous,
        isMember: s.is_member,
        isAdmin: s.is_admin,
        memberCount: s.member_count,
      })
    }
    return out
  } finally {
    client.release()
  }
}


// Every workspace the caller can reach, flat, for the Workspaces SEARCH — the
// counterpart of the drill-down (rootWorkspaces + listChildren), which only ever
// shows one level at a time.
//
// "Can reach" mirrors what clicking through would eventually surface, so search
// never finds less than browsing:
//   • the scope's PARENT is one the caller is a member of — the same rule the
//     drill-down enforces (listChildren + the route's isMember(parentId) gate),
//     which is why non-member scopes appear too, marked "visible only"
//   • or the caller is a member of the scope itself — reachable via a
//     membership granted deeper in the tree (distribute, direct add), where the
//     drill-down alone would not get you there
//
// Excluded: personal leaves (internal storage) and the whole `users` subtree —
// personal workspaces are single-owner and are no longer entry points either
// (see rootWorkspaces). The path is built in the same query rather than one
// pathOfScope() round trip per row.
async function visibleScopes(personRef) {
  if (!personRef) return []
  const res = await pool.query(
    `WITH RECURSIVE paths AS (
       SELECT id, parent_id, name::text AS path FROM scopes WHERE parent_id IS NULL
       UNION ALL
       SELECT s.id, s.parent_id, p.path || '/' || s.name
         FROM scopes s JOIN paths p ON s.parent_id = p.id
     ),
     mine AS (
       SELECT scope_id FROM memberships WHERE person_ref = $1 AND is_member = true
     ),
     users_root AS (SELECT id FROM paths WHERE path = $2)
     SELECT s.id, s.name, s.label, s.description, s.is_bootstrap, s.is_anonymous,
            p.path,
            (m.person_ref IS NOT NULL AND m.is_member = true) AS is_member,
            COALESCE(m.is_admin, false)                       AS is_admin,
            (SELECT count(*)::int FROM memberships mc
              WHERE mc.scope_id = s.id AND mc.is_member = true) AS member_count
       FROM scopes s
       JOIN paths p ON p.id = s.id
       LEFT JOIN memberships m ON m.scope_id = s.id AND m.person_ref = $1
      WHERE s.is_personal_leaf = false
        AND (s.parent_id IN (SELECT scope_id FROM mine)
             OR s.id     IN (SELECT scope_id FROM mine))
        -- scope_closure carries a depth-0 self row, so this also drops the
        -- users container itself, not just what sits under it.
        AND NOT EXISTS (
              SELECT 1 FROM scope_closure c
               WHERE c.descendant_id = s.id
                 AND c.ancestor_id = (SELECT id FROM users_root))
      ORDER BY p.path`,
    [personRef, PATH_USERS]
  )
  return res.rows.map((r) => ({
    scopeRef: String(r.id),
    name: r.name,
    label: r.label,
    description: r.description,
    path: stripPrefix(r.path),
    bootstrap: r.is_bootstrap,
    anonymous: r.is_anonymous,
    isMember: r.is_member,
    isAdmin: r.is_admin,
    memberCount: r.member_count,
  }))
}


// The member roster of ONE workspace (admin-only view, enforced by the route).
// Scoped query on this scope's memberships — NOT the god-view's cross-scope
// map. Personal leaves never appear here (they aren't members of the scope).
async function listMembers({ scopeId }) {
  const res = await pool.query(
    `SELECT person_ref, is_admin, reviewer_score
       FROM memberships
      WHERE scope_id = $1 AND is_member = true
      ORDER BY is_admin DESC, person_ref`,
    [scopeId]
  )
  return res.rows.map((r) => ({
    personRef: r.person_ref,
    isAdmin: r.is_admin,
    reviewerScore: r.reviewer_score,
  }))
}

module.exports = {
  stripPrefix,
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
  addMember,
  ensureWriteLeaf,
  removeMember,
  setAdmin,
  setReviewer,
  setRequiredApprovalScore,
  setPromoteCeiling,
  setBootstrap,
  setAnonymous,
  enrollBootstrap,
  renameScope,
  relabelScope,
  setScopeDescription,
  setParentScope,
  deleteScope,
  myScopes,
  distributeTargets,
  leafUnderScope,
  listChildren,
  listMembers,
  rootWorkspaces,
  visibleScopes,
  sanitizeName,
}
