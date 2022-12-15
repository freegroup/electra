# Signal Inverter

Sometimes it is necessary to invert an analog signal. This can be helpful, for example, if you want to reverse the direction of rotation of servos.

A signal of 0 normally means 0° for a servo and a signal of 5 is converted to 180°. 

Internally the module does nothing else but:

```math
output = 5-input

```

*Internally the maximum signal value is **5**.*