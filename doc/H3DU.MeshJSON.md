# H3DU.MeshJSON

[Back to documentation index.](index.md)

<a name='H3DU.MeshJSON'></a>
### H3DU.MeshJSON()

JSON exporter of graphics meshes.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/meshjson.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/meshjson.js"></script>

### Methods

* [loadJSON](#H3DU.MeshJSON.loadJSON)<br>Loads a mesh from JSON format.
* [toJSON](#H3DU.MeshJSON.toJSON)<br>Converts a mesh to JSON format.

<a name='H3DU.MeshJSON.loadJSON'></a>
### (static) H3DU.MeshJSON.loadJSON(url)

Loads a mesh from JSON format.

#### Parameters

* `url` (Type: string)<br>URL to a JSON mesh object, as used in the Public Domain HTML 3D Library.

#### Return Value

A promise that, when resolved, exposes an object
that implements a property named <code>toShape</code>, which is
a method that gets a <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a> describing the 3D mesh. (Type: <a href="Promise.md">Promise</a>)

<a name='H3DU.MeshJSON.toJSON'></a>
### (static) H3DU.MeshJSON.toJSON(mesh)

Converts a mesh to JSON format.

#### Parameters

* `mesh` (Type: <a href="H3DU.Mesh.md">H3DU.Mesh</a> | <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>)<br>A mesh object or mesh buffer object, as used in the Public Domain HTML 3D Library.

#### Return Value

A JSON string describing the mesh. (Type: string)

[Back to documentation index.](index.md)
