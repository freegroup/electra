#!/usr/bin/env bash
# Import the global brain library into the shared "apps" scope as committed
# versions. Each file's path UNDER $ROOT becomes the document path (its "name"),
# e.g. data/brains/global/basic/math/HalfAdder.brain -> "basic/math/HalfAdder.brain".
#
# The file's JSON (draw2d/image/view) is stored verbatim as the document data;
# the embedded `image` is the preview, so no separate blob is needed.
#
# Idempotent: a document already present at (scope, path) is left untouched.
# Content is passed via a psql variable (:'content') so quoting/escaping is
# handled by psql, not the shell.
#
# Usage:
#   ./data/import-brains.sh                 # import every *.brain under $ROOT
#   ./data/import-brains.sh <file> [file…]  # import just those files
set -euo pipefail

ROOT="data/brains/global"
PSQL=(docker exec -i database-postgres-1 psql -U docstore -d docstore)

# Resolve the shared app scope (electra/content/apps) by path, not a hardcoded id.
SCOPE_ID=$("${PSQL[@]}" -tAc \
  "SELECT s.id FROM docstore.scopes s
     JOIN docstore.scopes p ON s.parent_id = p.id
     JOIN docstore.scopes g ON p.parent_id = g.id
    WHERE s.name='apps' AND p.name='content' AND g.name='electra'" | tr -d '[:space:]')
[ -n "$SCOPE_ID" ] || { echo "ERROR: apps scope (electra/content/apps) not found"; exit 1; }
echo "apps scope id: $SCOPE_ID"

import_one() {
  local f="$1"
  [ -f "$f" ] || { echo "skip (not a file): $f"; return; }
  local doc_path="${f#"$ROOT"/}"
  # The JSON is piped in via STDIN (not a CLI arg → no ARG_MAX limit) and wrapped
  # in a $brain$…$brain$ dollar-quote so quotes/newlines need no escaping. The
  # path is dollar-quoted the same way. content is streamed with `cat`, so it is
  # never held in a shell variable or subject to expansion.
  local out
  out=$( {
    printf 'INSERT INTO docstore.versions (scope_id, doc_path, version, status, is_deletion, data, author, finalized_at, finalized_by)\n'
    printf 'SELECT %s, $p$%s$p$, 1, %s, false,\n' "$SCOPE_ID" "$doc_path" "'committed'"
    printf '$brain$'
    cat "$f"
    printf '$brain$::jsonb, %s, now(), %s\n' "'import@electra.academy'" "'import@electra.academy'"
    printf 'WHERE NOT EXISTS (SELECT 1 FROM docstore.versions WHERE scope_id=%s AND doc_path=$p$%s$p$);\n' "$SCOPE_ID" "$doc_path"
  } | "${PSQL[@]}" -v ON_ERROR_STOP=1 -f - 2>&1 )

  if printf '%s' "$out" | grep -q 'INSERT 0 1'; then
    echo "imported:        $doc_path"
  elif printf '%s' "$out" | grep -q 'INSERT 0 0'; then
    echo "skipped (exists): $doc_path"
  else
    echo "ERROR:           $doc_path -> $out"
  fi
}

if [ "$#" -gt 0 ]; then
  for f in "$@"; do import_one "$f"; done
else
  find "$ROOT" -name '*.brain' | sort | while IFS= read -r f; do import_one "$f"; done
fi
