# Average Grayscale Converter

The average method is the most simple color to grayscale method. You just 
have to take the average of three colors. Since its an RGB image, so it means 
that you have add r with g with b and then divide it by 3 to get your 
desired grayscale image.

Its done in this way.

```math

average = (pixels[red] + pixels[green] + pixels[blue])/3

pixels[red]   = average
pixels[green] = average
pixels[blue]  = average

``` 