# NAND Gate

In digital electronics, a **NAND** gate (NOT-AND) is a logic gate which produces 
an output which is false only if all its inputs are true; thus its output is 
complement to that of an AND gate. A LOW (0) output results only if all the 
inputs to the gate are HIGH (1); if any input is LOW (0), a HIGH (1) output 
results. 

A NAND gate is made using transistors and junction diodes. By 
De Morgan's theorem, a two-input NAND gate's logic may be expressed as AB=A+B, 
making a NAND gate equivalent to inverters followed by an OR gate.

**The NAND gate is significant because `any` boolean function can be implemented 
by using a combination of NAND gates. This property is called functional 
completeness. It shares this property with the NOR gate.**

## Logic table

| INPUT A   | INPUT B  |  OUTPUT    |
|:---------:|:--------:|:----------:|
| Low       | Low      |  `High`    |
| `High`    | Low      |  `High`    |
| Low       | `High`   |  `High`    |
| `High`    | `High`   |  Low       |

