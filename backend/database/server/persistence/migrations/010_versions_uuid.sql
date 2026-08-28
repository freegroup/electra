-- Migration 010: stable UUID per version row
--
-- Adds a `uuid` column to the versions table so each row has an externally-
-- referenceable opaque identifier independent of the (scope_id, doc_path,
-- version) composite key. Enables O(1) direct access to any version regardless
-- of its status (pending/committed/deleted) via GET /database/docs/:uuid.
--
-- pgcrypto is guaranteed by migrate.js (CREATE EXTENSION IF NOT EXISTS pgcrypto
-- runs before any migration). The column DEFAULT fills existing rows atomically.

ALTER TABLE versions ADD COLUMN uuid uuid NOT NULL DEFAULT gen_random_uuid();
CREATE UNIQUE INDEX versions_uuid_idx ON versions (uuid);
