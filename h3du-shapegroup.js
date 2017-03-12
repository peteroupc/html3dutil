/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */
/**
 * Represents a grouping of shapes. This object
 * can hold both {@link H3DU.Shape} objects and
 * other {@link H3DU.ShapeGroup} objects.
 * @constructor
 * @memberof H3DU
 */
export var ShapeGroup = function() {
  this._init();
};
/** @ignore */
ShapeGroup.prototype._init = function() {
 /** List of shapes contained in this group.
  * This property should only be used to access properties
  * and call methods on each shape, and not to add, remove
  * or replace shapes directly.
  * @deprecated Use the {@link H3DU.ShapeGroup#shapeCount},
  * {@link H3DU.ShapeGroup#getShape}, and
  * {@link H3DU.ShapeGroup#setShape} methods instead.
  * @readonly
  */
  this.shapes = [];
  this.parent = null;
  this.visible = true;
  this.transform = new H3DU.Transform();
};
/**
 * Returns the number of shapes and/or shape groups that
 * are direct children of this shape group.
 * @returns {number} Return value.
 */
ShapeGroup.prototype.shapeCount = function() {
  return this.shapes.length;
};
/**
 * Gets the shape or shape group located
 * in this shape group at the given index.
 * @param {number} index Integer index, starting from 0, of the shape or shape group to set.
 * @returns {H3DU.Shape|H3DU.ShapeGroup} The shape or shape group located
 * in this shape group at the given index, or null if none is found there.
 */
ShapeGroup.prototype.getShape = function(index) {
  return typeof this.shapes[index] === "undefined" ? null : this.shapes[index];
};
/**
 * Sets a shape or shape group at the given index in this shape group.
 * @param {number} index Integer index, starting from 0, to set the shape or shape group at.
 * @param {H3DU.Shape|H3DU.ShapeGroup} shape Shape object to set at the given index.
 * @returns {H3DU.ShapeGroup} This object.
 */
ShapeGroup.prototype.setShape = function(index, shape) {
  this.shapes[index] = shape;
  return this;
};

/**
 * Makes a copy of this shape group and the objects contained
 * in it. The copied object will
 * will have its own version of the transform and
 * visibility flag, and any objects contained in this one
 * will be copied using their <code>copy()</code> method.
 * The copied shape group won't have a parent.
 * @returns {H3DU.ShapeGroup} A copy of this shape group.
 */
ShapeGroup.prototype.copy = function() {
  var ret = new H3DU.ShapeGroup();
  ret.visible = this.visible;
  ret.transform = this.transform.copy();
  for(var i = 0; i < this.shapes.length; i++) {
    ret.addShape(this.shapes[i].copy());
  }
  return ret;
};

/**
 * Adds a 3D shape to this shape group, at the end of the list
 * of shapes. Its reference, not a copy,
 * will be stored in the list of shapes.
 * @param {H3DU.Shape|H3DU.ShapeGroup} shape A 3D shape.
 * Throws an error if null.
 * @returns {H3DU.ShapeGroup} This object.
 */
ShapeGroup.prototype.addShape = function(shape) {
  if(!shape)throw new Error();
  shape.parent = this;
  this.shapes.push(shape);
  return this;
};
/**
 * Sets whether this shape group will be drawn on rendering.
 * @param {Boolean} value True if this shape group will be visible; otherwise, false.
 * @returns {H3DU.ShapeGroup} This object.
 */
ShapeGroup.prototype.setVisible = function(value) {
  this.visible = !!value;
  return this;
};
/**
 * Gets whether this shape group will be drawn on rendering.
 * @returns {boolean} value True if this shape group will be visible; otherwise, false.
 */
ShapeGroup.prototype.getVisible = function() {
  return this.visible;
};
/**
 * Gets a reference to the transform used by this shape group object.
 * @returns {H3DU.Transform} Return value.
 */
ShapeGroup.prototype.getTransform = function() {
  return this.transform;
};
/**
 * Gets a copy of the transformation needed to transform
 * this shape group's coordinates to world coordinates.
 * @returns {H3DU.Transform} A 4x4 matrix.
 */
ShapeGroup.prototype.getMatrix = function() {
  var xform = this.getTransform();
  var thisIdentity = xform.isIdentity();
  var mat;
  if(typeof this.parent !== "undefined" && this.parent !== null) {
    var pmat = this.parent.getMatrix();
    if(thisIdentity) {
      mat = H3DU.Math.mat4multiply(pmat, xform.getMatrix());
    } else if(H3DU.Math.mat4isIdentity(pmat)) {
      mat = xform.getMatrix();
    } else {
      mat = pmat;
    }
  } else {
    mat = xform.getMatrix();
  }
  return mat;
};
/**
 * Sets the transform used by this shape group to a copy
 * of the given transform. Child
 * shapes can set their own transforms, in which case the
 * rendering process will multiply this shape group's transform
 * with the child shape's transform as it renders the child shape.
 * @param {H3DU.Transform} transform The transform to
 * copy for the use of this shape group.
 * @returns {Object} Return value.
 */
ShapeGroup.prototype.setTransform = function(transform) {
  this.transform = transform.copy();
  return this;
};
/**
 * Sets the material used by all shapes in this shape group.
 * @param {H3DU.Material} material The material to use.
 * @returns {Object} Return value.
 */
ShapeGroup.prototype.setMaterial = function(material) {
  for(var i = 0; i < this.shapes.length; i++) {
    this.shapes[i].setMaterial(material);
  }
  return this;
};

/**
 * Sets the texture used by all shapes in this shape group.
 * @param {H3DU.Texture|String} material {@link H3DU.Texture} object, or a string with the
 * URL of the texture data. In the case of a string the texture will be loaded via
 * the JavaScript DOM's Image class. However, this method
 * will not load that image if it hasn't been loaded yet. This parameter can also
 * be a {@link H3DU.FrameBuffer} object that refers to a frame buffer; this can be useful
 * if that frame buffer refers to a shader-generated texture (see the <code>procedtexture</code>
 * demo in the HTML 3D Library to see how this is done).
 * NOTE: The default shader program assumes that the texture is in
 * the [sRGB color space]{@link H3DU.Math.colorTosRGB}.
 * @returns {Object} Return value.
 */
ShapeGroup.prototype.setTexture = function(material) {
  for(var i = 0; i < this.shapes.length; i++) {
    this.shapes[i].setTexture(material);
  }
  return this;
};
/**
 * Sets the shader program used by all shapes in this shape group.
 * @param {H3DU.ShaderInfo} material Source code for a WebGL
 * shader program. <i>Using a {@link H3DU.ShaderProgram} here
 * is deprecated.</i>
 * @returns {Object} Return value.
 */
ShapeGroup.prototype.setShader = function(material) {
  for(var i = 0; i < this.shapes.length; i++) {
    this.shapes[i].setShader(material);
  }
  return this;
};
/**
 * Removes all instances of a 3D shape from this shape group
 * @param {H3DU.Shape|H3DU.ShapeGroup} shape The 3D shape to remove.
 * @returns {H3DU.ShapeGroup} This object.
 */
ShapeGroup.prototype.removeShape = function(shape) {
  for(var i = 0; i < this.shapes.length; i++) {
    if(this.shapes[i] === shape) {
      this.shapes.splice(i, 1);
      i--;
    }
  }
  return this;
};
/**
 * Finds a bounding box that holds all vertices in this shape group.
 * The bounding box is not guaranteed to be the
 * tightest, and the box will be in world space coordinates.
 * @returns {Array<number>} An array of six numbers describing an
 * axis-aligned bounding box
 * that fits all vertices in the shape group. The first three numbers
 * are the smallest-valued X, Y, and Z coordinates, and the
 * last three are the largest-valued X, Y, and Z coordinates.
 * If the shape group has no vertices, returns the array [Inf, Inf, Inf, -Inf,
 * -Inf, -Inf].
 */
ShapeGroup.prototype.getBounds = function() {
  var inf = Number.POSITIVE_INFINITY;
  var ret = [inf, inf, inf, -inf, -inf, -inf];
  var first = true;
  for(var i = 0; i < this.shapes.length; i++) {
    var b = this.shapes[i].getBounds();
    // NOTE: The returned bounding
    if(!H3DU.Math.boxIsEmpty(b)) {
      if(first) {
        ret[0] = b[0];
        ret[1] = b[1];
        ret[2] = b[2];
        ret[3] = b[3];
        ret[4] = b[4];
        ret[5] = b[5];
        first = false;
      } else {
        ret[0] = Math.min(b[0], ret[0]);
        ret[1] = Math.min(b[1], ret[1]);
        ret[2] = Math.min(b[2], ret[2]);
        ret[3] = Math.max(b[3], ret[3]);
        ret[4] = Math.max(b[4], ret[4]);
        ret[5] = Math.max(b[5], ret[5]);
      }
    }
  }
  return ret;
};

/**
 * Gets the number of vertices composed by all shapes in this shape group.
 * @returns {number} Return value.
 */
ShapeGroup.prototype.vertexCount = function() {
  var c = 0;
  for(var i = 0; i < this.shapes.length; i++) {
    c += this.shapes[i].vertexCount();
  }
  return c;
};
/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this shape group.
 * @returns {number} Return value.
 */
ShapeGroup.prototype.primitiveCount = function() {
  var c = 0;
  for(var i = 0; i < this.shapes.length; i++) {
    c += this.shapes[i].primitiveCount();
  }
  return c;
};
/**
 * Sets the relative position of the shapes in this group
 * from their original position.
 * See {@link H3DU.Transform#setPosition}
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {number|Array<number>} x X coordinate
 * or a 3-element position array, as specified in {@link H3DU.Transform#setScale}.
 * @param {number} y Y coordinate.
 * @param {number} z Z coordinate.
 * @returns {H3DU.ShapeGroup} This object.
 */
ShapeGroup.prototype.setPosition = function(x, y, z) {
  this.transform.setPosition(x, y, z);
  return this;
};
/**
 * Sets this shape group's rotation in the form of a [quaternion]{@tutorial glmath}.
 * See {@link H3DU.Transform#setQuaternion}.
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {Array<number>} quat A four-element array describing the rotation.
 * @returns {H3DU.ShapeGroup} This object.
 */
ShapeGroup.prototype.setQuaternion = function(quat) {
  this.transform.setQuaternion(quat);
  return this;
};
/**
 * Sets the scale of this shape group relative to its original
 * size. See {@link H3DU.Transform#setScale}.
 * This method will modify this shape group's transform
 * rather than the transform for each shape in the group.
 * @param {number|Array<number>} x Scaling factor for this object's width,
 * or a 3-element scaling array, as specified in {@link H3DU.Transform#setScale}.
 * @param {number} y Scaling factor for this object's height.
 * @param {number} z Scaling factor for this object's depth.
 * @returns {H3DU.ShapeGroup} This object.
 */
ShapeGroup.prototype.setScale = function(x, y, z) {
  this.transform.setScale(x, y, z);
  return this;
};
