# Sparkline

Ein kleines Diagramm, das die letzten 100 Werte eines Signals über der Zeit
zeichnet. In eine Leitung gesetzt, um während der Simulation zu sehen, was dort
tatsächlich passiert.

## Anschlüsse

| Anschluss | Richtung | Bedeutung                                  |
| :-------- | :------- | :----------------------------------------- |
| input     | Eingang  | das Signal, ein Wert je Simulationsschritt |
| output    | Ausgang  | der Eingang, unverändert weitergereicht    |

## Was zu erwarten ist

- **Es verzögert das Signal nicht.** Der Ausgang gibt den Wert der angeschlossenen
  Quelle direkt weiter - eine Schaltung verhält sich also gleich, ob eine
  Sparkline dazwischen sitzt oder nicht.
- **100 Werte breit.** Jeder Schritt setzt rechts einen Wert an, links fällt der
  älteste heraus.
- **Der Massstab liegt fest bei 0 bis 5.** Werte darüber oder darunter werden am
  Rand gezeichnet, nicht eingepasst.
- **Ein fehlender Wert zählt als 0.**
- **Am Eingang eine Verbindung.** Er nimmt genau eine Quelle an.
