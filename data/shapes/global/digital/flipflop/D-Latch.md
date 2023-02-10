# D-FlipFlop

## Description

The D FlipFLop is widely used. It is also known as a 
*data* or *delay* flip-flop.

The D flip-flop captures the value of the `D` input 
at a definite portion of the clock cycle (such 
as the rising edge of the clock). That captured 
value becomes the `Q` output. At other times, the 
output Q does not change. The `D flip-flop` 
can be viewed as a memory cell, a zero-order hold, 
or a delay line.


## Logic table

| Clock        | D       |  **Q***next*   |
|:------------:|:-------:|:----------:|
| Rising edge  | Low     |  **Low**       |
| Rising edge  | High    |  **High**      |
| non rising   | *       |  **Q***last*   |

