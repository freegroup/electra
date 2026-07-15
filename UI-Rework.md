# UI Rework — Figma-Modell für Scopes & Promote

## Leitbild

Die App ist organisiert wie Figma. Eine feste linke Navigation **benennt, wo eine
Datei lebt**. Die Mitte ist immer der **Editor** (die Bühne). Eine Datei aus den
eigenen Entwürfen in einen geteilten Arbeitsbereich zu heben **ist** unser
`promote`. Damit erklärt sich das Modell aus der Bedienung selbst.

Kein mehrdeutiges Stift-Icon mehr, kein Rätsel „was ist der Hauptbereich": Man
wählt links eine Datei, sie öffnet sich mittig im Editor. Der Editor ist immer
das Zentrum.

---

## Die Navigation

Eine benannte, immer sichtbare linke Leiste mit vier Bereichen. Jeder Bereich ist
ein Wort, kein reines Icon.

### 1. Entwürfe (Drafts)

Alle Dateien, die in der **eigenen Leaf** des Nutzers liegen und noch nicht
geteilt sind — `instanceType: "personal"` und `"personalCopy"`.

- **Entwürfe** = alles, was mir gehört und (noch) nicht die geteilte Wahrheit ist.
- Von hier führt **ein** Weg nach oben: **Promote** hebt einen Entwurf in einen
  Arbeitsbereich.
- **Verwerfen** (Revert) löscht den Entwurf und holt die geteilte Version zurück.
- Neue Dokumente entstehen immer zuerst hier.

### 2. Favoriten (Starred)

Vom Nutzer gespeicherte **Links** — wie Browser-Bookmarks. Ein Favorit ist eine
ganz normale URL (der öffentliche/App-Link zur Datei), als String abgelegt.

- Ein Stern-Klick auf jeder Datei legt ihren Link hier ab.
- Das Frontend navigiert beim Klick einfach zur URL. Existiert die Datei nicht
  mehr, zeigt die Auflösung eine normale 404 / „nicht gefunden". Keine Magie,
  kein Cleanup — genau wie ein toter Bookmark.
- Favoriten sind pro Nutzer und folgen ihm über Geräte hinweg.

### 3. Bibliothek (Resources)

Alle Dateien, die der Nutzer sehen kann — die effektive Gesamtansicht über alle
seine Arbeitsbereiche hinweg (der Glob-View). Eine Datei pro Pfad, mit Spalte
„Bereitgestellt von".

- Der Ort zum Suchen, Stöbern, Wiederverwenden.
- Zeigt geteilte/geerbte Dateien (`instanceType: "inherit"`) neben den eigenen.

### 4. Arbeitsbereiche (Workspaces / Scopes)

Die Scope-Hierarchie, in der der Nutzer Mitglied ist — verschachtelt dargestellt.
Steht man in einem übergeordneten Scope (z. B. **Schule44**), listet dieser
Bereich alle darunterliegenden Scopes auf.

- Jeder Scope zeigt seine Dateien.
- Pro Scope: **Einladungslink erstellen** und **Mitgliedschaft anfragen**.
- Der Einstiegspunkt, um Inhalte gemeinsam zu bearbeiten.

---

## Begriffs-Mapping

| Figma            | Unser Modell                          | Label (UI)              |
|------------------|---------------------------------------|-------------------------|
| Drafts           | personal / personalCopy in der Leaf   | **Entwürfe**            |
| Starred          | Nutzer-Favoriten                      | **Favoriten**           |
| Resources        | Glob-View aller sichtbaren Dateien    | **Bibliothek**          |
| Teams / Projects | Scope-Hierarchie (Mitgliedschaft)     | **Arbeitsbereiche**     |
| Move to project  | `promote` (vertikal, Scope hoch)      | **In Bereich heben**    |
| Publish          | `publish` (öffentlicher Link)         | **Öffentlich teilen**   |
| Move/Copy        | `distribute` (horizontal)             | **In Bereich kopieren** |

---

## Kernaktionen

- **In Bereich heben (Promote):** Ein Entwurf wandert aus „Entwürfe" in einen
  Arbeitsbereich und wird dort für alle Mitglieder sichtbar. Ein Klick, eine
  Zielauswahl.
- **Verwerfen (Revert):** Der eigene Entwurf wird gelöscht; die geteilte Version
  des Bereichs wird wieder wirksam.
- **Öffentlich teilen (Publish):** Erzeugt einen anonym lesbaren Link. Getrennt
  von der Team-Sichtbarkeit.
- **In Bereich kopieren (Distribute):** Kopiert eine Datei horizontal in andere
  Arbeitsbereiche.
- **Einladungslink / Mitgliedschaft anfragen:** Pro Scope. Der Einladungslink
  gewährt Mitgliedschaft; die Anfrage bittet um Aufnahme.

---

## Der Editor als Bühne

Die Mitte gehört immer dem Editor. Öffnet man eine Datei aus einem
Navigationsbereich, füllt sie die Bühne. Es gibt keinen separaten „Editor-Knopf",
den man erst finden muss — der Editor ist der Standardzustand.

Die frühere, mehrdeutige Icon-Leiste wird durch die benannte Navigation ersetzt.
Jeder Bereich trägt ein Wort; der gerade offene Bereich ist deutlich
hervorgehoben (heller Block + farbiger Kantenbalken).

---

## Datenhaltung

Die `database` bleibt **eine physische Einheit** (ein Postgres, ein Pool, ein
Backup, ein Migrations-Runner), enthält aber zwei klar getrennte Bereiche:

1. **Dokumentenkern** — personen-agnostisch. Scopes, Versionen, Walk-up,
   Mitgliedschaften. Kennt keine Favoriten, keine History. Bleibt sauber.
2. **Userdata** — neues, eigenes Schema/Tabellen-Set (`persistence/userdata/*`)
   für Favoriten, Einladungslinks und History. Kein eigener Service, kein
   zweites Postgres.

Gleiche DB, weil das Einlösen eines Einladungslinks (Link prüfen →
Mitgliedschaft anlegen) in **einer atomaren Transaktion** laufen muss — das geht
nur, wenn Links und `memberships` in derselben Datenbank liegen.

Getrennte Tabellen, weil der Dokumentenkern nie „wissen" darf, wer etwas
favorisiert hat. Die Walk-up-Logik bleibt frei von Nutzerbezug.

### Verankerung & Aufräumen

Die drei Userdata-Features sind unterschiedlich verankert und werden
unterschiedlich aufgeräumt:

| Feature            | Verankert an          | Aufräum-Strategie                                    |
|--------------------|-----------------------|------------------------------------------------------|
| **Einladungslinks**| Scope (`scopes.id`)   | `ON DELETE CASCADE` — verschwindet mit dem Scope; Einlösen ist eine Transaktion |
| **Favoriten**      | Gespeicherte URL      | **Keine** — ein toter Link liefert 404, wie ein Bookmark |
| **History**        | Gespeicherte URL      | **Keine** — ein toter Link liefert 404 beim Zugriff  |

Einladungslinks hängen an einer echten Zeile (`scopes.id`) und nutzen
Foreign-Key-Cascade. Favoriten und History sind dagegen einfach **gespeicherte
URLs** — wie Browser-Bookmarks. Kein Handle-Auflösen, kein Cleanup: Das Frontend
navigiert zur URL, und existiert das Ziel nicht mehr, zeigt die Auflösung eine
normale 404. Ein toter Link ist kein Fehlerzustand, den wir aufräumen müssen.

---

## Was wir bauen

- **Vier benannte Navigationsbereiche** (Entwürfe, Favoriten, Bibliothek,
  Arbeitsbereiche) als feste linke Leiste, jeder mit Wort-Label und klarem
  Aktiv-Zustand.
- **Entwürfe-Filter** über den Glob-View: `instanceType ∈ {personal, personalCopy}`.
- **Bibliothek-Filter:** vollständiger Glob-View.
- **Favoriten:** pro Nutzer gespeicherte Markierungen; Stern-Aktion auf jeder Datei.
- **Arbeitsbereiche-Baum:** die Scopes des Nutzers, verschachtelt; pro Scope die
  enthaltenen Dateien.
- **Promote als „In Bereich heben"** mit Zielauswahl direkt aus „Entwürfe".
- **Einladungslink** und **Mitgliedschaft anfragen** pro Scope.
- **Editor-Bühne** als Standard-Mittelbereich; Datei-Auswahl öffnet mittig.
- **Userdata-Schema** in derselben Datenbank, getrennt vom Dokumentenkern:
  Tabellen für Favoriten, Einladungslinks und History (`persistence/userdata/*`).
- **Einladungslinks** an `scopes.id` gekoppelt (`ON DELETE CASCADE`); Einlösen
  legt die Mitgliedschaft in einer Transaktion an.
- **Favoriten & History** als gespeicherte URLs (wie Bookmarks); toter Link →
  normale 404, kein Cleanup.
