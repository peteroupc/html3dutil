## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Texture Loaders](#Texture_Loaders)<br>[Sample Code for Loading Textures](#Sample_Code_for_Loading_Textures)<br>&nbsp;&nbsp;[Loading a single texture](#Loading_a_single_texture)<br>&nbsp;&nbsp;[Loading multiple textures](#Loading_multiple_textures)<br>&nbsp;&nbsp;[Demos](#Demos)<br>

## Texture Loaders <a id=Texture_Loaders></a>

A texture loader (TextureLoader) caches textures loaded and uploaded to WebGL contexts.

## Sample Code for Loading Textures <a id=Sample_Code_for_Loading_Textures></a>

### Loading a single texture <a id=Loading_a_single_texture></a>

The `loadAndMapTexture` method of `TextureLoader` returns a promise, which will receive either
the texture loaded or an error.  Loading a texture often happens asynchronously, so code that
follows the `loadAndMapTexture` call (and its corresponding `then` calls) will generally run without
waiting for the texture to finish loading.

In the sample code below, the variable `textureURL` is the URL of the texture to load.

```
  var loader=new H3DU.TextureLoader();
  loader.loadAndMapTexture(textureURL, scene).then(function(tex){
    // texture is loaded, the Texture object is in the "tex" parameter
    // Now create a sphere
    var mesh=H3DU.Meshes.createSphere(1);
    // Make a shape using the texture
    var shape=new Shape(mesh).setTexture(texture);
  }, function(error){
    // an error occurred
  });
```

### Loading multiple textures <a id=Loading_multiple_textures></a>

The variables `textureURL1` and `textureURL2` are URL textures.

```
  var loader=new H3DU.TextureLoader();
  loader.loadAndMapTexturesAll([
   textureURL1,
   textureURL2
  ], scene).then(function(res){
      for(var i=0;i<res.length;i++){
        var texture=res[i];
        // deal with the texture (a Texture object)
      }
  }, function(res){
   // Some or all of the textures failed to load
   if(res.failures.length>0){
     // We have some failing textures
   }
   if(res.successes.length>0){
     // We have some succeeding textures
   }
  });
```

### Demos <a id=Demos></a>

* [textured.html](https://peteroupc.github.io/html3dutil/demos/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [gradient.html](https://peteroupc.github.io/html3dutil/demos/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.
