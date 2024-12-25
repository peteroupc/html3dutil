# module:extras/randompolygon

[Back to documentation index.](index.md)

<a name='extras_randompolygon'></a>
### module:extras/randompolygon()

Contains a method to generate a simple polygon at random.

To import all symbols in this module, either of the following can be used:

    import * from "extras/randompolygon.js";
    // -- or --
    import * as CustomModuleName from "extras/randompolygon.js";

### Methods

* [randomPolygon](#extras_randompolygon.randomPolygon)<br>Generates a simple polygon at random.

<a name='extras_randompolygon.randomPolygon'></a>
### (static) module:extras/randompolygon.randomPolygon(cx, cy, avgRadius, sides, [irregular], [spiky])

Generates a simple polygon at random.
Inspired by [a _Stack Overflow_ question](http://stackoverflow.com/questions/8997099).

#### Parameters

* `cx` (Type: number)<br>The x-coordinate of the polygon's approximate center.
* `cy` (Type: number)<br>The y-coordinate of the polygon's approximate center.
* `avgRadius` (Type: number)<br>Average distance of the polygon's vertices from the center.
* `sides` (Type: number)<br>Number of sides in the polygon.
* `irregular` (Type: number) (optional)<br>Degree to which the angular distance from one vertex to the next is uneven. If 0, the vertices will be evenly spaced in terms of angular distance. Usually no more than half pi. If null, undefined, or omitted, the default is 0.
* `spiky` (Type: number) (optional)<br>Degree of variation among distances of the polygon's vertices from the center, in terms of a standard deviation from the average. If null, undefined, or omitted, the default is 0.

#### Return Value

The randomly generated polygon. (Type: GraphicsPath)

[Back to documentation index.](index.md)
