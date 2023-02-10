# Luminance Conversion

One of the most frequently applied low-level operations
in computer vision is the conversion of an RGB camera image into its luminance 
representation. This is also one of the most incorrectly applied operations. 

```math
luminance = 0.2126*pixel[red] + 0.7152*pixel[green] + 0.0722*pixel[blue];

pixel[red]   = luminance;
pixel[green] = luminance;
pixel[blue]  = luminance;

```