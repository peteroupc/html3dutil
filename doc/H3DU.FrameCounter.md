# H3DU.FrameCounter

[Back to documentation index.](index.md)

### H3DU.FrameCounter() <a id='H3DU.FrameCounter'></a>

A class for finding the frame rate of an HTML rendering.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/frame.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/frame.js"></script>

### Methods

* [getFPS](#H3DU.FrameCounter_H3DU.FrameCounter_getFPS)<br>Gets the calculated frames per second, based
on how often the update method was called.
* [update](#H3DU.FrameCounter_H3DU.FrameCounter_update)<br>Updates the state for determining the frame count.

### H3DU.FrameCounter#getFPS() <a id='H3DU.FrameCounter_H3DU.FrameCounter_getFPS'></a>

Gets the calculated frames per second, based
on how often the update method was called.

#### Return Value

Return value. (Type: Object)

### H3DU.FrameCounter#update() <a id='H3DU.FrameCounter_H3DU.FrameCounter_update'></a>

Updates the state for determining the frame count.
This method should be called once per frame.

#### Return Value

Return value. (Type: Object)
