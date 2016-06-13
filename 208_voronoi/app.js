(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

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
    return true;
    return !cell.halfedges.reduce(function (onEdge, he) {
      var pt = he.getEndpoint();
      return onEdge || pt.x <= -0.9 * w2 || pt.x >= 0.9 * w2 || pt.y <= -0.9 * h2 || pt.y >= 0.9 * h2;
    }, false);
  });

  return cells;
}

module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

function create(cells) {
  var nPts = cells.reduce(function (nPts, cell) {
    return nPts + cell.halfedges.length;
  }, 0);

  var geometry = new THREE.BufferGeometry();
  var positions = new Float32Array(6 * nPts);
  var centers = new Float32Array(6 * nPts);
  var ids = new Uint32Array(3 * (3 * nPts - 2 * cells.length));
  geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute("center", new THREE.BufferAttribute(centers, 3));
  geometry.setIndex(new THREE.BufferAttribute(ids, 1));

  var idBegin = 0;
  cells.forEach(function (cell, cellId) {
    var n = cell.halfedges.length;
    var nIds = 0;
    var firstVertexId = 2 * idBegin;
    var firstIndexId = 3 * (3 * idBegin - 2 * cellId);
    var height = Math.random();
    for (var i = 0; i < n; i++) {
      var he = cell.halfedges[i];
      var p = he.getStartpoint();
      var pId0 = 3 * (firstVertexId + i);
      positions[pId0] = p.x;
      positions[pId0 + 1] = height;
      positions[pId0 + 2] = p.y;

      var pId1 = 3 * (firstVertexId + i + n);
      positions[pId1] = p.x;
      positions[pId1 + 1] = 0;
      positions[pId1 + 2] = p.y;

      centers[pId0] = cell.site.x;
      centers[pId0 + 1] = 0;
      centers[pId0 + 2] = cell.site.y;

      centers[pId1] = cell.site.x;
      centers[pId1 + 1] = 0;
      centers[pId1 + 2] = cell.site.y;

      var vertexId = firstVertexId + i;
      var nextVertexId = firstVertexId + (i + 1) % n;
      var indexId = firstIndexId + nIds;
      //sideA
      ids[indexId] = vertexId;
      ids[indexId + 1] = nextVertexId + n;
      ids[indexId + 2] = nextVertexId;
      nIds += 3;

      //sideB
      indexId += 3;
      ids[indexId] = vertexId;
      ids[indexId + 1] = vertexId + n;
      ids[indexId + 2] = nextVertexId + n;
      nIds += 3;

      //top
      if (i !== 0 && i !== n - 1) {
        indexId += 3;
        ids[indexId] = firstVertexId;
        ids[indexId + 1] = vertexId;
        ids[indexId + 2] = nextVertexId;
        nIds += 3;
      }
    }
    idBegin += n;
  });
  geometry.computeVertexNormals();
  geometry.computeFaceNormals();
  console.log(cells[0]);
  console.log("vertices", positions.length / 3);
  console.log("triangles", ids.length / 3);
  return geometry;
}

module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

function create(nLights, w, h) {
  var pointLights = [];

  var globalHue = Math.random() * 360;
  var sat = Math.round(Math.random() * 50) + 50;
  var lig = 60;

  for (var i = 0; i < nLights; i++) {

    var hue = Math.round(globalHue + Math.random() * 120);
    var color = "hsl(" + hue + ", " + sat + "%, " + lig + "%)";

    var light = new THREE.PointLight(color, 1, 0.3 * w, 1);
    light.position.set((Math.random() - 0.5) * w, Math.random() * 3 + 1, (Math.random() - 0.5) * h);
    pointLights[i] = light;
  }

  var globalColor = new THREE.Color();
  globalColor.setHSL(globalHue / 360, sat / 100, lig / 100);
  globalColor.multiplyScalar(0.3);

  var ambientLight = new THREE.AmbientLight(globalColor);

  /*var directional = new THREE.DirectionalLight(0xffffff);
    directional.position.set(1, 1, 1);
    directional.lookAt(0, 0, 0);
    scene.add(directional);*/

  return {
    pointLights: pointLights,
    ambientLight: ambientLight,
    globalColor: globalColor
  };
}

module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _cells = require("./cells");

var _cells2 = _interopRequireDefault(_cells);

var _geometry = require("./geometry");

var _geometry2 = _interopRequireDefault(_geometry);

var _lightning = require("./lightning");

var _lightning2 = _interopRequireDefault(_lightning);

var _material = require("./material");

var _material2 = _interopRequireDefault(_material);

var w = 100;
var h = 100;

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(new THREE.Vector3());

var group = new THREE.Group();
scene.add(group);

var controls = new THREE.OrbitControls(camera, renderer.element);

var lights = (0, _lightning2["default"])(10, w, h);
var pointLights = lights.pointLights;
pointLights.forEach(function (light) {
  group.add(light);
});

scene.add(lights.ambientLight);

var globalColor = lights.globalColor;
globalColor.multiplyScalar(0.3);
renderer.setClearColor(globalColor);
scene.fog = new THREE.FogExp2(globalColor, 0.04);

function createMesh(geometry) {
  var material = (0, _material2["default"])();
  var mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return mesh;
}

var mesh = createMesh((0, _geometry2["default"])((0, _cells2["default"])(10000, w, h)));

var time = 0;
var oldTime = Date.now();
function update() {
  var now = Date.now();
  var dt = now - oldTime;
  oldTime = now;
  time += dt;
  mesh.material.uniforms.time.value = time;

  controls.update(dt);
  renderer.render(scene, camera);

  requestAnimationFrame(update);
}

update();

},{"./cells":1,"./geometry":2,"./lightning":3,"./material":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var lib = function lib(name) {
  return THREE.UniformsLib[name];
};
var chunk = function chunk(name) {
  return THREE.ShaderChunk[name];
};

var uniforms = THREE.UniformsUtils.merge([lib("common"), lib("aomap"), lib("lightmap"), lib("emissivemap"), lib("bumpmap"), lib("normalmap"), lib("displacementmap"), lib("fog"), lib("lights"), lib("shadowmap"), {
  "emissive": { type: "c", value: new THREE.Color(0x000000) },
  "specular": { type: "c", value: new THREE.Color(0x111111) },
  "shininess": { type: "f", value: 30 },
  "time": { type: "f", value: 0 }
}]);

var vertexShader = ["#define PHONG", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "	varying vec3 vNormal;", "#endif", "	uniform float time;", "	attribute vec3 center;", chunk("common"), chunk("uv_pars_vertex"), chunk("uv2_pars_vertex"), chunk("displacementmap_pars_vertex"), chunk("envmap_pars_vertex"), chunk("lights_phong_pars_vertex"), chunk("color_pars_vertex"), chunk("morphtarget_pars_vertex"), chunk("skinning_pars_vertex"), chunk("shadowmap_pars_vertex"), chunk("logdepthbuf_pars_vertex"), "void main() {", chunk("uv_vertex"), chunk("uv2_vertex"), chunk("color_vertex"), chunk("beginnormal_vertex"), chunk("morphnormal_vertex"), chunk("skinbase_vertex"), chunk("skinnormal_vertex"), chunk("defaultnormal_vertex"), "#ifndef FLAT_SHADED", // Normal computed with derivatives when FLAT_SHADED

"	vNormal = normalize( transformedNormal );", "#endif", chunk("begin_vertex"), chunk("displacementmap_vertex"), chunk("morphtarget_vertex"), chunk("skinning_vertex"), " float dist = length(vec3(0.0) - center);", " transformed.y = transformed.y * 0.5 * (cos(0.005 * time - 0.2 * dist) + 1.0);", " vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );", " gl_Position = projectionMatrix * mvPosition;", chunk("logdepthbuf_vertex"), "	vViewPosition = - mvPosition.xyz;", chunk("worldpos_vertex"), chunk("envmap_vertex"), chunk("lights_phong_vertex"), chunk("shadowmap_vertex"), "}"].join("\n");

var fragmentShader = ["#define PHONG", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", chunk("common"), chunk("color_pars_fragment"), chunk("uv_pars_fragment"), chunk("uv2_pars_fragment"), chunk("map_pars_fragment"), chunk("alphamap_pars_fragment"), chunk("aomap_pars_fragment"), chunk("lightmap_pars_fragment"), chunk("emissivemap_pars_fragment"), chunk("envmap_pars_fragment"), chunk("fog_pars_fragment"), chunk("lights_phong_pars_fragment"), chunk("shadowmap_pars_fragment"), chunk("bumpmap_pars_fragment"), chunk("normalmap_pars_fragment"), chunk("specularmap_pars_fragment"), chunk("logdepthbuf_pars_fragment"), "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", "	vec3 totalAmbientLight = ambientLightColor;", "	vec3 totalEmissiveLight = emissive;", "	vec3 shadowMask = vec3( 1.0 );", chunk("logdepthbuf_fragment"), chunk("map_fragment"), chunk("color_fragment"), chunk("alphamap_fragment"), chunk("alphatest_fragment"), chunk("specularmap_fragment"), chunk("normal_phong_fragment"), chunk("lightmap_fragment"), chunk("hemilight_fragment"), chunk("aomap_fragment"), chunk("emissivemap_fragment"), chunk("lights_phong_fragment"), chunk("shadowmap_fragment"), "totalDiffuseLight *= shadowMask;", "totalSpecularLight *= shadowMask;", "#ifdef METAL", "	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) * specular + totalSpecularLight + totalEmissiveLight;", "#else", "	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) + totalSpecularLight + totalEmissiveLight;", "#endif", chunk("envmap_fragment"), chunk("linear_to_gamma_fragment"), chunk("fog_fragment"), "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n");

function create() {
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    lights: true,
    fog: true,
    shading: THREE.FlatShading
  });
  return material;
}

module.exports = exports["default"];

},{}]},{},[4]);
