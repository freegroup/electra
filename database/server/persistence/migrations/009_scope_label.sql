-- Migration 009: display label separate from identity name
--
-- `name` has been overloaded as BOTH the stable identity (path segment, walk-up
-- joins on name == personRef, UNIQUE(parent_id, name), reparent checks) AND the
-- string shown to the user. Split them: `name` stays the immutable, lowercase,
-- sanitized identity; `label` is the free-form display name (spaces, mixed
-- case, unicode ok) the UI shows and users can freely rename.
--
-- label is NOT NULL and initialized to the current name for existing rows.
-- No unique constraint — labels may repeat freely.

ALTER TABLE scopes
    ADD COLUMN label text;

UPDATE scopes SET label = name WHERE label IS NULL;

ALTER TABLE scopes
    ALTER COLUMN label SET NOT NULL;
