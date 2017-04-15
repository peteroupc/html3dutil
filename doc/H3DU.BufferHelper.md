# H3DU.BufferHelper

[Back to documentation index.](index.md)

<a name='H3DU.BufferHelper'></a>
### H3DU.BufferHelper()

A helper class for accessing and setting data in vertex attributes.

### Methods

* [copy](#H3DU.BufferHelper_copy)<br>Copies the values of a vertex attribute into a new vertex attribute object.
* [makeIndices](#H3DU.BufferHelper_makeIndices)<br>Generates an array of increasing vertex indices
* [merge](#H3DU.BufferHelper_merge)<br>Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.
* [resolveSemantic](#H3DU.BufferHelper_resolveSemantic)<br>Resolves an attribute semantic and semantic index, which
may optionally be given as a string instead, into two numbers giving
the semantic and index.

<a name='H3DU.BufferHelper_copy'></a>
### H3DU.BufferHelper#copy(attr)

Copies the values of a vertex attribute into a new vertex attribute object.

#### Parameters

* `attr` (Type: <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>)<br>A vertex buffer accessor.

#### Return Value

A copy of the vertex attribute object. (Type: <a href="H3DU.BufferAccessor.md">H3DU.BufferAccessor</a>)

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

<a name='H3DU.BufferHelper_resolveSemantic'></a>
### H3DU.BufferHelper#resolveSemantic(name, [index])

Resolves an attribute semantic and semantic index, which
may optionally be given as a string instead, into two numbers giving
the semantic and index.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `index` (Type: number) (optional)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string. Otherwise, if this value is null, undefined, or omitted, the default is 0.

#### Return Value

A two-element array consisting
of the semantic and semantic index, respectively, described in
the "name" and "index" parameters. Returns null if "name" is a string,
but doesn't describe a valid semantic. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)
