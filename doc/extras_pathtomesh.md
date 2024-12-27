# module:extras/pathtomesh

[Back to documentation index.](index.md)

<a name='extras_pathtomesh'></a>
### module:extras/pathtomesh()

The <code>extras/pathtomesh.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/pathtomesh.js";
    // -- or --
    import * as CustomModuleName from "extras/pathtomesh.js";

### Methods

* [toExtrudedMeshBuffer](#extras_pathtomesh.toExtrudedMeshBuffer)<br>Generates a mesh buffer consisting of "walls" that follow this graphics path approximately, and, optionally, a base and top.
* [toLineMeshBuffer](#extras_pathtomesh.toLineMeshBuffer)<br>Generates a mesh buffer consisting of the approximate line segments that make up this graphics path.
* [toMeshBuffer](#extras_pathtomesh.toMeshBuffer)<br>Decomposes this path into triangles and generates a mesh
buffer with those triangles.

<a name='extras_pathtomesh.toExtrudedMeshBuffer'></a>
### (static) module:extras/pathtomesh.toExtrudedMeshBuffer(zStart, zEnd, [flatness], [closed])

Generates a mesh buffer consisting of "walls" that follow this graphics path approximately, and, optionally, a base and top.

#### Parameters

* `zStart` (Type: number)<br>Starting z-coordinate of the mesh buffer's "walls".
* `zEnd` (Type: number)<br>Ending z-coordinate of the mesh buffer's "walls".
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.
* `closed` (Type: boolean) (optional)<br>If true, the generated mesh buffer will include a base and top. If null, undefined, or omitted, the default is false.

#### Return Value

The resulting mesh buffer. (Type: *)

<a name='extras_pathtomesh.toLineMeshBuffer'></a>
### (static) module:extras/pathtomesh.toLineMeshBuffer([z], [flatness])

Generates a mesh buffer consisting of the approximate line segments that make up this graphics path.

#### Parameters

* `z` (Type: number) (optional)<br>The z-coordinate for each line segment. If null, undefined, or omitted, the default is 0.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

The resulting mesh buffer. (Type: *)

<a name='extras_pathtomesh.toMeshBuffer'></a>
### (static) module:extras/pathtomesh.toMeshBuffer([z], [flatness])

Decomposes this path into triangles and generates a mesh
buffer with those triangles. Each triangle's normal will point
toward the z-axis, and each triangle vertex's texture coordinates will
be the same as that vertex's position.

#### Parameters

* `z` (Type: number) (optional)<br>The z-coordinate of each triangle generated. If null, undefined, or omitted, default is 0.
* `flatness` (Type: number) (optional)<br>When curves and arcs are decomposed to line segments, the segments will be close to the true path of the curve by this value, given in units. If null, undefined, or omitted, default is 1.

#### Return Value

The resulting mesh buffer. (Type: *)

[Back to documentation index.](index.md)
