# H3DU.BufferHelper

[Back to documentation index.](index.md)

<a name='H3DU.BufferHelper'></a>
### H3DU.BufferHelper()

A helper class for accessing and setting data in vertex attributes.

A <b>vertex attribute object</b> includes the following:<ul>
<li>A semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, which describes
the kind of data each value holds.
<li>A semantic index, which distinguishes attributes with the same semantic
in the same mesh buffer object.
<li>A <i>buffer</i> of arbitrary size. This buffer
is made up of <i>values</i>, one for each vertex, and each value
is takes up one or more <i>elements</i> in the buffer, which are numbers such
as X coordinates or red components, depending on the attribute's semantic.
Each value has the same number of elements.
<li>An offset, which identifies the index, starting from 0, of the first value
of the attribute within the given buffer.
<li>A count of the number of elements each value has. For example, 3-dimensional
positions will have 3 elements, one for each coordinate.
<li>A stride, which gives the number of elements from the start of one
value to the start of the next. A "packed" buffer will have a stride
equal to the number of elements per value.</ul>

### Methods

* [copy](#H3DU.BufferHelper_copy)<br>Copies the values of a vertex attribute into a new vertex attribute object.
* [count](#H3DU.BufferHelper_count)<br>Gets the number of values defined for a vertex attribute.
* [countPerValue](#H3DU.BufferHelper_countPerValue)<br>Gets the number of elements (numbers) that each value of a vertex attribute uses.
* [get](#H3DU.BufferHelper_get)<br>Gets the first element of the attribute value with the given vertex index.
* [getBuffer](#H3DU.BufferHelper_getBuffer)<br>Gets a reference to the buffer used in the given vertex attribute object.
* [getVec](#H3DU.BufferHelper_getVec)<br>Gets the elements of a vertex attribute value.
* [makeBlank](#H3DU.BufferHelper_makeBlank)<br>Creates a <a href="H3DU.BufferHelper.md">vertex attribute object</a>.
* [makeIndices](#H3DU.BufferHelper_makeIndices)<br>Generates an array of increasing vertex indices
* [merge](#H3DU.BufferHelper_merge)<br>Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.
* [resolveSemantic](#H3DU.BufferHelper_resolveSemantic)<br>Resolves an attribute semantic and semantic index, which
may optionally be given as a string instead, into two numbers giving
the semantic and index.
* [sameSemantic](#H3DU.BufferHelper_sameSemantic)<br>TODO: Not documented yet.
* [set](#H3DU.BufferHelper_set)<br>Sets the first element of the attribute value with the given vertex index.
* [setVec](#H3DU.BufferHelper_setVec)<br>Sets the elements of a vertex attribute value.

<a name='H3DU.BufferHelper_copy'></a>
### H3DU.BufferHelper#copy(attr)

Copies the values of a vertex attribute into a new vertex attribute object.

#### Parameters

* `attr` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>.

#### Return Value

A copy of the vertex attribute object. (Type: Array.&lt;Object>)

<a name='H3DU.BufferHelper_count'></a>
### H3DU.BufferHelper#count(a)

Gets the number of values defined for a vertex attribute.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>.

#### Return Value

The number of values defined in the attribute object's buffer. (Type: number)

<a name='H3DU.BufferHelper_countPerValue'></a>
### H3DU.BufferHelper#countPerValue(a)

Gets the number of elements (numbers) that each value of a vertex attribute uses.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>. Can be null.

#### Return Value

The number of elements per value of the vertex attribute, or 0 if "a" is null,
undefined, or omitted. (Type: number)

<a name='H3DU.BufferHelper_get'></a>
### H3DU.BufferHelper#get(a, index)

Gets the first element of the attribute value with the given vertex index.

Note that currently, this method does no bounds checking beyond the
checking naturally done when accessing the attribute's buffer.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.

#### Return Value

Return value. (Type: *)

<a name='H3DU.BufferHelper_getBuffer'></a>
### H3DU.BufferHelper#getBuffer(a)

Gets a reference to the buffer used in the given vertex attribute object.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>.

#### Return Value

A reference to the buffer used in the vertex attribute
object, or null if "a" is null, undefined, or omitted. (Type: Float32Array)

<a name='H3DU.BufferHelper_getVec'></a>
### H3DU.BufferHelper#getVec(a, index, vec)

Gets the elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when accessing the attribute's buffer.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: Array.&lt;number>)<br>An array whose elements will be set to those of the value at the given index. The number of elements copied to this array is the attribute's count per value (see H3DU.BufferHelper.countPerValue).

#### Return Value

The parameter "vec". (Type: Array.&lt;number>)

<a name='H3DU.BufferHelper_makeBlank'></a>
### H3DU.BufferHelper#makeBlank(semantic, semanticIndex, count, countPerValue)

Creates a <a href="H3DU.BufferHelper.md">vertex attribute object</a>.
Each value in the attribute will be initialized to all zeros.

#### Parameters

* `semantic` (Type: number | string)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `semanticIndex` (Type: number)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "semantic" is a string.
* `count` (Type: number)<br>Number of values. Each value describes the attribute's value for the corresponding vertex.
* `countPerValue` (Type: number)<br>Number of elements (numbers) for each value.

#### Return Value

A new vertex attribute with blank values. (Type: Array.&lt;Object>)

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
combined vertex attribute. The two attributes must have the same semantic and semantic
index, for example, semantic POSITION and semantic index 0.

#### Parameters

* `attr1` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a> for the first vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as indices and all the values are zeros.
* `indices1` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the first vertex attribute.
* `attr2` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a> for the second vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as indices and all the values are zeros.
* `indices2` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the second vertex attribute.

#### Return Value

The merged attribute, where the vertices from the first vertex
attribute come before those from the second. The merged attribute will have as many
values as the sum of the lengths of "indices1" and "indices2".
Returns null if the two objects have different semantics
or semantic indices. (Type: Array.&lt;Object>)

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

<a name='H3DU.BufferHelper_sameSemantic'></a>
### H3DU.BufferHelper#sameSemantic(a1, a2)

TODO: Not documented yet.

#### Parameters

* `a1` (Type: *)
* `a2` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='H3DU.BufferHelper_set'></a>
### H3DU.BufferHelper#set(a, index, value)

Sets the first element of the attribute value with the given vertex index.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `value` (Type: number)<br>The number to set the first element to.

#### Return Value

This object. (Type: <a href="H3DU.BufferHelper.md">H3DU.BufferHelper</a>)

<a name='H3DU.BufferHelper_setVec'></a>
### H3DU.BufferHelper#setVec(a, index, vec)

Sets the elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer, except
where noted otherwise.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>A <a href="H3DU.BufferHelper.md">vertex attribute object</a>.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: Array.&lt;number>)<br>An array containing the elements to copy to the value at the given index. The number of elements copied is this array's length or the attribute's count per value (see H3DU.BufferHelper.countPerValue), whichever is less.

#### Return Value

This object. (Type: BufferHelper)

[Back to documentation index.](index.md)
