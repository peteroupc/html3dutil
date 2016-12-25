# InputTracker

[Back to documentation index.](index.md)

### InputTracker(element) <a id='InputTracker'></a>

A class for tracking key press, mouse, touch, and mouse wheel
events.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/camera.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    &lt;script type="text/javascript" src="extras/camera.js">&lt;/script>

#### Parameters

* `element` (Type: HTMLElement | HTMLDocument)<br>
    The HTML document or element to track keyboard and mouse events for. If null or omitted, uses the calling application's HTML document.

### Methods

* [deltaXY](#InputTracker_InputTracker_deltaXY)
* [dispose](#InputTracker_InputTracker_dispose)
* [getKey](#InputTracker_InputTracker_getKey)
* [mousewheel](#InputTracker_InputTracker_mousewheel)
* [update](#InputTracker_InputTracker_update)

### InputTracker#deltaXY() <a id='InputTracker_InputTracker_deltaXY'></a>

Returns the current mouse position, delta
mouse position, and delta mouse wheel
position (see the "update" method).

#### Return Value

An object containing the following keys:<ul>
<li><code>cx</code> - X-coordinate of the current mouse
position.
<li><code>cx</code> - Y-coordinate of the current mouse
position.
<li><code>x</code> - X component of the delta mouse position.
<li><code>y</code> - Y component of the delta mouse position.
<li><code>ticks</code> - The delta mouse wheel position.
</ul>
If this object's update method wasn't called, all these values
will be 0. (Type: Object)

### InputTracker#dispose() <a id='InputTracker_InputTracker_dispose'></a>

Disposes all resources used by this input tracker.

#### Return Value

Return value. (Type: Object)

### InputTracker#getKey(key) <a id='InputTracker_InputTracker_getKey'></a>

#### Parameters

* `key` (Type: Object)<br>
    Description of key. Gets whether a key is pressed, as detected by this input tracker.

#### Return Value

key Key code of the key to check. (Type: Number)

### InputTracker#mousewheel(func) <a id='InputTracker_InputTracker_mousewheel'></a>

<b>Deprecated: Will be removed in the future. Use the
deltaTicks method to find out whether the user
has rotated the mouse wheel.</b>

Sets a function to handle mouse wheel events.

#### Parameters

* `func` (Type: function)<br>
    A function.

#### Return Value

Return value. (Type: Object)

### InputTracker#update() <a id='InputTracker_InputTracker_update'></a>

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
was created if it wasn't) to the current mouse wheen position.

#### Return Value

This object. (Type: <a href="InputTracker.md">InputTracker</a>)
