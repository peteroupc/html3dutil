# InputTracker

[Back to documentation index.](index.md)

<a name='InputTracker'></a>
### InputTracker(element)

A class for tracking key press, mouse, touch, and mouse wheel
events.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

#### Parameters

* `element` (Type: HTMLElement | HTMLDocument)<br>The HTML document or element to track keyboard and mouse events for. If null, undefined, or omitted, uses the calling application's HTML document.

### Members

* [A](#InputTracker.A)<br>Key code for the A key.
* [ADD](#InputTracker.ADD)<br>Key code for the plus key.
* [ALT](#InputTracker.ALT)<br>Key code for the return key.
* [CTRL](#InputTracker.CTRL)<br>Key code for the return key.
* [DELETE](#InputTracker.DELETE)<br>Key code for the delete key.
* [DOWN](#InputTracker.DOWN)<br>Key code for the down arrow key.
* [END](#InputTracker.END)<br>Key code for the end key.
* [ENTER](#InputTracker.ENTER)<br>Key code for the enter key.
* [ESC](#InputTracker.ESC)<br>Key code for the return key.
* [HOME](#InputTracker.HOME)<br>Key code for the home key.
* [LEFT](#InputTracker.LEFT)<br>Key code for the left arrow key.
* [PAGEDOWN](#InputTracker.PAGEDOWN)<br>Key code for the page down key.
* [PAGEUP](#InputTracker.PAGEUP)<br>Key code for the page up key.
* [RETURN](#InputTracker.RETURN)<br>Key code for the return key.
* [RIGHT](#InputTracker.RIGHT)<br>Key code for the right arrow key.
* [SHIFT](#InputTracker.SHIFT)<br>Key code for the shift key.
* [SPACE](#InputTracker.SPACE)<br>Key code for the space bar.
* [SUBTRACT](#InputTracker.SUBTRACT)<br>Key code for the minus key.
* [TAB](#InputTracker.TAB)<br>Key code for the tab key.
* [UP](#InputTracker.UP)<br>Key code for the up arrow key.
* [ZERO](#InputTracker.ZERO)<br>Key code for the 0 key.
* [deltaXY](#InputTracker_deltaXY)<br>**Deprecated: Yes**

### Methods

* [dispose](#InputTracker_dispose)<br>Disposes all resources used by this input tracker.
* [getKey](#InputTracker_getKey)<br>Gets whether a key is pressed, as detected by this
input tracker.
* [mousePos](#InputTracker_mousePos)<br>Returns the current mouse position, delta
mouse position, and delta mouse wheel
position (see the "update" method).
* [mousewheel](#InputTracker_mousewheel)<br>**Deprecated: Will be removed in the future. Use the
mousePos method to find out whether the user
has rotated the mouse wheel.**
* [update](#InputTracker_update)<br>Retrieves the current position of the mouse within
the page's client area, as detected by the input
tracker and calculates the "delta mouse position",
or the difference between
those values and the values they had the last
time this method was called.

<a name='InputTracker.A'></a>
### InputTracker.A (constant)

Key code for the A key. Add 1 through 25 to get
the keys for the other letters of the English alphabet.

Default Value: `65`

<a name='InputTracker.ADD'></a>
### InputTracker.ADD (constant)

Key code for the plus key.

Default Value: `107`

<a name='InputTracker.ALT'></a>
### InputTracker.ALT (constant)

Key code for the return key.

Default Value: `18`

<a name='InputTracker.CTRL'></a>
### InputTracker.CTRL (constant)

Key code for the return key.

Default Value: `17`

<a name='InputTracker.DELETE'></a>
### InputTracker.DELETE (constant)

Key code for the delete key.

Default Value: `46`

<a name='InputTracker.DOWN'></a>
### InputTracker.DOWN (constant)

Key code for the down arrow key.

Default Value: `40`

<a name='InputTracker.END'></a>
### InputTracker.END (constant)

Key code for the end key.

Default Value: `35`

<a name='InputTracker.ENTER'></a>
### InputTracker.ENTER (constant)

Key code for the enter key.

Default Value: `13`

<a name='InputTracker.ESC'></a>
### InputTracker.ESC (constant)

Key code for the return key.

Default Value: `27`

<a name='InputTracker.HOME'></a>
### InputTracker.HOME (constant)

Key code for the home key.

Default Value: `36`

<a name='InputTracker.LEFT'></a>
### InputTracker.LEFT (constant)

Key code for the left arrow key.

Default Value: `37`

<a name='InputTracker.PAGEDOWN'></a>
### InputTracker.PAGEDOWN (constant)

Key code for the page down key.

Default Value: `34`

<a name='InputTracker.PAGEUP'></a>
### InputTracker.PAGEUP (constant)

Key code for the page up key.

Default Value: `33`

<a name='InputTracker.RETURN'></a>
### InputTracker.RETURN (constant)

Key code for the return key.

Default Value: `10`

<a name='InputTracker.RIGHT'></a>
### InputTracker.RIGHT (constant)

Key code for the right arrow key.

Default Value: `39`

<a name='InputTracker.SHIFT'></a>
### InputTracker.SHIFT (constant)

Key code for the shift key.

Default Value: `16`

<a name='InputTracker.SPACE'></a>
### InputTracker.SPACE (constant)

Key code for the space bar.

Default Value: `32`

<a name='InputTracker.SUBTRACT'></a>
### InputTracker.SUBTRACT (constant)

Key code for the minus key.

Default Value: `109`

<a name='InputTracker.TAB'></a>
### InputTracker.TAB (constant)

Key code for the tab key.

Default Value: `9`

<a name='InputTracker.UP'></a>
### InputTracker.UP (constant)

Key code for the up arrow key.

Default Value: `38`

<a name='InputTracker.ZERO'></a>
### InputTracker.ZERO (constant)

Key code for the 0 key. Add 1 through 9 to get
the keys for the other basic digits 1 through 9.

Default Value: `48`

<a name='InputTracker_deltaXY'></a>
### InputTracker#deltaXY

**Deprecated: Yes**

An alias for <a href="InputTracker.md#InputTracker_mousePos">InputTracker#mousePos</a>.

<a name='InputTracker_dispose'></a>
### InputTracker#dispose()

Disposes all resources used by this input tracker.

#### Return Value

Return value. (Type: Object)

<a name='InputTracker_getKey'></a>
### InputTracker#getKey()

Gets whether a key is pressed, as detected by this
input tracker.

#### Return Value

key Key code of the key to check. (Type: number)

<a name='InputTracker_mousePos'></a>
### InputTracker#mousePos()

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

<a name='InputTracker_mousewheel'></a>
### InputTracker#mousewheel(func)

**Deprecated: Will be removed in the future. Use the
mousePos method to find out whether the user
has rotated the mouse wheel.**

Sets a function to handle mouse wheel events.

#### Parameters

* `func` (Type: function)<br>A function.

#### Return Value

Return value. (Type: Object)

<a name='InputTracker_update'></a>
### InputTracker#update()

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

This object. (Type: <a href="InputTracker.md">InputTracker</a>)

[Back to documentation index.](index.md)
