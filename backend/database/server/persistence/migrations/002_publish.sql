-- Migration 002: publish support
-- Adds public_id / published_at / unpublished_at to versions.
-- See README §6.13 and ARCHITECTURE.md §4.11.

ALTER TABLE versions
    ADD COLUMN public_id       uuid        NULL UNIQUE,
    ADD COLUMN published_at    timestamptz NULL,
    ADD COLUMN unpublished_at  timestamptz NULL;
