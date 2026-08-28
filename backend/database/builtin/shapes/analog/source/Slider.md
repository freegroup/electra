# Slider

An adjustable analog source. Drag the slider while the simulation runs and watch
the circuit react - a stand-in for a potentiometer or a sensor.

## Ports

| Port   | Direction | Meaning                |
| :----- | :--------- | :-------------------- |
| output | out        | the set value, 0 to 5 |

## What to expect

- **The output goes from 0 to 5**, spread evenly over the slider travel. The
  middle position is 2.5.
- **It works while the simulation runs.** Dragging changes the output at once, no
  restart needed.
- **The position is saved with the circuit** and is put on the output again when
  the simulation starts.
- **Set by dragging, not in the settings dialog.**
