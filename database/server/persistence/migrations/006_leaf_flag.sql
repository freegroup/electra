-- Migration 006: explicit personal-leaf flag
--
-- A personal leaf (a member's private-override scope) was previously detected
-- by convention (scope name == a member's personRef). That's fragile — names
-- are incidental, and removing the member from the parent broke detection.
-- Make it explicit: is_personal_leaf is set when the leaf is provisioned.
--
-- The leaf's NAME stays == personRef (the walk-up joins leaves by name to know
-- WHOSE leaf it is); is_personal_leaf only answers WHETHER a scope is a leaf.

ALTER TABLE scopes
    ADD COLUMN is_personal_leaf boolean NOT NULL DEFAULT false;

-- Backfill existing leaves: a scope whose name equals a person who holds a
-- membership row on that same scope (the leaf's self-row) is a personal leaf.
UPDATE scopes s
   SET is_personal_leaf = true
 WHERE EXISTS (
   SELECT 1 FROM memberships m
    WHERE m.scope_id = s.id AND m.person_ref = s.name
 )
   AND s.parent_id IS NOT NULL;
