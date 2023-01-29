# Tri-State Bus driver

A tri-state bus driver is a digital circuit that allows multiple devices to 
share a common data bus while preventing conflicts. It works by allowing the 
output of a device to be placed in one of three states: a high logic level, a 
low logic level, or a high-impedance state. The high-impedance state is also 
known as a *floating* or *disconnected* state, and it allows other devices to 
drive the bus without interference from the first device.

The basic idea behind a tri-state bus driver is to *decouple* multiple devices 
from a shared data bus by allowing only one device at a time to drive the bus. 
This is done by using a control input, such as an "enable" signal, to determine 
which device is allowed to drive the bus at a given time. When the enable signal 
is active, the tri-state bus driver allows the device to drive the bus, and when 
the enable signal is inactive, the device's output is placed in the 
high-impedance state, preventing it from driving the bus.

