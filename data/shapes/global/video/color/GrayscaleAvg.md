The Average Grayscale Converter is a method of converting a color image to a grayscale image. The conversion is performed by taking the average of the red, green, and blue color channels for each pixel in the image.

To convert an RGB image to grayscale using the average method, the red, green, and blue color values for each pixel in the image are added together, and then divided by three to get the average value. This average value is then used as the value for each of the red, green, and blue color channels for that pixel, resulting in a grayscale image.

This conversion can be implemented in code by first calculating the average value of the red, green, and blue color channels using the formula:

```
average = (pixels[red] + pixels[green] + pixels[blue])/3
```

where pixels[red], pixels[green], and pixels[blue] are the color values for each channel of a particular pixel.

Then, the red, green, and blue color values for that pixel are updated to the average value:

```
pixels[red] = average
pixels[green] = average
pixels[blue] = average
```

This process is repeated for each pixel in the image, resulting in a grayscale image where each pixel has the same value for the red, green, and blue color channels.