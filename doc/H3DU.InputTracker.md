# H3DU.InputTracker

[Back to documentation index.](index.md)

<a name='H3DU.InputTracker'></a>
### H3DU.InputTracker(element)

A class for tracking key press, mouse, touch, and mouse wheel
events.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/camera.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/camera.js"></script>

#### Parameters

* `element` (Type: HTMLElement | HTMLDocument)<br>The HTML document or element to track keyboard and mouse events for. If null or omitted, uses the calling application's HTML document.

### Members

* [A](#H3DU.InputTracker.A)<br>Key code for the A key.
* [ADD](#H3DU.InputTracker.ADD)<br>Key code for the plus key.
* [ALT](#H3DU.InputTracker.ALT)<br>Key code for the return key.
* [CTRL](#H3DU.InputTracker.CTRL)<br>Key code for the return key.
* [DELETE](#H3DU.InputTracker.DELETE)<br>Key code for the delete key.
* [DOWN](#H3DU.InputTracker.DOWN)<br>Key code for the down arrow key.
* [END](#H3DU.InputTracker.END)<br>Key code for the end key.
* [ENTER](#H3DU.InputTracker.ENTER)<br>Key code for the enter key.
* [ESC](#H3DU.InputTracker.ESC)<br>Key code for the return key.
* [HOME](#H3DU.InputTracker.HOME)<br>Key code for the home key.
* [LEFT](#H3DU.InputTracker.LEFT)<br>Key code for the left arrow key.
* [PAGEDOWN](#H3DU.InputTracker.PAGEDOWN)<br>Key code for the page down key.
* [PAGEUP](#H3DU.InputTracker.PAGEUP)<br>Key code for the page up key.
* [RETURN](#H3DU.InputTracker.RETURN)<br>Key code for the return key.
* [RIGHT](#H3DU.InputTracker.RIGHT)<br>Key code for the right arrow key.
* [SHIFT](#H3DU.InputTracker.SHIFT)<br>Key code for the shift key.
* [SPACE](#H3DU.InputTracker.SPACE)<br>Key code for the space bar.
* [SUBTRACT](#H3DU.InputTracker.SUBTRACT)<br>Key code for the minus key.
* [TAB](#H3DU.InputTracker.TAB)<br>Key code for the tab key.
* [UP](#H3DU.InputTracker.UP)<br>Key code for the up arrow key.
* [ZERO](#H3DU.InputTracker.ZERO)<br>Key code for the 0 key.
* [deltaXY](#H3DU.InputTracker_deltaXY)<br>**Deprecated: Yes**
* [leftButton](#H3DU.InputTracker_leftButton)<br>True if the left mouse button was detected as being down.
* [middleButton](#H3DU.InputTracker_middleButton)<br>True if the middle mouse button was detected as being down.
* [rightButton](#H3DU.InputTracker_rightButton)<br>True if the right mouse button was detected as being down.

### Methods

* [dispose](#H3DU.InputTracker_dispose)<br>Disposes all resources used by this input tracker.
* [getKey](#H3DU.InputTracker_getKey)<br>Gets whether a key is pressed, as detected by this
input tracker.
* [mousePos](#H3DU.InputTracker_mousePos)<br>Returns the current mouse position, delta
mouse position, and delta mouse wheel
position (see the "update" method).
* [mousewheel](#H3DU.InputTracker_mousewheel)<br>**Deprecated: Will be removed in the future. Use the
mousePos method to find out whether the user
has rotated the mouse wheel.**
* [update](#H3DU.InputTracker_update)<br>Retrieves the current position of the mouse within
the page's client area, as detected by the input
tracker and calculates the "delta mouse position",
or the difference between
those values and the values they had the last
time this method was called.

<a name='H3DU.InputTracker.A'></a>
### H3DU.InputTracker.A (constant)

Key code for the A key. Add 1 through 25 to get
the keys for the other letters of the English alphabet.

Default Value: `65`

<a name='H3DU.InputTracker.ADD'></a>
### H3DU.InputTracker.ADD (constant)

Key code for the plus key.

Default Value: `107`

<a name='H3DU.InputTracker.ALT'></a>
### H3DU.InputTracker.ALT (constant)

Key code for the return key.

Default Value: `18`

<a name='H3DU.InputTracker.CTRL'></a>
### H3DU.InputTracker.CTRL (constant)

Key code for the return key.

Default Value: `17`

<a name='H3DU.InputTracker.DELETE'></a>
### H3DU.InputTracker.DELETE (constant)

Key code for the delete key.

Default Value: `46`

<a name='H3DU.InputTracker.DOWN'></a>
### H3DU.InputTracker.DOWN (constant)

Key code for the down arrow key.

Default Value: `40`

<a name='H3DU.InputTracker.END'></a>
### H3DU.InputTracker.END (constant)

Key code for the end key.

Default Value: `35`

<a name='H3DU.InputTracker.ENTER'></a>
### H3DU.InputTracker.ENTER (constant)

Key code for the enter key.

Default Value: `13`

<a name='H3DU.InputTracker.ESC'></a>
### H3DU.InputTracker.ESC (constant)

Key code for the return key.

Default Value: `27`

<a name='H3DU.InputTracker.HOME'></a>
### H3DU.InputTracker.HOME (constant)

Key code for the home key.

Default Value: `36`

<a name='H3DU.InputTracker.LEFT'></a>
### H3DU.InputTracker.LEFT (constant)

Key code for the left arrow key.

Default Value: `37`

<a name='H3DU.InputTracker.PAGEDOWN'></a>
### H3DU.InputTracker.PAGEDOWN (constant)

Key code for the page down key.

Default Value: `34`

<a name='H3DU.InputTracker.PAGEUP'></a>
### H3DU.InputTracker.PAGEUP (constant)

Key code for the page up key.

Default Value: `33`

<a name='H3DU.InputTracker.RETURN'></a>
### H3DU.InputTracker.RETURN (constant)

Key code for the return key.

Default Value: `10`

<a name='H3DU.InputTracker.RIGHT'></a>
### H3DU.InputTracker.RIGHT (constant)

Key code for the right arrow key.

Default Value: `39`

<a name='H3DU.InputTracker.SHIFT'></a>
### H3DU.InputTracker.SHIFT (constant)

Key code for the shift key.

Default Value: `16`

<a name='H3DU.InputTracker.SPACE'></a>
### H3DU.InputTracker.SPACE (constant)

Key code for the space bar.

Default Value: `32`

<a name='H3DU.InputTracker.SUBTRACT'></a>
### H3DU.InputTracker.SUBTRACT (constant)

Key code for the minus key.

Default Value: `109`

<a name='H3DU.InputTracker.TAB'></a>
### H3DU.InputTracker.TAB (constant)

Key code for the tab key.

Default Value: `9`

<a name='H3DU.InputTracker.UP'></a>
### H3DU.InputTracker.UP (constant)

Key code for the up arrow key.

Default Value: `38`

<a name='H3DU.InputTracker.ZERO'></a>
### H3DU.InputTracker.ZERO (constant)

Key code for the 0 key. Add 1 through 9 to get
the keys for the other basic digits 1 through 9.

Default Value: `48`

<a name='H3DU.InputTracker_deltaXY'></a>
### H3DU.InputTracker#deltaXY

**Deprecated: Yes**

An alias for <a href="H3DU.InputTracker.md#H3DU.InputTracker_mousePos">H3DU.InputTracker#mousePos</a>.

<a name='H3DU.InputTracker_leftButton'></a>
### H3DU.InputTracker#leftButton

True if the left mouse button was detected as being down.

Type: Boolean

<a name='H3DU.InputTracker_middleButton'></a>
### H3DU.InputTracker#middleButton

True if the middle mouse button was detected as being down.

Type: Boolean

<a name='H3DU.InputTracker_rightButton'></a>
### H3DU.InputTracker#rightButton

True if the right mouse button was detected as being down.

Type: Boolean

<a name='H3DU.InputTracker_dispose'></a>
### H3DU.InputTracker#dispose()

Disposes all resources used by this input tracker.

#### Return Value

Return value. (Type: Object)

<a name='H3DU.InputTracker_getKey'></a>
### H3DU.InputTracker#getKey()

Gets whether a key is pressed, as detected by this
input tracker.

#### Return Value

key Key code of the key to check. (Type: number)

<a name='H3DU.InputTracker_mousePos'></a>
### H3DU.InputTracker#mousePos()

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

<a name='H3DU.InputTracker_mousewheel'></a>
### H3DU.InputTracker#mousewheel(func)

**Deprecated: Will be removed in the future. Use the
mousePos method to find out whether the user
has rotated the mouse wheel.**

Sets a function to handle mouse wheel events.

#### Parameters

* `func` (Type: function)<br>A function.

#### Return Value

Return value. (Type: Object)

<a name='H3DU.InputTracker_update'></a>
### H3DU.InputTracker#update()

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

This object. (Type: <a href="H3DU.InputTracker.md">H3DU.InputTracker</a>)

[Back to documentation index.](index.md)
