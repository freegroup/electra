# Schieberegler

Eine einstellbare analoge Quelle. Zieh den Regler während der Simulation und sieh
zu, wie die Schaltung reagiert - der Ersatz für ein Potentiometer oder einen
Sensor.

## Anschlüsse

| Anschluss | Richtung | Bedeutung                      |
| :-------- | :------- | :----------------------------- |
| output    | Ausgang  | der eingestellte Wert, 0 bis 5 |

## Was zu erwarten ist

- **Der Ausgang läuft von 0 bis 5**, gleichmässig über den Weg des Reglers
  verteilt. Die Mittelstellung ergibt 2,5.
- **Er wirkt während der Simulation.** Ziehen ändert den Ausgang sofort, ein
  Neustart ist nicht nötig.
- **Die Stellung wird mit der Schaltung gespeichert** und beim Start der
  Simulation wieder ausgegeben.
- **Eingestellt wird durch Ziehen**, nicht im Einstellungsdialog.
