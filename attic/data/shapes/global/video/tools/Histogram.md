In an image processing context, the histogram of an image normally
refers to a histogram of the pixel intensity values. This histogram
is a graph showing the number of pixels in an image at each different
intensity value found in that image. For an 8-bit grayscale image
there are 256 different possible intensities, and so the histogram
will graphically display 256 numbers showing the distribution of
pixels amongst those grayscale values.

<br>
<br>
Histograms can also be taken
of color images --- either individual histograms of red, green and
blue channels can be taken, or a 3-D histogram can be produced,
with the three axes representing the red, blue and green channels,
and brightness at each point representing the pixel count.
The exact output from the operation depends upon the implementation
\-\-\- it may simply be a picture of the required histogram in a
suitable image format, or it may be a data file of some sort
representing the histogram statistics.