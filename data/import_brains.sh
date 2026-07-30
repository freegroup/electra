#!/usr/bin/env bash
# Import the global brain library into the shared "apps" scope as committed
# versions. Each file's path UNDER $ROOT becomes the document path (its "name"),
# e.g. data/brains/global/basic/math/HalfAdder.brain -> "basic/math/HalfAdder.brain".
#
# The file's JSON (draw2d/image/view) is stored verbatim as the document data;
# the embedded `image` is the preview, so no separate blob is needed.
#
# Sync semantics (safe to re-run): a new path is imported as v1; a path whose
# file content CHANGED gets a new committed version (max(version)+1); an
# unchanged path is skipped — so re-running never creates duplicate versions but
# does pick up edits. Comparison is on normalized jsonb (key order / whitespace
# don't matter).
#
# Usage:
#   ./data/import_brains.sh                 # sync every *.brain under $ROOT
#   ./data/import_brains.sh <file> [file…]  # sync just those files
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
  # in a $brain$…$brain$ dollar-quote so quotes/newlines need no escaping; the
  # path is dollar-quoted ($p$…$p$) the same way. content is streamed with `cat`,
  # so it is never held in a shell variable or subject to expansion.
  #
  # Insert a new committed version ONLY when the incoming content differs from the
  # current committed one (a missing doc counts as different → v1). version is
  # max(version)+1. RETURNING version tells us what happened: a number = the
  # version written, empty = unchanged (skipped).
  local out
  out=$( {
    printf 'WITH incoming AS (SELECT $brain$'
    cat "$f"
    printf '$brain$::jsonb AS data)\n'
    printf 'INSERT INTO docstore.versions (scope_id, doc_path, version, status, is_deletion, data, author, finalized_at, finalized_by)\n'
    printf 'SELECT %s, $p$%s$p$,\n' "$SCOPE_ID" "$doc_path"
    printf '       COALESCE((SELECT max(version) FROM docstore.versions WHERE scope_id=%s AND doc_path=$p$%s$p$), 0) + 1,\n' "$SCOPE_ID" "$doc_path"
    printf "       'committed', false, (SELECT data FROM incoming),\n"
    printf "       'import@electra.academy', now(), 'import@electra.academy'\n"
    printf 'WHERE (SELECT data FROM docstore.versions\n'
    printf '        WHERE scope_id=%s AND doc_path=$p$%s$p$ AND status=%s\n' "$SCOPE_ID" "$doc_path" "'committed'"
    printf '        ORDER BY version DESC LIMIT 1) IS DISTINCT FROM (SELECT data FROM incoming)\n'
    printf 'RETURNING version;\n'
  } | "${PSQL[@]}" -v ON_ERROR_STOP=1 -qtA -f - 2>&1 )
  out=$(printf '%s' "$out" | tr -d '[:space:]')

  if [ -z "$out" ]; then
    echo "unchanged:      $doc_path"
  elif printf '%s' "$out" | grep -qE '^[0-9]+$'; then
    if [ "$out" = "1" ]; then
      echo "imported (v1):  $doc_path"
    else
      echo "updated (v$out): $doc_path"
    fi
  else
    echo "ERROR:          $doc_path -> $out"
  fi
}

if [ "$#" -gt 0 ]; then
  for f in "$@"; do import_one "$f"; done
else
  find "$ROOT" -name '*.brain' | sort | while IFS= read -r f; do import_one "$f"; done
fi
