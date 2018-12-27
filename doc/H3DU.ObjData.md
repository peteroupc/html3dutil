# H3DU.ObjData

[Back to documentation index.](index.md)

<a name='H3DU.ObjData'></a>
### H3DU.ObjData()

WaveFront OBJ format.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/objmtl.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    <script type="text/javascript" src="extras/objmtl.js"></script>

### Members

* [mtllib](#H3DU.ObjData_mtllib)<br>**Deprecated: This property is not meant to be public.**
* [url](#H3DU.ObjData_url)<br>URL of the OBJ file.

### Methods

* [loadMtlFromUrl](#H3DU.ObjData.loadMtlFromUrl)<br>Loads a material (MTL) file asynchronously.
* [loadObjFromUrl](#H3DU.ObjData.loadObjFromUrl)<br>Loads a WaveFront OBJ file (along with its associated MTL, or
material file, if available) asynchronously.
* [loadObjFromUrlWithTextures](#H3DU.ObjData.loadObjFromUrlWithTextures)<br>Loads a WaveFront OBJ file (along with its associated MTL, or
material file, if available), along with the textures it uses,
asynchronously.
* [toShape](#H3DU.ObjData_toShape)<br>Creates one or more 3D shapes from the data
in this OBJ file.
* [toShapeFromName](#H3DU.ObjData_toShapeFromName)<br>Creates one or more <a href="H3DU.Shape.md">H3DU.Shape</a> objects from the named portion
of the data in this OBJ file.

<a name='H3DU.ObjData_mtllib'></a>
### H3DU.ObjData#mtllib

**Deprecated: This property is not meant to be public.**

An array of meshes. Two or more meshes may have
the same name (the "name" property in each mesh). The "data"
property holds data for each mesh.

<a name='H3DU.ObjData_url'></a>
### H3DU.ObjData#url

URL of the OBJ file.

<a name='H3DU.ObjData.loadMtlFromUrl'></a>
### (static) H3DU.ObjData.loadMtlFromUrl(url)

Loads a material (MTL) file asynchronously.

#### Parameters

* `url` (Type: string)<br>The URL to load the material data file.

#### Return Value

A promise that resolves when
the MTL file is loaded successfully,
and is rejected when an error occurs when loading the MTL file.
If the promise resolves, the result is an object that implements
the following methods: <ul>
<li><code>getMaterial(name)</code> - Gets a material by name; <code>name</code> is the name of the material.
Returns the material as H3DU.Material, or null if it doesn't exist.
<li><code>getMaterialNames()</code> - Gets an array of names of all the materials included in this MTL file.
</li>
</ul> (Type: <a href="Promise.md">Promise</a>)

<a name='H3DU.ObjData.loadObjFromUrl'></a>
### (static) H3DU.ObjData.loadObjFromUrl(url)

Loads a WaveFront OBJ file (along with its associated MTL, or
material file, if available) asynchronously.

#### Parameters

* `url` (Type: string)<br>The URL to load.

#### Return Value

A promise that resolves when
the OBJ file is loaded successfully, whether or not its associated
MTL is also loaded successfully (the result is an H3DU.ObjData object),
and is rejected when an error occurs when loading the OBJ file. (Type: <a href="Promise.md">Promise</a>)

<a name='H3DU.ObjData.loadObjFromUrlWithTextures'></a>
### (static) H3DU.ObjData.loadObjFromUrlWithTextures(url, textureLoader)

Loads a WaveFront OBJ file (along with its associated MTL, or
material file, if available), along with the textures it uses,
asynchronously.

#### Parameters

* `url` (Type: string)<br>The URL to load.
* `textureLoader` (Type: TextureLoader)<br>An object to load textures with.

#### Return Value

A promise that resolves when
the OBJ file and textures are loaded successfully, whether or not the associated
MTL is also loaded successfully (the result is an H3DU.ObjData object),
and is rejected when an error occurs when loading the OBJ file or any of
its textures. (Type: <a href="Promise.md">Promise</a>)

<a name='H3DU.ObjData_toShape'></a>
### H3DU.ObjData#toShape()

Creates one or more 3D shapes from the data
in this OBJ file.

#### Return Value

Group of shapes. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

<a name='H3DU.ObjData_toShapeFromName'></a>
### H3DU.ObjData#toShapeFromName(name)

Creates one or more <a href="H3DU.Shape.md">H3DU.Shape</a> objects from the named portion
of the data in this OBJ file. If a MTL file was also loaded, the
shape will have the corresponding material, if it uses one.

#### Parameters

* `name` (Type: string)<br>Name from the OBJ file of the portion of the model to use.

#### Return Value

Group of shapes. The group
will be empty if no shapes with the given name exist. (Type: <a href="H3DU.ShapeGroup.md">H3DU.ShapeGroup</a>)

[Back to documentation index.](index.md)
