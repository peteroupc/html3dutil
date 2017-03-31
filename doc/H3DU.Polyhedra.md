# H3DU.Polyhedra

[Back to documentation index.](index.md)

<a name='H3DU.Polyhedra'></a>
### H3DU.Polyhedra()

Contains helper methods for generating the five platonic solids
and other polyhedra.

To use this class, you must include the script "extras/polyhedra.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/polyhedra.js"></script>

### Methods

* [dodecahedron](#H3DU.Polyhedra.dodecahedron)<br>Generates a mesh of a regular dodecahedron or a sphere based on that solid.
* [dodecahedronFaces](#H3DU.Polyhedra.dodecahedronFaces)<br>Gets the vertices of a dodecahedron with maximum radius 1.
* [dodecahedronFacesCompact](#H3DU.Polyhedra.dodecahedronFacesCompact)<br>Gets a more compact representation of the vertices of a dodecahedron
with maximum radius 1.
* [hexahedron](#H3DU.Polyhedra.hexahedron)<br>Generates a mesh of a regular hexahedron (cube) or a sphere based on that solid.
* [hexahedronFaces](#H3DU.Polyhedra.hexahedronFaces)<br>Gets the vertices of a hexahedron (cube) with maximum radius 1.
* [hexahedronFacesCompact](#H3DU.Polyhedra.hexahedronFacesCompact)<br>Gets a more compact representation of the vertices of a hexahedron
(cube) with maximum radius 1.
* [icosahedron](#H3DU.Polyhedra.icosahedron)<br>Generates a mesh of a regular icosahedron or a sphere based on that solid.
* [icosahedronFaces](#H3DU.Polyhedra.icosahedronFaces)<br>Gets the vertices of a regular icosahedron with maximum radius 1.
* [makeSphere](#H3DU.Polyhedra.makeSphere)<br>Modifies the vertices and indices of a solid to
generate an approximation of a sphere.
* [normDistances](#H3DU.Polyhedra.normDistances)<br>Normalizes the distance from the origin to each vertex in the given
array to a fixed radius.
* [octahedron](#H3DU.Polyhedra.octahedron)<br>Generates a mesh of a regular octahedron or a sphere based on that solid.
* [octahedronFaces](#H3DU.Polyhedra.octahedronFaces)<br>Gets the vertices of a regular octahedron with radius 1.
* [tetrahedron](#H3DU.Polyhedra.tetrahedron)<br>Generates a mesh of a regular tetrahedron or a sphere based on that solid.
* [tetrahedronFaces](#H3DU.Polyhedra.tetrahedronFaces)<br>Gets the vertices of a tetrahedron with radius 1.

<a name='H3DU.Polyhedra.dodecahedron'></a>
### (static) H3DU.Polyhedra.dodecahedron(radius, level)

Generates a mesh of a regular dodecahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.Polyhedra.dodecahedronFaces'></a>
### (static) H3DU.Polyhedra.dodecahedronFaces()

Gets the vertices of a dodecahedron with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's X, Y, and Z coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Polyhedra.dodecahedronFacesCompact'></a>
### (static) H3DU.Polyhedra.dodecahedronFacesCompact()

Gets a more compact representation of the vertices of a dodecahedron
with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's X, Y, and Z coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Polyhedra.hexahedron'></a>
### (static) H3DU.Polyhedra.hexahedron(radius, level)

Generates a mesh of a regular hexahedron (cube) or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.Polyhedra.hexahedronFaces'></a>
### (static) H3DU.Polyhedra.hexahedronFaces()

Gets the vertices of a hexahedron (cube) with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's X, Y, and Z coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Polyhedra.hexahedronFacesCompact'></a>
### (static) H3DU.Polyhedra.hexahedronFacesCompact()

Gets a more compact representation of the vertices of a hexahedron
(cube) with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's X, Y, and Z coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Polyhedra.icosahedron'></a>
### (static) H3DU.Polyhedra.icosahedron(radius, level)

Generates a mesh of a regular icosahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.Polyhedra.icosahedronFaces'></a>
### (static) H3DU.Polyhedra.icosahedronFaces()

Gets the vertices of a regular icosahedron with maximum radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's X, Y, and Z coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Polyhedra.makeSphere'></a>
### (static) H3DU.Polyhedra.makeSphere(vi, radius, level)

Modifies the vertices and indices of a solid to
generate an approximation of a sphere.

#### Parameters

* `vi` (Type: Array.&lt;Array.&lt;number>>)<br>A two-element array. The first element contains an array of the vertices that make up the solid (each vertex's X, Y, and Z coordinates are stored as three elements of that array), and the second element contains an array of vertex indices (multiplying each element by 3 will get the index to the first coordinate of the corresponding vertex in the first array).
* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The "vi" parameter, which will likely be modified. (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Polyhedra.normDistances'></a>
### (static) H3DU.Polyhedra.normDistances(vertices, radius)

Normalizes the distance from the origin to each vertex in the given
array to a fixed radius.

#### Parameters

* `vertices` (Type: Array.&lt;number>)<br>An array of vertices, where each vertex's X, Y, and Z coordinates are stored as three elements of that array.
* `radius` (Type: number)<br>Distance from the origin where each vertex will be normalized to.

#### Return Value

Return value. (Type: Object)

<a name='H3DU.Polyhedra.octahedron'></a>
### (static) H3DU.Polyhedra.octahedron(radius, level)

Generates a mesh of a regular octahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.Polyhedra.octahedronFaces'></a>
### (static) H3DU.Polyhedra.octahedronFaces()

Gets the vertices of a regular octahedron with radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's X, Y, and Z coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

<a name='H3DU.Polyhedra.tetrahedron'></a>
### (static) H3DU.Polyhedra.tetrahedron(radius, level)

Generates a mesh of a regular tetrahedron or a sphere based on that solid.

#### Parameters

* `radius` (Type: number)<br>Maximum radius from the center of the solid to one of its vertices.
* `level` (Type: number)<br>If 0 or less, generates the solid as is. If 1 or greater, subdivides each triangle on the solid's surface into smaller triangles and makes them bulge out to form an approximation of a sphere (the bigger the number, the smaller the triangles).

#### Return Value

The generated solid. (Type: <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)

<a name='H3DU.Polyhedra.tetrahedronFaces'></a>
### (static) H3DU.Polyhedra.tetrahedronFaces()

Gets the vertices of a tetrahedron with radius 1.

#### Return Value

A two-element array. The first
element contains an array of the vertices that make up the solid (each
vertex's X, Y, and Z coordinates are stored as three elements of that array),
and the second element contains an array of vertex indices (multiplying
each element by 3 will get the index to the first coordinate of the corresponding
vertex in the first array). (Type: Array.&lt;Array.&lt;number>>)

[Back to documentation index.](index.md)
