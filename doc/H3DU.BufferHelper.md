# H3DU.BufferHelper

[Back to documentation index.](index.md)

<a name='H3DU.BufferHelper'></a>
### H3DU.BufferHelper()

A helper class for accessing and setting data in vertex attributes.

### Methods

* [makeIndices](#H3DU.BufferHelper_makeIndices)<br>Generates an array of increasing vertex indices
* [merge](#H3DU.BufferHelper_merge)<br>Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.

<a name='H3DU.BufferHelper_makeIndices'></a>
### H3DU.BufferHelper#makeIndices(numIndices)

Generates an array of increasing vertex indices

#### Parameters

* `numIndices` (Type: number)<br>The number of vertex indices to generate. The array will range from 0 to the number of vertex indices minus 1.

#### Return Value

An array of vertex indices. (Type: Uint16Array | Uint32Array)

<a name='H3DU.BufferHelper_merge'></a>
### H3DU.BufferHelper#merge(attr1, indices1, attr2, indices2)

Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.

#### Parameters

* `attr1` (Type: <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>)<br>A vertex buffer accessor for the first vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as indices and all the values are zeros.
* `indices1` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the first vertex attribute.
* `attr2` (Type: <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>)<br>A vertex buffer accessor for the second vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as indices and all the values are zeros.
* `indices2` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the second vertex attribute.

#### Return Value

The merged attribute, where the vertices from the first vertex
attribute come before those from the second. The merged attribute will have as many
values as the sum of the lengths of "indices1" and "indices2". (Type: <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>)

[Back to documentation index.](index.md)
