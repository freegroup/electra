# Prewitt Filter

The Prewitt operator is used in image processing, particularly 
within edge detection algorithms. Technically, it is a discrete 
differentiation operator, computing an approximation of the 
gradient of the image intensity function. 

In simple terms, the operator calculates the gradient of the image 
intensity at each point, giving the direction of the largest possible 
increase from light to dark and the rate of change in that direction. 
The result therefore shows how "abruptly" or "smoothly" the image 
changes at that point, and therefore how likely it is that part of 
the image represents an edge, as well as how that edge is likely 
to be oriented. In practice, the magnitude (likelihood of an edge) 
calculation is more reliable and easier to interpret than the direction 
calculation.


[https://en.wikipedia.org/wiki/Prewitt_operator](https://en.wikipedia.org/wiki/Prewitt_operator)