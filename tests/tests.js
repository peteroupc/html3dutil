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
  info("got "+b+", expected "+a)
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

function testPathBounds(){
ok(isApproxVec(GraphicsPath.fromString('M10.17,32.62C40.49,75.63,98.83,23.03,84.28,80.12').getBounds(),[10.17,32.62,86.51662109375,80.12]))
ok(isApproxVec(GraphicsPath.fromString('M34.05,50.94C19.89,58.68,84.2,47.14,66.59,13.17').getBounds(),[32.105019531249994,13.17,69.66701171875,53.23954833984375]))
ok(isApproxVec(GraphicsPath.fromString('M13.26,73.71C7.49,23.06,86.16,35.78,82.78,17.11').getBounds(),[13.127009277343749,17.11,82.78,73.71]))
ok(isApproxVec(GraphicsPath.fromString('M10.09,97.95C72.38,96.75,67.23,88.81,17.07,82.27').getBounds(),[10.09,82.27,55.74875,97.95]))
ok(isApproxVec(GraphicsPath.fromString('M78.26,77.3C75.43,56.5,48.78,60.31,26.41,59.23').getBounds(),[26.41,59.23,78.26,77.3]))
ok(isApproxVec(GraphicsPath.fromString('M60.94,33.22C49.69,57.78,48.87,49.97,80.98,64.09').getBounds(),[53.87042968750001,33.22,80.98,64.09]))
ok(isApproxVec(GraphicsPath.fromString('M46.7,40.24C95.31,9.42,39.98,51.88,18.01,17.23').getBounds(),[18.01,17.23,66.0107666015625,40.24]))
ok(isApproxVec(GraphicsPath.fromString('M45.94,39.33C60.84,54.73,75.68,99.6,64.24,26.19').getBounds(),[45.94,26.19,68.3021875,66.99465087890624]))
ok(isApproxVec(GraphicsPath.fromString('M31.31,75.23C5.03,42.23,35.36,35.58,67.23,29.93').getBounds(),[21.35390625,29.93,67.23,75.23]))
ok(isApproxVec(GraphicsPath.fromString('M41.58,55.02C44.64,24.37,98.7,48.12,1.42,64.94').getBounds(),[1.42,40.25455078125,59.141733398437495,64.94]))
ok(isApproxVec(GraphicsPath.fromString('M36.24,27.64C60.57,97.78,28.78,33.76,4.12,33.68').getBounds(),[4.12,27.64,44.95328125,60.39542968749999]))
ok(isApproxVec(GraphicsPath.fromString('M33.42,85.3C71.18,94.02,85.31,85.67,84.39,67.85').getBounds(),[33.42,67.85,84.39,88.75812499999999]))
ok(isApproxVec(GraphicsPath.fromString('M84.7,9.06C44.98,99.04,64.67,60.98,8.47,71.21').getBounds(),[8.47,9.06,84.7,71.21]))
ok(isApproxVec(GraphicsPath.fromString('M16.31,47.7C17.76,99.11,99.99,99.28,27.25,70.55').getBounds(),[16.31,47.7,57.236901855468744,89.7924462890625]))
ok(isApproxVec(GraphicsPath.fromString('M76.36,79.23C97.32,64.71,13.33,63.7,78.15,29.74').getBounds(),[53.2337890625,29.74,79.79609375,79.23]))
ok(isApproxVec(GraphicsPath.fromString('M45.39,14.54C36.34,37.47,20.75,89.98,57.45,44.48').getBounds(),[34.26375,14.54,57.45,62.31612060546876]))
ok(isApproxVec(GraphicsPath.fromString('M69.52,4.79C58.54,28.75,37.28,89.1,50.61,80.21').getBounds(),[46.39703125,4.79,69.52,81.09125732421874]))
ok(isApproxVec(GraphicsPath.fromString('M83.66,75.81C42.81,27.07,4.09,6.6,17.93,33.81').getBounds(),[15.105253906249999,21.677028808593747,83.66,75.81]))
ok(isApproxVec(GraphicsPath.fromString('M83.95,53.55C10.28,88.85,2.8,72.6,59.82,36.42').getBounds(),[22.15988037109375,36.42,83.95,73.1823046875]))
ok(isApproxVec(GraphicsPath.fromString('M95.42,53.15C92.2,25.98,49.52,5.06,95.12,72.48').getBounds(),[74.32683593750001,27.34375,95.42,72.48]))
ok(isApproxVec(GraphicsPath.fromString('M31.65,27.09C17.07,83.56,31.91,9.59,77.57,91.46').getBounds(),[26.253124999999997,27.09,77.57,91.46]))
ok(isApproxVec(GraphicsPath.fromString('M51.65,22.13C2.02,73.65,12.39,48.82,7.81,36.57').getBounds(),[7.81,22.13,51.65,53.35541748046875]))
ok(isApproxVec(GraphicsPath.fromString('M90.07,76.63C66.23,89.94,19.46,16.1,59.76,79.64').getBounds(),[44.13060546875,53.467185058593756,90.07,79.64]))
ok(isApproxVec(GraphicsPath.fromString('M79.11,7.06C57.18,88.59,36.46,19,36.48,6.3').getBounds(),[36.48,6.3,79.11,45.99677734375]))
ok(isApproxVec(GraphicsPath.fromString('M34.13,15.1C98.74,37.77,75.21,34.98,16,89').getBounds(),[16,15.1,72.71199707031249,89]))
ok(isApproxVec(GraphicsPath.fromString('M81.11,93.77C68.98,96.96,53.73,36.73,60.82,68.47').getBounds(),[59.0202197265625,59.291911621093746,81.11,93.77]))
ok(isApproxVec(GraphicsPath.fromString('M12.32,6.61C8.42,3.23,8.44,64.75,31.99,54.23').getBounds(),[10.436406250000001,6.61,31.99,55.3917138671875]))
ok(isApproxVec(GraphicsPath.fromString('M47.69,42.54C63.14,72.23,80.31,36.9,21.35,33.65').getBounds(),[21.35,33.65,62.42375,54.13343750000001]))
ok(isApproxVec(GraphicsPath.fromString('M99.07,65.54C60.93,28.27,54.99,22.69,89.13,57.54').getBounds(),[66.67606445312501,34.28314941406251,99.07,65.54]))
ok(isApproxVec(GraphicsPath.fromString('M56.86,72.83C75.75,24.5,0.7,69.99,36.12,63.6').getBounds(),[26.49995361328125,50.3556640625,59.939550781250006,72.83]))
ok(isApproxVec(GraphicsPath.fromString('M88.51,90.78C40.07,84.78,95.44,73.34,17.98,77.09').getBounds(),[17.98,76.35548828125,88.51,90.78]))
ok(isApproxVec(GraphicsPath.fromString('M52.67,20.23C37.53,20.02,83.12,30.49,23.09,68.98').getBounds(),[23.09,20.23,54.837675781250006,68.98]))
ok(isApproxVec(GraphicsPath.fromString('M9.69,7.24C14,71.69,56.57,46.69,15.08,51.3').getBounds(),[9.69,7.24,32.743906249999995,52.3269140625]))
ok(isApproxVec(GraphicsPath.fromString('M99.41,48.82C13.57,62.28,43.04,40.51,64.33,61.75').getBounds(),[41.69625,48.82,99.41,61.75]))
ok(isApproxVec(GraphicsPath.fromString('M42.59,56.88C75.37,67.95,20.01,24.31,69.56,28.66').getBounds(),[42.59,28.3816845703125,69.56,58.66730468750001]))
ok(isApproxVec(GraphicsPath.fromString('M51.06,14.13C39.98,90.46,64.26,25.52,2.49,90.26').getBounds(),[2.49,14.13,51.06,90.26]))
ok(isApproxVec(GraphicsPath.fromString('M10.6,93.8C76.68,75.86,30.69,15.48,61.41,85.47').getBounds(),[10.6,52.618066406249994,61.41,93.8]))
ok(isApproxVec(GraphicsPath.fromString('M11.2,31.74C43.26,61,51.03,51.56,10.02,15.59').getBounds(),[10.02,15.59,38.01125,48.972714843750005]))
ok(isApproxVec(GraphicsPath.fromString('M49.24,99.68C39.19,68.83,79.56,66.61,42.86,40.07').getBounds(),[42.86,40.07,58.35669921875,99.68]))
ok(isApproxVec(GraphicsPath.fromString('M50.5,19.33C14.19,23.1,43.27,70.12,97.08,56.75').getBounds(),[34.8928125,19.33,97.08,59.135390625]))
ok(isApproxVec(GraphicsPath.fromString('M27.53,14.52C20.1,33.56,88.52,82.14,56.06,90.24').getBounds(),[26.982595214843748,14.52,64.84403076171873,90.24]))
ok(isApproxVec(GraphicsPath.fromString('M49.13,71.14C31.11,86.37,99.74,88.16,97.03,55.61').getBounds(),[46.12564453125,55.61,97.03,81.50160156249999]))
ok(isApproxVec(GraphicsPath.fromString('M80.88,25.42C39,41.91,80.14,3.21,10.21,34.05').getBounds(),[10.21,21.704089355468746,80.88,34.05]))
ok(isApproxVec(GraphicsPath.fromString('M1.16,16.46C74.58,96.79,4.58,95.05,45.52,58.52').getBounds(),[1.16,16.46,45.52,82.52931640624999]))
ok(isApproxVec(GraphicsPath.fromString('M98.55,39.11C55.89,13.59,8.22,3.78,92.43,43.36').getBounds(),[46.11181640625,16.822499999999998,98.55,43.36]))
ok(isApproxVec(GraphicsPath.fromString('M4.22,13.85C15.06,61.18,40.26,26.97,7.38,37.35').getBounds(),[4.22,13.85,23.687578125,39.45625]))
ok(isApproxVec(GraphicsPath.fromString('M23.91,85.57C13.09,3.51,86.49,69.28,59.88,81.08').getBounds(),[22.82322509765625,44.976484375,65.53060546875,85.57]))
ok(isApproxVec(GraphicsPath.fromString('M4.68,61.2C97.42,48.71,89.13,22.97,52.33,57.07').getBounds(),[4.68,40.09814453125,78.18618164062501,61.2]))
ok(isApproxVec(GraphicsPath.fromString('M28.53,40.31C86.78,77.19,12.1,31.25,16.59,8.74').getBounds(),[16.59,8.74,50.6678173828125,54.101406250000004]))
ok(isApproxVec(GraphicsPath.fromString('M28.87,26.11C36.72,64.91,49.02,5.34,22.93,90.09').getBounds(),[22.93,26.11,38.6275,90.09]))
ok(isApproxVec(GraphicsPath.fromString('M91.06,70.87C93.69,53.51,27.73,5.89,12.83,67.03').getBounds(),[12.83,36.7994921875,91.06,70.87]))
ok(isApproxVec(GraphicsPath.fromString('M12.81,44.67C79.63,47.02,27.76,24.46,25.11,28.29').getBounds(),[12.81,27.9905859375,46.76478515625,44.831235351562505]))
ok(isApproxVec(GraphicsPath.fromString('M91.13,45.61C60.67,59.39,93.58,10.06,94.07,97.77').getBounds(),[78.54529296875,43.96625,94.07,97.77]))
ok(isApproxVec(GraphicsPath.fromString('M80.21,31.66C91.71,76.71,88.69,65.8,56.21,13.59').getBounds(),[56.21,13.59,86.28141113281248,59.8824755859375]))
ok(isApproxVec(GraphicsPath.fromString('M19.84,0.27C26.77,13.34,8.63,99.52,93.24,66.22').getBounds(),[19.84,0.27,93.24,73.61935791015625]))
ok(isApproxVec(GraphicsPath.fromString('M57.58,89.36C10.21,92.93,65.11,89.4,48.78,78.87').getBounds(),[38.28449218749999,78.87,57.58,90.7078125]))
ok(isApproxVec(GraphicsPath.fromString('M79.1,37.4C22.19,36.4,87.61,74.41,49.56,15.62').getBounds(),[49.56,15.62,79.1,48.181250000000006]))
ok(isApproxVec(GraphicsPath.fromString('M59.74,42.76C72.18,89.36,90.96,18.9,97.49,89.21').getBounds(),[59.74,42.76,97.49,89.21]))
ok(isApproxVec(GraphicsPath.fromString('M93.42,11.65C52.29,59.27,37.34,24.7,7.73,3.28').getBounds(),[7.73,3.28,93.42,35.576289062499995]))
ok(isApproxVec(GraphicsPath.fromString('M32.93,5.67C48,19.15,55.82,62.7,66.71,41.13').getBounds(),[32.93,5.67,66.71,46.584843750000005]))
ok(isApproxVec(GraphicsPath.fromString('M49.35,42.22C45.56,24.5,13.19,5.82,91.33,26.79').getBounds(),[39.616249999999994,17.507517089843752,91.33,42.22]))
ok(isApproxVec(GraphicsPath.fromString('M31.5,35.22C48.65,10.11,59.83,53.59,61.2,78.62').getBounds(),[31.5,27.888125000000002,61.2,78.62]))
ok(isApproxVec(GraphicsPath.fromString('M47.11,44.65C38.25,61.58,79.79,16.66,37.57,27.61').getBounds(),[37.57,25.892734375,56.80609375,48.425869140625]))
ok(isApproxVec(GraphicsPath.fromString('M0.88,58.57C29.54,64.01,7.94,8.4,87.77,54.58').getBounds(),[0.88,36.138056640624995,87.77,58.914326171875004]))
ok(isApproxVec(GraphicsPath.fromString('M48.3,76.83C44.45,89.39,99.05,86.17,98.79,14.97').getBounds(),[48.235422363281245,14.97,98.79,82.47562500000001]))
ok(isApproxVec(GraphicsPath.fromString('M67.68,95.87C1.11,62.37,84.63,69.18,33.06,14.96').getBounds(),[33.06,14.96,67.68,95.87]))
ok(isApproxVec(GraphicsPath.fromString('M75.09,18.94C55.28,85.3,84.25,11.95,84.39,98.5').getBounds(),[68.16609374999999,18.94,84.39,98.5]))
ok(isApproxVec(GraphicsPath.fromString('M47.11,26.87C45.73,1.22,9.28,39.18,11.18,19.1').getBounds(),[11.18,17.65859375,47.11,26.87]))
ok(isApproxVec(GraphicsPath.fromString('M83.61,38.65C35.8,87.77,78.58,80.78,89.18,91.7').getBounds(),[61.56720703125,38.65,89.18,91.7]))
ok(isApproxVec(GraphicsPath.fromString('M88.18,13.02C21.66,80.15,95.15,67.42,38.81,54.38').getBounds(),[38.81,13.02,88.18,64.72419921874999]))
ok(isApproxVec(GraphicsPath.fromString('M30.85,92.91C87.48,89.87,0.97,58.26,64.89,29.82').getBounds(),[30.85,29.82,64.89,92.91]))
ok(isApproxVec(GraphicsPath.fromString('M33.4,93.87C14.41,65.92,28.83,47.4,63.27,10.88').getBounds(),[25.212656250000002,10.88,63.27,93.87]))
ok(isApproxVec(GraphicsPath.fromString('M19.05,0.67C87.5,54.51,30.79,52.18,34.01,87.91').getBounds(),[19.05,0.67,53.01498046875,87.91]))
ok(isApproxVec(GraphicsPath.fromString('M92.05,75.31C55.5,32.44,42.1,0.88,37.14,32.5').getBounds(),[37.14,19.820781249999996,92.05,75.31]))
ok(isApproxVec(GraphicsPath.fromString('M80.16,14.26C69.3,67.35,32.66,81.38,48.09,8.65').getBounds(),[44.38921142578124,8.65,80.16,58.637499999999996]))
ok(isApproxVec(GraphicsPath.fromString('M85.62,5.64C7.46,81.28,12.36,76.95,48.66,21.48').getBounds(),[23.3727392578125,5.64,85.62,62.72625000000001]))
ok(isApproxVec(GraphicsPath.fromString('M46.34,80.56C16.33,82.48,67.65,94.31,19.24,30.15').getBounds(),[19.24,30.15,46.34,82.5159375]))
ok(isApproxVec(GraphicsPath.fromString('M24.76,95.28C26.54,66.86,63.52,91.43,20.38,57.48').getBounds(),[20.38,57.48,41.193203125,95.28]))
ok(isApproxVec(GraphicsPath.fromString('M40.9,50.48C8.3,3.63,97.24,49.51,36.72,78.41').getBounds(),[33.59479492187501,30.37703369140625,58.32062499999999,78.41]))
ok(isApproxVec(GraphicsPath.fromString('M50.69,66.52C31.57,1.01,73.91,59.08,62.62,87.45').getBounds(),[45.65845947265625,36.631718750000005,64.56462890625,87.45]))
ok(isApproxVec(GraphicsPath.fromString('M40.13,89.76C38.41,39.08,18.74,18.12,31.87,22.17').getBounds(),[27.37953125,21.832792968750002,40.13,89.76]))
ok(isApproxVec(GraphicsPath.fromString('M63.27,57.46C48.56,75.81,88.79,43.05,3.67,48.23').getBounds(),[3.67,47.681618652343744,63.27,63.030781250000004]))
ok(isApproxVec(GraphicsPath.fromString('M40.63,54.54C10.22,43.54,15.65,43.59,88.49,69.11').getBounds(),[23.20357421875,47.5871484375,88.49,69.11]))
ok(isApproxVec(GraphicsPath.fromString('M7.31,52.57C18.71,15.44,84.33,37.53,86.69,59.24').getBounds(),[7.31,32.63921875,86.69,59.24]))
ok(isApproxVec(GraphicsPath.fromString('M72.92,35.41C17.61,42.31,39.95,52.2,17.54,1.66').getBounds(),[17.54,1.66,72.92,41.08949218750001]))
ok(isApproxVec(GraphicsPath.fromString('M61.84,5.04C50.02,54.49,6.66,14.83,81.38,31.59').getBounds(),[39.1575,5.04,81.38,31.59]))
ok(isApproxVec(GraphicsPath.fromString('M9.45,28.65C15.8,9.18,3.01,28.44,73.2,57.19').getBounds(),[9.45,20.8525,73.2,57.19]))
ok(isApproxVec(GraphicsPath.fromString('M39.47,15.22C58.71,84.78,42.46,39.95,82.54,36.18').getBounds(),[39.47,15.22,82.54,53.41427734375]))
ok(isApproxVec(GraphicsPath.fromString('M10.27,39.77C8.91,93.01,81.93,56.19,74.12,66.47').getBounds(),[10.27,39.77,74.67504150390626,69.23]))
ok(isApproxVec(GraphicsPath.fromString('M38.9,57.36C59.7,82.81,23.25,29.73,41.87,15.35').getBounds(),[36.475625,15.35,45.520624999999995,64.16592041015625]))
ok(isApproxVec(GraphicsPath.fromString('M43.32,57.78C81.95,13.41,76.57,78.36,90.48,81.67').getBounds(),[43.32,42.32875,90.48,81.67]))
ok(isApproxVec(GraphicsPath.fromString('M96.72,35.49C29.9,77.5,7.57,41.56,65.4,28.5').getBounds(),[32.27771484375,28.5,96.72,55.18330078125]))
ok(isApproxVec(GraphicsPath.fromString('M15.28,15.18C33.99,43.01,33.15,94.55,96.54,7.14').getBounds(),[15.28,7.14,96.54,55.699116210937504]))
ok(isApproxVec(GraphicsPath.fromString('M2.54,5.25C50.96,57.98,1.82,72.88,31.73,32.84').getBounds(),[2.54,5.25,31.73,55.60947265624999]))
ok(isApproxVec(GraphicsPath.fromString('M73.1,20.59C16.49,7.35,90.72,50.94,21.75,75.19').getBounds(),[21.75,18.14013671875,73.1,75.19]))
ok(isApproxVec(GraphicsPath.fromString('M47.13,71.31C23.09,64.02,3.73,59.98,19.14,61.84').getBounds(),[13.631718750000001,61.41388671875001,47.13,71.31]))
ok(isApproxVec(GraphicsPath.fromString('M2.94,4.77C44.8,58.93,24.45,99.21,37.53,46.61').getBounds(),[2.94,4.77,37.53,71.12245117187499]))
ok(isApproxVec(GraphicsPath.fromString('M83.21,52.67C61.61,92.66,18.52,83.14,71.63,69.93').getBounds(),[46.259316406249994,52.67,83.21,81.3122802734375]))
ok(isApproxVec(GraphicsPath.fromString('M54.54,90.51C62.98,30.07,28.9,3.64,70.28,27.62').getBounds(),[49.3405859375,18.830625,70.28,90.51]))
ok(isApproxVec(GraphicsPath.fromString('M7.59,50.45C34.39,9.24,74.69,78.98,38.08,55.3').getBounds(),[7.59,37.15234375,52.628742675781254,60.200097656249994]))
ok(isApproxVec(GraphicsPath.fromString('M23.176320805214345,72.58579162880778C30.914092040620744,1.7501254798844457,85.15654122456908,71.70227160677314,53.0909962952137,77.26886065211147').getBounds(),[23.176320805214345,41.16238966333867,63.03260409695213,77.26886065211147]))
ok(isApproxVec(GraphicsPath.fromString('M57.40949450992048,69.61565711535513C60.4246748611331,42.15931270737201,54.27083142567426,12.73299646563828,75.13788894284517,92.05450234003365').getBounds(),[57.40949450992048,40.79338587180246,75.13788894284517,92.05450234003365]))
ok(isApproxVec(GraphicsPath.fromString('M85.69335869979113,97.54312762524933C67.63696430716664,49.98575649224222,88.35855824872851,89.37044283375144,9.41205385606736,68.61877876799554').getBounds(),[9.41205385606736,68.61877876799554,85.69335869979113,97.54312762524933]))
ok(isApproxVec(GraphicsPath.fromString('M81.66874563321471,95.4511156771332C74.61570731829852,90.40524994488806,95.89529042132199,18.70860462076962,29.92812932934612,51.38362848665565').getBounds(),[29.92812932934612,42.884531803542814,81.66874563321471,95.4511156771332]))
ok(isApproxVec(GraphicsPath.fromString('M60.358879319392145,58.86055929586291Q67.10536221507937,57.04082252923399,5.305499373935163,58.39877021498978').getBounds(),[5.305499373935163,57.82717132678954,60.97446339117596,58.86055929586291]))
ok(isApproxVec(GraphicsPath.fromString('M59.16087017394602,3.624749951995909Q16.2521235877648,85.6782908551395,18.491713423281908,95.6650372594595').getBounds(),[18.491713423281908,3.624749951995909,59.16087017394602,95.6650372594595]))
ok(isApproxVec(GraphicsPath.fromString('M74.48113292921335,46.1935737170279Q30.424571712501347,44.14353799074888,65.1233333395794,33.71596785727888').getBounds(),[50.11340242344886,33.71596785727888,74.48113292921335,46.1935737170279]))
ok(isApproxVec(GraphicsPath.fromString('M68.40572508517653,43.087152391672134Q60.194276669062674,3.6152059910818934,86.50688773486763,48.132944223470986').getBounds(),[66.45775459473953,24.612627149326727,86.50688773486763,48.132944223470986]))
ok(isApproxVec(GraphicsPath.fromString('M51.81,79.72Q89.52,60.39,34.3,83.29').getBounds(),[34.3,70.88933593750001,67.02421874999999,83.29]))
ok(isApproxVec(GraphicsPath.fromString('M54.88,74.74Q93.33,95.26,57.71,85.96').getBounds(),[54.88,74.74,74.8125,88.74625]))
ok(isApproxVec(GraphicsPath.fromString('M46.47,50.04Q23.95,88.31,59.58,49.32').getBounds(),[37.75734375,49.32,59.58,68.995]))
ok(isApproxVec(GraphicsPath.fromString('M17.6,67.36Q43.71,89.26,91.58,53.06').getBounds(),[17.6,53.06,91.58,75.6146875]))
ok(isApproxVec(GraphicsPath.fromString('M92.45,5.63Q81.48,8.68,96.81,36.88').getBounds(),[87.92093750000001,5.63,96.81,36.88]))
ok(isApproxVec(GraphicsPath.fromString('M19.24,83.84Q0.14,88.55,0.18,79.96').getBounds(),[0.18,79.96,19.24,85.50218749999999]))
ok(isApproxVec(GraphicsPath.fromString('M31.74,20.61Q78.96,30.24,11.95,90.24').getBounds(),[11.95,20.61,51.1931640625,90.24]))
ok(isApproxVec(GraphicsPath.fromString('M62.3,99.01Q53.67,33.54,2.97,68.47').getBounds(),[2.97,56.39125,62.3,99.01]))
ok(isApproxVec(GraphicsPath.fromString('M51.95,15.51Q15.61,20.21,97.16,76.37').getBounds(),[40.7501953125,15.51,97.16,76.37]))
ok(isApproxVec(GraphicsPath.fromString('M44.56,45.59Q50.36,92.95,85.15,4.1').getBounds(),[44.56,4.1,85.15,61.95546875000001]))
ok(isApproxVec(GraphicsPath.fromString('M85.54,35.98Q28.23,9.16,92.8,64.52').getBounds(),[58.7,27.242890625,92.8,64.52]))
ok(isApproxVec(GraphicsPath.fromString('M12.83,32.17Q71.7,17.4,62.83,53.89').getBounds(),[12.83,27.98875,63.9890625,53.89]))
ok(isApproxVec(GraphicsPath.fromString('M47.89,62.33Q72.73,2.18,26.94,15.8').getBounds(),[26.94,13.2859765625,56.58765625000001,62.33]))
ok(isApproxVec(GraphicsPath.fromString('M66.88,83.59Q84.95,46.75,66.17,66.32').getBounds(),[66.17,59.57515624999999,75.7375,83.59]))
ok(isApproxVec(GraphicsPath.fromString('M99.65,23.57Q33.96,31.94,90.67,23.74').getBounds(),[64.476875,23.57,99.65,27.7975]))
ok(isApproxVec(GraphicsPath.fromString('M49.72,19.76Q69.84,74.11,91.45,76.42').getBounds(),[49.72,19.76,91.45,76.42]))
ok(isApproxVec(GraphicsPath.fromString('M97.94,12.06Q53.92,70.47,33.91,76.1').getBounds(),[33.91,12.06,97.94,76.1]))
ok(isApproxVec(GraphicsPath.fromString('M61.45,94.87Q50.35,62.72,25.25,48.38').getBounds(),[25.25,48.38,61.45,94.87]))
ok(isApproxVec(GraphicsPath.fromString('M65.18,22.31Q72.59,49.17,49.34,51.69').getBounds(),[49.34,22.31,66.96875,51.69]))
ok(isApproxVec(GraphicsPath.fromString('M84.12,83.78Q0.52,38.22,56.78,64.21').getBounds(),[34.252812500000005,54.77921875,84.12,83.78]))
ok(isApproxVec(GraphicsPath.fromString('M19.33,64.4Q66.31,15.51,80.2,34.46').getBounds(),[19.33,29.225,80.2,64.4]))
ok(isApproxVec(GraphicsPath.fromString('M28,82.14Q32.22,4.17,74.27,51.74').getBounds(),[28,33.7165625,74.27,82.14]))
ok(isApproxVec(GraphicsPath.fromString('M36.92,87.38Q89.79,9.24,83.17,47.6').getBounds(),[36.92,35.001953125,83.89546875,87.38]))
ok(isApproxVec(GraphicsPath.fromString('M96.17,25.6Q19.44,12.37,10.65,85.23').getBounds(),[10.65,23.63765625,96.17,85.23]))
ok(isApproxVec(GraphicsPath.fromString('M17.1,52.86Q12.12,12.4,28.99,13.48').getBounds(),[15.975624999999999,13.48,28.99,52.86]))
ok(isApproxVec(GraphicsPath.fromString('M18.66,54.13Q92.2,54.13,10.29,37.54').getBounds(),[10.29,37.54,53.337500000000006,54.13]))
ok(isApproxVec(GraphicsPath.fromString('M65.78,11.92Q28.56,43.55,97.45,48.08').getBounds(),[52.786718750000006,11.92,97.45,48.08]))
ok(isApproxVec(GraphicsPath.fromString('M80.68,45Q42.06,90.96,66.03,69.23').getBounds(),[56.85421875,45,80.68,76.20089843749999]))
ok(isApproxVec(GraphicsPath.fromString('M41.02,47.08Q46.23,40.75,77.6,20.53').getBounds(),[41.02,20.53,77.6,47.08]))
ok(isApproxVec(GraphicsPath.fromString('M55.8,40.02Q59.46,93.48,51.35,50.77').getBounds(),[51.35,40.02,56.894375,69.4375]))
ok(isApproxVec(GraphicsPath.fromString('M53.1,43.28Q31.84,80.92,43.73,4.31').getBounds(),[39.47421874999999,4.31,53.1,55.64777343750001]))
ok(isApproxVec(GraphicsPath.fromString('M86.9,25.63Q25.71,63.07,89.5,60.57').getBounds(),[56.955000000000005,25.63,89.5,60.726484375]))
ok(isApproxVec(GraphicsPath.fromString('M45.32,38.14Q49.68,1.25,65.88,51.42').getBounds(),[45.32,22.715312500000003,65.88,51.42]))
ok(isApproxVec(GraphicsPath.fromString('M28.07,90.37Q1.94,89.18,18.52,12.46').getBounds(),[12.091093749999999,12.46,28.07,90.37]))
ok(isApproxVec(GraphicsPath.fromString('M48.49,69.15Q9.57,4.57,31.32,66.79').getBounds(),[23.53921875,36.27,48.49,69.15]))
ok(isApproxVec(GraphicsPath.fromString('M19.53,85.27Q95.72,52.63,91.36,97.49').getBounds(),[19.53,71.543984375,91.59035156249999,97.49]))
ok(isApproxVec(GraphicsPath.fromString('M70.01,27.99Q13.23,62.02,37.79,32.01').getBounds(),[30.383359374999998,27.99,70.01,46.01109375]))
ok(isApproxVec(GraphicsPath.fromString('M25.54,65.35Q41.18,83.03,98.3,52.32').getBounds(),[25.54,52.32,98.3,71.80515625000001]))
ok(isApproxVec(GraphicsPath.fromString('M22.58,13.57Q1.61,40.61,58.16,47.23').getBounds(),[16.939999999999998,13.57,58.16,47.23]))
ok(isApproxVec(GraphicsPath.fromString('M34.68,24.49Q42.86,81.68,25.27,37.04').getBounds(),[25.27,24.49,37.19109374999999,56.2225]))
ok(isApproxVec(GraphicsPath.fromString('M82.71,34.87Q36.04,62.1,87.06,32.13').getBounds(),[60.4625,32.13,87.06,47.8]))
ok(isApproxVec(GraphicsPath.fromString('M97.75,35.32Q30.68,88.09,34.86,86.59').getBounds(),[34.86,35.32,97.75,86.59]))
ok(isApproxVec(GraphicsPath.fromString('M39.17,53.92Q36.21,52.98,80.74,26.8').getBounds(),[39.17,26.8,80.74,53.92]))
ok(isApproxVec(GraphicsPath.fromString('M72.52,65.42Q92.64,61.93,42.76,98.53').getBounds(),[42.76,65.17390624999999,78.205,98.53]))
ok(isApproxVec(GraphicsPath.fromString('M30.42,44.79Q70.9,24.49,18.11,42.86').getBounds(),[18.11,34.1575,47.987539062500005,44.79]))
ok(isApproxVec(GraphicsPath.fromString('M40.48,90.27Q76.7,72.2,0.71,57.56').getBounds(),[0.71,57.56,51.865468750000005,90.27]))
ok(isApproxVec(GraphicsPath.fromString('M43.47,2.02Q67.81,78.61,35.01,79.16').getBounds(),[35.01,2.02,53.830546874999996,79.16]))
ok(isApproxVec(GraphicsPath.fromString('M58.96,79.88Q70.37,96.35,42.98,27.74').getBounds(),[42.98,27.74,62.24,82.7975]))
ok(isApproxVec(GraphicsPath.fromString('M72.39,44.48Q69.13,18.1,39.21,78.26').getBounds(),[39.21,36.698750000000004,72.39,78.26]))
ok(isApproxVec(GraphicsPath.fromString('M60.74,30.16Q91.84,97.5,93.2,87.36').getBounds(),[60.74,30.16,93.2,88.684375]))
ok(isApproxVec(GraphicsPath.fromString('M56.95,77.42Q95.52,56.02,15.67,81.66').getBounds(),[15.67,67.69875,69.49179687499999,81.66]))
ok(isApproxVec(GraphicsPath.fromString('M55.22,24.76Q55.89,39.88,31.57,49.35').getBounds(),[31.57,24.76,55.22,49.35]))
ok(isApproxVec(GraphicsPath.fromString('M0.14,13.79Q14.98,11.28,24.71,16.55').getBounds(),[0.14,13.021249999999998,24.71,16.55]))
ok(isApproxVec(GraphicsPath.fromString('M33.18,96.02Q58.81,68.46,23.55,11.59').getBounds(),[23.55,11.59,43.83984375,96.02]))
ok(isApproxVec(GraphicsPath.fromString('M31.46,43.31Q55.57,3.69,90.87,36.01').getBounds(),[31.46,21.674999999999997,90.87,43.31]))
ok(isApproxVec(GraphicsPath.fromString('M38.56,47.18Q23.05,41.73,36.78,63.65').getBounds(),[30.36,46.165625,38.56,63.65]))
ok(isApproxVec(GraphicsPath.fromString('M25.16,59.34Q47.21,7.4,80,16.87').getBounds(),[25.16,15.46203125,80,59.34]))
ok(isApproxVec(GraphicsPath.fromString('M45.72,40.52Q9.04,25.96,75.39,35.75').getBounds(),[32.69859374999999,31.83171875,75.39,40.52]))
ok(isApproxVec(GraphicsPath.fromString('M82.72,73.92Q77.04,6.33,98.53,6.32').getBounds(),[81.578125,6.32,98.53,73.92]))
ok(isApproxVec(GraphicsPath.fromString('M30.25,79.9Q1.51,84.01,64.41,40.11').getBounds(),[21.23671875,40.11,64.41,80.22621093750001]))
ok(isApproxVec(GraphicsPath.fromString('M65.1,49.21Q93.1,45.19,79.62,75.32').getBounds(),[65.1,48.73859375,83.896875,75.32]))
ok(isApproxVec(GraphicsPath.fromString('M79.91,81.37Q75.48,87.14,11.48,34.68').getBounds(),[11.48,34.68,79.91,81.90265625]))
ok(isApproxVec(GraphicsPath.fromString('M0.58,32.86Q29.3,60.81,68.81,16.14').getBounds(),[0.58,16.14,68.81,43.610312500000006]))
ok(isApproxVec(GraphicsPath.fromString('M77.56,28.41Q3.9,17.12,62.36,0.89').getBounds(),[36.49609375,0.89,77.56,28.41]))
ok(isApproxVec(GraphicsPath.fromString('M37.96,23.84Q35.59,24.34,31.56,10.42').getBounds(),[31.56,10.42,37.96,23.84]))
ok(isApproxVec(GraphicsPath.fromString('M22.16,50.32Q5.71,61.44,33.42,41.84').getBounds(),[16.0325,41.84,33.42,54.33999999999999]))
ok(isApproxVec(GraphicsPath.fromString('M19.32,93.28Q50.3,60.66,35.22,94.04').getBounds(),[19.32,77.16,40.052812499999995,94.04]))
ok(isApproxVec(GraphicsPath.fromString('M61.07,10.51Q33.63,82.37,41.62,45.79').getBounds(),[39.839375000000004,10.51,61.07,58.062656249999996]))
ok(isApproxVec(GraphicsPath.fromString('M30.01,62.17Q49.48,20.49,85.76,11.38').getBounds(),[30.01,11.38,85.76,62.17]))
ok(isApproxVec(GraphicsPath.fromString('M33.47,89.83Q86.7,17.79,32.79,9.68').getBounds(),[32.79,9.68,59.915000000000006,89.83]))
ok(isApproxVec(GraphicsPath.fromString('M71.67,88.34Q84.15,65.59,49,24.56').getBounds(),[49,24.56,74.93312499999999,88.34]))
ok(isApproxVec(GraphicsPath.fromString('M94.59,37.58Q93.32,24.57,36.98,25.4').getBounds(),[36.98,25.4,94.59,37.58]))
ok(isApproxVec(GraphicsPath.fromString('M1.55,12.26Q63.28,91.7,62.47,38.6').getBounds(),[1.55,12.26,62.47,59.7865625]))
ok(isApproxVec(GraphicsPath.fromString('M56.44,95.34Q60.05,46.03,98.74,39.42').getBounds(),[56.44,39.42,98.74,95.34]))
ok(isApproxVec(GraphicsPath.fromString('M99.72,26.54Q44.78,11.91,6.61,64.07').getBounds(),[6.61,23.399375,99.72,64.07]))
ok(isApproxVec(GraphicsPath.fromString('M51.7,13.69Q79.73,29.83,76.95,69.89').getBounds(),[51.7,13.69,77.16359375000002,69.89]))
ok(isApproxVec(GraphicsPath.fromString('M19.55,4.37Q74.54,3.33,90.44,98.55').getBounds(),[19.55,4.37,90.44,98.55]))
ok(isApproxVec(GraphicsPath.fromString('M6.19,55.69Q0.61,54.54,6.03,6.39').getBounds(),[3.3600000000000003,6.39,6.19,55.69]))
ok(isApproxVec(GraphicsPath.fromString('M42.81,70.45Q61.37,92.21,53.74,58.46').getBounds(),[42.81,58.46,55.918125,78.96390625]))
ok(isApproxVec(GraphicsPath.fromString('M92.52,78.2Q9.1,63.56,9.65,90.16').getBounds(),[9.65,73.019375,92.52,90.16]))
ok(isApproxVec(GraphicsPath.fromString('M28.13,70.08Q58.53,23.9,10.24,83.53').getBounds(),[10.24,49.9251953125,39.86421875,83.53]))
ok(isApproxVec(GraphicsPath.fromString('M23.56,97.02Q40.01,29.4,96.07,43.02').getBounds(),[23.56,40.884375000000006,96.07,97.02]))
ok(isApproxVec(GraphicsPath.fromString('M87.46,34.41Q5.35,72.21,87.78,32.7').getBounds(),[46.485,32.7,87.78,52.88249999999999]))
ok(isApproxVec(GraphicsPath.fromString('M63.23,14.54Q64.64,77.36,21.78,86.85').getBounds(),[21.78,14.54,63.23,86.85]))
ok(isApproxVec(GraphicsPath.fromString('M45.24,65.56Q87.47,94.04,75.64,92.59').getBounds(),[45.24,65.56,78.17625000000001,92.59]))
ok(isApproxVec(GraphicsPath.fromString('M86.49,22Q11.43,56.73,64.51,93.65').getBounds(),[42.591796875,22,86.49,93.65]))
ok(isApproxVec(GraphicsPath.fromString('M66.2,9.16Q17.33,69.77,39.63,90.62').getBounds(),[32.913281250000004,9.16,66.2,90.62]))
ok(isApproxVec(GraphicsPath.fromString('M80.29,21.38Q47.63,99.32,44.56,45.02').getBounds(),[44.56,21.38,80.29,67.2209375]))
ok(isApproxVec(GraphicsPath.fromString('M15.38,4.26Q51.91,54.17,89.15,54.52').getBounds(),[15.38,4.26,89.15,54.52]))
ok(isApproxVec(GraphicsPath.fromString('M12.48,86.14Q7.63,87.15,29.56,36.86').getBounds(),[11.685937500000001,36.86,29.56,86.14]))
ok(isApproxVec(GraphicsPath.fromString('M42.58,71.12Q66.82,53.42,30.94,19.19').getBounds(),[30.94,19.19,52.30562499999999,71.12]))
ok(isApproxVec(GraphicsPath.fromString('M96.91,59.14Q21.6,63.77,30.6,71.6').getBounds(),[29.66734375,59.14,96.91,71.6]))
ok(isApproxVec(GraphicsPath.fromString('M95.23,7.95Q14.69,39.88,27.06,10.51').getBounds(),[25.419218750000002,7.95,95.23,24.555]))
ok(isApproxVec(GraphicsPath.fromString('M65.97,75.74Q41.35,94.82,27.03,35.48').getBounds(),[27.03,35.48,65.97,80.37875]))
ok(isApproxVec(GraphicsPath.fromString('M10.73,92.76Q58.52,2.6,97.6,78.26').getBounds(),[10.73,43.796484375000006,97.6,92.76]))
ok(isApproxVec(GraphicsPath.fromString('M39.75,9.63Q46.52,4.64,24.21,22.63').getBounds(),[24.21,8.57125,41.3175,22.63]))
ok(isApproxVec(GraphicsPath.fromString('M30.41,21.48Q64.58,29.15,65.06,83.94').getBounds(),[30.41,21.48,65.06,83.94]))
ok(isApproxVec(GraphicsPath.fromString('M92.56,91.48Q18.3,2.6,37.6,46.49').getBounds(),[33.65171875,32.0245703125,92.56,91.48]))
ok(isApproxVec(GraphicsPath.fromString('M26.91,93.82Q27.34,11.68,54.25,25.4').getBounds(),[26.91,23.4678125,54.25,93.82]))
ok(isApproxVec(GraphicsPath.fromString('M17.9,95.35Q67.8,37.34,59.52,54.67').getBounds(),[17.9,50.713750000000005,60.680937500000006,95.35]))
ok(isApproxVec(GraphicsPath.fromString('M64.96,42.69A37.5,34.95,92.53,1139.82,20.02').getBounds(),[-2.4626138123421697,19.259057644186363,67.38308002072941,94.19796636575192]))
ok(isApproxVec(GraphicsPath.fromString('M53.47,3.16A61.82,45.75,324.03,0039.74,31.96').getBounds(),[39.74,3.16,53.47,31.96]))
ok(isApproxVec(GraphicsPath.fromString('M35.99,66.65A50.54,37.86,16.34,1127.72,35.11').getBounds(),[-62.20007893774094,13.7933766699675,35.99,91.68786356124343]))
ok(isApproxVec(GraphicsPath.fromString('M12.18,18.19A79.77116369934203,16.496464350700116,32.48,0176.74,90.97').getBounds(),[12.18,18.19,112.3330931934103,99.5831340761944]))
ok(isApproxVec(GraphicsPath.fromString('M87.23,0.27A42.54,47.4,227.39,1127.21,46.53').getBounds(),[27.21,0.27,117.62601149946464,88.78771444304594]))
ok(isApproxVec(GraphicsPath.fromString('M58.33,55.35A50.69719114799042,19.394706036924603,162,1121.49,27.96').getBounds(),[-8.67659100331629,27.96,58.33,65.85369279396713]))
ok(isApproxVec(GraphicsPath.fromString('M14.17,79.39A14.998633523489143,49.638334756309305,58.440000000000005,0081.54,21.51').getBounds(),[14.17,21.51,90.8683026968989,79.39]))
ok(isApproxVec(GraphicsPath.fromString('M22.54,47.32A30.188146440126655,36.48220013806812,295.81000000000006,0167.18,4.88').getBounds(),[9.640067112204946,-5.345326742042236,67.18,47.32]))
ok(isApproxVec(GraphicsPath.fromString('M35.39,43.14A54.5342155328251,14.211072050724844,214.51,1066.04,30.19').getBounds(),[35.39,30.19,96.31608542288907,69.70612277139702]))
ok(isApproxVec(GraphicsPath.fromString('M74.29,26.28A58.05,58.45,172.98,0155.22,59.15').getBounds(),[55.22,26.28,74.29,59.15]))
ok(isApproxVec(GraphicsPath.fromString('M9.7,90.29A37.19123096445465,46.06348023752844,72.77000000000001,115.59,15.24').getBounds(),[-37.66296820658141,15.24,9.7,90.80083967173402]))
ok(isApproxVec(GraphicsPath.fromString('M53.56,5.06A127.11048437203826,21.08149633238577,65,1111.82,15.26').getBounds(),[11.82,5.06,89.6966488177477,125.5926182848589]))
ok(isApproxVec(GraphicsPath.fromString('M3.82,70.54A47.77,61.99,296.51,0187.94,46.68').getBounds(),[3.82,36.5308225364042,87.94,70.54]))
ok(isApproxVec(GraphicsPath.fromString('M33.21,96.92A32.8,16.28,118.40000000000002,1042.71,55.18').getBounds(),[33.21,41.06398632669443,73.07741387603414,100.74094528289083]))
ok(isApproxVec(GraphicsPath.fromString('M37.75,56.36A24.48,7.35,200.33,1011.21,46.74').getBounds(),[3.0980518248701117,34.84231420516119,49.17518171693386,56.68157518778458]))
ok(isApproxVec(GraphicsPath.fromString('M8.61,30A41.34808180185523,44.47656213995272,268.53,1192.34,57.62').getBounds(),[8.61,2.5160618048387704,94.89741673230505,57.62]))
ok(isApproxVec(GraphicsPath.fromString('M42.5,8.52A44.69,23.28,129.62,018.78,12.25').getBounds(),[8.78,8.52,42.5,17.246757251557312]))
ok(isApproxVec(GraphicsPath.fromString('M53.77,17.14A47.09,33.61,204.3,1032.12,21.71').getBounds(),[-22.43602470335142,-50.699015805624526,67.57622917754176,21.71]))
ok(isApproxVec(GraphicsPath.fromString('M84.68,91.9A37.53269822455038,179.88079115645718,103.18999999999998,0063.42,10.28').getBounds(),[63.42,10.28,249.38284090782025,105.98553330349164]))
ok(isApproxVec(GraphicsPath.fromString('M96.16,52.46A60.24,39.77,92.86,0144.72,15.75').getBounds(),[44.72,15.75,96.16,56.727832121907156]))
ok(isApproxVec(GraphicsPath.fromString('M21.42,31.25A24.12,30.93,132.26,1057.17,68.83').getBounds(),[1.3631666631362904,31.25,57.17,86.04206896008765]))
ok(isApproxVec(GraphicsPath.fromString('M12.45,9.16A7.295752901995254,75.6995569562729,68.6,0053.4,8.27').getBounds(),[-37.605767704077564,8.27,53.4,37.15552943893442]))
ok(isApproxVec(GraphicsPath.fromString('M37.41,23.1A51.22,60.79,168.15999999999997,1087.96,0.98').getBounds(),[28.819877552765355,0.98,132.03849512118234,120.39006810169332]))
ok(isApproxVec(GraphicsPath.fromString('M87.75,41.25A33.000464543659604,54.71160498233015,203.88,1014.16,60.56').getBounds(),[14.16,-0.8740374849477632,88.38391033867603,60.56]))
ok(isApproxVec(GraphicsPath.fromString('M33.7,30.13A29.673637629104693,38.57830252040585,326.25,0014.64,92.13').getBounds(),[-8.359022976009037,25.114827980772105,33.7,92.13]))
ok(isApproxVec(GraphicsPath.fromString('M25.68,19.41A40.73476692529348,39.66947414144396,255.28,1093.42,62.85').getBounds(),[19.840539577992978,19.41,93.42,81.7834942775784]))
ok(isApproxVec(GraphicsPath.fromString('M58.47,36.88A60.55,52.85,90.57,0163.31,49.36').getBounds(),[58.47,36.88,63.31,49.36]))
ok(isApproxVec(GraphicsPath.fromString('M48.4,59.85A19.890383677486643,311.30566453530156,357.27,0185.6,7.53').getBounds(),[42.224547142537425,-277.23355600721294,85.6,59.85]))
ok(isApproxVec(GraphicsPath.fromString('M30.41,45.16A23.35784252396476,295.408008391319,185.97000000000003,0180.71,12.4').getBounds(),[30.41,-265.0293274904278,94.06746119382436,45.16]))
ok(isApproxVec(GraphicsPath.fromString('M52.94,95.54A54.99,44.21,84.55,0110.23,29.25').getBounds(),[9.640915954848161,29.25,52.94,95.54]))
ok(isApproxVec(GraphicsPath.fromString('M92.56,99.56A5.85,20.13,11.580000000000002,0185.2,83.43').getBounds(),[83.503367852639,83.43,92.56,106.30003753883447]))
ok(isApproxVec(GraphicsPath.fromString('M15.76,43.74A12.75880143645144,27.50955572166246,244.29000000000002,0056.83,45.22').getBounds(),[10.918708585489895,43.74,56.83,61.03373262917138]))
ok(isApproxVec(GraphicsPath.fromString('M27.15,10.42A83.16200554495234,27.139940925799504,6.31,0015.91,63.76').getBounds(),[-61.14434077387184,8.624595519683893,27.15,63.76]))
ok(isApproxVec(GraphicsPath.fromString('M17.49,19.62A16.697784373601912,87.61222017704227,157.75999999999996,0012.92,90.59').getBounds(),[-21.356779909241084,-26.17207242567025,17.49,90.59]))
ok(isApproxVec(GraphicsPath.fromString('M40.67,0.68A40.43492669499087,209.85593945072978,113.74000000000001,0145.85,90.88').getBounds(),[40.67,0.68,236.02939646796187,137.9989870271059]))
ok(isApproxVec(GraphicsPath.fromString('M56.88,9.75A36.11,11.42,192.89,1134.77,24.91').getBounds(),[34.77,9.75,95.60122135637931,35.758181672916635]))
ok(isApproxVec(GraphicsPath.fromString('M10.54,2.11A89.91530340665712,33.505143442490365,115.06,0180.13,10.29').getBounds(),[10.54,-76.38023773720681,94.03212706939765,10.29]))
ok(isApproxVec(GraphicsPath.fromString('M30.85,94.55A26.65787496662658,4538.273403801221,253.15000000000003,109.1,45.43').getBounds(),[9.1,-1245.7308449657198,4363.399540926815,94.55]))
ok(isApproxVec(GraphicsPath.fromString('M43.11,39.31A40.15,24.48,55.52,0120.16,30.47').getBounds(),[20.16,30.47,43.11,39.31]))
ok(isApproxVec(GraphicsPath.fromString('M33.68,89.56A37.71380472880589,112.44759911913347,108.36,0172.36,23.12').getBounds(),[-54.35018807628397,6.011494612634358,72.36,89.56]))
ok(isApproxVec(GraphicsPath.fromString('M21.96,75.79A21.678672302001377,48.23056680742786,335.0799999999999,0126.62,6.22').getBounds(),[-3.8895267391290815,-3.677080141470654,26.62,75.79]))
ok(isApproxVec(GraphicsPath.fromString('M83.9,30.3A42.71979740512892,49.33664930604952,192.69,009.63,85.09').getBounds(),[3.7753181301057452,8.657493118076303,83.9,85.09]))
ok(isApproxVec(GraphicsPath.fromString('M44.66,88.26A40.99102772616556,166.78459446380205,78.5,104.6,12.97').getBounds(),[4.6,-1.5186791688598973,188.2212841763962,88.26]))
ok(isApproxVec(GraphicsPath.fromString('M87.62,49.12A12.46,46.09,223.89,1126.85,95.18').getBounds(),[21.339532787908908,49.12,87.69130941575949,114.29961744304978]))
ok(isApproxVec(GraphicsPath.fromString('M63.56,96.38A57.18,29.93,166.43,0128.41,46.24').getBounds(),[2.428323474064989,46.24,63.56,98.81389558702435]))
ok(isApproxVec(GraphicsPath.fromString('M49.22,31.82A8.4,59.24,32.43,115.47,86.92').getBounds(),[-14.188002488610294,31.82,50.89220449539236,132.20497003325585]))
ok(isApproxVec(GraphicsPath.fromString('M69.92,63.63A6.970431678586738,38.645590598967296,340.08,1156.05,1.65').getBounds(),[48.34803185257052,-3.746858288248781,69.92,63.63]))
ok(isApproxVec(GraphicsPath.fromString('M91.34,13.84A33.45773309445695,81.14012288572253,125.08000000000001,1152.03,68').getBounds(),[52.03,13.84,140.81286509953068,94.96618033260118]))
ok(isApproxVec(GraphicsPath.fromString('M26.65,29.52A6.0698702516588785,51.283915641687955,93.23,0128.22,17.45').getBounds(),[-23.762570396266735,16.783577895002054,28.22,29.52]))
ok(isApproxVec(GraphicsPath.fromString('M54.47,62.99A54.34,60.9,4.29,1084.11,2.93').getBounds(),[54.47,-4.094783731180023,163.00384247865628,117.59593215994556]))
ok(isApproxVec(GraphicsPath.fromString('M87.93,99.47A52.03,62.93,276.41,1084.01,15.86').getBounds(),[84.01,5.667594501539739,186.28440368480665,109.89724784470812]))
ok(isApproxVec(GraphicsPath.fromString('M30.53,73.51A17.45,32.84,110.5,0122.43,54.36').getBounds(),[21.56752298317723,54.36,30.53,73.51]))
ok(isApproxVec(GraphicsPath.fromString('M98.67,47.63A27.032458327626642,35.94088209468542,110.41000000000001,1130.25,48.96').getBounds(),[30.25,47.63,99.43557867912575,76.55340843783657]))
ok(isApproxVec(GraphicsPath.fromString('M17.64,80.41A16.70229562805293,82.27899322114624,128.23,0183.04,92.2').getBounds(),[-15.080028536127386,33.73114946740359,83.04,92.2]))
ok(isApproxVec(GraphicsPath.fromString('M62.19,47.79A30.55,34.49,248.98,0025.97,86.4').getBounds(),[25.58586232890093,47.79,62.19,86.4]))
ok(isApproxVec(GraphicsPath.fromString('M79.27,36.59A32.99,14.3,253.47000000000003,0172.85,6.22').getBounds(),[72.85,6.22,79.27,36.59]))
ok(isApproxVec(GraphicsPath.fromString('M75.88,94.43A27.490354418887165,36.57973642266856,75.9,1056.39,42.85').getBounds(),[56.39,40.53192309177368,102.13237895590535,94.43]))
ok(isApproxVec(GraphicsPath.fromString('M97.81,69.96A43.02139803816981,115.18632377961593,41.61000000000001,1016.89,32.3').getBounds(),[16.89,-39.60021626767838,140.3143626759691,69.96]))
ok(isApproxVec(GraphicsPath.fromString('M63.75,15.36A12.24,28.69,99.18,0166.26,25.85').getBounds(),[63.75,15.36,67.53013284523395,25.85]))
ok(isApproxVec(GraphicsPath.fromString('M67.46,14.14A31.43,38.12,281.06000000000006,1090.55,26.55').getBounds(),[23.514004115094778,13.336488440887006,99.30208622407709,76.6052680746532]))
ok(isApproxVec(GraphicsPath.fromString('M9.51,74.98A42.354949499920785,432.33742669817104,216.56000000000003,0198.34,97.29').getBounds(),[9.51,-261.99760207958644,313.61229955813616,97.29]))
ok(isApproxVec(GraphicsPath.fromString('M23.92,11.39A16.07016802135863,83.05710104094555,234.18999999999997,0181.08,8.07').getBounds(),[23.92,-40.556369368430865,120.45207351702719,11.39]))
ok(isApproxVec(GraphicsPath.fromString('M55.27,19.54A31.58,32.09,234,0028.5,62.46').getBounds(),[26.726617937403482,19.54,55.27,62.46]))
ok(isApproxVec(GraphicsPath.fromString('M67.62,10.17A43.61004608587746,42.18952341207037,137.16,118.28,74.07').getBounds(),[8.28,10.17,80.8977612271382,84.9049202769663]))
ok(isApproxVec(GraphicsPath.fromString('M30.58,42.3A33.89,36.63,319.7,0137.87,17.38').getBounds(),[30.534313263413814,17.38,37.87,42.3]))
ok(isApproxVec(GraphicsPath.fromString('M76.98,28.62A30.353502541388846,388.5901088793286,108.96,0177.43,92.94').getBounds(),[76.98,28.62,444.8446315804017,190.25639959940736]))
ok(isApproxVec(GraphicsPath.fromString('M48.73,15.5A96.10913170819369,12.070309583635174,252.29,0122.34,12.08').getBounds(),[22.34,12.08,66.92504989919587,105.40200733476081]))
ok(isApproxVec(GraphicsPath.fromString('M95.31,17.91A452.5738536858321,12.903032179211177,6.76,0057.12,39.35').getBounds(),[-373.20534256542123,-26.162070389264954,95.31,39.35]))
ok(isApproxVec(GraphicsPath.fromString('M56.73,93.2A46.42600431994682,32.14107991380934,184.7,010.13,39.79').getBounds(),[-17.80823706656013,39.79,56.73,98.75241121515285]))
ok(isApproxVec(GraphicsPath.fromString('M5.82,68.45A23.90680382468354,39.136323298185644,314.89,0058.63,58.99').getBounds(),[5.82,58.99,64.66556575908032,96.07962067630248]))
ok(isApproxVec(GraphicsPath.fromString('M83.01,57.15A15.51,59.37,115.15999999999998,0080.6,65.65').getBounds(),[79.56449896257794,57.15,83.01,65.65]))
ok(isApproxVec(GraphicsPath.fromString('M49.36,74.53A43.1,53.23,20.27,1075.17,17.35').getBounds(),[49.36,9.43167084317762,137.8917755790768,113.45847553866133]))
ok(isApproxVec(GraphicsPath.fromString('M20.35,69.8A59.88,32.32,257.44,018.31,37.56').getBounds(),[8.31,37.56,20.35,69.8]))
ok(isApproxVec(GraphicsPath.fromString('M44.05,63.88A43.34,45.89,357.00999999999993,0092.13,25.72').getBounds(),[44.05,25.72,92.13,64.15587365997831]))
ok(isApproxVec(GraphicsPath.fromString('M55.88,44.97A52.52,33.42,154.65,1181.58,66.8').getBounds(),[55.88,-8.070323199861619,154.7430713950789,67.2318250473934]))
ok(isApproxVec(GraphicsPath.fromString('M59.01,19.87A45.17,53.21,342.96,0143,1.46').getBounds(),[43,1.46,59.01,19.87]))
ok(isApproxVec(GraphicsPath.fromString('M95.43,52.51A53.6,59.03,88.57,0187.79,27.87').getBounds(),[87.79,27.87,95.43,52.51]))
ok(isApproxVec(GraphicsPath.fromString('M99.13,4.96A52.60600636776645,134.61501272323093,334.94,0019.37,80.69').getBounds(),[-15.041279239921579,-81.1213884169915,99.13,80.69]))
ok(isApproxVec(GraphicsPath.fromString('M6.7,26.17A51.64,11.5,277.18,0022.09,19.35').getBounds(),[6.7,19.35,22.09,34.42203074336116]))
ok(isApproxVec(GraphicsPath.fromString('M87.25,10.33A15.15105483546516,27.298248364420704,74.43,1183.94,41.98').getBounds(),[83.94,9.847056258566429,112.15258132806918,41.98]))
ok(isApproxVec(GraphicsPath.fromString('M63.73,94.99A52.21,50.34,3.81,1062.05,37.03').getBounds(),[62.05,14.736489950109508,157.73669439716073,115.40209844436588]))
ok(isApproxVec(GraphicsPath.fromString('M49,37.51A59.81,35.12,187.58,106.77,75.55').getBounds(),[-68.43777912226975,4.435811148548417,49,75.81565984614579]))
ok(isApproxVec(GraphicsPath.fromString('M44.1,57.32A44.426596358768265,23.989951246898443,104.89,0090.04,71.23').getBounds(),[41.316941594981046,57.32,90.04,107.62305217156165]))
ok(isApproxVec(GraphicsPath.fromString('M24.85,77.53A88.83598359457532,15.392234091299557,296.43000000000006,1081.65,26.69').getBounds(),[11.408870249113946,26.69,81.65,131.9205226337347]))
ok(isApproxVec(GraphicsPath.fromString('M2.5,25.17A75.11249686768268,40.20414413067872,80.11,1081.39,9.54').getBounds(),[2.5,9.54,83.51052818680557,91.67086617844221]))
ok(isApproxVec(GraphicsPath.fromString('M64.28,84.2A50.56,48.21,194.42000000000002,0113.63,10.03').getBounds(),[6.202705251100966,10.03,64.28,84.60265182147324]))
ok(isApproxVec(GraphicsPath.fromString('M65.33,55.62A28.09,48.71,264.07,0032.53,84.98').getBounds(),[32.53,55.62,65.33,84.98]))
ok(isApproxVec(GraphicsPath.fromString('M83.19,10.27A15.780108559744757,77.88864675589787,176.30000000000004,1162.39,97.34').getBounds(),[62.39,10.27,89.25090334709915,131.5368310185005]))
ok(isApproxVec(GraphicsPath.fromString('M78.25,37.54A29.994577175172186,17.73037448190104,13.64,0127.05,11.77').getBounds(),[23.279640810956064,11.77,78.25,43.2764007445917]))
ok(isApproxVec(GraphicsPath.fromString('M71.35,47.55A65.99060838075906,11.876049556194824,310.65,1077.95,76.01').getBounds(),[30.738757596952873,47.55,77.95,112.43904540484166]))
ok(isApproxVec(GraphicsPath.fromString('M89.25,12.37A48.694012982044576,15.676009028432993,88.02,0163,58.22').getBounds(),[63,12.37,91.88166765694197,83.73048045447678]))
ok(isApproxVec(GraphicsPath.fromString('M6.03,91.06A57.12,28.45,216.55,1024,63.26').getBounds(),[6.03,63.26,101.70172830827462,145.22116004676002]))
ok(isApproxVec(GraphicsPath.fromString('M18.56,92.91A166.51528758087136,16.182471609972005,304.81000000000006,1188.2,47.92').getBounds(),[18.56,-66.59271578040739,149.3384062938173,92.91]))
ok(isApproxVec(GraphicsPath.fromString('M83.16,98.06A61.18048480635381,37.38981084741909,109.75,1150.13,10.34').getBounds(),[25.84274566695617,10.34,83.16,113.0930202916582]))
ok(isApproxVec(GraphicsPath.fromString('M49.58,11.43A29.811396320463626,51.18479684332476,8.92,007.49,95.85').getBounds(),[-1.9577276067828642,2.863408082692601,49.58,95.85]))
ok(isApproxVec(GraphicsPath.fromString('M33.38,19.52A25.660161031532407,49.52114873721133,151.02,0116.81,82.7').getBounds(),[16.81,19.52,57.92575617087671,96.17752748840041]))
ok(isApproxVec(GraphicsPath.fromString('M27.08,10.39A58.34,59.97,69.22,0131.83,14.76').getBounds(),[27.08,10.39,31.83,14.76]))
ok(isApproxVec(GraphicsPath.fromString('M33.68,52.48A59.32837992796391,9.5323194242395,352.24,1029,33.88').getBounds(),[29,30.820716498111146,90.0925794772002,52.48]))
ok(isApproxVec(GraphicsPath.fromString('M32.36,41.95A28.83,25.34,261.83,0160.98,70.05').getBounds(),[32.36,41.95,60.98,70.05]))
ok(isApproxVec(GraphicsPath.fromString('M26.4,24.94A4.91,51.72,54.95,1052.9,6.25').getBounds(),[0.9641485241266707,-11.312372141703953,85.81984966426478,48.613563462810646]))
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
