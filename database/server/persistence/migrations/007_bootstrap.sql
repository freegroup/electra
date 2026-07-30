-- Migration 007: bootstrap scopes
--
-- A bootstrap scope is one every logged-in user is auto-enrolled into (as an
-- explicit member) on login — new or returning. This guarantees myScopes() is
-- never empty and everyone has at least one writable lane. The flag lives on
-- the scope (single source of truth; survives rename/reparent; visible in the
-- god-view) and is seeded declaratively from init.json.

ALTER TABLE scopes
    ADD COLUMN is_bootstrap boolean NOT NULL DEFAULT false;
