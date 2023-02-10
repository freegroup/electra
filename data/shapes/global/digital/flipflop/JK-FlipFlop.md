# JK-FlipFlop

## Description

The `JK flip-flop` is a simple enhancement of the SR flip-flop 
where the state J=K=1 is not forbidden. It works just like a 
SR flip-flop where J is serving as set input and K serving 
as reset. The only difference is that for the formerly 
*forbidden* combination **J=K=1** this flip-flop now performs 
an action: it inverts its state. As the behavior of the 
JK flip-flop is completely predictable under all conditions,
this is the preferred type of flip-flop for most logic
circuit designs. But there is still a problem i.e. both 
the outputs are same when one tests the circuit practically.

This is because of the internal toggling on every propagation
elapse completion. The main remedy is going for master-slave
jk flip-flop,this flip-flop overrides the self(internal) 
recurring toggling through the pulsed clocking feature 
incorporated.