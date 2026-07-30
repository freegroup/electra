-- Migration 005: promote ceiling
--
-- A scope flagged as a promote ceiling is the highest level a document can be
-- promoted to. Promotion halts there — the auto-cascade through score-0 levels
-- stops at it, and promoting content out/above the scope is refused. This is a
-- promotion-only constraint (README §6.5); distribute (sideways) is unaffected.

ALTER TABLE scopes
    ADD COLUMN promote_ceiling boolean NOT NULL DEFAULT false;
