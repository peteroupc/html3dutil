# module:extras/drawingtoy.DrawingToy

[Back to documentation index.](index.md)

<a name='extras_drawingtoy.DrawingToy'></a>
### new module:extras/drawingtoy.DrawingToy()

Generates curves similar to those possible using commercially available drawing toys containing gear-toothed rings and wheels. Curves generated currently assume that the radius of each ring and wheel is equal to its tooth count divided by 5.

### Methods

* [continuousHypo](#extras_drawingtoy_DrawingToy_continuousHypo)<br>Adds line segments that approximate one or more curves drawn by rolling a wheel inside a fixed ring (<i>hypotrochoids</i>), where each additional curve may be drawn from a different hole position, a different ring position, or both.
* [epi](#extras_drawingtoy_DrawingToy_epi)<br>Adds line segments that approximate a curve drawn by rolling a wheel outside a fixed ring (an <i>epitrochoid</i>).
* [hypo](#extras_drawingtoy_DrawingToy_hypo)<br>Adds line segments that approximate a curve drawn by rolling a wheel inside a fixed ring (a <i>hypotrochoid</i>).
* [setColor](#extras_drawingtoy_DrawingToy_setColor)<br>Sets the color to apply when drawing future curves with this object.
* [toMeshBuffer](#extras_drawingtoy_DrawingToy_toMeshBuffer)<br>TODO: Not documented yet.

<a name='extras_drawingtoy_DrawingToy_continuousHypo'></a>
### module:extras/drawingtoy~DrawingToy#continuousHypo(ringTeeth, wheelTeeth, hole, phase, offset, holeStep, offsetStep, count)

Adds line segments that approximate one or more curves drawn by rolling a wheel inside a fixed ring (<i>hypotrochoids</i>), where each additional curve may be drawn from a different hole position, a different ring position, or both.

#### Parameters

* `ringTeeth` (Type: number)<br>Number of teeth in the fixed ring.
* `wheelTeeth` (Type: number)<br>Number of teeth in the rolling wheel.
* `hole` (Type: number)<br>Integer, starting from 1, identifying the hole within the wheel in which the drawing pen is placed. The greater the number, the closer the hole is to the center of the wheel.
* `phase` (Type: number)<br>Phase, in degrees, of the angle where the ring's and wheel's teeth are engaged. If null, undefined, or omitted, the default value is 0. TODO: Document this parameter more exactly.
* `offset` (Type: number)<br>X coordinate of the center of the fixed ring.
* `holeStep` (Type: number)<br>TODO: Not documented yet.
* `offsetStep` (Type: number)<br>TODO: Not documented yet.
* `count` (Type: number)<br>TODO: Not documented yet.

#### Return Value

This object. (Type: DrawingToy)

<a name='extras_drawingtoy_DrawingToy_epi'></a>
### module:extras/drawingtoy~DrawingToy#epi(ringTeeth, wheelTeeth, hole, [phase])

Adds line segments that approximate a curve drawn by rolling a wheel outside a fixed ring (an <i>epitrochoid</i>).

#### Parameters

* `ringTeeth` (Type: number)<br>Number of teeth in the fixed ring.
* `wheelTeeth` (Type: number)<br>Number of teeth in the rolling wheel.
* `hole` (Type: number)<br>Integer, starting from 1, identifying the hole within the wheel in which the drawing pen is placed. The greater the number, the closer the hole is to the center of the wheel.
* `phase` (Type: number) (optional)<br>Phase, in degrees, of the angle where the ring's and wheel's teeth are engaged. If null, undefined, or omitted, the default value is 0. TODO: Document this parameter more exactly.

#### Return Value

This object. (Type: DrawingToy)

<a name='extras_drawingtoy_DrawingToy_hypo'></a>
### module:extras/drawingtoy~DrawingToy#hypo(ringTeeth, wheelTeeth, hole, [phase], [offset])

Adds line segments that approximate a curve drawn by rolling a wheel inside a fixed ring (a <i>hypotrochoid</i>).

#### Parameters

* `ringTeeth` (Type: number)<br>Number of teeth in the fixed ring.
* `wheelTeeth` (Type: number)<br>Number of teeth in the rolling wheel.
* `hole` (Type: number)<br>Integer, starting from 1, identifying the hole within the wheel in which the drawing pen is placed. The greater the number, the closer the hole is to the center of the wheel.
* `phase` (Type: number) (optional)<br>Phase, in degrees, of the angle where the ring's and wheel's teeth are engaged. If null, undefined, or omitted, the default value is 0. TODO: Document this parameter more exactly.
* `offset` (Type: number) (optional)<br>X coordinate of the center of the fixed ring. If null, undefined, or omitted, the default value is 0.

#### Return Value

This object. (Type: DrawingToy)

<a name='extras_drawingtoy_DrawingToy_setColor'></a>
### module:extras/drawingtoy~DrawingToy#setColor(color)

Sets the color to apply when drawing future curves with this object.

#### Parameters

* `color` (Type: Array.&lt;number> | number | string)<br>A color vector or string identifying the color to apply.

#### Return Value

This object. (Type: DrawingToy)

<a name='extras_drawingtoy_DrawingToy_toMeshBuffer'></a>
### module:extras/drawingtoy~DrawingToy#toMeshBuffer()

TODO: Not documented yet.

#### Return Value

Return value. (Type: *)

[Back to documentation index.](index.md)
