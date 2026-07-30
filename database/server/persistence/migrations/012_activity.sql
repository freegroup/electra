-- Migration 012: activity feed (transparency)
--
-- A generic, account-scoped notification inbox. One row PER RECIPIENT per event
-- (fan-out on write). Deliberately NOT document-centric: `event_type` is the
-- discriminator and the subject is optional (a document, a workspace, or
-- nothing). Type-specific bits live in `meta` so the columns stay generic.
--
-- Text (not enums) for event_type / subject_kind on purpose: new kinds must drop
-- in without a migration. The feed is a plain read by `recipient`; "what have I
-- done" is the same table read by `actor`.

CREATE TABLE activity (
    id             bigserial      PRIMARY KEY,
    event_id       uuid           NOT NULL,   -- groups every recipient-row of one event
    recipient      text           NOT NULL,   -- person_ref (email) who sees it
    actor          text           NOT NULL,   -- who did it
    event_type     text           NOT NULL,   -- review_requested | committed | rejected | withdrawn | i_approved | i_rejected | member_added | ...
    recipient_role text           NULL,       -- author | reviewer | admin | member (drives wording)

    scope_id       bigint         NULL,       -- where it happened
    scope_label    text           NULL,       -- snapshot for display

    subject_kind   text           NULL,       -- 'document' | 'workspace' | NULL
    subject_ref    text           NULL,       -- opaque handle: doc hash / scope ref / NULL
    subject_label  text           NULL,       -- display snapshot (survives deletion of the source)

    reason         text           NULL,       -- free-text: rejection reason / comment
    meta           jsonb          NOT NULL DEFAULT '{}'::jsonb,  -- {docType,version,uuid} for documents; {role} for membership; ...

    seen_at        timestamptz    NULL,       -- NULL = unread
    created_at     timestamptz    NOT NULL DEFAULT now(),

    UNIQUE (event_id, recipient)              -- idempotent fan-out (retries don't duplicate)
);

CREATE INDEX activity_recipient_idx ON activity (recipient, created_at DESC);
CREATE INDEX activity_unread_idx    ON activity (recipient, seen_at);
CREATE INDEX activity_actor_idx     ON activity (actor, created_at DESC);
