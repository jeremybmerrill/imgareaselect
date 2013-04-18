collision resolution in two-dimensions with N axis-oriented rectangles

collision resolution in two-dimensions with axis-oriented rectangles is the simplest case of collision resolution.


Consider a situation where an arbitrary set of rectangles exist within a defined 2D plane, but may not overlap each other or exit the plane on any axis. This is the situation I faced with imgAreaSelect for Tabula (TK rephrase). 


The most basic case is just two rectangles, in an infinite plane, one of which is being moved or resized (the dynamic rectangle, *D*) and one of which is not (the static rectangle, *S*.) To determine if there's a collision, check if the dynamic rectangle's ...

To resolve that collision, find the axis and direction in which the infringement is least. Temporarily forget about the Y axis. If S infringes on a side, then if S's left edge is farther from D's right edge than S's right edge is from D's left edge, then move S to the left; otherwise to the right. In pseudocode form, for a rectangle whose x2 > x1:

`
  if D.infringes(S)
    infringement_from_the_left = D.x2 - S.x1
    infringement_from_the_right = S.x2 - D.x1

    if infringement_from_the_left < infringement_from_the_right
      //move right
    else
      //move left.
`

Reintegrating the Y-axis (or even adding in a Z-axis, or arbitrary additional axes) is easy. Just find the minimum of the x-axis infringement and the y-axis, and move in that direction.

The way to generalize to N static rectangles is to find a way to simplify the multiple rectangle situation into a two-rectangle situation. Define S' as the minimum bounding box of S -- the first rectangle with which S collides -- and any other rectangles within D + S on the infringing axis/axes. For each S', define S'' by the same procedure (i.e. recursively) to be the minimum bounding box of S' and any rectangles within D's dimensions of S', and then repeat, with S'' as S'. Resolve D's collision with the final S' as described above.