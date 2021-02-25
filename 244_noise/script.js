/* eslint no-console:0 consistent-return:0 */
"use strict";

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function main() {
  // Get A WebGL context
  var canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = 700;
  document.body.appendChild(canvas);
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // Get the strings for our GLSL shaders
  var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
  var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Link the two shaders into a program
  var program = createProgram(gl, vertexShader, fragmentShader);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  var timeUniformLocation = gl.getUniformLocation(program, "time");
  var posOffsetUniformLocation = gl.getUniformLocation(program, "posOffset");

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [
    -1, -1,
     1, -1,
    1,  1,
    -1,  1,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // code above this line is initialization code.
  // code below this line is rendering code.

  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);

  let time = 0;
  let posOffset = {x:0, y:0};
  let mousePos = {x:0, y:0};
  canvas.addEventListener("mousemove", e => {
    mousePos.x = 2 * (e.offsetX / canvas.width) - 1;
    mousePos.y = 2 * (e.offsetY / canvas.height) - 1;
  });
  function update(){
    time++;
    posOffset.x += 0.01 * mousePos.x;
    posOffset.y -= 0.01 * mousePos.y;
    gl.uniform1f(timeUniformLocation, time);
    gl.uniform2f(posOffsetUniformLocation, posOffset.x, posOffset.y);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw
    var primitiveType = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = 4;
    gl.drawArrays(primitiveType, offset, count);
    requestAnimationFrame(update);
  }

  update();
}

main();
