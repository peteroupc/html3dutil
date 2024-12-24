# H3DU.BufferAccessor

[Back to documentation index.](index.md)

<a name='H3DU.BufferAccessor'></a>
### new H3DU.BufferAccessor(buffer, countPerValue, [offset], [stride])

A <b>vertex attribute object</b>.

#### Parameters

* `buffer` (Type: Float32Array)<br>A buffer to store vertex attribute data; see BufferAccessor#buffer.
* `countPerValue` (Type: number)<br>Number of elements per value; see BufferAccessor#countPerValue. Throws an error if 0 or less.
* `offset` (Type: number) (optional)<br>Offset to the first value; see BufferAccessor#offset. If null, undefined, or omitted, the default is 0. Throws an error if less than 0.
* `stride` (Type: number) (optional)<br>Number of elements from the start of one value to the start of the next; see BufferAccessor#stride. If null, undefined, or omitted, has the same value as "countPerValue". Throws an error if 0 or less.

### Members

* [buffer](#H3DU.BufferAccessor_buffer)<br>A <i>buffer</i> of arbitrary size.
* [countPerValue](#H3DU.BufferAccessor_countPerValue)<br>A count of the number of elements each value has.
* [offset](#H3DU.BufferAccessor_offset)<br>An offset, which identifies the index, starting from 0, of the first value
of the attribute within the buffer.
* [stride](#H3DU.BufferAccessor_stride)<br>A stride, which gives the number of elements from the start of one
value to the start of the next.

### Methods

* [copy](#H3DU.BufferAccessor_copy)<br>Copies the values of this accessor into a new vertex attribute object.
* [count](#H3DU.BufferAccessor_count)<br>Gets the number of values defined for this accessor.
* [get](#H3DU.BufferAccessor_get)<br>Gets the first element of the attribute value with the given vertex index.
* [getVec](#H3DU.BufferAccessor_getVec)<br>Gets the elements of a vertex attribute value.
* [makeBlank](#H3DU.BufferAccessor.makeBlank)<br>Generates a vertex attribute buffer, with each value set to all zeros.
* [makeIndices](#H3DU.BufferAccessor.makeIndices)<br>Generates an array of increasing vertex indices.
* [merge](#H3DU.BufferAccessor.merge)<br>Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.
* [set](#H3DU.BufferAccessor_set)<br>Sets the first element of the attribute value with the given vertex index.
* [setVec](#H3DU.BufferAccessor_setVec)<br>Sets the elements of a vertex attribute value.

<a name='H3DU.BufferAccessor_buffer'></a>
### H3DU.BufferAccessor#buffer

A <i>buffer</i> of arbitrary size. This buffer
is made up of <i>values</i>, one for each vertex, and each value
takes up one or more <i>elements</i> in the buffer, which are numbers such
as x-coordinates or red components, depending on the attribute's semantic.
Each value has the same number of elements. An example of a <i>value</i>
is (10, 20, 5), which can take up three consecutive <i>elements</i>
in a <code>Float32Array</code> buffer such as the one given in this
property.

Type: Float32Array

<a name='H3DU.BufferAccessor_countPerValue'></a>
### H3DU.BufferAccessor#countPerValue

A count of the number of elements each value has. For example, 3-dimensional
positions will have 3 elements, one for each coordinate.

Type: number

<a name='H3DU.BufferAccessor_offset'></a>
### H3DU.BufferAccessor#offset

An offset, which identifies the index, starting from 0, of the first value
of the attribute within the buffer. The offset counts the number of
elements in the buffer to the first value. For example, if this property is 6,
then the first element of the first value in the buffer is found at
<code>acc.buffer[acc.offset]</code> (assuming the buffer is
more than 6 elements long).

Type: number

<a name='H3DU.BufferAccessor_stride'></a>
### H3DU.BufferAccessor#stride

A stride, which gives the number of elements from the start of one
value to the start of the next. A "packed" buffer will have a stride
equal to the count per value.

Type: number

<a name='H3DU.BufferAccessor_copy'></a>
### H3DU.BufferAccessor#copy()

Copies the values of this accessor into a new vertex attribute object.

#### Return Value

A copy of the vertex attribute object. (Type: BufferAccessor)

<a name='H3DU.BufferAccessor_count'></a>
### H3DU.BufferAccessor#count()

Gets the number of values defined for this accessor.

#### Return Value

The number of values defined in this accessor's buffer. (Type: number)

<a name='H3DU.BufferAccessor_get'></a>
### H3DU.BufferAccessor#get(index)

Gets the first element of the attribute value with the given vertex index.

Note that currently, this method does no bounds checking beyond the
checking naturally done when accessing the attribute's buffer.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.

#### Return Value

The first element of the given attribute value. (Type: number)

<a name='H3DU.BufferAccessor_getVec'></a>
### H3DU.BufferAccessor#getVec(index, vec)

Gets the elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when accessing the attribute's buffer.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: Array.&lt;number>)<br>An array whose elements will be set to those of the value at the given index. The number of elements copied to this array is the attribute's count per value (see BufferAccessor#countPerValue).

#### Return Value

The parameter "vec". (Type: Array.&lt;number>)

<a name='H3DU.BufferAccessor.makeBlank'></a>
### (static) H3DU.BufferAccessor.makeBlank(count, countPerValue)

Generates a vertex attribute buffer, with each value set to all zeros.

#### Parameters

* `count` (Type: number)<br>The number of values the buffer will hold. For example, (10, 20, 5) is a 3-element value.
* `countPerValue` (Type: number)<br>The number of elements each value will take in the buffer.

#### Return Value

A blank vertex attribute buffer. (Type: BufferAccessor)

<a name='H3DU.BufferAccessor.makeIndices'></a>
### (static) H3DU.BufferAccessor.makeIndices(numIndices)

Generates an array of increasing vertex indices.

#### Parameters

* `numIndices` (Type: number)<br>The number of vertex indices to generate. The array will range from 0 to the number of vertex indices minus 1.

#### Return Value

An array of vertex indices. (Type: Uint16Array | Uint32Array)

<a name='H3DU.BufferAccessor.merge'></a>
### (static) H3DU.BufferAccessor.merge(attr1, indices1, attr2, indices2)

Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.

#### Parameters

* `attr1` (Type: BufferAccessor)<br>A vertex buffer accessor for the first vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as the length of "indices1" and all the values are zeros.
* `indices1` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the first vertex attribute.
* `attr2` (Type: BufferAccessor)<br>A vertex buffer accessor for the second vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as the length of "indices2" and all the values are zeros.
* `indices2` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the second vertex attribute.

#### Return Value

The merged attribute, where the vertices from the first vertex
attribute come before those from the second. The merged attribute will have as many
values as the sum of the lengths of "indices1" and "indices2". (Type: BufferAccessor)

<a name='H3DU.BufferAccessor_set'></a>
### H3DU.BufferAccessor#set(index, value)

Sets the first element of the attribute value with the given vertex index.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `value` (Type: number)<br>The number to set the first element to.

#### Return Value

This object. (Type: BufferAccessor)

<a name='H3DU.BufferAccessor_setVec'></a>
### H3DU.BufferAccessor#setVec(index, vec)

Sets the elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer, except
where noted otherwise.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: Array.&lt;number>)<br>An array containing the elements to copy to the value at the given index. The number of elements copied is this array's length or the attribute's count per value (see BufferAccessor#countPerValue), whichever is less.

#### Return Value

This object. (Type: BufferAccessor)

[Back to documentation index.](index.md)
