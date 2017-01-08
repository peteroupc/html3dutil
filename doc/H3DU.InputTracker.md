# H3DU.InputTracker

[Back to documentation index.](index.md)

### H3DU.InputTracker(element) <a id='H3DU.InputTracker'></a>

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

* `element` (Type: HTMLElement | HTMLDocument)<br>
    The HTML document or element to track keyboard and mouse events for. If null or omitted, uses the calling application's HTML document.

### Members

* [.A](#H3DU.InputTracker.A)<br>Key code for the A key.
* [.ADD](#H3DU.InputTracker.ADD)<br>Key code for the plus key.
* [.ALT](#H3DU.InputTracker.ALT)<br>Key code for the return key.
* [.CTRL](#H3DU.InputTracker.CTRL)<br>Key code for the return key.
* [.DELETE](#H3DU.InputTracker.DELETE)<br>Key code for the delete key.
* [.DOWN](#H3DU.InputTracker.DOWN)<br>Key code for the down arrow key.
* [.END](#H3DU.InputTracker.END)<br>Key code for the end key.
* [.ENTER](#H3DU.InputTracker.ENTER)<br>Key code for the enter key.
* [.ESC](#H3DU.InputTracker.ESC)<br>Key code for the return key.
* [.HOME](#H3DU.InputTracker.HOME)<br>Key code for the home key.
* [.LEFT](#H3DU.InputTracker.LEFT)<br>Key code for the left arrow key.
* [.PAGEDOWN](#H3DU.InputTracker.PAGEDOWN)<br>Key code for the page down key.
* [.PAGEUP](#H3DU.InputTracker.PAGEUP)<br>Key code for the page up key.
* [.RETURN](#H3DU.InputTracker.RETURN)<br>Key code for the return key.
* [.RIGHT](#H3DU.InputTracker.RIGHT)<br>Key code for the right arrow key.
* [.SHIFT](#H3DU.InputTracker.SHIFT)<br>Key code for the shift key.
* [.SPACE](#H3DU.InputTracker.SPACE)<br>Key code for the space bar.
* [.SUBTRACT](#H3DU.InputTracker.SUBTRACT)<br>Key code for the minus key.
* [.TAB](#H3DU.InputTracker.TAB)<br>Key code for the tab key.
* [.UP](#H3DU.InputTracker.UP)<br>Key code for the up arrow key.
* [.ZERO](#H3DU.InputTracker.ZERO)<br>Key code for the 0 key.

### Methods

* [deltaXY](#H3DU.InputTracker_H3DU.InputTracker_deltaXY)<br>Returns the current mouse position, delta
mouse position, and delta mouse wheel
position (see the "update" method).
* [dispose](#H3DU.InputTracker_H3DU.InputTracker_dispose)<br>Disposes all resources used by this input tracker.
* [getKey](#H3DU.InputTracker_H3DU.InputTracker_getKey)<br>Gets whether a key is pressed, as detected by this
input tracker.
* [mousewheel](#H3DU.InputTracker_H3DU.InputTracker_mousewheel)<br><b>Deprecated: Will be removed in the future. Use the
deltaTicks method to find out whether the user
has rotated the mouse wheel.</b>
* [update](#H3DU.InputTracker_H3DU.InputTracker_update)<br>Retrieves the current position of the mouse within
the page's client area, as detected by the input
tracker and calculates the "delta mouse position",
or the difference between
those values and the values they had the last
time this method was called.

### H3DU.InputTracker.A <a id='H3DU.InputTracker.A'></a> (constant)

Key code for the A key. Add 1 through 25 to get
the keys for the other letters of the English alphabet.

Default Value: `65`

### H3DU.InputTracker.ADD <a id='H3DU.InputTracker.ADD'></a> (constant)

Key code for the plus key.

Default Value: `107`

### H3DU.InputTracker.ALT <a id='H3DU.InputTracker.ALT'></a> (constant)

Key code for the return key.

Default Value: `18`

### H3DU.InputTracker.CTRL <a id='H3DU.InputTracker.CTRL'></a> (constant)

Key code for the return key.

Default Value: `17`

### H3DU.InputTracker.DELETE <a id='H3DU.InputTracker.DELETE'></a> (constant)

Key code for the delete key.

Default Value: `46`

### H3DU.InputTracker.DOWN <a id='H3DU.InputTracker.DOWN'></a> (constant)

Key code for the down arrow key.

Default Value: `40`

### H3DU.InputTracker.END <a id='H3DU.InputTracker.END'></a> (constant)

Key code for the end key.

Default Value: `35`

### H3DU.InputTracker.ENTER <a id='H3DU.InputTracker.ENTER'></a> (constant)

Key code for the enter key.

Default Value: `13`

### H3DU.InputTracker.ESC <a id='H3DU.InputTracker.ESC'></a> (constant)

Key code for the return key.

Default Value: `27`

### H3DU.InputTracker.HOME <a id='H3DU.InputTracker.HOME'></a> (constant)

Key code for the home key.

Default Value: `36`

### H3DU.InputTracker.LEFT <a id='H3DU.InputTracker.LEFT'></a> (constant)

Key code for the left arrow key.

Default Value: `37`

### H3DU.InputTracker.PAGEDOWN <a id='H3DU.InputTracker.PAGEDOWN'></a> (constant)

Key code for the page down key.

Default Value: `34`

### H3DU.InputTracker.PAGEUP <a id='H3DU.InputTracker.PAGEUP'></a> (constant)

Key code for the page up key.

Default Value: `33`

### H3DU.InputTracker.RETURN <a id='H3DU.InputTracker.RETURN'></a> (constant)

Key code for the return key.

Default Value: `10`

### H3DU.InputTracker.RIGHT <a id='H3DU.InputTracker.RIGHT'></a> (constant)

Key code for the right arrow key.

Default Value: `39`

### H3DU.InputTracker.SHIFT <a id='H3DU.InputTracker.SHIFT'></a> (constant)

Key code for the shift key.

Default Value: `16`

### H3DU.InputTracker.SPACE <a id='H3DU.InputTracker.SPACE'></a> (constant)

Key code for the space bar.

Default Value: `32`

### H3DU.InputTracker.SUBTRACT <a id='H3DU.InputTracker.SUBTRACT'></a> (constant)

Key code for the minus key.

Default Value: `109`

### H3DU.InputTracker.TAB <a id='H3DU.InputTracker.TAB'></a> (constant)

Key code for the tab key.

Default Value: `9`

### H3DU.InputTracker.UP <a id='H3DU.InputTracker.UP'></a> (constant)

Key code for the up arrow key.

Default Value: `38`

### H3DU.InputTracker.ZERO <a id='H3DU.InputTracker.ZERO'></a> (constant)

Key code for the 0 key. Add 1 through 9 to get
the keys for the other basic digits 1 through 9.

Default Value: `48`

### H3DU.InputTracker#deltaXY() <a id='H3DU.InputTracker_H3DU.InputTracker_deltaXY'></a>

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

### H3DU.InputTracker#dispose() <a id='H3DU.InputTracker_H3DU.InputTracker_dispose'></a>

Disposes all resources used by this input tracker.

#### Return Value

Return value. (Type: Object)

### H3DU.InputTracker#getKey() <a id='H3DU.InputTracker_H3DU.InputTracker_getKey'></a>

Gets whether a key is pressed, as detected by this
input tracker.

#### Return Value

key Key code of the key to check. (Type: Number)

### H3DU.InputTracker#mousewheel(func) <a id='H3DU.InputTracker_H3DU.InputTracker_mousewheel'></a>

<b>Deprecated: Will be removed in the future. Use the
deltaTicks method to find out whether the user
has rotated the mouse wheel.</b>

Sets a function to handle mouse wheel events.

#### Parameters

* `func` (Type: function)<br>
    A function.

#### Return Value

Return value. (Type: Object)

### H3DU.InputTracker#update() <a id='H3DU.InputTracker_H3DU.InputTracker_update'></a>

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
