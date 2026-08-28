# Bauteil-Doku: Stand und was offen ist

Stand 2026-08-28, aus dem laufenden System erzeugt (118 Bauteile).

Jeder Eintrag verlinkt die **Galerie-Seite** und den **Symbol Editor**, wo der
Text bearbeitet wird. Bei den handgeschriebenen Bauteilen ist stattdessen die
Datei unter `backend/database/builtin/shapes/` die Quelle.

## Erledigt

- **Alle 117 Texte sind auf Deutsch.** Die Seite ist auf Deutsch ausgezeichnet
  und tritt fuer deutsche Suchanfragen an; englische Texte konnten das nicht
  bedienen. Ein Bauteil hat genau ein Textfeld, zweisprachig ginge nur mit
  einer Erweiterung des Datenmodells.
- 19 Beschreibungen, die ein **anderes** Bauteil beschrieben, sind aus dem
  Quelltext neu geschrieben - darunter VerticalBus, das die Markdown-Syntaxhilfe
  des Designers trug, und sechs Video-Bauteile mit dem Text eines Volladdierers.
- Zwei fachliche Fehler behoben: die Spalte `INPUT` ohne Nummer bei zehn
  Gattern, und die 2-Eingangs-Tabelle bei `AND-3`, `AND-4`, `OR-3`, `OR-4`.
  Beim `FullAdder` waren zwei Zeilen der Wahrheitstabelle falsch.
- Alle Texte beginnen einheitlich mit `# Titel`.
- **HIGH** und **LOW** stehen fett statt in Backticks: Inline-Code laeuft in
  dieser Pipeline durch KaTeX und wurde als Formel gesetzt.
- Tabellen sind im Quelltext ausgerichtet, damit sie auch dort lesbar sind.
- Vier Bauteile ohne Beschreibung haben eine bekommen, `widget/Wasm` wurde
  entfernt (leerer Rumpf, Ausgang hiess `otput`, von keiner Schaltung benutzt).

## Offen

### Keine Beschreibung

- [`digital/buttons/4x4Keypad`](https://electra.academy/gallery/bauteile/digital/buttons/4x4Keypad) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/buttons/4x4Keypad)

### Titel sind zum Teil Dateinamen

Die Ueberschrift der Galerie-Seite ist der Bauteilname aus dem Pfad, also etwa
`4x4Keypad` oder `4-Bit-Switch`. Im Suchergebnis entscheidet der Titel ueber den
Klick - ein sprechender waere besser. Das braucht ein Titelfeld am Bauteil,
nicht nur einen anderen Text.

## Kein Befund

Die 6 Gatter-Paare in DIN- und IEC-Notation teilen sich je einen Text.
Das ist richtig: dasselbe Gatter, zwei Schreibweisen, eine Erklaerung.

- `digital/gate/DIN40700/AND` und `digital/gate/IEC60617-12/AND`
- `digital/gate/DIN40700/NAND` und `digital/gate/IEC60617-12/NAND`
- `digital/gate/DIN40700/NOR` und `digital/gate/IEC60617-12/NOR`
- `digital/gate/DIN40700/OR` und `digital/gate/IEC60617-12/OR`
- `digital/gate/DIN40700/XNOR` und `digital/gate/IEC60617-12/XNOR`
- `digital/gate/DIN40700/XOR` und `digital/gate/IEC60617-12/XOR`

