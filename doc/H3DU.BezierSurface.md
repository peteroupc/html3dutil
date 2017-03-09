# H3DU.BezierSurface

[Back to documentation index.](index.md)

 <a name='H3DU.BezierSurface'></a>
### H3DU.BezierSurface(cp, [u1], [u2], [v1], [v2])

<b>Deprecated: Instead of this class, use <a href="H3DU.BSplineSurface.md#H3DU.BSplineSurface.fromBezierSurface">H3DU.BSplineSurface.fromBezierSurface</a>
to create a B&eacute;zier surface.</b>

A <a href="H3DU.SurfaceEval.md#H3DU.SurfaceEval_vertex">surface evaluator object</a> for a B&eacute;zier surface.

#### Parameters

* `cp` (Type: Array.&lt;Array.&lt;Number>>)<br>
    An array of control point arrays as specified in <a href="H3DU.BSplineSurface.md#H3DU.BSplineSurface.fromBezierSurface">H3DU.BSplineSurface.fromBezierSurface</a>.
* `u1` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the starting point for the purpose of interpolation along the U axis.)
* `u2` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the ending point for the purpose of interpolation along the U axis.)
* `v1` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the starting point for the purpose of interpolation along the V axis.)
* `v2` (Type: Number) (optional)<br>
    No longer used since version 2.0. The starting and ending points will be (0, 0). (This parameter was the ending point for the purpose of interpolation along the V axis.)

### Methods

* [endPoints](#H3DU.BezierSurface_endPoints)<br>Returns the starting and ending U and V coordinates of this surface.
* [evaluate](#H3DU.BezierSurface_evaluate)<br>Evaluates the surface function based on a point
in a B&eacute;zier surface.

 <a name='H3DU.BezierSurface_endPoints'></a>
### H3DU.BezierSurface#endPoints()

Returns the starting and ending U and V coordinates of this surface.

#### Return Value

A four-element array. The first and second
elements are the starting and ending U coordinates, respectively, of the surface, and the third
and fourth elements are its starting and ending V coordinates. (Type: Array.&lt;Number>)

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
