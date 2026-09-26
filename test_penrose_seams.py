import math

# Let's set up a standard equilateral triangle coordinate system centered at (500, 480):
# Center C = (500, 480)
# Side length of outer equilateral triangle: S_outer = 560
# Height H_outer = S_outer * math.sqrt(3) / 2 = 560 * 0.8660254037844386 = 484.9742261
# Center of equilateral triangle is at 2/3 height from apex, 1/3 height from base:
# Apex: (500, 480 - 2/3 * H_outer) = (500, 480 - 323.316) = (500, 156.68) -> let's round cleanly:
# Let Apex be (500, 160)
# Height H = 480
# Base Y = 160 + 480 = 640
# S_outer = 480 / (math.sqrt(3)/2) = 480 / 0.8660254037844386 = 554.256
# Half S_outer = 277.128
# Outer vertices:
# Top Apex P_top = (500, 160)
# Bottom-Right P_br = (500 + 277.128, 640) = (777.128, 640)
# Bottom-Left P_bl = (500 - 277.128, 640) = (222.872, 640)

# Now, let's calculate the inner equilateral triangle with uniform ribbon width W = 100:
# Ribbon width W = 100 (measured perpendicular to each of the 3 edges)
# Inner triangle is offset inward perpendicularly by W = 100 on all 3 sides:
# Inner Base Y: 640 - 100 = 540
# Inward offset along 60-degree corner bisectors: dist = W / sin(30) = 100 / 0.5 = 200
# Inner Apex Q_top: (500, 160 + 200) = (500, 360)
# Height of inner triangle: 540 - 360 = 180
# Side of inner triangle: S_inner = 180 / (math.sqrt(3)/2) = 207.846
# Half S_inner = 103.923
# Inner Bottom-Left Q_bl: (500 - 103.923, 540) = (396.077, 540)
# Inner Bottom-Right Q_br: (500 + 103.923, 540) = (603.923, 540)

print(f"Outer: Top={P_top}, BR={P_br}, BL={P_bl}")
print(f"Inner: Top={(500, 360)}, BR={(603.923, 540)}, BL={(396.077, 540)}")
