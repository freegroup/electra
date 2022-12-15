## Color Inversion

Colour inversion, also known as the negative effect, is one of the easiest 
effects to achieve in image processing. Colour inversion is achieved by 
subtracting each RGB colour value from the maximum possible value (usually 255).


Inversion can be necessary to perform some operations such as morphological 
operations. For example, erosion shrinks the boundaries of white/foreground 
regions so it matters which pixels are white/foreground.