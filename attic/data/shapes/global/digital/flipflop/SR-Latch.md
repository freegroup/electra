An **SR latch** (Set/Reset) is an asynchronous device: it works independently of control signals and relies only on the state of the S and R inputs.

When a *high* input is applied to the *Set* line of an SR latch, the *Q* output goes high (and Q low). The feedback mechanism, however, means that the *Q* output will remain high, even when the *S* input goes low again. This is how the latch serves as a memory device. 

Conversely, a *high* input on the *Reset* line will drive the *Q* output low (and *Q* high), effectively resetting the latch's "memory". When both inputs are low, the latch "latches" – it remains in its previously set or reset state.