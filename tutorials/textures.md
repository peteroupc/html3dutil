## Sample Code for Loading Textures

### Loading a single texture

The variable `textureURL` is the URL of the texture to load.

```
  scene.loadAndMapTexture(textureURL).then(function(tex){
    // texture is loaded, the Texture object is in the "tex" paramete
  }, function(error){
    // an error occurred
  });
```

### Loading multiple textures

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

### Demos

* [textured.html](https://peteroupc.github.io/html3dutil/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [gradient.html](https://peteroupc.github.io/html3dutil/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.
