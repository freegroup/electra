# Implementation Plan

Concrete task list for building the `database` service. Follows the model in [README.md](README.md) and the technical design in [ARCHITECTURE.md](ARCHITECTURE.md). Follows the layout conventions of the existing Electra modules (`brains/`, `gamification/`).

## Status

| Milestone | State | Notes |
|-----------|-------|-------|
| M1 — Skeleton + Read/Write Core | ✅ done | 14 tests |
| M1.5 Sprint 1 — Publish + physical Revert | ✅ done | +8 publish tests, +3 revert tests |
| M1.5 Sprint 2 — Blobs (with auto-copy) | ✅ done | +8 blob tests, migration 003 |
| M1.5 Sprint 3 — Rename | ✅ done | +9 rename tests |
| M1.5 Sprint 4 — brains-facing shim | ⏳ deferred | pending brains migration decision |
| M2a — Promote (vertical) | 📋 planned | see below |
| M2b — Distribute (horizontal, multi-target) | 📋 planned | see below; independent of M2a |
| M3 — Delete workflow + root cascade | 📋 planned | revert already covered by Sprint 1 |
| M4 — History, hardening | 📋 planned | error taxonomy already in place |

Total test count today: 54 (all green). Includes coverage of first-boot self-provisioning and transitive membership.

---

## Actual Directory Layout (as built)

```
database/
├── package.json                    # Fastify 5, pg, dotenv
├── docker-compose.dev.yml          # local PostgreSQL 14
├── init.json                       # canonical scope layout, applied on first boot only
├── README.md / ARCHITECTURE.md / IMPLEMENTATION_PLAN.md
├── server/
│   ├── index.js                    # Fastify boot + migration + bootstrap + routes
│   ├── auth.js                     # requireLogin + nocache hooks
│   ├── persistence/
│   │   ├── pool.js
│   │   ├── migrate.js              # advisory-lock-guarded runner
│   │   ├── migrations/*.sql        # 001_initial, 002_publish, 003_blobs
│   │   ├── scopes.js               # closure + membership + roles
│   │   ├── docs.js                 # walk-up get, list, put (+ blob auto-copy), revert
│   │   ├── publish.js
│   │   ├── blobs.js
│   │   ├── rename.js
│   │   └── init.js                 # idempotent canonical-structure bootstrap
│   ├── routes/
│   │   ├── scopes.js
│   │   ├── docs.js
│   │   ├── publish.js              # publish/unpublish/revert + anonymous /public/:id
│   │   ├── blobs.js
│   │   └── rename.js               # rename + docs/exists
│   └── utils/
│       ├── die.js
│       └── errors.js               # DomainError family
└── test/
    ├── helpers.js
    └── {bootstrap,closure,walkup,list,revert,publish,blobs,rename}.test.js
```

---

## Environment Configuration

Additions to `settings.ini` (root of the monorepo):

```
PORT_DATABASE=8095
PG_DATABASE_HOST=<host>
PG_DATABASE_PORT=5432
PG_DATABASE_NAME=<db>
PG_DATABASE_USER=<user>
PG_DATABASE_SCHEMA=docstore
BLOB_ALLOWED_CONTENT_TYPES=image/png,image/gif,image/svg+xml,application/pdf   # optional
```

Secrets (`secrets.ini`):

```
PG_DATABASE_PWD=<password>
```

The initial root-admin identity is declared in `init.json` under the root scope's `admins` list — not as an env variable. See README §3.4 and ARCHITECTURE.md §6.2.

Reused from the monorepo: `LOCALHOST`.

Route prefix for the ingress reverse proxy: `/database`.

---

## Route Prefix Convention

All endpoints are prefixed `/database/...` to match the pattern of other services (`/brains`, `/gamification`, ...). Fastify's router only allows the `*` wildcard in the trailing segment. Action endpoints (revert, publish, promote, distribute, rename) therefore live one level higher and pass the doc-path in the request body — see ARCHITECTURE.md §7 for the full REST surface.

---

## Milestones

Each milestone ends with tests that pass and a hand-verifiable REST path exercise.

---

### Milestone 1 — Skeleton + Read/Write Core (done)

**Goal reached:** service comes up on port 8095, migrates its schema, self-provisions the canonical scope tree (§6.2), sub-scopes can be created, members can be added (auto-leaf), documents can be put/get/list with walk-up semantics. No promote/approve/delete/history yet.

Built:

- `package.json`, `docker-compose.dev.yml`, `settings.ini`/`secrets.ini` entries.
- `server/index.js` — Fastify 5 boot, migrate + bootstrap + route registration + error mapper.
- `server/auth.js` — `requireLogin` and `nocache` Fastify hooks; `DATABASE_TEST_MODE=1` lets tests pass `x-hash` directly.
- `server/persistence/pool.js` — pg Pool from `PG_DATABASE_*` env.
- `server/persistence/migrate.js` — advisory-lock-guarded forward-only runner.
- `server/persistence/migrations/001_initial.sql` — scopes, closure, memberships, versions, votes.
- `server/persistence/scopes.js` — `createRootScope`, `createScope`, closure maintenance, membership, leaf auto-provisioning, `pathOfScope`.
- `server/persistence/docs.js` — `putDoc`, `getDoc` (walk-up), `listDocs` (effective view).
- `server/routes/scopes.js` — `POST /database/scopes/:scopeId/children`, `POST .../members`.
- `server/routes/docs.js` — `GET .../docs`, `GET .../docs/*`, `PUT .../docs/*`.
- `ecosystem.config.js` — `database` app entry.

**Not in M1 (came later):** publish, blobs, rename, revert, self-provisioning bootstrap. See M1.5.

**Tests (all green):** `walkup`, `list`, `closure`, `bootstrap` (renamed later to cover auto-provisioning).

---

### Milestone 1.5 — Brains-Ablösung Prerequisites

**Goal:** everything the existing `brains/` service needs from persistence, so that a later brains migration can happen with a thin router. Purely additive on top of M1 — no promotion, no approvals.

The milestone is split into **four independent sprints**, each mergeable on its own. Complete only what is needed next; the others stay documented until the trigger arrives.

#### Sprint 1 — Publish + Revert semantics fix

**Trigger:** ready now. Publish is the one operation brains has today (`share`) that M1 does not offer. Revert semantics changed in the README (§6.10) — code must catch up.

**Deliverables:**

1. Migration 002:
   - Add to `versions`: `public_id uuid NULL UNIQUE`, `published_at timestamptz NULL`, `unpublished_at timestamptz NULL`
2. `server/persistence/docs.js` — `revert` becomes a **physical delete** of all leaf rows for the doc-path + all `pending` promotions from that author for the same path (see README §6.10). All in one transaction. Votes on those pending rows go via `ON DELETE CASCADE`.
3. `server/persistence/publish.js` (new file):
   - `publish({ callerLeafId, docPath, callerVersion, callerPersonRef })` — refuses if the caller has no committed leaf version at `(callerLeafId, docPath)`; else sets `public_id = gen_random_uuid()`, `published_at = now()`. Returns the doc.
   - `unpublish({ callerLeafId, docPath, callerVersion, callerPersonRef })` — sets `unpublished_at = now()` on the version.
   - `getByPublicId(publicId)` — anonymous. Returns doc, or `410 Gone` if `unpublished_at IS NOT NULL`, or `404` if the row is gone (revert).
4. Route `server/routes/publish.js` (new):
   - `POST /database/scopes/:scope/docs/*/publish` (authenticated)
   - `POST /database/scopes/:scope/docs/*/unpublish` (authenticated)
   - `GET /database/public/:publicId` (anonymous — bypasses `requireLogin`)
5. Register the new routes in `server/index.js` and the anonymous GET must be attached **before** the global auth hook.

**Tests:**

- `revert.test.js` — put v1, v2, v3 in leaf, promote a v4; revert deletes all 4 rows; a subsequent get falls back to inherited (or 404).
- `revert-published.test.js` — publish v3, then revert; `GET /public/:publicId` returns 404.
- `publish-basic.test.js` — publish own committed leaf version → 201 with publicId; anonymous `GET /public/:publicId` returns full doc shape.
- `publish-inherited-rejected.test.js` — publish a doc whose walk-up returns an inherited scope (no leaf version) → 409 `not_publishable`.
- `publish-non-committed-rejected.test.js` — publish a `pending` version (once promotion exists in M2) or an already-published one — 409.
- `unpublish.test.js` — publish, unpublish, anonymous `GET /public/:publicId` returns 410.
- `publish-multiple-versions.test.js` — publish v1, then put v2, publish v2 → two live URLs, both stable.

**Definition of Done:** all M1 tests still green + Sprint-1 tests green + one manual curl round-trip:
1. Start service (self-provisions root); add member on a sub-scope; put doc → POST /publish → get UUID → anonymous curl `/database/public/<uuid>` returns the doc.
2. Revert → anonymous curl → 404.

#### Sprint 2 — Blob support

**Trigger:** ready when brains migration begins (needs `.png` thumbnails). Not needed for M2/M3.

**Deliverables:**

1. Migration 003:
   ```sql
   CREATE TABLE blobs (
       id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
       scope_id      bigint      NOT NULL REFERENCES scopes(id) ON DELETE RESTRICT,
       doc_path      text        NOT NULL,
       version       integer     NOT NULL,
       key           text        NOT NULL,
       content_type  text        NOT NULL,
       size_bytes    integer     NOT NULL,
       sha256        text        NOT NULL,
       data          bytea       NOT NULL,
       created_at    timestamptz NOT NULL DEFAULT now(),
       UNIQUE (scope_id, doc_path, version, key),
       FOREIGN KEY (scope_id, doc_path, version)
           REFERENCES versions(scope_id, doc_path, version) ON DELETE CASCADE
   );
   ```
2. `server/persistence/blobs.js`:
   - `putBlob({ leafId, docPath, callerVersion, key, buffer, contentType })` — writes to caller's leaf version.
   - `getBlob({ callerLeafId, docPath, key })` — walk-up-driven, returns `{ contentType, buffer }`.
   - `getBlobByPublicId(publicId, key)` — anonymous.
   - `deleteBlob({ leafId, docPath, callerVersion, key })`
3. Routes:
   - `PUT    /database/scopes/:scope/docs/*/blobs/:key` — body is raw bytes, `Content-Type` header preserved.
   - `GET    /database/scopes/:scope/docs/*/blobs/:key`
   - `DELETE /database/scopes/:scope/docs/*/blobs/:key`
   - `GET    /database/public/:publicId/blobs/:key`
4. `revert` physically removes blob rows via the existing `ON DELETE CASCADE` chain from `versions`.

**Tests:**

- `blobs-basic.test.js` — put/get/delete blob on own leaf version.
- `blobs-walkup.test.js` — put blob on class-level version, anna reads it via her scope.
- `blobs-public.test.js` — publish version with blob, anonymous read of `/public/:publicId/blobs/thumbnail`.
- `blobs-revert.test.js` — revert removes blobs.

#### Sprint 3 — Rename

**Trigger:** ready when brains migration begins (brains has a `rename` endpoint users invoke often). Not needed for M2/M3.

**Deliverables:**

1. `server/persistence/rename.js`:
   - `renameInLeaf({ leafId, oldPath, newPath, callerPersonRef, callerVersion })` — updates `versions.doc_path` for every row in the leaf. Refuses if `newPath` already has rows in this leaf. Cancels pending promotions from the caller for `oldPath`. Since `doc_path` can carry `/`, a "file rename" and a "move to another folder" are the same operation.
   - `hasPathInLeaf({ leafId, path })` — lookup for the name-check endpoint.
2. Routes:
   - `POST /database/scopes/:scopeId/rename` — body: `{ path, newPath, version }`
   - `GET  /database/scopes/:scopeId/docs/exists?path=X` — lookup: `{ exists: bool }`
3. Concurrency: caller passes their current version; we assert `(leafId, oldPath, version)` is still the active leaf version.
4. Rename does **not** touch `public_id` — a rename is a metadata change; the version identity in the closure of published URLs is not affected.
5. Schema (already in migrations 001+003 as of Sprint 3): `versions`↔`votes` and `versions`↔`blobs` FKs use `ON UPDATE CASCADE` so rename propagates without extra queries.
6. Batch / "folder rename" is deliberately NOT part of this sprint. Left as a future extension.

**Tests:**

- `rename-basic.test.js` — single-doc rename in own leaf; get on old path 404s, get on new path returns the doc.
- `rename-with-versions.test.js` — multiple versions in own leaf are all moved.
- `rename-published.test.js` — rename a published doc; `GET /public/:publicId` still works and reports the new path.
- `rename-conflict.test.js` — target path already has content in the leaf → 409 with `usedPaths`.
- `rename-noop.test.js` — `oldPath == newPath` → 200 with `moved: 0`.
- `rename-not-found.test.js` — no local version at oldPath → 404.
- `rename-with-blobs.test.js` — blob follows the rename (cascade).
- `rename-cancels-promotion.test.js` — pending promotion for the old path is rejected with reason `renamed by author`.
- `exists.test.js` — name-check returns true/false per path in the caller's own leaf.

#### Sprint 4 — brains-facing shim (only when trigger fires)

**Trigger:** ready to actually migrate `brains/`. Sprints 1–3 must be done.

**Deliverables:**

1. Rewrite `brains/server/data/*.js` as thin adapters over the new database service (HTTP). Each brains endpoint maps to one or two DB calls.
2. Retire `brains/server/persistence/filesystem-adapter.js`.
3. One-shot migration script that walks the filesystem tree under `data/brains/` and posts each file to the new DB (put + publish where applicable).

Out of scope for Sprint 4: `POST /brains/user/folder` — the whole concept goes away with git-style path semantics (README §2).

---

### Milestone 2 — Sharing Workflows: Promote and Distribute

Content-sharing has two orthogonal shapes (README §6.5 vs §6.16). M2 is split accordingly so each can be reviewed and merged on its own.

#### M2a — Promote (vertical)

**Goal:** a caller's leaf version travels **one step upward** along the ancestor chain, subject to that ancestor's review score. Auto-cascade through scopes with `required_approval_score = 0` until the first level that requires a review. Handles the amend rule (§6.5) and the multi-caller conflict rule (§6.7).

**Deliverables:**

1. `server/persistence/promote.js` — `promote({ callerLeafId, docPath, expectedVersion, callerPersonRef })`. Implements §4.4 exactly: super-sede own prior pending, walk ancestors, insert `committed` on each with threshold 0, insert `pending` on the first level that needs review.
2. `server/persistence/approve.js` (or reuse `promote.js`) — `approve({ pendingScopeId, docPath, version, voter })`, `reject({ ..., reason })`. Score-snapshotting, conflict-rule enforcement per §4.5.
3. Routes:
   - `POST /database/scopes/:scopeId/promote` — body `{ path, version }`
   - `GET  /database/scopes/:scopeId/pending`
   - `POST /database/scopes/:scopeId/approve` — body `{ path, version }`
   - `POST /database/scopes/:scopeId/reject` — body `{ path, version, reason? }`
4. Extended admin routes needed by real quorum configuration:
   - `POST   /database/scopes/:scopeId/reviewers`, `DELETE .../reviewers/:personRef`
   - `POST   /database/scopes/:scopeId/admins`, `DELETE .../admins/:personRef`
   - `PUT    /database/scopes/:scopeId/required-approval-score`
5. Reviewer-side rights enforcement: only reviewers of the target scope may `approve` / `reject`. Only admins may edit scope config.
6. Auto-blob-copy on successful commit (target inherits blobs from the source leaf version, analog to §6.14).
7. `is_deletion`-carrying promotions: when a `delete(doc)` was submitted as a pending row and later approved, the row transitions to `status = 'deleted'` and applies the cascading-cleanup rule (§6.9) when appropriate.

**Tests for M2a:**

- `promote-single-reviewer.test.js` — one reviewer, score 5, threshold 5 → single approve promotes.
- `promote-multi-reviewer.test.js` — 2+2+... paths reaching threshold.
- `promote-conflict.test.js` — two callers, same path; the winner's approve auto-rejects the others.
- `promote-amend.test.js` — same caller re-promotes; older pending auto-rejects.
- `promote-auto-approve-cascade.test.js` — chain of `required_approval_score = 0` scopes → commits all the way.
- `promote-single-reject.test.js` — one reject ends the request finally.
- `promote-blobs.test.js` — after successful promote, blobs are present on target.
- `promote-delete.test.js` — delete promoted → tombstone on target scope (with cascade behavior at root).

#### M2b — Distribute (horizontal)

**Goal:** one call, N target scopes; each target decided independently by its state. Per-target status matrix per §4.14.

**Deliverables:**

1. `server/persistence/distribute.js` — `distribute({ callerLeafId, docPath, expectedVersion, callerPersonRef, targetScopeIds })`. Membership check for each target; per-target `committed` vs `pending` decision per §4.14; blob-auto-copy per target; single transaction, all-or-nothing on hard failures (membership, source-not-found, source-outdated).
2. Route:
   - `POST /database/scopes/:scopeId/distribute` — body `{ path, version, targetScopeIds: [n, ...] }`
   - Response: `{ distributions: [ { targetScopeId, status, version|pendingVersion } ... ] }`.
3. Reuse M2a's `approve`/`reject` for the `pending` outcomes on distribute — the same pending rows are consumed by the same reviewer flow.

**Tests for M2b:**

- `distribute-basic.test.js` — three targets, no prior versions → three committed.
- `distribute-owned-updates.test.js` — target already has caller-authored active version → committed (update).
- `distribute-foreign-review.test.js` — target has different-author active version → pending, reviewer approves → committed.
- `distribute-mixed.test.js` — three targets, mixed outcomes in one response.
- `distribute-non-member.test.js` — any non-member target → 403 with the list of rejected targets, no writes anywhere.
- `distribute-blobs.test.js` — source blob copied into every target's created version.

**Definition of Done for M2:** all M2a + M2b tests pass; approve/reject cover both promotion and distribute-pending rows with the same code.

---

### Milestone 3 — Delete Workflow and Concurrency Hardening

**Goal:** the destructive workflow (delete via review) and cascading root delete. Revert is already implemented (M1.5 Sprint 1); optimistic concurrency is already implemented for `put`/`rename`/`publish`/`unpublish`. This milestone adds what is left: the delete promotion, the tombstone-vs-committed logic on approve, and the cascading cleanup query at root.

**Deliverables:**

1. `server/persistence/delete.js` — creates a pending row with `is_deletion = true` for `delete(doc)`. Fully reuses the same `pending`/`approve` machinery as M2a.
2. Approve logic (in M2a's `approve.js`) recognizes `is_deletion = true`:
   - Transitions to `status = 'deleted'` (tombstone) instead of `'committed'`.
   - If the target scope is the root (no ancestor with an active version above), also runs the cascading cleanup query (ARCHITECTURE.md §4.9) that physically removes all descendants' overrides.
3. Route:
   - `DELETE /database/scopes/:scopeId/delete` — body `{ path, version }` (fastify wildcard limit).
4. Optimistic concurrency check on `delete(doc)`: `expectedVersion` must match caller's current active leaf version.

**Tests for M3:**

- `delete-basic.test.js` — put → delete request → approve → doc is tombstone on target, walk-up returns 404.
- `delete-intermediate.test.js` — approve delete on class level → class members see nothing, higher-level members see the original.
- `delete-root-cascade.test.js` — approve delete on root → every descendant leaf's override for that path is physically gone.
- `delete-outdated.test.js` — stale `expectedVersion` → 409.

**Definition of Done for M3:** all M3 tests pass; the cascading cleanup query is exercised end-to-end.

---

### Milestone 4 — History, Hardening, Polish

**Goal:** version history queryable, isolation levels applied where needed, retry logic.

**Deliverables:**

1. `history` endpoint: `GET /database/scopes/:scopeId/docs/*/history` — returns the version history for a `(scope, path)` visible from this caller's scope (ancestor chain via `scope_closure`), including reviewer votes and any `public_id` / `unpublished_at` state.
2. Apply `SERIALIZABLE` isolation where ARCHITECTURE.md §5.1 mandates it. Retry loop with 10/50/200 ms backoff on `serialization_failure`.
3. Request-id per call, structured log line per mutation.

**Already done in earlier milestones (no action needed):**

- Structured error responses (`{ error: { code, message, details } }`) — implemented in `server/utils/errors.js`.
- 409 mapping for `outdated`, `conflict`, `not_publishable`, `already_published` — done.
- Health endpoint (`GET /database/health`) — done.

**Tests for M4:**

- `history-basic.test.js` — after N put/promote/publish cycles, history returns N ordered versions with correct status transitions and votes.
- `retry-serialization.test.js` — synthetic conflict to trigger retry; verify the mutation still completes.

**Definition of Done for M4:** all tests green; `database/scripts/smoke.sh` `curl`-based end-to-end sequence exists.

---

## Local Development Setup

1. **Postgres locally.** Docker Compose file at `database/docker-compose.dev.yml`:

   ```yaml
   services:
     postgres:
       image: postgres:14
       environment:
         POSTGRES_USER: docstore
         POSTGRES_PASSWORD: docstore
         POSTGRES_DB: docstore
       ports: ["5432:5432"]
       volumes: [ "./_pgdata:/var/lib/postgresql/data" ]
   ```

2. **Env override for local:** `settings.local.ini` (gitignored) with the local `PG_*` values.
3. **Boot:** `docker compose -f database/docker-compose.dev.yml up -d && node database/server/index.js`.

The docker-compose file is only for local development. Production reuses whatever PostgreSQL instance the ops setup provides.

---

## Test Strategy

- Framework: `node:test` (built into Node 20+) with `node --test`. Avoids adding a test runner dependency.
- Each test file spins up a **fresh schema** in the local postgres and runs migrations before its tests. Cleanup happens via `DROP SCHEMA docstore CASCADE`.
- No mocks for the DB — tests hit the real PostgreSQL. The whole point of the service is the SQL behavior.
- Auth is bypassed in tests by an env flag `DATABASE_TEST_MODE=1` that lets tests set `x-hash` in the request directly. Never active in production builds.
- Where a test needs multiple actors (promoter + reviewer + admin), they are simulated by different `x-hash` values in successive requests.

---

## Explicitly Out of Scope for the First Four Milestones

Listed here so we don't accidentally add them during implementation:

- Time-travel reads (`asOfVersion`, `asOf: timestamp`).
- `diff(vA, vB)` between versions.
- `restore(version)` — bring back an old version.
- Version pruning / snapshot compaction (§10 of ARCHITECTURE.md).
- Notifications on cascading cleanup.
- Schema validation of `data` blocks.
- Cross-scope references.
- Scope rename or move.
- Web UI. The service is REST-only.

---

## Decisions to Confirm Before / During Implementation

Small open points that we may hit as we build:

1. **Root scope name.** Resolved: declared as the top-level key in `init.json` (default `electra`). Applied by first-boot self-provisioning (§6.2). No env variable.
2. **Leaf label form.** With the closure-table model we do not need a distinct flag: the leaf is simply a `scopes` row with `parent_id = <group>` and `name = personRef`. Everything else follows from membership (visibility) and standard admin rules.
3. **`x-hash` uniqueness.** The gamification module already assumes it. We inherit that.
4. **`meta.lineage` on promoted versions.** ARCHITECTURE.md §6.11 (in the README) says the promoted target's `meta` records lineage. Concrete key: `meta.$db.promotedFrom = { scopeId, version }`. Reserving `$db` as the DB-managed sub-key of `meta` — sits alongside the `is_deletion` decision (M3).

---

## Branch & Commit Convention

- Branch: `feat/database-service`.
- Commits: `feat(database): <scope> - <what>` style, matching Electra's existing commit convention seen in recent commits.
- One PR per milestone against `main`. First milestone can be reviewed and merged before starting the next.
