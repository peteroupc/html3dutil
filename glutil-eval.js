/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
(function(global){
/** @private */
BernsteinEval._binomial=[ [1],
  [1,1],
  [1,2,1],
  [1,3,3,1],
  [1,4,6,4,1],
  [1,5,10,10,5,1],
  [1,6,15,20,15,6,1],
  [1,7,21,35,35,21,7,1],
  [1,8,28,56,70,56,28,8,1],
  [1,9,36,84,126,126,84,36,9,1],
  [1,10,45,120,210,252,210,120,45,10,1],
  [1,11,55,165,330,462,462,330,165,55,11,1],
  [1,12,66,220,495,792,924,792,495,220,66,12,1],
  [1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],
  [1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],
  [1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,
  455,105,15,1],
  [1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,
  1820,560,120,16,1],
  [1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,
  6188,2380,680,136,17,1],
  [1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,
  18564,8568,3060,816,153,18,1],
  [1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,
  50388,27132,11628,3876,969,171,19,1],
  [1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,
  125970,77520,38760,15504,4845,1140,190,20,1] ];
/** @private */
BernsteinEval._factorial=function(n) {
  var result = 1;
  for (var i = n; i > 1; i--)result *= i;
  return result;
}
/** @private */
function BernsteinEval(order){
 this.order=order;
 this.n=this.order-1;
}
/** @private */
BernsteinEval.prototype.getFactor=function(t, i){
 var bino;
 if(i==0){
  return Math.pow(1-u,this.n-i);
 } else if(i==this.n-1){
  return Math.pow(u,i)*Math.pow(1-u,this.n-i);
 } else if(this.n<BernsteinEval._binomial.length){
  var fac=Math.pow(u,i)*Math.pow(1-u,this.n-i);
  return fac * BernsteinEval._factorial(this.n) /
     (BernsteinEval._factorial(i) * BernsteinEval._factorial(this.n-i));
 } else {
  var fac=Math.pow(u,i)*Math.pow(1-u,this.n-i);
  return fac * BernsteinEval._binomial[this.n][i];
 }
}
/** @private */
BernsteinEval.prototype.getFactors=function(t, output){
 for(var i=0;i<this.order;i++){
  output[i]=this.getFactor(t, i);
 }
}
/** @private */
function BernsteinEvalSpline(controlPoints){
 this.order=controlPoints.length;
 if(this.order<=0)throw new Error("no control points")
 this.k=controlPoints[0].length;
 this.points=controlPoints;
 this.evaluator=new BernsteinEval(this.order);
}
/** @private */
BernsteinEvalSpline.prototype.evaluate=function(t, output){
 for(var i=0;i<this.k;i++){
  var value=0;
  for(var j=0;j<this.order;j++){
   value+=this.points[j][i]*this.evaluator.getFactor(t, j);
  }
  output[i]=value;
 }
}
/** @private */
function BernsteinEvalSurface(controlPoints){
 if(!this.controlPoints||this.controlPoints.length==0)
  throw new Error("no control points")
 this.uorder=controlPoints.length;
 this.torder=controlPoints[0].length;
 this.k=controlPoints[0][0].length;
 this.points=controlPoints;
 this.evaluator=new BernsteinEval(this.order);
 this.bufferT=[];
 this.bufferU=[];
}
/** @private */
BernsteinEvalSurface.prototype.evaluate=function(t, u, output){
 var bt=bufferT;
 var bu=bufferU;
 if(t==u){
  bu=bufferT;
  this.evaluator.getFactors(t, bufferT);
 } else {
  this.evaluator.getFactors(t, bufferT);
  this.evaluator.getFactors(u, bufferU);
 }
 for(var i=0;i<this.k;i++){
  var value=0;
  for(var tt=0;tt<this.torder;tt++){
   for(var uu=0;uu<this.uorder;uu++){
    value+=this.points[uu][tt][i]*bt[tt]*bu[uu];
   }
  }
  output[i]=value;
 }
}
/**
 * A parametric evaluator for B&eacute;zier curves.<p>
 * A B&eacute;zier curve is defined by a series of control points, where
 * the first and last control points define the endpoints of the curve, and
 * the remaining control points define the curve's shape, though they don't
 * necessarily cross the curve.
 * @class
 * @alias BezierCurve
 * @param {Array<Array<number>>} controlPoints An array of control points.  Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
 * curve.  For example, a degree-3 (cubic) curve
 * contains 4 control points.  A degree of 1 results in a straight line segment.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {number} [u1] Starting point for the purpose of interpolation; it will correspond to 0.
 * May be omitted; default is 0.
 * @param {number} [u2] Ending point for the purpose of interpolation; it will correspond to 1.
 * May be omitted; default is 1.
 */
function BezierCurve(cp, u1, u2){
 if(typeof u1=="undefined" && typeof u2=="undefined"){
  this.uoffset=0;
  this.umul=1;
 } else if(u1==u2){
  throw new Error("u1 and u2 can't be equal")
 } else {
  this.uoffset=u1;
  this.umul=1.0/(u2-u1);
 }
 this.evaluator=new BernsteinEvalSpline(cp);
 this.k=this.evaluator.k;
}
/**
 * Evaluates the curve function based on a point
 * in a B&eacute;zier curve.
 * @param {number} u Point on the curve to evaluate (generally within the range
 * given in the constructor).
 * @return {Array<number>} An array of the result of
 * the evaluation.  Its length will be equal to the
 * length of a control point, as specified in the constructor.
 */
BezierCurve.prototype.evaluate=function(u){
 var output=[];
 this.evaluator.evaluate((u-this.uoffset)*this.umul,output);
 return output;
}
/**
 * A parametric evaluator for B&eacute;zier surfaces.<p>
 * A B&eacute;zier surface is defined by a series of control points, where
 * the first and last control points on each corner define the endpoints of the surface, and
 * the remaining control points define the surface's shape, though they don't
 * necessarily cross the surface.
 * @class
 * @alias BezierSurface
 * @param {Array<Array<number>>} controlPoints An array of control point
 * arrays, which in turn contain a number of control points.  Each
 * control point is an array with the same length as the other control points.
 * It is assumed that:<ul>
 * <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier
 * curve along the V axis.  For example, a degree-3 (cubic) curve along the V axis
 * contains 4 control points, one in each control point array.  A degree of 1 on
 * both the U and V axes results in a flat surface.
 * <li>The length of the first control point array minus 1 represents the degree of the B&eacute;zier
 * curve along the U axis.
 * <li>The first control point's length represents the size of all the control
 * points.
 * </ul>
 * @param {number} [u1] Starting point for the purpose of interpolation along the
 * U-axis; it will correspond to 0.
 * May be omitted; default is 0.
 * @param {number} [u2] Ending point for the purpose of interpolation along the
 * U-axis; it will correspond to 1.
 * May be omitted; default is 1.
 * @param {number} [v1] Starting point for the purpose of interpolation along the
 * V-axis; it will correspond to 0.
 * May be omitted; default is 0.
 * @param {number} [v2] Ending point for the purpose of interpolation along the
 * V-axis; it will correspond to 1.
 * May be omitted; default is 1.
 */
function BezierSurface(cp, u1, u2, v1, v2){
 if(typeof u1=="undefined" && typeof u2=="undefined" &&
    typeof v1=="undefined" && typeof v2=="undefined"){
  this.uoffset=0;
  this.umul=1;
  this.voffset=0;
  this.vmul=1;
 } else if(u1==u2){
  throw new Error("u1 and u2 can't be equal")
 } else if(v1==v2){
  throw new Error("v1 and v2 can't be equal")
 } else {
  this.uoffset=u1;
  this.umul=1.0/(u2-u1);
  this.voffset=v1;
  this.vmul=1.0/(v2-v1);
 }
 this.evaluator=new BernsteinEvalSpline(cp);
 this.k=this.evaluator.k;
}
/**
 * Evaluates the surface function based on a point
 * in a B&eacute;zier surface.
 * @param {number} u U-coordinate of the surface to evaluate (generally within the range
 * given in the constructor).
 * @param {number} v V-coordinate of the surface to evaluate.
 * @return {Array<number>} An array of the result of
 * the evaluation.  Its length will be equal to the
 * length of a control point, as specified in the constructor.
 */
 BezierSurface.prototype.evaluate=function(u,v, output){
 var output=[];
 this.evaluator.evaluate((u-this.uoffset)*this.umul,
   (v-this.voffset)*this.vmul,output);
 return output;
}

/**
* An evaluator of parametric curve functions for generating
* vertex positions, normals, colors, and texture coordinates
* of a curve.
* @class
* @alias CurveEval
*/
function CurveEval(){
 this.colorCurve=null;
 this.normalCurve=null;
 this.texCoordCurve=null;
 this.vertexCurve=null;
}

/**
* Specifies a parametric curve function for generating vertex positions.
* @param {object} evaluator An object that must contain a function
* named "evaluate".  It takes the following parameters in this order:<ul>
* <li><code>u</code> - Horizontal-axis coordinate, generally from 0 to 1.
* <li><code>v</code> - Vertical-axis coordinate, generally from 0 to 1.
* </ul>
* The evaluator function returns an array of the result of the evaluation.
* @return {CurveEval} This object.
*/
CurveEval.prototype.vertex=function(evaluator){
 this.vertexCurve=evaluator;
 return this;
}
/**
* Specifies a parametric curve function for generating normals.
* @param {object} evaluator An object that must contain a function
* named "evaluate", giving 3 values as a result.  See {@link CurveEval#vertex}.
* </ul>
* @return {CurveEval} This object.
*/
CurveEval.prototype.normal=function(evaluator){
 this.normalCurve=evaluator;
 return this;
}
/**
* Specifies a parametric curve function for generating color values.
* @param {object} evaluator An object that must contain a function
* named "evaluate", giving 3 values as a result.  See {@link CurveEval#vertex}.
* </ul>
* @return {CurveEval} This object.
*/
CurveEval.prototype.color=function(evaluator){
 this.colorCurve=evaluator;
 return this;
}
/**
* Specifies a parametric curve function for generating texture coordinates.
* @param {object} evaluator An object that must contain a function
* named "evaluate", giving 2 values as a result.  See {@link CurveEval#vertex}.
* </ul>
* @return {CurveEval} This object.
*/
CurveEval.prototype.texCoord=function(evaluator){
 this.texCoordCurve=evaluator;
 return this;
}
/**
 * Specifies a B&eacute;zier curve used for generating vertex positions.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierCurve},
 * where each point is a 3-element array giving the x, y, and z coordinates of a vertex
 * position.
 * @param {number} [u1] Starting point; see {@link BezierCurve}.
 * @param {number} [u2] Ending point; see {@link BezierCurve}.
 * @return {CurveEval} This object.
 */
CurveEval.prototype.vertexBezier=function(controlPoints,u1,u2){
 this.vertexCurve=new BezierCurve(controlPoints,u1,u2);
 if(this.vertexCurve.k!=3)
   throw new Error("unsupported vertex length")
 return this;
}
/**
 * Specifies a B&eacute;zier curve used for generating normals.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierCurve},
 * where each point is a 3-element array giving the x, y, and z coordinates of a normal.
 * @param {number} [u1] Starting point; see {@link BezierCurve}.
 * @param {number} [u2] Ending point; see {@link BezierCurve}.
 * @return {CurveEval} This object.
*/
CurveEval.prototype.normalBezier=function(controlPoints,u1,u2){
 this.normalCurve=new BezierCurve(controlPoints,u1,u2);
 if(this.normalCurve.k!=3)
   throw new Error("invalid normal length")
 return this;
}
/**
 * Specifies a B&eacute;zier curve used for generating texture coordinates.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierCurve},
 * where each point is a 1- or 2-element array giving the u and v texture coordinates.
 * @param {number} [u1] Starting point; see {@link BezierCurve}.
 * @param {number} [u2] Ending point; see {@link BezierCurve}.
 * @return {CurveEval} This object.
 */
CurveEval.prototype.texCoordBezier=function(controlPoints,u1,u2){
 this.texCoordCurve=new BezierCurve(controlPoints,u1,u2);
 if(this.texCoordCurve.k!=1 && this.texCoordCurve.k!=2)
   throw new Error("unsupported texcoord length")
 return this;
}
/**
 * Specifies a B&eacute;zier curve used for generating color values.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierCurve},
 * where each point is a 3-element array giving the red, green, and blue
 * values of a color.
 * @param {number} [u1] Starting point; see {@link BezierCurve}.
 * @param {number} [u2] Ending point; see {@link BezierCurve}.
 * @return {CurveEval} This object.
 */
CurveEval.prototype.colorBezier=function(controlPoints,u1,u2){
 this.colorCurve=new BezierCurve(controlPoints,u1,u2);
 if(this.colorCurve.k!=3)
   throw new Error("unsupported color length")
 return this;
}
/**
 * Generates vertex positions and attributes based on a point
 * in a parametric curve.
 * @param {glutil.Mesh} mesh Mesh where vertex positions and attributes
 * will be generated.  When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {number} u Point of the curve to evaluate (for
 * B&eacute;zier curves, generally within the range
 * given in the <code>vectorBezier</code>, <code>normalBezier</code>,
 * <code>colorBezier</code>, and <code>texCoordBezier</code> methods).
 * @return {CurveEval} This object.
 */
CurveEval.prototype.evalOne=function(mesh,u){
 var color=null;
 var normal=null;
 var texcoord=null;
 if(this.colorCurve){
  color=this.colorCurve.evaluate(u);
 }
 if(this.texCoordCurve){
  texcoord=this.texCoordCurve.evaluate(u);
  if(texcoord.length==1)texcoord.push(0);
 }
 if(this.normalCurve){
  normal=this.normalCurve.evaluate(u);
 }
 if(this.vertexCurve){
  var oldColor=(color) ? mesh.color.slice(0,3) : null;
  var oldNormal=(normal) ? mesh.normal.slice(0,3) : null;
  var oldTexCoord=(texcoord) ? mesh.texCoord.slice(0,3) : null;
  if(color)mesh.color3(color[0],color[1],color[2]);
  if(normal)mesh.normal3(normal[0],normal[1],normal[2]);
  if(texcoord)mesh.texCoord3(texcoord[0],texcoord[1],texcoord[2]);
  var vertex=this.vertexCurve.evaluate(u);
  mesh.vertex3(vertex[0],vertex[1],vertex[2]);
  if(oldColor)mesh.color3(oldColor[0],oldColor[1],oldColor[2]);
  if(oldNormal)mesh.normal3(oldNormal[0],oldNormal[1],oldNormal[2]);
  if(oldTexCoord)mesh.texCoord3(oldTexCoord[0],oldTexCoord[1],oldTexCoord[2]);
 }
 return this;
}
/**
 * Generates vertices and attribute values that follow a parametric curve
 * function.
 * @param {glutil.Mesh} mesh A geometric mesh where the vertices will be
 * generated.
 * @param {number} [mode] If this value is Mesh.LINES, or is null
* or omitted, generates
 * a series of lines defining the curve. If this value is Mesh.POINTS,
 * generates a series of points along the curve.  For any other value,
 * this method has no effect.
 * @param {number} [n] Number of subdivisions of the curve to be drawn.
 * May be omitted; default is 24.
 * @param {number} [u1] Starting point of the curve (within the range
 * given in the <code>vector</code>, normal</code>,
 * <code>color</code>, and <code>texCoord</code> methods).
 *May be omitted; default is 0.
 * @param {number} [u2] Ending point of the curve (within the range
 * given in the <code>vector</code>, normal</code>,
 * <code>color</code>, and <code>texCoord</code> methods).
 *May be omitted; default is 1.
 * @return {CurveEval} This object.
 */
CurveEval.prototype.evalCurve=function(mesh,mode,n,u1,u2){
 if(typeof n=="undefined")n=24;
 if(n<=0)throw new Error("invalid n")
 if(typeof u1=="undefined" && typeof u2=="undefined"){
  u1=0.0;
  u2=1.0;
 }
 if(mode==null)mode=Mesh.LINES;
 var uv=(u2-u1)/n;
 if(mode==Mesh.POINTS)
  mesh.mode(Mesh.POINTS)
 else if(mode==Mesh.LINES)
  mesh.mode(Mesh.LINE_STRIP)
 else return this;
 for(var i=0; i<=n; i++){
  this.evalOne(mesh, u1+i*uv);
 }
 return this;
}
/**
* An evaluator of parametric functions for generating
* vertex positions, normals, colors, and texture coordinates
* of a surface.
* @class
* @alias SurfaceEval
*/
this.SurfaceEval=function(){
 this.colorSurface=null;
 this.normalSurface=null;
 this.texCoordSurface=null;
 this.vertexSurface=null;
 this.autoNormal=false;
}
/**
 * Sets whether this object will automatically generate
 * normals rather than use the parametric evaluator
 * specified for normal generation, if any.
 * By default, normals won't be generated automatically.
 * @param {boolean} value Either true or false.  True means normals
 * will automatically be generated; false means they won't.
 * @return {SurfaceEval} This object.
 */
SurfaceEval.prototype.setAutoNormal=function(value){
 this.autoNormal=!!value;
 return this;
}
/**
* Specifies a parametric surface function for generating vertex positions.
* @param {object} evaluator An object that must contain a function
* named "evaluate".  It takes the following parameters in this order:<ul>
* <li><code>u</code> - Horizontal-axis coordinate, generally from 0 to 1.
* <li><code>v</code> - Vertical-axis coordinate, generally from 0 to 1.
* </ul>
* The evaluator function returns an array of the result of the evaluation.
* @return {SurfaceEval} This object.
*/
SurfaceEval.prototype.vertex=function(evaluator){
 this.vertexSurface=evaluator;
 return this;
}
/**
* Specifies a parametric surface function for generating normals.
* @param {object} evaluator An object that must contain a function
* named "evaluate", giving 3 values as a result.  See {@link SurfaceEval#vertex}.
* </ul>
* @return {SurfaceEval} This object.
*/
SurfaceEval.prototype.normal=function(evaluator){
 this.normalSurface=evaluator;
 return this;
}
/**
* Specifies a parametric surface function for generating color values.
* @param {object} evaluator An object that must contain a function
* named "evaluate", giving 3 values as a result.  See {@link SurfaceEval#vertex}.
* </ul>
* @return {SurfaceEval} This object.
*/
SurfaceEval.prototype.color=function(evaluator){
 this.colorSurface=evaluator;
 return this;
}
/**
* Specifies a parametric surface function for generating texture coordinates.
* @param {object} evaluator An object that must contain a function
* named "evaluate", giving 2 values as a result.  See {@link SurfaceEvals#vertex}.
* </ul>
* @return {SurfaceEval} This object.
*/
SurfaceEval.prototype.texCoord=function(evaluator){
 this.texCoordSurface=evaluator;
 return this;
}
/**
 * Specifies a B&eacute;zier surface used for generating vertex positions.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierSurface},
 * where each point is a 3-element array giving the x, y, and z coordinates of a vertex
 * position.
 * @param {number} [u1] Starting point along the U axis; see {@link BezierSurface}.
 * @param {number} [u2] Ending point along the U axis; see {@link BezierSurface}.
 * @param {number} [v1] Starting point along the V axis; see {@link BezierSurface}.
 * @param {number} [v2] Ending point along the V axis; see {@link BezierSurface}.
 * @return {SurfaceEval} This object.
 */
SurfaceEval.prototype.vertexBezier=function(controlPoints,u1,u2,v1,v2){
 this.vertexSurface=new BezierSurface(controlPoints,u1,u2,v1,v2);
 if(this.vertexSurface.k!=3)
   throw new Error("unsupported vertex length")
 return this;
}
/**
 * Specifies a B&eacute;zier surface used for generating normals.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierSurface},
 * where each point is a 3-element array giving the x, y, and z coordinates of a normal.
 * @param {number} [u1] Starting point along the U axis; see {@link BezierSurface}.
 * @param {number} [u2] Ending point along the U axis; see {@link BezierSurface}.
 * @param {number} [v1] Starting point along the V axis; see {@link BezierSurface}.
 * @param {number} [v2] Ending point along the V axis; see {@link BezierSurface}.
 * @return {SurfaceEval} This object.
*/
SurfaceEval.prototype.normalBezier=function(controlPoints,u1,u2,v1,v2){
 this.normalSurface=new BezierSurface(controlPoints,u1,u2,v1,v2);
 if(this.normalSurface.k!=3)
   throw new Error("invalid normal length")
 return this;
}
/**
 * Specifies a B&eacute;zier surface used for generating texture coordinates.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierSurface},
 * where each point is a 1- or 2-element array giving the u and v texture coordinates.
 * @param {number} [u1] Starting point along the U axis; see {@link BezierSurface}.
 * @param {number} [u2] Ending point along the U axis; see {@link BezierSurface}.
 * @param {number} [v1] Starting point along the V axis; see {@link BezierSurface}.
 * @param {number} [v2] Ending point along the V axis; see {@link BezierSurface}.
 * @return {SurfaceEval} This object.
 */
SurfaceEval.prototype.texCoordBezier=function(controlPoints,u1,u2,v1,v2){
 this.texCoordSurface=new BezierSurface(controlPoints,u1,u2,v1,v2);
 if(this.texCoordSurface.k!=1 && this.texCoordSurface.k!=2)
   throw new Error("unsupported texcoord length")
 return this;
}
/**
 * Specifies a B&eacute;zier surface used for generating color values.
 * @param {Array<Array<number>>} controlPoints Control points as specified in {@link BezierSurface},
 * where each point is a 3-element array giving the red, green, and blue
 * values of a color.
 * @param {number} [u1] Starting point along the U axis; see {@link BezierSurface}.
 * @param {number} [u2] Ending point along the U axis; see {@link BezierSurface}.
 * @param {number} [v1] Starting point along the V axis; see {@link BezierSurface}.
 * @param {number} [v2] Ending point along the V axis; see {@link BezierSurface}.
 * @return {SurfaceEval} This object.
 */
SurfaceEval.prototype.colorBezier=function(controlPoints,u1,u2,v1,v2){
 this.colorSurface=new BezierSurface(controlPoints,u1,u2,v1,v2);
 if(this.colorSurface.k!=3)
   throw new Error("unsupported color length")
 return this;
}
/**
 * Generates vertex positions and attributes based on a point
 * in a parametric surface.
 * @param {glutil.Mesh} mesh Mesh where vertex positions and attributes
 * will be generated.  When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {number} u U-coordinate of the curve to evaluate (for
 * B&eacute;zier surfaces, generally within the range
 * given in the <code>vectorBezier</code>, <code>normalBezier</code>,
 * <code>colorBezier</code>, and <code>texCoordBezier</code> methods).
 * @param {number} v V-coordinate of the curve to evaluate.
 * @return {SurfaceEval} This object.
 */
SurfaceEval.prototype.evalOne=function(mesh,u,v){
 var color=null;
 var normal=null;
 var texcoord=null;
 if(this.colorSurface){
  color=this.colorSurface.evaluate(u,v);
 }
 if(this.texCoordSurface){
  texcoord=this.texCoordSurface.evaluate(u,v);
  if(texcoord.length==1)texcoord.push(0);
 }
 if(this.normalSurface && !this.autoNormal){
  normal=this.normalSurface.evaluate(u,v);
 }
 if(this.vertexSurface){
  var vertex;
  var oldColor=(color) ? mesh.color.slice(0,3) : null;
  var oldNormal=(normal || this.autoNormal) ? mesh.normal.slice(0,3) : null;
  var oldTexCoord=(texcoord) ? mesh.texCoord.slice(0,3) : null;
  if(color)mesh.color3(color[0],color[1],color[2]);
  vertex=this.vertexSurface.evaluate(u,v);
  if(this.autoNormal){
   var du=0.001
   var dv=0.001
   // Find the partial derivatives of u and v
   var vu=this.vertexSurface.evaluate(u+du,v);
   var vv=this.vertexSurface.evaluate(u,v+dv);
   GLMath.vec3subInPlace(vv,vertex);
   GLMath.vec3subInPlace(vu,vertex);
   // Divide by the deltas of u and v
   GLMath.vec3scaleInPlace(vu,1.0/du);
   GLMath.vec3scaleInPlace(vv,1.0/dv);
   GLMath.vec3normInPlace(vu);
   GLMath.vec3normInPlace(vv);
   if(GLMath.vec3length(vu)==0){
    // partial derivative of u is degenerate
    //console.log([vu,vv]+" u degen")
    vu=vv;
   } else if(GLMath.vec3length(vv)!=0){
    vu=GLMath.vec3cross(vu,vv);
    GLMath.vec3normInPlace(vu);
   } else {
    // partial derivative of v is degenerate
    //console.log([vu,vv]+" v degen")
   }
   mesh.normal3(vu[0],vu[1],vu[2]);
  } else if(normal){
   mesh.normal3(normal[0],normal[1],normal[2]);
  }
  if(texcoord)mesh.texCoord3(texcoord[0],texcoord[1],texcoord[2]);
  mesh.vertex3(vertex[0],vertex[1],vertex[2]);
  if(oldColor)mesh.color3(oldColor[0],oldColor[1],oldColor[2]);
  if(oldNormal)mesh.normal3(oldNormal[0],oldNormal[1],oldNormal[2]);
  if(oldTexCoord)mesh.texCoord3(oldTexCoord[0],oldTexCoord[1],oldTexCoord[2]);
 }
 return this;
}

/**
 * Generates the vertex positions and attributes of a parametric
 * surface.
 * @param {glutil.Mesh} mesh Mesh where vertex positions and attributes
 * will be generated.  When this method returns, the current color, normal,
 * and texture coordinates will be the same as they were before the method
 * started.
 * @param {number} [mode] If this value is Mesh.TRIANGLES, or is null
 * or omitted, generates a series of triangles defining the surface.  If
 * this value is Mesh.LINES, generates
 * a series of lines defining the curve. If this value is Mesh.POINTS,
 * generates a series of points along the curve.  For any other value,
 * this method has no effect.
 * @param {number} [un] Number of subdivisions along the U-axis.
 * Default is 24.
 * @param {number} [vn] Number of subdivisions along the V-axis.
 * Default is 24.
 * @param {number} [u1] Starting U-coordinate of the surface to evaluate.
 * Default is 0.
 * @param {number} [u2] Ending U-coordinate of the surface to evaluate.
 * Default is 1.
 * @param {number} [v1] Starting U-coordinate of the surface to evaluate.
 * Default is 0.
 * @param {number} [v2] Ending U-coordinate of the surface to evaluate.
 * Default is 1.
 * @return {SurfaceEval} This object.
 */
SurfaceEval.prototype.evalSurface=function(mesh,mode,un,vn,u1,u2,v1,v2){
 if(typeof un=="undefined")un=24;
 if(typeof vn=="undefined")vn=24;
 if(un<=0)throw new Error("invalid un")
 if(vn<=0)throw new Error("invalid vn")
 if(mode==null)mode=Mesh.TRIANGLES;
 if(typeof v1=="undefined" && typeof v2=="undefined"){
  v1=0.0;
  v2=1.0;
 }
 if(typeof u1=="undefined" && typeof u2=="undefined"){
  u1=0.0;
  u2=1.0;
 }
 var du=(u2-u1)/un;
 var dv=(v2-v1)/vn;
 if(mode==Mesh.TRIANGLES){
  for(var i=0;i<vn;i++){
   mesh.mode(Mesh.TRIANGLE_STRIP);
   for(var j=0;j<=un;j++){
    var jx=j*du+u1;
    this.evalOne(mesh,jx,i*dv+v1);
    this.evalOne(mesh,jx,(i+1)*dv+v1);
  }
  }
 } else if(mode==Mesh.POINTS){
  mesh.mode(Mesh.POINTS);
  for(var i=0;i<=vn;i++){
   for(var j=0;j<=un;j++){
    var jx=j*du+u1;
    this.evalOne(mesh,jx,i*dv+v1);
   }
  }
 } else if(mode==Mesh.LINES){
  for(var i=0;i<=vn;i++){
   mesh.mode(Mesh.LINE_STRIP);
   for(var j=0;j<=un;j++){
    var jx=j*du+u1;
    this.evalOne(mesh,jx,i*dv+v1);
   }
  }
  for(var i=0;i<=un;i++){
   mesh.mode(Mesh.LINE_STRIP);
   for(var j=0;j<=vn;j++){
    this.evalOne(mesh,i*du+u1,j*dv+v1);
   }
  }
 }
 return this;
}
})(this);
