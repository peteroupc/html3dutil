# module:extras/camera.Camera

[Back to documentation index.](index.md)

<a name='extras_camera.Camera'></a>
### new module:extras/camera.Camera(fov, nearZ, farZ)

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

* `fov` (Type: number)<br>Vertical field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be.) See <a href="MathUtil.md#MathUtil.mat4perspective">MathUtil.mat4perspective</a>.
* `nearZ` (Type: number)<br>The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. See <a href="MathUtil.md#MathUtil.mat4perspective">MathUtil.mat4perspective</a>. This should be slightly greater than 0.
* `farZ` (Type: number)<br>The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen. See <a href="MathUtil.md#MathUtil.mat4perspective">MathUtil.mat4perspective</a>.

### Methods

* [getDistance](#extras_camera_Camera_getDistance)<br>Finds the distance from the camera's position to the reference point.
* [getPosition](#extras_camera_Camera_getPosition)<br>Gets the position of the camera.
* [getVectorFromCenter](#extras_camera_Camera_getVectorFromCenter)<br>Gets the 3-element vector that points from the reference
point to the camera's position.
* [moveAngleHorizontal](#extras_camera_Camera_moveAngleHorizontal)<br>Moves the camera to the left or right so that it faces
the same reference point at the same distance.
* [moveAngleVertical](#extras_camera_Camera_moveAngleVertical)<br>Moves the camera upward or downward so that it faces
the same reference point at the same distance.
* [moveClose](#extras_camera_Camera_moveClose)<br>Moves the camera the given distance, but not too close
to the reference point.
* [moveForward](#extras_camera_Camera_moveForward)<br>Moves the camera forward the given distance.
* [moveHorizontal](#extras_camera_Camera_moveHorizontal)<br>Moves the camera horizontally relative to the camera's up vector.
* [moveVertical](#extras_camera_Camera_moveVertical)<br>Moves the camera toward or away from the camera's up vector.
* [setDistance](#extras_camera_Camera_setDistance)<br>Moves the camera a given distance from the reference
point without changing its orientation.
* [setPosition](#extras_camera_Camera_setPosition)<br>Sets the position of the camera.
* [turnAngleHorizontal](#extras_camera_Camera_turnAngleHorizontal)<br>Turns the camera to the left or right so that it faces
the same distance from a reference point.
* [turnAngleVertical](#extras_camera_Camera_turnAngleVertical)<br>Turns the camera upward or downward so that it faces
the same distance from a reference point.
* [update](#extras_camera_Camera_update)<br>Updates information about this camera based
on the state of an input tracker.

<a name='extras_camera_Camera_getDistance'></a>
### module:extras/camera~Camera#getDistance()

Finds the distance from the camera's position to the reference point.

#### Return Value

Return value. (Type: number)

<a name='extras_camera_Camera_getPosition'></a>
### module:extras/camera~Camera#getPosition()

Gets the position of the camera.

#### Return Value

An array of three numbers giving
the X, Y, and Z coordinates of the camera's position, respectively. (Type: Array.&lt;number>)

<a name='extras_camera_Camera_getVectorFromCenter'></a>
### module:extras/camera~Camera#getVectorFromCenter()

Gets the 3-element vector that points from the reference
point to the camera's position.

#### Return Value

The return value as a unit
vector (a <a href="MathUtil.md#MathUtil.vec3normalize">"normalized" vector</a> with a length of 1).
Returns (0,0,0) if the reference point is the same as the camera's position. (Type: Array.&lt;number>)

<a name='extras_camera_Camera_moveAngleHorizontal'></a>
### module:extras/camera~Camera#moveAngleHorizontal(angleDegrees)

Moves the camera to the left or right so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera leftward, and negative values rightward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_moveAngleVertical'></a>
### module:extras/camera~Camera#moveAngleVertical(angleDegrees)

Moves the camera upward or downward so that it faces
the same reference point at the same distance.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera upward, and negative values downward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_moveClose'></a>
### module:extras/camera~Camera#moveClose(dist)

Moves the camera the given distance, but not too close
to the reference point.

#### Parameters

* `dist` (Type: number)<br>The distance to move. Positive values mean forward, and negative distances mean back.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_moveForward'></a>
### module:extras/camera~Camera#moveForward(dist)

Moves the camera forward the given distance.

#### Parameters

* `dist` (Type: number)<br>The distance to move. Positive values mean forward, and negative distances mean back.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_moveHorizontal'></a>
### module:extras/camera~Camera#moveHorizontal(dist)

Moves the camera horizontally relative to the camera's up vector.

#### Parameters

* `dist` (Type: number)<br>Distance to move the camera.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_moveVertical'></a>
### module:extras/camera~Camera#moveVertical(dist)

Moves the camera toward or away from the camera's up vector.

#### Parameters

* `dist` (Type: number)<br>Distance to move the camera.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_setDistance'></a>
### module:extras/camera~Camera#setDistance(dist)

Moves the camera a given distance from the reference
point without changing its orientation.

#### Parameters

* `dist` (Type: number)<br>Positive number giving the distance. If this is less than the near plane distance, the distance will be equal to the near plane distance. Does nothing if the distance is 0 or less.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_setPosition'></a>
### module:extras/camera~Camera#setPosition(cx, [cy], [cz])

Sets the position of the camera.

#### Parameters

* `cx` (Type: number)<br>The camera's new X coordinate, or a 3-element vector containing the X, Y, and Z coordinates. In the latter case, "cy" and "cz" can be omitted.
* `cy` (Type: number) (optional)<br>The camera's new Y coordinate.
* `cz` (Type: number) (optional)<br>The camera's new Z coordinate.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_turnAngleHorizontal'></a>
### module:extras/camera~Camera#turnAngleHorizontal(angleDegrees)

Turns the camera to the left or right so that it faces
the same distance from a reference point.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera rightward, and negative values leftward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_turnAngleVertical'></a>
### module:extras/camera~Camera#turnAngleVertical(angleDegrees)

Turns the camera upward or downward so that it faces
the same distance from a reference point.

#### Parameters

* `angleDegrees` (Type: number)<br>The angle to rotate the camera, in degrees. If the coordinate-system is right-handed, positive values rotate the camera upward, and negative values downward. If the coordinate-system is left-handed, vice versa.

#### Return Value

This object. (Type: Camera)

<a name='extras_camera_Camera_update'></a>
### module:extras/camera~Camera#update([input])

Updates information about this camera based
on the state of an input tracker.

#### Parameters

* `input` (Type: InputTracker) (optional)<br>An input tracker. This method should be called right after the tracker's 'update' method was called. <i>Note that future versions may require this parameter.</i>

#### Return Value

Return value. (Type: Object)

[Back to documentation index.](index.md)
