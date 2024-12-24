# Trochoid

[Back to documentation index.](index.md)

<a name='Trochoid'></a>
### Trochoid(radius, distFromCenter)

**Augments:** Curve

A curve evaluator object for a curve drawn by a circle that rolls along the x-axis.

The following curves can be generated with this class (in the following
descriptions, R = <code>radius</code>
and D = <code>distFromCenter</code>).<ul>
<li>Cycloid: D = R (trochoid touching the x-axis).</li>
<li>Curtate cycloid: D < R (trochoid not touching the x-axis).</li>
<li>Prolate cycloid: D > R (trochoid crossing the x-axis).</li></ul>

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

#### Parameters

* `radius` (Type: number)<br>Radius of the rolling circle.
* `distFromCenter` (Type: number)<br>Distance from the center of the rolling circle to the drawing pen.

### Methods

* [endPoints](#Trochoid_endPoints)<br>Gets the endpoints of this curve.
* [evaluate](#Trochoid_evaluate)<br>Generates a point on the curve from the given u-coordinate.
* [velocity](#Trochoid_velocity)<br>Finds the velocity (derivative) of this curve at the given point.

<a name='Trochoid_endPoints'></a>
### Trochoid#endPoints()

Gets the endpoints of this curve.
For this curve evaluator object, the curve
starts at 0 and ends at &pi;\*2.

#### Return Value

An array containing the two
endpoints of the curve. The first number is the start of the curve,
and the second number is the end of the curve. (Type: Array.&lt;number>)

<a name='Trochoid_evaluate'></a>
### Trochoid#evaluate(u)

Generates a point on the curve from the given u-coordinate.

#### Parameters

* `u` (Type: number)<br>u-coordinate.

#### Return Value

A 3-element array specifying a 3D point.
Only the x- and y-coordinates will be other than 0. (Type: Array.&lt;number>)

<a name='Trochoid_velocity'></a>
### Trochoid#velocity(u)

Finds the velocity (derivative) of this curve at the given point.

#### Parameters

* `u` (Type: number)<br>Point on the curve to evaluate.

#### Return Value

An array giving the velocity vector. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)
