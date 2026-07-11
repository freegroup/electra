# Hierarchical JSON Document Store

A generic persistence layer for JSON documents with hierarchical permissions and a review-based promotion workflow — conceptually a "hierarchical git for JSON".

This document describes the **functional model only**: behavior, permissions, and data flow. No technology, framework, or library decisions.

---

## 1. Core Idea

To the caller, the store behaves like a flat filesystem of JSON documents — but visibility and ownership are **hierarchical**.

- A document provided at a higher level is automatically visible to everyone below it.
- Any member may **locally override** an inherited document. The override is private and immediate — it changes only what that one person sees. Nobody else is affected.
- A member may **promote** their local version upward. Reviewers on the target level examine it, and once accepted it becomes the new shared version for everyone on that level.

Writing is always allowed and never reviewed. What is governed by review is *promotion* — making your version the shared truth for a group.

## 2. Scope and Path

The store separates two orthogonal dimensions:

| Dimension | Meaning | Example |
|-----------|---------|---------|
| **Scope** | *Who* may see and own a document. A node in the permission tree. | `school/class-8a` |
| **Path**  | *Where* a document sits in the name space. Pure organization, no permission. | `math/quadratic.json` |

A document is identified by the pair **(Scope, Path)**. All access decisions run through the scope; the path never grants or restricts anything.

Scope and path look alike (both are `/`-separated strings) but are unrelated: the scope is chosen from the permission tree, the path is a free label. A UI should present them very differently — the scope as "which group", the path as "which file" — so users never confuse the two.

**No folders.** A path is a plain string; the `/` inside it is only a naming convention. Like git, a "folder" exists exactly as long as some document's path starts with it. There is no way to create an empty folder and nothing to delete once the last document under a prefix is gone. Listing by path prefix (`list("math/")`) is how a UI reconstructs a folder view.

## 3. Scopes and Membership

### 3.1 The Scope Tree

Scopes form a tree. Every scope has exactly one parent (except the root) and any number of children. A class, a workgroup, a whole school, a personal area — all are just scopes; the store gives none of them special treatment.

```
electra                      school
electra/users/anna           school/class-8a
electra/apps/brains          school/class-8a/robotics-ag
```

### 3.2 Membership

A person has an **explicit membership** at a scope when they belong to it directly. This is stored as one row on their **personal leaf** under that scope (see 3.3). A person may be an explicit member of several scopes, including scopes in different branches.

Membership grants two different things:

- **Read is transitive upward.** A member of a scope can read that scope and every ancestor up to the root. If Anna is a member of `school/class-8a`, she automatically reads `school` and the root too.
- **Write requires explicit membership.** A person can write (override, create, promote from) only at scopes where they are an explicit member. Transitive read access to an ancestor does **not** allow writing there.

Consequences:

- **Foreign leaves are invisible.** Anna sees her own overrides, never another member's. Bob's leaf under the same class grants Anna nothing and is not visible to her.
- **Sibling and unrelated branches are inaccessible.** Membership in `class-8a` says nothing about `class-9b` or `apps/shapes`.
- **A student cannot write at the school level.** A student who is only a member of their class reads school-wide documents but cannot store anything at the school scope. Any edit they make lands in their class leaf, and reaches the school only by being promoted up through the class — which the class's reviewers decide. This is the natural chain, not extra bureaucracy.

### 3.3 Personal Leaves

Each explicit membership comes with a **personal leaf** — a private area directly under that scope (`school/class-8a/anna`) that holds the member's local overrides for that scope.

The leaf is an internal detail. The caller never names it: the store derives it from the authenticated user. From the API's point of view, Anna operates *in* `school/class-8a`, and her overrides quietly land in her leaf beneath it. A leaf materializes on first write and disappears again when it becomes empty.

### 3.4 Operating Scope

Because a person may be a member of several scopes, and different branches may hold different versions of the same path, **every call names its scope explicitly.** There is no implicit "current scope". This chosen scope is the **operating scope** of the call.

Where it comes from depends on the operation:

- **Editing an existing document** — the operating scope is *not* chosen when saving. It is fixed by the context in which the document was opened. Open `math/x.json` while operating in `class-8a`, and the edit lands in your `class-8a` leaf; open the same path while operating in `school`, and it lands in your `school` leaf. Saving is never a scope decision — you save back to where you opened.
- **Creating a new document** — the operating scope *is* a deliberate choice: "which group is this for?" You pick it from the scopes you are an explicit member of. `myScopes()` returns exactly that list, so a UI can offer it at creation time.

Moving a document to a *different* group is never a side effect of saving. It is an explicit action — **promote** (upward) or **distribute** (sideways), described in section 6.

### 3.5 Bootstrap

The store is self-provisioning on **first boot** only. When there is no root scope yet, it reads `database/init.json` and creates the whole declared tree. On every later boot it does nothing — runtime state is never touched, and editing `init.json` afterward has no effect.

`init.json` uses a compact shape: **the property name is the scope name**, and two reserved keys carry metadata:

- `admins` — email addresses. Each is hashed and inserted as admin and top reviewer (score 10) of that scope. The root **must** declare at least one admin, or the server refuses to start on first boot.
- `requiredApprovalScore` — optional, default `0`.

Every other property is a child scope with the same shape.

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

- **`electra`** — the root scope; the listed email is the initial root admin.
- **`electra/users`** — one child scope per person, for material that belongs to the individual regardless of any class or app.
- **`electra/apps/<app>`** — domain content. Sub-scopes below (e.g. `apps/brains/class-8a`) are created later through the API as groups are onboarded. Where no sub-scope exists, access is structurally impossible.

### 3.6 Anonymous Readers and the Public Root

Callers may or may not be logged in, so the store defines one built-in principal:

- **Anonymous** — a caller without a login. It reads only, owns no leaf, and can never write. Because writing requires explicit membership and anonymous has none, "no write access" is structural, not a special rule.

**The root scope is world-readable.** Its shared documents are visible to everyone — logged-in members already read the root transitively, and anonymous callers get exactly the same read and nothing more. Every other scope stays private to its members. Anonymous can therefore operate only at the root and only for reads; its walk-up is trivial (no leaf, just the root's shared version).

**"Making something public" means promoting it to the root.** Writing at the root requires root membership, so ordinary users cannot drop content there directly — their document travels the normal promote chain upward, reviewed at each level, until it reaches the root. The public zone is gated by review, not open posting.

This is distinct from **publish** (6.13): the public root is a browsable shared zone for anyone; publish exposes one specific version of *any* scope under a stable link. Both serve anonymous readers, by different means.

## 4. Roles

Beyond membership, a scope carries two **orthogonal** roles. Unlike membership, roles do **not** inherit in any direction — a role row applies strictly to the one scope it sits on.

- **Admin** — structural manager. Creates and removes sub-scopes, manages memberships, appoints reviewers and their scores, sets the required approval score, and appoints admins in sub-scopes. An admin has **no** content rights unless also a reviewer.
- **Reviewer** — content examiner. Sees open promotions, casts approve/reject, and carries a numeric score. A reviewer has **no** admin rights.

The same person may hold both roles, but they remain conceptually separate. An admin or reviewer of a sub-scope does not gain that role on the parent, and vice versa.

An admin may appoint members of a sub-scope as admins **of that sub-scope**. There is no self-appointment across scopes.

## 5. Score-Based Quorum

Each scope defines a **required approval score** — the minimum sum of reviewer scores a promotion into that scope must gather to be accepted. Each reviewer carries an individual **score** (typically 0–10) expressing the weight of their vote.

```
Scope: school/class-8a
  requiredApprovalScore: 5
  reviewers:
    teacher_meier    score 5
    assistant_klaus  score 2
    assistant_lisa   score 2
```

A promotion is accepted as soon as the approving scores sum to at least 5 — Meier alone suffices, or Klaus + Lisa + one more, and so on.

| Configuration | Behavior |
|---------------|----------|
| `requiredApprovalScore = 0` | Auto-approve. Promotions are accepted without review. |
| `requiredApprovalScore > 0`, but no reviewer has `score > 0` | Unreachable — a configuration error the store should warn about. |
| Reviewer with `score = 0` | May vote; an approve counts 0 but is logged, a reject still ends the request. Useful for observers. |

**Score snapshot.** The reviewer's score *at the moment they vote* is recorded and counted. Later changes to that reviewer's score do not affect votes already cast.

## 6. Document Lifecycle

### 6.1 Document Shape

A document **written by the caller** carries two free-form blocks, both opaque to the store:

```json
{
  "meta": { "tags": [], "schemaVersion": 1 },
  "data": { }
}
```

`meta` is a conventional place for filterable attributes; `data` is the payload. The store stores both verbatim and never modifies them.

A document **returned by a read** adds store-managed, read-only fields:

```json
{
  "meta":      { },
  "data":      { },
  "scope":     "school/class-8a",     // origin scope: where this version was found
  "path":      "math/quadratic.json",
  "version":   42,                    // version id within (scope, path)
  "status":    "committed",           // committed | deleted
  "author":    "<person-ref>",
  "createdAt": "2026-06-15T09:12:44Z"
}
```

Writes ignore these fields if supplied. The origin `scope` in particular lets a caller tell "my own local version" apart from "inherited from a higher level".

### 6.2 Reading (Walk-Up)

A read starts at the operating scope and walks up to the root. **At every level it checks the caller's own leaf first, then the shared version at that level**, and returns the first hit:

```
for each level L from the operating scope up to the root:
    if (L/<caller>, path) exists   → return it      # my override at this level
    if (L, path) exists            → return it      # the shared version here
→ not found
```

Because the caller's leaf is consulted at *every* level — not just the one they are operating in — an override propagates downward. If Anna patches a stencil while operating in `class-8a`, that patch appears in every context of hers that passes through `class-8a` (the class itself and each workgroup beneath it), until a promoted version replaces it. Other members are unaffected: the walk-up only ever inspects the caller's own leaves, never anyone else's.

A read returns the full document shape from 6.1. A tombstone (a committed delete) is **not** a hit — it ends the walk-up as if nothing existed there, shadowing any higher version.

An **anonymous** caller (3.6) operates only at the root: with no leaf and no membership, its walk-up reduces to the root's own shared version.

### 6.3 Listing

`list(pathPrefix?)` returns the caller's **effective view** for one operating scope: every path visible from there, each annotated with its origin scope, deduplicated so the nearest version wins. With a prefix, only paths under it are returned.

A `list` always covers exactly **one operating scope** — one branch, walked upward. It never spans branches, and there is no "highest role" that merges everything: listing from near the root would only surface the generic shared versions and drop your class- and group-level work.

To show "everything across all my groups", a UI calls `myScopes()` and issues one `list` per scope, grouping the results by scope. That aggregation lives in the application, not in a single store call.

### 6.4 Writing (Local Override)

**Every member who can see a document may write it, and writes are never denied.** `put(doc)` stores a new version in the caller's leaf under the operating scope. Other members keep seeing the shared version unchanged, because the write is confined to the writer's own leaf. The privileged step is not the write but the promote.

`put` takes a full document (as returned by a read) with changes applied to `data`/`meta`. Its store-managed fields drive optimistic concurrency (6.12). On success it returns the newly written document with its fresh `version`, `createdAt`, and `author`. Every write creates a new version — never an in-place overwrite.

To create a brand-new document, pass a document without `scope`/`version`; the store treats it as version 1 in the caller's leaf under the operating scope.

### 6.5 Promote — Vertical Delivery

`promote(doc)` offers the caller's active leaf version to the **next level up** the ancestor chain. Exactly one target, chosen by the tree. If that level's required approval score is 0, the version is accepted immediately and the promote continues upward, level by level, until it reaches a level that actually requires review.

The document must be the caller's current active leaf version; older versions are historical and cannot be promoted.

**One open promotion per (caller, path).** Promoting again while one is still open supersedes the first: the earlier one is finalized as rejected ("superseded by a newer version from the same author") and a fresh one is created. This is how a caller amends a submission — write a new leaf version, promote again.

A promote returns the resulting **pending** document. Reviewers find it through `pendingPromotions()` and act with `approve`/`reject`.

Promote is vertical and goes to a single ancestor. For sideways delivery to several groups you choose, use **distribute** (6.16) — a distinct operation.

**Promote ceiling.** A scope may be flagged as a **promote ceiling**: the highest level content can be promoted to. Promotion may land *on* a ceiling scope, but never rises above it — the auto-cascade through score-0 levels halts there, so no shared copies are created higher up. This bounds where a document can travel (e.g. mark an app scope so its files never leave the app, or seal an org-level scope). It constrains promotion only; **distribute is unaffected** (sideways delivery still works, subject to per-target membership).

### 6.6 Approval

- **Approve** — the vote is recorded with the reviewer's score snapshot. Once the approving scores reach the required approval score, the version is **committed** on that level and becomes its new shared version.
- **Reject** — a single reject ends the request immediately and finally. The author may start a new promote at any time.

**Self-approval is allowed.** If the promoting caller is also a reviewer of the target scope, their vote counts like any other. If their own score alone meets the threshold, the promotion commits in one step — a head teacher with score 10 on `school` can make their own document the school standard directly. Requiring a second pair of eyes is an application-level policy, not part of this model.

### 6.7 Parallel Promotions

Several callers may hold open promotions for the same (scope, path). The moment one commits, it becomes the shared version and **all other open promotions for that (scope, path) are automatically rejected.** Their authors start again from the new version if their change still applies.

### 6.8 After a Successful Promotion

Once the caller's version is committed to the target scope, their now-redundant local copy is **physically deleted** from their leaf. This is transparent: the next read falls through the empty leaf to the freshly committed version above, so the caller sees the same content — now with a higher origin scope, marking it as the group's standard. A later edit simply creates a new local version again.

**The author keeps full rights.** Promotion does not hand the document to the reviewer. The author is still a member and may override the committed version again at any time; the edit lands in their leaf and shadows the group version for them alone. To change it for everyone, they promote again and it is reviewed again. Nobody is locked out.

### 6.9 Delete

`delete(doc)` marks a visible document as deleted. A delete travels the same path as a content change: it starts as pending and, once approved, becomes the terminal status **deleted** — the status itself carries the meaning, with no separate flag.

- **Local (not yet promoted)** — the document vanishes from the caller's view only.
- **Committed as deleted on a level** — a **tombstone** on that level shadows every higher version. All members of that level see the document as gone; higher levels are untouched.

**Cascading cleanup at the root.** When a delete commits at the root (or at a level with no higher version left), all remaining overrides and versions of that path across every sub-scope are **physically removed**. Nothing is left to resolve. Deleted content may optionally be retained in an archive for recovery, but is never served to active views.

### 6.10 Revert

`revert(doc)` **physically discards the caller's local state** for a path — purely local, no review, no tombstone, affecting only that one leaf. In a single transaction it:

- deletes **every** version of that path in the caller's leaf — active and historical alike;
- deletes any open promotion by the caller for that path, with its votes;
- drops any public identifier attached to those versions, so their public URLs stop working (return `404`).

Afterward a read falls back to the inherited version (or "not found"). Revert is idempotent: with no local override, it does nothing.

### 6.11 Versioning

Every write of a (scope, path) produces a new version. Version ids are **integers counted independently per (scope, path)**:

```
(school,               math/quadratic.json)   →  v1, v2, v3, ...
(school/class-8a,      math/quadratic.json)   →  v1, v2, ...       (independent)
(school/class-8a/anna, math/quadratic.json)   →  v1, v2, ...       (independent)
```

- A promote does not carry version ids across. Anna's `v3` committed on `class-8a` becomes that scope's next id (say `v7`) — same content, new number. The lineage is recorded in the target version's `meta`.
- The **active version** of a (scope, path) is always the one with the highest id among committed/deleted entries — a derived view, never a stored flag.

### 6.12 Optimistic Concurrency

Mutating operations (`put`, `promote`, `delete`, `revert`) require the passed document's `(scope, path, version)` to match the version the operation targets — the caller's active leaf version. If a newer leaf version was written in the meantime (say from another tab), the call fails with `outdated` and the caller must refetch.

Different people never conflict, because each writes only in their own leaf. Conflicts arise only within a single person across sessions — this check prevents lost updates there. A brand-new document (no `scope`/`version`) skips the check and becomes version 1.

### 6.13 Publish

A committed version in the caller's own leaf may be **published**: assigned a globally unique `publicId` that lets anyone with the link read that exact version, without login or membership.

Publishing is orthogonal to promotion — it does not move the version anywhere; it exposes it as-is under a stable, immutable reference.

- **Who** — any member who owns the version. Publishing operates on the caller's own leaf version; if the read returned an inherited version instead, the call fails with `409 not_publishable` — make a local edit first, then publish.
- **Immutable** — a published version never changes, since every edit creates a new version. To publish a newer version, publish it separately; it gets its own `publicId`, and old and new links coexist.
- **Unpublish** — sets a take-down marker. The `publicId` stays reserved (never reused) and public reads return `410 Gone`. Nothing is physically removed.
- **Publish vs. revert** — unpublish is a deliberate take-down (`410 Gone`); revert physically deletes the version, so its link returns `404 Not Found`.

**Public read** (anonymous):

```
GET /database/public/:publicId          200 active · 410 unpublished · 404 never existed / reverted
```

### 6.14 Blobs (Binary Attachments)

A document may carry binary attachments alongside its JSON. Blobs are stored per version under an application-chosen `key` and are opaque to the store. Multiple keys per version are allowed; by convention the key `preview` holds a visual preview (PNG, SVG, or PDF depending on the app).

- **Auto-copy on new version** — when `put` writes a new version, the blobs of the previous effective version are copied into it, so attachments follow the document without re-uploading on every edit.
- **Explicit override** — uploading a blob on a key replaces the copied one; deleting a blob removes it from that version.
- **No independent walk-up** — a blob is served only if it exists on the resolved version. If the caller has their own version without a given blob, the higher-level blob is *not* substituted; the request returns `404`.
- **Limits** — a configurable content-type allow-list (default PNG, GIF, SVG, PDF; others `415`) and a 10 MB per-upload cap (`413`).
- **Revert** removes a leaf's versions and all their blobs with them.

```
PUT    /database/scopes/:scope/blobs/:key?path=X    upload / replace (raw body)
GET    /database/scopes/:scope/blobs/:key?path=X    read (member only)
DELETE /database/scopes/:scope/blobs/:key?path=X    delete on the caller's leaf
GET    /database/public/:publicId/blobs/:key        read a public version's blob (anonymous)
```

### 6.15 Rename

`rename(doc, newPath)` moves a document from its current path to `newPath` **within the caller's own leaf** — immediate, no review. With no folder concept, a "rename", a "move", or both at once are the same operation. Renaming several documents at once ("folder rename") is intentionally not offered.

- All the caller's leaf versions at the old path move to the new one; blobs and votes follow automatically.
- A published version keeps its `publicId`; the link stays valid and now serves the new path.
- Any open promotion for the old path is automatically rejected ("renamed by author").
- Optimistic concurrency applies.
- **Conflict** — if the caller's leaf already holds any version at `newPath`, nothing moves and the call returns `409` with the colliding path.
- Renaming onto a path that exists only at a higher scope is allowed: the moved versions simply shadow the inherited document there.

A `hasPath(path)` check lets a UI warn about a collision before submitting. It inspects only the caller's own leaf, since that is the only place a collision can occur.

### 6.16 Distribute — Horizontal Delivery

Distribute and promote are different operations:

|            | Promote                                   | Distribute                                        |
|------------|-------------------------------------------|---------------------------------------------------|
| Direction  | vertical — one step up the ancestor chain | horizontal — to N scopes the author chooses       |
| Purpose    | "my change should become the truth here"  | "make this available to these audiences"          |
| Targets    | exactly one (the next reviewing ancestor) | many, freely picked from scopes I am a member of  |
| Auto-cascade at score 0 | yes                          | no — each target is evaluated on its own          |

`distribute(doc, targetScopeIds)` takes one of the caller's own versions and creates one delivery per target scope, each decided by that scope's own rules:

- **No version there yet** → created as **committed** directly.
- **A version exists and the caller authored the active one** → created as **committed** (updating one's own work).
- **A version exists authored by someone else** → created as **pending** for that scope's reviewers.

This is the same mechanism that lets a teacher hand a worksheet back and forth between workgroups they belong to: distributing into a group they are a member of, decided by that group's rules each time.

- **Who** — any member of a target scope; membership is checked per target, no admin needed.
- **Path is unchanged** — every copy keeps the source path; rename per target afterward if needed.
- **Author** — the distributor is recorded as author on each created entry; the previous author survives in the older version.
- **No content comparison** — repeating a distribute always creates new versions; history reflects that a distribute happened.
- **Blobs** are auto-copied into every created entry.
- **No batch delete** — to remove a distributed document from several scopes, issue an independent delete in each.

```json
{
  "distributions": [
    { "targetScopeId": 15, "status": "committed", "version": 3 },
    { "targetScopeId": 18, "status": "pending",   "pendingVersion": 12 },
    { "targetScopeId": 21, "status": "committed", "version": 8 }
  ]
}
```

Publish exposes *one* version at *one* URL for anyone; distribute creates *N* copies in *N* scopes, each with its own independent life cycle.

## 7. Version History

Per (scope, path) the store keeps a strictly **append-only** history with four statuses:

| Status | Meaning |
|--------|---------|
| `pending`   | Awaiting reviewer approvals; several may coexist. May be a content change or a delete request — the payload distinguishes them. |
| `rejected`  | Terminal. Reached by a reject or by the parallel-promotion rule. Never becomes active. |
| `committed` | Accepted content. The highest committed/deleted id is the active version; older ones are historical. |
| `deleted`   | Accepted delete. Acts as a tombstone: treated as "not present", shadowing higher levels. Highest id wins, exactly like committed. |

Each version also records its author, creation time, and — for every terminal state — the reviewer votes with their score snapshots (score-0 votes appear for audit even though they count nothing).

The history never rewrites a version's content, author, or identity. Only status transitions, publish/unpublish markers, and rename (which updates the path) change an existing row. **Three operations physically remove rows**, and only these:

- **Promotion cleanup** — drops a caller's leaf rows for a path once it is committed above.
- **Cascading cleanup at the root** — sweeps all sub-scope overrides when a delete commits at the top.
- **Revert** — drops all of a caller's own leaf rows for a path.

## 8. Rights Overview

| Action | Who is allowed |
|--------|----------------|
| Read root content | Everyone, including anonymous (the root is world-readable) |
| Read a document | Every member (read is transitive upward) |
| Override / delete locally | Every member — never denied, effect confined to the caller's leaf |
| Revert / rename own local doc | Every member, own leaf only |
| Start a promote | Every member, for their own local version |
| Distribute into a scope | Every member of that target scope (review may apply) |
| Publish / unpublish | Every member, for their own committed leaf version |
| Approve / reject | Reviewers of the target scope |
| Create / remove sub-scopes | Admin of the parent scope |
| Manage memberships, reviewers, scores | Admin of the scope |
| Appoint admins in sub-scopes | Admin of the parent scope |

## 9. REST API

The store is reached over HTTP under the base path `/database`. This section is feature-complete: every operation in the model has an endpoint here.

### 9.1 Conventions

**Identifying a scope.** A scope *name* (`school/class-8a`) contains slashes and cannot be a clean URL segment, so every scope also has a stable, slash-free **`scopeRef`** — its identity in URLs. `GET /database/scopes/mine` returns the refs a caller may use, and a resolver turns a name into a ref. URLs therefore read `/database/scopes/{scopeRef}/...`, never the dotted name.

**Identifying a document.** The `path` may contain slashes too, so it travels as a query parameter: `?path=math/quadratic.json`. A document is identified end-to-end by the triple `(scopeRef, path, version)`.

**Operating scope.** The `{scopeRef}` in the URL *is* the operating scope of the call (section 3.4). There is no implicit context — every request states its scope.

**Optimistic concurrency.** Every mutating request carries the document it is based on (at least `{ path, version }`, normally the full doc from a read). If a fresher version exists, the request fails `409 outdated` and the caller refetches. A brand-new document omits `version`.

**Authentication.** Identity arrives in request headers set by the ingress (`x-hash` = the caller's `personRef`, `x-role`). A request without a resolvable identity is **anonymous** (section 3.6): it may read the root and fetch published content, nothing else. The store itself performs no login — it only maps headers to a `personRef`.

**Media type.** Documents are `application/json`. Blobs use their own content type on upload and download. Errors return a JSON body `{ "error": "<code>", ... }`.

### 9.2 Documents

```
GET    /database/scopes/{scopeRef}/docs?path=X        read (walk-up) → full doc, or 404
GET    /database/scopes/{scopeRef}/docs               list the effective view
                                                        ?prefix=math/   optional path filter
PUT    /database/scopes/{scopeRef}/docs?path=X        write a local override (body: doc)
                                                        create new: omit version; 409 outdated
DELETE /database/scopes/{scopeRef}/docs?path=X        start a delete (body: doc for concurrency)
GET    /database/scopes/{scopeRef}/docs/exists?path=X check own-leaf collision → { exists }
GET    /database/scopes/{scopeRef}/docs/history?path=X full version history with reviewer votes
```

`GET .../docs` (list) returns each visible path annotated with its origin scope, deduplicated to the nearest version. A UI that wants "everything across all my groups" calls `GET /scopes/mine` and issues one list per scope.

### 9.3 Move Between Scopes

```
POST /database/scopes/{scopeRef}/docs/promote?path=X    vertical: one step up (body: doc)
                                                          → resulting pending (or committed) doc
POST /database/scopes/{scopeRef}/docs/distribute        horizontal: to chosen scopes
                                                          body: { doc, targetScopeRefs: [...] }
                                                          → { distributions: [ per-target result ] }
POST /database/scopes/{scopeRef}/docs/rename?path=X      rename / move in own leaf
                                                          body: { doc, newPath }; 409 on collision
POST /database/scopes/{scopeRef}/docs/revert?path=X      physically drop all own leaf versions
                                                          body: doc; idempotent no-op if none
```

### 9.4 Review

Reviewers work against the target scope — the scope the promotion or distribute-pending is waiting on.

```
GET  /database/scopes/{scopeRef}/pending                 pending docs awaiting this scope, with votes
POST /database/scopes/{scopeRef}/pending/approve         record an approving vote (body: pending doc)
                                                           commits when the score threshold is met
POST /database/scopes/{scopeRef}/pending/reject          end the request (body: { doc, reason? })
```

Both act on a pending doc identified by its `(scopeRef, path, version)`; a request that was already finalized fails `409 outdated`.

### 9.5 Publish

```
POST /database/scopes/{scopeRef}/docs/publish?path=X     publish own leaf version (body: doc)
                                                           → { publicId, publishedAt }
                                                           409 not_publishable if not own leaf version
POST /database/scopes/{scopeRef}/docs/unpublish?path=X    take down (body: doc); publicId stays reserved
```

Anonymous public reads — no authentication, stable links:

```
GET /database/public/{publicId}              200 active · 410 unpublished · 404 never / reverted
GET /database/public/{publicId}/blobs/{key}  read a blob of a published version
```

### 9.6 Blobs

Attachments live per version, addressed by the document's `path` plus a `key`.

```
PUT    /database/scopes/{scopeRef}/blobs/{key}?path=X   upload / replace (raw body + Content-Type)
                                                          415 disallowed type · 413 over 10 MB
GET    /database/scopes/{scopeRef}/blobs/{key}?path=X   read (member only) → 404 if absent on version
DELETE /database/scopes/{scopeRef}/blobs/{key}?path=X   remove this blob from the caller's leaf version
```

### 9.7 Scope Discovery

```
GET /database/scopes/mine                    scopes the caller is an explicit member of
                                               → [ { scopeRef, name, roles: [...] } ]
GET /database/scopes/by-path?name=school/x   resolve a scope name → { scopeRef }
GET /database/scopes/{scopeRef}              scope metadata (name, parent, requiredApprovalScore, roles)
```

### 9.8 Administration

All of section 9.8 requires **admin of the named scope** (structure and membership) or **admin of the parent** (creating and removing sub-scopes).

```
POST   /database/scopes/{scopeRef}/scopes             create a sub-scope
                                                        body: { name, requiredApprovalScore? }
DELETE /database/scopes/{scopeRef}                     remove this scope

POST   /database/scopes/{scopeRef}/members             add a member (body: { personRef })
DELETE /database/scopes/{scopeRef}/members/{personRef} remove a member (also deletes their personal leaf + its content)

POST   /database/scopes/{scopeRef}/admins              grant admin here (body: { personRef })
DELETE /database/scopes/{scopeRef}/admins/{personRef}  revoke admin here

POST   /database/scopes/{scopeRef}/reviewers           add / update a reviewer
                                                        body: { personRef, score }   (0 = observer)
DELETE /database/scopes/{scopeRef}/reviewers/{personRef} revoke reviewer

PATCH  /database/scopes/{scopeRef}                     configure the scope
                                                        body: { requiredApprovalScore }
```

### 9.9 Status Codes

| Code | When |
|------|------|
| `200` / `201` | Success; `201` when a new version or scope was created |
| `400` | Malformed request (missing `path`, bad body) |
| `401` | Anonymous caller attempting anything beyond a public read |
| `403` | Authenticated but lacking the required membership or role |
| `404` | Document, scope, blob, or `publicId` not found |
| `409` | `outdated` (concurrency), `conflict` (rename collision), or `not_publishable` |
| `410` | Public read of an unpublished version |
| `413` / `415` | Blob too large / disallowed content type |

`personRef` is an opaque person identifier from the surrounding auth system (e.g. an email hash); the store treats it as an identifier only.

### 9.10 Typical Flow

```
# read a class document, edit, hand it upward for review
GET  /database/scopes/S/docs?path=math/quadratic.json      → doc (version 5)
PUT  /database/scopes/S/docs?path=math/quadratic.json      body: edited doc (version 5)
                                                           → new leaf version 1
POST /database/scopes/S/docs/promote?path=math/quadratic.json  body: that leaf doc
                                                           → pending on the level above
```

## 10. Out of Scope

These belong to the application on top, not the store:

- **Automatic score adjustments** (e.g. raising a score after N successful votes) — the store only provides the audit log.
- **Notifications** after cleanups or overwrites.
- **Schema validation** of `data` — the store treats it as opaque.
- **Access control beyond roles** (attribute-based, time-limited, path-granular). Visibility is defined solely by scope membership.
- **Cross-scope references** between documents in different branches.
- **Cross-scope batch operations** (e.g. "delete everywhere", "rename a folder across sub-scopes").
- **Content-based deduplication** — the store never compares payloads.

## 11. Glossary

| Term | Meaning |
|------|---------|
| **Scope** | A node in the permission tree — a group, a class, a personal area. |
| **Anonymous** | The built-in login-less principal. Reads root content only; owns no leaf, never writes. |
| **Public root** | The root scope, world-readable by everyone including anonymous. Making a document public means promoting it to the root. |
| **Path** | A document's organizational label within a scope. No permission meaning. |
| **Membership** | Belonging to a scope. Explicit membership allows writing; read access extends transitively to all ancestors. |
| **Leaf** | A member's private area beneath a scope, holding their overrides. |
| **Operating scope** | The scope a call acts in — fixed by context when editing, chosen when creating. |
| **Override** | A local version in a leaf that shadows a higher version for its owner. |
| **Walk-up** | Read resolution: from the operating scope up to the root, checking the caller's leaf then the shared version at each level. |
| **Promote** | Vertical: submit a local version to the level above for review. |
| **Distribute** | Horizontal: deliver a version to several chosen scopes, each decided independently. |
| **Revert** | Physically drop all of one's own leaf versions for a path. |
| **Publish / Unpublish** | Attach a stable public link to a version / take it down (link then returns `410`). |
| **Required approval score** | A scope's threshold; approving reviewer scores must sum to at least this. |
| **Promote ceiling** | A scope flagged as the highest level content may be promoted to; promotion halts there and never rises above. Distribute is unaffected (6.5). |
| **Tombstone** | A committed delete. Shadows higher versions like an override. |
| **Active version** | The highest-id committed or deleted entry of a (scope, path). Derived, not stored. |
