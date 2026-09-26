import math

# Equilateral triangle setup
# Center of triangle at (500, 460)
# Side length L = 560
# Height H = L * math.sqrt(3) / 2 = 560 * 0.8660254 = 485.0
# Apex top: (500, 460 - 2/3 * H) = (500, 136.67) -> round to (500, 140)
# Bottom y: 140 + H = 625
# Bottom-left: (500 - L/2, 625) = (220, 625)
# Bottom-right: (500 + L/2, 625) = (780, 625)

# Uniform ribbon thickness perpendicular: W = 90
# Horizontal projection of W along horizontal edge: W_h = W / sin(60) = 90 / (sqrt(3)/2) = 103.92
# Vertical projection along vertical: W_v = W / cos(30) = 103.92
# Inner triangle vertices:
# Inward offset along 60-degree angle bisectors:
# From Apex (500, 140): moves straight down by W / sin(30) = W / 0.5 = 180
# Inner Apex = (500, 140 + 180) = (500, 320)
# From Bottom-left (220, 625):
# moves at 30 degrees (dx = 180 * cos(30) = 155.88, dy = -180 * sin(30) = -90)
# Inner Bottom-left = (220 + 155.88, 625 - 90) = (375.88, 535)
# From Bottom-right (780, 625):
# Inner Bottom-right = (780 - 155.88, 625 - 90) = (624.12, 535)

print("Outer triangle:", (500, 140), (780, 625), (220, 625))
print("Inner triangle:", (500, 320), (624.12, 535), (375.88, 535))

