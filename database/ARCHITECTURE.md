# Architecture

Technical realization of the model described in [README.md](README.md).

This document covers concrete technology choices, schema design, and how each functional rule from the README maps to database operations.

---

## 1. Technology Stack

### 1.1 Storage: PostgreSQL 14+

Document payloads live in `jsonb`. The scope hierarchy is modeled as an adjacency list with a closure table.

### 1.2 Extensions

| Extension | Purpose |
|-----------|---------|
| `pgcrypto` | UUID generation. |

### 1.3 Runtime: Node.js Service

- Node.js (same version as other Electra services)
- Express — REST endpoints
- `pg` — PostgreSQL driver
- `node-postgres` connection pool — one shared pool per service instance

No ORM. All queries are written as raw SQL.

### 1.4 Deployment Position in Electra

- Runs on `127.0.0.1:<PORT_DATABASE>` — port allocated in `settings.ini` (8095).
- Reachable only through the `ingress` reverse proxy.
- Managed by PM2 in `ecosystem.config.js`.
- Directory in the monorepo: `database/`.

---

## 2. Scope Representation

### 2.1 Adjacency List + Closure Table

Each scope has an integer id and a reference to its parent. A separate closure table stores the transitive ancestor/descendant relationship precomputed.

```
scopes:                        scope_closure:
  id | parent_id | name          ancestor_id | descendant_id | depth
   1 |   NULL    | school            1       |      1        |   0
   2 |     1     | class-8a          1       |      2        |   1
   3 |     2     | anna              1       |      3        |   2
                                     2       |      2        |   0
                                     2       |      3        |   1
                                     3       |      3        |   0
```

Row semantics of `scope_closure`: "ancestor_id is an ancestor of descendant_id at distance `depth`". Every scope has a self-row with `depth = 0`.

Names are opaque `text` — any UTF-8 characters, no length limit beyond what PostgreSQL `text` allows.

### 2.2 Human-Readable Scope Paths

Scope paths in the REST API (`school/class-8a/anna`) are resolved to an integer id at the API boundary. The service layer never encodes or decodes ltree-style paths; it walks the `scopes` table using `parent_id` chains keyed by `name`.

### 2.3 Closure Maintenance

**Inserting a scope** with `parent_id = P`:

```sql
INSERT INTO scope_closure (ancestor_id, descendant_id, depth)
SELECT ancestor_id, :new_id, depth + 1
FROM scope_closure
WHERE descendant_id = :P
UNION ALL
SELECT :new_id, :new_id, 0;
```

**Deleting a scope subtree rooted at `X`:**

```sql
DELETE FROM scope_closure
 WHERE descendant_id IN (SELECT descendant_id FROM scope_closure WHERE ancestor_id = :X)
    OR ancestor_id   IN (SELECT descendant_id FROM scope_closure WHERE ancestor_id = :X);
```

Both are wrapped in the same transaction as the corresponding `scopes` INSERT/DELETE. Moving a scope (changing its parent) is not supported — scopes are anchored at creation time.

### 2.4 Personal Leaf Auto-Provisioning

When a person is added as a member of scope `S`, a leaf scope is inserted as a child of `S` in the same transaction. The person is the sole member and no reviewer/admin configuration is applied.

A leaf is removed only when the person is removed from `S` **and** the leaf holds no content. Otherwise removal fails. Enforced by a foreign-key from `versions` to `scopes` with `ON DELETE RESTRICT`.

---

## 3. Database Schema

Simplified DDL — indexes and constraints included, comments and grants elided.

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- Scopes: adjacency list
-- ---------------------------------------------------------------------------
CREATE TABLE scopes (
    id                          bigserial   PRIMARY KEY,
    parent_id                   bigint      NULL REFERENCES scopes(id) ON DELETE RESTRICT,
    name                        text        NOT NULL,
    required_approval_score     integer     NOT NULL DEFAULT 0
                                CHECK (required_approval_score >= 0),
    created_at                  timestamptz NOT NULL DEFAULT now(),
    created_by                  text        NOT NULL,     -- personRef

    UNIQUE (parent_id, name)
);

CREATE INDEX scopes_parent_idx ON scopes (parent_id);

-- ---------------------------------------------------------------------------
-- Scope closure: transitive ancestor/descendant table
-- ---------------------------------------------------------------------------
CREATE TABLE scope_closure (
    ancestor_id     bigint      NOT NULL REFERENCES scopes(id) ON DELETE CASCADE,
    descendant_id   bigint      NOT NULL REFERENCES scopes(id) ON DELETE CASCADE,
    depth           integer     NOT NULL CHECK (depth >= 0),
    PRIMARY KEY (ancestor_id, descendant_id)
);

CREATE INDEX scope_closure_descendant_idx ON scope_closure (descendant_id, depth);

-- ---------------------------------------------------------------------------
-- Memberships: who belongs to which scope
-- ---------------------------------------------------------------------------
CREATE TABLE memberships (
    scope_id        bigint      NOT NULL REFERENCES scopes(id) ON DELETE CASCADE,
    person_ref      text        NOT NULL,
    is_admin        boolean     NOT NULL DEFAULT false,
    reviewer_score  integer     NULL         -- NULL = not a reviewer
                    CHECK (reviewer_score IS NULL
                           OR (reviewer_score >= 0 AND reviewer_score <= 10)),
    joined_at       timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (scope_id, person_ref)
);

CREATE INDEX memberships_person_idx ON memberships (person_ref);

-- ---------------------------------------------------------------------------
-- Versions: the append-only document history
-- ---------------------------------------------------------------------------
CREATE TYPE version_status AS ENUM ('pending', 'committed', 'deleted', 'rejected');

CREATE TABLE versions (
    scope_id        bigint          NOT NULL REFERENCES scopes(id) ON DELETE RESTRICT,
    doc_path        text            NOT NULL,
    version         integer         NOT NULL,
    status          version_status  NOT NULL,
    is_deletion     boolean         NOT NULL DEFAULT false,
    data            jsonb           NOT NULL DEFAULT '{}'::jsonb,
    meta            jsonb           NOT NULL DEFAULT '{}'::jsonb,
    author          text            NOT NULL,        -- personRef
    created_at      timestamptz     NOT NULL DEFAULT now(),

    finalized_at    timestamptz     NULL,
    finalized_by    text            NULL,
    rejection_reason text           NULL,

    -- Publish (§6.13). Set by publish, cleared by nothing (immutable).
    public_id       uuid            NULL UNIQUE,
    published_at    timestamptz     NULL,
    unpublished_at  timestamptz     NULL,

    PRIMARY KEY (scope_id, doc_path, version)
);

CREATE INDEX versions_lookup_idx
    ON versions (doc_path, scope_id, status, version DESC);

-- Only one pending promotion per (scope, path, author) — see §6.5
CREATE UNIQUE INDEX versions_one_pending_per_author
    ON versions (scope_id, doc_path, author)
    WHERE status = 'pending';

-- ---------------------------------------------------------------------------
-- Votes: reviewer approvals with score snapshot
-- ---------------------------------------------------------------------------
CREATE TYPE vote_kind AS ENUM ('approve', 'reject');

CREATE TABLE votes (
    scope_id        bigint          NOT NULL,
    doc_path        text            NOT NULL,
    version         integer         NOT NULL,
    voter           text            NOT NULL,        -- personRef
    kind            vote_kind       NOT NULL,
    score_snapshot  integer         NOT NULL
                    CHECK (score_snapshot >= 0 AND score_snapshot <= 10),
    reason          text            NULL,
    voted_at        timestamptz     NOT NULL DEFAULT now(),

    PRIMARY KEY (scope_id, doc_path, version, voter),
    FOREIGN KEY (scope_id, doc_path, version)
        REFERENCES versions(scope_id, doc_path, version)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------------
-- Blobs: binary attachments per version (Sprint 2 / README §6.14)
-- ---------------------------------------------------------------------------
CREATE TABLE blobs (
    scope_id      bigint      NOT NULL,
    doc_path      text        NOT NULL,
    version       integer     NOT NULL,
    key           text        NOT NULL,
    content_type  text        NOT NULL,
    size_bytes    integer     NOT NULL CHECK (size_bytes >= 0),
    data          bytea       NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (scope_id, doc_path, version, key),
    FOREIGN KEY (scope_id, doc_path, version)
        REFERENCES versions(scope_id, doc_path, version)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

### 3.1 Structural Notes

- A promotion is a `versions` row with `status = 'pending'`. `pendingPromotions()` is `SELECT ... WHERE status = 'pending' AND scope_id = :target`.
- There is no `documents` table. A document is the set of `versions` rows sharing `(scope_id, doc_path)`. The "active version" is a query.
- Version numbers are per `(scope_id, doc_path)`, computed at insert time as `MAX(version) + 1`.
- Mutable columns on an existing row: `status`, `finalized_at`, `finalized_by`, `rejection_reason`, `public_id`, `published_at`, `unpublished_at`. All others are immutable, enforced by an `UPDATE` trigger.
- `is_deletion = true` marks a pending or terminal delete row. Together with `status = 'deleted'`, it forms a tombstone.

---

## 4. Mapping Each Model Rule to SQL

### 4.1 Walk-up Lookup (§6.2)

```sql
SELECT v.*, c.depth
FROM versions v
JOIN scope_closure c ON c.ancestor_id = v.scope_id
WHERE c.descendant_id = :caller_leaf_id
  AND v.doc_path      = :doc_path
  AND v.status IN ('committed', 'deleted')
ORDER BY c.depth ASC,           -- closest scope first
         v.version DESC          -- newest within scope
LIMIT 1;
```

If the returned row's `status = 'deleted'`, the caller receives "not found".

### 4.1.1 Membership check (§4.1)

Membership is transitive up the tree. A person is a member of `S` iff they own at least one membership row on `S` itself or on any descendant scope of `S` (via `scope_closure`).

```sql
SELECT 1
  FROM memberships m
  JOIN scope_closure c ON c.descendant_id = m.scope_id
 WHERE c.ancestor_id = :scope_id
   AND m.person_ref  = :person_ref
 LIMIT 1;
```

Foreign leafs contribute nothing — Bob's row on `klasse8a/bob` does not make Anna a member of anything, because it does not match `m.person_ref = <anna>`.

The walk-up read (§4.1) picks the caller's "point of presence" — the deepest scope they have a membership row on that is a descendant of the addressed scope — and starts the walk-up from there.

### 4.2 Effective List (§6.3)

```sql
WITH visible AS (
    SELECT DISTINCT ON (v.doc_path)
           v.doc_path, v.scope_id, v.version, v.status,
           v.data, v.meta, v.author, v.created_at, c.depth
    FROM versions v
    JOIN scope_closure c ON c.ancestor_id = v.scope_id
    WHERE c.descendant_id = :caller_leaf_id
      AND v.status IN ('committed', 'deleted')
      AND ($2::text IS NULL OR v.doc_path LIKE $2 || '%')
    ORDER BY v.doc_path,
             c.depth ASC,
             v.version DESC
)
SELECT * FROM visible WHERE status = 'committed';
```

### 4.3 Write / Local Override (§6.4)

Transaction:

1. Optimistic concurrency check (§4.7).
2. Compute next version number for `(leaf_scope_id, doc_path)`.
3. INSERT with `status = 'committed'`.
4. Return the new row.

### 4.4 Promote (§6.5) — vertical

Transaction (single target, the next reviewing ancestor):

1. Optimistic concurrency check.
2. If a `pending` row exists for `(leaf_scope_id, doc_path, author)`, UPDATE it to `rejected` with `rejection_reason = 'superseded by same author'`.
3. Walk the ancestors of the caller's leaf (`scope_closure` ordered by `depth ASC`, starting at `depth = 1` — the leaf's direct parent). For each ancestor with `required_approval_score = 0`, insert a `committed` row. Stop at the first ancestor with `required_approval_score > 0` and insert a `pending` row there. If none exists all the way to root, commit at root.
4. Return the resulting row.

For the horizontal counterpart (many target scopes chosen by the author, not restricted to ancestors), see §4.14 Distribute.

### 4.5 Approve (§6.6, §6.7)

Transaction:

1. Optimistic concurrency check: the passed doc's `(scope_id, doc_path, version)` still points to a `pending` row.
2. INSERT into `votes` (approve). `score_snapshot` = current `memberships.reviewer_score`.
3. Sum approver scores for this pending row. If `>= required_approval_score`:
   - UPDATE the pending row to `status = 'committed'` (or `'deleted'` if `is_deletion = true`).
   - UPDATE all other pending rows for the same `(scope_id, doc_path)` (from different authors) to `status = 'rejected'` with `rejection_reason = 'superseded by conflict rule §6.7'`.
   - If the pending row originated from a leaf, physically delete the caller's leaf's version(s) for the same doc-path (§6.8 cleanup — same mechanism as revert §4.8).

### 4.6 Reject (§6.6)

Transaction:

1. Optimistic concurrency check.
2. INSERT into `votes` (reject).
3. UPDATE the pending row to `status = 'rejected'` with the reason.

### 4.7 Optimistic Concurrency (§6.12)

Every mutation runs inside a transaction that verifies the passed doc's `(scope_id, doc_path, version)` still matches the current server state.

Approve/reject pattern:

```sql
UPDATE versions
   SET status = 'rejected', finalized_at = now(), ...
 WHERE scope_id = :scope_id AND doc_path = :path AND version = :version
   AND status = 'pending';
-- 0 rows updated → `outdated` error
```

Put pattern:

```sql
SELECT 1
  FROM versions
 WHERE scope_id = :leaf_id
   AND doc_path = :path
   AND version  > :version_from_doc
 LIMIT 1;
-- row returned → `outdated` error
```

Isolation: `REPEATABLE READ`.

### 4.8 Revert (§6.10) — physical delete

Transaction:

1. Optimistic concurrency check on the passed doc.
2. Delete every row in `versions` for `(scope_id = leafId, doc_path)` — regardless of status. Votes and blobs go with them via `ON DELETE CASCADE`.
3. Return the count of deleted rows.

If no rows exist for that `(leaf, path)`, the call returns 200 with `deleted: 0` (no-op).

Public URLs served by rows deleted this way stop working — the `public_id` is gone, subsequent public reads return `404`.

```sql
DELETE FROM versions
 WHERE scope_id = :leaf_id
   AND doc_path = :doc_path
RETURNING version, public_id;
```

### 4.9 Delete (§6.9)

Delete is a promote whose row carries `is_deletion = true`. On approval, the row transitions to `status = 'deleted'` instead of `'committed'`.

**Cascading Cleanup on Root Delete.** Triggered when a delete is committed at the root or at a scope with no active version above it. Runs as one atomic operation:

```sql
DELETE FROM versions
 WHERE doc_path = :path
   AND scope_id IN (
       SELECT descendant_id FROM scope_closure WHERE ancestor_id = :cleanup_root
   )
   AND (scope_id, doc_path, version) <> (:root_tombstone_scope_id, :path, :root_tombstone_version);
```

The tombstone at the cleanup root is preserved. Votes go with the rows via `ON DELETE CASCADE`.

This is the only operation that ever physically deletes from `versions`.

### 4.10 Amend by Same Author (§6.5)

Enforced by `versions_one_pending_per_author`. The service layer's `promote` first UPDATEs the previous pending row to `rejected`, then inserts a new one, inside one transaction.

### 4.11 Publish (§6.13)

Publish attaches a UUID to a specific `(scope_id, doc_path, version)` row. The row must:

- Belong to the caller's own leaf (`scope_id = callerLeafId`).
- Be in status `committed`.
- Not already be published (`public_id IS NULL`).

```sql
UPDATE versions
   SET public_id = gen_random_uuid(),
       published_at = now()
 WHERE scope_id = :caller_leaf_id
   AND doc_path = :doc_path
   AND version  = :version
   AND status   = 'committed'
   AND public_id IS NULL
RETURNING public_id, published_at;
```

If 0 rows are updated, the service inspects why:

- No row at `(leaf, path, version)` → 404 / `outdated`
- Wrong status → 409 `not_publishable`
- Already has `public_id` → 409 `already_published`
- Walk-up returns a doc from a different scope than caller's leaf → 409 `not_publishable` (checked at the service layer before this UPDATE)

**Unpublish** — sets `unpublished_at` on the version. The `public_id` stays; it just no longer serves.

```sql
UPDATE versions
   SET unpublished_at = now()
 WHERE scope_id = :caller_leaf_id
   AND doc_path = :doc_path
   AND version  = :version
   AND public_id IS NOT NULL
   AND unpublished_at IS NULL
```

**Anonymous read by publicId:**

```sql
SELECT v.*, s.name as scope_name
FROM versions v
JOIN scopes s ON s.id = v.scope_id
WHERE v.public_id = :public_id
```

- 0 rows → `404 Not Found` (never existed, or reverted)
- `unpublished_at IS NOT NULL` → `410 Gone`
- else → `200 OK` with the full doc shape

### 4.12 Blobs (§6.14)

Blobs live in a separate table keyed by `(scope_id, doc_path, version, key)` with `ON DELETE CASCADE` back to `versions`. Reverting a leaf (§4.8) therefore removes its blobs automatically.

**Auto-copy on write.** `putDoc` runs the copy inside the same transaction as the version insert:

```sql
INSERT INTO blobs (scope_id, doc_path, version, key, content_type, size_bytes, data)
SELECT $newLeafId, $docPath, $newVersion, b.key, b.content_type, b.size_bytes, b.data
FROM blobs b
JOIN scope_closure c ON c.ancestor_id = b.scope_id
WHERE c.descendant_id = $newLeafId
  AND b.doc_path      = $docPath
  AND (b.scope_id, b.version) = (
      SELECT v.scope_id, v.version
      FROM versions v
      JOIN scope_closure c2 ON c2.ancestor_id = v.scope_id
      WHERE c2.descendant_id = $newLeafId
        AND v.doc_path       = $docPath
        AND v.status IN ('committed', 'deleted')
        AND (v.scope_id, v.version) <> ($newLeafId, $newVersion)
      ORDER BY c2.depth ASC, v.version DESC
      LIMIT 1
  );
```

The source version is the walk-up target immediately before the new insert — i.e. what `getDoc` would have returned. Blobs are copied byte-for-byte; no content-address deduplication.

**Put blob:** UPSERT on `(scope_id, doc_path, version, key)`.

**Get blob (member):**

```sql
SELECT b.content_type, b.data
FROM blobs b
JOIN scope_closure c ON c.ancestor_id = b.scope_id
JOIN versions v USING (scope_id, doc_path, version)
WHERE c.descendant_id = :caller_leaf_id
  AND b.doc_path      = :doc_path
  AND b.key           = :key
  AND v.status IN ('committed', 'deleted')
ORDER BY c.depth ASC, b.version DESC
LIMIT 1;
```

**Get blob (public):** joined via `versions.public_id`. Additional `410 Gone` when `unpublished_at IS NOT NULL`.

**Content-type allow-list.** Enforced at the service layer. Configured via `BLOB_ALLOWED_CONTENT_TYPES` env var (comma-separated). Default: `image/png,image/gif,image/svg+xml,application/pdf`.

**Size limit.** 10 MB per upload. Enforced by Fastify's `bodyLimit`.

### 4.13 Rename (§6.15)

Rename is an in-place update of `versions.doc_path`. Blob and vote rows follow via `ON UPDATE CASCADE`. All work happens inside one transaction.

```sql
-- 1. Concurrency check: current active leaf version at old path.
SELECT version FROM versions
 WHERE scope_id = :leaf AND doc_path = :old
   AND status = 'committed'
 ORDER BY version DESC LIMIT 1;

-- 2. Conflict check: any row at new path in the same leaf?
SELECT 1 FROM versions
 WHERE scope_id = :leaf AND doc_path = :new
 LIMIT 1;
-- if a row exists → raise `conflict` with usedPaths: [new]

-- 3. Reject pending promotions on the old path from this author.
UPDATE versions
   SET status = 'rejected',
       finalized_at = now(),
       finalized_by = :caller,
       rejection_reason = 'renamed by author'
 WHERE status = 'pending'
   AND doc_path = :old
   AND author = :caller;

-- 4. The rename itself. Blob/vote FKs cascade automatically.
UPDATE versions
   SET doc_path = :new
 WHERE scope_id = :leaf AND doc_path = :old
RETURNING version;
```

If `:old == :new`, return `moved: 0` without touching anything.

There is no batch or prefix rename in the initial implementation — if renaming many docs at once becomes a need, it will be designed separately.

**Name-check lookup:**

```sql
SELECT 1 FROM versions
 WHERE scope_id = :leaf AND doc_path = :path
 LIMIT 1;
```

Returns `{ exists: true/false }`.

### 4.14 Distribute (§6.16) — horizontal

Distribute is **N independent inserts**, one per target scope, all inside one transaction. Nothing cascades between targets — each is decided by the target's own state and rules.

Per-target decision:

```sql
-- For each targetScopeId in the request:

-- Determine per-target status.
--   No active version                        → committed
--   Active version, author = caller          → committed  (update own work)
--   Active version, author <> caller         → pending    (needs review)
SELECT scope_id, version, author, status
  FROM versions
 WHERE scope_id = :targetScopeId
   AND doc_path = :docPath
   AND status IN ('committed', 'deleted')
 ORDER BY version DESC
 LIMIT 1;

-- Compute next version number for (targetScopeId, docPath).
SELECT COALESCE(MAX(version), 0) + 1
  FROM versions
 WHERE scope_id = :targetScopeId AND doc_path = :docPath;

-- Insert the new row with the decided status.
INSERT INTO versions
  (scope_id, doc_path, version, status, is_deletion, data, meta, author)
VALUES
  (:targetScopeId, :docPath, :nextVersion, :decidedStatus, false,
   :sourceData, :sourceMeta, :caller);

-- Auto-copy blobs from the source leaf version — same query shape as §4.3 putDoc.
INSERT INTO blobs (scope_id, doc_path, version, key, content_type, size_bytes, data)
SELECT :targetScopeId, :docPath, :nextVersion,
       b.key, b.content_type, b.size_bytes, b.data
  FROM blobs b
 WHERE b.scope_id = :callerLeafId
   AND b.doc_path = :docPath
   AND b.version  = :sourceVersion;
```

**Membership check.** Before any insert, verify the caller is a member of every listed `targetScopeId`. If any target fails membership, the whole transaction is aborted (`403 forbidden`, listing which targets rejected the caller).

**No content compare.** The DB does not check whether the source doc equals a possibly existing active version at the target. Same content → still a new version.

**No cross-target dependency.** If one target's insert has an issue (e.g. duplicate-key race), that target reports the failure; other targets are unaffected. Per-target status is returned to the caller as a list.

**Response.** Per target:

```json
{
  "distributions": [
    { "targetScopeId": 15, "status": "committed", "version": 3 },
    { "targetScopeId": 18, "status": "pending",   "pendingVersion": 12 },
    { "targetScopeId": 21, "status": "committed", "version": 8 }
  ]
}
```

**Rejected on failure.** `403 forbidden` if the caller is not a member of one of the targets; `404 not_found` if the source doc-path has no committed leaf version; `409 outdated` if concurrency check fails on the source.

---

## 5. Transactions and Isolation

### 5.1 Isolation Level

Default per-connection: `REPEATABLE READ`.

`SERIALIZABLE` is used for:
- Version-number assignment inside `put`.
- Approve when a state transition may race with a sibling promotion's approve.

On `serialization_failure` (SQLSTATE 40001), the service retries up to 3 times with 10/50/200 ms backoff before surfacing an error.

### 5.2 Version-Number Race

Concurrent inserts on the same `(scope_id, doc_path)` use `INSERT ... ON CONFLICT DO NOTHING` on the primary key, followed by a retry loop that recomputes `MAX(version) + 1`.

### 5.3 Guarantees to Callers

- Read-your-writes within a single connection.
- No lost updates across sessions of the same person (§6.12).
- Promote-cascade steps commit atomically or not at all.

---

## 6. Authentication Integration with Electra

### 6.1 Identity Source

`ingress` injects headers on every proxied request:

- `x-mail` — authenticated email
- `x-hash` — SHA-256 of the email
- `x-role` — `admin` / `user` / `anonym`

The `database` service uses `x-hash` as the `personRef`. `x-mail` is not persisted.

### 6.2 Bootstrap: Root Admin

Self-provisioning on **first boot**. On every service start (after migrations), `persistence/init.js` checks whether the DB already has a root scope:

- **If yes:** the module is a full no-op. Runtime state (scopes, memberships, roles) is never modified by later boots.
- **If no:** it reads `database/init.json` (path overridable via env `DATABASE_INIT_FILE`), validates it, and creates every scope in the declared tree with their admins.

**init.json shape.** The property name **is** the scope name. Reserved keys `admins` and `requiredApprovalScore` carry scope metadata; every other key is a child scope.

```json
{
  "electra": {
    "admins": ["admin@electra.academy"],
    "users": {},
    "apps": {
      "brains": {},
      "shapes": {},
      "docs":   {}
    }
  }
}
```

**Rules:**

- Top level: exactly one property (the root scope name).
- Root scope must declare at least one email in `admins` — otherwise `die()` at first boot.
- Sub-scopes may declare their own `admins` list; if empty/absent they inherit no membership. Runtime admin ernennt then explicit via API.
- `SHA-256(email)` is the `personRef` inserted into `memberships`, with `is_admin = true` and `reviewer_score = 10`.
- `requiredApprovalScore` default `0`.

**Consequences:**

- **No `POST /database/bootstrap` endpoint exists.** The DB is either already bootstrapped or not.
- **Editing `init.json` later has no effect** on an already-bootstrapped DB. All later changes go through the runtime API.
- **Rollback is manual:** to redo bootstrap, drop the schema and restart.

### 6.3 Anonymous Callers

`x-role = 'anonym'` is rejected at the service layer for every endpoint.

---

## 7. REST API Surface

Every `scope.<verb>(...)` in the README maps to one or more HTTP endpoints. The `:scopeId` in URLs is the numeric `scopes.id` (bigint) returned by bootstrap / `createScope` / `addMember`. The caller is identified via ingress headers (`x-role`, `x-mail`, `x-hash`).

**Scope management**

| Verb  | Path                                                | Body                             | Notes |
|-------|-----------------------------------------------------|----------------------------------|-------|
| POST  | `/database/scopes/:scopeId/children`                | `{ name, requiredApprovalScore }`| Admin of parent required |
| POST  | `/database/scopes/:scopeId/members`                 | `{ personRef }`                  | Auto-provisions the person's leaf |

The root scope and its canonical children are provisioned automatically on service start — see §6.2. No `POST /database/bootstrap` endpoint exists.

**Document CRUD (member-scoped)**

| Verb   | Path                                        | Body / Query                | Response |
|--------|---------------------------------------------|-----------------------------|----------|
| GET    | `/database/scopes/:scopeId/docs`            | `?prefix=math/` (optional)  | Effective view (§4.2) |
| GET    | `/database/scopes/:scopeId/docs/*`          | —                           | Full doc shape or 404 |
| PUT    | `/database/scopes/:scopeId/docs/*`          | `{ data, meta, ... }`       | New leaf version |
| GET    | `/database/scopes/:scopeId/docs/exists`     | `?path=X`                   | `{ exists: bool }` (own leaf only, for pre-rename UX) |

**Actions on docs** — Fastify's router only allows `*` as the trailing segment. Action endpoints therefore live one level higher and take the doc-path in the body.

| Verb  | Path                                     | Body                                       | Notes |
|-------|------------------------------------------|--------------------------------------------|-------|
| POST  | `/database/scopes/:scopeId/revert`       | `{ path }`                                 | Physically drops all leaf rows for this path |
| POST  | `/database/scopes/:scopeId/promote`      | `{ path, version }`                        | Vertical, one target (M2a — planned) |
| POST  | `/database/scopes/:scopeId/distribute`   | `{ path, version, targetScopeIds: [] }`    | Horizontal, N targets (M2b — planned) |
| POST  | `/database/scopes/:scopeId/rename`       | `{ path, newPath, version }`               | Own leaf only |
| POST  | `/database/scopes/:scopeId/publish`      | `{ path }`                                 | Sets `public_id` on caller's active leaf version |
| POST  | `/database/scopes/:scopeId/unpublish`    | `{ path }`                                 | Sets `unpublished_at` |

**Blobs** — raw body, `Content-Type` header preserved:

| Verb   | Path                                              | Query          | Notes |
|--------|---------------------------------------------------|----------------|-------|
| PUT    | `/database/scopes/:scopeId/blobs/:key`            | `?path=X`      | Raw body, Content-Type must match allow-list, max 10 MB |
| GET    | `/database/scopes/:scopeId/blobs/:key`            | `?path=X`      | Walk-up-resolved for member |
| DELETE | `/database/scopes/:scopeId/blobs/:key`            | `?path=X`      | Deletes blob on caller's active leaf version |

**Reviewer operations** (M2 — planned)

| Verb  | Path                                        | Body                             |
|-------|---------------------------------------------|----------------------------------|
| GET   | `/database/scopes/:scopeId/pending`         | —                                |
| POST  | `/database/scopes/:scopeId/approve`         | `{ path, version }`              |
| POST  | `/database/scopes/:scopeId/reject`          | `{ path, version, reason }`      |

**Anonymous public reads** (no auth headers required)

| Verb | Path                                            | Response |
|------|-------------------------------------------------|----------|
| GET  | `/database/public/:publicId`                    | 200 doc / 410 gone / 404 |
| GET  | `/database/public/:publicId/blobs/:key`         | 200 bytes / 410 gone / 404 |

**Error mapping**

- `outdated` → HTTP `409 Conflict`, body carries current server-side version so the client can refetch.
- `conflict` (e.g. rename target already used) → HTTP `409 Conflict`, body includes `usedPaths`.
- `not_publishable`, `already_published` → HTTP `409`.
- `unsupported_media_type` → HTTP `415`.
- `forbidden` → HTTP `403`.
- `not_found` → HTTP `404`.

---

## 8. Directory Layout in the Monorepo

```
database/
├── README.md
├── ARCHITECTURE.md
├── IMPLEMENTATION_PLAN.md
├── package.json
├── init.json                       # canonical scope layout, applied on first boot (§6.2)
├── docker-compose.dev.yml
├── server/
│   ├── index.js                    # Fastify boot, migration runner, route registration, error mapper
│   ├── auth.js                     # requireLogin hook, nocache hook
│   ├── persistence/
│   │   ├── pool.js                 # pg Pool
│   │   ├── migrate.js              # forward-only migration runner (advisory-locked)
│   │   ├── init.js                 # idempotent canonical-structure bootstrap (§6.2)
│   │   ├── migrations/
│   │   │   ├── 001_initial.sql     # scopes, closure, memberships, versions, votes
│   │   │   ├── 002_publish.sql     # public_id, published_at, unpublished_at on versions
│   │   │   └── 003_blobs.sql       # blobs table (ON UPDATE CASCADE to versions)
│   │   ├── scopes.js               # id resolution, closure maintenance, membership
│   │   ├── docs.js                 # walk-up get, effective list, put (with auto-copy of blobs), revert
│   │   ├── publish.js              # publish, unpublish, getByPublicId
│   │   ├── blobs.js                # put/get/delete blob + getBlobByPublicId
│   │   └── rename.js               # renameInLeaf, hasPathInLeaf
│   ├── routes/
│   │   ├── scopes.js               # POST children, POST members
│   │   ├── docs.js                 # GET list, GET/PUT docs/*
│   │   ├── publish.js              # publish/unpublish/revert + GET /public/:publicId
│   │   ├── blobs.js                # PUT/GET/DELETE blobs + public blob read
│   │   └── rename.js               # rename + docs/exists lookup
│   └── utils/
│       ├── die.js
│       └── errors.js               # DomainError family
└── test/
    ├── helpers.js                  # per-suite schema isolation
    ├── bootstrap.test.js
    ├── closure.test.js
    ├── walkup.test.js
    ├── list.test.js
    ├── publish.test.js
    ├── blobs.test.js
    ├── revert.test.js
    └── rename.test.js
```

---

## 9. Migration Strategy

The `database` service runs in the same PostgreSQL cluster as `gamification`, in a separate schema `docstore`. On service start, `migrate.js` applies any missing migrations from a `migrations/` folder tracked in a `docstore.migrations` table.

Forward-only. Rollbacks are done by forward migrations.

---

## 10. Performance Notes

- Ancestor/descendant queries are single index lookups on `scope_closure` — constant cost regardless of tree depth.
- `list()` runs as one query with `DISTINCT ON`.
- Every write appends to `versions`.
- Scope creation and deletion touch `scope_closure` in O(depth) rows.
- A cascading root delete that would remove more than 10 000 rows in one transaction is refused by the service; the operator must stage it manually.

Version pruning and snapshot compaction are not part of the initial implementation.

---

## 11. Open Technical Questions

- **Scope rename.** The schema stores `name` on `scopes`. Renaming is a single UPDATE and does not touch `scope_closure`. Whether renames are exposed via the API is undecided.
- **Scope move.** Reparenting a scope requires rebuilding a subtree in `scope_closure`. Not supported in the initial implementation.
- **`history()` scope.** Currently walks the ancestor chain via `scope_closure`. Result-set size can be large; pagination or a scope-local variant may be added.
