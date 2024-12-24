# H3DU.GraphicsPath

[Back to documentation index.](index.md)

<a name='H3DU.GraphicsPath'></a>
### new H3DU.GraphicsPath()

Represents a two-dimensional path.
A path is a collection of two-dimensional line segments and/or curves. Many paths describe
closed figures or connected sequences of lines and curves. Specifically, a path is made up
of straight line segments, elliptical arcs, quadratic B&eacute;zier curves,
cubic B&eacute;zier curves, or any combination of these, and
the path can be discontinuous and/or contain closed parts.
<h4>Creating Paths</h4>

There are two ways to create paths: using an SVG path string (see <a href="H3DU.GraphicsPath.md#H3DU.GraphicsPath.fromString">H3DU.GraphicsPath.fromString</a>), or by calling methods that add its segments.

A `GraphicsPath` object stores a current position and a starting position, and many methods don't have you specify a starting position, to cover the common case of drawing a series of connected lines and curves.
_.moveTo(x, y)_ - Moves the starting position and current position.
_.lineTo(x, y)_ - Adds a line segment from the current position to a new ending position.
_.closePath()_ - Closes the path by drawing a line to the starting point, if needed.
<h4>Path Segments</h4>
Each path can include a number of line segments, B&eacute;zier curves, and elliptical arcs.
Line segments are relatively easy to understand. The other two kinds of segments
deserve some discussion.
A _B&eacute;zier curve_ is a parametric curve based on a polynomial formula. In this kind of
curve the endpoints are defined as they are, but the other points define
the shape of the curve and generally don't cross the curve.
A quadratic B&eacute;zier curve uses 3 points. A cubic B&eacute;zier
curve uses 4 points.
An _elliptical arc_ is a curve which forms part of an ellipse. There are several ways to
parameterize an elliptical arc, as seen in the _.arc()_, _.arcTo()_, and _.arcSvgTo()_ methods
of the `GraphicsPath` class.

### Methods

* [arc](#H3DU.GraphicsPath_arc)<br>Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arc" method of the
HTML Canvas 2D Context.
* [arcShape](#H3DU.GraphicsPath_arcShape)<br>Adds path segments to this path that form an arc running along an axis-aligned
ellipse, or a shape based on that arc and ellipse, given the ellipse's center
and dimensions, start angle, and sweep angle.
* [arcShapeForBox](#H3DU.GraphicsPath_arcShapeForBox)<br>Adds path segments to this path that form an arc running along an axis-aligned
ellipse, or a shape based on that arc and ellipse, given the ellipse's corner point
and dimensions, start angle, and sweep angle.
* [arcSvgTo](#H3DU.GraphicsPath_arcSvgTo)<br>Adds path segments in the form of an elliptical arc to this path,
using the parameterization used by the SVG specification.
* [arcTo](#H3DU.GraphicsPath_arcTo)<br>Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arcTo" method of the
HTML Canvas 2D Context.
* [arrow](#H3DU.GraphicsPath_arrow)<br>Adds path segments to this path in the form of an arrow shape.
* [bevelRect](#H3DU.GraphicsPath_bevelRect)<br>Adds path segments to this path that form an axis-aligned rectangle with beveled corners.
* [bezierCurveTo](#H3DU.GraphicsPath_bezierCurveTo)<br>Adds a cubic B&eacute;zier curve to this path starting
at this path's current position.
* [closePath](#H3DU.GraphicsPath_closePath)<br>Makes this path closed.
* [difference](#H3DU.GraphicsPath_difference)<br>Computes the difference between this path's shape and another
path's shape.
* [ellipse](#H3DU.GraphicsPath_ellipse)<br>Adds path segments to this path that form an axis-aligned ellipse given its center
and dimensions.
* [ellipseForBox](#H3DU.GraphicsPath_ellipseForBox)<br>Adds path segments to this path that form an axis-aligned ellipse, given the ellipse's corner point
and dimensions.
* [fromString](#H3DU.GraphicsPath.fromString)<br>Creates a graphics path from a string whose format follows
the SVG (Scalable Vector Graphics) specification.
* [getBounds](#H3DU.GraphicsPath_getBounds)<br>Calculates an axis-aligned bounding box that tightly
fits this graphics path.
* [getCurrentPoint](#H3DU.GraphicsPath_getCurrentPoint)<br>Gets the current point stored in this path.
* [getCurves](#H3DU.GraphicsPath_getCurves)<br>Gets a curve evaluator object for
the curves described by this path.
* [getLinePoints](#H3DU.GraphicsPath_getLinePoints)<br>Gets an array of the end points of
line segments approximating the path.
* [getLinePointsAsObjects](#H3DU.GraphicsPath_getLinePointsAsObjects)<br>Gets an array of the end points of
line segments approximating the path.
* [getLines](#H3DU.GraphicsPath_getLines)<br>Gets an array of line segments approximating
the path.
* [getPoints](#H3DU.GraphicsPath_getPoints)<br>Gets an array of points evenly spaced across the length
of the path.
* [getPointsAsObjects](#H3DU.GraphicsPath_getPointsAsObjects)<br>Gets an array of points evenly spaced across the length
of the path.
* [getSubpaths](#H3DU.GraphicsPath_getSubpaths)<br>TODO: Not documented yet.
* [getTriangles](#H3DU.GraphicsPath_getTriangles)<br>Converts the subpaths in this path to triangles.
* [interpolate](#H3DU.GraphicsPath_interpolate)<br>Does a linear interpolation between two graphics paths.
* [intersection](#H3DU.GraphicsPath_intersection)<br>Computes the intersection, or the area common to both this path's shape
and another path's shape.
* [isIncomplete](#H3DU.GraphicsPath_isIncomplete)<br>Returns whether the curve path is incomplete
because of an error in parsing the curve string.
* [line](#H3DU.GraphicsPath_line)<br>Adds a line segment to this path.
* [lineTo](#H3DU.GraphicsPath_lineTo)<br>Adds a line segment to the path, starting
at the path's end position, then
sets the end position to the end of the segment.
* [merge](#H3DU.GraphicsPath_merge)<br>Merges the path segments in another path onto this one.
* [moveTo](#H3DU.GraphicsPath_moveTo)<br>Moves the current start position and end position to the given position.
* [pathLength](#H3DU.GraphicsPath_pathLength)<br>Finds the approximate length of this path.
* [polyline](#H3DU.GraphicsPath_polyline)<br>Adds path segments to this path that form a polygon or a connected line segment strand.
* [quadraticCurveTo](#H3DU.GraphicsPath_quadraticCurveTo)<br>Adds a quadratic B&eacute;zier curve to this path starting
at this path's current position.
* [rect](#H3DU.GraphicsPath_rect)<br>Adds path segments to this path that form an axis-aligned rectangle.
* [regularPolygon](#H3DU.GraphicsPath_regularPolygon)<br>Adds path segments to this path that form a regular polygon.
* [regularStar](#H3DU.GraphicsPath_regularStar)<br>Adds path segments to this path that form a regular N-pointed star.
* [reverse](#H3DU.GraphicsPath_reverse)<br>Returns a path that reverses the course of this path.
* [roundRect](#H3DU.GraphicsPath_roundRect)<br>Adds path segments to this path that form an axis-aligned rounded rectangle.
* [toCurvePath](#H3DU.GraphicsPath_toCurvePath)<br>Creates a path in which arcs are decomposed
to cubic B&eacute;zier curves (which will approximate those arcs).
* [toExtrudedMeshBuffer](#H3DU.GraphicsPath_toExtrudedMeshBuffer)<br>Generates a mesh buffer consisting of "walls" that follow this graphics path approximately, and, optionally, a base and toop.
* [toLineMeshBuffer](#H3DU.GraphicsPath_toLineMeshBuffer)<br>Generates a mesh buffer consisting of the approximate line segments that make up this graphics path.
* [toLinePath](#H3DU.GraphicsPath_toLinePath)<br>Creates a path in which curves and arcs are decomposed
to line segments.
* [toMeshBuffer](#H3DU.GraphicsPath_toMeshBuffer)<br>TODO: Not documented yet.
* [toString](#H3DU.GraphicsPath_toString)<br>Returns this path in the form of a string in SVG path format.
* [transform](#H3DU.GraphicsPath_transform)<br>Returns a modified version of this path that is transformed
according to the given affine transformation (a transformation
that keeps straight lines straight and parallel lines parallel).
* [union](#H3DU.GraphicsPath_union)<br>Computes the combination of this path's shape with another
path's shape.
* [xor](#H3DU.GraphicsPath_xor)<br>Computes the shape contained in either this path or another path,
but not both.

<a name='H3DU.GraphicsPath_arc'></a>
### H3DU.GraphicsPath#arc(x, y, radius, startAngle, endAngle, ccw)

Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arc" method of the
HTML Canvas 2D Context.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the center of the circle that the arc forms a part of.
* `y` (Type: number)<br>y-coordinate of the circle's center.
* `radius` (Type: number)<br>Radius of the circle.
* `startAngle` (Type: number)<br>Starting angle of the arc, in radians. 0 means the positive x-axis, &pi;/2 means the positive y-axis, &pi; means the negative x-axis, and &pi;\*1.5 means the negative y-axis.
* `endAngle` (Type: number)<br>Ending angle of the arc, in radians.
* `ccw` (Type: boolean)<br>Whether the arc runs counterclockwise (assuming the x-axis points right and the y-axis points down under the coordinate system).

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_arcShape'></a>
### H3DU.GraphicsPath#arcShape(x, y, w, h, start, sweep, type)

Adds path segments to this path that form an arc running along an axis-aligned
ellipse, or a shape based on that arc and ellipse, given the ellipse's center
and dimensions, start angle, and sweep angle.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the ellipse's center.
* `y` (Type: number)<br>y-coordinate of the ellipse's center.
* `w` (Type: number)<br>Width of the ellipse's bounding box.
* `h` (Type: number)<br>Height of the ellipse's bounding box.
* `start` (Type: number)<br>Starting angle of the arc, in degrees. 0 means the positive x-axis, 90 means the positive y-axis, 180 means the negative x-axis, and 270 means the negative y-axis.
* `sweep` (Type: number)<br>Length of the arc in degrees. Can be positive or negative. Can be greater than 360 or less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming the coordinate system's x-axis points right and the y-axis down, positive angles run clockwise and negative angles counterclockwise.
* `type` (Type: number)<br>Type of arc to append to the path. If 0, will append an unclosed arc. If 1, will append an elliptical segment to the path (the arc and a line segment connecting its ends). If 2, will append a "pie slice" to the path (the arc and two line segments connecting each end of the arc to the ellipse's center).

#### Return Value

This object. If "w" or "h" is 0, no path segments will be appended. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_arcShapeForBox'></a>
### H3DU.GraphicsPath#arcShapeForBox(x, y, w, h, start, sweep, type)

Adds path segments to this path that form an arc running along an axis-aligned
ellipse, or a shape based on that arc and ellipse, given the ellipse's corner point
and dimensions, start angle, and sweep angle.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the ellipse's bounding box's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `y` (Type: number)<br>y-coordinate of the ellipse's bounding box's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `w` (Type: number)<br>Width of the ellipse's bounding box.
* `h` (Type: number)<br>Height of the ellipse's bounding box.
* `start` (Type: number)<br>Starting angle of the arc, in degrees. 0 means the positive x-axis, 90 means the positive y-axis, 180 means the negative x-axis, and 270 means the negative y-axis.
* `sweep` (Type: number)<br>Length of the arc in degrees. Can be greater than 360 or less than -360, in which case the arc will wrap around the ellipse multiple times. Assuming the coordinate system's x-axis points right and the y-axis down, positive angles run clockwise and negative angles counterclockwise.
* `type` (Type: number)<br>Type of arc to append to the path. If 0, will append an unclosed arc. If 1, will append an elliptical segment to the path (the arc and a line segment connecting its ends). If 2, will append a "pie slice" to the path (the arc and two line segments connecting each end of the arc to the ellipse's center).

#### Return Value

This object. If "w" or "h" is 0, no path segments will be appended. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_arcSvgTo'></a>
### H3DU.GraphicsPath#arcSvgTo(rx, ry, rot, largeArc, sweep, x2, y2)

Adds path segments in the form of an elliptical arc to this path,
using the parameterization used by the SVG specification.

#### Parameters

* `rx` (Type: number)<br>x-axis radius of the ellipse that the arc will be formed from.
* `ry` (Type: number)<br>y-axis radius of the ellipse that the arc will be formed from.
* `rot` (Type: number)<br>Rotation of the ellipse in degrees (clockwise assuming the x-axis points right and the y-axis points down under the coordinate system).
* `largeArc` (Type: boolean)<br>In general, there are four possible solutions for arcs given the start and end points, rotation, and x- and y-radii. If true, chooses an arc solution with the larger arc length; if false, smaller.
* `sweep` (Type: boolean)<br>If true, the arc solution chosen will run clockwise (assuming the x-axis points right and the y-axis points down under the coordinate system); if false, counterclockwise.
* `x2` (Type: number)<br>x-coordinate of the arc's end point.
* `y2` (Type: number)<br>y-coordinate of the arc's end point.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_arcTo'></a>
### H3DU.GraphicsPath#arcTo(x1, y1, x2, y2, radius)

Adds path segments in the form of a circular arc to this path,
using the parameterization specified in the "arcTo" method of the
HTML Canvas 2D Context.

#### Parameters

* `x1` (Type: number)<br>x-coordinate of a point that, along with the current end point, forms a tangent line. The point where the circle touches this tangent line is the start point of the arc, and if the point isn't the same as the current end point, this method adds a line segment connecting the two points. (Note that the start point of the arc is not necessarily the same as (x1, y1) or the current end point.)
* `y1` (Type: number)<br>y-coordinate of the point described under "x1".
* `x2` (Type: number)<br>x-coordinate of a point that, along with the point (x1, y1), forms a tangent line. The point where the circle touches this tangent line is the end point of the arc. (Note that the end point of the arc is not necessarily the same as (x1, y1) or (x2, y2).) When this method returns, the current end point will be set to the end point of the arc.
* `y2` (Type: number)<br>y-coordinate of the point described under "x2".
* `radius` (Type: number)<br>Radius of the circle the arc forms a part of.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_arrow'></a>
### H3DU.GraphicsPath#arrow(x0, y0, x1, y1, headWidth, headLength, tailWidth)

Adds path segments to this path in the form of an arrow shape.

#### Parameters

* `x0` (Type: number)<br>x-coordinate of the arrow's tail, at its very end.
* `y0` (Type: number)<br>y-coordinate of the arrow's tail, at its very end.
* `x1` (Type: number)<br>x-coordinate of the arrow's tip.
* `y1` (Type: number)<br>y-coordinate of the arrow's tip.
* `headWidth` (Type: number)<br>Width of the arrowhead's base from side to side.
* `headLength` (Type: number)<br>Length of the arrowhead from its tip to its base.
* `tailWidth` (Type: number)<br>Width of the arrow's tail from side to side

#### Return Value

This object. Nothing will be added to the path if the distance
from (x0, y0) and (x1, y1) is 0 or extremely close to 0. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_bevelRect'></a>
### H3DU.GraphicsPath#bevelRect(x, y, w, h, arccx, arccy)

Adds path segments to this path that form an axis-aligned rectangle with beveled corners.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the rectangle's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `y` (Type: number)<br>y-coordinate of the rectangle's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `w` (Type: number)<br>Width of the rectangle.
* `h` (Type: number)<br>Height of the rectangle.
* `arccx` (Type: number)<br>Horizontal extent (from end to end) of the rectangle's corners. Will be adjusted to be not less than 0 and not greater than "w".
* `arccy` (Type: number)<br>Vertical extent (from end to end) of the rectangle's corners. Will be adjusted to be not less than 0 and not greater than "h".

#### Return Value

This object. If "w" or "h" is less than 0, no path segments will be appended. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_bezierCurveTo'></a>
### H3DU.GraphicsPath#bezierCurveTo(x, y, x2, y2, x3, y3)

Adds a cubic B&eacute;zier curve to this path starting
at this path's current position. The current position will be
the curve's first control point.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the curve's second control point.
* `y` (Type: number)<br>x-coordinate of the curve's second control point.
* `x2` (Type: number)<br>y-coordinate of the curve's third control point.
* `y2` (Type: number)<br>y-coordinate of the curve's third control point.
* `x3` (Type: number)<br>x-coordinate of the curve's end point (fourth control point).
* `y3` (Type: number)<br>y-coordinate of the curve's end point (fourth control point).

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_closePath'></a>
### H3DU.GraphicsPath#closePath()

Makes this path closed. Adds a line segment to the
path's start position, if necessary.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_difference'></a>
### H3DU.GraphicsPath#difference(path, [flatness])

Computes the difference between this path's shape and another
path's shape. The points given in the GraphicsPath#union method
apply to this method.

#### Parameters

* `path` (Type: GraphicsPath)<br>A path to combine with this one.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

The difference between this path
and the other path. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_ellipse'></a>
### H3DU.GraphicsPath#ellipse(cx, cy, w, h)

Adds path segments to this path that form an axis-aligned ellipse given its center
and dimensions.

#### Parameters

* `cx` (Type: number)<br>x-coordinate of the ellipse's center.
* `cy` (Type: number)<br>y-coordinate of the ellipse's center.
* `w` (Type: number)<br>Width of the ellipse's bounding box.
* `h` (Type: number)<br>Height of the ellipse's bounding box.

#### Return Value

This object. If "w" or "h" is 0, no path segments will be appended. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_ellipseForBox'></a>
### H3DU.GraphicsPath#ellipseForBox(x, y, w, h)

Adds path segments to this path that form an axis-aligned ellipse, given the ellipse's corner point
and dimensions.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the ellipse's bounding box's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `y` (Type: number)<br>y-coordinate of the ellipse's bounding box's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `w` (Type: number)<br>Width of the ellipse's bounding box.
* `h` (Type: number)<br>Height of the ellipse's bounding box.

#### Return Value

This object. If "w" or "h" is 0, no path segments will be appended. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath.fromString'></a>
### (static) H3DU.GraphicsPath.fromString(str)

Creates a graphics path from a string whose format follows
the SVG (Scalable Vector Graphics) specification.

#### Parameters

* `str` (Type: string)<br>A string, in the SVG path format, representing a two-dimensional path. An SVG path consists of a number of path segments, starting with a single letter, as follows: <ul> <li>M/m (x y) - Moves the current position to (x, y). Further XY pairs specify line segments. <li>L/l (x y) - Specifies line segments to the given XY points. <li>H/h (x) - Specifies horizontal line segments to the given X points. <li>V/v (y) - Specifies vertical line segments to the given Y points. <li>Q/q (cx cx x y) - Specifies quadratic B&eacute;zier curves (see quadraticCurveTo). <li>T/t (x y) - Specifies quadratic curves tangent to the previous quadratic curve. <li>C/c (c1x c1y c2x c2y x y) - Specifies cubic B&eacute;zier curves (see bezierCurveTo). <li>S/s (c2x c2y x y) - Specifies cubic curves tangent to the previous cubic curve. <li>A/a (rx ry rot largeArc sweep x y) - Specifies arcs (see arcSvgTo). "largeArc" and "sweep" are flags, "0" for false and "1" for true. "rot" is in degrees. <li>Z/z - Closes the current path; similar to adding a line segment to the first XY point given in the last M/m command. </ul> Lowercase letters mean any x- and y-coordinates are relative to the current position of the path. Each group of parameters can be repeated in the same path segment. Each parameter after the starting letter is separated by whitespace and/or a single comma, and the starting letter can be separated by whitespace. This separation can be left out as long as doing so doesn't introduce ambiguity. All commands set the current point to the end of the path segment (including Z/z, which adds a line segment if needed). Examples of this parameter are "M50,50L100,100,100,150,150,200", "M50,20C230,245,233,44,22,44", and "M50,50H80V60H50V70H50"

#### Return Value

The resulting path. If an error
occurs while parsing the path, the path's "isIncomplete()" method
will return <code>true</code>. (Type: GraphicsPath)

#### Examples

The following example creates a graphics path
from an SVG string describing a polyline.

    var path=GraphicsPath.fromString("M10,20L40,30,24,32,55,22")

The following example creates a graphics path
from an SVG string describing a curved path.

    var path=GraphicsPath.fromString("M50,20C230,245,233,44,22,44")

<a name='H3DU.GraphicsPath_getBounds'></a>
### H3DU.GraphicsPath#getBounds()

Calculates an axis-aligned bounding box that tightly
fits this graphics path.

#### Return Value

An array of four numbers
describing the bounding box. The first two are
the lowest x- and y-coordinates, and the last two are
the highest x- and y-coordinates. If the path is empty,
returns the array (Infinity, Infinity, -Infinity, -Infinity). (Type: Array.&lt;number>)

<a name='H3DU.GraphicsPath_getCurrentPoint'></a>
### H3DU.GraphicsPath#getCurrentPoint()

Gets the current point stored in this path.

#### Return Value

A two-element array giving the x- and y-coordinates of the current point. (Type: Array.&lt;number>)

<a name='H3DU.GraphicsPath_getCurves'></a>
### H3DU.GraphicsPath#getCurves()

Gets a curve evaluator object for
the curves described by this path. The return value doesn't track changes to the path.

#### Return Value

A curve evaluator object that implements
the following additional method:<ul>
<li><code>getCurves()</code> - Returns a list of curve evaluator objects
described by this path. The list will contain one curve evaluator object for each disconnected
portion of the path. For example, if the path contains one polygon, the list will contain
one curve object. And if the path is empty, the list will be empty too. Each curve
takes u-coordinates that range from 0 to 1, depending on how far the point is from the start or
the end of the path (similar to arc-length parameterization). Each curve
returns a 3-element array containing
the x-, y-, and z-coordinates of the point lying on the curve at the given
"u" position (however, the z will always be 0 since paths can currently
only be 2-dimensional).
</ul> (Type: Object)

<a name='H3DU.GraphicsPath_getLinePoints'></a>
### H3DU.GraphicsPath#getLinePoints([flatness])

Gets an array of the end points of
line segments approximating the path.

#### Parameters

* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

Array of the end points of
line segments approximating the path. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.GraphicsPath_getLinePointsAsObjects'></a>
### H3DU.GraphicsPath#getLinePointsAsObjects([flatness])

Gets an array of the end points of
line segments approximating the path. The positions will be in the form of objects with
two properties: x and y retrieve the X or y-coordinate of each position, respectively.

#### Parameters

* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

Array of the end points of
line segments approximating the path. (Type: Array.&lt;Array.&lt;number>>)

#### Examples

The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.

    var points=path.getLinePointsAsObjects()
    var buffer=new THREE.BufferGeometry()
    .setFromPoints(points);

<a name='H3DU.GraphicsPath_getLines'></a>
### H3DU.GraphicsPath#getLines([flatness])

Gets an array of line segments approximating
the path.

#### Parameters

* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

Array of line segments.
Each line segment is an array of four numbers: the x- and y-coordinates of the start point, respectively, then the x- and y-coordinates of the end point, respectively. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.GraphicsPath_getPoints'></a>
### H3DU.GraphicsPath#getPoints(numPoints)

Gets an array of points evenly spaced across the length
of the path.

#### Parameters

* `numPoints` (Type: number)<br>Number of points to return.

#### Return Value

Array of points lying on
the path and evenly spaced across the length of the path,
starting and ending with the path's endPoints. Returns
an empty array if <i>numPoints</i> is less than 1. Returns
an array consisting of the start point if <i>numPoints</i>
is 1. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.GraphicsPath_getPointsAsObjects'></a>
### H3DU.GraphicsPath#getPointsAsObjects(numPoints)

Gets an array of points evenly spaced across the length
of the path. The positions will be in the form of objects with
two properties: x and y retrieve the X or y-coordinate of each position, respectively.

#### Parameters

* `numPoints` (Type: number)<br>Number of points to return.

#### Return Value

Array of points lying on
the path and evenly spaced across the length of the path,
starting and ending with the path's endPoints. Returns
an empty array if <i>numPoints</i> is less than 1. Returns
an array consisting of the start point if <i>numPoints</i>
is 1. (Type: Array.&lt;Array.&lt;number>>)

#### Examples

The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.

    var points=path.getPointsAsObjects(50)
    var buffer=new THREE.BufferGeometry()
    .setFromPoints(points);

<a name='H3DU.GraphicsPath_getSubpaths'></a>
### H3DU.GraphicsPath#getSubpaths()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

<a name='H3DU.GraphicsPath_getTriangles'></a>
### H3DU.GraphicsPath#getTriangles([flatness])

Converts the subpaths in this path to triangles.
Treats each subpath as a polygon even if it isn't closed.
Each subpath should not contain self-intersections or
duplicate vertices, except duplicate vertices that appear
consecutively or at the start and end.

The path can contain holes. In this case, subpaths
whose winding order (counterclockwise or clockwise)
differs from the first subpath's winding order can be holes.

#### Parameters

* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

Array of six-element
arrays each describing a single triangle. For each six-element
array, the first two, next two, and last two numbers each
describe a vertex position of that triangle (x- and y-coordinates
in that order). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.GraphicsPath_interpolate'></a>
### H3DU.GraphicsPath#interpolate(other, t)

Does a linear interpolation between two graphics paths.

#### Parameters

* `other` (Type: GraphicsPath)<br>The second graphics path.
* `t` (Type: number)<br>An interpolation factor, generally ranging from 0 through 1. Closer to 0 means closer to this path, and closer to 1 means closer to "other". If the input paths contain arc segments that differ in the large arc and sweep flags, the flags from the first path's arc are used if "t" is less than 0.5; and the flags from the second path's arc are used otherwise.

For a nonlinear interpolation, define a function that takes a value that usually ranges from 0 through 1 and generally returns a value that usually ranges from 0 through 1, and pass the result of that function to this method. See the documentation for MathUtil.vec3lerp for examples of interpolation functions.

#### Return Value

The interpolated path. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_intersection'></a>
### H3DU.GraphicsPath#intersection(path, [flatness])

Computes the intersection, or the area common to both this path's shape
and another path's shape. The points given in the GraphicsPath#union method
apply to this method.

#### Parameters

* `path` (Type: GraphicsPath)<br>A path to combine with this one.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

A path whose shape is contained in
both paths. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_isIncomplete'></a>
### H3DU.GraphicsPath#isIncomplete()

Returns whether the curve path is incomplete
because of an error in parsing the curve string.
This flag will be reset if a moveTo command,
closePath command, or another path segment
is added to the path.

#### Return Value

Return value. (Type: boolean)

<a name='H3DU.GraphicsPath_line'></a>
### H3DU.GraphicsPath#line(x0, y0, x1, y1)

Adds a line segment to this path.

#### Parameters

* `x0` (Type: number)<br>x-coordinate of the line segment's starting point. The <code>moveTo</code> method will be called on the starting point.
* `y0` (Type: number)<br>y-coordinate of the line segment's starting point.
* `x1` (Type: number)<br>x-coordinate of the line segment's ending point. The <code>lineTo</code> method will be called on the ending point.
* `y1` (Type: number)<br>x-coordinate of the line segment's ending point.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_lineTo'></a>
### H3DU.GraphicsPath#lineTo(x, y)

Adds a line segment to the path, starting
at the path's end position, then
sets the end position to the end of the segment.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the end of the line segment.
* `y` (Type: number)<br>y-coordinate of the end of the line segment.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_merge'></a>
### H3DU.GraphicsPath#merge(path)

Merges the path segments in another path onto this one.

#### Parameters

* `path` (Type: GraphicsPath)<br>Another graphics path. Can be null.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_moveTo'></a>
### H3DU.GraphicsPath#moveTo(x, y)

Moves the current start position and end position to the given position.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the position.
* `y` (Type: number)<br>y-coordinate of the position.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_pathLength'></a>
### H3DU.GraphicsPath#pathLength([flatness])

Finds the approximate length of this path.

#### Parameters

* `flatness` (Type: number) (optional)<br>No longer used by this method.

#### Return Value

Approximate length of this path
in units. (Type: number)

<a name='H3DU.GraphicsPath_polyline'></a>
### H3DU.GraphicsPath#polyline(pointCoords, closed)

Adds path segments to this path that form a polygon or a connected line segment strand.

#### Parameters

* `pointCoords` (Type: Array.&lt;number>)<br>An array of numbers containing the x- and y-coordinates of each point in the sequence of line segments. Each pair of numbers gives the x- and y-coordinates, in that order, of one of the points in the sequence. The number of elements in the array must be even. If two or more pairs of numbers are given, line segments will connect each point given (except the last) to the next point given.
* `closed` (Type: number)<br>If "true", the sequence of points describes a closed polygon and a command to close the path will be added to the path (even if only one pair of numbers is given in "pointCoords").

#### Return Value

This object. If "pointCoords" is empty, no path segments will be appended.
Throws an error if "pointCoords" has an odd length. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_quadraticCurveTo'></a>
### H3DU.GraphicsPath#quadraticCurveTo(x, y, x2, y2)

Adds a quadratic B&eacute;zier curve to this path starting
at this path's current position. The current position will be
the curve's first control point.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the curve's second control point.
* `y` (Type: number)<br>y-coordinate of the curve's second control point.
* `x2` (Type: number)<br>x-coordinate of the curve's end point (third control point).
* `y2` (Type: number)<br>y-coordinate of the curve's end point (third control point).

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_rect'></a>
### H3DU.GraphicsPath#rect(x, y, w, h)

Adds path segments to this path that form an axis-aligned rectangle.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the rectangle's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `y` (Type: number)<br>y-coordinate of the rectangle's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `w` (Type: number)<br>Width of the rectangle.
* `h` (Type: number)<br>Height of the rectangle.

#### Return Value

This object. If "w" or "h" is 0, no path segments will be appended. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_regularPolygon'></a>
### H3DU.GraphicsPath#regularPolygon(cx, cy, sides, radius, [phaseInDegrees])

Adds path segments to this path that form a regular polygon.

#### Parameters

* `cx` (Type: number)<br>x-coordinate of the center of the polygon.
* `cy` (Type: number)<br>y-coordinate of the center of the polygon.
* `sides` (Type: number)<br>Number of sides the polygon has. Nothing will be added to the path if this value is 2 or less.
* `radius` (Type: number)<br>Radius from the center to each vertex of the polygon.
* `phaseInDegrees` (Type: number) (optional)<br>Starting angle of the first vertex of the polygon, in degrees. 0 means the positive x-axis, 90 means the positive y-axis, 180 means the negative x-axis, and 270 means the negative y-axis. If null, undefined, or omitted, the default is 0.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_regularStar'></a>
### H3DU.GraphicsPath#regularStar(cx, cy, points, radiusOut, radiusIn, phaseInDegrees)

Adds path segments to this path that form a regular N-pointed star.

#### Parameters

* `cx` (Type: number)<br>x-coordinate of the center of the star.
* `cy` (Type: number)<br>y-coordinate of the center of the star.
* `points` (Type: number)<br>Number of points the star has. Nothing will be added to the path if this value is 0 or less.
* `radiusOut` (Type: number)<br>Radius from the center to each outer vertex of the star.
* `radiusIn` (Type: number)<br>Radius from the center to each inner vertex of the star.
* `phaseInDegrees` (Type: number)<br>Starting angle of the first vertex of the polygon, in degrees. 0 means the positive x-axis, 90 means the positive y-axis, 180 means the negative x-axis, and 270 means the negative y-axis.

#### Return Value

This object. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_reverse'></a>
### H3DU.GraphicsPath#reverse()

Returns a path that reverses the course of this path.

#### Return Value

A GraphicsPath
object with its path segments reversed. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_roundRect'></a>
### H3DU.GraphicsPath#roundRect(x, y, w, h, arccx, arccy)

Adds path segments to this path that form an axis-aligned rounded rectangle.

#### Parameters

* `x` (Type: number)<br>x-coordinate of the rectangle's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `y` (Type: number)<br>y-coordinate of the rectangle's upper-left corner (assuming the coordinate system's x-axis points right and the y-axis down).
* `w` (Type: number)<br>Width of the rectangle.
* `h` (Type: number)<br>Height of the rectangle.
* `arccx` (Type: number)<br>Horizontal extent (from end to end) of the ellipse formed by each arc that makes up the rectangle's corners. Will be adjusted to be not less than 0 and not greater than "w".
* `arccy` (Type: number)<br>Vertical extent (from end to end) of the ellipse formed by each arc that makes up the rectangle's corners. Will be adjusted to be not less than 0 and not greater than "h".

#### Return Value

This object. If "w" or "h" is less than 0, no path segments will be appended. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_toCurvePath'></a>
### H3DU.GraphicsPath#toCurvePath()

Creates a path in which arcs are decomposed
to cubic B&eacute;zier curves (which will approximate those arcs).

#### Return Value

A path consisting only of line
segments, B&eacute;zier curves, and close commands. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_toExtrudedMeshBuffer'></a>
### H3DU.GraphicsPath#toExtrudedMeshBuffer(zStart, zEnd, [flatness], [closed])

Generates a mesh buffer consisting of "walls" that follow this graphics path approximately, and, optionally, a base and toop.

#### Parameters

* `zStart` (Type: number)<br>Starting z-coordinate of the mesh buffer's "walls".
* `zEnd` (Type: number)<br>Ending z-coordinate of the mesh buffer's "walls".
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.
* `closed` (Type: boolean) (optional)<br>If true, the generated mesh buffer will include a base and top. If null, undefined, or omitted, the default is false.

#### Return Value

The resulting mesh buffer. (Type: MeshBuffer)

<a name='H3DU.GraphicsPath_toLineMeshBuffer'></a>
### H3DU.GraphicsPath#toLineMeshBuffer([z], [flatness])

Generates a mesh buffer consisting of the approximate line segments that make up this graphics path.

#### Parameters

* `z` (Type: number) (optional)<br>z-coordinate for each line segment. If null, undefined, or omitted, the default is 0.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

The resulting mesh buffer. (Type: MeshBuffer)

<a name='H3DU.GraphicsPath_toLinePath'></a>
### H3DU.GraphicsPath#toLinePath([flatness])

Creates a path in which curves and arcs are decomposed
to line segments.

#### Parameters

* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

A path consisting only of line
segments and close commands. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_toMeshBuffer'></a>
### H3DU.GraphicsPath#toMeshBuffer([z], [flatness])

TODO: Not documented yet.

#### Parameters

* `z` (Type: number) (optional)<br>The z-coordinate of each triangle generated. If null, undefined, or omitted, default is 0.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

The resulting mesh buffer. (Type: MeshBuffer)

<a name='H3DU.GraphicsPath_toString'></a>
### H3DU.GraphicsPath#toString()

Returns this path in the form of a string in SVG path format.
See GraphicsPath.fromString.

#### Return Value

A string describing the path in the SVG path
format. (Type: string)

<a name='H3DU.GraphicsPath_transform'></a>
### H3DU.GraphicsPath#transform(trans)

Returns a modified version of this path that is transformed
according to the given affine transformation (a transformation
that keeps straight lines straight and parallel lines parallel).

#### Parameters

* `trans` (Type: Array.&lt;number>)<br>An array of six numbers describing a 2-dimensional affine transformation. For each point in the current path, its new x-coordinate is `trans[0] \* X + trans[2] \* Y + trans[4]`, and its new y-coordinate is `trans[1] \* X + trans[3] \* Y + trans[5]`.

#### Return Value

The transformed version of this path. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_union'></a>
### H3DU.GraphicsPath#union(path, [flatness])

Computes the combination of this path's shape with another
path's shape. The following points apply to this method:<ul>
<li>This method treats unclosed subpaths as implicitly closed
by connecting their end points with their start points.
<li>Currently, the algorithm supports only polygons made up
of line segments, so curves and arcs are converted to line
segments before applying the operation.
<li>Each polygon can be concave or have self-intersections
or holes. Subpaths that are holes have the opposite winding
order (clockwise or counterclockwise) from the subpath
that contains them.
</ul>

#### Parameters

* `path` (Type: GraphicsPath)<br>A path to combine with this one.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

The union of the two paths. (Type: GraphicsPath)

<a name='H3DU.GraphicsPath_xor'></a>
### H3DU.GraphicsPath#xor(path, [flatness])

Computes the shape contained in either this path or another path,
but not both. The points given in the GraphicsPath#union method
apply to this method.

#### Parameters

* `path` (Type: GraphicsPath)<br>A path to combine with this one.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

A path whose shape is contained in
only one of the two paths. (Type: GraphicsPath)

[Back to documentation index.](index.md)
