# BCD Counter


BCD = **B**inary **C**oded **D**ecimal = Counts from 0 to 9 and then repeats.



A binary coded decimal (BCD) is a serial digital counter that counts
ten digits. And it resets for every new clock input. As it can go 
through 10 unique combinations of output, it is also called as 
 `Decade counter` . A BCD counter can count 0000, 0001, 0010, 
1000, 1001, 1010, 1011, 1110, 1111, 0000, and 0001 and so on.

This is a **generic BCD** counter which reacts with **increasing pulses** of the 
clock signal. This behaviour is `different` from the usual `74LS94` devices 
that are used. This works on falling edges which allows you to build a 
multi-digit counter with fewer gates.