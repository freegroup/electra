## 4 bit Full Adder

A full adder adds binary numbers and accounts for values 
carried in as well as out. A one-bit full adder adds 
three one-bit numbers, often written as A, B, and Cin; 
A and B are the operands, and Cin is a bit carried in 
from the previous less-significant stage.[2] The full 
adder is usually a component in a cascade of adders, 
which add 4, 8, 16, 32, etc. bit binary numbers. 


|  A    |    B    |  Cin     |    S    |    C   |
|:-----:|:-------:|:--------:|:--------:|:-------|
|   0   |    0    |     0    |     0    |     0  |
|   0   |    0    |     1    |     1    |     0  |
|   0   |    1    |     0    |     1    |     0  |
|   0   |    1    |     1    |     0    |     1  |
|   1   |    0    |     0    |     0    |     1  |
|   1   |    0    |     1    |     0    |     1  |
|   1   |    1    |     0    |     0    |     1  |
|   1   |    1    |     1    |     0    |     1  |
