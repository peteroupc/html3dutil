## Introduction

This tip describes what graphics filters are and how to use them in my
public domain [HTML 3D Library](http://peteroupc.github.io/html3dutil).

**Download the latest version of the library at the [HTML 3D Library's Releases page](https://github.com/peteroupc/html3dutil/releases).**

## Graphics Filters

In the HTML 3D Library, graphics filters are functions used to modify the appearance
of the screen after each frame.  They are implemented in a language called GLSL, or GL
Shading Language.  GLSL programs are called "shaders", and they are compiled into code that runs on a GPU,
or graphics processing unit.  

Graphics filters are considered "fragment shaders", or shaders that render one pixel at a time.  GPUs can run
shaders very fast because fragment shaders can process each pixel in parallel, without affecting the other
pixels, and GPUs are often much better designed for parallel processing than CPUs.

## Writing Graphics Filters

In the HTML 3D Library, use the `makeEffect` method of the ShaderProgram class to create
graphics filters:

* The `ShaderProgram` class hold data on shader programs.  Each shader program consists
of a _vertex shader_ and a _fragment shader_.  Graphics filters are essentially part of a fragment shader
and thus processes pixels.  (Vertex shaders, which process vertices of triangles, lines, and points,
are not discussed on this page.)
* The `makeEffect` method creates a shader program and compiles it, using the graphics
filter as part of the program's fragment shader.

The following is an example of a graphics filter.

    return ShaderProgram.makeEffect(context,[
    "vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize){",
    // Read the current color from the sampler texture
    " vec4 color=texture2D(sampler,uvCoord);",
    // Convert the color to a shade of gray.  It gets
    // the current color's red, green, and blue components,
    // adds them, and divides by 3.  Thus, the gray color
    // will be an average of the red/green/blue components.
    " float gray=(color.r+color.g+color.b)/3.0;",
    // Return the gray color
    " return vec4(gray,gray,gray,color.a);",
    "}"].join("\n"));

Each graphics filter must have a GLSL function called `textureEffect()`, like in the example above.
The `textureEffect` function takes these parameters:

* `sampler2D sampler`: Points to a texture representing a screenshot of the current frame.  To read from
  the texture, use the `texture2D` function, as shown in the example above.
* `vec2 uvCoord`: Texture coordinates of the current pixel.  `uvCoord.x` ranges from 0 on the left side
  to 1 on the right side.  `uvCoord.y` ranges from 0 on the bottom side to 1 on the top side.  (Note that
  texture coordinates start from the bottom-left corner, not the top left, that is, textures are "bottom up",
  not "top down").
* `vec2 textureSize`: Size of the screenshot, pointed to by `sampler`, in pixels.  `textureSize.x` is the
  width, and `textureSize.y` is the height.

The `textureEffect` function returns a `vec4` (4-element vector) giving the color that the current pixel should 
be.  The example above reads the current pixel's color, turns it to a shade of gray, and returns a new color
with that shade of gray.  Thus, the filter will convert the screen to grayscale tones.

**To be written: Brief discussion of uniforms as custom parameters**

A detailed treatment of GLSL is outside the scope of this page.  More information about GLSL can
be found by searching the Web; note that there are many versions of GLSL and the one used
in HTML applications is relatively basic nowadays.  Also see below for more examples of graphics filters.

## Examples

* [squares.html](https://peteroupc.github.io/html3dutil/demos/squares.html) - Demonstrates graphics filters.

The demo [squares.html](https://peteroupc.github.io/html3dutil/demos/squares.html) includes a number
of graphics filters implemented as shaders.

Here are more details on the filters it implements.

### Grayscale

The grayscale filter, which converts the screen to black and white, was already given above.

### Mirror Filter

This filter does a horizontal flip of its pixels.  Note that the filter, given below, reads not from
the current pixel, but rather the pixel from the opposite side to the current pixel (it takes 1 minus
the current X coordinate).

    function makeMirror(context){
    return ShaderProgram.makeEffect(context,[
    "vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize){",
    " vec4 color=texture2D(sampler,vec2(1.0-uvCoord.x,uvCoord.y));",
    " return color;",
    "}"].join("\n"));
    }

### Matrix Filter

This filter enables a family of image processing filters, such as blurring, sharpening,
edge detection, and embossing, that process each pixel and its neighbors.  This filter takes
a 3x3 _convolution matrix_ or _kernel_, which gives the contribution of each pixel's color
to the final color.  All the numbers in the matrix must add up to 1.

Note that the `uniform` given below is a `mat3`, meaning a 3x3 matrix.


### Pixelate Filter

This filter pixelates the screen, in effect, by scaling it down and then scaling it up.
This filter takes a `uniform` named `coarseness`, which indicates how many normal pixels
each "pixelated" pixel takes up.

    function makePixelate(context){
    return ShaderProgram.makeEffect(context,[
    "uniform float coarseness;", // coarseness in pixels; 1 means normal
    "vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize){",
    " float g=max(coarseness,1.0);",
    " float gridSizeX=textureSize.x/g;",
    " float gridSizeY=textureSize.y/g;",
    " float uv0=floor(uvCoord.x*gridSizeX)/gridSizeX;",
    " float uv1=floor(uvCoord.y*gridSizeY)/gridSizeY;",
    " vec4 c=texture2D(sampler,vec2(uv0,uv1));",
    " return c;",
    "}"].join("\n"));
}

### Wave Filter

To be written.

### Waterpaint Filter

To be written.

## Other Pages

The following pages of mine on CodeProject also discuss this library:

* [_Public-Domain HTML 3D Library_](http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library)
* [_Creating shapes using the Public Domain HTML 3D Library_](http://www.codeproject.com/Tips/987914/Creating-shapes-using-the-Public-Domain-HTML-D-Lib)
* [_Drawing parametric surfaces using the Public Domain HTML 3D Library_](http://www.codeproject.com/Tips/990798/Drawing-Parametric-Surfaces-Using-the-Public-Domai)
* [_The "Camera" and the Projection and View Transforms_](http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms)