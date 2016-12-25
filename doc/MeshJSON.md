# MeshJSON

[Back to documentation index.](index.md)

### MeshJSON() <a id='MeshJSON'></a>

JSON exporter of graphics meshes.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/meshjson.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    &lt;script type="text/javascript" src="extras/meshjson.js">&lt;/script>

### Methods

* [loadJSON](#MeshJSON_loadJSON)
* [toJSON](#MeshJSON_toJSON)

### (static) MeshJSON.loadJSON(url) <a id='MeshJSON_loadJSON'></a>

Loads a mesh from JSON format.

#### Parameters

* `url` (Type: String)<br>
    URL to a JSON mesh object, as used in the Public Domain HTML 3D Library.

#### Return Value

A promise that, when resolved, exposes an object
that implements a property named <code>toShape</code>, which is
a method that gets a <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a> describing the 3D mesh. (Type: <a href="Promise.md">Promise</a>)

### (static) MeshJSON.toJSON(mesh) <a id='MeshJSON_toJSON'></a>

Converts a mesh to JSON format.

#### Parameters

* `mesh` (Type: <a href="H3DU_Mesh.md">H3DU.Mesh</a>)<br>
    A mesh object, as used in the Public Domain HTML 3D Library.

#### Return Value

A JSON string describing the mesh. (Type: String)
