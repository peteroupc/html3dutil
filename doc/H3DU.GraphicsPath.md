# H3DU.GraphicsPath

[Back to documentation index.](index.md)

### H3DU.GraphicsPath() <a id='H3DU.GraphicsPath'></a>

Represents a two-dimensional path.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/path.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/path.js"></script>

#### Parameters

### Methods

* [arc](#H3DU.GraphicsPath_GraphicsPath_arc)<br>Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arc" method of the
HTML Canvas 2D Context.
* [arcSvgTo](#H3DU.GraphicsPath_GraphicsPath_arcSvgTo)<br>Adds path segments in the form of an elliptical arc to this path,
using the parameterization used by the SVG specification.
* [arcTo](#H3DU.GraphicsPath_GraphicsPath_arcTo)<br>Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arcTo" method of the
HTML Canvas 2D Context.
* [bezierCurveTo](#H3DU.GraphicsPath_GraphicsPath_bezierCurveTo)<br>Adds a cubic B&eacute;zier curve to this path starting
at this path's current position.
* [closePath](#H3DU.GraphicsPath_GraphicsPath_closePath)<br>Makes this path closed.
* [difference](#H3DU.GraphicsPath.GraphicsPath_difference)<br>Computes the difference between this path's shape and another
path's shape.
* [getBounds](#H3DU.GraphicsPath_GraphicsPath_getBounds)<br>Calculates an axis-aligned bounding box that tightly
fits this graphics path.
* [getCurves](#H3DU.GraphicsPath_GraphicsPath_getCurves)<br>Gets an object for the curves described by this path.
* [getLines](#H3DU.GraphicsPath_GraphicsPath_getLines)<br>Gets an array of line segments approximating
the path.
* [getPoints](#H3DU.GraphicsPath_GraphicsPath_getPoints)<br>Gets an array of points evenly spaced across the length
of the path.
* [getTriangles](#H3DU.GraphicsPath_GraphicsPath_getTriangles)<br>Converts the subpaths in this path to triangles.
* [intersection](#H3DU.GraphicsPath.GraphicsPath_intersection)<br>Computes the intersection, or the area common to both this path's shape
and another path's shape.
* [isIncomplete](#H3DU.GraphicsPath_GraphicsPath_isIncomplete)<br>Returns whether the curve path is incomplete
because of an error in parsing the curve string.
* [lineTo](#H3DU.GraphicsPath_GraphicsPath_lineTo)<br>Adds a line segment to the path, starting
at the path's end position, then
sets the end position to the end of the segment.
* [moveTo](#H3DU.GraphicsPath_GraphicsPath_moveTo)<br>Moves the current start position and end position to the given position.
* [pathLength](#H3DU.GraphicsPath_GraphicsPath_pathLength)<br>Finds the approximate length of this path.
* [quadraticCurveTo](#H3DU.GraphicsPath_GraphicsPath_quadraticCurveTo)<br>Adds a quadratic B&eacute;zier curve to this path starting
at this path's current position.
* [rect](#H3DU.GraphicsPath_GraphicsPath_rect)<br>Adds four lines in an axis-aligned rectangle shape to the path.
* [reverse](#H3DU.GraphicsPath_GraphicsPath_reverse)<br>Returns a path that reverses the course of this path.
* [toLinePath](#H3DU.GraphicsPath_GraphicsPath_toLinePath)<br>Creates a path in which curves and arcs are decomposed
to line segments.
* [toString](#H3DU.GraphicsPath_GraphicsPath_toString)<br>Returns this path in the form of a string in SVG path format.
* [transform](#H3DU.GraphicsPath_GraphicsPath_transform)<br>Returns a modified version of this path that is transformed
according to the given affine transform.
* [union](#H3DU.GraphicsPath.GraphicsPath_union)<br>Computes the combination of this path's shape with another
path's shape.
* [xor](#H3DU.GraphicsPath.GraphicsPath_xor)<br>Computes the shape contained in either this path or another path,
but not both.
* [fromString](#H3DU.GraphicsPath.fromString)<br>Creates a graphics path from a string whose format follows
the SVG specification.

### GraphicsPath#arc(x, y, radius, startAngle, endAngle, ccw) <a id='H3DU.GraphicsPath_GraphicsPath_arc'></a>

Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arc" method of the
HTML Canvas 2D Context.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the center of the circle that the arc forms a part of.
* `y` (Type: Number)<br>
    Y-coordinate of the circle's center.
* `radius` (Type: Number)<br>
    Radius of the circle.
* `startAngle` (Type: Number)<br>
    Starting angle of the arc, in radians. 0 means the positive X-axis, &pi;/2 means the positive Y-axis, &pi; means the negative X-axis, and &pi;\*1.5 means the negative Y-axis.
* `endAngle` (Type: Number)<br>
    Ending angle of the arc, in radians.
* `ccw` (Type: Boolean)<br>
    Whether the arc runs counterclockwise (assuming the X axis points right and the Y axis points down under the coordinate system).

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#arcSvgTo(rx, ry, rot, largeArc, sweep, x2, y2) <a id='H3DU.GraphicsPath_GraphicsPath_arcSvgTo'></a>

Adds path segments in the form of an elliptical arc to this path,
using the parameterization used by the SVG specification.

#### Parameters

* `rx` (Type: Number)<br>
    X-axis radius of the ellipse that the arc will be formed from.
* `ry` (Type: Number)<br>
    Y-axis radius of the ellipse that the arc will be formed from.
* `rot` (Type: Number)<br>
    Rotation of the ellipse in degrees (clockwise assuming the X axis points right and the Y axis points down under the coordinate system).
* `largeArc` (Type: Boolean)<br>
    In general, there are four possible solutions for arcs given the start and end points, rotation, and x- and y-radii. If true, chooses an arc solution with the larger arc length; if false, smaller.
* `sweep` (Type: Boolean)<br>
    If true, the arc solution chosen will run clockwise (assuming the X axis points right and the Y axis points down under the coordinate system); if false, counterclockwise.
* `x2` (Type: Number)<br>
    X-coordinate of the arc's end point.
* `y2` (Type: Number)<br>
    Y-coordinate of the arc's end point.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#arcTo(x1, y1, x2, y2, radius) <a id='H3DU.GraphicsPath_GraphicsPath_arcTo'></a>

Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arcTo" method of the
HTML Canvas 2D Context.

#### Parameters

* `x1` (Type: Number)<br>
    X-coordinate of a point that, along with the current end point, forms a tangent line. The point where the circle touches this tangent line is the start point of the arc, and if the point isn't the same as the current end point, this method adds a line segment connecting the two points. (Note that the start point of the arc is not necessarily the same as (x1, y1) or the current end point.)
* `y1` (Type: Number)<br>
    Y-coordinate of the point described under "x1".
* `x2` (Type: Number)<br>
    X-coordinate of a point that, along with the point (x1, y1), forms a tangent line. The point where the circle touches this tangent line is the end point of the arc. (Note that the end point of the arc is not necessarily the same as (x1, y1) or (x2, y2).) When this method returns, the current end point will be set to the end point of the arc.
* `y2` (Type: Number)<br>
    Y-coordinate of the point described under "x2".
* `radius` (Type: Number)<br>
    Radius of the circle the arc forms a part of.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#bezierCurveTo(x, y, x2, y2, x3, y3) <a id='H3DU.GraphicsPath_GraphicsPath_bezierCurveTo'></a>

Adds a cubic B&eacute;zier curve to this path starting
at this path's current position.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the curve's first control point.
* `y` (Type: Number)<br>
    X-coordinate of the curve's first control point.
* `x2` (Type: Number)<br>
    Y-coordinate of the curve's second control point.
* `y2` (Type: Number)<br>
    Y-coordinate of the curve's second control point.
* `x3` (Type: Number)<br>
    X-coordinate of the curve's end point.
* `y3` (Type: Number)<br>
    Y-coordinate of the curve's end point.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#closePath() <a id='H3DU.GraphicsPath_GraphicsPath_closePath'></a>

Makes this path closed. Adds a line segment to the
path's start position, if necessary.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### (static) GraphicsPath#difference(path, [flatness]) <a id='H3DU.GraphicsPath.GraphicsPath_difference'></a>

Computes the difference between this path's shape and another
path's shape. The points given in the H3DU.GraphicsPath#union method
apply to this method.

#### Parameters

* `path` (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)<br>
    A path to combine with this one.
* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

The difference between this path
and the other path. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#getBounds() <a id='H3DU.GraphicsPath_GraphicsPath_getBounds'></a>

Calculates an axis-aligned bounding box that tightly
fits this graphics path.

#### Return Value

An array of four numbers
describing the bounding box. The first two are
the lowest X and Y coordinates, and the last two are
the highest X and Y coordinates. If the path is empty,
returns the array (Infinity, Infinity, -Infinity, -Infinity). (Type: Array.&lt;Number>)

### GraphicsPath#getCurves([flatness]) <a id='H3DU.GraphicsPath_GraphicsPath_getCurves'></a>

Gets an object for the curves described by this path.
The resulting object can be used to retrieve the points
that lie on the path or as a parameter for one of
the <a href="H3DU.CurveEval.md">H3DU.CurveEval</a> methods, in the
<a href="CurveTube.md">CurveTube</a> class, or any other class that
accepts parametric curves.

The return value doesn't track changes to the path.

#### Parameters

* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments for the purpose of calculating their length, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1. This is only used to make the arc-length parameterization more accurate if the path contains curves or arcs.

#### Return Value

An object that implements
the following methods:<ul>
<li><code>getCurves()</code> - Returns a list of curves described
by this path. The list will contain one object for each disconnected
portion of the path. For example, if the path contains one polygon, the list will contain
one curve object. And if the path is empty, the list will be empty too.

Each object will have the following methods:<ul>
<li><code>getLength()</code> - Returns the approximate total length of the curve,
in units.
<li><code>evaluate(u)</code> - Takes one parameter, "u", which
ranges from 0 to 1, depending on how far the point is from the start or
the end of the path (similar to arc-length parameterization).
The function returns a 3-element array containing
the X, Y, and Z coordinates of the point lying on the curve at the given
"u" position (however, the z will always be 0 since paths can currently
only be 2-dimensional).
</ul>
<li><code>getLength()</code> - Returns the approximate total length of the path,
in units.
<li><code>evaluate(u)</code> - Has the same effect as the "evaluate"
method for each curve, but applies to the path as a whole.
Note that calling this "evaluate" method is only
recommended when drawing the path as a set of points, not lines, since
the path may contain several disconnected parts.
</ul> (Type: Object)

### GraphicsPath#getLines([flatness]) <a id='H3DU.GraphicsPath_GraphicsPath_getLines'></a>

Gets an array of line segments approximating
the path.

#### Parameters

* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

Array of line segments.
Each line segment is an array of four numbers: the X and
Y coordinates of the start point, respectively, then the X and
Y coordinates of the end point, respectively. (Type: Array.&lt;Array.&lt;Number>>)

### GraphicsPath#getPoints(numPoints, [flatness]) <a id='H3DU.GraphicsPath_GraphicsPath_getPoints'></a>

Gets an array of points evenly spaced across the length
of the path.

#### Parameters

* `numPoints` (Type: Number)<br>
    Number of points to return.
* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments for the purpose of calculating their length, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

Array of points lying on
the path and evenly spaced across the length of the path,
starting and ending with the path's endpoints. Returns
an empty array if <i>numPoints</i> is less than 1. Returns
an array consisting of the start point if <i>numPoints</i>
is 1. (Type: Array.&lt;Array.&lt;Number>>)

### GraphicsPath#getTriangles([flatness]) <a id='H3DU.GraphicsPath_GraphicsPath_getTriangles'></a>

Converts the subpaths in this path to triangles.
Treats each subpath as a polygon even if it isn't closed.
Each subpath should not contain self-intersections or
duplicate vertices, except duplicate vertices that appear
consecutively or at the start and end.

The path can contain holes. In this case, subpaths
whose winding order (counterclockwise or clockwise)
differs from the first subpath's winding order can be holes.

#### Parameters

* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

Array of six-element
arrays each describing a single triangle. For each six-element
array, the first two, next two, and last two numbers each
describe a vertex position of that triangle (X and Y coordinates
in that order). (Type: Array.&lt;Array.&lt;Number>>)

### (static) GraphicsPath#intersection(path, [flatness]) <a id='H3DU.GraphicsPath.GraphicsPath_intersection'></a>

Computes the intersection, or the area common to both this path's shape
and another path's shape. The points given in the H3DU.GraphicsPath#union method
apply to this method.

#### Parameters

* `path` (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)<br>
    A path to combine with this one.
* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

A path whose shape is contained in
both paths. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#isIncomplete() <a id='H3DU.GraphicsPath_GraphicsPath_isIncomplete'></a>

Returns whether the curve path is incomplete
because of an error in parsing the curve string.
This flag will be reset if a moveTo command,
closePath command, or another path segment
is added to the path.

#### Return Value

Return value. (Type: Boolean)

### GraphicsPath#lineTo(x, y) <a id='H3DU.GraphicsPath_GraphicsPath_lineTo'></a>

Adds a line segment to the path, starting
at the path's end position, then
sets the end position to the end of the segment.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the end of the line segment.
* `y` (Type: Number)<br>
    Y-coordinate of the end of the line segment.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#moveTo(x, y) <a id='H3DU.GraphicsPath_GraphicsPath_moveTo'></a>

Moves the current start position and end position to the given position.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the position.
* `y` (Type: Number)<br>
    Y-coordinate of the position.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#pathLength([flatness]) <a id='H3DU.GraphicsPath_GraphicsPath_pathLength'></a>

Finds the approximate length of this path.

#### Parameters

* `flatness` (Type: Number) (optional)<br>
    No longer used by this method.

#### Return Value

Approximate length of this path
in units. (Type: Number)

### GraphicsPath#quadraticCurveTo(x, y, x2, y2) <a id='H3DU.GraphicsPath_GraphicsPath_quadraticCurveTo'></a>

Adds a quadratic B&eacute;zier curve to this path starting
at this path's current position.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of the curve's control point.
* `y` (Type: Number)<br>
    Y-coordinate of the curve's control point.
* `x2` (Type: Number)<br>
    X-coordinate of the curve's end point.
* `y2` (Type: Number)<br>
    Y-coordinate of the curve's end point.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#rect(x, y, width, height) <a id='H3DU.GraphicsPath_GraphicsPath_rect'></a>

Adds four lines in an axis-aligned rectangle shape to the path.

#### Parameters

* `x` (Type: Number)<br>
    X-coordinate of a corner of the rectangle.
* `y` (Type: Number)<br>
    Y-coordinate of a corner of the rectangle.
* `width` (Type: Number)<br>
    X-offset (width) to another corner of the rectangle.
* `height` (Type: Number)<br>
    Y-offset (height) to another corner of the rectangle.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#reverse() <a id='H3DU.GraphicsPath_GraphicsPath_reverse'></a>

Returns a path that reverses the course of this path.

#### Return Value

A GraphicsPath
object with its path segments reversed. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#toLinePath([flatness]) <a id='H3DU.GraphicsPath_GraphicsPath_toLinePath'></a>

Creates a path in which curves and arcs are decomposed
to line segments.

#### Parameters

* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

A path consisting only of line
segments and close commands. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### GraphicsPath#toString() <a id='H3DU.GraphicsPath_GraphicsPath_toString'></a>

Returns this path in the form of a string in SVG path format.
See <a href="H3DU.GraphicsPath.md#H3DU.GraphicsPath.fromString">H3DU.GraphicsPath.fromString</a>.

#### Return Value

A string describing the path in the SVG path
 format. (Type: String)

### GraphicsPath#transform(trans) <a id='H3DU.GraphicsPath_GraphicsPath_transform'></a>

Returns a modified version of this path that is transformed
according to the given affine transform.

#### Parameters

* `trans` (Type: Array.&lt;Number>)<br>
    An array of six numbers describing a 2-dimensional affine transformation. For each point in the current path, its new X coordinate is `trans[0] \* X + trans[2] \* Y + trans[4]`, and its new Y coordinate is `trans[1] \* X + trans[3] \* Y + trans[5]`.

#### Return Value

The transformed version of this path. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### (static) GraphicsPath#union(path, [flatness]) <a id='H3DU.GraphicsPath.GraphicsPath_union'></a>

Computes the combination of this path's shape with another
path's shape. The following points apply to this method:<ul>
<li>This method treats unclosed subpaths as implicitly closed
by connecting their endpoints with their start points.
<li>Currently, the algorithm supports only polygons made up
of line segments, so curves and arcs are converted to line
segments before applying the operation.
<li>Each polygon can be concave or have self-intersections
or holes. Subpaths that are holes have the opposite winding
order (clockwise or counterclockwise) from the subpath
that contains them.
<li>To use this method, you must include the script "extras/pathclip.js";
this is in addition to "extras/pathclip.js". Example:

    <script type="text/javascript" src="extras/path.js"></script>
    <script type="text/javascript" src="extras/pathclip.js"></script>

</ul>

#### Parameters

* `path` (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)<br>
    A path to combine with this one.
* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

The union of the two paths. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### (static) GraphicsPath#xor(path, [flatness]) <a id='H3DU.GraphicsPath.GraphicsPath_xor'></a>

Computes the shape contained in either this path or another path,
but not both. The points given in the H3DU.GraphicsPath#union method
apply to this method.

#### Parameters

* `path` (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)<br>
    A path to combine with this one.
* `flatness` (Type: Number) (optional)<br>
    When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null or omitted, default is 1.

#### Return Value

A path whose shape is contained in
only one of the two paths. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

### (static) H3DU.GraphicsPath.fromString(str) <a id='H3DU.GraphicsPath.fromString'></a>

Creates a graphics path from a string whose format follows
the SVG specification.

#### Parameters

* `str` (Type: String)<br>
    A string, in the SVG path format, representing a two-dimensional path. An SVG path consists of a number of path segments, starting with a single letter, as follows: <ul> <li>M/m (x y) - Moves the current position to (x, y). Further XY pairs specify line segments. <li>L/l (x y) - Specifies line segments to the given XY points. <li>H/h (x) - Specifies horizontal line segments to the given X points. <li>V/v (y) - Specifies vertical line segments to the given Y points. <li>Q/q (cx cx x y) - Specifies quadratic B&eacute;zier curves (see quadraticCurveTo). <li>T/t (x y) - Specifies quadratic curves tangent to the previous quadratic curve. <li>C/c (c1x c1y c2x c2y x y) - Specifies cubic B&eacute;zier curves (see bezierCurveTo). <li>S/s (c2x c2y x y) - Specifies cubic curves tangent to the previous cubic curve. <li>A/a (rx ry rot largeArc sweep x y) - Specifies arcs (see arcSvgTo). "largeArc" and "sweep" are flags, "0" for false and "1" for true. "rot" is in degrees. <li>Z/z - Closes the current path; similar to adding a line segment to the first XY point given in the last M/m command. </ul> Lower-case letters mean any X and Y coordinates are relative to the current position of the path. Each group of parameters can be repeated in the same path segment. Each parameter after the starting letter is separated by whitespace and/or a single comma, and the starting letter can be separated by whitespace. This separation can be left out as long as doing so doesn't introduce ambiguity. All commands set the current point to the end of the path segment (including Z/z, which adds a line segment if needed).

#### Return Value

The resulting path. If an error
occurs while parsing the path, the path's "isIncomplete() method
will return <code>true</code>. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

#### Example

The following example creates a graphics path
from an SVG string describing a polyline.

    var path=GraphicsPath.fromString("M10,20L40,30,24,32,55,22")
