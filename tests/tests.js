// Portions adapted from public domain Mozilla unit tests

var EPSILON = 0.00001
var FailedTests = 0;

function clog(x){
 if(document){
  var div=document.getElementById("log")
  if(div){
   div.innerHTML+=x+"<br>"
  } else {
   console.log(x)
  }
 } else {
  console.log(x)
 }
}

function info(x){
 clog(x)
}
function ok(a,b){
 if(!a){
  FailedTests++;
  clog(b)
 }
}
function is(a,b){
 if(a!=b){
  info("expected "+b+", got "+a)
  return false;
 }
 return true;
}

function isApprox(num1, num2, delta) {
  if (Math.abs(num1 - num2) > (delta || EPSILON)) {
    info("isApprox got " + num1 + ", expected " + num2 + " instead.");
    return false;
  }
  return true;
}

function isApproxVec(vec1, vec2, delta) {
  vec1 = Array.prototype.slice.call(vec1);
  vec2 = Array.prototype.slice.call(vec2);

  if (vec1.length !== vec2.length) {
    info("isApproxVec got [" + vec1 + "], expected [" + vec2 + "] instead.");
    return false;
  }
  for (var i = 0, len = vec1.length; i < len; i++) {
    if (!isApprox(vec1[i], vec2[i], delta)) {
      info("isApproxVec got [" + vec1 + "], expected [" + vec2 + "] instead.");
      return false;
    }
  }
  return true;
}

function isEqualVec(vec1, vec2) {
  vec1 = Array.prototype.slice.call(vec1);
  vec2 = Array.prototype.slice.call(vec2);

  if (vec1.length !== vec2.length) {
    return false;
  }
  for (var i = 0, len = vec1.length; i < len; i++) {
    if (vec1[i] !== vec2[i]) {
      info("isEqualVec got [" + vec1 + "], expected [" + vec2 + "] instead.");
      return false;
    }
  }
  return true;
}
function test(){
  var mesh=new Mesh();
  ok(isApprox(GraphicsPath._nextNumber("0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" 0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" +0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" -0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(".0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber("0.",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber("+.0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber("-.0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" 0.0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" +0.0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" +0.0E0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" 0.0E+0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" 0.0E-0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber(" 0.0E-000",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber("0.b",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber("0.E0",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber("0.nonsense",[0]),0))
  ok(isApprox(GraphicsPath._nextNumber("-0nonsense",[0]),0))
  ok(is(GraphicsPath._nextNumber("nonsense",[0]),null))
  ok(is(GraphicsPath._nextNumber(",-0nonsense",[0]),null))
  ok(is(GraphicsPath._nextNumber("-nonsense",[0]),null))
  ok(is(GraphicsPath._nextNumber("-.nonsense",[0]),null))
  ok(is(GraphicsPath._nextNumber("0.Enonsense",[0]),null))
  ok(is(GraphicsPath._nextNumber("0.E+nonsense",[0]),null))
  ok(is(GraphicsPath._nextNumber("-.",[0]),null))
  mesh.mode(Mesh.POINTS)
  .vertex3(0,1,2)
  .vertex3(1,2,3);
  ok(isApproxVec(mesh.getBoundingBox(),[0,1,2,1,2,3]),"")
  mesh.vertex3(-1,-2,-3)
  ok(isApproxVec(mesh.getBoundingBox(),[-1,-2,-3,1,2,3]),"")
  mesh.vertex3(4,5,6)
  ok(isApproxVec(mesh.getBoundingBox(),[-1,-2,-3,4,5,6]),"")
  mesh.vertex3(-0.5,4,0)
  ok(isApproxVec(mesh.getBoundingBox(),[-1,-2,-3,4,5,6]),"")
  ok(isApproxVec(GLUtil.toGLColor("#f00"), [1, 0, 0, 1]),
    "The hex2rgba() function didn't calculate the 1st rgba values correctly.");

  ok(isApproxVec(GLUtil.toGLColor("#ff0000"), [1, 0, 0, 1]),
    "The hex2rgba() function didn't calculate the 3rd rgba values correctly.");

  ok(isApproxVec(GLUtil.toGLColor("rgba(255, 0, 0, 0.5)"), [1, 0, 0, 0.5]),
    "The hex2rgba() function didn't calculate the 5th rgba values correctly.");

  ok(isApproxVec(GLUtil.toGLColor("rgb(255, 0, 0)"), [1, 0, 0, 1]),
    "The hex2rgba() function didn't calculate the 6th rgba values correctly.");

  var m1 = ([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

  var m2 = ([
    0, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);

  m1=GLMath.mat4multiply(m1, m2);
  ok(isApproxVec(m1, [
    275, 302, 329, 356, 304, 336, 368, 400,
    332, 368, 404, 440, 360, 400, 440, 480
  ]), "The mat4.multiply() function didn't set the values correctly.");
  m1=GLMath.mat4translate(m1, [1, 2, 3]);
  ok(isApproxVec(m1, [
    275, 302, 329, 356, 304, 336, 368, 400,
    332, 368, 404, 440, 2239, 2478, 2717, 2956
  ]), "The mat4.translate() function didn't set the values correctly.");

  m1=GLMath.mat4scale(m1, [1, 2, 3]);
  ok(isApproxVec(m1, [
    275, 302, 329, 356, 608, 672, 736, 800,
    996, 1104, 1212, 1320, 2239, 2478, 2717, 2956
  ]), "The mat4.scale() function didn't set the values correctly.");

  m1=GLMath.mat4rotate(0.5, [1, 1, 1]);
  ok(isApproxVec(m1, [
    210.6123046875, 230.2483367919922, 249.88438415527344, 269.5204162597656,
    809.8145751953125, 896.520751953125, 983.2268676757812,
    1069.9329833984375, 858.5731201171875, 951.23095703125,
    1043.8887939453125, 1136.5465087890625, 2239, 2478, 2717, 2956
  ]), "The mat4.rotate() function didn't set the values correctly.");

  m1=GLMath.mat4rotate(0.5,1,0,0);
  ok(isApproxVec(m1, [
    210.6123046875, 230.2483367919922, 249.88438415527344, 269.5204162597656,
    1122.301025390625, 1242.8154296875, 1363.3297119140625,
    1483.843994140625, 365.2230224609375, 404.96875, 444.71453857421875,
    484.460205078125, 2239, 2478, 2717, 2956
  ]), "The mat4.rotateX() function didn't set the values correctly.");

  m1=GLMath.mat4rotate( 0.5,0,1,0);
  ok(isApproxVec(m1, [
    9.732441902160645, 7.909564018249512, 6.086670875549316,
    4.263822555541992, 1122.301025390625, 1242.8154296875, 1363.3297119140625,
    1483.843994140625, 421.48626708984375, 465.78045654296875,
    510.0746765136719, 554.3687744140625, 2239, 2478, 2717, 2956
  ]), "The mat4.rotateY() function didn't set the values correctly.");

  m1=GLMath.mat4rotate(0.5,0,0,1);
  ok(isApproxVec(m1, [
    546.6007690429688, 602.7787475585938, 658.9566650390625, 715.1345825195312,
    980.245849609375, 1086.881103515625, 1193.5162353515625,
    1300.1514892578125, 421.48626708984375, 465.78045654296875,
    510.0746765136719, 554.3687744140625, 2239, 2478, 2717, 2956
  ]), "The mat4.rotateZ() function didn't set the values correctly.");

  var m3 = GLMath.mat4frustum(0, 100, 200, 0, 0.1, 100);
  ok(isApproxVec(m3, [
    0.0020000000949949026, 0, 0, 0, 0, -0.0010000000474974513, 0, 0, 1, -1,
    -1.0020020008087158, -1, 0, 0, -0.20020020008087158, 0
  ]), "The mat4.frustum() function didn't compute the values correctly.");

  var m4 = GLMath.mat4perspective(45, 1.6, 0.1, 100);
  ok(isApproxVec(m4, [1.5088834762573242, 0, 0, 0, 0, 2.4142136573791504, 0,
    0, 0, 0, -1.0020020008087158, -1, 0, 0, -0.20020020008087158, 0
  ]), "The mat4.frustum() function didn't compute the values correctly.");

  var m5 = GLMath.mat4ortho(0, 100, 200, 0, -1, 1);
  ok(isApproxVec(m5, [
    0.019999999552965164, 0, 0, 0, 0, -0.009999999776482582, 0, 0,
    0, 0, -1, 0, -1, 1, 0, 1
  ]), "The mat4.ortho() function didn't compute the values correctly.");

  var m6 = GLMath.mat4lookat([1, 2, 3], [4, 5, 6], [0, 1, 0]);
  ok(isApproxVec(m6, [
    -0.7071067690849304, -0.40824830532073975, -0.5773502588272095, 0, 0,
    0.8164966106414795, -0.5773502588272095, 0, 0.7071067690849304,
    -0.40824830532073975, -0.5773502588272095, 0, -1.4142135381698608, 0,
    3.464101552963257, 1
  ]), "The mat4.lookAt() function didn't compute the values correctly.");
var curve=new BSplineCurve([[73,5,63],[53,62,79],[51,20,4],[22,0,73],[85,31,29],[15,55,8],[85,63,80],[83,14,57],[8,94,38],[81,1,29]],[0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
ok(isApproxVec([56,45.5,63.83333333333334],curve.evaluate(0)),"Point at 0 is not correct.");
ok(isApproxVec([50.1375,33.41216666666666,34.32249999999999],curve.evaluate(0.1)),"Point at 0.1 is not correct.");
ok(isApproxVec([39.409333333333336,13.335999999999991,35.57866666666668],curve.evaluate(0.2)),"Point at 0.2 is not correct.");
ok(isApproxVec([39.455833333333324,9.29533333333333,54.87433333333334],curve.evaluate(0.3)),"Point at 0.3 is not correct.");
ok(isApproxVec([61.173333333333346,24.270666666666685,39.61199999999998],curve.evaluate(0.4)),"Point at 0.4 is not correct.");
ok(isApproxVec([50.14583333333333,42.520833333333336,20.916666666666664],curve.evaluate(0.5)),"Point at 0.5 is not correct.");
ok(isApproxVec([40.85066666666667,55.15866666666667,30.20933333333334],curve.evaluate(0.6)),"Point at 0.6 is not correct.");
ok(isApproxVec([69.27533333333331,55.27183333333334,61.27299999999998],curve.evaluate(0.7)),"Point at 0.7 is not correct.");
ok(isApproxVec([80.404,37.63599999999997,65.33066666666664],curve.evaluate(0.8)),"Point at 0.8 is not correct.");
ok(isApproxVec([56.9928333333333,44.59600000000003,51.573666666666654],curve.evaluate(0.9)),"Point at 0.9 is not correct.");
ok(isApproxVec([32.66666666666667,65.16666666666667,39.66666666666667],curve.evaluate(1)),"Point at 1 is not correct.");
var curve=new BSplineCurve([[73,5,63],[53,62,79],[51,20,4],[22,0,73],[85,31,29],[15,55,8],[85,63,80],[83,14,57],[8,94,38],[81,1,29]],[0,0,0,0,0.14285714285714285,0.2857142857142857,0.42857142857142855,0.5714285714285714,0.7142857142857143,0.8571428571428571,1,1,1,1]);
ok(isApproxVec([73,5,63],curve.evaluate(0)),"Point at 0 is not correct.");
ok(isApproxVec([50.92666666666666,39.25216666666667,46.68124999999999],curve.evaluate(0.1)),"Point at 0.1 is not correct.");
ok(isApproxVec([39.44533333333333,14.091999999999997,36.92866666666667],curve.evaluate(0.2)),"Point at 0.2 is not correct.");
ok(isApproxVec([39.45583333333334,9.295333333333332,54.874333333333325],curve.evaluate(0.3)),"Point at 0.3 is not correct.");
ok(isApproxVec([61.17333333333333,24.270666666666674,39.61199999999999],curve.evaluate(0.4)),"Point at 0.4 is not correct.");
ok(isApproxVec([50.14583333333333,42.52083333333334,20.916666666666664],curve.evaluate(0.5)),"Point at 0.5 is not correct.");
ok(isApproxVec([40.85066666666667,55.15866666666667,30.209333333333333],curve.evaluate(0.6)),"Point at 0.6 is not correct.");
ok(isApproxVec([69.27533333333332,55.271833333333326,61.272999999999996],curve.evaluate(0.7)),"Point at 0.7 is not correct.");
ok(isApproxVec([79.054,39.07599999999999,64.98866666666667],curve.evaluate(0.8)),"Point at 0.8 is not correct.");
ok(isApproxVec([45.91658333333332,56.070166666666665,48.14908333333333],curve.evaluate(0.9)),"Point at 0.9 is not correct.");
ok(isApproxVec([81,1,29],curve.evaluate(1)),"Point at 1 is not correct.");
var curve=new BSplineCurve([[95,22,18,0.62],[52,19,31,0.98],[30,10,47,0.77],[3,90,43,0.08],[63,11,53,0.85],[86,93,94,0.96],[65,99,57,0.46],[25,73,97,0.86],[74,60,36,0.79],[76,79,19,0.74]],[0,1,2,3,4,5,6,7,8,9,10,11,12,13],BSplineCurve.WEIGHTED_BIT);
ok(isApproxVec([53.83050847457627,18.045197740112997,31.802259887005643,0.9075141242937852],curve.evaluate(0)),"Point at 0 is not correct.");
ok(isApproxVec([39.420162433556044,14.321542060245289,40.07784398823571,0.8547808516864986],curve.evaluate(0.1)),"Point at 0.1 is not correct.");
ok(isApproxVec([30.364985645414666,16.05422241482044,45.69432858458372,0.7400270841232869],curve.evaluate(0.2)),"Point at 0.2 is not correct.");
ok(isApproxVec([44.3388925451717,23.183972518048744,49.76766981771769,0.7065625623230026],curve.evaluate(0.3)),"Point at 0.3 is not correct.");
ok(isApproxVec([63.76910768463488,24.252046880844535,57.8726569967998,0.8367786043805328],curve.evaluate(0.4)),"Point at 0.4 is not correct.");
ok(isApproxVec([74.95067583590232,55.044581456011386,74.49205596395542,0.9018804837562248],curve.evaluate(0.5)),"Point at 0.5 is not correct.");
ok(isApproxVec([80.47717760274197,86.58520910918499,84.38318557822234,0.8696496720825231],curve.evaluate(0.6)),"Point at 0.6 is not correct.");
ok(isApproxVec([65.45028246610812,92.5355067568477,76.43464791992443,0.6990175992937675],curve.evaluate(0.7)),"Point at 0.7 is not correct.");
ok(isApproxVec([38.92860580162072,79.92165694596828,83.43612250004813,0.7484543127177533],curve.evaluate(0.8)),"Point at 0.8 is not correct.");
ok(isApproxVec([43.09755752226919,69.4640461450384,74.72805248156801,0.8228526490100199],curve.evaluate(0.9)),"Point at 0.9 is not correct.");
ok(isApproxVec([65.45798319327731,65.30252100840337,44.378151260504204,0.794873949579832],curve.evaluate(1)),"Point at 1 is not correct.");
var curve=new BezierCurve([[32,4,71],[40,29,57],[87,34,9],[26,25,64]]);
ok(isApproxVec([32,4,71],curve.evaluate(0)),"Point at 0 is not correct.");
ok(isApproxVec([35.423,10.906,65.917],curve.evaluate(0.1)),"Point at 0.1 is not correct.");
ok(isApproxVec([40.30400000000001,16.648000000000003,59.61600000000001],curve.evaluate(0.2)),"Point at 0.2 is not correct.");
ok(isApproxVec([45.760999999999996,21.261999999999993,52.919],curve.evaluate(0.3)),"Point at 0.3 is not correct.");
ok(isApproxVec([50.912,24.784,46.647999999999996],curve.evaluate(0.4)),"Point at 0.4 is not correct.");
ok(isApproxVec([54.875,27.25,41.625],curve.evaluate(0.5)),"Point at 0.5 is not correct.");
ok(isApproxVec([56.767999999999994,28.695999999999998,38.672],curve.evaluate(0.6)),"Point at 0.6 is not correct.");
ok(isApproxVec([55.70900000000001,29.158,38.611000000000004],curve.evaluate(0.7)),"Point at 0.7 is not correct.");
ok(isApproxVec([50.815999999999995,28.671999999999997,42.264],curve.evaluate(0.8)),"Point at 0.8 is not correct.");
ok(isApproxVec([41.207,27.273999999999997,50.453],curve.evaluate(0.9)),"Point at 0.9 is not correct.");
ok(isApproxVec([26,25,64],curve.evaluate(1)),"Point at 1 is not correct.");
var curve=new BSplineCurve([[79,62,32],[21,3,72],[80,41,57],[0,13,23]],[0,0,0,0,1,1,1,1]);
ok(isApproxVec([79,62,32],curve.evaluate(0)),"Point at 0 is not correct.");
ok(isApproxVec([64.85400000000001,47.047000000000004,42.386],curve.evaluate(0.1)),"Point at 0.1 is not correct.");
ok(isApproxVec([56.192000000000014,36.93600000000001,49.688],curve.evaluate(0.2)),"Point at 0.2 is not correct.");
ok(isApproxVec([51.477999999999994,30.68899999999999,54.12199999999999],curve.evaluate(0.3)),"Point at 0.3 is not correct.");
ok(isApproxVec([49.176,27.328000000000003,55.903999999999996],curve.evaluate(0.4)),"Point at 0.4 is not correct.");
ok(isApproxVec([47.75,25.875,55.25],curve.evaluate(0.5)),"Point at 0.5 is not correct.");
ok(isApproxVec([45.664,25.352000000000004,52.376000000000005],curve.evaluate(0.6)),"Point at 0.6 is not correct.");
ok(isApproxVec([41.382000000000005,24.781,47.498000000000005],curve.evaluate(0.7)),"Point at 0.7 is not correct.");
ok(isApproxVec([33.367999999999995,23.184,40.831999999999994],curve.evaluate(0.8)),"Point at 0.8 is not correct.");
ok(isApproxVec([20.085999999999995,19.582999999999995,32.593999999999994],curve.evaluate(0.9)),"Point at 0.9 is not correct.");
ok(isApproxVec([0,13,23],curve.evaluate(1)),"Point at 1 is not correct.");

}
