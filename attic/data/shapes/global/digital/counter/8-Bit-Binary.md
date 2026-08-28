A 8-bit binary counter is a digital circuit that counts upward in binary
(base 2) from 0 to 255 and then resets to 0.

It does this by using
eight flip-flops, each of which represents a bit in the binary number.
Each time a pulse is applied to the counter, the value of the least
significant bit (bit 0) changes from 0 to 1 and all the bits to the left
of it shift over one place.

Once the 8-bit counter reaches its maximum value of 255 (11111111 in binary), the
next pulse causes it to reset to 0 (00000000 in binary). It can be used to create
various sequences of counting, frequency division, time keeping and many other
applications.