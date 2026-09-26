import math

# Case 1: Outer triangle pointing UP, Inner triangle pointing UP (concentric):
# Uniform bands: Yes, the distance between outer edge and inner edge is constant W everywhere!
# Outer:
# Apex: (500, 140)
# Bottom-Right: (800, 660)
# Bottom-Left: (200, 660)
# S_outer = 600, H_outer = 600 * sqrt(3) / 2 = 519.6
# Distance between edges = W = 100.
# Inner triangle also points UP:
# Base Y = 660 - 100 = 560
# Inner Apex = (500, 140 + 100 / sin(30)) = (500, 340)
# Extensions:
# 1. Base edge extends horizontally
# 2. Left edge extends at 60 degrees
# 3. Right edge extends at -60 degrees
# Notice: Each inner edge is parallel to the corresponding outer edge!
# Extending the inner edge straight out (180-degree continuation of the flat edge)
# travels parallel to the outer edge, through the adjacent blue band, hitting the other outer edge!

# Case 2: What if Inner triangle is INVERTED (pointing DOWN)?
# If inner triangle points DOWN:
# Top edge: horizontal
# Apex: pointing DOWN at bottom center.
# If inner triangle points down, the space inside the triangle is inverted (like in a Sierpinski triangle or triforce!).
# In a Sierpinski triangle:
# The center is an inverted triangle with vertices at midpoints:
# (500, 660) [bottom apex], (350, 400) [top left], (650, 400) [top right].
# BUT the bands are triangular corners, not uniform bands of equal thickness.

# Wait, why did the user write:
# "The gap between the outer blue triangle and inner white triangle creates three thick, uniform blue bands of equal thickness."
# This proves geometrically that the inner triangle has its edges parallel to the outer triangle, because only parallel edges create "three thick, uniform blue bands of equal thickness"!

print("Geometry analyzed")
