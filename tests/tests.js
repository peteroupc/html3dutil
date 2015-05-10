// Adapted from public domain Mozilla unit tests

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
function is(a,b,c){
 if(a==b){
  info("expected "+b+", got "+a)
  clog(b)
 }
}

function isApprox(num1, num2, delta) {
  if (Math.abs(num1 - num2) > (delta || EPSILON)) {
    info("isApprox expected " + num1 + ", got " + num2 + " instead.");
    return false;
  }
  return true;
}

function isApproxVec(vec1, vec2, delta) {
  vec1 = Array.prototype.slice.call(vec1);
  vec2 = Array.prototype.slice.call(vec2);

  if (vec1.length !== vec2.length) {
    return false;
  }
  for (var i = 0, len = vec1.length; i < len; i++) {
    if (!isApprox(vec1[i], vec2[i], delta)) {
      info("isApproxVec expected [" + vec1 + "], got [" + vec2 + "] instead.");
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
      info("isEqualVec expected [" + vec1 + "], got [" + vec2 + "] instead.");
      return false;
    }
  }
  return true;
}
function test(){
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
}