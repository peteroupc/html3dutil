# Polyhedra

[Back to documentation index.](index.md)

<a name='Polyhedra'></a>
### Polyhedra()

Contains helper methods for generating the five platonic solids
and other polyhedra.

### Methods

* [dodecahedron](#Polyhedra.dodecahedron)<br>Generates a mesh of a regular dodecahedron or a sphere based on that solid.
* [dodecahedronFaces](#Polyhedra.dodecahedronFaces)<br>Gets the vertices of a dodecahedron with maximum radius 1.
* [dodecahedronFacesCompact](#Polyhedra.dodecahedronFacesCompact)<br>Gets a more compact representation of the vertices of a dodecahedron
with maximum radius 1.
* [hexahedron](#Polyhedra.hexahedron)<br>Generates a mesh of a regular hexahedron (cube) or a sphere based on that solid.
* [hexahedronFaces](#Polyhedra.hexahedronFaces)<br>Gets the vertices of a hexahedron (cube) with maximum radius 1.
* [hexahedronFacesCompact](#Polyhedra.hexahedronFacesCompact)<br>Gets a more compact representation of the vertices of a hexahedron
(cube) with maximum radius 1.
* [icosahedron](#Polyhedra.icosahedron)<br>Generates a mesh of a regular icosahedron or a sphere based on that solid.
* [icosahedronFaces](#Polyhedra.icosahedronFaces)<br>Gets the vertices of a regular icosahedron with maximum radius 1.
* [makeSphere](#Polyhedra.makeSphere)<br>Modifies the vertices and indices of a solid to
generate an approximation of a sphere.
* [normDistances](#Polyhedra.normDistances)<br>Normalizes the distance from the origin to each vertex in the given
array to a fixed radius.
* [octahedron](#Polyhedra.octahedron)<br>Generates a mesh of a regular octahedron or a sphere based on that solid.
* [octahedronFaces](#Polyhedra.octahedronFaces)<br>Gets the vertices of a regular octahedron with radius 1.
* [tetrahedron](#Polyhedra.tetrahedron)<br>Generates a mesh of a regular tetrahedron or a sphere based on that solid.
* [tetrahedronFaces](#Polyhedra.tetrahedronFaces)<br>Gets the vertices of a tetrahedron with radius 1.

<a name='Polyhedra.dodecahedron'></a>
### (static) Polyhedra.dodecahedron(radius, level)

Generates a mesh of a regular dodecahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='Polyhedra.dodecahedronFaces'></a>
### (static) Polyhedra.dodecahedronFaces()

Gets the vertices of a dodecahedron with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='Polyhedra.dodecahedronFacesCompact'></a>
### (static) Polyhedra.dodecahedronFacesCompact()

Gets a more compact representation of the vertices of a dodecahedron
with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='Polyhedra.hexahedron'></a>
### (static) Polyhedra.hexahedron(radius, level)

Generates a mesh of a regular hexahedron (cube) or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='Polyhedra.hexahedronFaces'></a>
### (static) Polyhedra.hexahedronFaces()

Gets the vertices of a hexahedron (cube) with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='Polyhedra.hexahedronFacesCompact'></a>
### (static) Polyhedra.hexahedronFacesCompact()

Gets a more compact representation of the vertices of a hexahedron
(cube) with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='Polyhedra.icosahedron'></a>
### (static) Polyhedra.icosahedron(radius, level)

Generates a mesh of a regular icosahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='Polyhedra.icosahedronFaces'></a>
### (static) Polyhedra.icosahedronFaces()

Gets the vertices of a regular icosahedron with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='Polyhedra.makeSphere'></a>
### (static) Polyhedra.makeSphere(vi, radius, level)

Modifies the vertices and indices of a solid to
generate an approximation of a sphere.

#### Parameters

* `vi` (Type: Array.&lt;Array.&lt;number>>)<br>A two-element array. The first element contains an array of the vertices that make up the solid (each vertex's x-, y-, and z-coordinates are stored as three elements of that array), and the second element contains an array of vertex indices (multiplying each element by 3 will get the index to the first coordinate of the corresponding vertex in the first array).
* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The "vi" parameter, which will likely be modified. (Type: Array.&lt;Array.&lt;number>>)

<a name='Polyhedra.normDistances'></a>
### (static) Polyhedra.normDistances(vertices, radius)

Normalizes the distance from the origin to each vertex in the given
array to a fixed radius.

#### Parameters

* `vertices` (Type: Array.&lt;number>)<br>An array of vertices, where each vertex's x-, y-, and z-coordinates are stored as three elements of that array.
* `radius` (Type: number)<br>Distance from the origin where each vertex will be normalized to.

#### Return Value

Return value. (Type: Object)

<a name='Polyhedra.octahedron'></a>
### (static) Polyhedra.octahedron(radius, level)

Generates a mesh of a regular octahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='Polyhedra.octahedronFaces'></a>
### (static) Polyhedra.octahedronFaces()

Gets the vertices of a regular octahedron with radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='Polyhedra.tetrahedron'></a>
### (static) Polyhedra.tetrahedron(radius, level)

Generates a mesh of a regular tetrahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: MeshBuffer)

<a name='Polyhedra.tetrahedronFaces'></a>
### (static) Polyhedra.tetrahedronFaces()

Gets the vertices of a tetrahedron with radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's x-, y-, and z-coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

[Back to documentation index.](index.md)
