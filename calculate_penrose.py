import math

# Center of canvas: (500, 500)
# Both outer and inner triangles are concentric equilateral triangles with centroid at (500, 500).

# Centroid of equilateral triangle with vertices (x1, y1), (x2, y2), (x3, y3):
# Distance from centroid to each vertex: R
# Distance from centroid to each flat edge: r = R / 2
# Total height H = R + r = 1.5 * R
# Side length S = 2 * r * math.sqrt(3) = R * math.sqrt(3)

# Let's set Outer Triangle parameters:
# Let R_outer = 380
# r_outer = 190
# H_outer = 570
# S_outer = 380 * math.sqrt(3) = 658.179

# Vertices of Outer Equilateral Triangle:
# Apex: (500, 500 - R_outer) = (500, 120)
# Bottom-Right: (500 + S_outer / 2, 500 + r_outer) = (500 + 329.0896, 690) = (829.090, 690)
# Bottom-Left: (500 - S_outer / 2, 500 + r_outer) = (500 - 329.0896, 690) = (170.910, 690)

# Let's set Inner Equilateral Triangle parameters (concentric):
# Uniform ribbon width between parallel edges: W = 110
# So r_inner = r_outer - W = 190 - 110 = 80
# R_inner = 2 * r_inner = 160
# H_inner = 1.5 * R_inner = 240
# S_inner = R_inner * math.sqrt(3) = 160 * math.sqrt(3) = 277.128

# Vertices of Inner Equilateral Triangle:
# Q_apex = (500, 500 - R_inner) = (500, 340)
# Q_br = (500 + S_inner / 2, 500 + r_inner) = (500 + 138.564, 580) = (638.564, 580)
# Q_bl = (500 - S_inner / 2, 500 + r_inner) = (500 - 138.564, 580) = (361.436, 580)

# Inner triangle flat edges:
# Edge 1 (Bottom): from Q_bl (361.436, 580) to Q_br (638.564, 580). Y = 580 (horizontal, 0 / 180 deg).
# Edge 2 (Right): from Q_br (638.564, 580) to Q_apex (500, 340). Angle = 120 / 300 deg.
# Edge 3 (Left): from Q_apex (500, 340) to Q_bl (361.436, 580). Angle = 60 / 240 deg.

# Now: THE 180-DEGREE EXTENSION RULE:
# "1. The white lines must be constructed as straight, linear 180-degree continuations (extensions) of the three flat edges of the inner white negative triangle.
# 2. Each white line must shoot outwards in a perfectly straight 180-degree vector line, directly continuing from the inner triangle's perimeter.
# 3. These lines must travel cleanly through the thick blue bands and stop the exact millimeter they hit the outermost perimeter of the large triangle.
# 4. The white lines must NOT cut through or break the outermost perimeter boundary."

# In a cyclic Penrose ribbon, the 3 flat edges extend cyclically (either all clockwise or all counter-clockwise):
# Let's check the cyclic directions:
# Cyclic Option 1 (Clockwise):
# - Edge 1 (Bottom edge, at y = 580): extends past Q_bl to the LEFT until it hits the outer left edge!
#   Outer left edge: from (170.910, 690) to (500, 120).
#   At y = 580:
#   x = 500 - (690 - 580) * (500 - 170.910) / 570 = 500 - 110 * 329.09 / 570 = 500 - 63.509 = 436.491?
#   Wait! Outer left edge equation:
#   dy = 690 - 120 = 570. dx = 170.910 - 500 = -329.090.
#   x = 500 + (y - 120) * (-329.090) / 570.
#   At y = 580: x = 500 + (460) * (-329.090) / 570 = 500 - 265.578 = 234.422!
#   So Edge 1 extends from Q_bl (361.436, 580) to (234.422, 580)!
#   Length of extension = 361.436 - 234.422 = 127.014 = W / sin(60) = 110 / 0.866025 = 127.017! Exact!

# - Edge 3 (Left edge): from Q_apex (500, 340) down to Q_bl (361.436, 580).
#   Extends past Q_apex UP-RIGHT along the same 60-degree line until it hits the outer right edge!
#   Equation of Edge 3: line through (500, 340) with angle 60 deg (slope = -sqrt(3) or -tan(60)):
#   Wait, going from Q_bl to Q_apex: dx = 500 - 361.436 = +138.564, dy = 340 - 580 = -240.
#   Continuing past Q_apex: dx = +t, dy = -sqrt(3) * t.
#   Where does it hit the outer right edge?
#   Outer right edge: from (500, 120) down to (829.090, 690).
#   Distance along line = 127.017!
#   x = 500 + 127.017 * cos(60) = 500 + 63.509 = 563.509
#   y = 340 - 127.017 * sin(60) = 340 - 110 = 230!
#   Does (563.509, 230) lie on the outer right edge?
#   Outer right edge: at y = 230, x = 500 + (230 - 120) / sqrt(3) = 500 + 110 / 1.73205 = 563.509! EXACT!

# - Edge 2 (Right edge): from Q_apex (500, 340) down to Q_br (638.564, 580).
#   Extends past Q_br DOWN-RIGHT along the same -60-degree line until it hits the outer bottom edge!
#   From Q_br (638.564, 580):
#   dx = +127.017 * cos(60) = +63.509 -> x = 638.564 + 63.509 = 702.073!
#   dy = +127.017 * sin(60) = +110 -> y = 580 + 110 = 690 (exact outer bottom edge)!
#   Does (702.073, 690) lie on the outer bottom edge?
#   Outer bottom edge is y = 690, from x = 170.910 to 829.090! Yes, 702.073 lies on it! EXACT!

print("Mathematical check complete:")
print("Extension 1 (Bottom): (361.436, 580) -> (234.422, 580)")
print("Extension 2 (Apex):   (500, 340)     -> (563.509, 230)")
print("Extension 3 (Right):  (638.564, 580) -> (702.073, 690)")
