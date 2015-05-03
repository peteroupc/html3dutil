## The "Camera" and the Projection and View Transforms

The [`Scene3D`](http://peteroupc.github.io/html3dutil/glutil.Scene3D.html) class of the HTML 3D Library has a concept of a "projection transform" and a "view transform". If we use the concept of a "camera", the projection is like setting the camera's focus and lens, and the view transform is like setting its position and orientation. `Scene3D` has methods for setting all these attributes of this abstract "camera". Two of them are `setPerspective()` and `setLookAt()`, which are shown in the example below.

    // Set the perspective view.  Camera has a 45-degree field of view
    // and will see objects from 0.1 to 100 units away.
    scene.setPerspective(45,scene.getAspect(),0.1,100);
    // Move the camera back 40 units.
    scene.setLookAt([0,0,40]);
    // Move the camera back 30 units instead, and turn it so it
    // points at (0, 2, 0), that is, up 2 units.
    scene.setLookAt([0,0,30], [0,2,0]);

In 3D graphics, two commonly used projections are the perspective projection and the orthographic projection.  Both are described in detail below.

### Perspective Projection

A perspective projection gives the 3D scene a sense of depth.  In this projection, closer objects 
look bigger than more distant objects with the same size. 

The 3D scene is contained in a so-called _view volume_, and only objects contained in the view volume
will be visible.  The view volume is bounded on all six sides by six _clipping planes_:

* The near and far clipping planes are placed a certain distance from the camera.  For example, if
the near clipping plane is 3 units away and the far clipping plane is 5 units away, the view volume
will hold only objects between 3 and 5 units from the camera.  (Strictly speaking, a near clipping
plane is not necessary, but practically speaking it is, in order to make the math work out correctly.)
* The left, right, top, and bottom clipping planes form the other four sides of the volume.

Note further that:

* The angle extending from the eye position is the projection's _field of view_.  This is an angle
similar to the aperture of a camera.  The greater the field of view, the greater
the vertical visibility range.
* In a perspective projection, the near clipping plane segment bounding the view volume is smaller than
the far clipping plane segment.  This is because the four other clipping planes are not parallel and extend
from the eye position.

The perspective projection converts 3D coordinates to 4-element vectors in the form (X, Y, Z, W), also 
known as _clip coordinates_.  Since the graphics system (outside the HTML 3D library) only deals with 
3D points, it divides the X, Y, and Z components by the W component to get the 3D point's _normalized 
device coordinates_ and achieve the perspective effect.

The `Scene3D` class's [`setPerspective()`](http://peteroupc.github.io/html3dutil/glutil.Scene3D.html#setPerspective)
and [`setFrustum()`](http://peteroupc.github.io/html3dutil/glutil.Scene3D.html#setFrustum)
methods define a perspective projection.

**`scene3d.setPerspective(fov, aspect, near, far)`**

This method calculates the appropriate clipping planes given a field of view and an aspect ratio,
and sets the scene's projection matrix accordingly.

* `fov` - Vertical field of view, in degrees.
* `aspect` - Aspect ratio of the scene.  You should usually use `scene3d.getAspect()`.
* `near`, `far` - Distance from the camera to the near and far clipping planes.

**`scene3d.setFrustum(left, right, bottom, top, near, far)`**

This method sets the scene's projection matrix based on the location of the six clipping planes that
bound the view volume.

* `left`, `right`, `bottom`, `top` - Location of the left, right, bottom, and top clipping planes in terms
of where they meet the near clipping plane.
* `near`, `far` - Distance from the camera to the near and far clipping planes.

#### Demo

* [perspective.html](https://peteroupc.github.io/html3dutil/perspective.html) - Demonstrates a perspective projection.

### Orthographic Projection

An orthographic projection is one in which the left and right clipping planes are parallel to each other,
and the top and bottom clipping planes are parallel to each other.  This results in the near and far clipping
planes having the same size, unlike in a perspective projection, and 
objects with the same size not varying in size with their depth.

The `Scene3D` class's [`setOrtho()`](http://peteroupc.github.io/html3dutil/glutil.Scene3D.html#setOrtho)
and [`setOrthoAspect()`](http://peteroupc.github.io/html3dutil/glutil.Scene3D.html#setOrthoAspect) methods define an orthographic projection.
