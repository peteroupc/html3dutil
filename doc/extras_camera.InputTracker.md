# module:extras/camera.InputTracker

[Back to documentation index.](index.md)

<a name='extras_camera.InputTracker'></a>
### new module:extras/camera.InputTracker(element)

A class for tracking key press, mouse, touch, and mouse wheel
events.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

#### Parameters

* `element` (Type: HTMLElement | HTMLDocument)<br>The HTML document or element to track keyboard and mouse events for. If null, undefined, or omitted, uses the calling application's HTML document.

### Members

* [deltaXY](#extras_camera_InputTracker_deltaXY)<br>**Deprecated: Yes**
* [leftButton](#extras_camera_InputTracker_leftButton)<br>True if the left mouse button was detected as being down.
* [middleButton](#extras_camera_InputTracker_middleButton)<br>True if the middle mouse button was detected as being down.
* [rightButton](#extras_camera_InputTracker_rightButton)<br>True if the right mouse button was detected as being down.

### Methods

* [dispose](#extras_camera_InputTracker_dispose)<br>Disposes all resources used by this input tracker.
* [getKey](#extras_camera_InputTracker_getKey)<br>Gets whether a key is pressed, as detected by this
input tracker.
* [mousePos](#extras_camera_InputTracker_mousePos)<br>Returns the current mouse position, delta
mouse position, and delta mouse wheel
position (see the "update" method).
* [mousewheel](#extras_camera_InputTracker_mousewheel)<br>**Deprecated: Will be removed in the future. Use the
mousePos method to find out whether the user
has rotated the mouse wheel.**
* [update](#extras_camera_InputTracker_update)<br>Retrieves the current position of the mouse within
the page's client area, as detected by the input
tracker and calculates the "delta mouse position",
or the difference between
those values and the values they had the last
time this method was called.

<a name='extras_camera_InputTracker_deltaXY'></a>
### module:extras/camera~InputTracker#deltaXY

**Deprecated: Yes**

An alias for InputTracker#mousePos.

<a name='extras_camera_InputTracker_leftButton'></a>
### module:extras/camera~InputTracker#leftButton

True if the left mouse button was detected as being down.

Type: boolean

<a name='extras_camera_InputTracker_middleButton'></a>
### module:extras/camera~InputTracker#middleButton

True if the middle mouse button was detected as being down.

Type: boolean

<a name='extras_camera_InputTracker_rightButton'></a>
### module:extras/camera~InputTracker#rightButton

True if the right mouse button was detected as being down.

Type: boolean

<a name='extras_camera_InputTracker_dispose'></a>
### module:extras/camera~InputTracker#dispose()

Disposes all resources used by this input tracker.

#### Return Value

Return value. (Type: Object)

<a name='extras_camera_InputTracker_getKey'></a>
### module:extras/camera~InputTracker#getKey()

Gets whether a key is pressed, as detected by this
input tracker.

#### Return Value

key Key code of the key to check. (Type: number)

<a name='extras_camera_InputTracker_mousePos'></a>
### module:extras/camera~InputTracker#mousePos()

Returns the current mouse position, delta
mouse position, and delta mouse wheel
position (see the "update" method).

#### Return Value

An object containing the following keys:<ul>
<li><code>cx</code> - X coordinate of the current mouse
position.
<li><code>cx</code> - Y coordinate of the current mouse
position.
<li><code>x</code> - X component of the delta mouse position.
<li><code>y</code> - Y component of the delta mouse position.
<li><code>ticks</code> - The delta mouse wheel position.
</ul>
If this object's update method wasn't called, all these values
will be 0. (Type: Object)

<a name='extras_camera_InputTracker_mousewheel'></a>
### module:extras/camera~InputTracker#mousewheel(func)

**Deprecated: Will be removed in the future. Use the
mousePos method to find out whether the user
has rotated the mouse wheel.**

Sets a function to handle mouse wheel events.

#### Parameters

* `func` (Type: function)<br>A function.

#### Return Value

Return value. (Type: Object)

<a name='extras_camera_InputTracker_update'></a>
### module:extras/camera~InputTracker#update()

Retrieves the current position of the mouse within
the page's client area, as detected by the input
tracker and calculates the "delta mouse position",
or the difference between
those values and the values they had the last
time this method was called. If this method wasn't
called before for this tracker, the delta mouse position is
(0, 0). If the current position of the mouse is unknown,
it's (0, 0) instead.

Also retrieves the "delta mouse wheel position", or the
offset, in "ticks", from the mouse wheel position at the
last time this method was called (or the time this tracker
was created if it wasn't) to the current mouse wheel position.

#### Return Value

This object. (Type: InputTracker)

[Back to documentation index.](index.md)
