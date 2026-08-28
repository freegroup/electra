-- Migration 003: blobs
-- See README §6.14 and ARCHITECTURE.md §4.12.

CREATE TABLE blobs (
    scope_id      bigint      NOT NULL,
    doc_path      text        NOT NULL,
    version       integer     NOT NULL,
    key           text        NOT NULL,
    content_type  text        NOT NULL,
    size_bytes    integer     NOT NULL CHECK (size_bytes >= 0),
    data          bytea       NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (scope_id, doc_path, version, key),
    FOREIGN KEY (scope_id, doc_path, version)
        REFERENCES versions(scope_id, doc_path, version)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
