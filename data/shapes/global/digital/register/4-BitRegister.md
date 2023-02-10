# 4-Bit Register
An 4-bit register is a digital circuit that can store and hold 4 bits of binary 
data. It typically has four inputs: `load`, `clock` and `reset`.

The `load` input is used to load new data into the register. When this input is 
high, the data present on the 4-bit data input lines is loaded into the register.

The `clock` input is used to control when data is loaded into the register. The 
register only responds to changes on the data inputs when the clock input is 
high (on the rising edge). This is known as "edge-triggered" behavior.

The `reset` input is used to clear the register and set all its outputs to 
zero. When this input is high, the register's contents are reset to zero, 
regardless of the state of the other inputs.


An 4-bit register with these four inputs can be used to temporarily store data 
in a digital circuit and control when the data is loaded or read. The register 
can also be used to synchronize data transfer between different parts of a 
circuit or to clear the stored data as needed.