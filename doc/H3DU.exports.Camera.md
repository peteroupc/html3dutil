# H3DU.exports.Camera

[Back to documentation index.](index.md)

<a name='H3DU.exports.Camera'></a>
### new H3DU.exports.Camera(fov, nearZ, farZ)

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

* `fov` (Type: number)<br>Vertical field of view, in degrees. Should be less than 180 degrees. (The smaller this number, the bigger close objects appear to be.) See MathUtil.mat4perspective.
* `nearZ` (Type: number)<br>The distance from the camera to the near clipping plane. Objects closer than this distance won't be seen. See MathUtil.mat4perspective. This should be slightly greater than 0.
* `farZ` (Type: number)<br>The distance from the camera to the far clipping plane. Objects beyond this distance will be too far to be seen. See MathUtil.mat4perspective.

[Back to documentation index.](index.md)
