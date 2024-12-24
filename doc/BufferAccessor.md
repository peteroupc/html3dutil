# BufferAccessor

[Back to documentation index.](index.md)

<a name='BufferAccessor'></a>
### new BufferAccessor(buffer, countPerValue, [offset], [stride])

**Deprecated: It is planned to render this class obsolete and rely on three.js's BufferGeometry.**

A <b>vertex attribute object</b>.

#### Parameters

* `buffer` (Type: Float32Array)<br>A buffer to store vertex attribute data; see <a href="BufferAccessor.md#BufferAccessor_buffer">BufferAccessor#buffer</a>.
* `countPerValue` (Type: number)<br>Number of elements per value; see <a href="BufferAccessor.md#BufferAccessor_countPerValue">BufferAccessor#countPerValue</a>. Throws an error if 0 or less.
* `offset` (Type: number) (optional)<br>Offset to the first value; see <a href="BufferAccessor.md#BufferAccessor_offset">BufferAccessor#offset</a>. If null, undefined, or omitted, the default is 0. Throws an error if less than 0.
* `stride` (Type: number) (optional)<br>Number of elements from the start of one value to the start of the next; see <a href="BufferAccessor.md#BufferAccessor_stride">BufferAccessor#stride</a>. If null, undefined, or omitted, has the same value as "countPerValue". Throws an error if 0 or less.

### Members

* [buffer](#BufferAccessor_buffer)<br>A <i>buffer</i> of arbitrary size.
* [countPerValue](#BufferAccessor_countPerValue)<br>A count of the number of elements each value has.
* [offset](#BufferAccessor_offset)<br>An offset, which identifies the index, starting from 0, of the first value
of the attribute within the buffer.
* [stride](#BufferAccessor_stride)<br>A stride, which gives the number of elements from the start of one
value to the start of the next.

### Methods

* [copy](#BufferAccessor_copy)<br>Copies the values of this accessor into a new vertex attribute object.
* [count](#BufferAccessor_count)<br>Gets the number of <a href="BufferAccessor.md#BufferAccessor_buffer">values</a> defined for this accessor.
* [get](#BufferAccessor_get)<br>Gets the first element of the attribute value with the given vertex index.
* [getVec](#BufferAccessor_getVec)<br>Gets the elements of a vertex attribute value.
* [makeBlank](#BufferAccessor.makeBlank)<br>Generates a vertex attribute buffer, with each value set to all zeros.
* [makeIndices](#BufferAccessor.makeIndices)<br>Generates an array of increasing vertex indices.
* [merge](#BufferAccessor.merge)<br>Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.
* [set](#BufferAccessor_set)<br>Sets the first element of the attribute value with the given vertex index.
* [setVec](#BufferAccessor_setVec)<br>Sets the elements of a vertex attribute value.
* [setXy](#BufferAccessor_setXy)<br>Sets the first and second elements of a vertex attribute value.
* [setXyz](#BufferAccessor_setXyz)<br>Sets the first, second, and third elements of a vertex attribute value.

<a name='BufferAccessor_buffer'></a>
### BufferAccessor#buffer

A <i>buffer</i> of arbitrary size. This buffer
is made up of <i>values</i>, one for each vertex, and each value
takes up one or more <i>elements</i> in the buffer, which are numbers such
as x-coordinates or red components, depending on the attribute's semantic.
Each value has the same number of elements. An example of a <i>value</i>
is (10, 20, 5), which can take up three consecutive <i>elements</i>
in a <code>Float32Array</code> buffer such as the one given in this
property.

Type: Float32Array

<a name='BufferAccessor_countPerValue'></a>
### BufferAccessor#countPerValue

A count of the number of elements each value has. For example, 3-dimensional
positions will have 3 elements, one for each coordinate.

Type: number

<a name='BufferAccessor_offset'></a>
### BufferAccessor#offset

An offset, which identifies the index, starting from 0, of the first value
of the attribute within the buffer. The offset counts the number of
elements in the buffer to the first value. For example, if this property is 6,
then the first element of the first value in the buffer is found at
<code>acc.buffer[acc.offset]</code> (assuming the buffer is
more than 6 elements long).

Type: number

<a name='BufferAccessor_stride'></a>
### BufferAccessor#stride

A stride, which gives the number of elements from the start of one
value to the start of the next. A "packed" buffer will have a stride
equal to the <a href="BufferAccessor.md#BufferAccessor_countPerValue">count per value</a>.

Type: number

<a name='BufferAccessor_copy'></a>
### BufferAccessor#copy()

Copies the values of this accessor into a new vertex attribute object.

#### Return Value

A copy of the vertex attribute object. (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

<a name='BufferAccessor_count'></a>
### BufferAccessor#count()

Gets the number of <a href="BufferAccessor.md#BufferAccessor_buffer">values</a> defined for this accessor.

#### Return Value

The number of values defined in this accessor's buffer. (Type: number)

<a name='BufferAccessor_get'></a>
### BufferAccessor#get(index)

Gets the first element of the attribute value with the given vertex index.

Note that currently, this method does no bounds checking beyond the
checking naturally done when accessing the attribute's buffer.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.

#### Return Value

The first element of the given attribute value. (Type: number)

<a name='BufferAccessor_getVec'></a>
### BufferAccessor#getVec(index, vec)

Gets the elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when accessing the attribute's buffer.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: Array.&lt;number>)<br>An array whose elements will be set to those of the value at the given index. The number of elements copied to this array is the attribute's count per value (see <a href="BufferAccessor.md#BufferAccessor_countPerValue">BufferAccessor#countPerValue</a>).

#### Return Value

The parameter "vec". (Type: Array.&lt;number>)

<a name='BufferAccessor.makeBlank'></a>
### (static) BufferAccessor.makeBlank(count, countPerValue)

Generates a vertex attribute buffer, with each value set to all zeros.

#### Parameters

* `count` (Type: number)<br>The number of <a href="BufferAccessor.md#BufferAccessor_buffer">values</a> the buffer will hold. For example, (10, 20, 5) is a 3-element value.
* `countPerValue` (Type: number)<br>The number of elements each value will take in the buffer.

#### Return Value

A blank vertex attribute buffer. (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

<a name='BufferAccessor.makeIndices'></a>
### (static) BufferAccessor.makeIndices(numIndices)

Generates an array of increasing vertex indices.

#### Parameters

* `numIndices` (Type: number)<br>The number of vertex indices to generate. The array will range from 0 to the number of vertex indices minus 1.

#### Return Value

An array of vertex indices. (Type: Uint16Array | Uint32Array)

<a name='BufferAccessor.merge'></a>
### (static) BufferAccessor.merge(attr1, indices1, attr2, indices2)

Merges two vertex attributes, whose vertices can be indexed differently, into one
combined vertex attribute.

#### Parameters

* `attr1` (Type: <a href="BufferAccessor.md">BufferAccessor</a>)<br>A vertex buffer accessor for the first vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as the length of "indices1" and all the values are zeros.
* `indices1` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the first vertex attribute.
* `attr2` (Type: <a href="BufferAccessor.md">BufferAccessor</a>)<br>A vertex buffer accessor for the second vertex attribute. Can be null, in which case it is assumed that the attribute contains as many values as the length of "indices2" and all the values are zeros.
* `indices2` (Type: Array.&lt;number> | Uint16Array | Uint8Array | Uint32Array)<br>An array of vertex indices associated with the second vertex attribute.

#### Return Value

The merged attribute, where the vertices from the first vertex
attribute come before those from the second. The merged attribute will have as many
values as the sum of the lengths of "indices1" and "indices2". (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

<a name='BufferAccessor_set'></a>
### BufferAccessor#set(index, value)

Sets the first element of the attribute value with the given vertex index.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `value` (Type: number)<br>The number to set the first element to.

#### Return Value

This object. (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

<a name='BufferAccessor_setVec'></a>
### BufferAccessor#setVec(index, vec)

Sets the elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer, except
where noted otherwise.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `vec` (Type: Array.&lt;number>)<br>An array containing the elements to copy to the value at the given index. The number of elements copied is this array's length or the attribute's count per value (see <a href="BufferAccessor.md#BufferAccessor_countPerValue">BufferAccessor#countPerValue</a>), whichever is less.

#### Return Value

This object. (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

<a name='BufferAccessor_setXy'></a>
### BufferAccessor#setXy(index, x, y)

Sets the first and second elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer, except
where noted otherwise.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `x` (Type: number)<br>The value to copy to the first element of the value at the given index, if the attribute stores 1-element or bigger values.
* `y` (Type: number)<br>The value to copy to the second element of the value at the given index, if the attribute stores 2-element or bigger values.

#### Return Value

This object. (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

<a name='BufferAccessor_setXyz'></a>
### BufferAccessor#setXyz(index, x, y, z)

Sets the first, second, and third elements of a vertex attribute value.

Note that currently, this method does no bounds checking beyond the
checking naturally done when writing to the attribute's buffer, except
where noted otherwise.

#### Parameters

* `index` (Type: number)<br>A numeric index, starting from 0, that identifies a value stored in the attribute's buffer. For example, 0 identifies the first value, 1 identifies the second, and so on.
* `x` (Type: number)<br>The value to copy to the first element of the value at the given index, if the attribute stores 1-element or bigger values.
* `y` (Type: number)<br>The value to copy to the second element of the value at the given index, if the attribute stores 2-element or bigger values.
* `z` (Type: number)<br>The value to copy to the third element of the value at the given index, if the attribute stores 3-element or bigger values.

#### Return Value

This object. (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

[Back to documentation index.](index.md)
