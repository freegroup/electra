#!/usr/bin/env bash
#
# claude-set-default.sh
#
# Setzt Claude Code auf den oeffentlichen Default zurueck, indem die
# Company-/LiteLLM-Proxy-Variablen aus ~/.claude/settings.json entfernt werden.
#
# Idempotent: kann beliebig oft aufgerufen werden. Das Company-Setup laesst
# sich danach jederzeit wieder ueber die LiteLLM Proxy UI setzen.
#
set -euo pipefail

SETTINGS="${CLAUDE_SETTINGS:-$HOME/.claude/settings.json}"

# Keys, die auf den Proxy zeigen und beim "Default" verschwinden muessen.
KEYS_JSON='[
  "ANTHROPIC_AUTH_TOKEN",
  "ANTHROPIC_BASE_URL",
  "ANTHROPIC_MODEL",
  "ANTHROPIC_DEFAULT_HAIKU_MODEL",
  "ANTHROPIC_DEFAULT_OPUS_MODEL",
  "ANTHROPIC_DEFAULT_SONNET_MODEL",
  "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT",
  "OTEL_EXPORTER_OTLP_PROTOCOL",
  "OTEL_METRICS_EXPORTER",
  "CLAUDE_CODE_ENABLE_TELEMETRY"
]'

if [[ ! -f "$SETTINGS" ]]; then
  echo "Keine Datei unter $SETTINGS gefunden - nichts zu tun (bereits Default?)."
  exit 0
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "Fehler: 'jq' ist nicht installiert. Installiere es mit: brew install jq" >&2
  exit 1
fi

removed=$(jq -r --argjson keys "$KEYS_JSON" '
  [ (.env // {} | keys[]) as $k | select($keys | index($k)) | $k ] | join(", ")
' "$SETTINGS")

if [[ -z "$removed" ]]; then
  echo "Bereits auf Default: keine Proxy-Variablen in $SETTINGS gefunden."
  exit 0
fi

tmp="$(mktemp)"
jq --argjson keys "$KEYS_JSON" '
  .env |= (. // {} | with_entries(select(.key as $k | ($keys | index($k)) | not)))
  | if (.env | length) == 0 then del(.env) else . end
' "$SETTINGS" > "$tmp"

mv "$tmp" "$SETTINGS"

echo "Claude Code auf Default gesetzt."
echo "  Entfernt: $removed"
echo
echo "Hinweis: VS Code / Claude Code neu starten, damit die Aenderung greift."
