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
    return true;
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;
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

},{}],4:[function(require,module,exports){
"use strict";

var _cells = require("./cells");

var _cells2 = _interopRequireDefault(_cells);

var _geometry = require("./geometry");

var _geometry2 = _interopRequireDefault(_geometry);

var _lightning = require("./lightning");

var _lightning2 = _interopRequireDefault(_lightning);

var _material = require("./material");

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var lights = (0, _lightning2.default)(10, w, h);
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
  var material = (0, _material2.default)();
  var mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return mesh;
}

var mesh = createMesh((0, _geometry2.default)((0, _cells2.default)(10000, w, h)));

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
exports.default = create;

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

var vertexShader = "\n  #define PHONG\n\nvarying vec3 vViewPosition;\nattribute vec3 center;\nuniform float time;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n" + chunk("common") + "\n" + chunk("uv_pars_vertex") + "\n" + chunk("uv2_pars_vertex") + "\n" + chunk("displacementmap_pars_vertex") + "\n" + chunk("envmap_pars_vertex") + "\n" + chunk("color_pars_vertex") + "\n" + chunk("fog_pars_vertex") + "\n" + chunk("morphtarget_pars_vertex") + "\n" + chunk("skinning_pars_vertex") + "\n" + chunk("shadowmap_pars_vertex") + "\n" + chunk("logdepthbuf_pars_vertex") + "\n" + chunk("clipping_planes_pars_vertex") + "\n\nvoid main() {\n\n\t" + chunk("uv_vertex") + "\n\t" + chunk("uv2_vertex") + "\n\t" + chunk("color_vertex") + "\n\n\t" + chunk("beginnormal_vertex") + "\n\t" + chunk("morphnormal_vertex") + "\n\t" + chunk("skinbase_vertex") + "\n\t" + chunk("skinnormal_vertex") + "\n\t " + chunk("defaultnormal_vertex") + "\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t" + chunk("begin_vertex") + "\n\t" + chunk("morphtarget_vertex") + "\n\t" + chunk("skinning_vertex") + "\n\t" + chunk("displacementmap_vertex") + "\n\t" + chunk("project_vertex") + "\n\t" + chunk("logdepthbuf_vertex") + "\n\t" + chunk("clipping_planes_vertex") + "\n\n  float dist = length(vec3(0.0) - center);\n  transformed.y = transformed.y * 0.5 * (cos(0.005 * time - 0.2 * dist) + 1.0);\n\tmvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n  gl_Position = projectionMatrix * mvPosition;\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t" + chunk("worldpos_vertex") + "\n\t" + chunk("envmap_vertex") + "\n\t" + chunk("shadowmap_vertex") + "\n\t" + chunk("fog_vertex") + "\n\n} ";

var fragmentShader = "\n  #define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n" + chunk("common") + "\n" + chunk("packing") + "\n" + chunk("dithering_pars_fragment") + "\n" + chunk("color_pars_fragment") + "\n" + chunk("uv_pars_fragment") + "\n" + chunk("uv2_pars_fragment") + "\n" + chunk("map_pars_fragment") + "\n" + chunk("alphamap_pars_fragment") + "\n" + chunk("aomap_pars_fragment") + "\n" + chunk("lightmap_pars_fragment") + "\n" + chunk("emissivemap_pars_fragment") + "\n" + chunk("envmap_pars_fragment") + "\n" + chunk("gradientmap_pars_fragment") + "\n" + chunk("fog_pars_fragment") + "\n" + chunk("bsdfs") + "\n" + chunk("lights_pars") + "\n" + chunk("lights_phong_pars_fragment") + "\n" + chunk("shadowmap_pars_fragment") + "\n" + chunk("bumpmap_pars_fragment") + "\n" + chunk("normalmap_pars_fragment") + "\n" + chunk("specularmap_pars_fragment") + "\n" + chunk("logdepthbuf_pars_fragment") + "\n" + chunk("clipping_planes_pars_fragment") + "\n\nvoid main() {\n\n\t" + chunk("clipping_planes_fragment") + "\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t" + chunk("logdepthbuf_fragment") + "\n\t" + chunk("map_fragment") + "\n\t" + chunk("color_fragment") + "\n\t" + chunk("alphamap_fragment") + "\n\t" + chunk("alphatest_fragment") + "\n\t" + chunk("specularmap_fragment") + "\n\t" + chunk("normal_fragment") + "\n\t" + chunk("emissivemap_fragment") + "\n\n\t// accumulation\n\t" + chunk("lights_phong_fragment") + "\n\t" + chunk("lights_template") + "\n\n\t// modulation\n\t" + chunk("aomap_fragment") + "\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t" + chunk("envmap_fragment") + "\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t" + chunk("tonemapping_fragment") + "\n\t" + chunk("encodings_fragment") + "\n\t" + chunk("fog_fragment") + "\n\t" + chunk("premultiplied_alpha_fragment") + "\n\t" + chunk("dithering_fragment") + "\n\n}\n";

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

},{}]},{},[4]);
