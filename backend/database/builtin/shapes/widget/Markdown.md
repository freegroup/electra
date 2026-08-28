# Markdown

A note on the canvas, written in Markdown. Unlike the plain Text widget it is
rendered, so headings, bold, lists, links and tables come out formatted. Use it
for the explanation that belongs next to a circuit.

## Parameter

| Name          | Meaning                | Default                                              |
| :------------ | :--------------------- | :--------------------------------------------------- |
| Markdown Text | the source to render   | `The quick brown fox $ **jumps** over the *lazy* dog` |

## What to expect

- **No ports and no function.** The note takes no part in the simulation.
- **The rendered text is an overlay** drawn above the canvas. It follows the box
  when you move, resize or zoom, and it is clipped at the edges - so make the box
  large enough for the text.
