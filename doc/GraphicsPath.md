# GraphicsPath

[Back to documentation index.](index.md)

 <a name='GraphicsPath'></a>
### GraphicsPath()

<b>Deprecated: Use <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a> instead.</b>

Alias for the <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a> class.

### Methods

* [getCurrentPoint](#GraphicsPath_GraphicsPath_getCurrentPoint)<br>Gets the current point stored in this path.
* [ellipse](#GraphicsPath_H3DU.GraphicsPath_ellipse)<br>Adds path segments to this path that form an axis-aligned ellipse given its center
and dimensions.
* [line](#GraphicsPath_H3DU.GraphicsPath_line)<br>Adds a line segment to this path.
* [polygon](#GraphicsPath_H3DU.GraphicsPath_polygon)<br>Adds path segments to this path that form a polygon or a connected line segment strand.
* [roundRect](#GraphicsPath_H3DU.GraphicsPath_roundRect)<br>Adds path segments to this path that form an axis-aligned rounded rectangle.

 <a name='GraphicsPath_GraphicsPath_getCurrentPoint'></a>
### GraphicsPath#getCurrentPoint()

Gets the current point stored in this path.

#### Return Value

A two-element array giving the X and Y coordinates of the current point. (Type: Array.&lt;Number>)

 <a name='GraphicsPath_H3DU.GraphicsPath_ellipse'></a>
### H3DU.GraphicsPath#ellipse(cx, cy, w, h)

Adds path segments to this path that form an axis-aligned ellipse given its center
and dimensions.

To use this method, you must include the script "extras/pathshapes.js";
this is in addition to "extras/path.js". Example:

    <script type="text/javascript" src="extras/path.js"></script>
    <script type="text/javascript" src="extras/pathshapes.js"></script>

#### Parameters

* `cx` (Type: Number)<br>
    X coordinate of the ellipse's center.
* `cy` (Type: Number)<br>
    Y coordinate of the ellipse's center.
* `w` (Type: Number)<br>
    Width of the ellipse's bounding box.
* `h` (Type: Number)<br>
    Height of the ellipse's bounding box.

#### Return Value

This object. If "w" or "h" is 0, no path segments will be appended. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

 <a name='GraphicsPath_H3DU.GraphicsPath_line'></a>
### H3DU.GraphicsPath#line(x0, y0, x1, y1)

Adds a line segment to this path.

To use this method, you must include the script "extras/pathshapes.js";
this is in addition to "extras/path.js". Example:

    <script type="text/javascript" src="extras/path.js"></script>
    <script type="text/javascript" src="extras/pathshapes.js"></script>

#### Parameters

* `x0` (Type: Number)<br>
    X coordinate of the line segment's starting point.
* `y0` (Type: Number)<br>
    Y coordinate of the line segment's starting point.
* `x1` (Type: Number)<br>
    X coordinate of the line segment's ending point.
* `y1` (Type: Number)<br>
    X coordinate of the line segment's ending point.

#### Return Value

This object. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

 <a name='GraphicsPath_H3DU.GraphicsPath_polygon'></a>
### H3DU.GraphicsPath#polygon(pointCoords, closed)

Adds path segments to this path that form a polygon or a connected line segment strand.

To use this method, you must include the script "extras/pathshapes.js";
this is in addition to "extras/path.js". Example:

    <script type="text/javascript" src="extras/path.js"></script>
    <script type="text/javascript" src="extras/pathshapes.js"></script>

#### Parameters

* `pointCoords` (Type: Array.&lt;Number>)<br>
    An array of numbers containing the X and Y coordinates of each point in the sequence of line segments. Each pair of numbers gives the X and Y coordinates, in that order, of one of the points in the sequence. The number of elements in the array must be even. If two or more pairs of numbers are given, line segments will connect each point given (except the last) to the next point given.
* `closed` (Type: Number)<br>
    If "true", the sequence of points describes a closed polygon and a command to close the path will be added to the path (even if only one pair of numbers is given in "pointCoords").

#### Return Value

This object. If "pointCoords" is empty, no path segments will be appended.
Throws an error if "pointCoords" has an odd length. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)

 <a name='GraphicsPath_H3DU.GraphicsPath_roundRect'></a>
### H3DU.GraphicsPath#roundRect(x, y, w, h, arccx, arccy)

Adds path segments to this path that form an axis-aligned rounded rectangle.

To use this method, you must include the script "extras/pathshapes.js";
this is in addition to "extras/path.js". Example:

    <script type="text/javascript" src="extras/path.js"></script>
    <script type="text/javascript" src="extras/pathshapes.js"></script>

#### Parameters

* `x` (Type: Number)<br>
    X coordinate of the rectangle's upper-left corner (assuming the coordinate system's X axis points right and the Y axis down).
* `y` (Type: Number)<br>
    Y coordinate of the rectangle's upper-left corner (assuming the coordinate system's X axis points right and the Y axis down).
* `w` (Type: Number)<br>
    Width of the rectangle.
* `h` (Type: Number)<br>
    Height of the rectangle.
* `arccx` (Type: Number)<br>
    Horizontal extent (from end to end) of the ellipse formed by each arc that makes up the rectangle's corners. Will be adjusted to be not less than 0 and not greater than "w".
* `arccy` (Type: Number)<br>
    Vertical extent (from end to end) of the ellipse formed by each arc that makes up the rectangle's corners. Will be adjusted to be not less than 0 and not greater than "h".

#### Return Value

This object. If "w" or "h" is 0, no path segments will be appended. (Type: <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>)
