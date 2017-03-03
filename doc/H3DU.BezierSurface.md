# H3DU.BezierSurface

[Back to documentation index.](index.md)

 <a name='H3DU.BezierSurface'></a>
### H3DU.BezierSurface(cp, [u1], [u2], [v1], [v2])

<b>Deprecated: Instead of this class, use <a href="H3DU.BSplineCurve.md#H3DU.BSplineCurve.fromBezierCurve">H3DU.BSplineCurve.fromBezierCurve</a>
to create a B&eacute;zier curve.</b>

A <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a> for a B&eacute;zier surface.

#### Parameters

* `cp` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control point arrays, which in turn contain a number of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier surface along the V axis. For example, a degree-3 (cubic) surface along the V axis contains 4 control points, one in each control point array. A degree of 1 on both the U and V axes results in a flat surface. <li>The length of the first control point array minus 1 represents the degree of the B&eacute;zier surface along the U axis. <li>The number of elements in the first control point's represents the number of elements in all the control points. </ul>
* `u1` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the starting point for the purpose of interpolation along the U axis.)
* `u2` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the ending point for the purpose of interpolation along the U axis.)
* `v1` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the starting point for the purpose of interpolation along the V axis.)
* `v2` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the ending point for the purpose of interpolation along the V axis.)

### Methods

* [bitangent](#H3DU.BezierSurface_bitangent)<br>Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">bitangent vector</a> at the given point on this surface.
* [endPoints](#H3DU.BezierSurface_endPoints)<br>TODO: Not documented yet.
* [evaluate](#H3DU.BezierSurface_evaluate)<br>Evaluates the surface function based on a point
in a B&eacute;zier surface.
* [tangent](#H3DU.BezierSurface_tangent)<br>Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">tangent vector</a> at the given point on this surface.

 <a name='H3DU.BezierSurface_bitangent'></a>
### H3DU.BezierSurface#bitangent(u, v)

Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">bitangent vector</a> at the given point on this surface.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of the surface to evaluate (generally within the range given in the constructor).
* `v` (Type: Number)<br>
    V coordinate of the surface to evaluate.

#### Return Value

An array of the bitangent vector at the given U and V
coordinates. It will have as many elements as a control point, as specified in the constructor. (Type: Array.&lt;Number>)

 <a name='H3DU.BezierSurface_endPoints'></a>
### H3DU.BezierSurface#endPoints()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

 <a name='H3DU.BezierSurface_evaluate'></a>
### H3DU.BezierSurface#evaluate(u, v)

Evaluates the surface function based on a point
in a B&eacute;zier surface.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of the surface to evaluate (generally within the range given in the constructor).
* `v` (Type: Number)<br>
    V coordinate of the surface to evaluate.

#### Return Value

An array of the result of
the evaluation. It will have as many elements as a control point, as specified in the constructor. (Type: Array.&lt;Number>)

 <a name='H3DU.BezierSurface_tangent'></a>
### H3DU.BezierSurface#tangent(u, v)

Finds the <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">tangent vector</a> at the given point on this surface.

#### Parameters

* `u` (Type: Number)<br>
    U coordinate of the surface to evaluate (generally within the range given in the constructor).
* `v` (Type: Number)<br>
    V coordinate of the surface to evaluate.

#### Return Value

An array of the tangent vector at the given U and V
coordinates. It will have as many elements as a control point, as specified in the constructor. (Type: Array.&lt;Number>)
