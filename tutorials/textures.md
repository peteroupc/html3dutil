## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Sample Code for Loading Textures](#Sample_Code_for_Loading_Textures)<br>&nbsp;&nbsp;[Loading a single texture](#Loading_a_single_texture)<br>&nbsp;&nbsp;[Loading multiple textures](#Loading_multiple_textures)<br>&nbsp;&nbsp;[Demos](#Demos)<br>

## Sample Code for Loading Textures <a id=Sample_Code_for_Loading_Textures></a>

### Loading a single texture <a id=Loading_a_single_texture></a>

The variable `textureURL` is the URL of the texture to load.

```
  scene.loadAndMapTexture(textureURL).then(function(tex){
    // texture is loaded, the Texture object is in the "tex" parameter
    // Now create a sphere
    var mesh=Meshes.createSphere(1);
    // Make a shape using the texture
    var shape=scene.makeShape(mesh).setTexture(texture);
  }, function(error){
    // an error occurred
  });
```

### Loading multiple textures <a id=Loading_multiple_textures></a>

The variables `textureURL1` and `textureURL2` are URL textures.

```
  scene.loadAndMapTextures([
   textureURL1,
   textureURL2
  ]).then(function(res){
    if(res.failures.length>0){
      // Some of the textures failed to load
    } else {
      for(var i=0;i<res.successes.length;i++){
        var texture=res.successes[i];
        // deal with the texture (a Texture object)
      }
    }
  });
```

### Demos <a id=Demos></a>

* [textured.html](https://peteroupc.github.io/html3dutil/demos/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [gradient.html](https://peteroupc.github.io/html3dutil/demos/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.
