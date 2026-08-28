#!/usr/bin/env bash
#
# Spielt den lokalen Dokumentenbestand auf PRODUKTION - vollstaendig und ohne
# Ausnahme. Alles, was auf prod im Schema steht, ist danach weg.
#
# Das ist gewollt: prod ist hier reiner Empfaenger, gearbeitet wird lokal. Es
# wird deshalb auch NICHT von prod gesichert. Sobald auf prod echte Daten
# entstehen - jemand legt dort ein Dokument an - ist dieses Skript das falsche
# Werkzeug, denn es gleicht nicht ab, es ersetzt.
#
# Gesichert wird der lokale Dump, nach backup/. Der ist der Rueckweg, falls das
# Einspielen mittendrin abbricht.
#
# Zugangsdaten kommen aus den beiden secrets.ini und stehen nirgends im Skript:
#   secrets.ini          lokal  (Docker, Datenbank "docstore", PostgreSQL 14)
#   ansible/secrets.ini  prod   (sql549, Datenbank "electra", 15, SSL Pflicht)
#
# psql und pg_dump kommen aus dem lokalen Postgres-Container, damit auf dem
# Rechner nichts installiert sein muss. pg_dump laeuft nur gegen die lokale
# Datenbank (gleiche Version); psql spricht auch mit dem neueren Server auf prod.
#
#   ./move_db_to_prod.sh            fragt nach, bevor es schreibt
#   ./move_db_to_prod.sh --dry-run  dumpt lokal und zeigt den Vergleich
#   ./move_db_to_prod.sh --yes      ohne Rueckfrage

set -euo pipefail

cd "$(dirname "$0")"

CONTAINER="${PG_CONTAINER:-database-postgres-1}"
BACKUP_DIR="backup"
STAMP="$(date +%Y%m%d-%H%M%S)"

DRY_RUN=false
ASSUME_YES=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --yes|-y)  ASSUME_YES=true ;;
    *) echo "unbekannte Option: $arg" >&2; exit 2 ;;
  esac
done

# --- Zugangsdaten -----------------------------------------------------------
# Liest einen Schluessel aus einer ini, ohne sie als Shell auszufuehren: die
# Dateien enthalten Passwoerter mit Sonderzeichen, ein `source` waere eine
# Einladung.
ini() { sed -n "s/^$2=//p" "$1" | tail -1 | tr -d '\r'; }

for f in secrets.ini ansible/secrets.ini; do
  [ -f "$f" ] || { echo "fehlt: $f" >&2; exit 1; }
done

LOCAL_USER="$(ini secrets.ini PG_DATABASE_USER)"
LOCAL_DB="$(ini secrets.ini PG_DATABASE_NAME)"
LOCAL_SCHEMA="$(ini secrets.ini PG_DATABASE_SCHEMA)"

PROD_HOST="$(ini ansible/secrets.ini PG_DATABASE_HOST)"
PROD_PORT="$(ini ansible/secrets.ini PG_DATABASE_PORT)"
PROD_USER="$(ini ansible/secrets.ini PG_DATABASE_USER)"
PROD_PWD="$(ini ansible/secrets.ini PG_DATABASE_PWD)"
PROD_DB="$(ini ansible/secrets.ini PG_DATABASE_NAME)"
PROD_SCHEMA="$(ini ansible/secrets.ini PG_DATABASE_SCHEMA)"

# Ein Tippfehler hier waere ein Dump der falschen Datenbank.
[ -n "$LOCAL_DB" ] && [ -n "$PROD_HOST" ] && [ -n "$PROD_DB" ] || {
  echo "Zugangsdaten unvollstaendig - secrets.ini pruefen" >&2; exit 1; }

# Beide Seiten muessen dasselbe Schema fuehren, sonst passt der Dump nicht.
[ "$LOCAL_SCHEMA" = "$PROD_SCHEMA" ] || {
  echo "Schema unterschiedlich: lokal '$LOCAL_SCHEMA', prod '$PROD_SCHEMA'" >&2; exit 1; }

# sslmode=require: sql549 weist Klartext ab.
PROD_URL="postgresql://${PROD_USER}:${PROD_PWD}@${PROD_HOST}:${PROD_PORT}/${PROD_DB}?sslmode=require"

# --- Werkzeuge im Container -------------------------------------------------
docker exec -i "$CONTAINER" true 2>/dev/null || {
  echo "Container '$CONTAINER' laeuft nicht - Docker starten oder PG_CONTAINER setzen" >&2; exit 1; }

in_pg()      { docker exec -i "$CONTAINER" "$@"; }
prod_psql()  { in_pg psql "$PROD_URL" -v ON_ERROR_STOP=1 "$@"; }
local_psql() { in_pg psql -U "$LOCAL_USER" -d "$LOCAL_DB" -v ON_ERROR_STOP=1 "$@"; }

# Zaehlt die Dokumentversionen - die Zahl, an der man sieht, was man tut.
count() { "$1" -tAc "SELECT count(*) FROM ${LOCAL_SCHEMA}.versions;" 2>/dev/null || echo "?"; }

echo "lokal : ${LOCAL_DB} (Container ${CONTAINER})"
echo "prod  : ${PROD_DB} @ ${PROD_HOST}"
echo

echo "Erreichbarkeit prod ..."
prod_psql -tAc "SELECT version();" >/dev/null || {
  echo "prod nicht erreichbar - Zugangsdaten, Netz oder Firewall pruefen" >&2; exit 1; }

LOCAL_ROWS="$(count local_psql)"
PROD_ROWS="$(count prod_psql)"
echo "Dokumentversionen: lokal ${LOCAL_ROWS}  ->  prod ${PROD_ROWS} (wird ersetzt)"
echo

mkdir -p "$BACKUP_DIR"

# --- lokal dumpen -----------------------------------------------------------
# --clean --if-exists: der Dump raeumt auf prod auf, bevor er schreibt.
# --no-owner/--no-privileges: die Rollen heissen auf beiden Seiten anders
# (lokal "docstore", auf prod "electra").
LOCAL_DUMP="${BACKUP_DIR}/local-${LOCAL_DB}-${STAMP}.sql.gz"
echo "dumpe lokal nach ${LOCAL_DUMP} ..."
in_pg pg_dump -U "$LOCAL_USER" -d "$LOCAL_DB" \
  --clean --if-exists --no-owner --no-privileges | gzip > "$LOCAL_DUMP"
[ -s "$LOCAL_DUMP" ] || { echo "Dump ist leer - Abbruch" >&2; exit 1; }
echo "  $(du -h "$LOCAL_DUMP" | cut -f1)"

if $DRY_RUN; then
  echo
  echo "Trockenlauf - auf prod wurde nichts geschrieben."
  echo "Der Dump liegt unter ${LOCAL_DUMP}."
  exit 0
fi

# --- Bestaetigung -----------------------------------------------------------
if ! $ASSUME_YES; then
  echo
  echo "Jetzt wird ${PROD_DB} auf ${PROD_HOST} ERSETZT - ohne Sicherung."
  echo "Die ${PROD_ROWS} Dokumentversionen dort werden durch ${LOCAL_ROWS} lokale ersetzt."
  printf "Zum Fortfahren \"ueberschreiben\" eingeben: "
  read -r answer
  [ "$answer" = "ueberschreiben" ] || { echo "abgebrochen."; exit 1; }
fi

# --- einspielen -------------------------------------------------------------
echo
echo "spiele ein ..."
gunzip -c "$LOCAL_DUMP" | in_pg psql "$PROD_URL" -v ON_ERROR_STOP=1 --quiet

NEW_ROWS="$(count prod_psql)"
echo
echo "fertig. prod hat jetzt ${NEW_ROWS} Dokumentversionen (lokal: ${LOCAL_ROWS})."
[ "$NEW_ROWS" = "$LOCAL_ROWS" ] || {
  echo "ACHTUNG: die Zahlen weichen ab. Dump: ${LOCAL_DUMP}" >&2; exit 1; }

echo
echo "Danach auf prod die Dienste neu starten, damit shipped.js die"
echo "builtin-Bauteile gegen das Repository abgleicht."
