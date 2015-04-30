## The "Camera" and the Projection and View Transforms

The `Scene3D` class has a concept of a "projection transform" and a "view transform". If we use the concept of a "camera", the projection is like setting the camera's focus and lens, and the view transform is like setting its position and orientation. `Scene3D` has methods for setting all these attributes of this abstract "camera". Two of them are `setPerspective()` and `setLookAt(), which are shown in the example below.

  // Set the perspective view.  Camera has a 45-degree field of view
  // and will see objects from 0.1 to 100 units away.
  scene.setPerspective(45,scene.getAspect(),0.1,100);
  // Move the camera back 40 units.
  scene.setLookAt([0,0,40]);
  // Move the camera back 30 units instead, and turn it so it
  // points at (0, 2, 0), that is, up 2 units.
  scene.setLookAt([0,0,30], [0,2,0]);

In 3D graphics, the two most commonly used projections are the perspective projection and the orthographic projection.  Both are described in detail below.

### Perspective Projection

A perspective projection gives the 3D scene a sense of depth.  In this projection, closer objects look bigger than more distant objects with the same size.  The `Scene3D` class's `setPerspective()` method defines a perspective projection.

### Orthographic Projection

In an orthographic projection, objects with the same size don't vary in size with their depth.  The `Scene3D` class's `setOrtho()` and `setOrthoAspect()` methods define an orthographic projection.
