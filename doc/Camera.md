# Camera

[Back to documentation index.](index.md)

### Camera(batch, fov, nearZ, farZ, [canvas]) <a id='Camera'></a>

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

    &lt;script type="text/javascript" src="extras/camera.js">&lt;/script>

#### Parameters

* `batch` (Type: <a href="H3DU_Batch3D.md">H3DU.Batch3D</a>)<br>
    A 3D scene to associate with this camera object.
* `fov` (Type: Number)<br>
    Vertical field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be.)
* `nearZ` (Type: Number)<br>
    The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. This should be slightly greater than 0.
* `farZ` (Type: Number)<br>
    The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen.
* `canvas` (Type: HTMLCanvasElement) (optional)<br>
    A canvas to associate with this camera object. <i>This argument is deprecated.</i>

### Methods

* [getDistance](#Camera_Camera_getDistance)
* [getPosition](#Camera_Camera_getPosition)
* [getVectorFromCenter](#Camera_Camera_getVectorFromCenter)
* [moveAngleHorizontal](#Camera_Camera_moveAngleHorizontal)
* [moveAngleVertical](#Camera_Camera_moveAngleVertical)
* [moveCenterHorizontal](#Camera_Camera_moveCenterHorizontal)
* [moveCenterVertical](#Camera_Camera_moveCenterVertical)
* [moveClose](#Camera_Camera_moveClose)
* [moveForward](#Camera_Camera_moveForward)
* [moveHorizontal](#Camera_Camera_moveHorizontal)
* [movePosition](#Camera_Camera_movePosition)
* [moveVertical](#Camera_Camera_moveVertical)
* [setDistance](#Camera_Camera_setDistance)
* [setPosition](#Camera_Camera_setPosition)
* [turnHorizontal](#Camera_Camera_turnHorizontal)
* [turnVertical](#Camera_Camera_turnVertical)
* [update](#Camera_Camera_update)

### Camera#getDistance() <a id='Camera_Camera_getDistance'></a>

Finds the distance from the camera's position to the reference point.

#### Return Value

Return value. (Type: Number)

### Camera#getPosition() <a id='Camera_Camera_getPosition'></a>

Gets the position of the camera.

#### Return Value

An array of three numbers giving
the X, Y, and Z coordinates of the camera's position, respectively. (Type: Array.&lt;Number>)

### Camera#getVectorFromCenter() <a id='Camera_Camera_getVectorFromCenter'></a>

Gets the 3-element vector that points from the reference
point to the camera's position.

#### Return Value

The return value as a unit
vector (a <a href="H3DU_Math.md#H3DU_Math_vec3norm">"normalized" vector</a> with a length of 1).
Returns (0,0,0) if the reference point is the same as the camera's position. (Type: Array.&lt;Number>)

### Camera#moveAngleHorizontal(angleDegrees) <a id='Camera_Camera_moveAngleHorizontal'></a>

Moves the camera to the left or right so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: Number)<br>
    The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera leftward, and negative values rightward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#moveAngleVertical(angleDegrees) <a id='Camera_Camera_moveAngleVertical'></a>

Moves the camera upward or downward so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: Number)<br>
    The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera upward, and negative values downward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#moveCenterHorizontal(dist) <a id='Camera_Camera_moveCenterHorizontal'></a>

<b>Deprecated: Use "moveHorizontal" instead.</b>

Moves the camera horizontally relative to the camera's up vector.

#### Parameters

* `dist` (Type: Number)<br>
    Distance to move the camera.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#moveCenterVertical(dist) <a id='Camera_Camera_moveCenterVertical'></a>

<b>Deprecated: Use "moveVertical" instead.</b>

Moves the camera toward or away from the camera's up vector.

#### Parameters

* `dist` (Type: Number)<br>
    Distance to move the camera.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#moveClose(dist) <a id='Camera_Camera_moveClose'></a>

Moves the camera the given distance, but not too close
to the reference point.

#### Parameters

* `dist` (Type: Number)<br>
    The distance to move. Positive values mean forward, and negative distances mean back.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#moveForward(dist) <a id='Camera_Camera_moveForward'></a>

Moves the camera forward the given distance.

#### Parameters

* `dist` (Type: Number)<br>
    The distance to move. Positive values mean forward, and negative distances mean back.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#moveHorizontal(dist) <a id='Camera_Camera_moveHorizontal'></a>

Moves the camera horizontally relative to the camera's up vector.

#### Parameters

* `dist` (Type: Number)<br>
    Distance to move the camera.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#movePosition(cx, cy, cz) <a id='Camera_Camera_movePosition'></a>

<b>Deprecated: Renamed to "setPosition".</b>

Sets the position of the camera.

#### Parameters

* `cx` (Type: Number)<br>
    The camera's new X-coordinate.
* `cy` (Type: Number)<br>
    The camera's new Y-coordinate.
* `cz` (Type: Number)<br>
    The camera's new Z-coordinate.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#moveVertical(dist) <a id='Camera_Camera_moveVertical'></a>

Moves the camera toward or away from the camera's up vector.

#### Parameters

* `dist` (Type: Number)<br>
    Distance to move the camera.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#setDistance(dist) <a id='Camera_Camera_setDistance'></a>

Moves the camera a given distance from the reference
point without changing its orientation.

#### Parameters

* `dist` (Type: Number)<br>
    Positive number giving the distance. If this is less than the near plane distance, the distance will be equal to the near plane distance. Does nothing if the distance is 0 or less.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#setPosition(cx, [cy], [cz]) <a id='Camera_Camera_setPosition'></a>

Sets the position of the camera.

#### Parameters

* `cx` (Type: Number)<br>
    The camera's new X-coordinate, or a 3-element vector containing the X, Y, and Z coordinates. In the latter case, "cy" and "cz" can be omitted.
* `cy` (Type: Number) (optional)<br>
    The camera's new Y-coordinate.
* `cz` (Type: Number) (optional)<br>
    The camera's new Z-coordinate.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#turnHorizontal(angleDegrees) <a id='Camera_Camera_turnHorizontal'></a>

Turns the camera to the left or right so that it faces
 the same distance from a reference point.

#### Parameters

* `angleDegrees` (Type: Number)<br>
    The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera rightward, and negative values leftward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#turnVertical(angleDegrees) <a id='Camera_Camera_turnVertical'></a>

Turns the camera upward or downward so that it faces
 the same distance from a reference point.

#### Parameters

* `angleDegrees` (Type: Number)<br>
    The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera upward, and negative values downward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: <a href="Camera.md">Camera</a>)

### Camera#update([input]) <a id='Camera_Camera_update'></a>

Updates information about this camera based
on the state of an input tracker.

#### Parameters

* `input` (Type: <a href="InputTracker.md">InputTracker</a>) (optional)<br>
    An input tracker. This method should be called right after the tracker's 'update' method was called. <i>Note that future versions may require this parameter.</i>

#### Return Value

Return value. (Type: Object)
