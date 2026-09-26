import math

# We want a 1000x1000 viewBox coordinate system for pristine rendering:
# Center = 500, 500
#
# Primary color: #0054B6
#
# Let's define the points of the emblem:
# The emblem is an equilateral delta / Mobius "A"
# Standard angle = 60 degrees.
# tan(60 deg) = sqrt(3) ~= 1.7320508
# cot(60 deg) = 1/sqrt(3) ~= 0.5773503
#
# 1. Apex top flat edge:
# Height: y_top = 200
# Width of top flat edge = 130
# Centered at x = 525 (since the right leg extends further to the right)
# x_top_left = 460
# x_top_right = 585
#
# 2. Outer left edge:
# From (460, 200) down to y_cut_top = 480
# dx = (480 - 200) * cot(60 deg) = 280 * 0.57735 = 161.66
# x_cut_outer = 460 - 161.66 = 298.34
#
# 3. Cut at bottom of left arm:
# Horizontal cut from x = 298.34 to inner left edge at y = 480
# Ribbon width: let width measured perpendicular be W = 100
# Horizontal width along horizontal line = W / sin(60 deg) = 100 / 0.866025 = 115.47
# So x_cut_inner = 298.34 + 115.47 = 413.81
#
# 4. Inner left edge of left arm:
# From (413.81, 480) up to inner apex
# dy = inner apex y. Let inner apex be at y = 350
# dx = (480 - 350) * cot(60 deg) = 130 * 0.57735 = 75.05
# x_inner_apex = 413.81 + 75.05 = 488.86
#
# 5. Inner right edge of right arm:
# From (488.86, 350) down to inner bottom-right at y_inner_base = 500
# dy = 500 - 350 = 150
# dx = 150 * cot(60 deg) = 86.60
# x_inner_br = 488.86 + 86.60 = 575.46
#
# 6. Horizontal bar:
# Gap height = 20px (from y = 480 to y = 500)
# Top edge of horizontal bar is at y = 500!
# Notice: the inner triangle base is on y = 500!
# From x_cut_inner at y=480 down to y=500:
# Inner triangle bottom-left is at (x = 488.86 - 150*0.57735 = 402.26, y = 500)!
# Top edge of horizontal bar extends from left tip across to x_inner_br (575.46, 500).
# Height of horizontal bar = 100px (from y = 500 to y = 600).
# Left edge of horizontal bar:
# It starts at the left, protruding past the left arm:
# Let top-left of horizontal bar be at (270, 500)
# Left edge slants at 60 deg:
# Bottom-left of horizontal bar is at (270 - 100*cot(60), 600) = (270 - 57.74, 600) = (212.26, 600)
#
# 7. Bottom edge of horizontal bar:
# From (212.26, 600) horizontally to where it meets the right leg!
#
# 8. Right leg:
# Outer right edge:
# From (585, 200) down at -60 deg to the bottom-right terminal!
# dy to bottom = 645 - 200 = 445
# dx = 445 * cot(60 deg) = 256.92
# x_outer_bottom = 585 + 256.92 = 841.92
# Wait! Let's check width of right arm:
# Horizontal width along horizontal line = 115.47
# Inner right edge continues down from (575.46, 500) at -60 deg:
# At y = 600 (bottom of horizontal bar):
# x = 575.46 + 100 * cot(60 deg) = 575.46 + 57.74 = 633.20
# So bottom edge of horizontal bar runs from x = 212.26 to x = 620!
# And the right leg continues down below y = 600 to y = 645!
# At bottom (around y = 645), it has a smooth rounded terminal!
print("Calculation logic parsed")
