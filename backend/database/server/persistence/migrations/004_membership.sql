-- Migration 004: explicit membership
--
-- The model (README §3.2, §4) makes membership explicit and orthogonal to the
-- admin/reviewer roles:
--   - is_member       — may WRITE at this scope (and read it + all ancestors)
--   - is_admin        — structural manager of this scope
--   - reviewer_score  — NULL = not a reviewer; 0..10 = reviewer weight (0 = observer)
--
-- Before this migration "member" was implied by owning a leaf below a scope.
-- Now a member has an explicit row ON the scope itself. Read stays transitive
-- upward (member of S reads S and every ancestor); write requires the explicit
-- row on the operating scope.

ALTER TABLE memberships
    ADD COLUMN is_member boolean NOT NULL DEFAULT false;

-- Backfill: every pre-existing membership row was an admin/reviewer that also
-- acted as a member under the old model, so keep them members.
UPDATE memberships SET is_member = true;

CREATE INDEX memberships_member_idx ON memberships (person_ref) WHERE is_member = true;
