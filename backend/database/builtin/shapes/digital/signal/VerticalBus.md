# Vertical Bus

A vertical rail that distributes one named signal. Give the bus a Signal Id, and
it carries whatever a Signal Target with the same Id has picked up. Everything
that needs the signal connects to the rail instead of being wired to the source
across the whole drawing.

## Ports

| Port | Direction | Meaning                       |
| :--- | :-------- | :---------------------------- |
| rail | out       | the value of the named signal |

## Parameter

| Name      | Meaning                         | Default     |
| :-------- | :------------------------------ | :---------- |
| Signal Id | the name of the signal to carry | `Signal_Id` |

## What to expect

- **The bus can only be read, not fed.** No connection may end at the rail. The
  value does not come from a wire but from the Signal Id: a Signal Target with
  the same Id publishes it, the bus and every Signal Source with that Id pick it
  up.
- **The Signal Id is written on the rail**, so the drawing shows which signal
  runs where.
- **The link is made when the simulation starts.** If no Signal Target carries
  that Id, the bus delivers nothing.
- **Changing the Id resets the rail to 0** until the simulation is started again.
