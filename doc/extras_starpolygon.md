# module:extras/starpolygon

[Back to documentation index.](index.md)

<a name='extras_starpolygon'></a>
### module:extras/starpolygon()

The <code>extras/starpolygon.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/starpolygon.js";
    // -- or --
    import * as CustomModuleName from "extras/starpolygon.js";

### Methods

* [starPolygon](#extras_starpolygon.starPolygon)<br>Generates a star polygon <code>{points/jump}</code>.

<a name='extras_starpolygon.starPolygon'></a>
### (static) module:extras/starpolygon.starPolygon(x, y, radius, points, jump, [phaseInDegrees])

Generates a star polygon <code>{points/jump}</code>.

#### Parameters

* `x` (Type: number)<br>The Xcoordinate of the star polygon's center.
* `y` (Type: number)<br>The Ycoordinate of the star polygon's center.
* `radius` (Type: number)<br>Radius of the star polygon; that is, the distance from the center to each of its points.
* `points` (Type: number)<br>Number of points in the star polygon. Must be an integer 2 or greater.
* `jump` (Type: number)<br>Number of points in the underlying polygon to skip when connecting points with straight line segments to generate the star polygon. Must be an integer 1 or greater.
* `phaseInDegrees` (Type: number) (optional)<br>Angle, in degrees, of the first point in the star polygon. If null, undefined, or omitted, the default is 0.

#### Return Value

Array of points (two-element arrays) making up the star polygon. The first number of each point is the x-coordinate, and the second the y-coordinate. (Type: Array.&lt;Array.&lt;number>>)

[Back to documentation index.](index.md)
