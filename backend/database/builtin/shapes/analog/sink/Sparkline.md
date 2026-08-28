# Sparkline

A small chart that draws the last 100 values of a signal over time. Put it into a
line to watch what actually happens there while the simulation runs.

## Ports

| Port   | Direction | Meaning                                 |
| :----- | :-------- | :-------------------------------------- |
| input  | in        | the signal to plot, one value per cycle |
| output | out       | the input, passed through unchanged     |

## What to expect

- **It does not delay the signal.** The output hands out the value of the
  connected source directly, so a circuit behaves exactly the same whether a
  Sparkline sits in the line or not.
- **100 values wide.** Every cycle adds one value on the right, the oldest drops
  off on the left.
- **The scale is fixed to 0 to 5.** Values outside that range are drawn at the
  edge, not scaled to fit.
- **A missing value counts as 0.**
- **One connection at the input.** The input accepts a single source.
