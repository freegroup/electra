# Bauteil-Doku: was noch offen ist

Stand 2026-08-28, aus dem laufenden System erzeugt (118 Bauteile).

Jeder Eintrag verlinkt die **Galerie-Seite** und den **Symbol Editor**, wo der
Text bearbeitet wird. Bei den handgeschriebenen Bauteilen ist stattdessen die
Datei unter `backend/database/builtin/shapes/` die Quelle.

## Erledigt

- 19 Beschreibungen, die ein **anderes** Bauteil beschrieben, sind aus dem
  Quelltext neu geschrieben
- alle 117 Texte beginnen einheitlich mit `# Name`
- die Spalte `INPUT` ohne Nummer ist bei 10 Gattern zu `INPUT 2` korrigiert
- `AND-3`, `AND-4`, `OR-3`, `OR-4` haben vollstaendige Wahrheitstabellen
  (8 bzw. 16 Zeilen), gegen den Simulator-Code geprueft
- vier Bauteile ohne jede Beschreibung haben eine bekommen, `widget/Wasm`
  wurde entfernt

## Offen

| Befund | Bauteile |
|---|---|
| [Keine Beschreibung](#keine-beschreibung) | 1 |
| [Derselbe Text auf mehreren Bauteilen](#derselbe-text-auf-mehreren-bauteilen) | 9 in 4 Gruppen |
| [Sehr duenn](#sehr-duenn) | 0 |
| [Durchgehend Englisch](#durchgehend-englisch) | 117 |

### Keine Beschreibung

- [`digital/buttons/4x4Keypad`](https://electra.academy/gallery/bauteile/digital/buttons/4x4Keypad) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/buttons/4x4Keypad)

### Derselbe Text auf mehreren Bauteilen

Verglichen wird der Rumpf ohne den Titel. Bei den beiden AND-Notationen (DIN
gegen IEC, gleiche Funktion) ist ein gemeinsamer Text richtig; bei den anderen
beschreibt er nur eines der Bauteile.

**Gruppe 1** (3) - "In electronics and especially synchronous digital circuits,..."

- [`digital/pulse/10hz`](https://electra.academy/gallery/bauteile/digital/pulse/10hz) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/pulse/10hz)
- [`digital/pulse/1hz`](https://electra.academy/gallery/bauteile/digital/pulse/1hz) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/pulse/1hz)
- [`digital/pulse/50hz`](https://electra.academy/gallery/bauteile/digital/pulse/50hz) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/pulse/50hz)

**Gruppe 2** (2) - "The **AND** gate is a basic digital logic gate that implemen..."

- [`digital/gate/DIN40700/AND`](https://electra.academy/gallery/bauteile/digital/gate/DIN40700/AND) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/gate/DIN40700/AND)
- [`digital/gate/IEC60617-12/AND`](https://electra.academy/gallery/bauteile/digital/gate/IEC60617-12/AND) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/gate/IEC60617-12/AND)

**Gruppe 3** (2) - "A data bus in a circuit simulator can be thought of as a bun..."

- [`digital/signal/8-SignalSource`](https://electra.academy/gallery/bauteile/digital/signal/8-SignalSource) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/signal/8-SignalSource)
- [`digital/signal/8-SignalTarget`](https://electra.academy/gallery/bauteile/digital/signal/8-SignalTarget) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=digital/signal/8-SignalTarget)

**Gruppe 4** (2) - "The Prewitt operator is used in image processing, particular..."

- [`video/filter/Prewitt`](https://electra.academy/gallery/bauteile/video/filter/Prewitt) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=video/filter/Prewitt)
- [`video/filter/PrewittInvers`](https://electra.academy/gallery/bauteile/video/filter/PrewittInvers) - [im Symbol Editor oeffnen](https://electra.academy/designer/?global=video/filter/PrewittInvers)

### Sehr duenn

Unter 150 Zeichen - zu wenig, um zu erklaeren, was das Bauteil tut.


### Durchgehend Englisch

Alle 117 Beschreibungen sind englisch, die Seite ist auf Deutsch
ausgezeichnet und tritt fuer deutsche Suchanfragen an. Betrifft jedes Bauteil
mit Text, ist also keine Liste, sondern der Bestand.

