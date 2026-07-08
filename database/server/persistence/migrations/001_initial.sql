-- Migration 001: initial schema
-- See ARCHITECTURE.md §3 for the full definitions.
-- Note: required extensions are ensured by migrate.js before running any
-- migration, so this file does not itself contain CREATE EXTENSION.

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
    created_by                  text        NOT NULL,

    UNIQUE (parent_id, name)
);

CREATE INDEX scopes_parent_idx ON scopes (parent_id);

-- Only one row without parent = the root scope.
CREATE UNIQUE INDEX scopes_single_root_idx ON scopes ((parent_id IS NULL)) WHERE parent_id IS NULL;

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
    reviewer_score  integer     NULL
                    CHECK (reviewer_score IS NULL
                           OR (reviewer_score >= 0 AND reviewer_score <= 10)),
    joined_at       timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (scope_id, person_ref)
);

CREATE INDEX memberships_person_idx ON memberships (person_ref);

-- ---------------------------------------------------------------------------
-- Versions: append-only document history
-- ---------------------------------------------------------------------------
CREATE TYPE version_status AS ENUM ('pending', 'committed', 'deleted', 'rejected');

CREATE TABLE versions (
    scope_id         bigint          NOT NULL REFERENCES scopes(id) ON DELETE RESTRICT,
    doc_path         text            NOT NULL,
    version          integer         NOT NULL,
    status           version_status  NOT NULL,
    is_deletion      boolean         NOT NULL DEFAULT false,
    data             jsonb           NOT NULL DEFAULT '{}'::jsonb,
    meta             jsonb           NOT NULL DEFAULT '{}'::jsonb,
    author           text            NOT NULL,
    created_at       timestamptz     NOT NULL DEFAULT now(),

    finalized_at     timestamptz     NULL,
    finalized_by     text            NULL,
    rejection_reason text            NULL,

    PRIMARY KEY (scope_id, doc_path, version)
);

CREATE INDEX versions_lookup_idx
    ON versions (doc_path, scope_id, status, version DESC);

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
    voter           text            NOT NULL,
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
