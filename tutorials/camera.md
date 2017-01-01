## Introduction <a id=Introduction></a>

This page describes conventions for specifying projection and
view transforms in 3D graphics, especially when using my
[HTML 3D Library](http://peteroupc.github.io/html3dutil),
and explains how the GL pipeline transforms vertices to help
it draw triangles, lines, and other graphics primitives.

**Download the latest version of the library at the [HTML 3D Library's Releases page](https://github.com/peteroupc/html3dutil/releases).**
## Contents <a id=Contents></a>

[Introduction](#Introduction)<br>[Contents](#Contents)<br>[The "Camera" and the Projection and View Transforms](#The_Camera_and_the_Projection_and_View_Transforms)<br>&nbsp;&nbsp;[Overview of Transformations](#Overview_of_Transformations)<br>[Projection Transform](#Projection_Transform)<br>&nbsp;&nbsp;[Perspective Projection](#Perspective_Projection)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Demo](#Demo)<br>&nbsp;&nbsp;[Orthographic Projection](#Orthographic_Projection)<br>&nbsp;&nbsp;[Other Projections](#Other_Projections)<br>[View Transform](#View_Transform)<br>[Vertex Coordinates in the Graphics System](#Vertex_Coordinates_in_the_Graphics_System)<br>[Other Pages](#Other_Pages)<br>

## The "Camera" and Geometric Transforms <a id=The_Camera_and_the_Projection_and_View_Transforms></a>

The [`Batch3D`](http://peteroupc.github.io/html3dutil/H3DU.Batch3D.html) class
of the HTML 3D Library has a concept of a "projection transform" and a "view transform".
If we use the concept of a "camera", the projection is like setting the camera's focus and
lens, and the view transform is like setting its position and orientation. `Batch3D`
has methods for setting all these attributes of this abstract "camera". Two of them are
[`perspective()`](http://peteroupc.github.io/html3dutil/H3DU.Batch3D.html#.perspective)
and [`setLookAt()`](http://peteroupc.github.io/html3dutil/H3DU.Batch3D.html#.setLookAt),
which are shown in the example below.

    // Set the perspective view.  Camera has a 45-degree field of view
    // and will see objects from 0.1 to 100 units away.
    batch3d.perspective(45,scene.getClientAspect(),0.1,100);
    // Move the camera back 40 units.
    batch3d.setLookAt([0,0,40]);
    // Move the camera back 30 units instead, and turn it so it
    // points at (0, 2, 0), that is, up 2 units.
    batch3d.setLookAt([0,0,30], [0,2,0]);

### Overview of Transformations <a id=Overview_of_Transformations></a>

The HTML 3D library uses the following transformations:

* A _world matrix_ transforms an object's own coordinates to _world space_,
the coordinate system shared by every object in the scene.  The world matrix
is not discussed in this page.
* A _view matrix_ transforms coordinates in world space to _camera space_.
* A _projection matrix_ transforms coordinates in camera space to _clip space_.

As [explained later](#Vertex Coordinates in the Graphics System) on this page,
however, these transformations and matrices are
merely for the convenience of the library; all the graphics pipeline expects is the clip
space coordinates of the things it draws.  The pipeline uses those coordinates
and their transformed _window coordinates_ when rendering things on the screen.

## Projection Transform <a id=Projection_Transform></a>

A _projection matrix_ transforms coordinates in camera space to _clip space_.

Two commonly used projections in 3D graphics are the perspective projection and
orthographic projection, described below.

### Perspective Projection <a id=Perspective_Projection></a>

A perspective projection gives the 3D scene a sense of depth.  In this projection, closer objects
look bigger than more distant objects with the same size, making the
projection similar to how our eyes see the world.

![Two rows of spheres, and a drawing of a perspective view volume.](persp1.png)

![Two rows of spheres, and a side drawing of a perspective view volume.](persp2.png)

The 3D scene is contained in a so-called _view volume_, and only objects contained in the
view volume will be visible.  The lines above show what a perspective view
volume looks like.  Some of the spheres drawn would not be visible within this view volume,
and others would be.

The view volume is bounded on all six sides by six _clipping planes_:

* The near and far clipping planes are placed a certain distance from the camera.  For example, if
the near clipping plane is 3 units away and the far clipping plane is 5 units away, the view volume
will hold only objects between 3 and 5 units from the camera.  (Strictly speaking, a near clipping
plane is not necessary, but practically speaking it is, in order to make the math work out correctly.)
* The left, right, top, and bottom clipping planes form the other four sides of the volume.

Note further that:

* The angle separating the top and bottom clipping planes is the projection's _field of view_.  This is an angle
similar to the aperture of a camera.  The greater the vertical field of view, the greater
the vertical visibility range.
* In a perspective projection, the view volume will resemble a "pyramid" with the top chopped off (a _frustum_).  The
near clipping plane will be located at the chopped-off top, and the far clipping plane will be at the base.

The perspective projection converts 3D coordinates to 4-element vectors in _clip space_.
However, this is not the whole story, since in general, nearly all lines that are parallel in world space
will generally not appear parallel in a perspective projection, so additional math is needed to
achieve the perspective effect. This will be [explained later](#Vertex Coordinates in the Graphics System).

The following methods define a perspective projection.

**[`H3DU.Math.mat4perspective(fov, aspect, near, far)`]{@link H3DU.Math.mat4perspective}**

This method returns a 4x4 matrix that adjusts the coordinate system for a perspective
projection given a field of view and an aspect ratio,
and sets the scene's projection matrix accordingly.  The resulting matrix can be passed
to the `setProjectionMatrix` method of the `H3DU.Batch3D` class.

* `fov` - Vertical field of view, in degrees.
* `aspect` - Aspect ratio of the scene.  You should usually use `scene3d.getClientAspect()`.
* `near`, `far` - Distance from the camera to the near and far clipping planes.

**[`batch3d.perspectiveAspect(fov near, far)`]{{@link H3DU.Batch3D#perspectiveAspect}**

This method of the `H3DU.Batch3D` class sets the projection matrix to a perspective
projection.  The `fov`, `near`, and `far` parameters are the same as for `mat4perspective`,
and the aspect ratio used to calculate the projection matrix adapts automatically to the `H3DU.Scene3D` in which
the `Batch3D` is rendered.

**[`H3DU.Math.mat4frustum(left, right, bottom, top, near, far)`](http://peteroupc.github.io/html3dutil/H3DU.Math.html#.mat4frustum)**

This method returns a 4x4 matrix that adjusts the coordinate system for a perspective
projection matrix based on the location of the six clipping planes that
bound the view volume.  Their positions are chosen so that the result is a perspective projection.
The resulting matrix can be passed to the `setProjectionMatrix` method of the `H3DU.Batch3D` class.

* `left`, `right`, `bottom`, `top` - Location of the left, right, bottom, and top clipping planes in terms
of where they meet the near clipping plane.
* `near`, `far` - Distance from the camera to the near and far clipping planes.

#### Demo <a id=Demo></a>

* [perspective.html](https://peteroupc.github.io/html3dutil/demos/perspective.html) - Demonstrates a perspective projection.

### Orthographic Projection <a id=Orthographic_Projection></a>

An orthographic projection is one in which the left and right clipping planes are parallel to each other,
and the top and bottom clipping planes are parallel to each other.  This results in the near and far clipping
planes having the same size, unlike in a perspective projection, and
objects with the same size not varying in size with their depth.

The following methods define an orthographic projection.

**`H3DU.Math.mat4ortho(left, right, bottom, top, near, far)`**

This method returns a 4x4 matrix that adjusts the coordinate system for an orthographic projection.
  The resulting matrix can be passed
to the `setProjectionMatrix` method of the `H3DU.Batch3D` class.

* `left` - Leftmost coordinate of the 3D view.
* `right` - Rightmost coordinate of the 3D view.
* `bottom` - Topmost coordinate of the 3D view.
* `top` - Bottommost coordinate of the 3D view.
* `near`, `far` - Distance from the camera to the near and far clipping planes.  Either value
can be negative.

**`H3DU.Math.mat4ortho2d(left, right, bottom, top)`**

This method returns a 4x4 matrix that adjusts the coordinate system for a two-dimensional orthographic projection.  This is a convenience method that is useful for showing a two-dimensional view.
  The resulting matrix can be passed
to the `setProjectionMatrix` method of the `H3DU.Batch3D` class. The `mat4ortho2d` method calls `mat4ortho` and sets `near` and `far` to -1 and 1, respectively.  This choice of values makes a Z-coordinate of 0 especially appropriate for this projection.

* `left`, `right`, `bottom`, `top` - Same as in `mat4ortho`.

**`H3DU.Math.mat4orthoAspect(left, right, bottom, top, near, far, aspect)`**

This method returns a 4x4 matrix that adjusts the coordinate system for an orthographic projection,
such that the resulting view isn't stretched
or squished in case the view volume's aspect ratio and the scene's aspect ratio are different.
  The resulting matrix can be passed
to the `setProjectionMatrix` method of the `H3DU.Batch3D` class.

* `left`, `right`, `bottom`, `top`, `near`, `far` - Same as in `setOrtho`.
* `aspect` - Aspect ratio of the viewport.  May be omitted, in which case the scene's
aspect ratio (`scene.getClientAspect()`) is used.

**`batch3d.orthoAspect(left, right, bottom, top, near, far)`**

This method of the `H3DU.Batch3D` class sets the projection matrix to an orthographic
projection like in `mat4orthoAspect`. The aspect ratio used when calculating the matrix
adapts automatically to the `H3DU.Scene3D` in which
the `Batch3D` is rendered, and the method's six parameters are the same as in `mat4orthoAspect`.

### Other Projections <a id=Other_Projections></a>

There are other kinds of possible projections, such as oblique projections
or isometric projections.  For these
and other projections, you can specify a custom projection matrix using the
[`setProjectionMatrix()`](http://peteroupc.github.io/html3dutil/H3DU.Batch3D.html#.setProjectionMatrix)
method.

**`batch3d.setProjectionMatrix(matrix)`**

This method allows you to set the projection matrix to an arbitrary [4x4 matrix]{@tutorial glmath}.

* `matrix` - The 4x4 matrix to use.

## View Transform <a id=View_Transform></a>

The view matrix transforms _world space_ coordinates, shared by every object in a scene, to coordinates in _camera space_
(also called _eye space_ or _view space_), in which the "camera" is located at the center of the coordinate system: (0, 0, 0).  A view matrix essentially rotates the camera and moves it to a given position in world space.  Specifically:

* The camera is rotated to point at a certain object or location on the scene.  This is represented by
the `lookingAt` parameter in the `setLookAt()` method, below.
* The camera is placed somewhere on the scene.  This is represented by
the `eye` parameter in the `setLookAt()` method.  It also represents the "eye position" in the perspective
projection, above.
* The camera rolls itself, possibly turning it sideways or upside down.  This is represented by
the `up` parameter in the `setLookAt()` method.  Turning the camera upside down, for example, will swap
the placement of the top and bottom clipping planes, thus inverting the view of the scene.

The `setLookAt()` and `setViewMatrix()` methods are described below.

**`batch3d.setLookAt(eye, lookingAt, up)`**

This method allows you to set a view matrix based on the camera's position and view.

* `eye` - Array of three elements (X, Y, Z) giving the position of the camera in world space.
* `lookingAt` - Array of three elements (X, Y, Z) giving the position the camera is looking at in world space.
This is optional.  The default is [0, 0, 0].
* `up` - Array of three elements (X, Y, Z) giving the vector from the center of the camera to the top.
This is optional.  The default is [0, 1, 0].

**`batch3d.setViewMatrix(matrix)`**

This method allows you to set the view matrix to an arbitrary [4x4 matrix]{@tutorial glmath}.

* `matrix` - The 4x4 matrix to use.

## Vertex Coordinates in the Graphics System <a id=Vertex_Coordinates_in_the_Graphics_System></a>

The concepts of _eye space_, _camera space_, and _world space_, as well as
the use of matrices related to them, such as _projection_, _view_, _model-view_,
and _world_ matrices, are merely conventions,
which exist for convenience in the HTML 3D Library and many other 3D graphics libraries.

When the graphics pipeline (outside of the HTML 3D Library) draws a triangle, line or point,
all it really expects is the location of that primitive's vertices in _clip space_.  A
so-called _vertex shader_  communicates those locations to the graphics pipeline using
the input it's given.  Although the vertex shader can use projection, view, and world
matrices to help the pipeline find a vertex's clip space coordinates, it doesn't have to,
and can use a different paradigm for this purpose.  For example, the vertex shader can
be passed vertex coordinates that are already in clip space and just output those coordinates
without transforming them.

As the name suggests, clip space coordinates are used for clipping primitives to the
screen. Each clip space vertex is in _homogeneous coordinates_, consisting of an
X, Y, Z, and W coordinate, where the X, Y, and Z are premultiplied by the W.  The
perspective matrix returned by {@link H3DU.Math.mat4perspective}, for example,
transforms W to the negative Z coordinate in eye space.

To take perspective into account, the clip space X, Y, and Z coordinates are
divided by the clip space W, and then converted to _window coordinates_,
which correspond roughly to the location of the triangle or other primitive
on the screen or frame buffer (off-screen buffer).  The window coordinates
will have the same range as the current _viewport_. A viewport is a rectangle
whose size and position are generally expressed in pixels; to set the viewport's
size, call the [`setDimensions` method of `Scene3D`]{@link H3DU.Scene3D#setDimensions}.

## Other Pages <a id=Other_Pages></a>

The following pages of mine on CodeProject also discuss this library:

* [_Public-Domain HTML 3D Library_](http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library)
* [_Creating shapes using the Public Domain HTML 3D Library_](http://www.codeproject.com/Tips/987914/Creating-shapes-using-the-Public-Domain-HTML-D-Lib)
