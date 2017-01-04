# H3DU.ObjData

[Back to documentation index.](index.md)

### H3DU.ObjData() <a id='H3DU.ObjData'></a>

WaveFront OBJ format.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/objmtl.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/objmtl.js"></script>

### Members

* [mtllib](#H3DU.ObjData_mtllib)<br><b>Deprecated: This property is not meant to be public.</b>
* [url](#H3DU.ObjData_url)<br>URL of the OBJ file.

### Methods

* [.loadMtlFromUrl](#H3DU.ObjData.loadMtlFromUrl)<br>Loads a material (MTL) file asynchronously.
* [toShape](#H3DU.ObjData_H3DU.ObjData_toShape)<br>Creates one or more 3D shapes from the data
in this OBJ file.
* [toShapeFromName](#H3DU.ObjData_H3DU.ObjData_toShapeFromName)<br>Creates one or more <a href="H3DU.Shape.md">H3DU.Shape</a> objects from the named portion
of the data in this OBJ file.

### H3DU.ObjData#mtllib <a id='H3DU.ObjData_mtllib'></a>

<b>Deprecated: This property is not meant to be public.</b>

An array of meshes. Two or more meshes may have
the same name (the "name" property in each mesh). The "data"
property holds data for each mesh.

### H3DU.ObjData#url <a id='H3DU.ObjData_url'></a>

URL of the OBJ file.

### H3DU.ObjData.loadMtlFromUrl(url) <a id='H3DU.ObjData.loadMtlFromUrl'></a>

Loads a material (MTL) file asynchronously.

#### Parameters

* `url` (Type: String)<br>
    The URL to load the material data file.

#### Return Value

A promise that resolves when
the MTL file is loaded successfully,
and is rejected when an error occurs when loading the MTL file.
If the promise resolves, the result is an object that implements
the following methods: <ul>
<li><code>getMaterial(name)</code> - Gets a material by name; <code>name</code> is the name of the material.
Returns the material as <a href="H3DU.Material.md">H3DU.Material</a>, or null if it doesn't exist.
<li><code>getMaterialNames()</code> - Gets an array of names of all the materials included in this MTL file.
</li>
</ul> (Type: <a href="Promise.md">Promise</a>)

### H3DU.ObjData#toShape() <a id='H3DU.ObjData_H3DU.ObjData_toShape'></a>

Creates one or more 3D shapes from the data
in this OBJ file.

#### Return Value

Group of shapes. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

### H3DU.ObjData#toShapeFromName(name) <a id='H3DU.ObjData_H3DU.ObjData_toShapeFromName'></a>

Creates one or more <a href="H3DU.Shape.md">H3DU.Shape</a> objects from the named portion
of the data in this OBJ file. If a MTL file was also loaded, the
shape will have the corresponding material, if it uses one.

#### Parameters

* `name` (Type: String)<br>
    Name from the OBJ file of the portion of the model to use.

#### Return Value

Group of shapes. The group
will be empty if no shapes with the given name exist. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)
