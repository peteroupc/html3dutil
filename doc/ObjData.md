# ObjData

[Back to documentation index.](index.md)

### ObjData() <a id='ObjData'></a>

WaveFront OBJ format.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/objmtl.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    &lt;script type="text/javascript" src="extras/objmtl.js">&lt;/script>

#### Parameters

### Members

* [mtllib](#ObjData_mtllib)

### Methods

* [toShape](#ObjData_ObjData_toShape)
* [toShapeFromName](#ObjData_ObjData_toShapeFromName)
* [loadMtlFromUrl](#ObjData_loadMtlFromUrl)
* [loadObjFromUrl](#ObjData_loadObjFromUrl)
* [loadObjFromUrlWithTextures](#ObjData_loadObjFromUrlWithTextures)

### ObjData#mtllib <a id='ObjData_mtllib'></a>

An array of meshes. Two or more meshes may have
the same name (the "name" property in each mesh). The "data"
property holds data for each mesh.

### ObjData#toShape() <a id='ObjData_ObjData_toShape'></a>

Creates one or more 3D shapes from the data
in this OBJ file.

#### Return Value

Group of shapes. (Type: <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)

### ObjData#toShapeFromName(name) <a id='ObjData_ObjData_toShapeFromName'></a>

Creates one or more <a href="H3DU_Shape.md">H3DU.Shape</a> objects from the named portion
of the data in this OBJ file. If a MTL file was also loaded, the
shape will have the corresponding material, if it uses one.

#### Parameters

* `name` (Type: String)<br>
    Name from the OBJ file of the portion of the model to use.

#### Return Value

Group of shapes. The group
will be empty if no shapes with the given name exist. (Type: <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)

### (static) ObjData.loadMtlFromUrl(url) <a id='ObjData_loadMtlFromUrl'></a>

Loads a material (MTL) file asynchronously.

#### Parameters

* `url` (Type: String)<br>
    The URL to load the material data file.

#### Return Value

A promise that resolves when
the MTL file is loaded successfully (the result is an MtlData object),
and is rejected when an error occurs when loading the MTL file. (Type: <a href="Promise.md">Promise</a>)

### (static) ObjData.loadObjFromUrl(url) <a id='ObjData_loadObjFromUrl'></a>

Loads a WaveFront OBJ file (along with its associated MTL, or
material file, if available) asynchronously.

#### Parameters

* `url` (Type: String)<br>
    The URL to load.

#### Return Value

A promise that resolves when
the OBJ file is loaded successfully, whether or not its associated
MTL is also loaded successfully (the result is an ObjData object),
and is rejected when an error occurs when loading the OBJ file. (Type: <a href="Promise.md">Promise</a>)

### (static) ObjData.loadObjFromUrlWithTextures(url, textureLoader) <a id='ObjData_loadObjFromUrlWithTextures'></a>

Loads a WaveFront OBJ file (along with its associated MTL, or
material file, if available), along with the textures it uses,
asynchronously.

#### Parameters

* `url` (Type: String)<br>
    The URL to load.
* `textureLoader` (Type: TextureLoader)<br>
    An object to load textures with.

#### Return Value

A promise that resolves when
the OBJ file and textures are loaded successfully, whether or not the associated
MTL is also loaded successfully (the result is an ObjData object),
and is rejected when an error occurs when loading the OBJ file or any of
its textures. (Type: <a href="Promise.md">Promise</a>)
