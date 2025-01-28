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

* [A](#extras_camera_InputTracker.A)<br>Key code for the A key.
* [ADD](#extras_camera_InputTracker.ADD)<br>Key code for the plus key.
* [ALT](#extras_camera_InputTracker.ALT)<br>Key code for the return key.
* [CTRL](#extras_camera_InputTracker.CTRL)<br>Key code for the return key.
* [DELETE](#extras_camera_InputTracker.DELETE)<br>Key code for the delete key.
* [DOWN](#extras_camera_InputTracker.DOWN)<br>Key code for the down arrow key.
* [END](#extras_camera_InputTracker.END)<br>Key code for the end key.
* [ENTER](#extras_camera_InputTracker.ENTER)<br>Key code for the enter key.
* [ESC](#extras_camera_InputTracker.ESC)<br>Key code for the return key.
* [HOME](#extras_camera_InputTracker.HOME)<br>Key code for the home key.
* [LEFT](#extras_camera_InputTracker.LEFT)<br>Key code for the left arrow key.
* [PAGEDOWN](#extras_camera_InputTracker.PAGEDOWN)<br>Key code for the page down key.
* [PAGEUP](#extras_camera_InputTracker.PAGEUP)<br>Key code for the page up key.
* [RETURN](#extras_camera_InputTracker.RETURN)<br>Key code for the return key.
* [RIGHT](#extras_camera_InputTracker.RIGHT)<br>Key code for the right arrow key.
* [SHIFT](#extras_camera_InputTracker.SHIFT)<br>Key code for the shift key.
* [SPACE](#extras_camera_InputTracker.SPACE)<br>Key code for the space bar.
* [SUBTRACT](#extras_camera_InputTracker.SUBTRACT)<br>Key code for the minus key.
* [TAB](#extras_camera_InputTracker.TAB)<br>Key code for the tab key.
* [UP](#extras_camera_InputTracker.UP)<br>Key code for the up arrow key.
* [ZERO](#extras_camera_InputTracker.ZERO)<br>Key code for the 0 key.
* [deltaXY](#extras_camera_InputTracker_deltaXY)<br>**Obsolete: Yes**
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
* [update](#extras_camera_InputTracker_update)<br>Retrieves the current position of the mouse within
the page's client area, as detected by the input
tracker and calculates the "delta mouse position",
or the difference between
those values and the values they had the last
time this method was called.

<a name='extras_camera_InputTracker.A'></a>
### module:extras/camera~InputTracker.A (constant)

Key code for the A key. Add 1 through 25 to get
the keys for the other letters of the English alphabet.

Default Value: `65`

<a name='extras_camera_InputTracker.ADD'></a>
### module:extras/camera~InputTracker.ADD (constant)

Key code for the plus key.

Default Value: `107`

<a name='extras_camera_InputTracker.ALT'></a>
### module:extras/camera~InputTracker.ALT (constant)

Key code for the return key.

Default Value: `18`

<a name='extras_camera_InputTracker.CTRL'></a>
### module:extras/camera~InputTracker.CTRL (constant)

Key code for the return key.

Default Value: `17`

<a name='extras_camera_InputTracker.DELETE'></a>
### module:extras/camera~InputTracker.DELETE (constant)

Key code for the delete key.

Default Value: `46`

<a name='extras_camera_InputTracker.DOWN'></a>
### module:extras/camera~InputTracker.DOWN (constant)

Key code for the down arrow key.

Default Value: `40`

<a name='extras_camera_InputTracker.END'></a>
### module:extras/camera~InputTracker.END (constant)

Key code for the end key.

Default Value: `35`

<a name='extras_camera_InputTracker.ENTER'></a>
### module:extras/camera~InputTracker.ENTER (constant)

Key code for the enter key.

Default Value: `13`

<a name='extras_camera_InputTracker.ESC'></a>
### module:extras/camera~InputTracker.ESC (constant)

Key code for the return key.

Default Value: `27`

<a name='extras_camera_InputTracker.HOME'></a>
### module:extras/camera~InputTracker.HOME (constant)

Key code for the home key.

Default Value: `36`

<a name='extras_camera_InputTracker.LEFT'></a>
### module:extras/camera~InputTracker.LEFT (constant)

Key code for the left arrow key.

Default Value: `37`

<a name='extras_camera_InputTracker.PAGEDOWN'></a>
### module:extras/camera~InputTracker.PAGEDOWN (constant)

Key code for the page down key.

Default Value: `34`

<a name='extras_camera_InputTracker.PAGEUP'></a>
### module:extras/camera~InputTracker.PAGEUP (constant)

Key code for the page up key.

Default Value: `33`

<a name='extras_camera_InputTracker.RETURN'></a>
### module:extras/camera~InputTracker.RETURN (constant)

Key code for the return key.

Default Value: `10`

<a name='extras_camera_InputTracker.RIGHT'></a>
### module:extras/camera~InputTracker.RIGHT (constant)

Key code for the right arrow key.

Default Value: `39`

<a name='extras_camera_InputTracker.SHIFT'></a>
### module:extras/camera~InputTracker.SHIFT (constant)

Key code for the shift key.

Default Value: `16`

<a name='extras_camera_InputTracker.SPACE'></a>
### module:extras/camera~InputTracker.SPACE (constant)

Key code for the space bar.

Default Value: `32`

<a name='extras_camera_InputTracker.SUBTRACT'></a>
### module:extras/camera~InputTracker.SUBTRACT (constant)

Key code for the minus key.

Default Value: `109`

<a name='extras_camera_InputTracker.TAB'></a>
### module:extras/camera~InputTracker.TAB (constant)

Key code for the tab key.

Default Value: `9`

<a name='extras_camera_InputTracker.UP'></a>
### module:extras/camera~InputTracker.UP (constant)

Key code for the up arrow key.

Default Value: `38`

<a name='extras_camera_InputTracker.ZERO'></a>
### module:extras/camera~InputTracker.ZERO (constant)

Key code for the 0 key. Add 1 through 9 to get
the keys for the other basic digits 1 through 9.

Default Value: `48`

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
<li><code>cx</code> - x-coordinate of the current mouse
position.
<li><code>cx</code> - y-coordinate of the current mouse
position.
<li><code>x</code> - X component of the delta mouse position.
<li><code>y</code> - Y component of the delta mouse position.
<li><code>ticks</code> - The delta mouse wheel position.
</ul>
If this object's update method wasn't called, all these values
will be 0. (Type: Object)

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
