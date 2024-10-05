/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/
/* global console */
// Portions adapted from public domain Mozilla unit tests

import * as H3DU from "../h3du_module.js";

const EPSILON = 0.001;
let FailedTests = 0;
function clog(x) {
  if(typeof x === "undefined")
    throw new Error();
  if(document) {
    const div = document.getElementById("log");
    if(div) {
      div.innerHTML += x + "<br>";
    } else {
      console.log(x);
    }
  } else {
    console.log(x);
  }
}

function getFailedTests() {
  return FailedTests;
}
function info(x) {
  clog(x);
}
function ok(a, b) {
  if(!a) {
    FailedTests++;
    clog(b || "");
    throw new Error();
  }
}
function is(a, b, msg) {
  if(a !== b) {
    let infomsg = "got " + b + ", expected " + a;
    if(typeof msg !== "undefined" && msg !== null)infomsg += "<br>msg=" + msg;
    info(infomsg);
    FailedTests++;
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
    info("isApproxVec got [" + vec2 + "], expected [" + vec1 + "] instead.");
    return false;
  }
  let i;
  let len;
  for (i = 0, len = vec1.length; i < len; i++) {
    if (!isApprox(vec1[i], vec2[i], delta)) {
      info("isApproxVec got [" + vec2 + "], expected [" + vec1 + "] instead.");
      return false;
    }
  }
  return true;
}

// ///////////////////////////////////////////

function valueDiff(numtan, anatan) {
  const tandiff = H3DU.MathUtil.vec3sub(numtan, anatan);
  tandiff[0] = Math.round(tandiff[0] * 10000) / 10000;
  tandiff[1] = Math.round(tandiff[1] * 10000) / 10000;
  tandiff[2] = Math.round(tandiff[2] * 10000) / 10000;
  const adiff = Math.abs(tandiff[0] + tandiff[1] + tandiff[2]) <= 0.001;
  if(!adiff) {
    clog("numtan=" + numtan + " anatan=" + anatan);
    ok(adiff);
  }
}
function numberDiff(numtan, anatan) {
  const adiff = Math.abs(numtan - anatan) <= 0.001;
  if(!adiff) {
    clog("numtan=" + numtan + " anatan=" + anatan);
    ok(adiff);
  }
}

/*
function compareWithNumericalBitangentSurface(curve) {
  const oldtan = curve.bitangent;
  if(!(typeof oldtan !== "undefined" && oldtan !== null)) {
    // Skip this test if no bitangent method is defined
    return;
  }
  let j;
  for (j = 0; j <= 100; j += 5) {
    let i;
    for (i = 0; i <= 100; i += 5) {
      // Analytical tangent
      const anatan = H3DU.SurfaceEval.findBitangent(curve, i / 100.0, j / 100.0);
      curve.bitangent = null;
      // Numerical tangent
      const numtan = H3DU.SurfaceEval.findBitangent(curve, i / 100.0, j / 100.0);
      valueDiff(numtan, anatan);
      curve.bitangent = oldtan;
    }
  }
}

function compareWithNumericalTangentSurface(curve) {
  const oldtan = curve.tangent;
  let j;
  for (j = 0; j <= 100; j += 5) {
    let i;
    for (i = 0; i <= 100; i += 5) {
      // Analytical tangent
      const anatan = H3DU.SurfaceEval.findTangent(curve, i / 100.0, j / 100.0);
      curve.tangent = null;
      // Numerical tangent
      const numtan = H3DU.SurfaceEval.findTangent(curve, i / 100.0, j / 100.0);
      valueDiff(numtan, anatan);
      curve.tangent = oldtan;
    }
  }
}
*/
function compareWithNumericalCurveValues(curve) {
  const oldtan = curve.tangent;
  let i;
  let anatan;
  let numtan;
  for (i = 0; i <= 100; i += 5) {
  // Analytical tangent
    anatan = new H3DU.Curve(curve).velocity( i / 100.0);
    curve.tangent = null;
    // Numerical tangent
    numtan = new H3DU.Curve(curve).velocity( i / 100.0);
    valueDiff(numtan, anatan);
    curve.tangent = oldtan;
  }
  let al = null;
  if(typeof curve.arcLength !== "undefined" && curve.arcLength !== null) {
    let i;
    for (i = 0; i <= 10; i++) {
      al = curve.arcLength;
      anatan = new H3DU.Curve(curve).arcLength( i / 10.0);
      curve.arcLength = null;
      numtan = new H3DU.Curve(curve).arcLength( i / 10.0);
      numberDiff(numtan, anatan);
      curve.arcLength = al;
    }
  }
  if(typeof curve.tangent !== "undefined" && curve.tangent !== null) {
    let i;
    for (i = 0; i <= 10; i++) {
      al = curve.tangent;
      anatan = new H3DU.Curve(curve).velocity( i / 10.0);
      curve.tangent = null;
      numtan = new H3DU.Curve(curve).velocity( i / 10.0);
      valueDiff(numtan, anatan);
      curve.tangent = al;
    }
  }
  if(typeof curve.accel !== "undefined" && curve.accel !== null) {
    let i;
    for (i = 0; i <= 10; i++) {
      al = curve.accel;
      anatan = new H3DU.Curve(curve).accel( i / 10.0);
      curve.accel = null;
      numtan = new H3DU.Curve(curve).accel(i / 10.0);
      valueDiff(numtan, anatan);
      curve.accel = al;
    }
  }
}
// ////////////////////////////////////////

const testfunctions = [];
function testPathBounds() {
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M93.23,2.94A26.875997179195146,41.03845446654058,0,0061.67,69.38").getBounds(), [50.59389174539909, -4.848084961702973, 93.23, 69.38], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M78.24,58.04A56.22,27.21,0,0127.89,77.4").getBounds(), [27.89, 58.04, 78.24, 77.4], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M85.28,38.16A23.120428179414034,34.00342520528416,0,1139.31,45.51").getBounds(), [39.31, 38.16, 85.32584030333675, 75.70666749647984], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M59.52,17.01A53.81,13.07,0,0149.17,32.06").getBounds(), [49.17, 17.01, 65.05835622574841, 32.06], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M57.12,93.91A73.97146192580018,41.55220027312097,0,1049.36,10.92").getBounds(), [49.36, 10.92, 127.13423770379616, 93.91], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M12.22,67.37A69.39156864320192,32.67842688991886,0,107.56,2.05").getBounds(), [7.56, 2.05, 79.24243974630024, 67.37], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M89.8,80.16A35.04,10.9,0,1090.02,85.9").getBounds(), [21.071519104122572, 72.26186357159618, 90.02, 94.03678838191924], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M22.34,81.44A61.77,41.05,0,0080.2,50.36").getBounds(), [22.34, 50.36, 80.2, 81.44], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M5.92,80.66A40.13,51.62,0,1162.52,74.94").getBounds(), [-8.12363639631388, -10.07235243187143, 72.11076783929367, 80.66], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M10.92,5.08A38.03553964499508,103.86828531821602,0,1184.88,53.68").getBounds(), [10.92, -74.40607562057055, 85.90543526612315, 53.68], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M87.12,61.06A14.856776445368501,20.670297663121392,0,1063.71,35.6").getBounds(), [63.71, 27.716927543049966, 90.23064582843284, 61.06], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M50.39,67.07A8.308962701805486,68.55869459353588,0,1135.05,14.34").getBounds(), [34.41105447105118, 14.34, 50.39, 109.26355289731245], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M16.41,73.59A53.61617356698455,26.635208305235377,0,1046.57,22.47").getBounds(), [16.41, 22.47, 85.1037951850003, 74.56036681560805], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M50.16,8.95A271.36697502828156,43.06761242135666,0,1034.64,95.05").getBounds(), [-228.91002542117096, 8.95, 50.16, 95.05], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M15.21,91.06A21.80613653783315,18.28393029859781,0,010.55,56.62").getBounds(), [-13.899015408601647, 56.62, 15.21, 92.10119001057335], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M89.46,47.57A49.35,35.51,0,0064.9,83.76").getBounds(), [64.35547665232178, 47.57, 89.46, 83.76], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M80.15,1.33A44.72,44.18,0,1034.46,1.59").getBounds(), [12.45326160241958, -80.69875368644753, 101.7435124909181, 1.59], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M10.67,48.8A445.000754990878,6.328603551516979,0,0140.7,36.15").getBounds(), [-419.2633935386498, 36.15, 40.7, 48.8], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M90.89,27.53A64.29691624564092,28.460484058919548,0,0190.14,84.45").getBounds(), [90.14, 27.53, 154.81082191911116, 84.45], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M63.56,45.26A15.61,36.31,0,0040.55,2.24").getBounds(), [40.55, -3.292472236929889, 64.47324533451098, 45.26], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M87.24,19.38A499.1450936754129,20.737891395910413,0,0026.92,60.78").getBounds(), [-442.0328144196064, 19.35685557501427, 87.24, 60.78], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M47.17,37.59A13.662609724691288,72.99678758596289,0,0019.88,45").getBounds(), [19.88, -31.61980837835595, 47.17, 45], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M11.5,50.58A23.67670524404925,72.12372798360498,0,0057.99,78").getBounds(), [11.068602153746998, 50.58, 57.99, 136.41279159170372], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M89.88,83.73A42.87,46.79,0,1083.65,39.55").getBounds(), [83.65, 8.708066818090757, 166.85635956154107, 102.05818658516776], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M36.97,97.15A64.6265880639307,30.522487390505866,0,1087.98,41.06").getBounds(), [36.97, 41.06, 127.09613576818873, 99.62491232607776], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M44.58,84.04A43.97873684610328,20.86141636404536,0,0023.02,43.59").getBounds(), [23.02, 42.98101985114309, 77.72089712470125, 84.04], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M46.89,93.5A46.000956754404804,32.42094939873615,0,1032.2,29.49").getBounds(), [32.2, 29.095048457067037, 85.51616362759478, 93.5], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M31.1,6.9A59.47462771601348,25.058230663183835,0,1029.19,57.01").getBounds(), [-29.321959876543197, 6.9, 31.1, 57.01], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M60.28,11.85A38.103139642414966,3.9921674124077815,0,1185.62,4.32").getBounds(), [34.901839715967775, 4.098592921384933, 85.62, 11.85], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M71.23,34.23A805.8108433810519,29.579875589367617,0,0112.16,93.35").getBounds(), [12.16, 34.23, 847.4436152121114, 93.35], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M69.05,17.62A120.05606329790912,30.85066794045592,0,1132.95,78.62").getBounds(), [32.95, 17.62, 170.9321902895193, 78.93883614995431], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M19.58,87.72A65.37814169164724,40.97048692824024,0,1156.21,9.06").getBounds(), [-27.47947924899954, 7.57657515996943, 56.21, 87.72], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M89.62,92.85A41.41,47.08,0,1158.57,91.27").getBounds(), [30.98139451269889, 91.27, 113.70194179600361, 182.68817372257783], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M95.79,22.19A265.9109881249107,13.99113121374717,0,109.33,49.8").getBounds(), [-213.31680392834193, 22.01151003794496, 95.79, 49.8], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M61.12,55.7A39.4,53.33,0,0091.23,33.32").getBounds(), [61.12, 33.32, 91.23, 55.7], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M41.49,59.99A5.950402014880479,85.16640684528245,0,0029.86,96.12").getBounds(), [29.725497522387645, -7.098532024932808, 41.49, 96.12], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M81.88,83.87A42.27,8.77,0,1188.94,95.31").getBounds(), [81.88, 80.00328744526826, 159.2565322901154, 97.45789145207698], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M66.08,5.53A19.316896421152634,62.80288779360472,0,1127.45,3.77").getBounds(), [27.45, 3.77, 66.08, 67.44672216936252], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M94.24,62.41A18.96,25.22,292.21,1147.1566567895934,60.267842002213").getBounds(), [47.1566567895934, 60.267842002213, 95.84709685410157, 85.79812200653225], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M76,0.37A48.20740799184744,40.37034301423182,212.2206915076822,103.1430132687091827,41.396729880943894").getBounds(), [-6.427382115979668, -21.694055113506995, 76, 41.396729880943894], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M84.48850968852639,96.49149109609425A19.768481314803168,62.36219034248151,47.47,1134.242960857227445,90.86889671161771").getBounds(), [11.537892734366153, 90.86889671161771, 84.48850968852639, 138.2542478264262], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M43.26388952322304,71.68395693879575A87.1162388483108,24.031614845552383,8.808755027130246,1081.8,29.82912207953632").getBounds(), [43.26388952322304, 29.82912207953632, 148.66261516660683, 77.99454602746499], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M53.64944436587393,1.6148094553500414A20.45599483468453,48.46497237756027,244.04447986744344,1172.32,38.02629711572081").getBounds(), [53.64944436587393, -8.250202222827813, 107.46640345369076, 38.02629711572081], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M31.92,98.72A32.4533570984183,14.629034790168522,10.627258373424413,012.49,68.00830119755119").getBounds(), [-14.690170222576544, 68.00830119755119, 31.92, 98.93174238500139], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M24.93,97.1A126.14927597895155,7.43766450791438,100.83756317384541,0114.607882522977889,72.22").getBounds(), [-5.0475817223362895, 72.22, 24.93, 208.5668392589085], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M31.483520893380046,75.21A66.68924448652945,30.76947031610544,195.44,0134.16121336631477,12.465451704338193").getBounds(), [-31.966062637441837, 9.29916991736637, 34.16121336631477, 75.21], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M89.80965805239975,76.15A192.89926493507957,29.612317617815584,258.08581145480275,1118.57,20.77375005465001").getBounds(), [18.57, 20.77375005465001, 103.42519179198538, 237.30466090385409], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M70.53,65.75A10.22005826202046,163.82628812257846,325.3437240701169,1149.43286278285086,71.16747342515737").getBounds(), [49.43286278285086, 65.75, 153.50982065044712, 203.316733309159], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M68.22165783960372,22.06A48.29,38.10084670782089,107.91652489453556,1123.814482800662518,95.61").getBounds(), [23.814482800662518, 22.06, 98.22501378066218, 116.66574132689428], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M44.21085244975984,89.72A11.822980613969333,46.26691600206036,82.46,0095.84,63.63").getBounds(), [44.21085244975984, 63.63, 115.91692469977764, 89.86253126710311], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M4.98,60.448603448458016A52.01534889638424,25.93237978219986,18.511740434914827,1164.63,35.99649958778173").getBounds(), [-28.55795940250571, 9.386930635192428, 64.63, 60.448603448458016], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M90.02,85.11602999642491A9.614986988325612,95.10292497046777,294.69,1126.02367966901511,36.41570536419749").getBounds(), [-28.471949112797724, 20.13324817462646, 90.02, 85.11602999642491], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M98.24,56.48A57.96141100272259,41.488922453147794,268.362973742187,1015.337924379855394,48.32").getBounds(), [15.337924379855394, -5.527628700081841, 98.24, 56.48], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M60.71946872398257,82.68A113.00159523854015,5.581950635895552,52.52,1140.13743209652603,37.91").getBounds(), [-18.399539651795607, -29.362791486177258, 60.71946872398257, 82.68], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M71.35358531959355,7.842974714003503A23.756285991898363,55.13595422363322,174.53,1039.183733030222356,75.82608971279114").getBounds(), [31.08608164535057, -13.086045904929058, 71.35358531959355, 75.82608971279114], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M12.279293150641024,0.7079764967784286A118.45994633236879,26.633390113754295,276.49362199008465,1157.63,60.67").getBounds(), [12.279293150641024, -86.96871368846615, 64.61248428086677, 60.67], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M79.74,86.05A45.5611573543046,609.9023454600137,82.66674340702593,119.58,3.3129293471574783").getBounds(), [-560.2574804548675, 3.3129293471574783, 79.74, 134.68639799080046], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M72.05445081926882,53.85A20.618219166994095,43.93,171.15000000000003,1058.4486142732203,36.49859237484634").getBounds(), [51.22690364846033, -31.42149487231498, 94.13920410416516, 55.39084137483117], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M26.363478554412723,41.17A21.44948998093605,55.13651928305626,118.36,1025.191187812015414,60.89").getBounds(), [-68.65702720623858, -1.5174426295163208, 26.363478554412723, 63.0093996925976], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M29.72,72.74268709588796A33.72,57.01,301.55,0176.80233363062143,75.88").getBounds(), [29.72, 68.94067296735345, 76.80233363062143, 75.88], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M22.74632325861603,8.27A7.96,13.852176770567894,271.5085775312036,0030.43441823683679,14.663121988996863").getBounds(), [22.74632325861603, 8.27, 30.43441823683679, 14.663121988996863], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M79.27,75.55A23.488352420425397,110.42095299960691,256.86,0040.092807123437524,36.884165671654046").getBounds(), [40.092807123437524, 22.261363020229325, 167.33410864891096, 75.55], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M31.51710780803114,68.77988632768393A122.5184577335291,10.816264243936317,35.44,0022.2716077696532,35.80527079757303").getBounds(), [22.2716077696532, 35.80527079757303, 126.8029356870815, 123.83286846409072], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M83.61,57.83025815617293A30.47369931545744,27.753788777839283,315.34,0125.85,71.25").getBounds(), [25.85, 57.83025815617293, 83.843807531529, 93.65052894996143], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M63.03,36.03A7.10086582053597,38.972078241268605,303.08,0081.15,63.46239116974175").getBounds(), [39.209640267522516, 27.66167878221723, 81.15, 63.46239116974175], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M13.94,85.74A33.188563629984856,31.28,135.01990601420403,0026.596837514080107,43.36").getBounds(), [13.94, 43.36, 29.676052446403673, 85.74], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M80.95279792323709,50.41A20.6554047614336,14.549798592925072,177.12,1180.53,40.6693996861577").getBounds(), [40.6686760542936, 31.910907966683205, 80.95279792323709, 60.98322573501582], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M78.73,92.47A23.6,8.54,58.111685151234276,0153.62348682247102,69.99951677862555").getBounds(), [53.62348682247102, 69.99951677862555, 78.73, 94.14678038402789], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M14.028362603858113,60.69752145558596A44.27574749290943,59.69944940507412,212.04113186337054,0044.83,61.07579572126269").getBounds(), [14.028362603858113, 60.69752145558596, 44.83, 63.9345613338841], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M78.54836229234934,30.85A17.791265092016523,254.84467892451906,25.62,0017.36,76.89").getBounds(), [17.36, -176.04698913380943, 159.29610226388223, 76.89], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M74.8,60A126.42114235059763,4.27842005719186,318.75421847216785,1159.5,62.05").getBounds(), [-27.931626743576615, 60, 74.8, 144.42901092777365], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M29.13,15.75A62.74,34.393044143915176,350.8,0138.442139024846256,30.16").getBounds(), [29.13, 15.75, 38.442139024846256, 30.16], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M41.75077516119927,1.6243555815890431A43.4317474256332,408.28898587786034,272.44,0168.5673970496282,89.6485549164936").getBounds(), [41.75077516119927, 1.6243555815890431, 463.02847839576185, 92.32455924520978], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M97.39,63.85729212779552A405.1932267952353,25.916239818248965,274.88324247300625,0050.85830937605351,1.1903022648766637").getBounds(), [50.85830937605351, -371.11998395756655, 117.2038095313456, 63.85729212779552], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M94.11265160888433,65.14A63.977295368909836,26.62429516017437,316.12000000000006,0169.86760625150055,88.05").getBounds(), [69.86760625150055, 65.14, 94.11265160888433, 88.05], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M93.72,5.86A75.22456065724302,13.645966379084765,108.35235578007998,0046.94,72.87397307809442").getBounds(), [46.94, -32.160276555359495, 97.31148157955275, 72.87397307809442], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M7.17,27.219995157793164A31.687583211997467,251.1401354434251,94.4,0024.31,92.04").getBounds(), [-234.64412366941738, 22.627370669502874, 24.31, 92.04], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M12.1,42.17A263.60523614900995,27.22713552962051,0.28976582922041416,0075.5196995800361,96.54683959670365").getBounds(), [-219.72585228778053, 42.17, 75.5196995800361, 96.54683959670365], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M69.9231021804735,78.7277570227161A19.069217840556192,41.505823598707046,349.59000000000003,1032.91,88.22").getBounds(), [31.221211167002053, 42.63789604908889, 69.9231021804735, 88.22], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M54.513806966133416,13.75A151.71335949613922,5.634568994841679,288.64506809972227,0150.34,60.96").getBounds(), [50.34, -106.3364059851378, 101.17867626670801, 60.96], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M46.17651393637061,47.06673778127879A24.295128357084945,26.764815802646318,160.51330860704184,1182.52804297953844,85.07190425880253").getBounds(), [46.17651393637061, 39.570604241335396, 88.90763821186225, 85.07190425880253], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M44.39,16.75A21.455264016985893,56.979451924562454,45.36,0112.231361120939255,38.65116355009377").getBounds(), [12.231361120939255, 16.75, 44.39, 38.65116355009377], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M17.310092807747424,38.35A505.16051642576474,33.94147672776926,68.97,0084.47,23.88").getBounds(), [17.310092807747424, 23.88, 234.90256022343112, 502.7299167242354], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M26.733240950852633,72.95A48.90888758003712,31.069948598742485,337.8450967837125,1042.97,5.82").getBounds(), [26.733240950852633, 4.636311057086317, 87.4722187904017, 72.95], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M32.6,7.364279497414827A65.98162114964369,53.19550704433062,352.58370833471423,0197.16283914167434,97.42896354291588").getBounds(), [32.6, -1.0255759822714126, 130.65445335333277, 97.42896354291588], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M78.98,32.86A32.34911768138409,18.72,54.098268980160356,0148.86,47.23").getBounds(), [48.86, 32.86, 80.04853830801966, 55.605248011587605], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M43.60217412468046,23.14A11.78,18.020628198981285,23.92,0134.15,54.834868013858795").getBounds(), [34.15, 23.14, 47.34360876669817, 54.834868013858795], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M14.15,65.84A32.781228214502335,48.32705362141132,0.16,0162.69,50.01").getBounds(), [14.15, 40.38014090215644, 62.69, 65.84], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M28.27031910419464,70.80957454163581Q53.99,11.68,46.41,80.41").getBounds(), [28.27031910419464, 43.54431850731446, 48.11876994401217, 80.41], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M24.76,86.88207091763616Q71.8333445256576,31.75,10.267958929762244,77.66").getBounds(), [10.267958929762244, 56.82883388657879, 45.1550445226219, 86.88207091763616], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M65.1487801456824,98.57Q9.28,76.1561619117856,32.7719840221107,29.278454463928938").getBounds(), [25.98603977154242, 29.278454463928938, 65.1487801456824, 98.57], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M8.08,82.58291340898722Q26.8,51.70914730988443,97.63,34.6").getBounds(), [8.08, 34.6, 97.63, 82.58291340898722], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M28.32,27.51Q98.14130247104913,21.430610679090023,56.7,36.88730648718774").getBounds(), [28.32, 25.813514987810926, 72.13467303330428, 36.88730648718774], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M2.884357632137835,13.71Q71.6,25.97406895365566,40.483340504579246,63.32146874628961").getBounds(), [2.884357632137835, 13.71, 49.802151385834435, 63.32146874628961], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M21.53,99.87324976827949Q63.69,97.26,4.270227486267686,5.363531620241702").getBounds(), [4.270227486267686, 5.363531620241702, 38.97699666729343, 99.87324976827949], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M85.47,54.29408575873822Q0.9910985361784697,11.28,26.861675293184817,41.65").getBounds(), [20.823229303483387, 29.12242266475849, 85.47, 54.29408575873822], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M63.97,58.05Q83.32,80.06205598358065,69.26,80.96").getBounds(), [63.97, 58.05, 75.10671875, 80.96], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M73.01,50.82Q71.98891430161893,66.62210831418633,46.07600581366569,51.28415930084884").getBounds(), [46.07600581366569, 50.82, 73.01, 58.837093982305376], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M24.60103794001043,15.68Q42.06,33.75879158265889,44.1,4.75").getBounds(), [24.60103794001043, 4.75, 44.1, 22.617402304371353], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M6.89,23.806454241275787Q46.331076812930405,24.438258446753025,77.93643367476761,31.57").getBounds(), [6.89, 23.806454241275787, 77.93643367476761, 31.57], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M43.967929016798735,40.4Q60.75,41.886685066856444,24.21,41.449818294495344").getBounds(), [24.21, 40.4, 49.05606602218701, 41.548029690724796], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M0.32,47.83Q72.33,16.61,68.93106955103576,35.310220113024116").getBounds(), [0.32, 28.305085981650045, 68.93106955103576, 47.83], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M14.8,0.7669627899304032Q36.06899904552847,21.42,7.56,73.23").getBounds(), [7.56, 0.7669627899304032, 23.75171830259147, 73.23], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M10.07890785112977,28.18Q42.419903352856636,94.47,6.071162107400596,67.56").getBounds(), [6.071162107400596, 28.18, 25.24746916606091, 75.2771875], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M33.91886835452169,33.11Q65.28,93.09,70.04225752316415,83.18339856341481").getBounds(), [33.91886835452169, 33.11, 70.04225752316415, 84.56807077511448], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M52.13047743309289,90.2Q81.77,3.2245762646198273,17.28,41.79").getBounds(), [17.28, 29.946458551203833, 61.46284284923531, 90.2], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M7.898285728879273,32.62Q51.52,10.35,51.17678730748594,10.151249449700117").getBounds(), [7.898285728879273, 10.151249449700117, 51.17678730748594, 32.62], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M18.57,50.61711089219898Q65.47755389474332,93.38541929610074,25.21091536618769,11.35").getBounds(), [18.57, 11.35, 43.758538810151805, 65.15943961143421], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M21.52342963963747,60.94583433587104Q1.14,67.59,64.16,47.21388954203576").getBounds(), [16.544429172296077, 47.21388954203576, 64.16, 62.57914991030469], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M49.24101249780506,14.82Q93.41427818872035,21.07,94.4077652413398,93.56").getBounds(), [49.24101249780506, 14.82, 94.4077652413398, 93.56], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M7.89,58.91709281131625Q92.79,2.31,20,95.65979063045233").getBounds(), [7.89, 37.54945993682777, 53.508398437500006, 95.65979063045233], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M27.87,7.67Q28.193444851785898,66.42,54.07,70.83992538973689").getBounds(), [27.87, 7.67, 54.07, 70.83992538973689], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M54.74,44.46941544301808Q18.414944619871676,12.29,38.57,87.81").getBounds(), [31.396224040564846, 34.874801830489005, 54.74, 87.81], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M19.85,27.07Q61.95,96.03,20.87,56.19").getBounds(), [19.85, 27.07, 41.155, 70.77000000000001], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M14.62,71.26784587744623Q3.2872562296688557,60.91165621764958,78.95,49.722298444248736").getBounds(), [13.146118550240063, 49.722298444248736, 78.95, 71.26784587744623], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M63.18,76.98Q2.727526077069342,39.51083885040134,97.76,39.46").getBounds(), [39.705715348626256, 39.46, 97.76, 76.98], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M40.36537867505103,76.33Q32.12652555666864,7.267289841547608,55.98561083897948,19.01168276090175").getBounds(), [38.252073265903164, 17.33819551665394, 55.98561083897948, 76.33], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M10.41783420369029,62.3Q61.21,61.49569267872721,13.303184835240245,25.74").getBounds(), [10.41783420369029, 25.74, 36.53525475973264, 62.3], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M26.45,48.92Q86.5033263573423,12.485552276484668,35.4,80.56817369069904").getBounds(), [26.45, 36.29187705485674, 58.83933250400442, 80.56817369069904], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M22.12,82.18460769858211Q54.84,14.26,55.47561564017087,46.96816862560809").getBounds(), [22.12, 36.352982797512226, 55.47561564017087, 82.18460769858211], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M30.17,74.75Q57.05,65.1065252488479,0.33,24.27476628217846").getBounds(), [0.33, 24.27476628217846, 38.57375, 74.75], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M80.56006287224591,82.78330920729786Q90.61,63.35524751339108,3.8359936559572816,68.4").getBounds(), [3.8359936559572816, 67.40717464297778, 81.55967303743762, 82.78330920729786], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M98.63,79.59846628364176Q33.13,56.26059886999428,36.36,49.4").getBounds(), [36.36, 49.4, 98.63, 79.59846628364176], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M1.6395613783970475,41.24Q89.67,94.95491452980787,95.68,41.69").getBounds(), [1.6395613783970475, 41.24, 95.68, 68.20995726490393], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M25.14,62.46Q7.181717082858086,66.38227216899395,74.98330243397504,32.47").getBounds(), [21.52085030819522, 32.47, 74.98330243397504, 62.84940328696743], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M69.04,52.86992769688368Q70.07669161539525,41.74,95.57,22.41").getBounds(), [69.04, 22.41, 95.57, 52.86992769688368], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M45.69,41.158969537355006Q87.09158056881279,18.976839259266853,22.78,75.14272751286626").getBounds(), [22.78, 34.94631179828502, 61.875272141630994, 75.14272751286626], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M79.19,66.50855808984488Q1.1252667056396604,43.31,80.9,99.55504504032433").getBounds(), [40.58513335281983, 59.76762365187243, 80.9, 99.55504504032433], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M25.12799338437617,61.67649598792195Q44.21,90.8543965080753,77.99,97.88").getBounds(), [25.12799338437617, 61.67649598792195, 77.99, 97.88], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M60.05943198688328,67.91831927839667Q48.5,63.70904620271176,57.01303998939693,38.325013825669885").getBounds(), [53.45095136901364, 38.325013825669885, 60.05943198688328, 67.91831927839667], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M41.770656406879425,77.37042184453458Q81.16007468197495,28.277452802285552,35.66,62.99413947854191").getBounds(), [35.66, 48.65873055168777, 59.98801788627374, 77.37042184453458], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M49.67,73.86534390971065Q10.596275143325329,64.31380333378911,91.67282476555556,78.64007831085473").getBounds(), [36.982347206658886, 70.05950628990831, 91.67282476555556, 78.64007831085473], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M14.397050440311432,81.28234623000026Q35.069279628805816,75.04179091192782,97.81793132424355,65.17048552632332").getBounds(), [14.397050440311432, 65.17048552632332, 97.81793132424355, 81.28234623000026], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M74.91,48.470370029099286Q17.933926661498845,16.43,84.92,24.11929275840521").getBounds(), [48.78306546620646, 22.63255393137646, 84.92, 48.470370029099286], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M5.03,59.01Q70.9,95.24,21.64,76.18").getBounds(), [5.03, 59.01, 42.70589843750001, 82.69984375], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M27.83976485952735,78.66423057857901Q47.16129372827709,97.66435173805803,54.142433451488614,99.04").getBounds(), [27.83976485952735, 78.66423057857901, 54.142433451488614, 99.04], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M8.66727470420301,53.82Q87.2436290141195,70.65,42.747859470546246,34.84").getBounds(), [8.66727470420301, 34.84, 58.812669211329194, 59.198125], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M39.939241646789014,11.68Q40.22841565310955,8.283349825069308,27.486990997567773,68.31").getBounds(), [27.486990997567773, 11.68, 39.939241646789014, 68.31], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M52.7,75.98161878995597C46.8,21.538636391051114,13.15,20.61687815003097,7.560215541161597,1.37").getBounds(), [7.560215541161597, 1.37, 52.7, 75.98161878995597], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M79.95,11.266513401642442C13.63,11.71,51.578501355834305,7.978665083646774,27.112284884788096,71.56952156219631").getBounds(), [27.112284884788096, 11.266513401642442, 79.95, 71.56952156219631], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M36.93,72.0991236390546C99.99633305706084,85.95,97.15,11.31213295739144,12.35,35.39021534379572").getBounds(), [12.35, 30.622610412690484, 80.5129962231593, 73.70488976568254], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M67.35070224385709,73.11848460230976C31.814480992034078,72.03,85.22201057057828,2.5009295903146267,42.85,83.6").getBounds(), [42.85, 44.35734031656867, 67.35070224385709, 83.6], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M12.70370939746499,38.79911759868264C86.06381758581847,18.92,17.89,86.97,86.35,95.64").getBounds(), [12.70370939746499, 35.17841276630497, 86.35, 95.64], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M13.550294027663767,46.47166964132339C48.73,15.902273054234684,73.18,25.25,82.7,61.56").getBounds(), [13.550294027663767, 28.237969028062942, 82.7, 61.56], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M67.43374611251056,10.59C84.73938456736505,92.11,86.26,17.18,91.54674995224923,57.41036492399871").getBounds(), [67.43374611251056, 10.59, 91.54674995224923, 57.41036492399871], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M8.14,54.33024738449603C21.29,66.48,64.27,83.42257633339614,98.7961427308619,40.207809722051024").getBounds(), [8.14, 40.207809722051024, 98.7961427308619, 68.03072326334194], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M88.77001346554607,20.27C5.694010807201266,8.69,12.53,43.27923913951963,17.508624377660453,25.06").getBounds(), [14.86029638948734, 17.898367230331857, 88.77001346554607, 30.369366511984843], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M61.75,88.69089859072119C10.07,48.625312093645334,4.11,13.546089641749859,26.23813550453633,71.23608733527362").getBounds(), [14.123470582162192, 40.8426806267471, 61.75, 88.69089859072119], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M98.43462915159762,42.17C18.863945035263896,25.072209513746202,97.37,47.86,75.97998434212059,31.71").getBounds(), [62.00219893383073, 31.71, 98.43462915159762, 42.17], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M27.31,49.28185502067208C91.76,68.32126467488706,5.66,13.167106546461582,25.787304365076125,37.09282842464745").getBounds(), [22.71745194769748, 30.964718528457524, 51.461651134188116, 53.24317235390481], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M64.58,66.63C62.48,48.98,1.3586432440206409,40.92,39.83,62.36").getBounds(), [27.171771368571207, 49.635371093749995, 64.58, 66.63], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M79.86063449643552,76.04C65.7476200023666,71.0758947301656,79.11,6.89,87.85,36.84256016276777").getBounds(), [73.88201916520885, 28.911990656222883, 87.85, 76.04], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M72.41982193663716,36.65021557826549C73.84930176194757,37.81,44.73,69.67,23.651629267260432,0.46383654698729515").getBounds(), [23.651629267260432, 0.46383654698729515, 72.41982193663716, 44.944256515656605], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M85.4640616569668,33.51C79.96,84.31,73.15,94.30477060377598,86.39,16.55").getBounds(), [78.73723465535636, 16.55, 86.39, 73.238038976416], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M57.58,5.55C7.57,53.4003340639174,39.61334344930947,16.39,4.097915161401033,45.69").getBounds(), [4.097915161401033, 5.55, 57.58, 45.69], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M16.42,57.21152804326266C98.27,64.95591346174479,0.5384201416745782,76.38,84.15,76.82779075112194").getBounds(), [16.42, 57.21152804326266, 84.15, 76.82779075112194], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M23.20714413654059,83.36893732193857C16.5158603573218,79.77,66.77,78.82,77.19,33.35").getBounds(), [23.17820685812447, 33.35, 77.19, 83.36893732193857], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M57.5291600311175,83.05C35.62,31.29,76.17977724876255,52.48106447979808,86.2949418835342,9.553311625495553").getBounds(), [51.181310994515684, 9.553311625495553, 86.2949418835342, 83.05], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M98.46,65.58439624495804C72.93,60.36452818661928,56.33526877500117,29.53,56.16,8.31").getBounds(), [56.16, 8.31, 98.46, 65.58439624495804], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M53.9,63.53C36.618680506944656,99.92347159422934,57.40452241152525,73.41814967803657,97.67,71.5969400247559").getBounds(), [47.78617305298802, 63.53, 97.67, 82.55585682793934], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M98.01235804334283,10.729502164758742C10.12,62.627721088938415,13.16,73.46,78.41905744280666,28.609694074839354").getBounds(), [30.783926935768687, 10.729502164758742, 98.01235804334283, 56.72573760345108], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M12.551598157733679,71.12794190179557C69.2977964412421,13.236924703232944,52.97890531364828,29.61,32.855861564166844,78.17").getBounds(), [12.551598157733679, 34.26626429848834, 51.52969562332146, 78.17], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M70.46,94.55858047585934C1.89,39.05,12.915992457419634,54.60612107999623,18.46240817103535,80.51").getBounds(), [14.397401024021164, 57.00461796448101, 70.46, 94.55858047585934], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M53.57792682480067,68.62299810163677C4.37,92.34,20.25555996224284,59.65,67.82,33.95628398284316").getBounds(), [23.57227648567553, 33.95628398284316, 67.82, 76.82511301135995], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M78.82,71.79290496278554C16.41,26.14,27.743497653864324,48.57,39.4,4.84").getBounds(), [30.294486273670845, 4.84, 78.82, 71.79290496278554], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M81.28,7.14C4.02,26.74,41.12,76.2,32.998270029202104,51.59").getBounds(), [31.21228375365026, 7.14, 81.28, 58.30614013671875], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M62.26,16.47C63.65,97.49,85.46,90.28334179893136,94.54,40.114354249089956").getBounds(), [62.26, 16.47, 94.54, 77.50092984559785], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M28.77,88.81C5.66,86.32,24.70691092312336,56.83,96.54,92.00538478326052").getBounds(), [19.508003098564224, 74.8798693318507, 96.54, 92.00538478326052], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M24.055848363786936,90.22C5.52,36.50202937424183,89.14239292498678,46.76015758886933,84.96818004641682,62.48").getBounds(), [21.522567227050896, 50.18505746683251, 84.96818004641682, 90.22], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M79.31,99.68C36.78,19.5,95.09,5.973373353481293,14.23,93.42043602373451").getBounds(), [14.23, 33.6900695105223, 79.31, 99.68], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M39.862498827278614,4.42C61.7404893739149,4.075274779461324,29.67,82.9530936665833,75.03,38.92271651420742").getBounds(), [39.862498827278614, 4.42, 75.03, 52.05923464262154], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M43.27734929975122,48.377623152919114C59.82,34.9,51.538624172098935,74.36,11.30072504747659,63.45").getBounds(), [11.30072504747659, 45.60319285439699, 51.03906738668775, 65.38192895147054], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M56.9,63.91C37.84073772840202,92.85708724055439,94,32.21,58.82223965600133,65.78").getBounds(), [52.95334118306855, 55.39615289320297, 70.68229859793209, 71.95499748361408], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M6.78,57.39C95.7,19.16,95.4,60.61,54.21,69.08").getBounds(), [6.78, 41.4550146484375, 80.74962890625, 69.08], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M6.62,2.65C98.14025573432446,73.40190822724253,94.2667025141418,69.87643158063293,92.29083324316889,75.57654841803014").getBounds(), [6.62, 2.65, 92.93071570782536, 75.57654841803014], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M48.61,58.03C61.213515303097665,64.6,90.92,45.55,85.95,13.4").getBounds(), [48.61, 13.4, 86.28942152610361, 59.317265625], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M41.45,67.54943011328578C50.59,19.11,20.10165499523282,78.33223892375827,49.17,6.881428114138544").getBounds(), [36.339788529381735, 6.881428114138544, 49.17, 67.54943011328578], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M98.46875045914203,29.24C97.16,20.634295418858528,17.85,27.72,91.97112780530006,60.16").getBounds(), [60.370340555724404, 25.87884337983094, 98.46875045914203, 60.16], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M88.17,51.6C69.34,75.79247308894992,3.46,4.782127239741385,96.23,27.18").getBounds(), [47.946757812499996, 22.790927029511586, 96.23, 56.57792620334025], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M23.16270766314119,75.96495430916548C33.29,86.45791630260646,20,85.30873877462,96.9552897149697,24.26864772569388").getBounds(), [23.16270766314119, 24.26864772569388, 96.9552897149697, 80.89788755023619], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M88.13386363908648,76.46C58.03,20.67526550963521,1.4820975717157125,29.921928863041103,38.96641652099788,19.43947884719819").getBounds(), [26.601777252224274, 19.43947884719819, 88.13386363908648, 76.46], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M61.9,14.88C75.36,93.59424144495279,81.43931310623884,48.25,46.92415508907288,91.94992363918573").getBounds(), [46.92415508907288, 14.88, 72.40276180097368, 91.94992363918573], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M95.62,32.07C93.84,9.668839676305652,92.73531516082585,19.62,59.75,52.631724486127496").getBounds(), [59.75, 20.027334938074638, 95.62, 52.631724486127496], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M70.12,3.0895469477400184C77.2326898528263,25.71,42.994261044077575,91.54,19.261846179142594,16.18").getBounds(), [19.261846179142594, 3.0895469477400184, 70.98170635835459, 51.11966360857223], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M12.74,30.537174316123128C6.38,52.69203989300877,82.15,9.251587116159499,9.854176756925881,97.1489684889093").getBounds(), [9.854176756925881, 30.537174316123128, 41.2778709139327, 97.1489684889093], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M69.95593893807381,0.9059472940862179C52.72055168170482,44.96,91.56311659608036,64.11841595545411,63.57,92.40901072043926").getBounds(), [63.57, 0.9059472940862179, 73.95367269011855, 92.40901072043926], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M5.590674630366266,68.2673814939335C66.76554705481976,89.23434366006404,24.618121120147407,18.26,56.22,31.05").getBounds(), [5.590674630366266, 29.59059151518477, 56.22, 72.16341869228243], 1.0));
  ok(isApproxVec(H3DU.GraphicsPath.fromString("M34.59,49.9535059556365C79.35,27.576769096776843,32.878602761775255,64.0867683570832,79.32,67.65").getBounds(), [34.59, 42.777317837951706, 79.32, 67.65], 1.0));
}

function test() {
  ok(isApprox(H3DU.GraphicsPath._nextNumber("0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" 0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" +0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" -0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(".0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber("0.", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber("+.0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber("-.0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" 0.0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" +0.0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" +0.0E0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" 0.0E+0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" 0.0E-0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber(" 0.0E-000", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber("0.b", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber("0.E0", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber("0.nonsense", [0]), 0));
  ok(isApprox(H3DU.GraphicsPath._nextNumber("-0nonsense", [0]), 0));
  is(H3DU.GraphicsPath._nextNumber("nonsense", [0]), null);
  is(H3DU.GraphicsPath._nextNumber(",-0nonsense", [0]), null);
  is(H3DU.GraphicsPath._nextNumber("-nonsense", [0]), null);
  is(H3DU.GraphicsPath._nextNumber("-.nonsense", [0]), null);
  is(H3DU.GraphicsPath._nextNumber("0.Enonsense", [0]), null);
  is(H3DU.GraphicsPath._nextNumber("0.E+nonsense", [0]), null);
  is(H3DU.GraphicsPath._nextNumber("-.", [0]), null);
  const mesh = new H3DU.Mesh();
  mesh.mode(H3DU.Mesh.POINTS)
    .vertex3(0, 1, 2)
    .vertex3(1, 2, 3);
  ok(isApproxVec(mesh.getBoundingBox(), [0, 1, 2, 1, 2, 3]), "");
  mesh.vertex3(-1, -2, -3);
  ok(isApproxVec(mesh.getBoundingBox(), [-1, -2, -3, 1, 2, 3]), "");
  mesh.vertex3(4, 5, 6);
  ok(isApproxVec(mesh.getBoundingBox(), [-1, -2, -3, 4, 5, 6]), "");
  mesh.vertex3(-0.5, 4, 0);
  ok(isApproxVec(mesh.getBoundingBox(), [-1, -2, -3, 4, 5, 6]), "");
  ok(isApproxVec(H3DU.toGLColor("#f00"), [1, 0, 0, 1]),
    "The H3DU.toGLColor function didn't calculate the 1st rgba values correctly.");

  ok(isApproxVec(H3DU.toGLColor("#ff0000"), [1, 0, 0, 1]),
    "The H3DU.toGLColor function didn't calculate the 3rd rgba values correctly.");

  ok(isApproxVec(H3DU.toGLColor("rgba(255, 0, 0, 0.5)"), [1, 0, 0, 0.5]),
    "The H3DU.toGLColor function didn't calculate the 5th rgba values correctly.");

  ok(isApproxVec(H3DU.toGLColor("rgb(255, 0, 0)"), [1, 0, 0, 1]),
    "The H3DU.toGLColor function didn't calculate the 6th rgba values correctly.");

  let m1 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const m2 = [
    0, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16];

  m1 = H3DU.MathUtil.mat4multiply(m1, m2);
  ok(isApproxVec(m1, [
    275, 302, 329, 356, 304, 336, 368, 400,
    332, 368, 404, 440, 360, 400, 440, 480
  ]), "The mat4.multiply() function didn't set the values correctly.");
  m1 = H3DU.MathUtil.mat4translate(m1, [1, 2, 3]);
  ok(isApproxVec(m1, [
    275, 302, 329, 356, 304, 336, 368, 400,
    332, 368, 404, 440, 2239, 2478, 2717, 2956
  ]), "The mat4translate() function didn't set the values correctly.");

  m1 = H3DU.MathUtil.mat4scale(m1, [1, 2, 3]);
  ok(isApproxVec(m1, [
    275, 302, 329, 356, 608, 672, 736, 800,
    996, 1104, 1212, 1320, 2239, 2478, 2717, 2956
  ]), "The mat4scale() function didn't set the values correctly.");

  m1 = H3DU.MathUtil.mat4rotate(m1, 0.5 * (180 / Math.PI), [1, 1, 1]);
  ok(isApproxVec(m1, [
    210.6123046875, 230.2483367919922, 249.88438415527344, 269.5204162597656,
    809.8145751953125, 896.520751953125, 983.2268676757812,
    1069.9329833984375, 858.5731201171875, 951.23095703125,
    1043.8887939453125, 1136.5465087890625, 2239, 2478, 2717, 2956
  ]), "The mat4rotated() function didn't set the values correctly.");

  m1 = H3DU.MathUtil.mat4rotate(m1, 0.5 * (180 / Math.PI), 1, 0, 0);
  ok(isApproxVec(m1, [
    210.6123046875, 230.2483367919922, 249.88438415527344, 269.5204162597656,
    1122.301025390625, 1242.8154296875, 1363.3297119140625,
    1483.843994140625, 365.2230224609375, 404.96875, 444.71453857421875,
    484.460205078125, 2239, 2478, 2717, 2956
  ]), "The mat4rotated() function didn't set the values correctly.");

  m1 = H3DU.MathUtil.mat4rotate(m1, 0.5 * (180 / Math.PI), 0, 1, 0);
  ok(isApproxVec(m1, [
    9.732441902160645, 7.909564018249512, 6.086670875549316,
    4.263822555541992, 1122.301025390625, 1242.8154296875, 1363.3297119140625,
    1483.843994140625, 421.48626708984375, 465.78045654296875,
    510.0746765136719, 554.3687744140625, 2239, 2478, 2717, 2956
  ]), "The mat4rotated() function didn't set the values correctly.");

  m1 = H3DU.MathUtil.mat4rotate(m1, 0.5 * (180 / Math.PI), 0, 0, 1);
  ok(isApproxVec(m1, [
    546.6007690429688, 602.7787475585938, 658.9566650390625, 715.1345825195312,
    980.245849609375, 1086.881103515625, 1193.5162353515625,
    1300.1514892578125, 421.48626708984375, 465.78045654296875,
    510.0746765136719, 554.3687744140625, 2239, 2478, 2717, 2956
  ]), "The mat4rotated() function didn't set the values correctly.");

  const m3 = H3DU.MathUtil.mat4frustum(0, 100, 200, 0, 0.1, 100);
  ok(isApproxVec(m3, [
    0.0020000000949949026, 0, 0, 0, 0, -0.0010000000474974513, 0, 0, 1, -1,
    -1.0020020008087158, -1, 0, 0, -0.20020020008087158, 0
  ]), "The mat4.frustum() function didn't compute the values correctly.");

  const m4 = H3DU.MathUtil.mat4perspective(45, 1.6, 0.1, 100);
  ok(isApproxVec(m4, [1.5088834762573242, 0, 0, 0, 0, 2.4142136573791504, 0,
    0, 0, 0, -1.0020020008087158, -1, 0, 0, -0.20020020008087158, 0
  ]), "The mat4perspective() function didn't compute the values correctly.");

  const m5 = H3DU.MathUtil.mat4ortho(0, 100, 200, 0, -1, 1);
  ok(isApproxVec(m5, [
    0.019999999552965164, 0, 0, 0, 0, -0.009999999776482582, 0, 0,
    0, 0, -1, 0, -1, 1, 0, 1
  ]), "The mat4ortho() function didn't compute the values correctly.");

  const m6 = H3DU.MathUtil.mat4lookat([1, 2, 3], [4, 5, 6], [0, 1, 0]);
  ok(isApproxVec(m6, [
    -0.7071067690849304, -0.40824830532073975, -0.5773502588272095, 0, 0,
    0.8164966106414795, -0.5773502588272095, 0, 0.7071067690849304,
    -0.40824830532073975, -0.5773502588272095, 0, -1.4142135381698608, 0,
    3.464101552963257, 1
  ]), "The mat4lookat() function didn't compute the values correctly.");
  let curve = new H3DU.BSplineCurve([[73, 5, 63], [53, 62, 79], [51, 20, 4], [22, 0, 73], [85, 31, 29], [15, 55, 8], [85, 63, 80], [83, 14, 57], [8, 94, 38], [81, 1, 29]], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  compareWithNumericalCurveValues(curve);
  curve = new H3DU.BSplineCurve([[73, 5, 63], [53, 62, 79], [51, 20, 4], [22, 0, 73], [85, 31, 29], [15, 55, 8], [85, 63, 80], [83, 14, 57], [8, 94, 38], [81, 1, 29]], [0, 0, 0, 0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1, 1, 1, 1]);
  compareWithNumericalCurveValues(curve);
  curve = new H3DU.BezierCurve([[32, 4, 71], [40, 29, 57], [87, 34, 9], [26, 25, 64]]);
  compareWithNumericalCurveValues(curve);
  ok(isApproxVec([32, 4, 71], curve.evaluate(0)), "Point at 0 is not correct.");
  ok(isApproxVec([35.423, 10.906, 65.917], curve.evaluate(0.1)), "Point at 0.1 is not correct.");
  ok(isApproxVec([40.30400000000001, 16.648000000000003, 59.61600000000001], curve.evaluate(0.2)), "Point at 0.2 is not correct.");
  ok(isApproxVec([45.760999999999996, 21.261999999999993, 52.919], curve.evaluate(0.3)), "Point at 0.3 is not correct.");
  ok(isApproxVec([50.912, 24.784, 46.647999999999996], curve.evaluate(0.4)), "Point at 0.4 is not correct.");
  ok(isApproxVec([54.875, 27.25, 41.625], curve.evaluate(0.5)), "Point at 0.5 is not correct.");
  ok(isApproxVec([56.767999999999994, 28.695999999999998, 38.672], curve.evaluate(0.6)), "Point at 0.6 is not correct.");
  ok(isApproxVec([55.70900000000001, 29.158, 38.611000000000004], curve.evaluate(0.7)), "Point at 0.7 is not correct.");
  ok(isApproxVec([50.815999999999995, 28.671999999999997, 42.264], curve.evaluate(0.8)), "Point at 0.8 is not correct.");
  ok(isApproxVec([41.207, 27.273999999999997, 50.453], curve.evaluate(0.9)), "Point at 0.9 is not correct.");
  ok(isApproxVec([26, 25, 64], curve.evaluate(1)), "Point at 1 is not correct.");
  curve = new H3DU.BSplineCurve([[79, 62, 32], [21, 3, 72], [80, 41, 57], [0, 13, 23]], [0, 0, 0, 0, 1, 1, 1, 1]);
  compareWithNumericalCurveValues(curve);
  ok(isApproxVec([79, 62, 32], curve.evaluate(0)), "Point at 0 is not correct.");
  ok(isApproxVec([64.85400000000001, 47.047000000000004, 42.386], curve.evaluate(0.1)), "Point at 0.1 is not correct.");
  ok(isApproxVec([56.192000000000014, 36.93600000000001, 49.688], curve.evaluate(0.2)), "Point at 0.2 is not correct.");
  ok(isApproxVec([51.477999999999994, 30.68899999999999, 54.12199999999999], curve.evaluate(0.3)), "Point at 0.3 is not correct.");
  ok(isApproxVec([49.176, 27.328000000000003, 55.903999999999996], curve.evaluate(0.4)), "Point at 0.4 is not correct.");
  ok(isApproxVec([47.75, 25.875, 55.25], curve.evaluate(0.5)), "Point at 0.5 is not correct.");
  ok(isApproxVec([45.664, 25.352000000000004, 52.376000000000005], curve.evaluate(0.6)), "Point at 0.6 is not correct.");
  ok(isApproxVec([41.382000000000005, 24.781, 47.498000000000005], curve.evaluate(0.7)), "Point at 0.7 is not correct.");
  ok(isApproxVec([33.367999999999995, 23.184, 40.831999999999994], curve.evaluate(0.8)), "Point at 0.8 is not correct.");
  ok(isApproxVec([20.085999999999995, 19.582999999999995, 32.593999999999994], curve.evaluate(0.9)), "Point at 0.9 is not correct.");
  ok(isApproxVec([0, 13, 23], curve.evaluate(1)), "Point at 1 is not correct.");
  testPathBounds();
  let i;
  for (i = 0; i < testfunctions.length; i++) {
    testfunctions[i]();
  }
}

testfunctions.push(function() {
  // adapted from public domain World_Seed quat.tests.cpp;
  // "normAxis" is used in the isApproxVec test because, as
  // documented, the axis of rotation need not be a unit vector
  const axis = [1.1, 1.2, 1.3];
  const normAxis = H3DU.MathUtil.vec3normalize(axis);
  const angle = 2.1;
  const res = H3DU.MathUtil.quatFromAxisAngle(angle * H3DU.MathUtil.ToDegrees, axis);
  ok(isApproxVec(
    H3DU.MathUtil.vec3scale(normAxis, Math.sin(angle / 2.0)), res.slice(0, 3)));
  ok(isApprox(res[3], Math.cos(angle / 2.0)));
});

testfunctions.push(function() {
  ok(isApproxVec(
    H3DU.MathUtil.quatToAxisAngle([-1, 0, 0, 0]), [-1, 0, 0, 180]));
});

testfunctions.push(function() {
  // adapted from public domain World_Seed quat.tests.cpp
  let i;
  for (i = 0; i < 1000; i++) {
    let vec = [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2,
      Math.random() * 4 - 2];
    ok(isApprox(Math.sqrt(H3DU.MathUtil.vec4dot(vec, vec)), H3DU.MathUtil.vec4length(vec)));
    vec = [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2];
    ok(isApprox(Math.sqrt(H3DU.MathUtil.vec3dot(vec, vec)), H3DU.MathUtil.vec3length(vec)));
  }
});
testfunctions.push(function() {
  let i;
  for (i = 0; i < 1000; i++) {
    const vec = [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2];
    const scalar = Math.random() * 4 - 2;
    let vec2;
    vec2 = H3DU.MathUtil.vec3scale(vec, scalar);
    is(vec[0] * scalar, vec2[0]);
    is(vec[1] * scalar, vec2[1]);
    is(vec[2] * scalar, vec2[2]);
    vec2 = vec.slice(0, vec.length);
    vec2 = H3DU.MathUtil.vec3scaleInPlace(vec2, scalar);
    is(vec[0] * scalar, vec2[0]);
    is(vec[1] * scalar, vec2[1]);
    is(vec[2] * scalar, vec2[2]);
  }
});
testfunctions.push(function() {
  const curve = new H3DU.BSplineCurve([[95, 22, 18, 0.62], [52, 19, 31, 0.98], [30, 10, 47, 0.77], [3, 90, 43, 0.08], [63, 11, 53, 0.85], [86, 93, 94, 0.96], [65, 99, 57, 0.46], [25, 73, 97, 0.86], [74, 60, 36, 0.79], [76, 79, 19, 0.74]], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    H3DU.BSplineCurve.WEIGHTED_BIT);
  compareWithNumericalCurveValues(curve);
});

testfunctions.push(function() {
  const curve = new H3DU.BezierCurve([
    [24, 43.905643],
    [2.3366679, 43.905643],
    [3.8443565, 45.413332],
    [3.8443565, 23.75]]);
  const curve2 = H3DU.BSplineCurve.clamped([
    [24, 43.905643],
    [2.3366679, 43.905643],
    [3.8443565, 45.413332],
    [3.8443565, 23.75]], 3);
  let i;
  for (i = 0; i <= 100; i++) {
    const a = curve.evaluate(i / 100.0);
    const b = curve2.evaluate(i / 100.0);
    ok(isApproxVec(a, b));
  }
});

testfunctions.push(function() {
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(0, [1, 0, 0]), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(90, [1, 0, 0]), [1, 0, 0, 0, 0, 6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(180, [1, 0, 0]), [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(270, [1, 0, 0]), [1, 0, 0, 0, 0, -1.8369701987210297e-16, -1, 0, 0, 1, -1.8369701987210297e-16, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-90, [1, 0, 0]), [1, 0, 0, 0, 0, -1.8369701987210297e-16, -1, 0, 0, 1, -1.8369701987210297e-16, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-180, [1, 0, 0]), [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-270, [1, 0, 0]), [1, 0, 0, 0, 0, 6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(42.251722139835266, [1, 0, 0]), [1, 0, 0, 0, 0, 0.7401979178164099, 0.6723890558748346, 0, 0, -0.6723890558748346, 0.7401979178164099, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-325.3538200485497, [1, 0, 0]), [1, 0, 0, 0, 0, 0.8226784235896509, 0.568507002032558, 0, 0, -0.568507002032558, 0.8226784235896509, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(0, [0, 1, 0]), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(90, [0, 1, 0]), [6.123233995736766e-17, 0, -1, 0, 0, 1, 0, 0, 1, 0, 6.123233995736766e-17, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(180, [0, 1, 0]), [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(270, [0, 1, 0]), [-1.8369701987210297e-16, 0, 1, 0, 0, 1, 0, 0, -1, 0, -1.8369701987210297e-16, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-90, [0, 1, 0]), [-1.8369701987210297e-16, 0, 1, 0, 0, 1, 0, 0, -1, 0, -1.8369701987210297e-16, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-180, [0, 1, 0]), [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-270, [0, 1, 0]), [6.123233995736766e-17, 0, -1, 0, 0, 1, 0, 0, 1, 0, 6.123233995736766e-17, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(42.251722139835266, [0, 1, 0]), [0.7401979178164099, 0, -0.6723890558748346, 0, 0, 1, 0, 0, 0.6723890558748346, 0, 0.7401979178164099, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-325.3538200485497, [0, 1, 0]), [0.8226784235896509, 0, -0.568507002032558, 0, 0, 1, 0, 0, 0.568507002032558, 0, 0.8226784235896509, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(0, [0, 0, 1]), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(90, [0, 0, 1]), [6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(180, [0, 0, 1]), [-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(270, [0, 0, 1]), [-1.8369701987210297e-16, -1, 0, 0, 1, -1.8369701987210297e-16, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-90, [0, 0, 1]), [-1.8369701987210297e-16, -1, 0, 0, 1, -1.8369701987210297e-16, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-180, [0, 0, 1]), [-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-270, [0, 0, 1]), [6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(42.251722139835266, [0, 0, 1]), [0.7401979178164099, 0.6723890558748346, 0, 0, -0.6723890558748346, 0.7401979178164099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-325.3538200485497, [0, 0, 1]), [0.8226784235896509, 0.568507002032558, 0, 0, -0.568507002032558, 0.8226784235896509, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(0, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(90, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [0.4516560566347115, -0.7644537578661121, -0.46001875895398237, 0, -0.1371750198963126, 0.44997428958804264, -0.8824432857845216, 0, 0.8815837001791882, 0.46166393707340425, 0.09836965377724617, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(180, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [-0.09668788673057704, -0.9016287777624249, 0.42156494122520594, 0, -0.9016287777624249, -0.10005142082391472, -0.42077934871111744, 0, 0.42156494122520594, -0.42077934871111744, -0.8032606924455077, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(270, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [0.4516560566347114, -0.13717501989631276, 0.8815837001791883, 0, -0.7644537578661124, 0.4499742895880426, 0.46166393707340414, 0, -0.46001875895398225, -0.8824432857845217, 0.09836965377724598, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-90, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [0.4516560566347114, -0.13717501989631276, 0.8815837001791883, 0, -0.7644537578661124, 0.4499742895880426, 0.46166393707340414, 0, -0.46001875895398225, -0.8824432857845217, 0.09836965377724598, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-180, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [-0.09668788673057704, -0.9016287777624249, 0.42156494122520594, 0, -0.9016287777624249, -0.10005142082391472, -0.42077934871111744, 0, 0.42156494122520594, -0.42077934871111744, -0.8032606924455077, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-270, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [0.4516560566347115, -0.7644537578661121, -0.46001875895398237, 0, -0.1371750198963126, 0.44997428958804264, -0.8824432857845216, 0, 0.8815837001791882, 0.46166393707340425, 0.09836965377724617, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(42.251722139835266, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [0.8575391017609374, -0.3280101961065974, -0.3962776806749988, 0, 0.09376516228727394, 0.857102175180465, -0.506541168753495, 0, 0.5058011301809101, 0.3972218178184917, 0.7657545586914173, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-325.3538200485497, [-0.6720536114289628, 0.6708012295665852, -0.31363936898489975]), [0.9027667875473999, -0.2582452954858734, -0.3439789160119583, 0, 0.09836705927610391, 0.9024685739635295, -0.419373812555821, 0, 0.4187314759493479, 0.3447605551214457, 0.8401214856683724, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(0, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(90, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.5788307463258064, 0.7930431831117102, -0.18983539403376937, 0, -0.394508697258106, 0.06859938653172214, -0.9163280045677876, 0, -0.7136650859441157, 0.6052905367569511, 0.35256986714247157, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(180, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.1576614926516129, 0.39853448585360424, -0.9035004799778852, 0, 0.39853448585360424, -0.8628012269365558, -0.31103746781083663, 0, -0.9035004799778852, -0.31103746781083663, -0.29486026571505686, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(270, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.5788307463258063, -0.3945086972581059, -0.7136650859441158, 0, 0.7930431831117103, 0.06859938653172193, 0.605290536756951, 0, -0.18983539403376953, -0.9163280045677877, 0.35256986714247146, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-90, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.5788307463258063, -0.3945086972581059, -0.7136650859441158, 0, 0.7930431831117103, 0.06859938653172193, 0.605290536756951, 0, -0.18983539403376953, -0.9163280045677877, 0.35256986714247146, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-180, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.1576614926516129, 0.39853448585360424, -0.9035004799778852, 0, 0.39853448585360424, -0.8628012269365558, -0.31103746781083663, 0, -0.9035004799778852, -0.31103746781083663, -0.29486026571505686, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-270, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.5788307463258064, 0.7930431831117102, -0.18983539403376937, 0, -0.394508697258106, 0.06859938653172214, -0.9163280045677876, 0, -0.7136650859441157, 0.6052905367569511, 0.35256986714247157, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(42.251722139835266, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.8905793509437359, 0.4510184884454891, 0.05874302301533779, 0, -0.3474783991987561, 0.7580201812738682, -0.5519639180886753, 0, -0.29347432896746545, 0.47115573631430857, 0.8317963034152157, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-325.3538200485497, [-0.7608092706623694, -0.26191484595517317, 0.5937759401849081]), [0.9253176040029218, 0.3729001612763101, 0.06879535916320194, 0, -0.3022313979908611, 0.8348425749502387, -0.460102224640291, 0, -0.22900548856038755, 0.4049485705253902, 0.8851966682261413, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(0, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(90, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [0.34078483042050894, -0.9386948753335458, 0.05213089657586967, 0, 0.4161273400446545, 0.20032936075891766, 0.8869645900966308, 0, -0.8430324645128595, -0.28057098609881687, 0.45888580882057367, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(180, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [-0.3184303391589821, -0.5225675352888914, -0.79090156793699, 0, -0.5225675352888914, -0.5993412784821648, 0.606393603997814, 0, -0.79090156793699, 0.606393603997814, -0.08222838235885266, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(270, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [0.34078483042050883, 0.4161273400446544, -0.8430324645128597, 0, -0.938694875333546, 0.2003293607589175, -0.28057098609881675, 0, 0.0521308965758695, 0.8869645900966308, 0.4588858088205736, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-90, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [0.34078483042050883, 0.4161273400446544, -0.8430324645128597, 0, -0.938694875333546, 0.2003293607589175, -0.28057098609881675, 0, 0.0521308965758695, 0.8869645900966308, 0.4588858088205736, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-180, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [-0.3184303391589821, -0.5225675352888914, -0.79090156793699, 0, -0.5225675352888914, -0.5993412784821648, 0.606393603997814, 0, -0.79090156793699, 0.606393603997814, -0.08222838235885266, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-270, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [0.34078483042050894, -0.9386948753335458, 0.05213089657586967, 0, 0.4161273400446545, 0.20032936075891766, 0.8869645900966308, 0, -0.8430324645128595, -0.28057098609881687, 0.45888580882057367, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(42.251722139835266, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [0.8287345263362398, -0.5233658820130003, 0.19821008653194905, 0, 0.3876017482633996, 0.7922439028640843, 0.4712902323598907, 0, -0.4036879606842452, -0.3137479114184472, 0.8594174064324958, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-325.3538200485497, [0.5837677880977237, -0.4475816805443645, -0.6774111076891001]), [0.883106926936549, -0.4314442075450331, 0.18433136296496888, 0, 0.33878170840673616, 0.8582011416406997, 0.3856394099876372, 0, -0.32457527577697276, -0.2781127402015919, 0.9040487786020531, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(0, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(90, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [0.034118695219299305, -0.08247684474299075, -0.9960087774300855, 0, 0.43284520434965434, 0.8994921012104405, -0.05965726218603509, 0, 0.9008223707857387, -0.4290821948546315, 0.06638920357026068, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(180, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [-0.9317626095614016, 0.3503683596066637, -0.09518640664434679, 0, 0.3503683596066637, 0.7989842024208811, -0.4887394570406667, 0, -0.09518640664434679, -0.4887394570406667, -0.8672215928594788, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(270, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [0.034118695219299076, 0.43284520434965446, 0.9008223707857387, 0, -0.08247684474299069, 0.8994921012104405, -0.4290821948546316, 0, -0.9960087774300855, -0.059657262186035176, 0.06638920357026047, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-90, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [0.034118695219299076, 0.43284520434965446, 0.9008223707857387, 0, -0.08247684474299069, 0.8994921012104405, -0.4290821948546316, 0, -0.9960087774300855, -0.059657262186035176, 0.06638920357026047, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-180, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [-0.9317626095614016, 0.3503683596066637, -0.09518640664434679, 0, 0.3503683596066637, 0.7989842024208811, -0.4887394570406667, 0, -0.09518640664434679, -0.4887394570406667, -0.8672215928594788, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-270, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [0.034118695219299305, -0.08247684474299075, -0.9960087774300855, 0, 0.43284520434965434, 0.8994921012104405, -0.05965726218603509, 0, 0.9008223707857387, -0.4290821948546315, 0.06638920357026068, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(42.251722139835266, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [0.7490620258757711, -0.12773523835191436, -0.6500690657722957, 0, 0.21876166770897443, 0.973887838618575, 0.06071087655460969, 0, 0.6253394391305206, -0.1876864051390522, 0.7574459711384738, 0, 0, 0, 0, 1]));
  ok(isApproxVec(H3DU.MathUtil.mat4rotated(-325.3538200485497, [0.1847124663342982, 0.9484155741079119, -0.2576610245463225]), [0.8287284044110013, -0.11541816168058634, -0.5476201965565825, 0, 0.177546031530348, 0.9821777809449435, 0.06167830498555713, 0, 0.5307415928775704, -0.14834235596194623, 0.8344506618233571, 0, 0, 0, 0, 1]));

});

testfunctions.push(function() {
  let i;
  for (i = 0; i < 100; i++) {
    const angle = Math.random() * 360 - 180;
    const axis = H3DU.MathUtil.vec3normalize([Math.random() * 2 - 1,
      Math.random() * 2 - 1, Math.random() * 2 - 1]);
    const q = H3DU.MathUtil.quatFromAxisAngle(angle, axis[0], axis[1], axis[2]);
    const aa = H3DU.MathUtil.quatToAxisAngle(q);
    const q2 = H3DU.MathUtil.quatFromAxisAngle(aa[3], aa[0], aa[1], aa[2]);
    ok(isApproxVec(q, q2), "angleaxis=" + [angle, axis]);
  }
});

testfunctions.push(function() {
  let i;
  for (i = 0; i < 100; i++) {
    const x = Math.random() * 360 - 180;
    const y = Math.random() * 360 - 180;
    const z = Math.random() * 360 - 180;
    const q = H3DU.MathUtil.quatFromTaitBryan(x, y, z);
    const aa = H3DU.MathUtil.quatToTaitBryan(q);
    const q2 = H3DU.MathUtil.quatFromTaitBryan(aa[0], aa[1], aa[2]);
    ok(isApproxVec(q, q2), "taitbryan=" + [x, y, z]);
  }
});
testfunctions.push(function() {
  let pathtest = new H3DU.GraphicsPath()
    .moveTo(0.4713967368259978, 0.8819212643483549 )
    // top left
    .lineTo(-1, 1 )
    // bottom middle
    .lineTo( 0.19134171618254492, 0.46193976625564337 )
    // downward curve
    .lineTo( 0.2356983684129989, 0.44096063217417747 )
    .lineTo( 0.27778511650980114, 0.4157348061512726 )
    .lineTo( 0.31719664208182274, 0.3865052266813685 )
    .lineTo( 0.3535533905932738, 0.35355339059327373 )
    .lineTo( 0.3865052266813685, 0.31719664208182274 )
    .lineTo( 0.4157348061512726, 0.2777851165098011 )
    .lineTo( 0.4409606321741775, 0.23569836841299877 )
    .lineTo( 0.46193976625564337, 0.19134171618254492 )
    .lineTo( 0.4784701678661044, 0.14514233862723122 )
    // top right
    .closePath();
  pathtest.getTriangles();
  pathtest = new H3DU.GraphicsPath().moveTo(-1, 1 )
    // bottom middle
    .lineTo( 0.19134171618254492, 0.46193976625564337 )
    // downward curve
    .lineTo( 0.2356983684129989, 0.44096063217417747 )
    .lineTo( 0.27778511650980114, 0.4157348061512726 )
    .lineTo( 0.31719664208182274, 0.3865052266813685 )
    .lineTo( 0.3535533905932738, 0.35355339059327373 )
    .lineTo( 0.3865052266813685, 0.31719664208182274 )
    .lineTo( 0.4157348061512726, 0.2777851165098011 )
    .lineTo( 0.4409606321741775, 0.23569836841299877 )
    .lineTo( 0.46193976625564337, 0.19134171618254492 )
    .lineTo( 0.4784701678661044, 0.14514233862723122 )
    // top right
    .closePath();
  pathtest.getTriangles();
});

export {clog, getFailedTests, test};
