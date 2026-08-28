-- Migration 011: optional free-form description for a scope (workgroup)
--
-- `label` (009) is the short display name. `description` is an optional longer
-- blurb the Workspaces UI shows on the workgroup card (like a file's preview).
-- Nullable and unconstrained - empty / absent is the normal case.

ALTER TABLE scopes
    ADD COLUMN description text;
