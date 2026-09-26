import math

# We will generate a mathematically flawless SVG asset centered in 1000x1000 viewBox:
# Center of canvas: (500, 500)
#
# Outer equilateral triangle pointing UP:
# Centroid: (500, 500)
# R_outer = 380 (distance from centroid to apex)
# r_outer = 190 (distance from centroid to bottom base)
# Total height H_outer = 570
# Half base = S_outer / 2 = r_outer * sqrt(3) = 190 * 1.7320508075688772 = 329.0896534
#
# Outer Vertices:
# Apex: (500, 120)
# Bottom-Right: (500 + 329.08965, 690) = (829.090, 690)
# Bottom-Left:  (500 - 329.08965, 690) = (170.910, 690)
#
# Inner equilateral triangle:
# To maintain uniform ribbon width W = 110:
# r_inner = r_outer - W = 190 - 110 = 80
# R_inner = 2 * r_inner = 160
# Half base inner = r_inner * sqrt(3) = 80 * 1.7320508075688772 = 138.5640646
#
# Inner Vertices:
# Q_apex: (500, 500 - 160) = (500, 340)
# Q_br:   (500 + 138.56406, 500 + 80) = (638.564, 580)
# Q_bl:   (500 - 138.56406, 500 + 80) = (361.436, 580)
#
# Flat Edges of Inner Triangle:
# 1. Base edge: from Q_bl (361.436, 580) to Q_br (638.564, 580) at y = 580.
# 2. Right edge: from Q_br (638.564, 580) to Q_apex (500, 340).
# 3. Left edge: from Q_apex (500, 340) to Q_bl (361.436, 580).
#
# The 180-degree continuous extensions:
# Seam width: 14px (clean crisp negative space channel)
# Extension 1 (Linear 180-degree continuation of bottom flat edge y=580):
# Extends past Q_bl to the left, stopping exactly at the outer left edge at (234.422, 580)!
# From x = 361.436 to x = 234.422 at y = 580.
#
# Extension 2 (Linear 180-degree continuation of left flat edge at 60 degrees):
# Extends past Q_apex up-right, stopping exactly at the outer right edge at (563.509, 230)!
# From (500, 340) to (563.509, 230).
#
# Extension 3 (Linear 180-degree continuation of right flat edge at -60 degrees):
# Extends past Q_br down-right, stopping exactly at the outer bottom edge at (702.073, 690)!
# From (638.564, 580) to (702.073, 690).

# Note on "stopping the exact pixel it hits the outermost perimeter":
# Since stroke width has thickness (e.g. 14px), if drawn as a stroke with linecap="butt",
# it touches the outer edge and inner triangle perfectly without protruding!
# Or even cleaner: we clip to the outer triangle path so it can NEVER breach the perimeter!
# Let's verify this clipping mask and path.

print("Coordinates calculated!")
