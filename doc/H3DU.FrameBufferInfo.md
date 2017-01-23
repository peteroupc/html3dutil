# H3DU.FrameBufferInfo

[Back to documentation index.](index.md)

 <a name='H3DU.FrameBufferInfo'></a>
### H3DU.FrameBufferInfo(width, height)

Describes a frame buffer. In the HTML 3D Library,
each frame buffer consists of a texture of a given size and a <i>renderbuffer</i> of the same
size to use as the depth buffer.

#### Parameters

* `width` (Type: Number)<br>
    Width to use for the frame buffer. Throws an error if this value is less than 0. The width will be set to this value rounded up.
* `height` (Type: Number)<br>
    Height to use for the frame buffer. Throws an error if this value is less than 0. The height will be set to this value rounded up.

### Methods

* [getHeight](#H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getHeight)<br>Gets the height to use for the frame buffer.
* [getWidth](#H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getWidth)<br>Gets the width to use for the frame buffer.
* [resize](#H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_resize)<br>Changes the width and height of this frame buffer information object.

 <a name='H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getHeight'></a>
### H3DU.FrameBufferInfo#getHeight()

Gets the height to use for the frame buffer.

#### Return Value

Return value. (Type: Number)

 <a name='H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_getWidth'></a>
### H3DU.FrameBufferInfo#getWidth()

Gets the width to use for the frame buffer.

#### Return Value

Return value. (Type: Number)

 <a name='H3DU.FrameBufferInfo_H3DU.FrameBufferInfo_resize'></a>
### H3DU.FrameBufferInfo#resize(width, height)

Changes the width and height of this frame buffer information object.

#### Parameters

* `width` (Type: Number)<br>
    New width to use for the frame buffer. Throws an error if this value is less than 0. The width will be set to this value rounded up.
* `height` (Type: Number)<br>
    New height to use for the frame buffer. Throws an error if this value is less than 0. The height will be set to this value rounded up.

#### Return Value

This object. (Type: <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>)
