# H3DU.Camera

[Back to documentation index.](index.md)

<a name='H3DU.Camera'></a>
### H3DU.Camera(batch, fov, nearZ, farZ, [canvas])

A class for controlling the projection and
view of a 3D scene, in the nature of an abstract "camera".
This class uses the concept of a "camera's position", or where
the camera is located in world space, as well
as a "reference point", or the point in world space that the camera
is looking at.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/camera.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/camera.js"></script>

#### Parameters

* `batch` (Type: H3DU.Batch3D)<br>A 3D batch to associate with this camera object. <i>Using a H3DU.Scene3D here is deprecated.</i>
* `fov` (Type: number)<br>Vertical field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be.) See <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>.
* `nearZ` (Type: number)<br>The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. See <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>. This should be slightly greater than 0.
* `farZ` (Type: number)<br>The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen. See <a href="H3DU.Math.md#H3DU.Math.mat4perspective">H3DU.Math.mat4perspective</a>.
* `canvas` (Type: HTMLCanvasElement) (optional)<br>A canvas to associate with this camera object. <i>This argument is deprecated.</i>

### Methods

* [getDistance](#H3DU.Camera_getDistance)<br>Finds the distance from the camera's position to the reference point.
* [getPosition](#H3DU.Camera_getPosition)<br>Gets the position of the camera.
* [getVectorFromCenter](#H3DU.Camera_getVectorFromCenter)<br>Gets the 3-element vector that points from the reference
point to the camera's position.
* [moveAngleHorizontal](#H3DU.Camera_moveAngleHorizontal)<br>Moves the camera to the left or right so that it faces
the same reference point at the same distance.
* [moveAngleVertical](#H3DU.Camera_moveAngleVertical)<br>Moves the camera upward or downward so that it faces
the same reference point at the same distance.
* [moveCenterHorizontal](#H3DU.Camera_moveCenterHorizontal)<br>**Deprecated: Use "moveHorizontal" instead.**
* [moveCenterVertical](#H3DU.Camera_moveCenterVertical)<br>**Deprecated: Use "moveVertical" instead.**
* [moveClose](#H3DU.Camera_moveClose)<br>Moves the camera the given distance, but not too close
to the reference point.
* [moveForward](#H3DU.Camera_moveForward)<br>Moves the camera forward the given distance.
* [moveHorizontal](#H3DU.Camera_moveHorizontal)<br>Moves the camera horizontally relative to the camera's up vector.
* [movePosition](#H3DU.Camera_movePosition)<br>**Deprecated: Renamed to "setPosition".**
* [moveVertical](#H3DU.Camera_moveVertical)<br>Moves the camera toward or away from the camera's up vector.
* [setDistance](#H3DU.Camera_setDistance)<br>Moves the camera a given distance from the reference
point without changing its orientation.
* [setPosition](#H3DU.Camera_setPosition)<br>Sets the position of the camera.
* [turnAngleHorizontal](#H3DU.Camera_turnAngleHorizontal)<br>Turns the camera to the left or right so that it faces
the same distance from a reference point.
* [turnAngleVertical](#H3DU.Camera_turnAngleVertical)<br>Turns the camera upward or downward so that it faces
the same distance from a reference point.
* [turnHorizontal](#H3DU.Camera_turnHorizontal)<br>**Deprecated: Renamed to "moveAngleHorizontal".**
* [turnVertical](#H3DU.Camera_turnVertical)<br>**Deprecated: Renamed to "moveAngleVertical".**
* [update](#H3DU.Camera_update)<br>Updates information about this camera based
on the state of an input tracker.

<a name='H3DU.Camera_getDistance'></a>
### H3DU.Camera#getDistance()

Finds the distance from the camera's position to the reference point.

#### Return Value

Return value. (Type: number)

<a name='H3DU.Camera_getPosition'></a>
### H3DU.Camera#getPosition()

Gets the position of the camera.

#### Return Value

An array of three numbers giving
the X, Y, and Z coordinates of the camera's position, respectively. (Type: Array.&lt;number>)

<a name='H3DU.Camera_getVectorFromCenter'></a>
### H3DU.Camera#getVectorFromCenter()

Gets the 3-element vector that points from the reference
point to the camera's position.

#### Return Value

The return value as a unit
vector (a <a href="H3DU.Math.md#H3DU.Math.vec3normalize">"normalized" vector</a> with a length of 1).
Returns (0,0,0) if the reference point is the same as the camera's position. (Type: Array.&lt;number>)

<a name='H3DU.Camera_moveAngleHorizontal'></a>
### H3DU.Camera#moveAngleHorizontal(angleDegrees)

Moves the camera to the left or right so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera leftward, and negative values rightward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_moveAngleVertical'></a>
### H3DU.Camera#moveAngleVertical(angleDegrees)

Moves the camera upward or downward so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera upward, and negative values downward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_moveCenterHorizontal'></a>
### H3DU.Camera#moveCenterHorizontal(dist)

**Deprecated: Use "moveHorizontal" instead.**

Moves the camera horizontally relative to the camera's up vector.

#### Parameters

* `dist` (Type: number)<br>Distance to move the camera.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_moveCenterVertical'></a>
### H3DU.Camera#moveCenterVertical(dist)

**Deprecated: Use "moveVertical" instead.**

Moves the camera toward or away from the camera's up vector.

#### Parameters

* `dist` (Type: number)<br>Distance to move the camera.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_moveClose'></a>
### H3DU.Camera#moveClose(dist)

Moves the camera the given distance, but not too close
to the reference point.

#### Parameters

* `dist` (Type: number)<br>The distance to move. Positive values mean forward, and negative distances mean back.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_moveForward'></a>
### H3DU.Camera#moveForward(dist)

Moves the camera forward the given distance.

#### Parameters

* `dist` (Type: number)<br>The distance to move. Positive values mean forward, and negative distances mean back.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_moveHorizontal'></a>
### H3DU.Camera#moveHorizontal(dist)

Moves the camera horizontally relative to the camera's up vector.

#### Parameters

* `dist` (Type: number)<br>Distance to move the camera.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_movePosition'></a>
### H3DU.Camera#movePosition(cx, cy, cz)

**Deprecated: Renamed to "setPosition".**

Sets the position of the camera.

#### Parameters

* `cx` (Type: number)<br>The camera's new X coordinate.
* `cy` (Type: number)<br>The camera's new Y coordinate.
* `cz` (Type: number)<br>The camera's new Z coordinate.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_moveVertical'></a>
### H3DU.Camera#moveVertical(dist)

Moves the camera toward or away from the camera's up vector.

#### Parameters

* `dist` (Type: number)<br>Distance to move the camera.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_setDistance'></a>
### H3DU.Camera#setDistance(dist)

Moves the camera a given distance from the reference
point without changing its orientation.

#### Parameters

* `dist` (Type: number)<br>Positive number giving the distance. If this is less than the near plane distance, the distance will be equal to the near plane distance. Does nothing if the distance is 0 or less.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_setPosition'></a>
### H3DU.Camera#setPosition(cx, [cy], [cz])

Sets the position of the camera.

#### Parameters

* `cx` (Type: number)<br>The camera's new X coordinate, or a 3-element vector containing the X, Y, and Z coordinates. In the latter case, "cy" and "cz" can be omitted.
* `cy` (Type: number) (optional)<br>The camera's new Y coordinate.
* `cz` (Type: number) (optional)<br>The camera's new Z coordinate.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_turnAngleHorizontal'></a>
### H3DU.Camera#turnAngleHorizontal(angleDegrees)

Turns the camera to the left or right so that it faces
the same distance from a reference point.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera rightward, and negative values leftward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_turnAngleVertical'></a>
### H3DU.Camera#turnAngleVertical(angleDegrees)

Turns the camera upward or downward so that it faces
the same distance from a reference point.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera upward, and negative values downward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_turnHorizontal'></a>
### H3DU.Camera#turnHorizontal(angleDegrees)

**Deprecated: Renamed to "moveAngleHorizontal".**

Moves the camera to the left or right so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera leftward, and negative values rightward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_turnVertical'></a>
### H3DU.Camera#turnVertical(angleDegrees)

**Deprecated: Renamed to "moveAngleVertical".**

Moves the camera upward or downward so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera upward, and negative values downward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="H3DU.Camera.md">H3DU.Camera</a>)

<a name='H3DU.Camera_update'></a>
### H3DU.Camera#update([input])

Updates information about this camera based
on the state of an input tracker.

#### Parameters

* `input` (Type: <a href="H3DU.InputTracker.md">H3DU.InputTracker</a>) (optional)<br>An input tracker. This method should be called right after the tracker's 'update' method was called. <i>Note that future versions may require this parameter.</i>

#### Return Value

Return value. (Type: Object)

[Back to documentation index.](index.md)
