# H3DU.BSplineSurface

[Back to documentation index.](index.md)

### H3DU.BSplineSurface(controlPoints, knotsU, knotsV, [bits]) <a id='H3DU_BSplineSurface'></a>

A parametric evaluator for B-spline (basis spline) surfaces.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control point arrays, which in turn contain a number of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter is the number of control points in each row of the V axis. <li>The length of the first control point array is the number of control points in each column of the U axis. <li>The first control point's length represents the size of all the control points. </ul>
* `knotsU` (Type: Array.&lt;Number>)<br>
    Knot vector of the curve, along the U-axis. For more information, see <a href="H3DU_BSplineCurve.md">H3DU.BSplineCurve</a>.
* `knotsV` (Type: Array.&lt;Number>)<br>
    Knot vector of the curve, along the V-axis.
* `bits` (Type: Boolean) (optional)<br>
    Bits for defining input and controlling output. Zero or more of H3DU.BSplineCurve.WEIGHTED_BIT, H3DU.BSplineCurve.HOMOGENEOUS_BIT, and H3DU.BSplineCurve.DIVIDE_BIT. If null or omitted, no bits are set.

### Methods

* [.clamped](#H3DU_BSplineSurface_clamped)
* [.uniform](#H3DU_BSplineSurface_uniform)
* [evaluate](#H3DU_BSplineSurface_H3DU_BSplineSurface_evaluate)

### H3DU.BSplineSurface.clamped(controlPoints, [degreeU], [degreeV], [bits]) <a id='H3DU_BSplineSurface_clamped'></a>

Creates a B-spline surface with uniform knots, except that
the surface's edges lie on the edges of the control point array.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;Number>>>)<br>
    Array of control point arrays as specified in the <a href="H3DU_BSplineSurface.md">H3DU.BSplineSurface</a> constructor.
* `degreeU` (Type: Number) (optional)<br>
    Degree of the B-Spline surface along the U-axis. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `degreeV` (Type: Number) (optional)<br>
    Degree of the B-Spline surface along the V-axis If null or omitted, the default is 3.
* `bits` (Type: Number) (optional)<br>
    Bits as specified in the <a href="H3DU_BSplineSurface.md">H3DU.BSplineSurface</a> constructor.

#### Return Value

Return value. (Type: <a href="H3DU_BSplineSurface.md">H3DU.BSplineSurface</a>)

### H3DU.BSplineSurface.uniform(controlPoints, [degreeU], [degreeV], [bits]) <a id='H3DU_BSplineSurface_uniform'></a>

Creates a B-spline surface with uniform knots.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;Array.&lt;Number>>>)<br>
    Array of control point arrays as specified in the <a href="H3DU_BSplineSurface.md">H3DU.BSplineSurface</a> constructor.
* `degreeU` (Type: Number) (optional)<br>
    Degree of the B-Spline surface along the U-axis. For example, 3 means a degree-3 (cubic) curve. If null or omitted, the default is 3.
* `degreeV` (Type: Number) (optional)<br>
    Degree of the B-Spline surface along the V-axis If null or omitted, the default is 3.
* `bits` (Type: Number) (optional)<br>
    Bits as specified in the <a href="H3DU_BSplineSurface.md">H3DU.BSplineSurface</a> constructor.

#### Return Value

Return value. (Type: <a href="H3DU_BSplineSurface.md">H3DU.BSplineSurface</a>)

### H3DU.BSplineSurface#evaluate(u, v) <a id='H3DU_BSplineSurface_H3DU_BSplineSurface_evaluate'></a>

Evaluates the surface function based on a point
in a B-spline surface.

#### Parameters

* `u` (Type: Number)<br>
    U-coordinate of the surface to evaluate (from 0 through 1).
* `v` (Type: Number)<br>
    V-coordinate of the surface to evaluate.

#### Return Value

An array of the result of
the evaluation. Its length will be equal to the
length of a control point (minus 1 if if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;Number>)
