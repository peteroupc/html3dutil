# module:extras/polyhedra.Polyhedra

[Back to documentation index.](index.md)

<a name='extras_polyhedra.Polyhedra'></a>
### new module:extras/polyhedra.Polyhedra()

Contains helper methods for generating the five platonic solids
and other polyhedra.

### Methods

* [dodecahedron](#extras_polyhedra_Polyhedra.dodecahedron)<br>Generates a mesh of a regular dodecahedron or a sphere based on that solid.
* [dodecahedronFaces](#extras_polyhedra_Polyhedra.dodecahedronFaces)<br>Gets the vertices of a dodecahedron with maximum radius 1.
* [dodecahedronFacesCompact](#extras_polyhedra_Polyhedra.dodecahedronFacesCompact)<br>Gets a more compact representation of the vertices of a dodecahedron
with maximum radius 1.
* [hexahedron](#extras_polyhedra_Polyhedra.hexahedron)<br>Generates a mesh of a regular hexahedron (cube) or a sphere based on that solid.
* [hexahedronFaces](#extras_polyhedra_Polyhedra.hexahedronFaces)<br>Gets the vertices of a hexahedron (cube) with maximum radius 1.
* [hexahedronFacesCompact](#extras_polyhedra_Polyhedra.hexahedronFacesCompact)<br>Gets a more compact representation of the vertices of a hexahedron
(cube) with maximum radius 1.
* [icosahedron](#extras_polyhedra_Polyhedra.icosahedron)<br>Generates a mesh of a regular icosahedron or a sphere based on that solid.
* [icosahedronFaces](#extras_polyhedra_Polyhedra.icosahedronFaces)<br>Gets the vertices of a regular icosahedron with maximum radius 1.
* [makeSphere](#extras_polyhedra_Polyhedra.makeSphere)<br>Modifies the vertices and indices of a solid to
generate an approximation of a sphere.
* [normDistances](#extras_polyhedra_Polyhedra.normDistances)<br>Normalizes the distance from the origin to each vertex in the given
array to a fixed radius.
* [octahedron](#extras_polyhedra_Polyhedra.octahedron)<br>Generates a mesh of a regular octahedron or a sphere based on that solid.
* [octahedronFaces](#extras_polyhedra_Polyhedra.octahedronFaces)<br>Gets the vertices of a regular octahedron with radius 1.
* [tetrahedron](#extras_polyhedra_Polyhedra.tetrahedron)<br>Generates a mesh of a regular tetrahedron or a sphere based on that solid.
* [tetrahedronFaces](#extras_polyhedra_Polyhedra.tetrahedronFaces)<br>Gets the vertices of a tetrahedron with radius 1.

<a name='extras_polyhedra_Polyhedra.dodecahedron'></a>
### (static) module:extras/polyhedra~Polyhedra.dodecahedron(radius, level)

Generates a mesh of a regular dodecahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='extras_polyhedra_Polyhedra.dodecahedronFaces'></a>
### (static) module:extras/polyhedra~Polyhedra.dodecahedronFaces()

Gets the vertices of a dodecahedron with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='extras_polyhedra_Polyhedra.dodecahedronFacesCompact'></a>
### (static) module:extras/polyhedra~Polyhedra.dodecahedronFacesCompact()

Gets a more compact representation of the vertices of a dodecahedron
with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='extras_polyhedra_Polyhedra.hexahedron'></a>
### (static) module:extras/polyhedra~Polyhedra.hexahedron(radius, level)

Generates a mesh of a regular hexahedron (cube) or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='extras_polyhedra_Polyhedra.hexahedronFaces'></a>
### (static) module:extras/polyhedra~Polyhedra.hexahedronFaces()

Gets the vertices of a hexahedron (cube) with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='extras_polyhedra_Polyhedra.hexahedronFacesCompact'></a>
### (static) module:extras/polyhedra~Polyhedra.hexahedronFacesCompact()

Gets a more compact representation of the vertices of a hexahedron
(cube) with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='extras_polyhedra_Polyhedra.icosahedron'></a>
### (static) module:extras/polyhedra~Polyhedra.icosahedron(radius, level)

Generates a mesh of a regular icosahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='extras_polyhedra_Polyhedra.icosahedronFaces'></a>
### (static) module:extras/polyhedra~Polyhedra.icosahedronFaces()

Gets the vertices of a regular icosahedron with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='extras_polyhedra_Polyhedra.makeSphere'></a>
### (static) module:extras/polyhedra~Polyhedra.makeSphere(vi, radius, level)

Modifies the vertices and indices of a solid to
generate an approximation of a sphere.

#### Parameters

* `vi` (Type: Array.&lt;Array.&lt;number>>)<br>A two-element array. The first element contains an array of the vertices that make up the solid (each vertex's x-, y-, and z-coordinates are stored as three elements of that array), and the second element contains an array of vertex indices (multiplying each element by 3 will get the index to the first coordinate of the corresponding vertex in the first array).
* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The "vi" parameter, which will likely be modified. (Type: Array.&lt;Array.&lt;number>>)

<a name='extras_polyhedra_Polyhedra.normDistances'></a>
### (static) module:extras/polyhedra~Polyhedra.normDistances(vertices, radius)

Normalizes the distance from the origin to each vertex in the given
array to a fixed radius.

#### Parameters

* `vertices` (Type: Array.&lt;number>)<br>An array of vertices, where each vertex's x-, y-, and z-coordinates are stored as three elements of that array.
* `radius` (Type: number)<br>Distance from the origin where each vertex will be normalized to.

#### Return Value

Return value. (Type: Object)

<a name='extras_polyhedra_Polyhedra.octahedron'></a>
### (static) module:extras/polyhedra~Polyhedra.octahedron(radius, level)

Generates a mesh of a regular octahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='extras_polyhedra_Polyhedra.octahedronFaces'></a>
### (static) module:extras/polyhedra~Polyhedra.octahedronFaces()

Gets the vertices of a regular octahedron with radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='extras_polyhedra_Polyhedra.tetrahedron'></a>
### (static) module:extras/polyhedra~Polyhedra.tetrahedron(radius, level)

Generates a mesh of a regular tetrahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='extras_polyhedra_Polyhedra.tetrahedronFaces'></a>
### (static) module:extras/polyhedra~Polyhedra.tetrahedronFaces()

Gets the vertices of a tetrahedron with radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

[Back to documentation index.](index.md)
