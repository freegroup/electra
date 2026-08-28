-- Migration 008: anonymous-readable scopes
--
-- A scope flagged is_anonymous may be read by anonymous (not-logged-in) callers.
-- The flag is NOT transitive: it applies only to the exact scope it is set on,
-- so a public app root can expose its shared documents without opening every
-- sub-scope. Writing still requires explicit membership, so anonymous callers
-- can read but never save/promote.

ALTER TABLE scopes
    ADD COLUMN is_anonymous boolean NOT NULL DEFAULT false;
