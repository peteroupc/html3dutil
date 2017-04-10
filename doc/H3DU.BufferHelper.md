# H3DU.BufferHelper

[Back to documentation index.](index.md)

<a name='H3DU.BufferHelper'></a>
### H3DU.BufferHelper()

A helper class for accessing and setting data in buffer attributes.

A vertex attribute is made up of <i>values</i>, one for each vertex, each of which
is made up of one or more <i>elements</i>, which are numbers such as X coordinates
or red components. Each value has the same number of elements.

### Methods

* [copy](#H3DU.BufferHelper_copy)<br>TODO: Not documented yet.
* [count](#H3DU.BufferHelper_count)<br>Gets the number of values defined for a vertex attribute.
* [countPerValue](#H3DU.BufferHelper_countPerValue)<br>Gets the number of elements (numbers) that each value of a vertex attribute uses.
* [get](#H3DU.BufferHelper_get)<br>Gets the first element of the attribute value with the given vertex index.
* [getElement](#H3DU.BufferHelper_getElement)<br>TODO: Not documented yet.
* [getVec](#H3DU.BufferHelper_getVec)<br>Gets the elements of a vertex attribute value.
* [makeBlank](#H3DU.BufferHelper_makeBlank)<br>Creates an object describing information about a vertex attribute.
* [makeIndices](#H3DU.BufferHelper_makeIndices)<br>Generates an array of increasing vertex indices
* [makeRedundant](#H3DU.BufferHelper_makeRedundant)<br>TODO: Not documented yet.
* [merge](#H3DU.BufferHelper_merge)<br>Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.
* [mergeBlank](#H3DU.BufferHelper_mergeBlank)<br>Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute, where one of the input attributes is assumed to consist
of all-zero values.
* [set](#H3DU.BufferHelper_set)<br>Sets the first element of the attribute value with the given vertex index.
* [set2](#H3DU.BufferHelper_set2)<br>TODO: Not documented yet.
* [set3](#H3DU.BufferHelper_set3)<br>TODO: Not documented yet.
* [setElement](#H3DU.BufferHelper_setElement)<br>TODO: Not documented yet.
* [setVec](#H3DU.BufferHelper_setVec)<br>Sets the elements of a vertex attribute value.

<a name='H3DU.BufferHelper_copy'></a>
### H3DU.BufferHelper#copy(attr)

TODO: Not documented yet.

#### Parameters

* `attr` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.

#### Return Value

A copy of the attribute. Returns null if the two objects have different semantics
or semantic indices. (Type: Array.&lt;Object>)

<a name='H3DU.BufferHelper_count'></a>
### H3DU.BufferHelper#count(a)

Gets the number of values defined for a vertex attribute.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.

#### Return Value

The number of values defined in the attribute object's buffer. (Type: number)

<a name='H3DU.BufferHelper_countPerValue'></a>
### H3DU.BufferHelper#countPerValue(a)

Gets the number of elements (numbers) that each value of a vertex attribute uses.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute. Can be null.

#### Return Value

The number of elements per value of the vertex attribute, or 0 if "a" is null. (Type: number)

<a name='H3DU.BufferHelper_get'></a>
### H3DU.BufferHelper#get(a, index)

Gets the first element of the attribute value with the given vertex index.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.

#### Return Value

Return value. (Type: *)

<a name='H3DU.BufferHelper_getElement'></a>
### H3DU.BufferHelper#getElement(a, index, element)

TODO: Not documented yet.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)
* `element` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='H3DU.BufferHelper_getVec'></a>
### H3DU.BufferHelper#getVec(a, index, vec)

Gets the elements of a vertex attribute value.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: *)

#### Return Value

The parameter "vec". (Type: Array.&lt;number>)

<a name='H3DU.BufferHelper_makeBlank'></a>
### H3DU.BufferHelper#makeBlank(name, index, count, countPerValue)

Creates an object describing information about a vertex attribute.
Each value in the attribute will be initialized to all zeros.

#### Parameters

* `name` (Type: number)<br>An attribute semantic, such as <a href="H3DU.Semantic.md#H3DU.Semantic.POSITION">H3DU.Semantic.POSITION</a>.
* `index` (Type: number)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on.
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

<a name='H3DU.BufferHelper_makeRedundant'></a>
### H3DU.BufferHelper#makeRedundant(a, indices)

TODO: Not documented yet.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `indices` (Type: *)

#### Return Value

Return value. (Type: *)

<a name='H3DU.BufferHelper_merge'></a>
### H3DU.BufferHelper#merge(attr1, indices1, attr2, indices2)

Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute. The two attributes must have the same semantic and semantic
index, for example, semantic POSITION and semantic index 0.

#### Parameters

* `attr1` (Type: Array.&lt;Object>)<br>An object describing information about the first vertex attribute.
* `indices1` (Type: *)
* `attr2` (Type: Array.&lt;Object>)<br>An object describing information about the second vertex attribute.
* `indices2` (Type: *)

#### Return Value

The merged attribute, where the vertices from the first vertex
attribute come before those from the second. Returns null if the two objects have different semantics
or semantic indices. (Type: Array.&lt;Object>)

<a name='H3DU.BufferHelper_mergeBlank'></a>
### H3DU.BufferHelper#mergeBlank(attr, indices1, indices2, attrIsSecond)

Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute, where one of the input attributes is assumed to consist
of all-zero values.

#### Parameters

* `attr` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `indices1` (Type: Array.&lt;number> | Uint8Array | Uint16Array | Uint32Array)<br>An array of vertex indices to vertices that will appear first in the merged attribute. The vertex indices are those of the first vertex attribute.
* `indices2` (Type: Array.&lt;number> | Uint8Array | Uint16Array | Uint32Array)<br>An array of vertex indices to vertices that will appear second in the merged attribute. The vertex indices are those of the first vertex attribute.
* `attrIsSecond` (Type: *)

#### Return Value

The merged attribute, where the vertices from the first vertex
attribute come before those from the second. (Type: Array.&lt;Object>)

<a name='H3DU.BufferHelper_set'></a>
### H3DU.BufferHelper#set(a, index, value)

Sets the first element of the attribute value with the given vertex index.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `value` (Type: number)<br>The number to set the first element to.

#### Return Value

This object. (Type: <a href="H3DU.BufferHelper.md">H3DU.BufferHelper</a>)

<a name='H3DU.BufferHelper_set2'></a>
### H3DU.BufferHelper#set2(a, index, v1, v2)

TODO: Not documented yet.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `v1` (Type: number)
* `v2` (Type: number)

#### Return Value

This object. (Type: <a href="H3DU.BufferHelper.md">H3DU.BufferHelper</a>)

<a name='H3DU.BufferHelper_set3'></a>
### H3DU.BufferHelper#set3(a, index, v1, v2, v3)

TODO: Not documented yet.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `v1` (Type: number)
* `v2` (Type: number)
* `v3` (Type: number)

#### Return Value

This object. (Type: <a href="H3DU.BufferHelper.md">H3DU.BufferHelper</a>)

<a name='H3DU.BufferHelper_setElement'></a>
### H3DU.BufferHelper#setElement(a, index, element, value)

TODO: Not documented yet.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `element` (Type: *)
* `value` (Type: *)

#### Return Value

This object. (Type: BufferHelper)

<a name='H3DU.BufferHelper_setVec'></a>
### H3DU.BufferHelper#setVec(a, index, vec)

Sets the elements of a vertex attribute value.

#### Parameters

* `a` (Type: Array.&lt;Object>)<br>An object describing information about a vertex attribute.
* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: *)

#### Return Value

This object. (Type: BufferHelper)

[Back to documentation index.](index.md)
