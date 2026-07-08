# Hierarchical JSON Document Store

A generic persistence layer for JSON documents with hierarchical permissions and a review-based promotion workflow — conceptually a "hierarchical git for JSON".

This document describes the **functional model only**. No technology, framework, or library decisions — just behavior, permissions, and data flow.

---

## 1. Core Idea

To the caller, the DB behaves like a flat filesystem of JSON documents — but visibility and ownership are **hierarchical**.

A document provided by a higher level is automatically visible to everyone underneath. Any caller may locally override any inherited document without touching the higher version. They can then hand up their local version (**promote**) — reviewers on the next level examine it, and if accepted it becomes the new standard version for all members of that level.

## 2. Two Concepts: Scope and Path

The DB strictly separates two orthogonal dimensions:

| Dimension | Meaning | Example |
|-----------|---------|---------|
| **Scope** | *Who* may see a document / owns it. Position in the permission tree. | `school/class-8a` |
| **Path** | *Where* a document lives in the name space. Pure organizational tool. | `math/quadratic.json` |

A document is uniquely identified by the pair **(Scope, Path)**. Paths carry **no** permission information — all access decisions run through the scope.

**No folders.** Path is a plain string; `/` inside it is a naming convention with no semantic meaning to the DB. Just like git: a "folder" exists exactly as long as there is at least one document whose path starts with it. There is no operation to create an empty folder, and there is no folder to delete once the last document under a prefix is gone. Listing by path-prefix (`list("math/")`) is how the UI reconstructs a folder-like view.

## 3. Scopes

### 3.1 Hierarchy

Scopes form a tree. Every scope has exactly one parent (except the root); a scope can have any number of children.

```
acme                         school
acme/engineering             school/class-8a
acme/engineering/frontend    school/robotics-ag
```

### 3.2 Personal Leaf Scopes

Every person who is a member of a scope implicitly owns a **personal leaf** directly beneath it — private storage for their local overrides.

The leaf is an implementation detail. It is **never explicitly passed** by the caller — the DB resolves it from the authenticated user context. If Anna is a member of `school/class-8a`, her leaf `school/class-8a/anna` exists implicitly. When Anna writes into `school/class-8a`, the change lands internally in her leaf. From the API's point of view she operates in `school/class-8a`.

### 3.3 Multi-Membership and Explicit Context

A person may be a member of any number of scopes, including different branches of the tree. Because two branches may hold different views of the same path, **every API call must name its scope explicitly**. There is no implicit "current scope".

### 3.4 Canonical Bootstrap Structure

The DB is self-provisioning on **first boot**. When the database has no root scope yet, the boot sequence reads `database/init.json` and creates every scope declared in the tree. On any later boot the module is a no-op — runtime state is not modified.

`init.json` uses a compact tree shape: **the property name is the scope name**, and reserved keys carry scope metadata. Two reserved keys are recognized:

- `admins` — list of email addresses. Each is hashed (`SHA-256(email)`) and inserted as admin + top reviewer (score 10) of that scope. The root **must** declare at least one admin, or the server fails to start on first boot.
- `requiredApprovalScore` — optional, default `0`.

Every other property under a scope is another scope with the same shape recursively.

Example (matches the default):

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

Meaning:

- **`electra`** is the root scope; the listed email becomes the initial root admin.
- **`electra/users`** holds one child scope per human user. A user's own material (drafts, private projects, personal notes) lives inside their own scope, independent of any app/class context.
- **`electra/apps/<app>`** holds domain-specific content. Sub-scopes below (e.g. `apps/brains/klasse8a`) are created by admins later via the API as classes and workgroups are onboarded. If an app is not intended for a group, simply no sub-scope is created there — access is structurally denied.

After the first boot, all changes go through the runtime API. Editing `init.json` later has no effect on an already-bootstrapped DB.

## 4. Roles

Each scope carries two **orthogonal** roles:

- **Admin** — structural manager. Creates/removes sub-scopes, manages memberships, appoints reviewers and their scores, configures `required_approval_score`, appoints admins in sub-scopes. Has **no** content rights unless also registered as reviewer.
- **Reviewer** — content examiner. Sees open promotions, casts `approve`/`reject`, carries a numeric score (§5). Has **no** admin rights.

Both roles may overlap in the same person but are conceptually strict separate. Both are **strict per scope** — an admin/reviewer row on a descendant scope does **not** grant admin/reviewer rights on the ancestor.

**Admin appointment:** the admin of a scope may promote members of its sub-scopes to be admins **of those sub-scopes**. No self-appointment across scopes.

### 4.1 Membership is transitive upward

Membership works differently from the two roles above: **it is transitive through the scope tree.**

Precisely: a person is a member of scope `S` if they own an explicit membership row on `S` itself or on **any of their own descendant scopes**. In practice the DB stores exactly one row per person — on their personal leaf `S/<personRef>` deep in the tree — and derives ancestor membership via `scope_closure`.

Consequences:

- **Walk-up reads and writes come for free at any ancestor.** If Anna has a leaf under `apps/brains/klasse8a`, she is automatically a member of `apps/brains`, `apps`, and the root — she can read those scopes and write into her leaf's ancestor chain.
- **Foreign leafs remain invisible.** Anna's membership only counts *her* descendants. Bob's leaf under the same class is not part of Anna's tree, so it grants her nothing and she cannot see it.
- **Sibling and unrelated branches are inaccessible.** A leaf under `klasse8a` does not confer membership in `klasse9b` or `apps/shapes` — those are not ancestors.

The two role concepts (admin, reviewer) do **not** inherit this way. Explicit role rows on a scope stay strictly on that scope.

## 5. Score-Based Quorum

Each scope defines a **`required_approval_score`** — the minimum sum of reviewer scores a promotion into this scope must gather to be accepted. Each reviewer has an individual **score** (typically 0–10) expressing the weight of their vote.

Example:

```
Scope: school/class-8a
  required_approval_score: 5
  reviewers:
    - teacher_meier    score: 5
    - assistant_klaus  score: 2
    - assistant_lisa   score: 2
```

A promote is accepted as soon as the sum of approver scores ≥ 5. Meier alone suffices; Klaus + Lisa + one more suffices; etc.

### 5.1 Edge Cases

| Configuration | Behavior |
|---------------|----------|
| `required_approval_score = 0` | Auto-approve. Promotions accepted without review. |
| `required_approval_score > 0`, no reviewer with `score > 0` | Structurally unreachable. Configuration error — the DB should warn. |
| Reviewer with `score = 0` | May vote; their approve counts 0 but appears in the audit list. Their `reject` still applies (§6.6). Useful for "observers". |

### 5.2 Score Snapshot

The reviewer's score **at the moment they cast their vote** is persisted and counted. Later score changes made by an admin have **no** effect on votes already cast.

## 6. Document Lifecycle

### 6.1 Document Structure

A document as **written by the caller** carries two freely usable blocks:

```json
{
  "meta": { /* free — tags, owner, schema version, ... */ },
  "data": { /* the actual payload */ }
}
```

Both blocks are opaque to the DB. `meta` is a conventional separation so queries and filters can target it without touching payload content.

A document as **returned by a read** additionally carries DB-managed fields describing where and when this version came from:

```json
{
  "meta":    { ... },
  "data":    { ... },
  "scope":   "school/class-8a",        // origin scope (§6.2)
  "path":    "math/quadratic.json",    // path within the scope
  "version": 42,                       // version ID within (scope, path) (§6.11)
  "status":  "committed",              // committed | deleted (never pending on a read)
  "author":  "<person-ref>",           // who created this version
  "createdAt": "2026-06-15T09:12:44Z"
}
```

DB-managed fields are **read-only**. Writes ignore them if supplied. The caller's `meta`/`data` are stored verbatim; the DB never modifies them.

### 6.2 Lookup (Read)

When a caller in scope `S` requests path `P`, the DB performs a **walk-up**:

1. Check `(S/leaf_of_caller, P)` → return if found.
2. Otherwise: `(S, P)` → return if found.
3. Otherwise: parent scope → return if found.
4. Repeat up to the root. If nothing is found: `not found`.

A successful read returns the full document shape defined in §6.1 — including the DB-managed fields `scope`, `path`, `version`, `status`, `author`, `createdAt`. The origin `scope` in particular lets the caller (or a UI) tell "my own local version" vs. "inherited from a higher level".

A tombstone (`status = deleted`) is **not** returned as a hit — it terminates the walk-up as if the document did not exist. Tombstones are only visible via `scope.history(path)` (§9).

### 6.3 Listing

`scope.list(pathPrefix?)` returns the caller's **effective view**: every path they would see in this context, each annotated with its origin scope. Duplicates across levels are deduplicated — nearest visible version wins. Without an argument, the entire effective view is returned; with a path prefix, results are filtered to entries under that prefix.

### 6.4 Writing (Local Override)

**Every caller who can see a document can write it.** Writes are never denied. `scope.put(doc)` places a new version in the caller's personal leaf; other members of `S` continue to see the higher version unchanged. Because writes are confined to the writer's own leaf, no other member is impacted — what is privileged is not the write, but the **promote** (§6.5).

`put` takes a full doc object (as returned by `get`) with the caller's changes applied to `data`/`meta`. The DB-managed fields on the passed doc are used for **optimistic concurrency** — see §6.12. On success `put` returns the newly written doc (with the new `version`, `createdAt`, `author`).

Creating a brand-new document (no prior version anywhere in the walk-up) is done by passing a doc without `scope`/`version` — the DB then treats it as version 1 in the caller's leaf.

Every write creates a **new version** (§6.11) — never an in-place overwrite.

### 6.5 Promotion (Request for Approval — vertical)

`scope.promote(doc)` offers the caller's currently active leaf version to the **next level upward** along the ancestor chain. It is the **vertical** delivery: exactly one target, chosen by the tree structure, with automatic cascade through scopes whose `required_approval_score = 0`.

For the **horizontal** case ("deliver this doc to N target scopes I have chosen"), see §6.16 Distribute. Promote and Distribute are two different operations that must not be confused.

The `doc` must be the caller's current active version in their leaf — see §6.12 for the concurrency check. Older leaf versions cannot be promoted; they are historical.

**One promotion per (caller, path) at a time.** If the caller already has an open promotion for the same path, calling `promote(doc)` again supersedes it: the previous promotion is finalized as `rejected` (with a reason indicating it was superseded by a newer promotion from the same caller), and a fresh one is created from the passed doc. This is how the caller "amends" or "nachreicht": simply `put` a new leaf version and `promote` again.

Note: this is different from §6.7 which resolves conflicts **between different callers**. Here it resolves the trivial conflict of a **single caller** re-promoting the same path.

If the level directly above has `required_approval_score = 0`, the version is auto-accepted there and the promote continues toward the root, level by level, as long as `required_approval_score = 0` holds. It halts on the first level that actually requires a review.

`promote` returns the resulting **pending doc** (a full doc shape with `status: "pending"`). Reviewers retrieve pending docs via `scope.pendingPromotions()` and act on them with `approve(doc)` / `reject(doc, reason)` (§9).

### 6.6 Approval Behavior

- **Approve** — the vote is recorded with the reviewer's score snapshot. Once the sum reaches `required_approval_score`, the version is **committed** on that level and becomes its new active version.
- **Reject** — a **single** `reject` ends the request immediately and finally. The original caller can start a new promote with a new version at any time.

### 6.7 Conflict Resolution (Parallel Promotions)

Multiple open promotions per `(Scope, Path)` from different callers may coexist. The moment one is committed:

- It becomes the new active version.
- **All other open promotions for the same (Scope, Path)** are automatically `rejected`. The affected callers must — if their changes are still relevant — start a new promote based on the new version.

### 6.8 Cleanup After Successful Promotion

When the caller's local version is lifted upward, their now-identical local copy is **automatically dropped** (marked so it no longer resolves in the walk-up — see §7 on how this is realized). Transparent to the caller: they see the same document, just from a higher origin scope. Only a subsequent modification creates a new local version.

### 6.9 Delete

A caller may mark any visible document as **deleted** via `scope.delete(doc)`. A delete travels the same promote path as a content update: it starts as `pending` and, when approved, transitions to the terminal status `deleted` — no flag, no distinction at the row level; the status itself carries the meaning. Concurrency rules (§6.12) apply — the passed doc must reflect the current active version.

- **Local (unpromoted):** the document disappears from the caller's view. Others are unaffected.
- **Committed as `deleted` on an intermediate level:** a **tombstone** on that level shadows higher versions. Every member of the level sees the document as gone. Higher levels remain untouched.
- **Committed as `deleted` on the root:** the tombstone reaches the level where the document originally lived. Nobody could still see the old version.

#### Cascading Cleanup on Root Delete

When a delete is committed at the root of the scope tree (or at a level with no higher version anymore), **all remaining overrides and versions of this path across all sub-scopes are physically removed**. All references are gone. This is the **only** exception to the append-only history rule (§7).

Optionally, deleted content may be retained in an archive area for audit/recovery. It is no longer served to active views.

### 6.10 Revert (Discard Local Overrides)

`scope.revert(doc)` **physically discards the caller's local state** for the given doc's path. Purely local — no review, no propagation, no tombstone. Concurrency rules (§6.12) apply: the passed doc must reflect the current active leaf version.

Effect (all in one transaction):

- **Every version** of this `(leaf, path)` is physically deleted from history — active, `outdated`, and any older `committed` rows. Not just the current one.
- Any `pending` promotion by this caller for the same path is deleted along with its votes.
- Any `public_id` on any of these versions goes with them — public URLs previously served by these versions **stop working** (§6.13).
- After revert, a subsequent read continues the walk-up (§6.2) and returns the inherited version again (or 404 if none).
- Idempotent: if the caller has no local override for the path, the call is a no-op.

Note: revert is the **only** append-only exception besides the cascading root-delete cleanup (§6.9). It is scoped to a single leaf and touches only that leaf's rows.

### 6.11 Versioning

Every write of a `(Scope, Path)` produces a new **version**. Version IDs are **monotonically increasing integers scoped to their (Scope, Path)** — each such pair carries its own independent counter.

```
(school,               math/quadratic.json)   →  v1, v2, v3, ...
(school/class-8a,      math/quadratic.json)   →  v1, v2, ...       ← independent
(school/class-8a/anna, math/quadratic.json)   →  v1, v2, ...       ← independent
```

Consequences:

- A promote does **not** transfer version IDs. If Anna's `v3` is committed on `class-8a`, it becomes `class-8a`'s next version (e.g. `v7`) — same content, new ID. The lineage (which leaf version was promoted) is recorded on the target version's `meta`.
- Version IDs express local ordering, not global identity.
- "Active version" is always **the highest committed version-ID** within a `(Scope, Path)` — a derived view, never a stored flag.

### 6.12 Optimistic Concurrency

Mutating operations that take a doc (`put`, `promote`, `delete`, `revert`) use **optimistic concurrency**: the passed doc's `(scope, path, version)` must match the currently active version the operation targets.

- For `put`, `promote`, `delete`: targets the caller's active leaf version for that path. If a fresher leaf version has been written in the meantime (e.g. from another browser tab of the same user), the operation fails with an `outdated` error and the caller must refetch.
- For `revert`: same check, unless there is no local override at all — then the call is a no-op (§6.10).
- For a brand-new document, `put` accepts a doc without `scope`/`version` and treats it as version 1.

Rationale: writes across different persons never conflict (§6.4). Concurrency conflicts arise only within a single person across sessions/tabs — this check prevents lost updates in that case.

### 6.13 Publish (Public Identifier)

A `committed` version in a caller's own leaf may be **published**: assigned a globally unique **public identifier** (`publicId`, a UUID) that lets anyone with the identifier read this exact version, without login and without scope membership.

Publishing is orthogonal to promotion. Publishing does not move a version up the scope tree; it exposes the version as-is under a stable, immutable reference.

**Who may publish.** Any caller who can see the document, i.e. every scope member. `publish(doc)` operates on the doc the walk-up returned. If that doc is not the caller's own leaf version (§6.4), the call fails with `409 not_publishable` — there is no private snapshot to expose. The caller must create a leaf version first (e.g. by making an edit, even a trivial one) and then publish. No automatic forking happens on the DB side.

**Immutability.** A published version cannot change. `put` always creates a new version (§6.11), so subsequent edits by the same author leave the published version untouched at the URL. If the author wants a new version to be public too, they publish it separately — it receives its own `publicId`. Old and new URLs coexist (§6.13.2).

**Unpublish (take-down).** `unpublish(doc)` sets `unpublishedAt` on the version. The `publicId` remains reserved (never reused) and public reads return `410 Gone`. Unpublish does not physically remove anything.

**Revert vs. Publish.** `revert` (§6.10) physically deletes leaf versions. If any of them were published, their `publicId` goes with them and the public URL returns `404 Not Found`. This is different from `unpublish`, which returns `410 Gone`. In short: `unpublish` is a considered take-down; `revert` is a full local discard.

#### 6.13.1 Read

```
GET /database/public/:publicId
```

Anonymous — no `x-role`, no `x-hash` needed. Returns the full doc shape (§6.1). Responds:

- `200 OK` — published, still active
- `410 Gone` — was published, then unpublished
- `404 Not Found` — never existed, or the underlying version was reverted

#### 6.13.2 Multiple Publications on the Same Path

Every publish attaches a `publicId` to a specific `(scope, path, version)`. Because versions are append-only per `(scope, path)`, an author can publish `v3`, later publish `v5` — both remain online with distinct `publicId`s. There is no "latest published" concept; each URL is stable and points to a fixed snapshot.

### 6.14 Blobs (Binary Attachments)

Documents may carry binary attachments alongside their JSON payload. Blobs are stored per version, identified by an application-chosen `key`, and served through the API. The DB treats blob content as opaque.

Multiple blobs per version are allowed (different `key`s). Typical convention in Electra: the key `preview` holds the visual preview (PNG for `brains` circuits, PNG/SVG for `shapes` elements, PDF for `sheets`).

**Auto-copy on new version.** When a caller writes a new version via `put(doc)`, the DB automatically copies the blobs of the previous **effective** version (walk-up-resolved) into the new leaf version. Practical effect:

- Anna opens `math/quadratic.json` — walk-up returns the class-level version with its `preview` blob.
- Anna edits, `put(doc)` — a new version v1 lands in Anna's leaf. Its `preview` blob is copied from the class-level version.
- Later, `put(doc)` again — v2 gets its blobs copied from Anna's own v1.

Blobs therefore track their document without the caller having to re-upload them for every edit.

**Explicit blob operations override the copy.** A caller can `PUT` a new blob on a key to replace what was auto-copied, or `DELETE` a blob to remove it from the version.

**Content-type allow-list.** The service enforces a configured whitelist of accepted `Content-Type` values (default: `image/png`, `image/gif`, `image/svg+xml`, `application/pdf`). Uploads with other types return `415 Unsupported Media Type`.

**Size limit.** 10 MB per upload. Exceeded uploads return `413 Payload Too Large`.

**Missing blob.** A `GET` for a key that does not exist on the resolved version returns `404 Not Found`. Blobs do not walk up independently of their document — if Anna has her own version but did not carry over a blob (or explicitly deleted it), the class-level blob is not served in its place.

**Revert cascades to blobs.** Since `revert` (§6.10) physically deletes the leaf's versions, all blobs on those versions go with them via `ON DELETE CASCADE`.

**API:**

```
PUT    /database/scopes/:scope/blobs/:key?path=X   — upload / replace a blob (raw body)
GET    /database/scopes/:scope/blobs/:key?path=X   — read a blob (member only)
DELETE /database/scopes/:scope/blobs/:key?path=X   — delete this blob on the caller's leaf
GET    /database/public/:publicId/blobs/:key       — read a blob of a public version (anonymous)
```

Uploads use the raw request body and pass the desired `Content-Type` in the request header; the server preserves it for later reads.

### 6.15 Rename

`scope.rename(doc, newPath)` moves a document from `doc.path` to `newPath` within the caller's own leaf. Not a review flow — writes and renames in one's own leaf are always immediate. Because there is no folder concept (§2), `newPath` can differ from `doc.path` in any way: a "file rename" (`old.json` → `new.json`), a "move" (`math/x.json` → `mathematik/x.json`), or both at once — all of these are the same operation. Renaming multiple documents at once ("folder rename") is intentionally not offered; if that operation is needed later, it will be designed separately.

- All local versions of `doc.path` in the caller's leaf are renamed to `newPath`. Blobs and votes follow the version rows automatically (schema uses `ON UPDATE CASCADE`).
- If any local version of `doc.path` is published, the `publicId` stays attached to the moved rows — public URLs remain valid; the `path` field they serve is now `newPath`.
- Any pending promotion by the caller for `doc.path` is automatically **rejected** with reason `renamed by author`.
- Optimistic concurrency (§6.12) applies: `doc` must match the caller's current active leaf version.
- **Conflict:** if the caller's leaf already has any version at `newPath`, returns `409 conflict` with a `usedPaths` field listing the collision. Nothing is moved.
- **No-op:** if `newPath == doc.path`, returns `200 { moved: 0 }`.
- **Not found:** if the caller has no local version at `doc.path`, returns `404`.
- Renaming onto a path that only exists on a higher scope (inherited but not in own leaf) is **allowed**. The renamed versions then shadow the inherited doc at `newPath` — a standard override.

**Name-check lookup.** UIs typically want to warn the user before submitting a rename that will conflict. `scope.hasPath(path)` (`GET /database/scopes/:scopeId/docs/exists?path=X`) returns whether a version at `path` exists in the caller's own leaf. It does not check higher scopes — the collision only exists at the leaf level.

### 6.16 Distribute (Horizontal Delivery to Multiple Scopes)

`distribute` and `promote` are **two different operations** and must not be confused:

|            | Promote (§6.5)                               | Distribute (§6.16)                              |
|------------|----------------------------------------------|-------------------------------------------------|
| Direction  | vertical — one step up the ancestor chain    | horizontal — to N target scopes chosen by author |
| Purpose    | "my change should become the new truth"      | "I make this available to these audiences"      |
| Targets    | exactly one (the next reviewing ancestor)    | many, freely picked from scopes I am member of  |
| Auto-cascade for `required_approval_score = 0` | yes                            | no — each target is evaluated independently     |

`scope.distribute(doc, targetScopeIds)` takes a doc from the caller's own leaf and creates one delivery per target scope. Each delivery is decided by that target's own rules and reviewers, independently.

**Who may distribute.** Every member of a target scope may distribute into it. No admin privilege required — but membership is checked per target.

**Path stays identical.** The `doc_path` is not changed by distribute. If Meier's source is `arbeitsblatt-1.pdf`, all recipient copies also live at `arbeitsblatt-1.pdf` in their respective target scopes. Renaming per target must be done separately after the fact.

**Per-target decision rules.** For each target scope the DB inspects its current state:

- **No active version at that path** → new entry is created as `committed` (direct commit).
- **Active version exists AND caller is the author of that active version** → new entry is created as `committed` (updating one's own work).
- **Active version exists AND caller is NOT the author** → new entry is created as `pending`. The target scope's reviewers decide via the standard approval flow (§6.6).

**Author.** The distributor is recorded as `author` on every created entry — even on entries that overwrite someone else's version after review. The previous author is preserved in the older `outdated` version.

**Idempotency.** The DB does **not** compare content. A repeated distribute with the same content produces new versions each time. History always reflects the fact that a distribute happened at that moment.

**Delete.** There is no batch-delete counterpart. If Meier wants to remove a distributed document from three scopes, he issues three independent `delete` operations, each subject to the target scope's normal delete flow (§6.9).

**Blobs.** Blobs of the source version are auto-copied into every created entry, exactly as in §6.14.

**Response shape.** Distribute returns one entry per target:

```json
{
  "distributions": [
    { "targetScopeId": 15, "status": "committed", "version": 3 },
    { "targetScopeId": 18, "status": "pending",   "pendingVersion": 12 },
    { "targetScopeId": 21, "status": "committed", "version": 8 }
  ]
}
```

**Publish vs. Distribute.** Publish (§6.13) is one version reachable via one URL for anyone. Distribute is N copies in N scopes, each with its own life cycle (independent history, independent reviews, independent public IDs if any are later attached).

## 7. Version History

Per `(Scope, Path)` the DB holds a strictly **append-only** history. Four status values are persisted:

| Status | Meaning |
|--------|---------|
| `pending` | Waiting for reviewer approvals. May exist multiple times in parallel. A pending entry may be either a content update or a delete request — the payload distinguishes them. |
| `rejected` | Terminal. Reached via reviewer `reject` or by the conflict rule (§6.7). Never becomes active. |
| `committed` | Accepted content version. If the highest committed/deleted version-ID for the `(Scope, Path)`, it is the active version; otherwise historical. |
| `deleted` | Accepted delete. Behaves as a **tombstone**: for lookups, treated as "not present" on this level, shadowing higher levels (§6.9). Just like `committed`, the entry with the highest version-ID wins over older `committed` entries. |

Derived (not stored):

- **active version** = the entry with the highest version-ID among `committed` **and** `deleted` for a `(Scope, Path)`. If it is `deleted`, the document is a tombstone on this level; otherwise its `data`/`meta` are what the walk-up returns.
- **outdated** = any `committed` or `deleted` entry that is not the current active one.

Every version additionally carries: author, creation time, and — for `pending`/`committed`/`deleted`/`rejected` — the list of reviewer votes with score snapshots. Reviewers who voted with `score = 0` appear in the list for audit purposes even though their vote contributed nothing.

The history is **strictly append-only for its content and identity fields**. State transitions (`pending → committed`, `pending → deleted`, `pending → rejected`) update the row's status; publish attaches `publicId`/`published_at`; unpublish sets `unpublished_at`; rename updates `doc_path` (with `ON UPDATE CASCADE` to blobs and votes). No prior version's `data`, `meta`, or `author` is ever changed.

Two operations physically remove history rows:

- **Cascading cleanup on root delete** (§6.9) — sweeps overrides in sub-scopes.
- **Revert** (§6.10) — the caller drops every one of their own leaf rows for a doc-path.

## 8. Rights Overview

| Action | Who is allowed |
|--------|----------------|
| Read a document (walk-up) | Every member of the scope (§4.1 — membership is transitive) |
| Locally override / delete a document | Every member — write is never denied, effect confined to caller's leaf |
| Revert own local override | Every member (own leaf only) |
| Rename own local doc | Every member (own leaf only) |
| Start a promote | Every member whose local version is to be promoted |
| Distribute to a target scope | Member of the target scope (§6.16 — no admin needed, review may apply) |
| Publish / unpublish own leaf version | Every member for their own committed leaf versions |
| Approve / reject a promote or distribute-pending | Reviewers of the target level (strictly per scope) |
| Create / remove sub-scopes | Admin of the parent scope (strictly per scope) |
| Manage memberships | Admin of the scope (strictly per scope) |
| Set reviewers & scores | Admin of the scope |
| Configure `required_approval_score` | Admin of the scope |
| Appoint admins in sub-scopes | Admin of the parent scope |

## 9. API Sketch

Concrete signatures are an implementation matter — the rough shape:

```
// Scope handle — mandatory, no implicit context
const scope = db.scope("school/class-8a")

// Read
scope.list()                                // effective view (§6.3)
scope.list("math/")                         // filtered by path prefix
scope.get("math/quadratic.json")            // walk-up; full doc shape (§6.1)
                                            //   → { data, meta, scope, path,
                                            //       version, status, author, createdAt }
                                            //   or: not found
scope.history("math/quadratic.json")        // all versions of this path visible from
                                            // here (across scopes hit by the walk-up),
                                            // each with full doc shape + reviewer votes

// Mutations — all take a doc; optimistic concurrency on (scope, path, version) (§6.12)
scope.put(doc)                              // → new doc with fresh version, or `outdated`
scope.delete(doc)                           // starts a delete promotion (§6.9)
                                            //   → pending doc, or `outdated`
scope.revert(doc)                           // physically drop all local versions (§6.10)
                                            //   → ok / no-op / `outdated`
scope.promote(doc)                          // vertical: one step upward (§6.5)
                                            //   → pending doc, or `outdated`
scope.distribute(doc, [scopeId, ...])       // horizontal: multiple target scopes (§6.16)
                                            //   → list of per-target results
scope.rename(doc, newPath)                  // rename in own leaf (§6.15)
scope.hasPath(path)                         // → { exists: bool } — for pre-rename UX

// Publish — orthogonal to promotion (§6.13)
scope.publish(doc)                          // → doc with { publicId, publishedAt }
                                            //   409 if doc is not the caller's own leaf version
scope.unpublish(doc)                        // → 200; publicId stays reserved, reads return 410

// Blobs — binary attachments per version (§6.14)
scope.putBlob(doc, key, buffer, contentType)
scope.getBlob(doc, key)                     // → { buffer, contentType }
scope.deleteBlob(doc, key)

// Reviewer side — same doc-based shape
scope.pendingPromotions()                   // → [ pending doc, ... ]
                                            //   each: full doc shape with
                                            //     status: "pending", plus votes[]
scope.approve(doc)                          // approve this pending doc
scope.reject(doc, reason)                   // reason: free-text, optional

// Admin — structure
scope.createScope(name, { requiredApprovalScore })  // returns handle to the new scope
scope.removeScope(name)

// Admin — membership & roles
scope.addMember(personRef)
scope.removeMember(personRef)
scope.addAdmin(personRef)                   // grant admin on THIS scope
scope.removeAdmin(personRef)                // revoke admin on THIS scope
scope.addReviewer(personRef, score)         // add / update reviewer score (0..10)
                                            //   score = 0 → observer: may vote and
                                            //   appears in audit list, but contributes 0
scope.removeReviewer(personRef)             // revoke reviewer role
scope.setRequiredApprovalScore(n)
```

`personRef` is an opaque reference to a person (whatever the surrounding auth system provides — e.g. an email hash). The DB treats it as an identifier only.

A pending doc is identified end-to-end by its `(scope, path, version)` triple — the same shape used everywhere else in the API. `approve` / `reject` operate on a pending doc as returned by `pendingPromotions()`. If the same pending entry has already been finalized (approved, rejected, or superseded by the conflict rule §6.7 / the amend rule §6.5), the call fails with an `outdated` error.

**Creating a new document:** pass a doc without `scope`/`version` to `put`. The DB stores it as version 1 in the caller's leaf.

**Typical read-modify-write flow:**

```
const doc = scope.get("math/quadratic.json")
doc.data.foo = "bar"
const updated = scope.put(doc)              // new version in caller's leaf
scope.promote(updated)                      // hand it upward for review
```


## 10. Out of Scope / Deliberately Outside the DB

The following topics are conceivable at the functional level but do **not** belong to the DB — they live in the application logic on top of it:

- **Automatic score adjustments** (e.g. "10 successful votes → score 0→1"): pure business logic. The DB only provides the audit log; the rule sits above it.
- **Notifications** to owners after cascading cleanup or distribute-driven overwrites: responsibility of the app on top.
- **Schema validation** of the `data` block: the DB treats `data` as opaque JSON. A schema layer sits conceptually on top.
- **Access control beyond roles** (attribute-based, temporary, path-granular): explicitly not part of this model. Visibility is defined solely by scope membership.
- **Cross-scope references / foreign keys** between documents from different branches: not part of this model.
- **Batch operations that span scopes** — e.g. "delete this doc from all my scopes at once", "rename a folder across sub-scopes". Not offered. If needed, may be designed later; each such operation would introduce new semantics.
- **Content-based idempotency** on distribute or put: the DB does not compare payloads and does not deduplicate.

## 11. Glossary

| Term | Meaning |
|------|---------|
| **Scope** | Node in the permission hierarchy — company, department, class, club, personal leaf. |
| **Path** | Organizational path of a document within a scope. Pure structure, no permission. |
| **Leaf** | Personal scope of a member beneath a scope. Storage for local overrides. |
| **Override** | Local version stored in a leaf, shadowing a higher version. |
| **Walk-up** | Read-side resolution algorithm: traverse the scope hierarchy from the caller's leaf upward, return the first hit. |
| **Promote** | Vertical: submit a local version to the level above for review (§6.5). |
| **Distribute** | Horizontal: submit a local version to multiple target scopes at once, each evaluated independently (§6.16). |
| **Revert** | Physically drop all of one's own leaf versions for a doc-path (§6.10). |
| **Publish** | Attach a stable `publicId` to a leaf version, exposing it via an anonymous URL (§6.13). |
| **Unpublish** | Set a published version's `unpublished_at`; the `publicId` stays reserved but reads return `410 Gone`. |
| **Approval Score** | Numeric weight of a reviewer's vote. |
| **Required Approval Score** | Configured threshold of a scope; sum of approver scores must reach it. |
| **Tombstone** | Entry with status `deleted`. Shadows higher versions like an override. |
| **Active version** | The highest-version-ID entry (`committed` or `deleted`) for a `(Scope, Path)`. Derived, not stored. |
