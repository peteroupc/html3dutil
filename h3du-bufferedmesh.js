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
 * A geometric mesh in the form of buffer objects.
 * @deprecated This class is likely to become a private class.
 * Use the {@link H3DU.MeshBuffer} class instead, which is not coupled to WebGL
 * contexts.
 * @class
 * @alias H3DU.BufferedMesh
 * @param {H3DU.Mesh|H3DU.MeshBuffer} mesh
 * A geometric mesh object. Cannot be null.
 * @param {WebGLRenderingContext|object} context A WebGL context to
 * create a buffer from, or an object, such as H3DU.Scene3D, that
 * implements a no-argument <code>getContext</code> method
 * that returns a WebGL context. (Note that this constructor uses
 * a WebGL context rather than a shader program because
 * buffer objects are not specific to shader programs.)
 */
H3DU.BufferedMesh = function(mesh, context) {
  "use strict";
  context = context.getContext ? context.getContext() : context;
  if(mesh instanceof H3DU.MeshBuffer) {
    this._bounds = mesh._bounds;
  } else {
    this._bounds = mesh.getBoundingBox();
  }
  this._initialize(mesh, context);
};
/** @private */
H3DU.BufferedMesh.prototype._initialize = function(mesh, context) {
  "use strict";
  if(mesh === null || typeof mesh === "undefined")throw new Error("mesh is null");
  var smb = mesh instanceof H3DU.MeshBuffer ? mesh :
   new H3DU.MeshBuffer(mesh);
  this.arrayObjectExt = context.getExtension("OES_vertex_array_object");
  this.arrayObjectExtContext = context;
  this.smb = smb;
  this.vertsMap = new H3DU.BufferedMesh._Map();
  this.indices = context.createBuffer();
  if(typeof this.indices === "undefined" || this.indices === null)throw new Error("can't create face buffer");
  this.vao = null;
  if(this.arrayObjectExt) {
    this.vao = this.arrayObjectExt.createVertexArrayOES();
  }
  var attribs = smb._getAttributes();
  for(var i = 0;i < attribs.length;i++) {
    var vb = attribs[i][2];
    if(vb) {
      if(!this.vertsMap.get(vb)) {
       // Vertex array not seen yet, create a buffer object
       // and copy the array's data to that object
        var vbuffer = context.createBuffer();
        if(vbuffer === null || typeof vbuffer === "undefined") {
          throw new Error("can't create buffer");
        }
        context.bindBuffer(context.ARRAY_BUFFER, vbuffer);
        context.bufferData(context.ARRAY_BUFFER,
       vb, context.STATIC_DRAW);
        this.vertsMap.put(vb, vbuffer);
      }
    }
  }
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    smb.indices, context.STATIC_DRAW);
  var type = context.UNSIGNED_SHORT;
  if(smb.indexBufferSize === 4) {
    type = context.UNSIGNED_INT;
  } else if(smb.indexBufferSize === 1) {
    type = context.UNSIGNED_BYTE;
  }
  this.type = type;
  this.context = context;
  this._lastKnownProgram = null;
  this._attribLocations = [];
  this._attribNames = [];
};
/** @private */
H3DU.BufferedMesh.prototype._toMeshBuffer = function() {
  "use strict";
  return this.smb;
};
/** @private */
H3DU.BufferedMesh.prototype._getVaoExtension = function(context) {
  "use strict";
  if(this.arrayObjectExtContext === context) {
    return this.arrayObjectExt;
  } else {
    return context.getExtension("OES_vertex_array_object");
  }
};
/** @private */
H3DU.BufferedMesh.prototype._getBounds = function() {
  "use strict";
  return this._bounds;
};
/**
 * Returns the WebGL context associated with this object.
 * @deprecated
 * @returns {WebGLRenderingContext} Return value.
 * @memberof! H3DU.BufferedMesh#
 */
H3DU.BufferedMesh.prototype.getContext = function() {
  "use strict";
  return this.context;
};
/** @private */
H3DU.BufferedMesh.prototype.getFormat = function() {
  "use strict";
  return this.smb.format;
};

/**
 * Deletes the vertex and index buffers associated with this object.
 * @memberof! H3DU.BufferedMesh#
 * @returns {Object} Return value.
 */
H3DU.BufferedMesh.prototype.dispose = function() {
  "use strict";
  if(typeof this.vertsMap !== "undefined" && this.vertsMap !== null) {
    var verts = this.vertsMap.values();
    for(var i = 0;i < verts.length;i++) {
      verts[i].dispose();
    }
  }
  if(typeof this.indices !== "undefined" && this.indices !== null)
    this.context.deleteBuffer(this.indices);
  if(typeof this.vao !== "undefined" && this.vao !== null) {
    this.arrayObjectExt.deleteVertexArrayOES(this.vao);
  }
  this.vertsMap = null;
  this.indices = null;
  this.smb = null;
  this.vao = null;
  this._lastKnownProgram = null;
  this._attribLocations = [];
  this._attribNames = [];
};

/** @private */
H3DU.BufferedMesh.prototype._getAttribLocations = function(program) {
  "use strict";
  if(this._lastKnownProgram !== program) {
    this._lastKnownProgram = program;
    var attrs = this.smb._getAttributes();
    this._attribLocations = [];
    for(var i = 0;i < attrs.length;i++) {
      var arrLoc = [];
      var arrName = [];
      program._addNamesWithSemantic(arrName, attrs[i][0], attrs[i][5]);
      for(var j = 0;j < arrName.length;j++) {
        var loc = program.get(arrName[j]);
        if(loc === null || typeof loc === "undefined") {
          loc = -1;
        }
        arrLoc.push(loc);
      }
      this._attribLocations[i] = arrLoc;
      this._attribNames[i] = arrName;
    }
    return true;
  }
  return false;
};

/** @private */
H3DU.BufferedMesh.prototype._prepareDraw = function(program, context) {
  "use strict";
  var rebind = this._getAttribLocations(program, context);
  var vaoExt = this._getVaoExtension(context);
  if(this.vao) {
    vaoExt.bindVertexArrayOES(this.vao);
  } else {
    rebind = true;
  }
  if(rebind) {
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
    var attrs = this.smb._getAttributes();
    var attrNamesEnabled = [];
    for(var i = 0;i < this._attribLocations.length;i++) {
      for(var j = 0;j < this._attribLocations[i].length;j++) {
        var attrib = this._attribLocations[i][j];
        if(attrib >= 0) {
          var vertBuffer = this.vertsMap.get(attrs[i][2]);
          context.bindBuffer(context.ARRAY_BUFFER, vertBuffer);
          context.enableVertexAttribArray(attrib);
          context.vertexAttribPointer(attrib, attrs[i][3],
         context.FLOAT, false, attrs[i][4] * 4, attrs[i][1] * 4);
          attrNamesEnabled.push(this._attribNames[i][j]);
        }
      }
    }
    program._disableOthers(attrNamesEnabled);
  }
};
/**
 * Binds the buffers in this object to attributes according
 * to their data format, and draws the elements in this mesh
 * according to the data in its buffers.
 * @deprecated
 * @param {H3DU.ShaderProgram} program A shader program object to get
 * the IDs from for attributes named "position", "normal",
 * "colorAttr", and "uv", and the "useColorAttr" uniform.
 * @memberof! H3DU.BufferedMesh#
 * @returns {Object} Return value.
 */
H3DU.BufferedMesh.prototype.draw = function(program) {
  "use strict";
  // Binding phase
  var context = program.getContext();
  if(this.vertsMap === null || this.face === null) {
    throw new Error("mesh buffer disposed");
  }
  if(context !== this.context) {
    throw new Error("can't bind mesh: context mismatch");
  }
  this._prepareDraw(program, context);
  // Drawing phase
  var primitive = context.TRIANGLES;
  if((this.smb.format & H3DU.Mesh.LINES_BIT) !== 0) {
    primitive = context.LINES;
  }
  if((this.smb.format & H3DU.Mesh.POINTS_BIT) !== 0) {
    primitive = context.POINTS;
  }
  context.drawElements(primitive,
    this.smb.indices.length,
    this.type, 0);
  var vaoExt = this._getVaoExtension(context);
  if(this.vao) {
    vaoExt.bindVertexArrayOES(null);
  }
};
/**
 * Gets the number of vertices composed by all shapes in this mesh.
 * @returns {Number} Return value.
 * @memberof! H3DU.BufferedMesh#
 */
H3DU.BufferedMesh.prototype.vertexCount = function() {
  "use strict";
  return this.smb.numVertices;
};
/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this mesh.
 * @returns {Number} Return value.
 * @memberof! H3DU.BufferedMesh#
 */
H3DU.BufferedMesh.prototype.primitiveCount = function() {
  "use strict";
  return this.smb.primitiveCount();
};

/** @private */
H3DU.BufferedMesh._Map = function() {
  "use strict";
  this.map = [];
};
/** @private */
H3DU.BufferedMesh._Map.prototype.get = function(o) {
  "use strict";
  for(var i = 0;i < this.map.length;i++) {
    if(this.map[i][0] === o)return this.map[i][1];
  }
  return null;
};
/** @private */
H3DU.BufferedMesh._Map.prototype.put = function(k, v) {
  "use strict";
  for(var i = 0;i < this.map.length;i++) {
    if(this.map[i][0] === k) {
      this.map[i][1] = v;
      return;
    }
  }
  this.map.push([k, v]);
};
/** @private */
H3DU.BufferedMesh._Map.prototype.values = function() {
  "use strict";
  var ret = [];
  for(var i = 0;i < this.map.length;i++) {
    ret.push(this.map[i][1]);
  }
  return ret;
};

/** @private */
H3DU.BufferedMesh._MeshLoader = function() {
  "use strict";
  this.meshes = [];
};
/** @private */
H3DU.BufferedMesh._MeshLoader.prototype.draw = function(meshBuffer, prog) {
  "use strict";
  if(!(meshBuffer instanceof H3DU.MeshBuffer)) {
    throw new Error("Expected H3DU.MeshBuffer");
  }
  var context = prog.getContext();
  for(var i = 0;i < this.meshes.length;i++) {
    var m = this.meshes[i];
    if(m[0] === meshBuffer && m[1] === context) {
      m[2].draw(prog);
      return;
    }
  }
  var bm = new H3DU.BufferedMesh(meshBuffer, prog);
  this.meshes.push([meshBuffer, context, bm]);
  bm.draw(prog);
};
/** @private */
H3DU.BufferedMesh._MeshLoader.prototype.dispose = function() {
  "use strict";
  for(var i = 0;i < this.meshes.length;i++) {
    this.meshes[i][2].dispose();
  }
  this.meshes = [];
};
