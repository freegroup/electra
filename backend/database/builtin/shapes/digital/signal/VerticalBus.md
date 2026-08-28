# Senkrechter Bus

Eine senkrechte Schiene, die ein benanntes Signal verteilt. Gib dem Bus eine
Signal Id, und er führt, was ein Signalziel mit derselben Id aufgenommen hat.
Alles, was das Signal braucht, wird an die Schiene gehängt, statt quer durch die
Zeichnung zur Quelle verdrahtet zu werden.

## Anschlüsse

| Anschluss | Richtung | Bedeutung                      |
| :-------- | :------- | :----------------------------- |
| Schiene   | Ausgang  | der Wert des benannten Signals |

## Parameter

| Name      | Bedeutung                      | Voreinstellung |
| :-------- | :----------------------------- | :------------- |
| Signal Id | der Name des geführten Signals | *Signal_Id*    |

## Was zu erwarten ist

- **Der Bus lässt sich nur lesen, nicht speisen.** An der Schiene darf keine
  Verbindung enden. Der Wert kommt nicht aus einer Leitung, sondern aus der
  Signal Id: ein Signalziel mit derselben Id veröffentlicht ihn, der Bus und jede
  Signalquelle mit dieser Id nehmen ihn auf.
- **Die Signal Id steht auf der Schiene**, die Zeichnung zeigt also, welches
  Signal wo läuft.
- **Die Verbindung entsteht beim Start der Simulation.** Trägt kein Signalziel
  diese Id, führt der Bus nichts.
- **Eine Änderung der Id setzt die Schiene auf 0**, bis die Simulation neu
  gestartet wird.
