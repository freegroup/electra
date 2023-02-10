## HSV-Colorspace Converter

Unlike RGB, HSV separates luma, or the image intensity, from chroma or the 
color information. This is very useful in many applications. For example, 
if you want to do histogram equalization of a color image, you probably want 
to do that only on the intensity component, and leave the color components 
alone. Otherwise you will get very strange colors.

In computer vision you often want to separate color components from intensity 
for various reasons, such as **robustness to lighting changes**, or removing 
shadows.