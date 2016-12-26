# H3DU.FrameBufferInfo

[Back to documentation index.](index.md)

### H3DU.FrameBufferInfo(width, height) <a id='H3DU.FrameBufferInfo'></a>

Describes a frame buffer. In the HTML 3D Library,
each frame buffer consists of a texture of a given size and a <i>renderbuffer</i> of the same
size to use as the depth buffer.

#### Parameters

* `width` (Type: Number)<br>
    Width to use for the frame buffer. Throws an error if this value is less than 0. The width will be set to this value rounded up.
* `height` (Type: Number)<br>
    Height to use for the frame buffer. Throws an error if this value is less than 0. The height will be set to this value rounded up.

### Methods

* [getHeight](#H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getHeight)
* [getWidth](#H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getWidth)
* [resize](#H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_resize)

### H3DU.FrameBufferInfo#getHeight() <a id='H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getHeight'></a>

Gets the height to use for the frame buffer.

#### Return Value

Return value. (Type: Number)

### H3DU.FrameBufferInfo#getWidth() <a id='H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getWidth'></a>

Gets the width to use for the frame buffer.

#### Return Value

Return value. (Type: Number)

### H3DU.FrameBufferInfo#resize(width, height) <a id='H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_resize'></a>

Changes the width and height of this frame buffer information object.

#### Parameters

* `width` (Type: Number)<br>
    New width to use for the frame buffer. Throws an error if this value is less than 0. The width will be set to this value rounded up.
* `height` (Type: Number)<br>
    New height to use for the frame buffer. Throws an error if this value is less than 0. The height will be set to this value rounded up.

#### Return Value

This object. (Type: <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>)
