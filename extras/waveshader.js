/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/

/**
 * TODO: Not documented yet.
 */
export var waveShader = {
  "vertexShader":["varying vec2 uvCoord;",
    "void main() {",
    "uvCoord=uv;",
    "gl_Position=(projectionMatrix*modelViewMatrix)*vec4(position,1.0);",
    "}"
  ].join("\n"),
  "fragmentShader":[
    "varying vec2 uvCoord;",
    "uniform float time;", // coarseness in pixels; 1 means normal
    "uniform sampler2D sampler;",
    "void main() {",
    " float t=float(time)*0.01;",
    " t=t+uvCoord.y;",
    " float offset=interp(fract(t*8.0));",
    " float x=clamp(uvCoord.x+offset*0.02,0.0,1.0);",
    " vec4 c=texture2D(sampler,vec2(x,uvCoord.y));",
    " gl_FragColor=c;",
    "}"
  ].join("\n"),
  "uniform":{"time":0}
};
