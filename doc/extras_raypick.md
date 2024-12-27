# module:extras/raypick

[Back to documentation index.](index.md)

<a name='extras_raypick'></a>
### module:extras/raypick()

The <code>extras/raypick.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/raypick.js";
    // -- or --
    import * as CustomModuleName from "extras/raypick.js";

### Methods

* [raypick](#extras_raypick.raypick)<br>Finds the three-dimensional shape object and world-space coordinates
corresponding to the given two-dimensional (X and Y) coordinates.

<a name='extras_raypick.raypick'></a>
### (static) module:extras/raypick.raypick(x, y, projView, viewport, objects)

Finds the three-dimensional shape object and world-space coordinates
corresponding to the given two-dimensional (X and Y) coordinates.

#### Parameters

* `x`<br>Two-dimensional x-coordinate in window space (usually lying within the viewport rectangle). See also the first parameter of MathUtil.vec3fromWindowPoint.
* `y`<br>Two-dimensional y-coordinate in window space (usually lying within the viewport rectangle). See also the first parameter of MathUtil.vec3fromWindowPoint.
* `projView`<br>Same meaning as second parameter of MathUtil.vec3fromWindowPoint. For example, to convert to world space coordinates, pass a projection matrix (projection matrix multiplied by the view matrix, in that order) to this parameter.
* `viewport`<br>Same meaning as third parameter of MathUtil.vec3fromWindowPoint.
* `objects`<br>Shape objects from which this method will choose one.

#### Return Value

An object with the following properties:<ul>
<li><code>index</code> - Index, starting from 0, into the objects array
of the shape object that was picked. Is -1 if no object was picked
(and the "local" and "world" properties will be absent).
<li><code>local</code> - 3-element array giving the x-, y-, and z-coordinates of the picked point in object (model) space.
<li><code>world</code> - 3-element array giving the x-, y-, and z-coordinates of the picked point in world space.</ul>

#### Examples

The following example shows how a hypothetical scene graph could implement picking objects based on the position of the mouse cursor.

    var mousePos = scene.getMousePosInPixels();
    var viewport = [0, 0, scene.getWidth(), scene.getHeight()];
    var projview = scene.getProjectionViewMatrix();
    var o = raypick(mousePos.cx, mousePos.cy, projview, viewport, objects);
    if(o.index >= 0) {
    pickedShape = objects[o.index];
    } else {
    pickedShape = null;
    }

[Back to documentation index.](index.md)
