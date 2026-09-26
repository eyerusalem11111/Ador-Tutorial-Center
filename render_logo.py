import subprocess

svg_content = '''<svg viewBox="0 0 1000 1000" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="1000" fill="white" />
  <g fill="#0054B6">
    <!-- Emblem Polygon -->
    <!-- 
      Trace:
      Start at top-left of horizontal bar (270, 500)
      -> (212, 600) bottom-left of horizontal bar
      -> (620, 600) bottom-right of horizontal bar / junction with right leg
      -> (655, 638) inner curve of descending right leg
      -> (685, 646) lowest point of rounded terminal
      -> (735, 625) outer curve of rounded terminal
      -> (760, 595) outer right edge curve
      -> (485, 202) outer apex top-right
      -> (455, 202) outer apex top-left
      -> (324, 482) bottom-left of upper-left arm
      -> (424, 482) bottom-right of upper-left arm
      -> (498, 354) inner apex top
      -> (580, 500) inner triangle bottom-right
      -> (420, 500) inner triangle bottom-left
      -> (270, 500) close to start
    -->
    <path d="
      M 270 500
      L 228 600
      L 622 600
      L 658 638
      C 672 648, 698 646, 718 632
      C 736 618, 746 596, 762 562
      L 582 202
      L 462 202
      L 324 480
      L 444 480
      L 516 352
      L 582 500
      Z
    " />
  </g>
  <text 
    x="500" 
    y="725" 
    text-anchor="middle" 
    font-family="Arial, Helvetica, 'Plus Jakarta Sans', sans-serif" 
    font-size="62" 
    font-weight="bold" 
    fill="#0054B6"
    letter-spacing="-0.5"
  >Ador Tutorial Center</text>
</svg>'''

with open('public/ador-logo.svg', 'w') as f:
    f.write(svg_content)

print("Saved public/ador-logo.svg")
