(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;
function create(nSites, w, h) {
  var w2 = 0.5 * w;
  var h2 = 0.5 * h;
  var bbox = { xl: -w2, xr: w2, yt: -h2, yb: h2 };

  console.time("sites");
  var sites = [];
  for (var i = 0; i < nSites; i++) {
    var ang = Math.random() * 2 * Math.PI;
    var ran = Math.random();
    var r = Math.sqrt(Math.sqrt(ran)) * w2;
    sites[i] = {
      x: r * Math.cos(ang),
      y: r * Math.sin(ang)
    };
  }
  console.timeEnd("sites");

  var voronoi = new Voronoi();
  console.time("cells");
  var diagram = voronoi.compute(sites, bbox);
  console.timeEnd("cells");

  var cells = diagram.cells.filter(function (cell) {
    return !cell.halfedges.reduce(function (onEdge, he) {
      var pt = he.getEndpoint();
      return onEdge || pt.x <= -0.9 * w2 || pt.x >= 0.9 * w2 || pt.y <= -0.9 * h2 || pt.y >= 0.9 * h2;
    }, false);
  });

  return cells;
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;
function create(cells) {
  var nPts = cells.reduce(function (nPts, cell) {
    return nPts + cell.halfedges.length;
  }, 0);

  var geometry = new THREE.BufferGeometry();
  var positions = new Float32Array(6 * nPts);
  var centers = new Float32Array(6 * nPts);
  var ids = new Uint32Array(3 * (3 * nPts - 2 * cells.length));
  geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(ids, 1));

  var vertexId = 0;
  function addPosition(x, y, z) {
    var id = 3 * vertexId;
    positions[id] = x;
    positions[id + 1] = y;
    positions[id + 2] = z;
    return vertexId++;
  }

  var triangleId = 0;
  function addTriangle(a, b, c) {
    var id = 3 * triangleId;
    ids[id] = a;
    ids[id + 1] = b;
    ids[id + 2] = c;
    return triangleId++;
  }

  var idBegin = 0;
  var pos = new THREE.Vector3();
  var orig = new THREE.Vector3();
  var center = new THREE.Vector3();
  var axis = new THREE.Vector3();

  var mat = new THREE.Matrix4();
  var quat = new THREE.Quaternion();
  var up = new THREE.Vector3(0, 1, 0);

  cells.forEach(function (cell, cellId) {
    var n = cell.halfedges.length;
    var centerVertexId = idBegin;
    var firstVertexId = centerVertexId + 1;
    var height = Math.random() * 80 + 20;

    var ox = 0.3 * cell.site.x;
    var oy = 0.3 * cell.site.y;

    cell.halfedges.reduce(function (pt, he) {
      pt.x += he.getStartpoint().x;
      pt.z += he.getStartpoint().y;
      return pt;
    }, center.set(0, 0, 0));

    center.x /= n;
    center.z /= n;

    var growthRatio = 1.2;
    var cRatio = 1.2;
    pos.set(growthRatio * center.x, cRatio * height, growthRatio * center.z);

    var offset = new THREE.Vector3(ox, 0, oy);

    quat.setFromUnitVectors(up, pos.sub(center).clone().add(offset).normalize());
    mat.makeRotationFromQuaternion(quat);
    pos.applyMatrix4(mat).add(center);

    addPosition(pos.x, pos.y, pos.z);

    for (var i = 0; i < n; i++) {
      var he = cell.halfedges[i];
      var p = he.getStartpoint();

      pos.set(growthRatio * p.x, height, growthRatio * p.y).sub(center);
      pos.applyMatrix4(mat).add(center);
      var _vertexId = addPosition(pos.x, pos.y, pos.z);
      var vertex2Id = addPosition(p.x, 0, p.y);

      var nextVertexId = firstVertexId + 2 * ((i + 1) % n);

      //side
      addTriangle(_vertexId, nextVertexId + 1, nextVertexId);
      addTriangle(_vertexId, vertex2Id, nextVertexId + 1);

      //top
      addTriangle(centerVertexId, _vertexId, nextVertexId);
    }
    idBegin += 2 * n + 1;
  });
  geometry.computeVertexNormals();
  geometry.computeFaceNormals();
  console.log(cells[0]);
  console.log("vertices", positions.length / 3);
  console.log("triangles", ids.length / 3);
  return geometry;
}

},{}],3:[function(require,module,exports){
"use strict";

var _cells = require("./cells");

var _cells2 = _interopRequireDefault(_cells);

var _geometry = require("./geometry");

var _geometry2 = _interopRequireDefault(_geometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var w = 100;
var h = 100;

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 1, 1).multiplyScalar(100);
camera.lookAt(new THREE.Vector3());

var group = new THREE.Group();
group.position.y = -50;
scene.add(group);

var controls = new THREE.OrbitControls(camera, renderer.element);

scene.add(new THREE.AmbientLight(0xffffff));

var directional = new THREE.DirectionalLight(0xffffff);
directional.position.set(1, 1, 1);
directional.lookAt(0, 0, 0);
scene.add(directional);

renderer.setClearColor(0xffffff);
scene.fog = new THREE.FogExp2(0xffffff, 0.002);

function createMesh(geometry) {
  var material = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.4,
    metalness: 1,
    shading: THREE.FlatShading
  });
  var mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return mesh;
}

var mesh = createMesh((0, _geometry2.default)((0, _cells2.default)(50, w, h)));

var time = 0;
var oldTime = Date.now();
function update() {
  var now = Date.now();
  var dt = now - oldTime;
  oldTime = now;
  time += dt;

  controls.update(dt);
  renderer.render(scene, camera);
  group.rotation.y += 0.01;

  requestAnimationFrame(update);
}

update();

},{"./cells":1,"./geometry":2}]},{},[3]);
