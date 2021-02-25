(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _glglCoreContext = require("../glgl/core/Context");

var _glglCoreContext2 = _interopRequireDefault(_glglCoreContext);

var _glglMaterialsLightMaterial = require("../glgl/materials/LightMaterial");

var _glglMaterialsLightMaterial2 = _interopRequireDefault(_glglMaterialsLightMaterial);

var _glglSceneObjectsCamera = require("../glgl/sceneObjects/Camera");

var _glglSceneObjectsCamera2 = _interopRequireDefault(_glglSceneObjectsCamera);

var _glglLightsDirectionalLight = require("../glgl/lights/DirectionalLight");

var _glglLightsDirectionalLight2 = _interopRequireDefault(_glglLightsDirectionalLight);

var _glglLightsAmbientLight = require("../glgl/lights/AmbientLight");

var _glglLightsAmbientLight2 = _interopRequireDefault(_glglLightsAmbientLight);

var _glglSceneObjectsMesh = require("../glgl/sceneObjects/Mesh");

var _glglSceneObjectsMesh2 = _interopRequireDefault(_glglSceneObjectsMesh);

var _glglSceneObjectsGroup = require("../glgl/sceneObjects/Group");

var _glglSceneObjectsGroup2 = _interopRequireDefault(_glglSceneObjectsGroup);

var _glglSceneVisitorsSceneRenderer = require("../glgl/sceneVisitors/SceneRenderer");

var _glglSceneVisitorsSceneRenderer2 = _interopRequireDefault(_glglSceneVisitorsSceneRenderer);

var _glglUtilsLoop = require("../glgl/utils/Loop");

var _glglUtilsLoop2 = _interopRequireDefault(_glglUtilsLoop);

var _glglControllersMouseControl = require("../glgl/controllers/MouseControl");

var _glglControllersMouseControl2 = _interopRequireDefault(_glglControllersMouseControl);

var Giggle = (function () {
  function Giggle() {
    var _this = this;

    _classCallCheck(this, Giggle);

    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.context = new _glglCoreContext2["default"](this.canvas);

    this.sceneRenderer = new _glglSceneVisitorsSceneRenderer2["default"](this.context);

    this.scene = new _glglSceneObjectsGroup2["default"]();

    this.defaultMaterial = new _glglMaterialsLightMaterial2["default"](0xeeeeee);

    this.camera = new _glglSceneObjectsCamera2["default"](75, this.context.width / this.context.height, 1, 10000);
    this.camera.position.z = 10;
    this.scene.add(this.camera);

    this.directionalLight = new _glglLightsDirectionalLight2["default"]();
    this.scene.add(this.directionalLight);

    this.ambientLight = new _glglLightsAmbientLight2["default"](0x888888);
    this.scene.add(this.ambientLight);

    this.context.resized.add(function (w, h) {
      return _this.camera.aspect = w / h;
    });
  }

  _createClass(Giggle, [{
    key: "setUniforms",
    value: function setUniforms(uniforms) {
      this.sceneRenderer.setUniforms(uniforms);
    }
  }, {
    key: "start",
    value: function start(updateCallback) {
      this.updateCallback = updateCallback;
      new _glglControllersMouseControl2["default"](this.canvas, this.camera);
      this.loop = new _glglUtilsLoop2["default"](this.update.bind(this));
    }
  }, {
    key: "create",
    value: function create(geometry) {
      var mesh = new _glglSceneObjectsMesh2["default"](geometry, this.defaultMaterial);
      this.scene.add(mesh);
      return mesh;
    }
  }, {
    key: "update",
    value: function update(frameId) {
      if (this.updateCallback !== undefined) {
        this.updateCallback(frameId);
      }
      this.sceneRenderer.setUniforms({ time: frameId });
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      return this.sceneRenderer.render(this.scene, this.camera);
    }
  }, {
    key: "debug",
    value: function debug() {
      this.loop.pause();
      var drawCalls = this.render();
    }
  }, {
    key: "backgroundColor",
    get: function get() {
      return this.context.clearColor;
    },
    set: function set(value) {
      this.context.clearColor.set(value);
    }
  }]);

  return Giggle;
})();

exports["default"] = Giggle;
module.exports = exports["default"];

},{"../glgl/controllers/MouseControl":3,"../glgl/core/Context":7,"../glgl/lights/AmbientLight":27,"../glgl/lights/DirectionalLight":28,"../glgl/materials/LightMaterial":38,"../glgl/sceneObjects/Camera":71,"../glgl/sceneObjects/Group":72,"../glgl/sceneObjects/Mesh":73,"../glgl/sceneVisitors/SceneRenderer":79,"../glgl/utils/Loop":84}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _inputsMouse = require("../inputs/Mouse");

var _inputsMouse2 = _interopRequireDefault(_inputsMouse);

var _mathSphere = require("../math/Sphere");

var _mathSphere2 = _interopRequireDefault(_mathSphere);

var _mathRay = require("../math/Ray");

var _mathRay2 = _interopRequireDefault(_mathRay);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var _mathMat3 = require("../math/Mat3");

var _mathMat32 = _interopRequireDefault(_mathMat3);

var _mathQuaternion = require("../math/Quaternion");

var _mathQuaternion2 = _interopRequireDefault(_mathQuaternion);

var t = 0;

var Arcball = (function () {
  function Arcball(domElement, camera) {
    _classCallCheck(this, Arcball);

    this.domElement = domElement;
    this.camera = camera;

    this.mouse = new _inputsMouse2["default"](this.domElement);
    this.mouse.onDown.add(this.onDown, this);
    this.mouse.onMove.add(this.onMove, this);

    this.startPoint = new _mathVec32["default"]();
  }

  _createClass(Arcball, [{
    key: "onDown",
    value: function onDown() {
      this.time = 0;
      this.initialPosition = this.camera.position.clone();
      this.startPoint = this.getPosOnSphere();
    }
  }, {
    key: "getPosOnSphere",
    value: function getPosOnSphere() {
      var dist = new _mathVec32["default"](0, 0, -0.5 * (this.initialPosition.length - this.camera.near));
      var sphere = new _mathSphere2["default"](new _mathVec32["default"](), -dist.z);

      var nearScale = Math.tan(this.camera.fov);
      var clickPosition = new _mathVec32["default"](nearScale * (2 * this.mouse.x / this.domElement.width - 1) * this.camera.aspect, -nearScale * (2 * this.mouse.y / this.domElement.height - 1), -this.camera.near);
      var ray = new _mathRay2["default"](dist, clickPosition);

      return sphere.getRayIntersection(ray)[0];
    }
  }, {
    key: "onMove",
    value: function onMove() {
      if (!this.mouse.isDown) return;
      var endPoint = this.getPosOnSphere();
      var axis = endPoint.clone().cross(this.startPoint).normalize();
      var angle = -this.startPoint.angleWith(endPoint);
      //axis = new Vec3(1, 0, 0);
      //angle = 0.01 * t++;
      //console.log(axis, angle);
      var rotation = new _mathMat32["default"]().setRotation(axis.x, axis.y, axis.z, angle);
      var position = rotation.transformVector(this.initialPosition.clone());
      this.camera.position.copy(position);
      this.camera.lookAt(new _mathVec32["default"](), new _mathVec32["default"](0, 1, 0));
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.downListener.remove();
    }
  }]);

  return Arcball;
})();

exports["default"] = Arcball;
module.exports = exports["default"];

},{"../inputs/Mouse":25,"../math/Mat3":49,"../math/Quaternion":51,"../math/Ray":52,"../math/Sphere":53,"../math/Vec3":55}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsLoop = require("../utils/Loop");

var _utilsLoop2 = _interopRequireDefault(_utilsLoop);

var _inputsMouse = require("../inputs/Mouse");

var _inputsMouse2 = _interopRequireDefault(_inputsMouse);

var _mathSphere = require("../math/Sphere");

var _mathSphere2 = _interopRequireDefault(_mathSphere);

var _mathRay = require("../math/Ray");

var _mathRay2 = _interopRequireDefault(_mathRay);

var _mathVec2 = require("../math/Vec2");

var _mathVec22 = _interopRequireDefault(_mathVec2);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var _mathMat3 = require("../math/Mat3");

var _mathMat32 = _interopRequireDefault(_mathMat3);

var MouseControl = (function () {
  function MouseControl(domElement, camera) {
    _classCallCheck(this, MouseControl);

    this.domElement = domElement;
    this.camera = camera;

    this.radius = this.camera.position.length;

    this.speed = -0.001;
    this.velocity = new _mathVec22["default"]();
    this.friction = 0.9;
    this.lastMousePos = new _mathVec22["default"]();

    this.rotation = new _mathVec22["default"](Math.PI / 2, 0);
    //this.rotation = new Vec2(-Math.PI / 2, 0);

    this.mouse = new _inputsMouse2["default"](this.domElement);
    this.mouse.onDown.add(this.onDown, this);
    this.mouse.onMove.add(this.onMove, this);
    this.mouse.onWheel.add(this.onWheel, this);

    this.loop = new _utilsLoop2["default"](this.update, this, false);
  }

  _createClass(MouseControl, [{
    key: "onDown",
    value: function onDown() {
      this.time = 0;
      this.loop.play();
      this.lastMousePos.copy(this.mouse);
    }
  }, {
    key: "onMove",
    value: function onMove() {
      if (!this.mouse.isDown) return;
      this.velocity.copy(this.lastMousePos).sub(this.mouse).scale(this.speed);
      this.lastMousePos.copy(this.mouse);
    }
  }, {
    key: "onWheel",
    value: function onWheel(delta) {
      this.radius += -0.0001 * this.radius * delta;
      this.update();
    }
  }, {
    key: "update",
    value: function update(frame) {
      this.velocity.scale(this.friction);
      this.rotation.add(this.velocity);
      this.rotation.x = this.rotation.x % (2 * Math.PI);
      this.rotation.y = Math.max(Math.min(this.rotation.y, 0.5 * Math.PI), -0.5 * Math.PI);

      var y = Math.sin(this.rotation.y);
      var r = Math.cos(this.rotation.y);
      this.camera.position.set(r * Math.cos(this.rotation.x), y, r * Math.sin(this.rotation.x)).scale(this.radius);
      this.camera.lookAt(new _mathVec32["default"](), new _mathVec32["default"](0, 1, 0));

      if (this.rotation.length < 0.001) {
        this.loop.pause();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.mouse.onDown.remove(this.onDown, this);
      this.mouse.onMove.remove(this.onMove, this);
      this.mouse.onWheel.remove(this.onWheel, this);
      this.loop.dispose();
    }
  }]);

  return MouseControl;
})();

exports["default"] = MouseControl;
module.exports = exports["default"];

},{"../inputs/Mouse":25,"../math/Mat3":49,"../math/Ray":52,"../math/Sphere":53,"../math/Vec2":54,"../math/Vec3":55,"../utils/Loop":84}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Arcball = require("./Arcball");

var _Arcball2 = _interopRequireDefault(_Arcball);

var _MouseControl = require("./MouseControl");

var _MouseControl2 = _interopRequireDefault(_MouseControl);

exports["default"] = {
  Arcball: _Arcball2["default"],
  MouseControl: _MouseControl2["default"]
};
module.exports = exports["default"];

},{"./Arcball":2,"./MouseControl":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var AttributeBuffer = (function () {
  function AttributeBuffer() {
    _classCallCheck(this, AttributeBuffer);

    this.glBuffer = undefined;
    this.data = undefined;
    this.isInit = false;
  }

  _createClass(AttributeBuffer, [{
    key: "initGL",
    value: function initGL(context) {
      this.glBuffer = context.glContext.createBuffer();
      this.isInit = true;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      this.needsUpdate = true;
    }
  }, {
    key: "updateGL",
    value: function updateGL(context) {
      var gl = context.glContext;
      gl.bindBuffer(_consts2["default"].ARRAY_BUFFER, this.glBuffer);
      gl.bufferData(_consts2["default"].ARRAY_BUFFER, this.data, _consts2["default"].STATIC_DRAW);
      this.needsUpdate = false;
    }
  }]);

  return AttributeBuffer;
})();

exports["default"] = AttributeBuffer;
module.exports = exports["default"];

},{"./consts":17}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var sizes = {};
sizes[_consts2["default"].INT] = 1;
sizes[_consts2["default"].FLOAT] = 1;
sizes[_consts2["default"].FLOAT_VEC2] = 2;
sizes[_consts2["default"].FLOAT_VEC3] = 3;
sizes[_consts2["default"].FLOAT_VEC4] = 4;
sizes[_consts2["default"].INT_VEC2] = 2;
sizes[_consts2["default"].INT_VEC3] = 3;
sizes[_consts2["default"].INT_VEC4] = 4;
sizes[_consts2["default"].FLOAT_MAT2] = 4;
sizes[_consts2["default"].FLOAT_MAT3] = 9;
sizes[_consts2["default"].FLOAT_MAT4] = 16;

var AttributeInput = (function () {
  function AttributeInput(name, size, type, location) {
    _classCallCheck(this, AttributeInput);

    this.name = name;
    this.size = size;
    this.type = type;
    this.location = location;
    this.itemSize = sizes[this.type];
  }

  _createClass(AttributeInput, [{
    key: "updateGL",
    value: function updateGL(context, buffer) {
      var gl = context.glContext;
      if (buffer.needsUpdate) {
        buffer.updateGL(context);
      }
      gl.bindBuffer(_consts2["default"].ARRAY_BUFFER, buffer.glBuffer);
      gl.vertexAttribPointer(this.location, this.itemSize, _consts2["default"].FLOAT, false, 0, 0);
    }
  }]);

  return AttributeInput;
})();

exports["default"] = AttributeInput;
module.exports = exports["default"];

},{"./consts":17}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _DrawCallData = require("./DrawCallData");

var _DrawCallData2 = _interopRequireDefault(_DrawCallData);

var _mathVec2 = require("../math/Vec2");

var _mathVec22 = _interopRequireDefault(_mathVec2);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var _utilsSignal = require("../utils/Signal");

var _utilsSignal2 = _interopRequireDefault(_utilsSignal);

var maxTextureIds = 32;

var Context = (function () {
  function Context(canvas) {
    _classCallCheck(this, Context);

    this.canvas = canvas;

    this.drawCallData = new _DrawCallData2["default"]();
    this.frameSize = new _mathVec22["default"]();

    this._checkSizeBind = this.checkSize.bind(this);
    this.resized = new _utilsSignal2["default"]();
    this.clearColor = new _mathColor2["default"]();
    this.autoSize = true;
    this.autoClear = true;
    this.glFrameBuffer = null;

    try {
      this.glContext = this.canvas.getContext("webgl");
    } catch (e) {}
    if (!this.glContext) console.log("Could not initialise WebGL, sorry :-(");

    //console.log(this.glContext.getSupportedExtensions().join("\n"));
    //console.log(this.glContext);

    this.clear();

    this.isInit = true;
  }

  _createClass(Context, [{
    key: "checkSize",
    value: function checkSize() {
      var c = this.canvas;
      if (c.width === c.clientWidth && c.height === c.clientHeight) return;
      this.resize(c.clientWidth, c.clientHeight);
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      this.frameSize.set(w, h);
      this.canvas.width = this.frameSize.x;
      this.canvas.height = this.frameSize.y;
      this.resized.dispatch(this.frameSize.x, this.frameSize.y);
    }
  }, {
    key: "clear",
    value: function clear() {
      var gl = this.glContext;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.enable(_consts2["default"].DEPTH_TEST);
      var c = this.clearColor;
      gl.clearColor(c.r, c.g, c.b, 1.0);
      gl.clear(_consts2["default"].COLOR_BUFFER_BIT | _consts2["default"].DEPTH_BUFFER_BIT);
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        "uFrameSize": this.frameSize
      });
      return this.drawCallData;
    }
  }, {
    key: "getTextureId",
    value: function getTextureId() {
      if (this.textureIds === undefined) {
        this.textureIds = [];
      }

      var id = undefined;
      for (var i = 0; i < maxTextureIds; i++) {
        if (!this.textureIds[i]) {
          id = i;
          break;
        }
      }
      if (id === undefined) {
        throw new Error("Too many textures");
      }
      this.textureIds[id] = true;

      return id;
    }
  }, {
    key: "releaseTextureId",
    value: function releaseTextureId(id) {
      this.textureIds[id] = false;
    }
  }, {
    key: "autoSize",
    get: function get() {
      return this._autoSize;
    },
    set: function set(value) {
      if (this._autoSize === value) {
        return;
      }

      this._autoSize = value;
      if (this._autoSize) {
        window.addEventListener("resize", this._checkSizeBind);
      } else {
        window.removeEventListener("resize", this._checkSizeBind);
      }
      this.checkSize();
    }
  }, {
    key: "width",
    get: function get() {
      return this.frameSize.x;
    },
    set: function set(value) {
      this.resize(value, this.frameSize.y);
    }
  }, {
    key: "height",
    get: function get() {
      return this.frameSize.y;
    },
    set: function set(value) {
      this.resize(this.frameSize.x, value);
    }
  }]);

  return Context;
})();

exports["default"] = Context;
module.exports = exports["default"];

},{"../math/Color":47,"../math/Vec2":54,"../utils/Signal":85,"./DrawCallData":10,"./consts":17}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var sides = {
  px: _consts2["default"].TEXTURE_CUBE_MAP_POSITIVE_X,
  nx: _consts2["default"].TEXTURE_CUBE_MAP_NEGATIVE_X,
  py: _consts2["default"].TEXTURE_CUBE_MAP_POSITIVE_Y,
  ny: _consts2["default"].TEXTURE_CUBE_MAP_NEGATIVE_Y,
  pz: _consts2["default"].TEXTURE_CUBE_MAP_POSITIVE_Z,
  nz: _consts2["default"].TEXTURE_CUBE_MAP_NEGATIVE_Z
};

var CubeTexture = (function () {
  function CubeTexture(images) {
    _classCallCheck(this, CubeTexture);

    this.images = images;
    this.isInit = false;
  }

  _createClass(CubeTexture, [{
    key: "initGL",
    value: function initGL(context) {
      var gl = context.glContext;
      this.glContext = gl;
      this.glTexture = gl.createTexture();

      this.textureId = context.getTextureId();
      gl.activeTexture(_consts2["default"].TEXTURE0 + this.textureId);
      gl.bindTexture(_consts2["default"].TEXTURE_CUBE_MAP, this.glTexture);

      gl.texParameteri(_consts2["default"].TEXTURE_CUBE_MAP, _consts2["default"].TEXTURE_MAG_FILTER, _consts2["default"].LINEAR);
      gl.texParameteri(_consts2["default"].TEXTURE_CUBE_MAP, _consts2["default"].TEXTURE_MIN_FILTER, _consts2["default"].LINEAR);
      //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_MAG_FILTER, consts.NEAREST);
      //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_MIN_FILTER, consts.NEAREST);

      gl.texParameteri(_consts2["default"].TEXTURE_CUBE_MAP, _consts2["default"].TEXTURE_WRAP_S, _consts2["default"].CLAMP_TO_EDGE);
      gl.texParameteri(_consts2["default"].TEXTURE_CUBE_MAP, _consts2["default"].TEXTURE_WRAP_T, _consts2["default"].CLAMP_TO_EDGE);
      //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_WRAP_S, consts.REPEAT);
      //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_WRAP_T, consts.REPEAT);
      gl.bindTexture(_consts2["default"].TEXTURE_CUBE_MAP, null);
      this.isInit = true;
    }
  }, {
    key: "updateGL",
    value: function updateGL(context) {
      var gl = context.glContext;
      gl.activeTexture(_consts2["default"].TEXTURE0 + this.textureId);
      gl.bindTexture(_consts2["default"].TEXTURE_CUBE_MAP, this.glTexture);
      for (var id in this._images) {
        gl.pixelStorei(_consts2["default"].UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(sides[id], 0, _consts2["default"].RGBA, _consts2["default"].RGBA, _consts2["default"].UNSIGNED_BYTE, this._images[id]);
      }

      gl.bindTexture(_consts2["default"].TEXTURE_CUBE_MAP, null);
      this.needsUpdate = false;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Texture w:" + this._image.width + " h:" + this._image.height + " image : " + this._image + "]";
    }
  }, {
    key: "dispose",
    value: function dispose() {
      ids[i] = false;
      //TODO: actual dispose
    }
  }, {
    key: "images",
    get: function get() {
      return this._images;
    },
    set: function set(value) {
      this._images = value;
      this.needsUpdate = true;
    }
  }]);

  return CubeTexture;
})();

exports["default"] = CubeTexture;
module.exports = exports["default"];

},{"./consts":17}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _UniformInput = require("./UniformInput");

var _UniformInput2 = _interopRequireDefault(_UniformInput);

var DrawCall = (function () {
  function DrawCall(drawCallDatas) {
    _classCallCheck(this, DrawCall);

    this.drawCallDatas = [];

    this.ids = undefined;
    this.program = undefined;
    this.drawMethod = _consts2["default"].TRIANGLES;
    this.cullingMode = _consts2["default"].BACK;
    this.enableCulling = true;
    this.defines = {};

    this.addData(drawCallDatas);
  }

  _createClass(DrawCall, [{
    key: "addData",
    value: function addData(drawCallDatas) {
      var _this = this;

      if (drawCallDatas === undefined) return;
      function flatten(arr, obj) {
        if (Array.isArray(obj)) {
          for (var i = 0, n = obj.length; i < n; i++) {
            flatten(arr, obj[i]);
          }
        } else {
          arr.push(obj);
        }
        return arr;
      }

      var setIfDefined = function setIfDefined(dData, name) {
        if (dData[name] !== undefined) {
          _this[name] = dData[name];
        }
      };

      var arr = flatten([], drawCallDatas);
      for (var i = 0, n = arr.length; i < n; i++) {
        var dData = arr[i];
        this.drawCallDatas.push(dData);

        setIfDefined(dData, "program");
        setIfDefined(dData, "ids");
        setIfDefined(dData, "drawMethod");
        setIfDefined(dData, "cullingMode");
        setIfDefined(dData, "enableCulling");

        for (var k in dData.defines) {
          this.defines[k] = dData.defines[k];
        }
      }
    }
  }, {
    key: "_setAttributes",
    value: function _setAttributes(context) {
      var gl = context.glContext;
      var inputs = this.program.attributesInputs;
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var buffer = undefined;
        for (var j = this.drawCallDatas.length - 1; j >= 0; j--) {
          var b = this.drawCallDatas[j].attributes[input.name];
          if (b !== undefined) {
            buffer = b;
            break;
          }
        }
        if (buffer === undefined) {
          console.warn("Missing buffer : ", input.name);
        }
        if (!buffer.isInit) {
          buffer.initGL(context);
        }
        input.updateGL(context, buffer);
      }
    }
  }, {
    key: "_setInputs",
    value: function _setInputs(context, inputs, candidates) {
      for (var _name in inputs) {
        var input = inputs[_name];
        if (input.constructor === _UniformInput2["default"]) {
          this._setUniform(context, _name, input, candidates);
        } else if (Array.isArray(input)) {
          this._setArray(context, _name, input, candidates);
        } else {
          this._setStruct(context, _name, input, candidates);
        }
      }
    }
  }, {
    key: "_setUniform",
    value: function _setUniform(context, name, input, candidates) {
      for (var i = candidates.length - 1; i >= 0; i--) {
        var data = candidates[i][name];
        if (data !== undefined) {
          input.updateGL(context, data);
          break;
        }
      }
    }
  }, {
    key: "_setArray",
    value: function _setArray(context, name, input, candidates) {
      var newCandidates = [];
      for (var i = candidates.length - 1; i >= 0; i--) {
        var data = candidates[i][name];
        if (Array.isArray(data)) {
          for (var j = 0, n = data.length; j < n; j++) {
            newCandidates.push(data[j]);
          }
        } else if (data !== undefined) {
          newCandidates.push(data);
        }
        if (newCandidates.length >= input.length) {
          break;
        }
      }
      for (var i = 0, n = Math.min(newCandidates.length, input.length); i < n; i++) {
        this._setInputs(context, input[i], [newCandidates[i]]);
      }
    }
  }, {
    key: "_setStruct",
    value: function _setStruct(context, name, input, candidates) {
      var newCandidates = [];
      for (var i = candidates.length - 1; i >= 0; i--) {
        var data = candidates[i][name];
        if (data !== undefined) {
          newCandidates.push(data);
        }
      }
      this._setInputs(context, input, newCandidates);
    }
  }, {
    key: "_setUniforms",
    value: function _setUniforms(context) {
      var inputs = this.program.uniformsInputs;
      var uniforms = [];
      for (var i = 0; i < this.drawCallDatas.length; i++) {
        uniforms[i] = this.drawCallDatas[i].uniforms;
      }

      this._setInputs(context, inputs, uniforms);
    }
  }, {
    key: "exec",
    value: function exec(context, target, viewport) {
      var gl = context.glContext;

      if (target === undefined) {
        target = context;
      }

      if (!target.isInit) {
        target.initGL(context);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.glFrameBuffer);

      if (viewport !== undefined) {
        gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      } else {
        gl.viewport(0, 0, target.width, target.height);
      }

      this.program.setDefines(this.defines);
      if (!this.program.isInit) {
        this.program.initGL(context);
      }
      var glProgram = this.program.glProgram;
      gl.useProgram(glProgram);

      this._setAttributes(context);
      this._setUniforms(context);

      if (this.enableCulling) {
        gl.enable(_consts2["default"].CULL_FACE);
        gl.cullFace(this.cullingMode);
      } else {
        gl.disable(_consts2["default"].CULL_FACE);
      }

      if (this.ids === undefined) {
        var attributesCount = 0;
        console.warn("attributesCount must be fixed");
        gl.drawArrays(this.drawMethod, 0, attributesCount);
      } else {
        if (!this.ids.isInit) {
          this.ids.initGL(context, this.program);
        }
        if (this.ids.needsUpdate) {
          this.ids.updateGL(context);
        }

        gl.bindBuffer(_consts2["default"].ELEMENT_ARRAY_BUFFER, this.ids.buffer);
        gl.drawElements(this.drawMethod, this.ids.count, this.ids.type, 0);
      }
    }
  }]);

  return DrawCall;
})();

exports["default"] = DrawCall;
module.exports = exports["default"];

},{"./UniformInput":16,"./consts":17}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _IdsAttribute = require("./IdsAttribute");

var _IdsAttribute2 = _interopRequireDefault(_IdsAttribute);

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _AttributeBuffer = require("./AttributeBuffer");

var _AttributeBuffer2 = _interopRequireDefault(_AttributeBuffer);

var DrawCallData = (function () {
  function DrawCallData(attributes, uniforms, ids) {
    _classCallCheck(this, DrawCallData);

    this.defines = {};
    this.attributes = {};
    this.uniforms = {};

    if (attributes) {
      this.setAttributes(attributes);
    }
    if (uniforms) {
      this.setUniforms(uniforms);
    }
    if (ids) {
      this.setIds(ids);
    }

    this.ids = undefined;
    this.enableCulling = undefined;
    this.cullingMode = undefined;
    this.drawMethod = undefined;
    this.program = undefined;
  }

  _createClass(DrawCallData, [{
    key: "setIds",
    value: function setIds(data) {
      if (this.ids === undefined) {
        this.ids = new _IdsAttribute2["default"]();
      }
      this.ids.setData(data);
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(data) {
      for (var _name in data) {
        var aBuffer = this.attributes[_name];
        if (aBuffer === undefined) {
          aBuffer = this.attributes[_name] = new _AttributeBuffer2["default"]();
        }
        aBuffer.setData(data[_name]);
      }
    }
  }, {
    key: "setUniforms",
    value: function setUniforms(data) {
      for (var _name2 in data) {
        this.uniforms[_name2] = data[_name2];
      }
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      var _this = this;

      for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
      }

      if (names.length > 0) {
        names.forEach(function (name) {
          var attr = _this.attributes[name];
          if (attr !== undefined) {
            attr.needsUpdate = true;
          }
        });
      } else {
        for (var _name3 in attributes) {
          this.attributes[_name3].needsUpdate = true;
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      //to be implemented
    }
  }]);

  return DrawCallData;
})();

exports["default"] = DrawCallData;
module.exports = exports["default"];

},{"./AttributeBuffer":5,"./IdsAttribute":12,"./consts":17}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _RttTexture = require("./RttTexture");

var _RttTexture2 = _interopRequireDefault(_RttTexture);

var _DrawCallData = require("./DrawCallData");

var _DrawCallData2 = _interopRequireDefault(_DrawCallData);

var _mathVec2 = require("../math/Vec2");

var _mathVec22 = _interopRequireDefault(_mathVec2);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var FrameBuffer = (function () {
  function FrameBuffer(width, height) {
    _classCallCheck(this, FrameBuffer);

    this.clearColor = new _mathColor2["default"]();
    this.drawCallData = new _DrawCallData2["default"]();
    this.frameSize = new _mathVec22["default"]();
    this.texture = new _RttTexture2["default"](this);
    this.resize(width, height);
    this.isInit = false;
    this.autoClear = true;
  }

  _createClass(FrameBuffer, [{
    key: "initGL",
    value: function initGL(context) {
      this.context = context;

      var gl = context.glContext;

      this.glFrameBuffer = gl.createFramebuffer();

      this.texture.initGL(context);

      gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);

      this.renderBuffer = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameSize.x, this.frameSize.y);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);

      //gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      this.clear();

      this.isInit = true;
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      this.frameSize.set(w, h);
      this.texture.resize(w, h);
    }
  }, {
    key: "clear",
    value: function clear() {
      var gl = this.context.glContext;
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
      gl.enable(_consts2["default"].DEPTH_TEST);
      var c = this.clearColor;
      gl.clearColor(c.r, c.g, c.b, 1.0);
      gl.clear(_consts2["default"].COLOR_BUFFER_BIT | _consts2["default"].DEPTH_BUFFER_BIT);
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        "uFrameSize": this.frameSize
      });
      return this.drawCallData;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      //TODO
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[FrameBuffer]";
    }
  }, {
    key: "width",
    get: function get() {
      return this.frameSize.x;
    },
    set: function set(value) {
      this.resize(value, this.frameSize.y);
    }
  }, {
    key: "height",
    get: function get() {
      return this.frameSize.y;
    },
    set: function set(value) {
      this.resize(this.frameSize.x, value);
    }
  }]);

  return FrameBuffer;
})();

exports["default"] = FrameBuffer;
module.exports = exports["default"];

},{"../math/Color":47,"../math/Vec2":54,"./DrawCallData":10,"./RttTexture":14,"./consts":17}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var IdsAttribute = (function () {
  function IdsAttribute() {
    _classCallCheck(this, IdsAttribute);

    this.data = undefined;
    this.buffer = undefined;
    this.location = undefined;
    this.isInit = false;
    this.needsUpdate = true;
  }

  _createClass(IdsAttribute, [{
    key: "setData",
    value: function setData(data) {
      this.data = data;
      this.needsUpdate = true;
    }
  }, {
    key: "initGL",
    value: function initGL(context, program) {
      var gl = context.glContext;
      this.buffer = gl.createBuffer();
      this.location = gl.getAttribLocation(program.glProgram, "ids");
      this.isInit = true;
    }
  }, {
    key: "updateGL",
    value: function updateGL(context) {
      var gl = context.glContext;
      if (this.type !== _consts2["default"].UNSIGNED_INT && this.data.constructor === Uint32Array) {
        var extension = gl.getExtension("OES_element_index_uint");
        if (extension === undefined) {
          console.warn("extension 'OES_element_index_uint' not available, large meshes won't render properly");
          this.type = _consts2["default"].UNSIGNED_SHORT;
        } else {
          this.type = _consts2["default"].UNSIGNED_INT;
        }
      } else {
        this.type = _consts2["default"].UNSIGNED_SHORT;
      }

      this.count = this.data.length;
      gl.bindBuffer(_consts2["default"].ELEMENT_ARRAY_BUFFER, this.buffer);
      gl.bufferData(_consts2["default"].ELEMENT_ARRAY_BUFFER, this.data, _consts2["default"].STATIC_DRAW);
      this.needsUpdate = false;
    }
  }]);

  return IdsAttribute;
})();

exports["default"] = IdsAttribute;
module.exports = exports["default"];

},{"./consts":17}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _UniformInput = require("./UniformInput");

var _UniformInput2 = _interopRequireDefault(_UniformInput);

var _AttributeInput = require("./AttributeInput");

var _AttributeInput2 = _interopRequireDefault(_AttributeInput);

function initShader(gl, src, type, defines) {
  var shader = gl.createShader(type);

  var definesStr = "";
  for (var defineName in defines) {
    definesStr += "#define " + defineName + " " + defines[defineName] + "\n";
  }
  gl.shaderSource(shader, definesStr + src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, _consts2["default"].COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function extractAttributes(gl, program) {
  var attributes = [];
  var locationsCount = gl.getProgramParameter(program, _consts2["default"].ACTIVE_ATTRIBUTES);
  for (var i = 0; i < locationsCount; i++) {
    var infos = gl.getActiveAttrib(program, i);
    if (infos === -1 || infos === undefined || infos === null) {
      break;
    }
    var _location = gl.getAttribLocation(program, infos.name);
    gl.enableVertexAttribArray(_location);
    attributes[i] = new _AttributeInput2["default"](infos.name, infos.size, infos.type, _location);
  }
  return attributes;
}

function extractUniforms(gl, program) {
  var uniforms = [];
  var locationsCount = gl.getProgramParameter(program, _consts2["default"].ACTIVE_UNIFORMS);
  for (var i = 0; i < locationsCount; i++) {
    var infos = gl.getActiveUniform(program, i);
    if (infos === -1 || infos === undefined || infos === null) {
      break;
    }
    var _location2 = gl.getUniformLocation(program, infos.name);
    uniforms[i] = new _UniformInput2["default"](infos.name, infos.size, infos.type, _location2);
  }
  return uniforms;
}

function readShaderInputs(gl, program) {
  var result = {
    attributes: extractAttributes(gl, program),
    uniforms: {}
  };

  //extract arrays and structs
  extractUniforms(gl, program).forEach(function (item) {
    var target = result.uniforms;
    var key = undefined;
    var path = item.name.replace(/\[/g, ".").replace(/\]/g, "").split(".");
    path.forEach(function (pathItem) {
      if (key !== undefined) {
        if (target[key] === undefined) {
          var index = parseInt(pathItem);
          if (index < 0 || index >= 0) {
            target[key] = [];
            pathItem = index;
          } else {
            target[key] = {};
          }
        }
        target = target[key];
      }
      key = pathItem;
    });
    target[key] = item;
  });
  return result;
}

var Program = (function () {
  function Program(vertexShaderSrc, fragmentShaderSrc) {
    _classCallCheck(this, Program);

    this.vertexShaderSrc = vertexShaderSrc;
    this.fragmentShaderSrc = fragmentShaderSrc;
    this.attributesInputs = undefined;
    this.uniformsInputs = undefined;
    this.isInit = false;

    this.defines = {};
  }

  _createClass(Program, [{
    key: "initGL",
    value: function initGL(context) {
      var gl = context.glContext;
      this.glProgram = gl.createProgram();

      var vSrc = this.vertexShaderSrc;
      var vShader = initShader(gl, this.vertexShaderSrc, _consts2["default"].VERTEX_SHADER, this.defines);
      gl.attachShader(this.glProgram, vShader);

      var fShader = initShader(gl, this.fragmentShaderSrc, _consts2["default"].FRAGMENT_SHADER, this.defines);
      gl.attachShader(this.glProgram, fShader);

      gl.linkProgram(this.glProgram);

      var inputs = readShaderInputs(gl, this.glProgram);
      this.attributesInputs = inputs.attributes;
      this.uniformsInputs = inputs.uniforms;

      if (!gl.getProgramParameter(this.glProgram, _consts2["default"].LINK_STATUS)) {
        throw new Error("Could not initialise shaders");
      }
      this.isInit = true;
    }
  }, {
    key: "setDefines",
    value: function setDefines(defines) {
      for (var defineName in defines) {
        if (this.defines[defineName] !== defines[defineName]) {
          this.defines[defineName] = defines[defineName];
          this.isInit = false;
        }
      }
    }
  }]);

  return Program;
})();

exports["default"] = Program;
module.exports = exports["default"];

},{"./AttributeInput":6,"./UniformInput":16,"./consts":17}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Texture2 = require("./Texture");

var _Texture3 = _interopRequireDefault(_Texture2);

var RttTexture = (function (_Texture) {
  _inherits(RttTexture, _Texture);

  function RttTexture(frameBuffer) {
    _classCallCheck(this, RttTexture);

    _get(Object.getPrototypeOf(RttTexture.prototype), "constructor", this).call(this, null);
    this.frameBuffer = frameBuffer;
    this._image = this.frameBuffer;
  }

  _createClass(RttTexture, [{
    key: "initGL",
    value: function initGL(context) {
      _get(Object.getPrototypeOf(RttTexture.prototype), "initGL", this).call(this, context);
      var gl = context.glContext;
      var fbo = this.frameBuffer;
      if (fbo.glFrameBuffer === undefined) {
        throw new Error("frameBuffer not initialized");
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.glFrameBuffer);
      gl.activeTexture(gl.TEXTURE0 + this.textureId);
      gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
      this.resize(fbo.width, fbo.height);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.glTexture, 0);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      if (this.context === undefined) {
        return;
      }
      var gl = this.context.glContext;
      var fbo = this.frameBuffer;
      gl.activeTexture(gl.TEXTURE0 + this.textureId);
      gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fbo.width, fbo.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  }, {
    key: "updateGL",
    value: function updateGL(context) {
      var gl = context.glContext;
      gl.activeTexture(gl.TEXTURE0 + this.textureId);
      gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
      //gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
      this.needsUpdate = false;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[RttTexture w:" + this.frameBuffer.width + " h:" + this.frameBuffer.height + "]";
    }
  }]);

  return RttTexture;
})(_Texture3["default"]);

exports["default"] = RttTexture;
module.exports = exports["default"];

},{"./Texture":15}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var Texture = (function () {
  function Texture(image) {
    _classCallCheck(this, Texture);

    this.image = image;
    this.isInit = false;
  }

  _createClass(Texture, [{
    key: "initGL",
    value: function initGL(context) {
      this.context = context;
      var gl = this.context.glContext;
      this.glTexture = gl.createTexture();

      this.textureId = context.getTextureId();

      gl.activeTexture(_consts2["default"].TEXTURE0 + this.textureId);
      gl.bindTexture(_consts2["default"].TEXTURE_2D, this.glTexture);

      gl.texParameteri(_consts2["default"].TEXTURE_2D, _consts2["default"].TEXTURE_MAG_FILTER, _consts2["default"].LINEAR);
      gl.texParameteri(_consts2["default"].TEXTURE_2D, _consts2["default"].TEXTURE_MIN_FILTER, _consts2["default"].LINEAR);
      //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_MAG_FILTER, consts.NEAREST);
      //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_MIN_FILTER, consts.NEAREST);

      gl.texParameteri(_consts2["default"].TEXTURE_2D, _consts2["default"].TEXTURE_WRAP_S, _consts2["default"].CLAMP_TO_EDGE);
      gl.texParameteri(_consts2["default"].TEXTURE_2D, _consts2["default"].TEXTURE_WRAP_T, _consts2["default"].CLAMP_TO_EDGE);
      //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_WRAP_S, consts.REPEAT);
      //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_WRAP_T, consts.REPEAT);
      gl.bindTexture(_consts2["default"].TEXTURE_2D, null);
      this.isInit = true;
    }
  }, {
    key: "updateGL",
    value: function updateGL(context) {
      var gl = context.glContext;
      gl.activeTexture(_consts2["default"].TEXTURE0 + this.textureId);
      gl.bindTexture(_consts2["default"].TEXTURE_2D, this.glTexture);
      gl.pixelStorei(_consts2["default"].UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(_consts2["default"].TEXTURE_2D, 0, _consts2["default"].RGBA, _consts2["default"].RGBA, _consts2["default"].UNSIGNED_BYTE, this._image);
      gl.bindTexture(_consts2["default"].TEXTURE_2D, null);
      this.needsUpdate = false;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Texture w:" + this._image.width + " h:" + this._image.height + " image : " + this._image + "]";
    }
  }, {
    key: "dispose",
    value: function dispose() {
      //TODO: actual dispose
    }
  }, {
    key: "image",
    get: function get() {
      return this._image;
    },
    set: function set(value) {
      this._image = value;
      this.needsUpdate = true;
    }
  }]);

  return Texture;
})();

exports["default"] = Texture;
module.exports = exports["default"];

},{"./consts":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var uploadFuncs = {};
uploadFuncs[_consts2["default"].FLOAT] = function (context, data) {
  context.glContext.uniform1f(this.location, data);
};
uploadFuncs[_consts2["default"].INT] = function (context, data) {
  context.glContext.uniform1i(this.location, data);
};
uploadFuncs[_consts2["default"].FLOAT_VEC2] = function (context, data) {
  context.glContext.uniform2f(this.location, data.x, data.y);
};
uploadFuncs[_consts2["default"].INT_VEC2] = function (context, data) {
  context.glContext.uniform2i(this.location, data.x, data.y);
};
uploadFuncs[_consts2["default"].FLOAT_VEC3] = function (context, data) {
  context.glContext.uniform3f(this.location, data.x, data.y, data.z);
};
uploadFuncs[_consts2["default"].INT_VEC3] = function (context, data) {
  context.glContext.uniform3i(this.location, data.x, data.y, data.z);
};
uploadFuncs[_consts2["default"].FLOAT_VEC4] = function (context, data) {
  context.glContext.uniform4f(this.location, data.x, data.y, data.z, data.w);
};
uploadFuncs[_consts2["default"].INT_VEC4] = function (context, data) {
  context.glContext.uniform4i(this.location, data.x, data.y, data.z, data.w);
};

uploadFuncs[_consts2["default"].FLOAT_MAT2] = function (context, data) {
  context.glContext.uniformMatrix2fv(this.location, false, data);
};
uploadFuncs[_consts2["default"].FLOAT_MAT3] = function (context, data) {
  context.glContext.uniformMatrix3fv(this.location, false, data);
};
uploadFuncs[_consts2["default"].FLOAT_MAT4] = function (context, data) {
  context.glContext.uniformMatrix4fv(this.location, false, data);
};

uploadFuncs[_consts2["default"].SAMPLER_2D] = function (context, data) {
  var gl = context.glContext;
  if (!data.isInit) {
    data.initGL(context);
  }
  if (data.needsUpdate) {
    data.updateGL(context);
  }
  gl.activeTexture(gl.TEXTURE0 + data.textureId);
  gl.bindTexture(gl.TEXTURE_2D, data.glTexture);
  gl.uniform1i(this.location, data.textureId);
};

uploadFuncs[_consts2["default"].SAMPLER_CUBE] = function (context, data) {
  var gl = context.glContext;
  if (!data.isInit) {
    data.initGL(context);
  }
  if (data.needsUpdate) {
    data.updateGL(context);
  }
  gl.activeTexture(gl.TEXTURE0 + data.textureId);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, data.glTexture);
  gl.uniform1i(this.location, data.textureId);
};

var uploadFuncsV = {};
uploadFuncsV[_consts2["default"].FLOAT] = function (gl, data) {
  gl.uniform1fv(this.location, data);
};
uploadFuncsV[_consts2["default"].INT] = function (gl, data) {
  gl.uniform1iv(this.location, data);
};
uploadFuncsV[_consts2["default"].FLOAT_VEC2] = function (gl, data) {
  gl.uniform2fv(this.location, data);
};
uploadFuncsV[_consts2["default"].int2] = function (gl, data) {
  gl.uniform2iv(this.location, data);
};
uploadFuncsV[_consts2["default"].FLOAT_VEC3] = function (gl, data) {
  gl.uniform3fv(this.location, data);
};
uploadFuncsV[_consts2["default"].INT_VEC3] = function (gl, data) {
  gl.uniform3iv(this.location, data);
};
uploadFuncsV[_consts2["default"].FLOAT_VEC4] = function (gl, data) {
  gl.uniform4fv(this.location, data);
};
uploadFuncsV[_consts2["default"].INT4] = function (gl, data) {
  gl.uniform4iv(this.location, data);
};

var UniformInput = (function () {
  function UniformInput(name, size, type, location) {
    _classCallCheck(this, UniformInput);

    this.name = name;
    this.size = size;
    this.type = type;
    this.location = location;

    var funcsSet = size === 1 ? uploadFuncs : uploadFuncsV;
    this.updateFunc = funcsSet[this.type];
  }

  _createClass(UniformInput, [{
    key: "updateGL",
    value: function updateGL(context, data) {
      this.updateFunc(context, data.valueOf());
    }
  }]);

  return UniformInput;
})();

exports["default"] = UniformInput;
module.exports = exports["default"];

},{"./consts":17}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

  /* ClearBufferMask */
  DEPTH_BUFFER_BIT: 0x00000100,
  STENCIL_BUFFER_BIT: 0x00000400,
  COLOR_BUFFER_BIT: 0x00004000,

  /* BeginMode */
  POINTS: 0x0000,
  LINES: 0x0001,
  LINE_LOOP: 0x0002,
  LINE_STRIP: 0x0003,
  TRIANGLES: 0x0004,
  TRIANGLE_STRIP: 0x0005,
  TRIANGLE_FAN: 0x0006,

  /* AlphaFunction (not supported in ES20) */
  /* NEVER */
  /* LESS */
  /* EQUAL */
  /* LEQUAL */
  /* GREATER */
  /* NOTEQUAL */
  /* GEQUAL */
  /* ALWAYS */

  /* BlendingFactorDest */
  ZERO: 0,
  ONE: 1,
  SRC_COLOR: 0x0300,
  ONE_MINUS_SRC_COLOR: 0x0301,
  SRC_ALPHA: 0x0302,
  ONE_MINUS_SRC_ALPHA: 0x0303,
  DST_ALPHA: 0x0304,
  ONE_MINUS_DST_ALPHA: 0x0305,

  /* BlendingFactorSrc */
  /* ZERO */
  /* ONE */
  DST_COLOR: 0x0306,
  ONE_MINUS_DST_COLOR: 0x0307,
  SRC_ALPHA_SATURATE: 0x0308,
  /* SRC_ALPHA */
  /* ONE_MINUS_SRC_ALPHA */
  /* DST_ALPHA */
  /* ONE_MINUS_DST_ALPHA */

  /* BlendEquationSeparate */
  FUNC_ADD: 0x8006,
  BLEND_EQUATION: 0x8009,
  BLEND_EQUATION_RGB: 0x8009, /* same as BLEND_EQUATION */
  BLEND_EQUATION_ALPHA: 0x883D,

  /* BlendSubtract */
  FUNC_SUBTRACT: 0x800A,
  FUNC_REVERSE_SUBTRACT: 0x800B,

  /* Separate Blend Functions */
  BLEND_DST_RGB: 0x80C8,
  BLEND_SRC_RGB: 0x80C9,
  BLEND_DST_ALPHA: 0x80CA,
  BLEND_SRC_ALPHA: 0x80CB,
  CONSTANT_COLOR: 0x8001,
  ONE_MINUS_CONSTANT_COLOR: 0x8002,
  CONSTANT_ALPHA: 0x8003,
  ONE_MINUS_CONSTANT_ALPHA: 0x8004,
  BLEND_COLOR: 0x8005,

  /* Buffer Objects */
  ARRAY_BUFFER: 0x8892,
  ELEMENT_ARRAY_BUFFER: 0x8893,
  ARRAY_BUFFER_BINDING: 0x8894,
  ELEMENT_ARRAY_BUFFER_BINDING: 0x8895,

  STREAM_DRAW: 0x88E0,
  STATIC_DRAW: 0x88E4,
  DYNAMIC_DRAW: 0x88E8,

  BUFFER_SIZE: 0x8764,
  BUFFER_USAGE: 0x8765,

  CURRENT_VERTEX_ATTRIB: 0x8626,

  /* CullFaceMode */
  FRONT: 0x0404,
  BACK: 0x0405,
  FRONT_AND_BACK: 0x0408,

  /* DepthFunction */
  /* NEVER */
  /* LESS */
  /* EQUAL */
  /* LEQUAL */
  /* GREATER */
  /* NOTEQUAL */
  /* GEQUAL */
  /* ALWAYS */

  /* EnableCap */
  /* TEXTURE_2D */
  CULL_FACE: 0x0B44,
  BLEND: 0x0BE2,
  DITHER: 0x0BD0,
  STENCIL_TEST: 0x0B90,
  DEPTH_TEST: 0x0B71,
  SCISSOR_TEST: 0x0C11,
  POLYGON_OFFSET_FILL: 0x8037,
  SAMPLE_ALPHA_TO_COVERAGE: 0x809E,
  SAMPLE_COVERAGE: 0x80A0,

  /* ErrorCode */
  NO_ERROR: 0,
  INVALID_ENUM: 0x0500,
  INVALID_VALUE: 0x0501,
  INVALID_OPERATION: 0x0502,
  OUT_OF_MEMORY: 0x0505,

  /* FrontFaceDirection */
  CW: 0x0900,
  CCW: 0x0901,

  /* GetPName */
  LINE_WIDTH: 0x0B21,
  ALIASED_POINT_SIZE_RANGE: 0x846D,
  ALIASED_LINE_WIDTH_RANGE: 0x846E,
  CULL_FACE_MODE: 0x0B45,
  FRONT_FACE: 0x0B46,
  DEPTH_RANGE: 0x0B70,
  DEPTH_WRITEMASK: 0x0B72,
  DEPTH_CLEAR_VALUE: 0x0B73,
  DEPTH_FUNC: 0x0B74,
  STENCIL_CLEAR_VALUE: 0x0B91,
  STENCIL_FUNC: 0x0B92,
  STENCIL_FAIL: 0x0B94,
  STENCIL_PASS_DEPTH_FAIL: 0x0B95,
  STENCIL_PASS_DEPTH_PASS: 0x0B96,
  STENCIL_REF: 0x0B97,
  STENCIL_VALUE_MASK: 0x0B93,
  STENCIL_WRITEMASK: 0x0B98,
  STENCIL_BACK_FUNC: 0x8800,
  STENCIL_BACK_FAIL: 0x8801,
  STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
  STENCIL_BACK_REF: 0x8CA3,
  STENCIL_BACK_VALUE_MASK: 0x8CA4,
  STENCIL_BACK_WRITEMASK: 0x8CA5,
  VIEWPORT: 0x0BA2,
  SCISSOR_BOX: 0x0C10,
  /* SCISSOR_TEST */
  COLOR_CLEAR_VALUE: 0x0C22,
  COLOR_WRITEMASK: 0x0C23,
  UNPACK_ALIGNMENT: 0x0CF5,
  PACK_ALIGNMENT: 0x0D05,
  MAX_TEXTURE_SIZE: 0x0D33,
  MAX_VIEWPORT_DIMS: 0x0D3A,
  SUBPIXEL_BITS: 0x0D50,
  RED_BITS: 0x0D52,
  GREEN_BITS: 0x0D53,
  BLUE_BITS: 0x0D54,
  ALPHA_BITS: 0x0D55,
  DEPTH_BITS: 0x0D56,
  STENCIL_BITS: 0x0D57,
  POLYGON_OFFSET_UNITS: 0x2A00,
  /* POLYGON_OFFSET_FILL */
  POLYGON_OFFSET_FACTOR: 0x8038,
  TEXTURE_BINDING_2D: 0x8069,
  SAMPLE_BUFFERS: 0x80A8,
  SAMPLES: 0x80A9,
  SAMPLE_COVERAGE_VALUE: 0x80AA,
  SAMPLE_COVERAGE_INVERT: 0x80AB,

  /* GetTextureParameter */
  /* TEXTURE_MAG_FILTER */
  /* TEXTURE_MIN_FILTER */
  /* TEXTURE_WRAP_S */
  /* TEXTURE_WRAP_T */

  COMPRESSED_TEXTURE_FORMATS: 0x86A3,

  /* HintMode */
  DONT_CARE: 0x1100,
  FASTEST: 0x1101,
  NICEST: 0x1102,

  /* HintTarget */
  GENERATE_MIPMAP_HINT: 0x8192,

  /* DataType */
  BYTE: 0x1400,
  UNSIGNED_BYTE: 0x1401,
  SHORT: 0x1402,
  UNSIGNED_SHORT: 0x1403,
  INT: 0x1404,
  UNSIGNED_INT: 0x1405,
  FLOAT: 0x1406,

  /* PixelFormat */
  DEPTH_COMPONENT: 0x1902,
  ALPHA: 0x1906,
  RGB: 0x1907,
  RGBA: 0x1908,
  LUMINANCE: 0x1909,
  LUMINANCE_ALPHA: 0x190A,

  /* PixelType */
  /* UNSIGNED_BYTE */
  UNSIGNED_SHORT_4_4_4_4: 0x8033,
  UNSIGNED_SHORT_5_5_5_1: 0x8034,
  UNSIGNED_SHORT_5_6_5: 0x8363,

  /* Shaders */
  FRAGMENT_SHADER: 0x8B30,
  VERTEX_SHADER: 0x8B31,
  MAX_VERTEX_ATTRIBS: 0x8869,
  MAX_VERTEX_UNIFORM_VECTORS: 0x8DFB,
  MAX_VARYING_VECTORS: 0x8DFC,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8B4D,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8B4C,
  MAX_TEXTURE_IMAGE_UNITS: 0x8872,
  MAX_FRAGMENT_UNIFORM_VECTORS: 0x8DFD,
  SHADER_TYPE: 0x8B4F,
  DELETE_STATUS: 0x8B80,
  LINK_STATUS: 0x8B82,
  VALIDATE_STATUS: 0x8B83,
  ATTACHED_SHADERS: 0x8B85,
  ACTIVE_UNIFORMS: 0x8B86,
  ACTIVE_ATTRIBUTES: 0x8B89,
  SHADING_LANGUAGE_VERSION: 0x8B8C,
  CURRENT_PROGRAM: 0x8B8D,

  /* StencilFunction */
  NEVER: 0x0200,
  LESS: 0x0201,
  EQUAL: 0x0202,
  LEQUAL: 0x0203,
  GREATER: 0x0204,
  NOTEQUAL: 0x0205,
  GEQUAL: 0x0206,
  ALWAYS: 0x0207,

  /* StencilOp */
  /* ZERO */
  KEEP: 0x1E00,
  REPLACE: 0x1E01,
  INCR: 0x1E02,
  DECR: 0x1E03,
  INVERT: 0x150A,
  INCR_WRAP: 0x8507,
  DECR_WRAP: 0x8508,

  /* StringName */
  VENDOR: 0x1F00,
  RENDERER: 0x1F01,
  VERSION: 0x1F02,

  /* TextureMagFilter */
  NEAREST: 0x2600,
  LINEAR: 0x2601,

  /* TextureMinFilter */
  /* NEAREST */
  /* LINEAR */
  NEAREST_MIPMAP_NEAREST: 0x2700,
  LINEAR_MIPMAP_NEAREST: 0x2701,
  NEAREST_MIPMAP_LINEAR: 0x2702,
  LINEAR_MIPMAP_LINEAR: 0x2703,

  /* TextureParameterName */
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,

  /* TextureTarget */
  TEXTURE_2D: 0x0DE1,
  TEXTURE: 0x1702,

  TEXTURE_CUBE_MAP: 0x8513,
  TEXTURE_BINDING_CUBE_MAP: 0x8514,
  TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
  TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
  TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
  TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
  TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
  TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851A,
  MAX_CUBE_MAP_TEXTURE_SIZE: 0x851C,

  /* TextureUnit */
  TEXTURE0: 0x84C0,
  TEXTURE1: 0x84C1,
  TEXTURE2: 0x84C2,
  TEXTURE3: 0x84C3,
  TEXTURE4: 0x84C4,
  TEXTURE5: 0x84C5,
  TEXTURE6: 0x84C6,
  TEXTURE7: 0x84C7,
  TEXTURE8: 0x84C8,
  TEXTURE9: 0x84C9,
  TEXTURE10: 0x84CA,
  TEXTURE11: 0x84CB,
  TEXTURE12: 0x84CC,
  TEXTURE13: 0x84CD,
  TEXTURE14: 0x84CE,
  TEXTURE15: 0x84CF,
  TEXTURE16: 0x84D0,
  TEXTURE17: 0x84D1,
  TEXTURE18: 0x84D2,
  TEXTURE19: 0x84D3,
  TEXTURE20: 0x84D4,
  TEXTURE21: 0x84D5,
  TEXTURE22: 0x84D6,
  TEXTURE23: 0x84D7,
  TEXTURE24: 0x84D8,
  TEXTURE25: 0x84D9,
  TEXTURE26: 0x84DA,
  TEXTURE27: 0x84DB,
  TEXTURE28: 0x84DC,
  TEXTURE29: 0x84DD,
  TEXTURE30: 0x84DE,
  TEXTURE31: 0x84DF,
  ACTIVE_TEXTURE: 0x84E0,

  /* TextureWrapMode */
  REPEAT: 0x2901,
  CLAMP_TO_EDGE: 0x812F,
  MIRRORED_REPEAT: 0x8370,

  /* Uniform Types */
  FLOAT_VEC2: 0x8B50,
  FLOAT_VEC3: 0x8B51,
  FLOAT_VEC4: 0x8B52,
  INT_VEC2: 0x8B53,
  INT_VEC3: 0x8B54,
  INT_VEC4: 0x8B55,
  BOOL: 0x8B56,
  BOOL_VEC2: 0x8B57,
  BOOL_VEC3: 0x8B58,
  BOOL_VEC4: 0x8B59,
  FLOAT_MAT2: 0x8B5A,
  FLOAT_MAT3: 0x8B5B,
  FLOAT_MAT4: 0x8B5C,
  SAMPLER_2D: 0x8B5E,
  SAMPLER_CUBE: 0x8B60,

  /* Vertex Arrays */
  VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
  VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
  VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
  VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
  VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886A,
  VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889F,

  /* Read Format */
  IMPLEMENTATION_COLOR_READ_TYPE: 0x8B9A,
  IMPLEMENTATION_COLOR_READ_FORMAT: 0x8B9B,

  /* Shader Source */
  COMPILE_STATUS: 0x8B81,

  /* Shader Precision-Specified Types */
  LOW_FLOAT: 0x8DF0,
  MEDIUM_FLOAT: 0x8DF1,
  HIGH_FLOAT: 0x8DF2,
  LOW_INT: 0x8DF3,
  MEDIUM_INT: 0x8DF4,
  HIGH_INT: 0x8DF5,

  /* Framebuffer Object. */
  FRAMEBUFFER: 0x8D40,
  RENDERBUFFER: 0x8D41,

  RGBA4: 0x8056,
  RGB5_A1: 0x8057,
  RGB565: 0x8D62,
  DEPTH_COMPONENT16: 0x81A5,
  STENCIL_INDEX: 0x1901,
  STENCIL_INDEX8: 0x8D48,
  DEPTH_STENCIL: 0x84F9,

  RENDERBUFFER_WIDTH: 0x8D42,
  RENDERBUFFER_HEIGHT: 0x8D43,
  RENDERBUFFER_INTERNAL_FORMAT: 0x8D44,
  RENDERBUFFER_RED_SIZE: 0x8D50,
  RENDERBUFFER_GREEN_SIZE: 0x8D51,
  RENDERBUFFER_BLUE_SIZE: 0x8D52,
  RENDERBUFFER_ALPHA_SIZE: 0x8D53,
  RENDERBUFFER_DEPTH_SIZE: 0x8D54,
  RENDERBUFFER_STENCIL_SIZE: 0x8D55,

  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8CD0,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8CD1,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8CD2,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8CD3,

  COLOR_ATTACHMENT0: 0x8CE0,
  DEPTH_ATTACHMENT: 0x8D00,
  STENCIL_ATTACHMENT: 0x8D20,
  DEPTH_STENCIL_ATTACHMENT: 0x821A,

  NONE: 0,

  FRAMEBUFFER_COMPLETE: 0x8CD5,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8CD6,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8CD7,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8CD9,
  FRAMEBUFFER_UNSUPPORTED: 0x8CDD,

  FRAMEBUFFER_BINDING: 0x8CA6,
  RENDERBUFFER_BINDING: 0x8CA7,
  MAX_RENDERBUFFER_SIZE: 0x84E8,

  INVALID_FRAMEBUFFER_OPERATION: 0x0506,

  /* WebGL-specific enums */
  UNPACK_FLIP_Y_WEBGL: 0x9240,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
  CONTEXT_LOST_WEBGL: 0x9242,
  UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,
  BROWSER_DEFAULT_WEBGL: 0x9244
};
module.exports = exports["default"];

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _AttributeBuffer = require("./AttributeBuffer");

var _AttributeBuffer2 = _interopRequireDefault(_AttributeBuffer);

var _AttributeInput = require("./AttributeInput");

var _AttributeInput2 = _interopRequireDefault(_AttributeInput);

var _consts = require("./consts");

var _consts2 = _interopRequireDefault(_consts);

var _Context = require("./Context");

var _Context2 = _interopRequireDefault(_Context);

var _DrawCall = require("./DrawCall");

var _DrawCall2 = _interopRequireDefault(_DrawCall);

var _DrawCallData = require("./DrawCallData");

var _DrawCallData2 = _interopRequireDefault(_DrawCallData);

var _FrameBuffer = require("./FrameBuffer");

var _FrameBuffer2 = _interopRequireDefault(_FrameBuffer);

var _IdsAttribute = require("./IdsAttribute");

var _IdsAttribute2 = _interopRequireDefault(_IdsAttribute);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _Program = require("./Program");

var _Program2 = _interopRequireDefault(_Program);

var _RttTexture = require("./RttTexture");

var _RttTexture2 = _interopRequireDefault(_RttTexture);

var _Texture = require("./Texture");

var _Texture2 = _interopRequireDefault(_Texture);

var _UniformInput = require("./UniformInput");

var _UniformInput2 = _interopRequireDefault(_UniformInput);

exports["default"] = {
  AttributeBuffer: _AttributeBuffer2["default"],
  AttributeInput: _AttributeInput2["default"],
  consts: _consts2["default"],
  Context: _Context2["default"],
  DrawCall: _DrawCall2["default"],
  DrawCallData: _DrawCallData2["default"],
  FrameBuffer: _FrameBuffer2["default"],
  IdsAttribute: _IdsAttribute2["default"],
  index: _index2["default"],
  Program: _Program2["default"],
  RttTexture: _RttTexture2["default"],
  Texture: _Texture2["default"],
  UniformInput: _UniformInput2["default"]
};
module.exports = exports["default"];

},{"./AttributeBuffer":5,"./AttributeInput":6,"./Context":7,"./DrawCall":9,"./DrawCallData":10,"./FrameBuffer":11,"./IdsAttribute":12,"./Program":13,"./RttTexture":14,"./Texture":15,"./UniformInput":16,"./consts":17,"./index":18}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathSphere = require("../math/Sphere");

var _mathSphere2 = _interopRequireDefault(_mathSphere);

var Geometry = (function () {
  function Geometry(buffers, ids) {
    _classCallCheck(this, Geometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.setIds(ids);
    this.setAttributes(buffers, ids);
    this.boundingSphere = new _mathSphere2["default"]();
  }

  _createClass(Geometry, [{
    key: "setIds",
    value: function setIds(ids) {
      this.drawCallData.setIds(ids);
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(buffers) {
      this.drawCallData.setAttributes(buffers);
    }
  }, {
    key: "getBoundingSphere",
    value: function getBoundingSphere() {}
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      var positionInput = this.drawCallData.attributes.aVertexPosition;
      if (positionInput === undefined) {
        console.warn("missing aVertexPosition, is it intended?");
      }
      return this.drawCallData;
    }
  }]);

  return Geometry;
})();

exports["default"] = Geometry;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../math/Sphere":53}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = computeVertexNormals;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

//http://www.iquilezles.org/www/articles/normals/normals.htm

function computeVertexNormals(positions, ids) {
  var nVertices = positions.length / 3;
  var nFaces = ids.length / 3;

  var normals = new Float32Array(positions.length);

  var v = new _mathVec32["default"](),
      e1 = new _mathVec32["default"](),
      e2 = new _mathVec32["default"]();
  var p = positions,
      n = normals;

  for (var i = 0; i < nFaces; i++) {
    var faceId = 3 * i;
    var ia = 3 * ids[faceId];
    var ib = 3 * ids[faceId + 1];
    var ic = 3 * ids[faceId + 2];

    v.set(p[ib], p[ib + 1], p[ib + 2]);

    e1.set(p[ia], p[ia + 1], p[ia + 2]).sub(v);
    e2.set(p[ic], p[ic + 1], p[ic + 2]).sub(v);
    e2.cross(e1);

    n[ia] += e2.x;
    n[ia + 1] += e2.y;
    n[ia + 2] += e2.z;

    n[ib] += e2.x;
    n[ib + 1] += e2.y;
    n[ib + 2] += e2.z;

    n[ic] += e2.x;
    n[ic + 1] += e2.y;
    n[ic + 2] += e2.z;
  }

  for (var i = 0; i < nVertices; i++) {
    var id = i * 3;
    v.set(n[id], n[id + 1], n[id + 2]).normalize();
    n[id] = v.x;
    n[id + 1] = v.y;
    n[id + 2] = v.z;
  }

  return normals;
}

module.exports = exports["default"];

},{"../math/Vec3":55}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _computeVertexNormals = require("./computeVertexNormals");

var _computeVertexNormals2 = _interopRequireDefault(_computeVertexNormals);

var _Geometry = require("./Geometry");

var _Geometry2 = _interopRequireDefault(_Geometry);

var _mergeGeometries = require("./mergeGeometries");

var _mergeGeometries2 = _interopRequireDefault(_mergeGeometries);

exports["default"] = {
  computeVertexNormals: _computeVertexNormals2["default"],
  Geometry: _Geometry2["default"],
  mergeGeometries: _mergeGeometries2["default"]
};
module.exports = exports["default"];

},{"./Geometry":19,"./computeVertexNormals":20,"./mergeGeometries":22}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mergeGeometries;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _geometryGeometry = require("../geometry/Geometry");

var _geometryGeometry2 = _interopRequireDefault(_geometryGeometry);

function mergeGeometries(geometries) {
  var additionalNames = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var datas = geometries.map(function (geom) {
    return geom.getDrawCallData();
  });

  var ids = undefined;
  var mergeIds = function mergeIds() {

    var bufferLength = datas.reduce(function (n, data) {
      if (data.ids === undefined) {
        //TODO support geometries without ids
        throw new Error("geometries without not supported yet");
      }
      return n + data.ids.data.length;
    }, 0);
    var resultBuffer = new Uint32Array(bufferLength);

    datas.reduce(function (result, data) {
      var buffer = data.ids.data;
      var n = buffer.length;
      for (var i = 0; i < n; i++) {
        result.buffer[result.indexBegin + i] = result.positionBegin + buffer[i];
      }
      result.indexBegin += n;
      result.positionBegin += data.attributes.aVertexPosition.data.length / 3;
      return result;
    }, { indexBegin: 0, positionBegin: 0, buffer: resultBuffer });
    ids = resultBuffer;
  };

  var buffers = {};
  var mergeBuffer = function mergeBuffer(inputName) {

    var sample = datas[0].attributes[inputName];
    if (sample === undefined) return;
    var bufferType = sample.data.constructor;
    var bufferLength = datas.reduce(function (n, data) {
      var buffer = data.attributes[inputName].data;
      return n + buffer.length;
    }, 0);
    var resultBuffer = new bufferType(bufferLength);

    datas.reduce(function (result, data) {
      var buffer = data.attribute[inputName].data;
      var n = buffer.length;
      for (var i = 0; i < n; i++) {
        result.buffer[result.indexBegin + i] = buffer[i];
      }
      result.indexBegin += n;
      return result;
    }, { indexBegin: 0, buffer: resultBuffer });
    buffers[inputName] = resultBuffer;
  };

  mergeIds();

  var names = ["aVertexPosition", "aUV", "aVertexNormal"].concat(additionalNames);
  names.forEach(mergeBuffer);

  return new _geometryGeometry2["default"](buffers, ids);
}

module.exports = exports["default"];

},{"../geometry/Geometry":19}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controllers = require("./controllers/");

var _core = require("./core/");

var _geometry = require("./geometry/");

var _lights = require("./lights/");

var _loaders = require("./loaders/");

var _materials = require("./materials/");

var _math = require("./math/");

var _postProcessing = require("./postProcessing/");

var _primitives = require("./primitives/");

var _sceneObjects = require("./sceneObjects/");

var _sceneVisitors = require("./sceneVisitors/");

var _utils = require("./utils");

var _inputs = require("./inputs");

exports["default"] = {
  MouseControl: _controllers.MouseControl,

  consts: _core.consts,
  Context: _core.Context,
  DrawCall: _core.DrawCall,
  DrawCallData: _core.DrawCallData,
  FrameBuffer: _core.FrameBuffer,
  Program: _core.Program,
  RttTexture: _core.RttTexture,
  Texture: _core.Texture,

  computeVertexNormals: _geometry.computeVertexNormals,
  Geometry: _geometry.Geometry,
  mergeGeometries: _geometry.mergeGeometries,

  AmbientLight: _lights.AmbientLight,
  DirectionalLight: _lights.DirectionalLight,
  PointLight: _lights.PointLight,
  SpotLight: _lights.SpotLight,

  loadObj: _loaders.loadObj,
  loadImage: _loaders.loadImage,
  loadTexture: _loaders.loadTexture,
  loadCubeTexture: _loaders.loadCubeTexture,

  LightMaterial: _materials.LightMaterial,
  NormalMaterial: _materials.NormalMaterial,
  ShaderMaterial: _materials.ShaderMaterial,
  SolidMaterial: _materials.SolidMaterial,
  TestMaterial: _materials.TestMaterial,
  TextureMaterial: _materials.TextureMaterial,
  TunnelMaterial: _materials.TunnelMaterial,
  CubeMaterial: _materials.CubeMaterial,

  Color: _math.Color,
  Mat2: _math.Mat2,
  Mat3: _math.Mat3,
  Mat4: _math.Mat4,
  Quaternion: _math.Quaternion,
  Ray: _math.Ray,
  Sphere: _math.Sphere,
  Box: _math.Box,
  mathUtils: _math.utils,
  Vec2: _math.Vec2,
  Vec3: _math.Vec3,

  Colorize: _postProcessing.Colorize,
  Desaturate: _postProcessing.Desaturate,
  Pass: _postProcessing.Pass,
  PostProcessor: _postProcessing.PostProcessor,

  CubeGeometry: _primitives.CubeGeometry,
  CylinderGeometry: _primitives.CylinderGeometry,
  QuadGeometry: _primitives.QuadGeometry,
  SphereGeometry: _primitives.SphereGeometry,
  TorusGeometry: _primitives.TorusGeometry,
  TubeGeometry: _primitives.TubeGeometry,

  Camera: _sceneObjects.Camera,
  Group: _sceneObjects.Group,
  Mesh: _sceneObjects.Mesh,
  SceneNode: _sceneObjects.SceneNode,
  Basis: _sceneObjects.Basis,

  DrawCallsVisitor: _sceneVisitors.DrawCallsVisitor,
  LightsVisitor: _sceneVisitors.LightsVisitor,
  NamesVisitor: _sceneVisitors.NamesVisitor,
  SceneRenderer: _sceneVisitors.SceneRenderer,
  TransformsVisitor: _sceneVisitors.TransformsVisitor,
  traverseTree: _sceneVisitors.traverseTree,

  Log: _utils.Log,
  Loop: _utils.Loop,
  Signal: _utils.Signal,
  utils: _utils.utils,

  Keyboard: _inputs.Keyboard,
  Mouse: _inputs.Mouse
};
module.exports = exports["default"];

},{"./controllers/":4,"./core/":18,"./geometry/":21,"./inputs":26,"./lights/":31,"./loaders/":32,"./materials/":45,"./math/":56,"./postProcessing/":62,"./primitives/":69,"./sceneObjects/":75,"./sceneVisitors/":81,"./utils":86}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsSignal = require("../utils/Signal");

var _utilsSignal2 = _interopRequireDefault(_utilsSignal);

var Keyboard = (function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this._keys = {};
    this._preventDefaultKeys = [];
    this.onDown = new _utilsSignal2["default"]();
    this.onUp = new _utilsSignal2["default"]();
    this._downBind = this._onKeyDown.bind(this);
    this._upBind = this._onKeyUp.bind(this);
    document.addEventListener("keydown", this._downBind);
    document.addEventListener("keyup", this._upBind);
  }

  _createClass(Keyboard, [{
    key: "_onKeyDown",
    value: function _onKeyDown(e) {
      e = e || window.event;
      this._doPreventDefault(e);
      if (this._keys[e.keyCode]) {
        return;
      }
      this._keys[e.keyCode] = true;
      this._call(this.onDown, e.keyCode);
    }
  }, {
    key: "_onKeyUp",
    value: function _onKeyUp(e) {
      e = e || window.event;
      this._doPreventDefault(e);
      this._keys[e.keyCode] = false;
      this._call(this.onUp, e.keyCode);
    }
  }, {
    key: "_call",
    value: function _call(signal, keyCode) {
      var listeners = signal.listeners;
      var n = listeners.length;
      for (var i = 0; i < n; i++) {
        var listener = listeners[i];
        if (!listener.args[0]) {
          listener.callback.apply(listener.scope, [keyCode].concat(listener.args));
        } else if (listener.args[0] == keyCode) {
          listener.callback.apply(listener.scope, listener.args);
        }
      }
    }
  }, {
    key: "isDown",
    value: function isDown(key) {
      return this._keys[key] || false;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.onDown.dispose();
      this.onUp.dispose();
      document.removeEventListener("keydown", this._downBind);
      document.removeEventListener("keyup", this._upCallBind);
    }
  }, {
    key: "preventDefault",
    value: function preventDefault(keys) {
      if (keys) {
        this._preventDefaultKeys = this._preventDefaultKeys.concat(keys);
      } else {
        this._preventDefaultKeys = [-1];
      }
    }
  }, {
    key: "_doPreventDefault",
    value: function _doPreventDefault(e) {
      var k = this._preventDefaultKeys;
      if (k.indexOf(e.keyCode) != -1 || k[0] == -1) {
        e.preventDefault();
      }
    }
  }]);

  return Keyboard;
})();

exports["default"] = Keyboard;
module.exports = exports["default"];

},{"../utils/Signal":85}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsSignal = require("../utils/Signal");

var _utilsSignal2 = _interopRequireDefault(_utilsSignal);

function getNumericStyleProperty(style, prop) {
  return parseInt(style.getPropertyValue(prop), 10);
}

function elementPosition(e) {
  var x = 0,
      y = 0;
  var inner = true;
  do {
    x += e.offsetLeft;
    y += e.offsetTop;
    var style = getComputedStyle(e, null);
    var borderTop = getNumericStyleProperty(style, "border-top-width");
    var borderLeft = getNumericStyleProperty(style, "border-left-width");
    y += borderTop;
    x += borderLeft;
    if (inner) {
      var paddingTop = getNumericStyleProperty(style, "padding-top");
      var paddingLeft = getNumericStyleProperty(style, "padding-left");
      y += paddingTop;
      x += paddingLeft;
    }
    inner = false;
  } while (Boolean(e = e.offsetParent));
  return { x: x, y: y };
}

var Mouse = (function () {
  function Mouse(target) {
    _classCallCheck(this, Mouse);

    this.x = this.y = 0;
    this.oldX = this.oldY = 0;
    this.isDown = false;
    this.target = target || document;

    this.onDown = new _utilsSignal2["default"]();
    this.onUp = new _utilsSignal2["default"]();
    this.onMove = new _utilsSignal2["default"]();
    this.onWheel = new _utilsSignal2["default"]();

    this._moveBind = this._onMouseMove.bind(this);
    this._downBind = this._onMouseDown.bind(this);
    this._upBind = this._onMouseUp.bind(this);
    this._wheelBind = this._onMouseWheel.bind(this);
    this._enabled = false;
    this.enable();
  }

  _createClass(Mouse, [{
    key: "enable",
    value: function enable() {
      if (this._enabled) {
        return;
      }
      this.target.addEventListener("mousemove", this._moveBind);
      this.target.addEventListener("mousedown", this._downBind);
      this.target.addEventListener("mouseup", this._upBind);
      this.target.addEventListener("mousewheel", this._wheelBind);
      this._enabled = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.target.removeEventListener("mousemove", this._moveBind);
      this.target.removeEventListener("mousedown", this._downBind);
      this.target.removeEventListener("mouseup", this._upBind);
      this.target.removeEventListener("mousewheel", this._wheelBind);
      this._enabled = false;
    }
  }, {
    key: "_onMouseMove",
    value: function _onMouseMove(e) {
      this.savePos();

      var p = elementPosition(e.target);
      this.x = e.pageX - p.x;
      this.y = e.pageY - p.y;
      this.onMove.dispatch();
    }
  }, {
    key: "_onMouseDown",
    value: function _onMouseDown(e) {
      this.isDown = true;
      this.savePos();
      this.onDown.dispatch();
    }
  }, {
    key: "_onMouseUp",
    value: function _onMouseUp(e) {
      this.isDown = false;
      this.savePos();
      this.onUp.dispatch();
    }
  }, {
    key: "_onMouseWheel",
    value: function _onMouseWheel(e) {
      var delta = 0;
      if (event.wheelDelta !== undefined) {
        delta = event.wheelDelta;
      } else if (event.detail !== undefined) {
        delta = -event.detail;
      }
      this.onWheel.dispatch(delta);
    }
  }, {
    key: "savePos",
    value: function savePos() {
      this.oldX = this.x;
      this.oldY = this.y;
    }
  }, {
    key: "point",
    value: function point(pt) {
      pt = pt || {};
      pt.x = this.x;
      pt.y = this.y;
      return pt;
    }
  }, {
    key: "showHand",
    value: function showHand() {
      this.target.style.cursor = "hand";
    }
  }, {
    key: "hideHand",
    value: function hideHand() {
      this.target.style.cursor = "default";
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.onDown.dispose();
      this.onUp.dispose();
      this.onMove.dispose();
      this.disable();
    }
  }]);

  return Mouse;
})();

exports["default"] = Mouse;
module.exports = exports["default"];

},{"../utils/Signal":85}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Keyboard = require("./Keyboard");

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Mouse = require("./Mouse");

var _Mouse2 = _interopRequireDefault(_Mouse);

exports["default"] = {
  Keyboard: _Keyboard2["default"],
  Mouse: _Mouse2["default"]
};
module.exports = exports["default"];

},{"./Keyboard":24,"./Mouse":25}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _sceneObjectsSceneNode = require("../sceneObjects/SceneNode");

var _sceneObjectsSceneNode2 = _interopRequireDefault(_sceneObjectsSceneNode);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var AmbientLight = (function (_SceneNode) {
  _inherits(AmbientLight, _SceneNode);

  function AmbientLight(color) {
    _classCallCheck(this, AmbientLight);

    _get(Object.getPrototypeOf(AmbientLight.prototype), "constructor", this).call(this);
    this.isLightEmitter = true;

    this.color = new _mathColor2["default"](color);
  }

  _createClass(AmbientLight, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      var obj = {};
      this.drawCallData.setUniforms({
        ambientLight: this.color
      });
      return this.drawCallData;
    }
  }]);

  return AmbientLight;
})(_sceneObjectsSceneNode2["default"]);

exports["default"] = AmbientLight;
module.exports = exports["default"];

},{"../math/Color":47,"../sceneObjects/SceneNode":74}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _sceneObjectsSceneNode = require("../sceneObjects/SceneNode");

var _sceneObjectsSceneNode2 = _interopRequireDefault(_sceneObjectsSceneNode);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var DirectionalLight = (function (_SceneNode) {
  _inherits(DirectionalLight, _SceneNode);

  function DirectionalLight() {
    _classCallCheck(this, DirectionalLight);

    _get(Object.getPrototypeOf(DirectionalLight.prototype), "constructor", this).call(this);
    this.isLightEmitter = true;
    this.lightType = "directional";

    this.diffuse = new _mathColor2["default"](0.8, 0.8, 0.8);
    this.specular = new _mathColor2["default"](0.8, 0.8, 0.8);
    this.ambient = new _mathColor2["default"](0.8, 0.8, 0.8);
    this.direction = new _mathVec32["default"](-1, -1, -1);
  }

  _createClass(DirectionalLight, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      var obj = {};
      this.drawCallData.setUniforms({
        directionalLights: [{
          lightModel: {
            diffuse: this.diffuse,
            specular: this.specular,
            ambient: this.ambient
          },
          direction: this.direction,
          globalTransform: this._globalTransform
        }]
      });
      return this.drawCallData;
    }
  }]);

  return DirectionalLight;
})(_sceneObjectsSceneNode2["default"]);

exports["default"] = DirectionalLight;
module.exports = exports["default"];

},{"../math/Color":47,"../math/Vec3":55,"../sceneObjects/SceneNode":74}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _sceneObjectsSceneNode = require("../sceneObjects/SceneNode");

var _sceneObjectsSceneNode2 = _interopRequireDefault(_sceneObjectsSceneNode);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var PointLight = (function (_SceneNode) {
  _inherits(PointLight, _SceneNode);

  function PointLight() {
    _classCallCheck(this, PointLight);

    _get(Object.getPrototypeOf(PointLight.prototype), "constructor", this).call(this);
    this.isLightEmitter = true;
    this.lightType = "point";

    this.diffuse = new _mathColor2["default"](0.4, 0.4, 0.6);
    this.specular = new _mathColor2["default"](0.8, 0.8, 0.8);
    this.ambient = new _mathColor2["default"](0.4, 0.4, 0.6);
    this.cutoff = 20;
    this.decay = 2;
  }

  _createClass(PointLight, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      var obj = {};
      this.drawCallData.setUniforms({
        pointLights: [{
          lightModel: {
            diffuse: this.diffuse,
            specular: this.specular,
            ambient: this.ambient
          },
          cutoff: this.cutoff,
          decay: this.decay,
          position: this.position,
          globalTransform: this._globalTransform
        }]
      });
      return this.drawCallData;
    }
  }]);

  return PointLight;
})(_sceneObjectsSceneNode2["default"]);

exports["default"] = PointLight;
module.exports = exports["default"];

},{"../math/Color":47,"../math/Vec3":55,"../sceneObjects/SceneNode":74}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _sceneObjectsSceneNode = require("../sceneObjects/SceneNode");

var _sceneObjectsSceneNode2 = _interopRequireDefault(_sceneObjectsSceneNode);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var SpotLight = (function (_SceneNode) {
  _inherits(SpotLight, _SceneNode);

  function SpotLight() {
    _classCallCheck(this, SpotLight);

    _get(Object.getPrototypeOf(SpotLight.prototype), "constructor", this).call(this);
    this.isLightEmitter = true;
    this.lightType = "spot";

    this.diffuse = new _mathColor2["default"](0.6, 0.4, 0.4);
    this.specular = new _mathColor2["default"](0.8, 0.8, 0.8);
    this.ambient = new _mathColor2["default"](0.6, 0.4, 0.4);
    this.direction = new _mathColor2["default"](0.5, 1, 1);
    this.cutoff = 10;
    this.decay = 2;
    this.cutoffAngle = Math.PI / 2;
    this.exponent = 10;
  }

  _createClass(SpotLight, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      var obj = {};
      this.drawCallData.setUniforms({
        spotLights: [{
          lightModel: {
            diffuse: this.diffuse,
            specular: this.specular,
            ambient: this.ambient
          },
          direction: this.direction,
          cutoff: this.cutoff,
          decay: this.decay,
          cutoffAngle: this.cutoffAngle,
          exponent: this.exponent,
          position: this.position,
          globalTransform: this._globalTransform
        }]
      });
      return this.drawCallData;
    }
  }]);

  return SpotLight;
})(_sceneObjectsSceneNode2["default"]);

exports["default"] = SpotLight;
module.exports = exports["default"];

},{"../math/Color":47,"../math/Vec3":55,"../sceneObjects/SceneNode":74}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _AmbientLight = require("./AmbientLight");

var _AmbientLight2 = _interopRequireDefault(_AmbientLight);

var _DirectionalLight = require("./DirectionalLight");

var _DirectionalLight2 = _interopRequireDefault(_DirectionalLight);

var _PointLight = require("./PointLight");

var _PointLight2 = _interopRequireDefault(_PointLight);

var _SpotLight = require("./SpotLight");

var _SpotLight2 = _interopRequireDefault(_SpotLight);

exports["default"] = {
  AmbientLight: _AmbientLight2["default"],
  DirectionalLight: _DirectionalLight2["default"],
  PointLight: _PointLight2["default"],
  SpotLight: _SpotLight2["default"]
};
module.exports = exports["default"];

},{"./AmbientLight":27,"./DirectionalLight":28,"./PointLight":29,"./SpotLight":30}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _loadObj = require("./loadObj");

var _loadObj2 = _interopRequireDefault(_loadObj);

var _loadTexture = require("./loadTexture");

var _loadTexture2 = _interopRequireDefault(_loadTexture);

var _loadTexture3 = _interopRequireDefault(_loadTexture);

var _loadCubeTexture = require("./loadCubeTexture");

var _loadCubeTexture2 = _interopRequireDefault(_loadCubeTexture);

exports["default"] = {
  loadObj: _loadObj2["default"],
  loadImage: _loadTexture2["default"],
  loadTexture: _loadTexture3["default"],
  loadCubeTexture: _loadCubeTexture2["default"]
};
module.exports = exports["default"];

},{"./loadCubeTexture":33,"./loadObj":35,"./loadTexture":36}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadCubeTexture;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _coreCubeTexture = require("../core/CubeTexture");

var _coreCubeTexture2 = _interopRequireDefault(_coreCubeTexture);

var _loadImage = require("./loadImage");

var _loadImage2 = _interopRequireDefault(_loadImage);

var directions = ["px", "nx", "py", "ny", "pz", "nz"];

function loadCubeTexture(urls, textureOptions) {
  if (urls.constructor === String) {
    (function () {
      var path = url.split(".");
      var ext = path[path.length - 1];
      var base = path.slice(0, path.length - 1).join(".");
      urls = {};
      directions.forEach(function (direction) {
        return url[direction] = base + "/" + direction + "." + ext;
      });
    })();
  }

  var promises = [];

  var _loop = function (direction) {
    var url = urls[direction];
    var p = (0, _loadImage2["default"])(url).then(function (image) {
      return {
        direction: direction,
        img: image
      };
    });
    promises.push(p);
  };

  for (var direction in urls) {
    _loop(direction);
  }

  return Promise.all(promises).then(function (imgs) {
    var imgsObj = {};
    imgs.forEach(function (img) {
      imgsObj[img.direction] = img.img;
    });
    return new _coreCubeTexture2["default"](imgsObj);
  });
}

module.exports = exports["default"];

},{"../core/CubeTexture":8,"./loadImage":34}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadImage;

function loadImage(url) {
  return fetch(url).then(function (response) {
    return response.blob();
  }).then(function (imageBlob) {
    var image = new Image();
    image.src = URL.createObjectURL(imageBlob);
    return new Promise(function (resolve, reject) {
      image.onload = function () {
        resolve(image);
      };
    });
  });
}

module.exports = exports["default"];

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadObj;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _geometryGeometry = require("../geometry/Geometry");

var _geometryGeometry2 = _interopRequireDefault(_geometryGeometry);

var _geometryComputeVertexNormals = require("../geometry/computeVertexNormals");

var _geometryComputeVertexNormals2 = _interopRequireDefault(_geometryComputeVertexNormals);

function loadObj(url) {
  return fetch(url).then(function (response) {
    return response.text();
  }).then(parse);
}

function createObject(name) {
  return {
    name: name,
    positions: [],
    uvs: [],
    normals: [],
    triangles: []
  };
}

function readVertex(v) {
  var items = v.split("/");
  var pos = items[0];
  var uv = items[1] === undefined ? pos : items[1];
  var norm = items[2] === undefined ? pos : items[2];
  return {
    pos: Number(pos) - 1,
    uv: Number(uv) - 1,
    norm: Number(norm) - 1
  };
}

var patterns = [{
  pattern: /^o|g\s+(\S*)/g,
  func: function func(result, object) {
    return createObject(result[1]);
  }
}, {
  pattern: /^v\s+(\S+)\s+(\S+)\s+(\S+)/,
  func: function func(result, object) {
    if (object === undefined) {
      object = createObject("");
    }
    object.positions.push(Number(result[1]), Number(result[2]), Number(result[3]));
    return object;
  }
}, {
  pattern: /^vn\s+(\S+)\s+(\S+)\s+(\S+)/,
  func: function func(result, object) {
    if (object === undefined) {
      object = createObject("");
    }
    object.normals.push(Number(result[1]), Number(result[2]), Number(result[3]));
    return object;
  }
}, {
  pattern: /^vt\s+(\S+)\s+(\S+)\s+(\S+)/,
  func: function func(result, object) {
    if (object === undefined) {
      object = createObject("");
    }
    object.uvs.push(Number(result[1]), Number(result[2]), Number(result[3]));
    return object;
  }
}, {
  pattern: /^f\s+(\S+)\s+(\S+)\s+(\S+)/,
  func: function func(result, object) {
    if (object === undefined) {
      object = createObject("");
    }
    object.triangles.push({
      a: readVertex(result[1]),
      b: readVertex(result[3]),
      c: readVertex(result[2])
    });
    return object;
  }
}];

function addVertex(vertices, v) {
  v.id = v.pos;
  var candidates = vertices[v.id];
  if (candidates === undefined) {
    vertices[v.id] = [v];
    return;
  }
  for (var i = 0, n = candidates.length; i < n; i++) {
    var candidate = candidates[i];
    if (candidate.pos === v.pos && candidate.norm === v.norm && candidate.uv === v.uv) {
      v.id = candidate.id;
      return;
    }
  }
  candidates.push(v);
  v.id = vertices.length;
  vertices[v.id] = [v];
}

function computeIndices(triangles) {
  var vertices = [];
  var ids = [];

  for (var i = 0, n = triangles.length; i < n; i++) {
    var t = triangles[i];
    addVertex(vertices, t.a);
    addVertex(vertices, t.b);
    addVertex(vertices, t.c);
    ids.push(t.a.id, t.b.id, t.c.id);
  }
  return {
    vertices: vertices,
    ids: ids
  };
}

function buildGeometry(object) {
  var mesh = computeIndices(object.triangles);
  var nVertices = mesh.vertices.length;
  var positions = new Float32Array(3 * nVertices);
  var ids = new Uint16Array(mesh.ids);
  var normals = new Float32Array(3 * nVertices);
  var uvs = new Float32Array(2 * nVertices);

  for (var i = 0; i < nVertices; i++) {
    var vertices = mesh.vertices[i];
    if (vertices === undefined) continue;
    var v = vertices[0];

    var pId = 3 * i;
    var oPId = 3 * v.pos;
    positions[pId] = object.positions[oPId];
    positions[pId + 1] = object.positions[oPId + 1];
    positions[pId + 2] = object.positions[oPId + 2];

    if (object.normals.length > 0) {
      var nId = 3 * i;
      var oNId = 3 * v.norm;
      normals[nId] = object.normals[oNId];
      normals[nId + 1] = object.normals[oNId + 1];
      normals[nId + 2] = object.normals[oNId + 2];
    }

    var tId = 2 * i;
    var oTId = 2 * v.uv;
    uvs[tId] = object.uvs[oTId];
    uvs[tId + 1] = object.uvs[oTId + 1];
    uvs[tId + 2] = object.uvs[oTId + 2];
  }

  if (normals.length <= 0) {
    normals = (0, _geometryComputeVertexNormals2["default"])(positions, ids);
  }

  return new _geometryGeometry2["default"]({
    aVertexPosition: positions,
    aVertexNormal: normals,
    aUV: uvs
  }, ids);
}

function parse(response) {

  //http://www.martinreddy.net/gfx/3d/OBJ.spec
  //http://www.fileformat.info/format/material/
  var lines = response.split("\n");
  var objects = [];
  var object = undefined;
  for (var i = 0, nLines = lines.length; i < nLines; i++) {
    var line = lines[i].trim();
    for (var j = 0, nPatterns = patterns.length; j < nPatterns; j++) {
      var p = patterns[j];
      var result = p.pattern.exec(line);
      if (result !== null) {
        var newObject = p.func(result, object);
        if (newObject !== object) {
          objects.push(newObject);
          object = newObject;
        }
        break;
      }
    }
  }

  return objects.map(buildGeometry);
}
module.exports = exports["default"];

},{"../geometry/Geometry":19,"../geometry/computeVertexNormals":20}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadTexture;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _coreTexture = require("../core/Texture");

var _coreTexture2 = _interopRequireDefault(_coreTexture);

var _loadImage = require("./loadImage");

var _loadImage2 = _interopRequireDefault(_loadImage);

function loadTexture(url, textureOptions) {
  return (0, _loadImage2["default"])(url).then(function (image) {
    console.log("image", image);
    return new _coreTexture2["default"](image, textureOptions);
  });
}

module.exports = exports["default"];

},{"../core/Texture":15,"./loadImage":34}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreConsts = require("../core/consts");

var _coreConsts2 = _interopRequireDefault(_coreConsts);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var vertex = "precision mediump float;\n\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aUV;\n\nuniform mat4 globalTransform;\nuniform mat3 normalMatrix;\n\nstruct Camera\n{\n  mat4 transform;\n  mat4 globalTransform;\n  mat4 projection;\n  vec3 position;\n};\n\nuniform Camera camera;\n\nvarying vec3 vWorldPosition;\nvarying vec3 vSurfaceNormal;\nvarying vec3 vCameraPosition;\n\nvec4 origin = vec4(vec3(0.0), 1.0);\n\nvoid main(void)\n{\n  vec4 vertexWorldPosition = globalTransform * vec4(aVertexPosition, 1.0); \n  vWorldPosition = vertexWorldPosition.xyz;\n  vSurfaceNormal = normalMatrix * aVertexNormal;\n  vCameraPosition = (camera.globalTransform * origin).xyz;\n  //gl_Position = camera.projection * camera.transform * vertexWorldPosition;\n  gl_Position = vec4(vec3(1.0, 1.0, -1.0) * aVertexPosition, 1.0);\n}";

var fragment = "\n\nprecision mediump float;\n\n\nstruct LightModel\n{\n  vec3 specular;\n  vec3 diffuse;\n  vec3 ambient;\n};\n\nstruct MaterialInfos{\n  LightModel lightModel;\n  float shininess;\n};\n\nstruct DirectionalLight {\n  LightModel lightModel;\n  vec3 direction;\n  mat4 globalTransform;\n};\n\nstruct SpotLight {\n  LightModel lightModel;\n  vec3 direction;\n  vec3 position;\n  float cutoff;\n  float decay;\n  float cutoffAngle;\n  float exponent;\n  mat4 globalTransform;\n};\n\nstruct PointLight {\n  LightModel lightModel;\n  vec3 position;\n  float cutoff;\n  float decay;\n  mat4 globalTransform;\n};\n\n\nuniform vec3 ambientLight;\nuniform MaterialInfos material;\nconst vec3 off = vec3(-1.0, 0.0, 1.0);\nvarying vec3 vWorldPosition;\nvarying vec3 vSurfaceNormal;\nvarying vec3 vCameraPosition;\n\n\n#ifdef DIRECTIONAL_LIGHT_COUNT\nuniform DirectionalLight directionalLights[DIRECTIONAL_LIGHT_COUNT];\n#endif\n#ifdef SPOT_LIGHT_COUNT\nuniform SpotLight spotLights[SPOT_LIGHT_COUNT];\n#endif\n#ifdef POINT_LIGHT_COUNT\nuniform PointLight pointLights[POINT_LIGHT_COUNT];\n#endif\n\n\nfloat lightAttenuation(float dist, float cutoff, float decay)\n{\n  return pow(clamp(1.0 - dist / cutoff, 0.0, 1.0), decay);\n}\n\nvec3 phong(vec3 surfaceNormal, vec3 viewDir, vec3 lightVector, LightModel lightModel, MaterialInfos material)\n{\n  float facing = 2.0 * float(gl_FrontFacing) - 1.0;\n  vec3 lightReflect = reflect(lightVector, facing * surfaceNormal);\n  LightModel mLightModel = material.lightModel;\n  float diffuseDot = max(dot(lightVector, facing * surfaceNormal), 0.0);\n  vec3 t1 = mLightModel.diffuse * diffuseDot * lightModel.diffuse;\n  vec3 t2 = step(0.0, diffuseDot) * mLightModel.specular * pow(max(dot(lightReflect, -viewDir), 0.0), material.shininess) * lightModel.specular;\n  return t1 + t2;\n}\n\nvec3 lights(vec3 surfacePosition, vec3 surfaceNormal, vec3 viewDir, MaterialInfos material)\n{\n  vec3 lightContribution = vec3(0.0);\n  #ifdef DIRECTIONAL_LIGHT_COUNT\n  for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++){\n    DirectionalLight light = directionalLights[i];\n    vec3 lightDir = normalize(-light.direction);//missing transformation\n    lightContribution += phong(surfaceNormal, viewDir, lightDir, light.lightModel, material);\n  }\n  #endif\n\n  #ifdef POINT_LIGHT_COUNT\n  for(int i = 0; i < POINT_LIGHT_COUNT; i++){\n    PointLight light = pointLights[i];\n    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;\n    float attenuation = lightAttenuation(length(sampleToLight), light.cutoff, light.decay);\n    lightContribution += attenuation * phong(surfaceNormal, viewDir, normalize(sampleToLight), light.lightModel, material);\n  }\n  #endif\n\n  #ifdef SPOT_LIGHT_COUNT\n  for(int i = 0; i < SPOT_LIGHT_COUNT; i++){\n    SpotLight light = spotLights[i];\n    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;\n    vec3 lightVector = normalize(sampleToLight);\n    float cone = dot(-lightVector, normalize(light.direction));\n    float spot = step(cos(light.cutoffAngle), cone) * pow(cone, light.exponent);\n    float attenuation = spot * lightAttenuation(length(sampleToLight), light.cutoff, light.decay);\n    lightContribution += attenuation * phong(surfaceNormal, viewDir, lightVector, light.lightModel, material);\n  }\n  #endif\n  return lightContribution;\n}\n\n\nuniform samplerCube texture;\n\nvoid main(void)\n{\n  vec3 viewDir = normalize(vCameraPosition - vWorldPosition);\n  vec3 surfaceNormal = normalize(vSurfaceNormal);\n\n  vec3 lightValue = material.lightModel.ambient * ambientLight + lights(vWorldPosition, surfaceNormal, viewDir, material);\n\n  vec3 color = mix(textureCube(texture, viewDir).xyz, vec3(1.0, 0.0, 0.0), 0.1);\n  gl_FragColor = vec4(lightValue + color, 1.0);\n  //gl_FragColor = vec4(lightValue * material.lightModel.diffuse, 1.0);\n}";

var CubeMaterial = (function () {
  function CubeMaterial() {
    var diffuse = arguments.length <= 0 || arguments[0] === undefined ? 0xeeeeee : arguments[0];
    var specular = arguments.length <= 1 || arguments[1] === undefined ? 0xffffff : arguments[1];
    var ambient = arguments.length <= 2 || arguments[2] === undefined ? 0x888888 : arguments[2];

    _classCallCheck(this, CubeMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertex, fragment);

    this.diffuse = new _mathColor2["default"](diffuse);
    this.specular = new _mathColor2["default"](specular);
    this.ambient = new _mathColor2["default"](ambient);
  }

  _createClass(CubeMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        material: {
          lightModel: {
            diffuse: this.diffuse,
            specular: this.specular,
            ambient: this.ambient
          },
          shininess: 5
        },
        texture: this.texture
      });
      return this.drawCallData;
    }
  }, {
    key: "doubleFace",
    set: function set(value) {
      this.drawCallData.enableCulling = !value;
    },
    get: function get() {
      return this.drawCallData.enableCulling === false;
    }
  }]);

  return CubeMaterial;
})();

exports["default"] = CubeMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13,"../core/consts":17,"../math/Color":47}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreConsts = require("../core/consts");

var _coreConsts2 = _interopRequireDefault(_coreConsts);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var vertex = "precision mediump float;\n\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aUV;\n\nuniform mat4 globalTransform;\nuniform mat3 normalMatrix;\n\nstruct Camera\n{\n  mat4 transform;\n  mat4 globalTransform;\n  mat4 projection;\n  vec3 position;\n};\n\nuniform Camera camera;\n\nvarying vec3 vWorldPosition;\nvarying vec3 vSurfaceNormal;\nvarying vec3 vCameraPosition;\n\nvec4 origin = vec4(vec3(0.0), 1.0);\n\nvoid main(void)\n{\n  vec4 vertexWorldPosition = globalTransform * vec4(aVertexPosition, 1.0); \n  vWorldPosition = vertexWorldPosition.xyz;\n  vSurfaceNormal = normalMatrix * aVertexNormal;\n  vCameraPosition = (camera.globalTransform * origin).xyz;\n  gl_Position = camera.projection * camera.transform * vertexWorldPosition;\n}";

var fragment = "\n\n#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n\n\nstruct LightModel\n{\n  vec3 specular;\n  vec3 diffuse;\n  vec3 ambient;\n};\n\nstruct MaterialInfos{\n  LightModel lightModel;\n  float shininess;\n};\n\nstruct DirectionalLight {\n  LightModel lightModel;\n  vec3 direction;\n  mat4 globalTransform;\n};\n\nstruct SpotLight {\n  LightModel lightModel;\n  vec3 direction;\n  vec3 position;\n  float cutoff;\n  float decay;\n  float cutoffAngle;\n  float exponent;\n  mat4 globalTransform;\n};\n\nstruct PointLight {\n  LightModel lightModel;\n  vec3 position;\n  float cutoff;\n  float decay;\n  mat4 globalTransform;\n};\n\n\nuniform vec3 ambientLight;\nuniform MaterialInfos material;\nconst vec3 off = vec3(-1.0, 0.0, 1.0);\nvarying vec3 vWorldPosition;\nvarying vec3 vSurfaceNormal;\nvarying vec3 vCameraPosition;\n\n\n#ifdef DIRECTIONAL_LIGHT_COUNT\nuniform DirectionalLight directionalLights[DIRECTIONAL_LIGHT_COUNT];\n#endif\n#ifdef SPOT_LIGHT_COUNT\nuniform SpotLight spotLights[SPOT_LIGHT_COUNT];\n#endif\n#ifdef POINT_LIGHT_COUNT\nuniform PointLight pointLights[POINT_LIGHT_COUNT];\n#endif\n\n\nfloat lightAttenuation(float dist, float cutoff, float decay)\n{\n  return pow(clamp(1.0 - dist / cutoff, 0.0, 1.0), decay);\n}\n\nvec3 phong(vec3 surfaceNormal, vec3 viewDir, vec3 lightVector, LightModel lightModel, MaterialInfos material)\n{\n  float facing = 2.0 * float(gl_FrontFacing) - 1.0;\n  vec3 lightReflect = reflect(lightVector, facing * surfaceNormal);\n  LightModel mLightModel = material.lightModel;\n  float diffuseDot = max(dot(lightVector, facing * surfaceNormal), 0.0);\n  vec3 t1 = mLightModel.diffuse * diffuseDot * lightModel.diffuse;\n  vec3 t2 = step(0.0, diffuseDot) * mLightModel.specular * pow(max(dot(lightReflect, -viewDir), 0.0), material.shininess) * lightModel.specular;\n  return t1 + t2;\n}\n\nvec3 lights(vec3 surfacePosition, vec3 surfaceNormal, vec3 viewDir, MaterialInfos material)\n{\n  vec3 lightContribution = vec3(0.0);\n  #ifdef DIRECTIONAL_LIGHT_COUNT\n  for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++){\n    DirectionalLight light = directionalLights[i];\n    vec3 lightDir = normalize(-light.direction);//missing transformation\n    lightContribution += phong(surfaceNormal, viewDir, lightDir, light.lightModel, material);\n  }\n  #endif\n\n  #ifdef POINT_LIGHT_COUNT\n  for(int i = 0; i < POINT_LIGHT_COUNT; i++){\n    PointLight light = pointLights[i];\n    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;\n    float attenuation = lightAttenuation(length(sampleToLight), light.cutoff, light.decay);\n    lightContribution += attenuation * phong(surfaceNormal, viewDir, normalize(sampleToLight), light.lightModel, material);\n  }\n  #endif\n\n  #ifdef SPOT_LIGHT_COUNT\n  for(int i = 0; i < SPOT_LIGHT_COUNT; i++){\n    SpotLight light = spotLights[i];\n    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;\n    vec3 lightVector = normalize(sampleToLight);\n    float cone = dot(-lightVector, normalize(light.direction));\n    float spot = step(cos(light.cutoffAngle), cone) * pow(cone, light.exponent);\n    float attenuation = spot * lightAttenuation(length(sampleToLight), light.cutoff, light.decay);\n    lightContribution += attenuation * phong(surfaceNormal, viewDir, lightVector, light.lightModel, material);\n  }\n  #endif\n  return lightContribution;\n}\n\n\n\n\nvoid main(void)\n{\n  vec3 viewDir = normalize(vCameraPosition - vWorldPosition);\n  vec3 surfaceNormal = normalize(vSurfaceNormal);\n\n  vec3 lightValue = material.lightModel.ambient * ambientLight + lights(vWorldPosition, surfaceNormal, viewDir, material);\n\n  gl_FragColor = vec4(lightValue * material.lightModel.diffuse, 1.0);\n  //gl_FragColor = vec4(lightValue * material.lightModel.diffuse, -float(gl_FrontFacing));\n}";

var LightMaterial = (function () {
  function LightMaterial() {
    var diffuse = arguments.length <= 0 || arguments[0] === undefined ? 0xeeeeee : arguments[0];
    var specular = arguments.length <= 1 || arguments[1] === undefined ? 0xffffff : arguments[1];
    var ambient = arguments.length <= 2 || arguments[2] === undefined ? 0x888888 : arguments[2];

    _classCallCheck(this, LightMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertex, fragment);

    this.diffuse = new _mathColor2["default"](diffuse);
    this.specular = new _mathColor2["default"](specular);
    this.ambient = new _mathColor2["default"](ambient);
  }

  _createClass(LightMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        material: {
          lightModel: {
            diffuse: this.diffuse,
            specular: this.specular,
            ambient: this.ambient
          },
          shininess: 5
        }
      });
      return this.drawCallData;
    }
  }, {
    key: "doubleFace",
    set: function set(value) {
      this.drawCallData.enableCulling = !value;
    },
    get: function get() {
      return this.drawCallData.enableCulling === false;
    }
  }]);

  return LightMaterial;
})();

exports["default"] = LightMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13,"../core/consts":17,"../math/Color":47}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var vertex = "precision mediump float;\n\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aUV;\n\nuniform mat4 globalTransform;\nuniform mat3 normalMatrix;\n\nstruct Camera\n{\n  mat4 transform;\n  mat4 globalTransform;\n  mat4 projection;\n  vec3 position;\n};\n\nuniform Camera camera;\n\nvarying vec3 vWorldPosition;\nvarying vec3 vSurfaceNormal;\nvarying vec3 vCameraPosition;\nvarying vec2 vUV;\n\nvec4 origin = vec4(vec3(0.0), 1.0);\n\nvoid main(void)\n{\n  vUV = aUV;\n  vec4 vertexWorldPosition = globalTransform * vec4(aVertexPosition, 1.0); \n  vWorldPosition = vertexWorldPosition.xyz;\n  vSurfaceNormal = normalMatrix * aVertexNormal;\n  vCameraPosition = (camera.globalTransform * origin).xyz;\n  gl_Position = camera.projection * camera.transform * vertexWorldPosition;\n}";

var fragment = "\n\n\n#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n\n\nstruct LightModel\n{\n  vec3 specular;\n  vec3 diffuse;\n  vec3 ambient;\n};\n\nstruct MaterialInfos{\n  LightModel lightModel;\n  float shininess;\n};\n\nstruct DirectionalLight {\n  LightModel lightModel;\n  vec3 direction;\n  mat4 globalTransform;\n};\n\nstruct SpotLight {\n  LightModel lightModel;\n  vec3 direction;\n  vec3 position;\n  float cutoff;\n  float decay;\n  float cutoffAngle;\n  float exponent;\n  mat4 globalTransform;\n};\n\nstruct PointLight {\n  LightModel lightModel;\n  vec3 position;\n  float cutoff;\n  float decay;\n  mat4 globalTransform;\n};\n\n\nuniform vec3 ambientLight;\nuniform MaterialInfos material;\nconst vec3 off = vec3(-1.0, 0.0, 1.0);\nvarying vec3 vWorldPosition;\nvarying vec3 vSurfaceNormal;\nvarying vec3 vCameraPosition;\n\n\n#ifdef DIRECTIONAL_LIGHT_COUNT\nuniform DirectionalLight directionalLights[DIRECTIONAL_LIGHT_COUNT];\n#endif\n#ifdef SPOT_LIGHT_COUNT\nuniform SpotLight spotLights[SPOT_LIGHT_COUNT];\n#endif\n#ifdef POINT_LIGHT_COUNT\nuniform PointLight pointLights[POINT_LIGHT_COUNT];\n#endif\n\n\nfloat lightAttenuation(float dist, float cutoff, float decay)\n{\n  return pow(clamp(1.0 - dist / cutoff, 0.0, 1.0), decay);\n}\n\nvec3 phong(vec3 surfaceNormal, vec3 viewDir, vec3 lightVector, LightModel lightModel, MaterialInfos material)\n{\n  float facing = 2.0 * float(gl_FrontFacing) - 1.0;\n  vec3 lightReflect = reflect(lightVector, facing * surfaceNormal);\n  LightModel mLightModel = material.lightModel;\n  float diffuseDot = max(facing * dot(lightVector, surfaceNormal), 0.0);\n  vec3 t1 = mLightModel.diffuse * diffuseDot * lightModel.diffuse;\n  vec3 t2 = step(0.0, diffuseDot) * mLightModel.specular * pow(max(dot(lightReflect, -viewDir), 0.0), material.shininess) * lightModel.specular;\n  return t1 + t2;\n}\n\nvec3 lights(vec3 surfacePosition, vec3 surfaceNormal, vec3 viewDir, MaterialInfos material)\n{\n  vec3 lightContribution = vec3(0.0);\n  #ifdef DIRECTIONAL_LIGHT_COUNT\n  for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++){\n    DirectionalLight light = directionalLights[i];\n    vec3 lightDir = normalize(-light.direction);//missing transformation\n    lightContribution += phong(surfaceNormal, viewDir, lightDir, light.lightModel, material);\n  }\n  #endif\n\n  #ifdef POINT_LIGHT_COUNT\n  for(int i = 0; i < POINT_LIGHT_COUNT; i++){\n    PointLight light = pointLights[i];\n    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;\n    float attenuation = lightAttenuation(length(sampleToLight), light.cutoff, light.decay);\n    lightContribution += attenuation * phong(surfaceNormal, viewDir, normalize(sampleToLight), light.lightModel, material);\n  }\n  #endif\n\n  #ifdef SPOT_LIGHT_COUNT\n  for(int i = 0; i < SPOT_LIGHT_COUNT; i++){\n    SpotLight light = spotLights[i];\n    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;\n    vec3 lightVector = normalize(sampleToLight);\n    float cone = dot(-lightVector, normalize(light.direction));\n    float spot = step(cos(light.cutoffAngle), cone) * pow(cone, light.exponent);\n    float attenuation = spot * lightAttenuation(length(sampleToLight), light.cutoff, light.decay);\n    lightContribution += attenuation * phong(surfaceNormal, viewDir, lightVector, light.lightModel, material);\n  }\n  #endif\n  return lightContribution;\n}\n\n\n\n/*vec4 bump(sampler2D image, vec2 pos, vec2 dir){\n  vec3 delta = 0.01 * offset;\n  float mid = texture2D(image, pos).x;\n  float left = texture2D(image, pos + delta.xy).x;\n  float right = texture2D(image, pos + delta.zy).x;\n  float top = texture2D(image, pos + delta.yx).x;\n  float bottom = texture2D(image, pos + delta.yz).x;\n  vec3 va = normalize(vec3(size.xy, dir.x * (right - left)));\n  vec3 vb = normalize(vec3(size.yx, dir.y * (bottom - top)));\n  return vec4(cross(va, vb), mid);\n}*/\nvarying vec2 vUV;\nuniform sampler2D texture;\n\n//www.thetenthplanet.de/archives/1180\nvec3 perturbNormal(vec3 normal, vec3 perturbation)\n{\n  vec3 viewDir = normalize(vWorldPosition);\n  vec3 q0 = dFdx( viewDir );\n  vec3 q1 = dFdy( viewDir );\n  vec2 st0 = dFdx( vUV );\n  vec2 st1 = dFdy( vUV );\n\n  mat3 tsn = mat3(\n    normalize(q0 * st1.t - q1 * st0.t),\n    normalize(-q0 * st1.s + q1 * st0.s),\n    normal\n  );\n\n  return normalize( tsn * (perturbation * 2.0 - 1.0) );\n\n  //return normalize(transform * perturbation);\n}\n\nvoid main(void)\n{\n  vec3 viewDir = normalize(vCameraPosition - vWorldPosition);\n  vec3 surfaceNormal = perturbNormal(normalize(vSurfaceNormal), texture2D(texture, vUV).rgb);\n\n  vec3 lightValue = material.lightModel.ambient * ambientLight + lights(vWorldPosition, surfaceNormal, viewDir, material);\n\n  gl_FragColor = vec4(lightValue * material.lightModel.diffuse, 1.0);\n  //gl_FragColor = vec4(lightValue * texture2D(texture, vUV).rgb, 1.0);\n}";

var NormalMaterial = (function () {
  function NormalMaterial() {
    var diffuse = arguments.length <= 0 || arguments[0] === undefined ? 0xeeeeee : arguments[0];
    var specular = arguments.length <= 1 || arguments[1] === undefined ? 0xffffff : arguments[1];
    var ambient = arguments.length <= 2 || arguments[2] === undefined ? 0x888888 : arguments[2];

    _classCallCheck(this, NormalMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertex, fragment);

    this.diffuse = new _mathColor2["default"](diffuse);
    this.specular = new _mathColor2["default"](specular);
    this.ambient = new _mathColor2["default"](ambient);
  }

  _createClass(NormalMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        material: {
          lightModel: {
            diffuse: this.diffuse,
            specular: this.specular,
            ambient: this.ambient
          },
          shininess: 5
        },
        texture: this.texture
      });
      return this.drawCallData;
    }
  }, {
    key: "doubleFace",
    set: function set(value) {
      this.drawCallData.enableCulling = !value;
    },
    get: function get() {
      return this.drawCallData.enableCulling === false;
    }
  }]);

  return NormalMaterial;
})();

exports["default"] = NormalMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13,"../math/Color":47}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var ShaderMaterial = (function () {
  function ShaderMaterial(vertexSrc, fragmentSrc) {
    _classCallCheck(this, ShaderMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertexSrc, fragmentSrc);
  }

  _createClass(ShaderMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return ShaderMaterial;
})();

exports["default"] = ShaderMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var vertex = "precision mediump float;\n\nattribute vec3 aVertexPosition;\n\nuniform vec2 screenSize;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 globalTransform;\n\nvarying vec3 vPos;\n\nvoid main(void)\n{\n\n  vec3 posRatio = vec3( screenSize.x / screenSize.y);\n  vec4 pos = vec4(aVertexPosition, 1.0);\n  vPos = pos.xyz;\n  gl_Position = projectionMatrix * viewMatrix * globalTransform * pos;\n}";

var fragment = "precision mediump float;\n\nuniform vec2 screenSize;\nuniform vec3 uColor;\nvarying vec3 vPos;\n\n\nvoid main(void)\n{\n\n  gl_FragColor = vec4(uColor, 1.0);\n}";

var SolidMaterial = (function () {
  function SolidMaterial(color) {
    _classCallCheck(this, SolidMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertex, fragment);

    this.color = new _mathColor2["default"](color);
  }

  _createClass(SolidMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({ uColor: this.color });
      return this.drawCallData;
    }
  }]);

  return SolidMaterial;
})();

exports["default"] = SolidMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13,"../math/Color":47}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var vertex = "precision mediump float;\n\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aUV;\n\nuniform float time;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 globalTransform;\nuniform mat3 normalMatrix;\n\nvarying vec3 vPos;\nvarying vec2 vUV;\nvarying vec3 vNormal;\n\nvoid main(void)\n{\n\n  vec4 pos = vec4(aVertexPosition, 1.0);\n  vPos = pos.xyz;\n  vUV = aUV;\n  vNormal = normalize(normalMatrix * aVertexNormal);\n  gl_Position = projectionMatrix * viewMatrix * globalTransform * pos;\n}";

var fragment = "precision mediump float;\n\nuniform float time;\nconst vec3 off = vec3(-1.0, 0.0, 1.0);\nvarying vec3 vPos;\nvarying vec2 vUV;\nvarying vec3 vNormal;\n\nuniform sampler2D uSampler;\nuniform sampler2D uSampler2;\n\nstruct Light {\n  vec3 specular;\n  vec3 diffuse;\n  vec3 ambient;\n  vec3 direction;\n  vec3 position;\n  mat4 globalTransform;\n};\n\n\nconst int N_LIGHTS = 2;\n\nuniform Light lights[N_LIGHTS];\n\nvoid main(void)\n{\n\n  vec4 texColor = mix(texture2D(uSampler, vUV), texture2D(uSampler2, vUV), 0.5);\n\n  vec3 ambient = vec3(0.0);\n  for(int i = 0; i < N_LIGHTS; i++){\n    ambient += lights[i].ambient;\n  }\n\n  float lightValue = max(dot(vNormal, normalize(lights[0].direction)), 0.0);\n  lightValue = min(lightValue + 0.3, 1.0);\n  gl_FragColor = vec4(vec3(lightValue) * lights[0].diffuse * texColor.rgb, 1.0);\n}";

var TestMaterial = (function () {
  function TestMaterial() {
    _classCallCheck(this, TestMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertex, fragment);
    this.texture = undefined;
    this.texture2 = undefined;
  }

  _createClass(TestMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        uSampler: this.texture,
        uSampler2: this.texture2
      });
      return this.drawCallData;
    }
  }]);

  return TestMaterial;
})();

exports["default"] = TestMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var vertex = "precision mediump float;\n\n\n\nattribute vec3 aVertexPosition;\nattribute vec2 aUV;\n\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 globalTransform;\n\nvarying vec3 vPos;\nvarying vec2 vUV;\n\nvoid main(void)\n{\n\n  vec4 pos = vec4(aVertexPosition, 1.0);\n\n  gl_Position = projectionMatrix * viewMatrix * globalTransform * pos;\n\n  vPos = pos.xyz;\n  vUV = aUV;\n}";

var fragment = "precision mediump float;\n\nvarying vec3 vPos;\nvarying vec2 vUV;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n  gl_FragColor = mix(vec4(1.0), vec4(texture2D(uSampler, vUV).rgb, 1.0), 0.5);\n}";

var TextureMaterial = (function () {
  function TextureMaterial() {
    _classCallCheck(this, TextureMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertex, fragment);
  }

  _createClass(TextureMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({ uSampler: this.texture });
      return this.drawCallData;
    }
  }]);

  return TextureMaterial;
})();

exports["default"] = TextureMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var vertex = "precision mediump float;\n\nattribute vec3 aVertexPosition;\nattribute vec2 aUV;\nuniform vec2 screenSize;\n\nuniform float time;\nuniform mat4 worldToScreen;\n\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main(void) {\n  float t = 0.03 * time;\n  vec3 offset = 0.14 * vec3(\n    (1.0 + cos(0.1 * t)) * 2.0 * (cos(10.0 * aUV.y + t) + cos(5.0 * aUV.y + 1.3 + 0.1 * t) - cos(t) - cos(1.3 + 0.1 * t)),\n    (1.0 + sin(0.01 * t)) * 2.0 * (sin(7.0 * aUV.y + 0.2 + 0.01 * t) + cos(3.0 * aUV.y + 0.1 + 1.5 * t) - sin(0.2 + 0.01 * t) - cos(0.1 + 1.5 * t)),\n    0.0\n  );\n\n  mat4 scaleMat = mat4(\n    0.5, 0.0, 0.0, 0.0,\n    0.0, 20.0, 0.0, 0.0,\n    0.0, 0.0, 0.5, 0.0,\n    0.0, 0.0, 0.0, 1.0\n  );\n\n  mat4 rotMat = mat4(\n    1.0, 0.0, 0.0, 0.0,\n    0.0, 0.0, -1.0, 0.0,\n    0.0, 1.0, 0.0, 0.0,\n    0.0, 0.0, 0.0, 1.0\n  );\n\n  mat4 transMat = mat4(\n    1.0, 0.0, 0.0, 0.0,\n    0.0, 1.0, 0.0, 0.0,\n    0.0, 0.0, 1.0, 0.0,\n    0.0, 0.0, -1.0, 1.0\n  );\n  vec3 posRatio = vec3( screenSize.x / screenSize.y);\n  vec4 pos = vec4(aVertexPosition, 1.0);\n  vPos = pos.xyz;\n  gl_Position = worldToScreen * transMat * (rotMat * scaleMat * pos + vec4(offset, 0.0));\n\tvUV = aUV;\n}";

var fragment = "precision mediump float;\n\nvarying vec2 vUV;\nvarying vec3 vPos;\nuniform float time;\n\nvoid main(void) {\n\tvec2 offset = vec2(0.0, 0.003 * time);\n\tvec2 gridSize = vec2(8.0, 50.0);\n\tvec2 gridPos = mod(floor((vUV.xy + offset) * gridSize), 2.0);\n\tif(gridPos.x == gridPos.y) gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\telse gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n\tgl_FragColor = mix(gl_FragColor, vec4(0.0, 0.0, 0.0, 1.0), vUV.y);\n}";

var ShaderMaterial = (function () {
  function ShaderMaterial() {
    _classCallCheck(this, ShaderMaterial);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.drawCallData.program = new _coreProgram2["default"](vertex, fragment);
  }

  _createClass(ShaderMaterial, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return ShaderMaterial;
})();

exports["default"] = ShaderMaterial;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _LightMaterial = require("./LightMaterial");

var _LightMaterial2 = _interopRequireDefault(_LightMaterial);

var _NormalMaterial = require("./NormalMaterial");

var _NormalMaterial2 = _interopRequireDefault(_NormalMaterial);

var _ShaderMaterial = require("./ShaderMaterial");

var _ShaderMaterial2 = _interopRequireDefault(_ShaderMaterial);

var _SolidMaterial = require("./SolidMaterial");

var _SolidMaterial2 = _interopRequireDefault(_SolidMaterial);

var _TestMaterial = require("./TestMaterial");

var _TestMaterial2 = _interopRequireDefault(_TestMaterial);

var _TextureMaterial = require("./TextureMaterial");

var _TextureMaterial2 = _interopRequireDefault(_TextureMaterial);

var _TunnelMaterial = require("./TunnelMaterial");

var _TunnelMaterial2 = _interopRequireDefault(_TunnelMaterial);

var _CubeMaterial = require("./CubeMaterial");

var _CubeMaterial2 = _interopRequireDefault(_CubeMaterial);

exports["default"] = {
  LightMaterial: _LightMaterial2["default"],
  NormalMaterial: _NormalMaterial2["default"],
  ShaderMaterial: _ShaderMaterial2["default"],
  SolidMaterial: _SolidMaterial2["default"],
  TestMaterial: _TestMaterial2["default"],
  TextureMaterial: _TextureMaterial2["default"],
  TunnelMaterial: _TunnelMaterial2["default"],
  CubeMaterial: _CubeMaterial2["default"]
};
module.exports = exports["default"];

},{"./CubeMaterial":37,"./LightMaterial":38,"./NormalMaterial":39,"./ShaderMaterial":40,"./SolidMaterial":41,"./TestMaterial":42,"./TextureMaterial":43,"./TunnelMaterial":44}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

var Box = (function () {
  function Box(min, max) {
    _classCallCheck(this, Box);

    this.min = new _Vec32["default"]().copy(min);
    this.max = new _Vec32["default"]().copy(max);
  }

  _createClass(Box, [{
    key: "width",
    get: function get() {
      return this.max.x - this.min.x;
    }
  }, {
    key: "height",
    get: function get() {
      return this.max.y - this.min.y;
    }
  }, {
    key: "depth",
    get: function get() {
      return this.max.z - this.min.z;
    }
  }]);

  return Box;
})();

exports["default"] = Box;
module.exports = exports["default"];

},{"./Vec3":55}],47:[function(require,module,exports){
//RGBA color

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = (function () {
  function Color(r, g, b, a) {
    _classCallCheck(this, Color);

    this.set(r, g, b, a);
  }

  _createClass(Color, [{
    key: "set",
    value: function set(r, g, b) {
      var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

      if (r === undefined) {
        this.r = this.g = this.b = 0;
        this.a = 1;
      } else if (r.constructor === Color) {
        this.copy(r);
      } else if (g === undefined || b === undefined) {
        this.hex = r;
      } else {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
      return this;
    }
  }, {
    key: "scale",
    value: function scale(value) {
      this.r *= value;
      this.g *= value;
      this.b *= value;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      this.a = color.a;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Color(this.r, this.g, this.b, this.a);
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Color " + this.r + " " + this.g + " " + this.b + "]";
    }
  }, {
    key: "hex",
    set: function set(value) {
      this.r = (value >> 16 & 0xff) / 0xff;
      this.g = (value >> 8 & 0xff) / 0xff;
      this.b = (value & 0xff) / 0xff;
    },

    //returns rgb hex, no alpha
    get: function get() {
      return this.r << 16 | this.g << 8 | this.b;
    }
  }, {
    key: "x",
    get: function get() {
      return this.r;
    }
  }, {
    key: "y",
    get: function get() {
      return this.g;
    }
  }, {
    key: "z",
    get: function get() {
      return this.b;
    }
  }]);

  return Color;
})();

exports["default"] = Color;
module.exports = exports["default"];

},{}],48:[function(require,module,exports){
"use strict";

//todo

},{}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

//row major 3x3 matrix
//www.j3d.org/matrix_faq/matrfaq_latest.html

var tx = new _Vec32["default"]();
var ty = new _Vec32["default"]();
var tz = new _Vec32["default"]();

var Mat3 = (function () {
  function Mat3() {
    var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var e = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];
    var f = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
    var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
    var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
    var i = arguments.length <= 8 || arguments[8] === undefined ? 1 : arguments[8];

    _classCallCheck(this, Mat3);

    this.data = new Float32Array(9);
    this.set(a, b, c, d, e, f, g, h, i);
  }

  _createClass(Mat3, [{
    key: "identity",
    value: function identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }
  }, {
    key: "set",
    value: function set() {
      var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
      var e = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];
      var f = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
      var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
      var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
      var i = arguments.length <= 8 || arguments[8] === undefined ? 1 : arguments[8];

      var t = this.data;
      t[0] = a;t[3] = b;t[6] = c;
      t[1] = d;t[4] = e;t[7] = f;
      t[2] = g;t[5] = h;t[8] = i;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(mat) {
      for (var i = 0; i < 9; i++) {
        this.data[i] = mat.data[i];
      }
      return this;
    }
  }, {
    key: "transformVector",
    value: function transformVector(v) {
      var t = this.data;
      var x = v.x,
          y = v.y,
          z = v.z;
      v.x = t[0] * x + t[3] * y + t[6] * z;
      v.y = t[1] * x + t[4] * y + t[7] * z;
      v.z = t[2] * x + t[5] * y + t[8] * z;
      return v;
    }

    //m x this
  }, {
    key: "multiplyMat",
    value: function multiplyMat(m) {
      var t = m.data;
      this.multiply(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(a, b, c, d, e, f, g, h, i) {
      var t = this.data;
      var t0 = t[0],
          t3 = t[3],
          t6 = t[6];
      var t1 = t[1],
          t4 = t[4],
          t7 = t[7];
      var t2 = t[2],
          t5 = t[5],
          t8 = t[8];

      t[0] = a * t0 + b * t1 + c * t2;
      t[1] = d * t0 + e * t1 + f * t2;
      t[2] = g * t0 + h * t1 + i * t2;

      t[3] = a * t3 + b * t4 + c * t5;
      t[4] = d * t3 + e * t4 + f * t5;
      t[5] = g * t3 + h * t4 + i * t5;

      t[6] = a * t6 + b * t7 + c * t8;
      t[7] = d * t6 + e * t7 + f * t8;
      t[8] = g * t6 + h * t7 + i * t8;
      return this;
    }
  }, {
    key: "setRotation",
    value: function setRotation(x, y, z, angle) {
      var s = 1 / Math.hypot(x, y, z);
      x *= s;
      y *= s;
      z *= s;

      var si = Math.sin(angle);
      var co = Math.cos(angle);
      var ic = 1 - co;

      return this.set(x * x * ic + co, y * x * ic - si * z, z * x * ic + si * y, x * y * ic + si * z, y * y * ic + co, z * y * ic - si * x, x * z * ic - si * y, y * z * ic + si * x, z * z * ic + co);
    }
  }, {
    key: "rotate",
    value: function rotate(x, y, z, angle) {
      var s = 1 / Math.hypot(x, y, z);
      x *= s;
      y *= s;
      z *= s;
      var si = Math.sin(angle);
      var co = Math.cos(angle);
      var ic = 1 - co;

      return this.multiply(x * x * ic + co, y * x * ic - si * z, z * x * ic + si * y, x * y * ic + si * z, y * y * ic + co, z * y * ic - si * x, x * z * ic - si * y, y * z * ic + si * x, z * z * ic + co);
    }
  }, {
    key: "invert",
    value: function invert() {
      var det = this.determinant;
      if (det === 0) {
        return this.identity();
      }
      var t = this.data;

      var iDet = 1 / det;
      return this.set((t[4] * t[8] - t[5] * t[7]) * iDet, (t[5] * t[6] - t[3] * t[8]) * iDet, (t[3] * t[7] - t[4] * t[6]) * iDet, (t[2] * t[7] - t[1] * t[8]) * iDet, (t[0] * t[8] - t[2] * t[6]) * iDet, (t[1] * t[6] - t[0] * t[7]) * iDet, (t[1] * t[5] - t[2] * t[4]) * iDet, (t[2] * t[3] - t[0] * t[5]) * iDet, (t[0] * t[4] - t[1] * t[3]) * iDet);
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var t = this.data;
      return this.set(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
    }

    //TODO : check maths
  }, {
    key: "lookAt",
    value: function lookAt(position, target, up) {
      tz.copy(target).sub(position).normalize();
      tx.copy(tz).cross(up).normalize();
      if (tx.length === 0) {
        if (tx.x === 0) {
          tx.set(1, 0, 0);
        } else {
          tx.set(-(tx.y + tx.z) / tx.x, 1, 1).normalize();
        }
      }
      ty.copy(tx).cross(tz);

      this.set(tx.x, ty.x, -tz.x, tx.y, ty.y, -tz.y, tx.z, ty.z, -tz.z);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      var cloneMat = new Mat3();
      for (var i = 0; i < 9; i++) {
        cloneMat.data[i] = this.data[i];
      }
      return cloneMat;
    }
  }, {
    key: "toString",
    value: function toString() {
      var t = this.data;
      return "[Mat3\n      " + t[0] + ", " + t[3] + ", " + t[6] + "\n      " + t[1] + ", " + t[4] + ", " + t[7] + "\n      " + t[2] + ", " + t[5] + ", " + t[8] + "\n    ]";
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.data;
    }
  }, {
    key: "determinant",
    get: function get() {
      var t = this.data;
      return t[0] * (t[4] * t[8] - t[5] * t[7]) - t[3] * (t[1] * t[8] - t[2] * t[7]) + t[6] * (t[1] * t[5] - t[2] * t[4]);
    }
  }]);

  return Mat3;
})();

exports["default"] = Mat3;
module.exports = exports["default"];

},{"./Vec3":55}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Mat3 = require("./Mat3");

var _Mat32 = _interopRequireDefault(_Mat3);

//visit :
//www.j3d.org/matrix_faq/matrfaq_latest.html
//http://www.songho.ca/opengl/gl_projectionmatrix.html

//row major 4x4 matrix

var Mat4 = (function () {
  function Mat4() {
    var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var e = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var f = arguments.length <= 5 || arguments[5] === undefined ? 1 : arguments[5];
    var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
    var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
    var i = arguments.length <= 8 || arguments[8] === undefined ? 0 : arguments[8];
    var j = arguments.length <= 9 || arguments[9] === undefined ? 0 : arguments[9];
    var k = arguments.length <= 10 || arguments[10] === undefined ? 1 : arguments[10];
    var l = arguments.length <= 11 || arguments[11] === undefined ? 0 : arguments[11];
    var m = arguments.length <= 12 || arguments[12] === undefined ? 0 : arguments[12];
    var n = arguments.length <= 13 || arguments[13] === undefined ? 0 : arguments[13];
    var o = arguments.length <= 14 || arguments[14] === undefined ? 0 : arguments[14];
    var p = arguments.length <= 15 || arguments[15] === undefined ? 1 : arguments[15];

    _classCallCheck(this, Mat4);

    this.data = new Float32Array(16);
    this.set(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
  }

  _createClass(Mat4, [{
    key: "identity",
    value: function identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
  }, {
    key: "set",
    value: function set() {
      var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var b = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var c = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var d = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
      var e = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
      var f = arguments.length <= 5 || arguments[5] === undefined ? 1 : arguments[5];
      var g = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
      var h = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
      var i = arguments.length <= 8 || arguments[8] === undefined ? 0 : arguments[8];
      var j = arguments.length <= 9 || arguments[9] === undefined ? 0 : arguments[9];
      var k = arguments.length <= 10 || arguments[10] === undefined ? 1 : arguments[10];
      var l = arguments.length <= 11 || arguments[11] === undefined ? 0 : arguments[11];
      var m = arguments.length <= 12 || arguments[12] === undefined ? 0 : arguments[12];
      var n = arguments.length <= 13 || arguments[13] === undefined ? 0 : arguments[13];
      var o = arguments.length <= 14 || arguments[14] === undefined ? 0 : arguments[14];
      var p = arguments.length <= 15 || arguments[15] === undefined ? 1 : arguments[15];

      var t = this.data;
      t[0] = a;t[4] = b;t[8] = c;t[12] = d;
      t[1] = e;t[5] = f;t[9] = g;t[13] = h;
      t[2] = i;t[6] = j;t[10] = k;t[14] = l;
      t[3] = m;t[7] = n;t[11] = o;t[15] = p;
      return this;
    }
  }, {
    key: "transformVector",
    value: function transformVector(vec) {
      var t = this.data;
      var x = vec.x,
          y = vec.y,
          z = vec.z,
          w = vec.w;
      vec.x = t[0] * x + t[4] * y + t[8] * z + t[12] * w;
      vec.y = t[1] * x + t[5] * y + t[9] * z + t[13] * w;
      vec.z = t[2] * x + t[6] * y + t[10] * z + t[14] * w;
      vec.w = t[3] * x + t[7] * y + t[11] * z + t[15] * w;
      return vec;
    }
  }, {
    key: "multiplyMat",
    value: function multiplyMat(m) {
      var t = m.data;
      this.multiply(t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]);
      return this;
    }
  }, {
    key: "scaleV",
    value: function scaleV(v) {
      this.scale(v.x, v.y, v.z);
    }
  }, {
    key: "scale",
    value: function scale(sx, sy, sz) {
      this.multiply(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "translateV",
    value: function translateV(v) {
      this.translate(v.x, v.y, v.z);
    }
  }, {
    key: "translate",
    value: function translate(tx, ty, tz) {
      this.multiply(1, 0, 0, tx, 0, 1, 0, ty, 0, 0, 1, tz, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
      var t = this.data;
      var t0 = t[0],
          t4 = t[4],
          t8 = t[8],
          t12 = t[12];
      var t1 = t[1],
          t5 = t[5],
          t9 = t[9],
          t13 = t[13];
      var t2 = t[2],
          t6 = t[6],
          t10 = t[10],
          t14 = t[14];
      var t3 = t[3],
          t7 = t[7],
          t11 = t[11],
          t15 = t[15];

      t[0] = a * t0 + b * t1 + c * t2 + d * t3;
      t[1] = e * t0 + f * t1 + g * t2 + h * t3;
      t[2] = i * t0 + j * t1 + k * t2 + l * t3;
      t[3] = m * t0 + n * t1 + o * t2 + p * t3;

      t[4] = a * t4 + b * t5 + c * t6 + d * t7;
      t[5] = e * t4 + f * t5 + g * t6 + h * t7;
      t[6] = i * t4 + j * t5 + k * t6 + l * t7;
      t[7] = m * t4 + n * t5 + o * t6 + p * t7;

      t[8] = a * t8 + b * t9 + c * t10 + d * t11;
      t[9] = e * t8 + f * t9 + g * t10 + h * t11;
      t[10] = i * t8 + j * t9 + k * t10 + l * t11;
      t[11] = m * t8 + n * t9 + o * t10 + p * t11;

      t[12] = a * t12 + b * t13 + c * t14 + d * t15;
      t[13] = e * t12 + f * t13 + g * t14 + h * t15;
      t[14] = i * t12 + j * t13 + k * t14 + l * t15;
      t[15] = m * t12 + n * t13 + o * t14 + p * t15;

      return this;
    }

    //http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  }, {
    key: "invert",
    value: function invert() {
      var t = this.data;
      var a = t[0],
          b = t[4],
          c = t[8],
          d = t[12];
      var e = t[1],
          f = t[5],
          g = t[9],
          h = t[13];
      var i = t[2],
          j = t[6],
          k = t[10],
          l = t[14];
      var m = t[3],
          n = t[7],
          o = t[11],
          p = t[15];

      t[0] = g * l * n - h * k * n + h * j * o - f * l * o - g * j * p + f * k * p;
      t[1] = h * k * m - g * l * m - h * i * o + e * l * o + g * i * p - e * k * p;
      t[2] = f * l * m - h * j * m + h * i * n - e * l * n - f * i * p + e * j * p;
      t[3] = g * j * m - f * k * m - g * i * n + e * k * n + f * i * o - e * j * o;
      t[4] = d * k * n - c * l * n - d * j * o + b * l * o + c * j * p - b * k * p;
      t[5] = c * l * m - d * k * m + d * i * o - a * l * o - c * i * p + a * k * p;
      t[6] = d * j * m - b * l * m - d * i * n + a * l * n + b * i * p - a * j * p;
      t[7] = b * k * m - c * j * m + c * i * n - a * k * n - b * i * o + a * j * o;
      t[8] = c * h * n - d * g * n + d * f * o - b * h * o - c * f * p + b * g * p;
      t[9] = d * g * m - c * h * m - d * e * o + a * h * o + c * e * p - a * g * p;
      t[10] = b * h * m - d * f * m + d * e * n - a * h * n - b * e * p + a * f * p;
      t[11] = c * f * m - b * g * m - c * e * n + a * g * n + b * e * o - a * f * o;
      t[12] = d * g * j - c * h * j - d * f * k + b * h * k + c * f * l - b * g * l;
      t[13] = c * h * i - d * g * i + d * e * k - a * h * k - c * e * l + a * g * l;
      t[14] = d * f * i - b * h * i - d * e * j + a * h * j + b * e * l - a * f * l;
      t[15] = b * g * i - c * f * i + c * e * j - a * g * j - b * e * k + a * f * k;

      var det = a * t[0] + e * t[4] + i * t[8] + m * t[12];
      //shouldn't it be :
      //let det = a * t[0] + b * t[4] + c * t[8] + d * t[12];
      if (det === 0) {
        console.warn("Matrix can't be inverted :\n" + this.toString());
        this.identity();
      } else {
        var iDet = 1 / det;
        for (var _i = 0; _i < 16; _i++) {
          t[_i] *= iDet;
        }
      }

      return this;
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var t = this.data;
      return this.set(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
    }
  }, {
    key: "copy",
    value: function copy(matrix) {
      var t0 = this.data;
      var t1 = matrix.data;
      for (var i = 0; i < 16; i++) {
        t0[i] = t1[i];
      }
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Mat4().copy(this);
    }
  }, {
    key: "toString",
    value: function toString() {
      var t = this.data;
      return "[Mat4\n      " + t[0] + ", " + t[4] + ", " + t[8] + ", " + t[12] + "\n      " + t[1] + ", " + t[5] + ", " + t[9] + ", " + t[13] + "\n      " + t[2] + ", " + t[6] + ", " + t[10] + ", " + t[14] + "\n      " + t[3] + ", " + t[7] + ", " + t[11] + ", " + t[15] + "\n    ]";
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.data;
    }
  }]);

  return Mat4;
})();

exports["default"] = Mat4;

Mat4.projection = function (fov, aspect, near, far, out) {
  if (out === undefined) {
    out = new Mat4();
  }
  var t = out.data;

  var d = 1 / Math.tan(0.5 * fov);
  var inf = 1 / (near - far);
  t[0] = d / aspect;
  t[5] = d;
  t[10] = (near + far) * inf;
  t[14] = 2 * near * far * inf;
  t[11] = -1;
  t[1] = t[2] = t[3] = t[4] = t[6] = t[7] = t[8] = t[9] = t[12] = t[13] = t[15] = 0;
  return out;
};
module.exports = exports["default"];

},{"./Mat3":49}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Mat4 = require("./Mat4");

var _Mat42 = _interopRequireDefault(_Mat4);

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

//www.j3d.org/matrix_faq/matrfaq_latest.html

var Quaternion = (function () {
  function Quaternion(x, y, z, w) {
    _classCallCheck(this, Quaternion);

    this.set(x, y, z, w);

    this._rx = 0;
    this._ry = 0;
    this._rz = 0;
  }

  _createClass(Quaternion, [{
    key: "set",
    value: function set() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var w = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(q) {
      this.x = q.x;
      this.y = q.y;
      this.z = q.z;
      this.w = q.w;
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var s = 1 / this.length;
      this.x *= s;
      this.y *= s;
      this.z *= s;
      this.w *= s;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(quat) {
      var x1 = this.x,
          y1 = this.y,
          z1 = this.z,
          w1 = this.w;
      var x2 = quat.x,
          y2 = quat.y,
          z2 = quat.z,
          w2 = quat.w;
      this.set(x1 * w2 + y1 * z2 - z1 * y2 + w1 * x2, y1 * w2 + z1 * x2 - x1 * z2 + w1 * y2, z1 * w2 + x1 * y2 - y1 * x2 + w1 * z2, -x1 * x2 - y1 * y2 - z1 * z2 + w1 * w2);
      return this;
    }
  }, {
    key: "add",
    value: function add(quat) {
      this.x += quat.x;
      this.y += quat.y;
      this.z += quat.z;
      this.w += quat.w;
      return this;
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
      return this;
    }
  }, {
    key: "invert",
    value: function invert() {
      return this.conjugate().normalize();
    }
  }, {
    key: "setRotationFromAxisAngle",
    value: function setRotationFromAxisAngle(vec, angle) {
      this.setRotation(vec.x, vec.y, vec.z, angle);
      return this;
    }
  }, {
    key: "setRotation",
    value: function setRotation(rx, ry, rz, angle) {
      var s = 1 / Math.hypot(rx, ry, rz);
      angle *= 0.5;
      var sin = Math.sin(angle) * s;
      this.x = rx * sin;
      this.y = ry * sin;
      this.z = rz * sin;
      this.w = Math.cos(angle);
      return this;
    }
  }, {
    key: "transformVector",
    value: function transformVector(vec) {
      var quat = new Quaternion(vec.x, vec.y, vec.z, 0);
      var inv = this.clone().invert();
      vec.copy(this.clone().multiply(quat.multiply(inv)));
      return vec;
    }
  }, {
    key: "lookAt",
    value: function lookAt(position, target, up) {
      var newDir = new _Vec32["default"]().copy(target).sub(position).normalize();
      var baseDir = new _Vec32["default"](0, 0, -1);
      up = new _Vec32["default"](0, -1, 0);
      this.setRotationFromAxisAngle(baseDir.clone().cross(newDir), baseDir.angleWith(newDir));
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Quaternion(this.x, this.y, this.z, this.w);
    }
  }, {
    key: "toString",
    value: function toString() {
      return [this.x, this.y, this.z, this.w].join(", ");
    }
  }, {
    key: "length",
    get: function get() {
      return Math.hypot(this.x, this.y, this.z, this.w);
    }
  }, {
    key: "matrix",
    get: function get() {
      var s = 1 / this.length;
      var x = this.x * s;
      var y = this.y * s;
      var z = this.z * s;
      var w = this.w * s;

      var xx = x * x;
      var xy = x * y;
      var xz = x * z;
      var xw = x * w;
      var yy = y * y;
      var yz = y * z;
      var yw = y * w;
      var zz = z * z;
      var zw = z * w;

      return new _Mat42["default"](1 - 2 * (yy + zz), 2 * (xy - zw), 2 * (xz + yw), 0, 2 * (xy + zw), 1 - 2 * (xx + zz), 2 * (yz - xw), 0, 2 * (xz - yw), 2 * (yz + xw), 1 - 2 * (xx + yy), 0, 0, 0, 0, 1);
    }
  }]);

  return Quaternion;
})();

exports["default"] = Quaternion;
module.exports = exports["default"];

},{"./Mat4":50,"./Vec3":55}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

var Ray = (function () {
  function Ray(origin, direction) {
    _classCallCheck(this, Ray);

    this.origin = new _Vec32["default"]();
    this.direction = new _Vec32["default"](1, 0, 0);
    this.set(origin, direction);
  }

  _createClass(Ray, [{
    key: "set",
    value: function set() {
      var origin = arguments.length <= 0 || arguments[0] === undefined ? new _Vec32["default"]() : arguments[0];
      var direction = arguments.length <= 1 || arguments[1] === undefined ? new _Vec32["default"](1, 0, 0) : arguments[1];

      this.origin.copy(origin);
      this.direction.copy(direction).normalize();
      return this;
    }
  }, {
    key: "setFromPositions",
    value: function setFromPositions(p0, p1) {
      this.origin.copy(p0);
      this.direction.copy(p1).sub(this.origin).normalize();
      return this;
    }
  }, {
    key: "getPointAt",
    value: function getPointAt(t) {
      return new _Vec32["default"](this.origin.x + this.direction.x * t, this.origin.y + this.direction.y * t, this.origin.z + this.direction.z * t);
    }
  }, {
    key: "copy",
    value: function copy(ray) {
      this.origin.copy(ray.origin);
      this.direction.copy(ray.direction);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Ray(this.origin, this.direction);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Ray " + this.origin + " " + this.direction + "]";
    }
  }]);

  return Ray;
})();

exports["default"] = Ray;
module.exports = exports["default"];

},{"./Vec3":55}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

var Sphere = (function () {
  function Sphere(center, radius) {
    _classCallCheck(this, Sphere);

    this._center = new _Vec32["default"]();
    this._radius = 1;
    this.set(center, radius);
  }

  _createClass(Sphere, [{
    key: "set",
    value: function set() {
      var center = arguments.length <= 0 || arguments[0] === undefined ? new _Vec32["default"]() : arguments[0];
      var radius = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.center.copy(center);
      this.radius = radius;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(sphere) {
      this._center.copy(sphere.center);
      this._radius = sphere.radius;
      return this;
    }
  }, {
    key: "getRayIntersection",
    value: function getRayIntersection(ray) {
      var co = ray.origin.clone().sub(this.center);
      var b = ray.direction.dot(co);
      var a = b * b - co.squaredLength + this.radius * this.radius;
      if (a > 0) {
        var d = Math.sqrt(a);
        return [ray.getPointAt(-b - d), ray.getPointAt(-b + d)];
      } else if (a === 0) {
        return [ray.getPointAt(ray.direction.dot(co) / ray.direction.squaredLength)];
      } else {
        return [new _Vec32["default"]()];
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Sphere(this.center, this.radius);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Sphere " + this.center + " " + this.radius + "]";
    }
  }, {
    key: "center",
    get: function get() {
      return this._center;
    },
    set: function set(value) {
      this._center.set(value);
    }
  }, {
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(value) {
      if (value <= 0) {
        console.error("sphere radius should be stricly positive");
      }
      this._radius = value;
    }
  }]);

  return Sphere;
})();

exports["default"] = Sphere;
module.exports = exports["default"];

},{"./Vec3":55}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec2 = (function () {
  function Vec2(x, y) {
    _classCallCheck(this, Vec2);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Vec2, [{
    key: "set",
    value: function set(x, y) {
      this.x = x || 0;
      this.y = y || 0;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
  }, {
    key: "scale",
    value: function scale(s) {
      this.x *= s;
      this.y *= s;
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var s = 1 / this.length;
      this.x *= s;
      this.y *= s;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec2(this.x, this.y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Vec2 " + this.x + " " + this.y + "]";
    }
  }, {
    key: "length",
    get: function get() {
      return Math.hypot(this.x, this.y);
    },
    set: function set(l) {
      var s = l / this.length;
      this.x *= s;
      this.y *= s;
      return this;
    }
  }]);

  return Vec2;
})();

exports["default"] = Vec2;
module.exports = exports["default"];

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec3 = (function () {
  function Vec3() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    _classCallCheck(this, Vec3);

    this.set(x, y, z);
  }

  _createClass(Vec3, [{
    key: "set",
    value: function set() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }
  }, {
    key: "scale",
    value: function scale(s) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      return this.scale(-1);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      this.set(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
      return this;
    }
  }, {
    key: "getNormalVec",
    value: function getNormalVec() {
      if (this.x === 0) {
        return new Vec3(1, 0, 0);
      } else {
        return new Vec3(-(this.y + this.z) / this.x, 1, 1);
      }
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var s = 1 / this.length;
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
  }, {
    key: "angleWith",
    value: function angleWith(v) {
      return Math.acos(this.dot(v) / (this.length * v.length));
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this.x, this.y, this.z);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[Vec3 " + this.x + " " + this.y + " " + this.z + "]";
    }
  }, {
    key: "squaredLength",
    get: function get() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
  }, {
    key: "length",
    get: function get() {
      return Math.hypot(this.x, this.y, this.z);
    },
    set: function set(l) {
      var s = l / this.length;
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
  }]);

  return Vec3;
})();

exports["default"] = Vec3;

Vec3.distance = function (v0, v1) {
  return Math.hypot(v1.x - v0.x, v1.y - v0.y, v1.z - v0.z);
};

Vec3.origin = new Vec3(0, 0, 0);
Vec3.X = new Vec3(1, 0, 0);
Vec3.Y = new Vec3(0, 1, 0);
Vec3.Z = new Vec3(0, 0, 1);
module.exports = exports["default"];

},{}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Color = require("./Color");

var _Color2 = _interopRequireDefault(_Color);

var _Mat2 = require("./Mat2");

var _Mat22 = _interopRequireDefault(_Mat2);

var _Mat3 = require("./Mat3");

var _Mat32 = _interopRequireDefault(_Mat3);

var _Mat4 = require("./Mat4");

var _Mat42 = _interopRequireDefault(_Mat4);

var _Quaternion = require("./Quaternion");

var _Quaternion2 = _interopRequireDefault(_Quaternion);

var _Ray = require("./Ray");

var _Ray2 = _interopRequireDefault(_Ray);

var _Sphere = require("./Sphere");

var _Sphere2 = _interopRequireDefault(_Sphere);

var _Box = require("./Box");

var _Box2 = _interopRequireDefault(_Box);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Vec2 = require("./Vec2");

var _Vec22 = _interopRequireDefault(_Vec2);

var _Vec3 = require("./Vec3");

var _Vec32 = _interopRequireDefault(_Vec3);

exports["default"] = {
  Color: _Color2["default"],
  Mat2: _Mat22["default"],
  Mat3: _Mat32["default"],
  Mat4: _Mat42["default"],
  Quaternion: _Quaternion2["default"],
  Ray: _Ray2["default"],
  Sphere: _Sphere2["default"],
  Box: _Box2["default"],
  utils: _utils2["default"],
  Vec2: _Vec22["default"],
  Vec3: _Vec32["default"]
};
module.exports = exports["default"];

},{"./Box":46,"./Color":47,"./Mat2":48,"./Mat3":49,"./Mat4":50,"./Quaternion":51,"./Ray":52,"./Sphere":53,"./Vec2":54,"./Vec3":55,"./utils":57}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lerp = lerp;
exports.rand = rand;

function lerp(min, max, t) {
  return min + t * (max - min);
}

function rand(min, max) {
  return lerp(min, max, Math.random());
}

},{}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _Pass2 = require("./Pass");

var _Pass3 = _interopRequireDefault(_Pass2);

var _mathColor = require("../math/Color");

var _mathColor2 = _interopRequireDefault(_mathColor);

var fragmentSrc = "precision mediump float;\n\nuniform vec2 uFrameSize;\nuniform vec3 color;\nuniform float quantity;\nuniform sampler2D uTexture;\n\nvarying vec2 vUV;\n\nvoid main(void)\n{\n\tvec3 baseColor = texture2D( uTexture, vUV).rgb;\n  gl_FragColor = vec4(mix(baseColor, color, quantity), 1.0);\n}";

var Colorize = (function (_Pass) {
  _inherits(Colorize, _Pass);

  function Colorize(color, quantity) {
    _classCallCheck(this, Colorize);

    _get(Object.getPrototypeOf(Colorize.prototype), "constructor", this).call(this);
    this.color = new _mathColor2["default"](color);
    this.quantity = quantity;
    this.fragmentSrc = fragmentSrc;
  }

  _createClass(Colorize, [{
    key: "exec",
    value: function exec(input, target) {
      this.drawCallData.setUniforms({
        color: this.color,
        quantity: this.quantity
      });
      _get(Object.getPrototypeOf(Colorize.prototype), "exec", this).call(this, input, target);
    }
  }]);

  return Colorize;
})(_Pass3["default"]);

exports["default"] = Colorize;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../math/Color":47,"./Pass":60}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _Pass2 = require("./Pass");

var _Pass3 = _interopRequireDefault(_Pass2);

var fragmentSrc = "precision mediump float;\n\nuniform vec2 uFrameSize;\nuniform float saturation;\nuniform sampler2D uTexture;\n\nvarying vec2 vUV;\n\nvoid main(void)\n{\n\tvec3 color = texture2D( uTexture, vUV).rgb;\n\tfloat greyScale = (color.r + color.g + color.b) / 3.0;\n  gl_FragColor = vec4(mix(vec3(greyScale), color, saturation), 1.0);\n}";

var Desaturate = (function (_Pass) {
  _inherits(Desaturate, _Pass);

  function Desaturate(saturation) {
    _classCallCheck(this, Desaturate);

    _get(Object.getPrototypeOf(Desaturate.prototype), "constructor", this).call(this);
    this.saturation = saturation;
    this.fragmentSrc = fragmentSrc;
  }

  _createClass(Desaturate, [{
    key: "exec",
    value: function exec(input, target) {
      this.drawCallData.setUniforms({
        saturation: this.saturation
      });
      _get(Object.getPrototypeOf(Desaturate.prototype), "exec", this).call(this, input, target);
    }
  }]);

  return Desaturate;
})(_Pass3["default"]);

exports["default"] = Desaturate;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"./Pass":60}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _primitivesQuadGeometry = require("../primitives/QuadGeometry");

var _primitivesQuadGeometry2 = _interopRequireDefault(_primitivesQuadGeometry);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _coreDrawCall = require("../core/DrawCall");

var _coreDrawCall2 = _interopRequireDefault(_coreDrawCall);

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var vertexSrc = "precision mediump float;\n\nattribute vec3 aVertexPosition;\nattribute vec2 aUV;\n\nvarying vec2 vUV;\n\nvoid main(void)\n{\n  vUV = aUV;\n  gl_Position = vec4(aVertexPosition.xy, 0.0, 1.0);\n}";

var fragmentSrc = "precision mediump float;\n\nuniform sampler2D uTexture;\nvarying vec2 vUV;\n\nvoid main(void)\n{\n  gl_FragColor = texture2D( uTexture, vUV);\n}";

var quad = new _primitivesQuadGeometry2["default"]();

var Pass = (function () {
  function Pass(value) {
    _classCallCheck(this, Pass);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.isInit = false;
    this.vertexSrc = vertexSrc;
    this.fragmentSrc = fragmentSrc;
  }

  _createClass(Pass, [{
    key: "init",
    value: function init(context) {
      this.context = context;

      var program = new _coreProgram2["default"](this.vertexSrc, this.fragmentSrc);
      this.drawCallData.program = program;
      this.isInit = true;
    }
  }, {
    key: "exec",
    value: function exec(input, output) {
      this.drawCallData.setUniforms({
        uTexture: input.texture
      });

      new _coreDrawCall2["default"]([this.drawCallData, quad.getDrawCallData()]).exec(this.context, output);
    }
  }]);

  return Pass;
})();

exports["default"] = Pass;
module.exports = exports["default"];

},{"../core/DrawCall":9,"../core/DrawCallData":10,"../core/Program":13,"../primitives/QuadGeometry":65}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreFrameBuffer = require("../core/FrameBuffer");

var _coreFrameBuffer2 = _interopRequireDefault(_coreFrameBuffer);

var displaySrc = "precision mediump float;\n\nvarying vec2 vUV;\nuniform sampler2D uTexture;\n\nvoid main(void)\n{\n  gl_FragColor = vec4(texture2D(uTexture, vUV).rgb, 1.0);\n}";

var PostProcessor = (function () {
  function PostProcessor(context, passes) {
    _classCallCheck(this, PostProcessor);

    this.context = context;
    this.passes = passes;

    this.autoClear = true;

    //this.viewport = new Viewport();
    //this.resize(width, height);
    //
    this.readBuffer = new _coreFrameBuffer2["default"](this.context.width, this.context.height);
    this.readBuffer.initGL(this.context);
    this.readBuffer.name = "buff1";

    this.writeBuffer = new _coreFrameBuffer2["default"](this.context.width, this.context.height);
    this.writeBuffer.initGL(this.context);
    this.writeBuffer.name = "buff2";

    this.isInit = true;
  }

  _createClass(PostProcessor, [{
    key: "initGL",
    value: function initGL(context) {}
  }, {
    key: "exec",
    value: function exec(input, output) {
      var _this = this;

      this.swapBuffers();
      var drawCalls = this.passes.map(function (pass, i, arr) {
        if (!pass.isInit) {
          pass.init(_this.context);
        }
        var writeBuffer = i === arr.length - 1 ? output : _this.writeBuffer;
        pass.exec(_this.readBuffer, writeBuffer);
        _this.swapBuffers();
      });
    }
  }, {
    key: "toScreen",
    value: function toScreen() {
      this.exec(this.readBuffer, this.context);
    }
  }, {
    key: "toTexture",
    value: function toTexture() {
      this.exec(this.readBuffer, this.writeBuffer);
      this.swapBuffers();
      return this.readBuffer;
    }
  }, {
    key: "swapBuffers",
    value: function swapBuffers() {
      var temp = this.readBuffer;
      this.readBuffer = this.writeBuffer;
      this.writeBuffer = temp;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.readBuffer.clear();
      this.writeBuffer.clear();
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.writeBuffer.getDrawCallData();
    }
  }, {
    key: "dispose",
    value: function dispose() {}
  }, {
    key: "glFrameBuffer",
    get: function get() {
      return this.writeBuffer.glFrameBuffer;
    }
  }, {
    key: "texture",
    get: function get() {
      return this.readBuffer.texture;
    }
  }, {
    key: "width",
    get: function get() {
      return this.writeBuffer.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.writeBuffer.height;
    }
  }]);

  return PostProcessor;
})();

exports["default"] = PostProcessor;
module.exports = exports["default"];

},{"../core/FrameBuffer":11}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Colorize = require("./Colorize");

var _Colorize2 = _interopRequireDefault(_Colorize);

var _Desaturate = require("./Desaturate");

var _Desaturate2 = _interopRequireDefault(_Desaturate);

var _Pass = require("./Pass");

var _Pass2 = _interopRequireDefault(_Pass);

var _PostProcessor = require("./PostProcessor");

var _PostProcessor2 = _interopRequireDefault(_PostProcessor);

exports["default"] = {
  Colorize: _Colorize2["default"],
  Desaturate: _Desaturate2["default"],
  Pass: _Pass2["default"],
  PostProcessor: _PostProcessor2["default"]
};
module.exports = exports["default"];

},{"./Colorize":58,"./Desaturate":59,"./Pass":60,"./PostProcessor":61}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var CubeGeometry = (function () {
  function CubeGeometry() {
    _classCallCheck(this, CubeGeometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.updateBuffers();
  }

  _createClass(CubeGeometry, [{
    key: "updateBuffers",
    value: function updateBuffers() {
      var positions = new Float32Array([-1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, //left
      -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, //front
      1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, //right
      1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, //back
      -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, //top
      -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1 //bottom
      ]);

      var ids = new Uint16Array([0, 1, 2, 0, 2, 3, //left
      4, 5, 6, 4, 6, 7, //front
      8, 9, 10, 8, 10, 11, //right
      12, 13, 14, 12, 14, 15, //back
      16, 18, 17, 16, 19, 18, //top
      20, 22, 21, 20, 23, 22 //bottom
      ]);

      var normals = new Float32Array([-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, //left
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, //front
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, //right
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, //back
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, //top
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0]);

      //bottom
      var uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1, //left
      0, 0, 1, 0, 1, 1, 0, 1, //front
      0, 0, 1, 0, 1, 1, 0, 1, //right
      0, 0, 1, 0, 1, 1, 0, 1, //back
      0, 0, 1, 0, 1, 1, 0, 1, //top
      0, 0, 1, 0, 1, 1, 0, 1]);

      //bottom
      this.drawCallData.setIds(ids);
      this.drawCallData.setAttributes({
        aVertexPosition: positions,
        aVertexNormal: normals,
        aUV: uvs
      });
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return CubeGeometry;
})();

exports["default"] = CubeGeometry;
module.exports = exports["default"];

},{"../core/DrawCallData":10}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var CylinderGeometry = (function () {
  function CylinderGeometry(nCols, nRows, radiusTop, radiusBottom, topClosed, bottomClosed) {
    _classCallCheck(this, CylinderGeometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.setBuffers(nCols, nRows, radiusTop, radiusBottom, topClosed, bottomClosed);
  }

  _createClass(CylinderGeometry, [{
    key: "setBuffers",
    value: function setBuffers(nCols, nRows) {
      var radiusTop = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
      var radiusBottom = arguments.length <= 3 || arguments[3] === undefined ? radiusTop : arguments[3];
      var topClosed = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
      var bottomClosed = arguments.length <= 5 || arguments[5] === undefined ? topClosed : arguments[5];
      return (function () {
        var nx = nCols + 1;
        var ny = nRows + 1;
        var nVertices = nx * ny;

        var totalVertices = nVertices;
        if (topClosed) totalVertices += nx + 1;
        if (bottomClosed) totalVertices += nx + 1;

        var positions = new Float32Array(3 * totalVertices);
        var normals = new Float32Array(3 * totalVertices);
        var uvs = new Float32Array(2 * totalVertices);

        var i = undefined,
            id = undefined,
            col = undefined,
            row = undefined;
        for (i = 0; i < nVertices; i++) {
          id = 3 * i;
          col = i % nx;
          row = Math.floor(i / nx);

          var ratio = row / nRows;
          var radius = radiusTop + ratio * (radiusBottom - radiusTop);

          var angle = 2 * Math.PI * (col / nCols);
          positions[id] = radius * Math.cos(angle);
          positions[id + 1] = 0.5 - row / nRows;
          positions[id + 2] = radius * Math.sin(angle);

          normals[id] = positions[id];
          normals[id + 1] = 0;
          normals[id + 2] = positions[id + 2];

          var uvID = 2 * i;
          uvs[uvID] = col / nCols;
          uvs[uvID + 1] = row / nRows;
        }

        var nQuads = nVertices - nx;

        var totalTriangles = 2 * nQuads;
        if (topClosed) totalTriangles += nCols;
        if (bottomClosed) totalTriangles += nCols;

        var ids = new Uint16Array(3 * totalTriangles);

        for (i = 0; i < nQuads; i++) {
          id = 6 * i;
          col = i % nx;
          row = Math.floor(i / nx);
          if (col == nx - 1) continue;
          var nextVertexID = row * nx + (col + 1) % nx;

          ids[id] = i;
          ids[id + 1] = nextVertexID;
          ids[id + 2] = nextVertexID + nx;

          ids[id + 3] = i;
          ids[id + 4] = nextVertexID + nx;
          ids[id + 5] = i + nx;
        }

        var closeSide = function closeSide(firstId, firstSrcId, firstTriangleId, direction) {
          for (i = 0; i < nx; i++) {
            var _id = (firstId + i) * 3;
            positions[_id] = positions[firstSrcId + 3 * i];
            positions[_id + 1] = positions[firstSrcId + 3 * i + 1];
            positions[_id + 2] = positions[firstSrcId + 3 * i + 2];

            normals[_id] = normals[_id + 2] = 0;
            normals[_id + 1] = direction;

            var uvID = (firstId + i) * 2;
            uvs[uvID] = i / nCols;
            uvs[uvID + 1] = 0.5 * (direction + 1);
          }

          var centerVertexId = firstId + nx;
          var centerId = 3 * centerVertexId;
          positions[centerId] = positions[centerId + 2] = 0;
          positions[centerId + 1] = -direction * 0.5;

          normals[centerId] = normals[centerId + 2] = 0;
          normals[centerId + 1] = direction;

          var centerUVId = 3 * centerVertexId;
          uvs[centerUVId] = 0.5;
          uvs[centerUVId + 1] = direction;

          for (i = 0; i < nCols; i++) {
            var _id2 = 3 * (firstTriangleId + i);
            ids[_id2] = centerVertexId;
            ids[_id2 + 1] = firstId + i;
            ids[_id2 + 2] = firstId + i + 1;
          }
        };

        if (topClosed) {
          closeSide(nVertices, 0, 2 * nQuads, -1);
        }
        if (bottomClosed) {
          closeSide(nVertices + (topClosed ? nx + 1 : 0), 3 * (nVertices - nx), 2 * nQuads + (topClosed ? nCols : 0), 1);
        }

        this.drawCallData.setIds(ids);
        this.drawCallData.setAttributes({
          aVertexPosition: positions,
          aVertexNormal: normals,
          aUV: uvs
        });
      }).apply(this, arguments);
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return CylinderGeometry;
})();

exports["default"] = CylinderGeometry;
module.exports = exports["default"];

},{"../core/DrawCallData":10}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var QuadGeometry = (function () {
  function QuadGeometry() {
    _classCallCheck(this, QuadGeometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.setBuffers();
  }

  _createClass(QuadGeometry, [{
    key: "setBuffers",
    value: function setBuffers() {
      var positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);

      var normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);

      var uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);

      var ids = new Uint16Array([0, 1, 2, 0, 2, 3]);

      this.drawCallData.setIds(ids);
      this.drawCallData.setAttributes({
        aVertexPosition: positions,
        aVertexNormal: normals,
        aUV: uvs
      });
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return QuadGeometry;
})();

exports["default"] = QuadGeometry;
module.exports = exports["default"];

},{"../core/DrawCallData":10}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var SphereGeometry = (function () {
  function SphereGeometry(nCols, nRows) {
    _classCallCheck(this, SphereGeometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.setBuffers(nCols, nRows);
  }

  _createClass(SphereGeometry, [{
    key: "setBuffers",
    value: function setBuffers(nCols, nRows) {
      var nx = nCols + 1;
      var ny = nRows + 1;
      var nVertices = nx * ny;

      var positions = new Float32Array(3 * nVertices);
      var normals = new Float32Array(3 * nVertices);
      var uvs = new Float32Array(2 * nVertices);

      var i = undefined,
          id = undefined,
          col = undefined,
          row = undefined;
      var v3 = new _mathVec32["default"]();
      for (i = 0; i < nVertices; i++) {
        id = 3 * i;
        col = i % nx;
        row = Math.floor(i / nx);

        v3.y = -Math.cos(Math.PI * row / nRows);
        var radius = Math.sqrt(1 - v3.y * v3.y);
        var angle = 2 * Math.PI * (col / nCols);
        v3.x = radius * Math.cos(angle);
        v3.z = radius * Math.sin(angle);

        positions[id] = v3.x;
        positions[id + 1] = v3.y;
        positions[id + 2] = v3.z;

        v3.normalize();

        normals[id] = v3.x;
        normals[id + 1] = v3.y;
        normals[id + 2] = v3.z;

        var uvID = 2 * i;
        uvs[uvID] = col / nCols;
        uvs[uvID + 1] = row / nRows;
      }

      var nQuads = nVertices - nx;

      var ids = new Uint16Array(6 * nQuads);

      for (i = 0; i < nQuads; i++) {
        id = 6 * i;
        col = i % nx;
        row = Math.floor(i / nx);
        if (col == nx - 1) continue;
        var nextVertexID = row * nx + (col + 1) % nx;

        ids[id] = i;
        ids[id + 1] = nextVertexID + nx;
        ids[id + 2] = nextVertexID;

        ids[id + 3] = i;
        ids[id + 4] = i + nx;
        ids[id + 5] = nextVertexID + nx;
      }

      this.drawCallData.setIds(ids);
      this.drawCallData.setAttributes({
        aVertexPosition: positions,
        aVertexNormal: normals,
        aUV: uvs
      });
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return SphereGeometry;
})();

exports["default"] = SphereGeometry;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../math/Vec3":55}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var TorusGeometry = (function () {
  function TorusGeometry(nCols, nRows, thickness) {
    _classCallCheck(this, TorusGeometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.setBuffers(nCols, nRows, thickness);
  }

  _createClass(TorusGeometry, [{
    key: "setBuffers",
    value: function setBuffers(nCols, nRows) {
      var thickness = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];

      if (thickness > 1) thickness = 1;else if (thickness < 0) thickness = 0;

      var nx = nRows + 1;
      var ny = nCols + 1;
      var nVertices = nx * ny;

      var positions = new Float32Array(3 * nVertices);
      var normals = new Float32Array(3 * nVertices);
      var uvs = new Float32Array(2 * nVertices);

      var i = undefined,
          j = undefined,
          id = undefined;
      var center = new _mathVec32["default"]();
      var norm0 = new _mathVec32["default"]();
      var norm1 = new _mathVec32["default"]();
      var pos = new _mathVec32["default"]();
      for (j = 0; j < ny; j++) {
        var ang0 = 2 * Math.PI * j / nCols;
        center.set(Math.cos(ang0), 0, Math.sin(ang0));
        for (i = 0; i < nx; i++) {
          var vId = j * nx + i;
          id = 3 * vId;

          var ang1 = 2 * Math.PI * i / nRows;
          norm1.copy(center).scale(Math.cos(ang1));
          norm1.y += Math.sin(ang1);

          pos.copy(norm1).scale(thickness).add(center);

          positions[id] = pos.x;
          positions[id + 1] = pos.y;
          positions[id + 2] = pos.z;

          normals[id] = norm1.x;
          normals[id + 1] = norm1.y;
          normals[id + 2] = norm1.z;

          var uvID = 2 * vId;
          uvs[uvID] = j / nCols;
          uvs[uvID + 1] = i / nRows;
        }
      }

      var nQuads = nVertices - nx;

      var ids = new Uint16Array(6 * nQuads);

      for (i = 0; i < nQuads; i++) {
        id = 6 * i;
        var col = i % nx;
        var row = Math.floor(i / nx);
        if (col == nx - 1) continue;
        var nextVertexID = row * nx + (col + 1) % nx;

        ids[id] = i;
        ids[id + 1] = nextVertexID;
        ids[id + 2] = nextVertexID + nx;

        ids[id + 3] = i;
        ids[id + 4] = nextVertexID + nx;
        ids[id + 5] = i + nx;
      }

      this.drawCallData.setIds(ids);
      this.drawCallData.setAttributes({
        aVertexPosition: positions,
        aVertexNormal: normals,
        aUV: uvs
      });
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return TorusGeometry;
})();

exports["default"] = TorusGeometry;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../math/Vec3":55}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

function flipNormals(normals) {
  var n = normals.length;
  for (var i = 0; i < n; i++) {
    normals[i] *= -1;
  }
}

function computeVectors(pts) {
  var n = pts.length;
  var tans = [];
  var vas = [];
  var vbs = [];
  var v0 = new _mathVec32["default"]().copy(pts[1]).sub(pts[0]).normalize();
  tans[0] = v0;
  vas[0] = v0.clone().getNormalVec().normalize();
  vbs[0] = v0.clone().cross(vas[0]).normalize();
  for (var i = 1; i < n - 1; i++) {
    var p0 = pts[i - 1];
    var p1 = pts[i];
    var p2 = pts[i + 1];

    var tan = new _mathVec32["default"]().copy(p2).sub(p0).normalize();
    tans[i] = tan;
    vas[i] = tan.clone().cross(vbs[i - 1]).normalize().negate();
    vbs[i] = tan.clone().cross(vas[i]).normalize();
  }
  var vn = new _mathVec32["default"]().copy(pts[n - 1]).sub(pts[n - 2]).normalize();
  tans[n - 1] = vn;
  vas[n - 1] = vn.clone().cross(vbs[n - 2]).normalize().negate();
  vbs[n - 1] = vn.clone().cross(vas[n - 1]).normalize();
  return {
    tans: tans,
    vas: vas,
    vbs: vbs
  };
}

function computeVertices(pts, vas, vbs, sides) {
  var n = pts.length;
  var positions = new Float32Array(n * sides * 3);
  var normals = new Float32Array(n * sides * 3);
  var centers = new Float32Array(n * sides * 3);
  var angRatio = 2 * Math.PI / sides;
  for (var i = 0; i < n; i++) {
    var p = pts[i];
    var va = vas[i];
    var vb = vbs[i];
    var pid = i * sides * 3;
    for (var j = 0; j < sides; j++) {
      var ang = j * angRatio;
      var ca = Math.cos(ang);
      var sa = Math.sin(ang);
      var vid = pid + 3 * j;
      normals[vid] = va.x * ca + vb.x * sa;
      normals[vid + 1] = va.y * ca + vb.y * sa;
      normals[vid + 2] = va.z * ca + vb.z * sa;

      centers[vid] = p.x;
      centers[vid + 1] = p.y;
      centers[vid + 2] = p.z;

      positions[vid] = p.x + p.radius * normals[vid];
      positions[vid + 1] = p.y + p.radius * normals[vid + 1];
      positions[vid + 2] = p.z + p.radius * normals[vid + 2];
    }
  }
  return {
    positions: positions,
    centers: centers,
    normals: normals
  };
}

function computeIds(vertices, sides) {
  var n = vertices.length / 3;
  var ids = new Uint16Array((n - 1) * 6);
  for (var i = 0; i < n - sides; i++) {
    var id = 6 * i;
    var nextId = (i + 1) % sides === 0 ? i - (sides - 1) : i + 1;

    ids[id] = i;
    ids[id + 1] = nextId;
    ids[id + 2] = nextId + sides;

    ids[id + 3] = i;
    ids[id + 4] = nextId + sides;
    ids[id + 5] = i + sides;
  }
  return ids;
}

function computeUvs(vertices, sides) {
  var n = vertices.length / 3;
  var uvs = new Float32Array(2 * n);
  var nLevels = n / (sides + 1);
  for (var i = 0; i < n; i++) {
    uvs[2 * i] = i % sides / sides;
    uvs[2 * i + 1] = i / sides / nLevels;
  }
  return uvs;
}

function computeLevels(pts, sides) {
  var nPts = pts.length;
  var levels = new Float32Array(sides * nPts);
  var levelRatios = new Float32Array(sides * nPts);
  for (var i = 0; i < nPts; i++) {
    var p = pts[i];
    var level = i;
    var levelRatio = i / (nPts - 1);
    for (var j = 0; j < sides; j++) {
      levels[sides * i + j] = level;
      levelRatios[sides * i + j] = levelRatio;
    }
  }
  return {
    levels: levels,
    levelRatios: levelRatios
  };
}

var TubeGeometry = (function () {
  function TubeGeometry(pts, sides) {
    _classCallCheck(this, TubeGeometry);

    this.drawCallData = new _coreDrawCallData2["default"]();
    this.updateBuffers(pts, sides);
  }

  _createClass(TubeGeometry, [{
    key: "updateBuffers",
    value: function updateBuffers(pts, sides) {
      var vectors = computeVectors(pts);

      var vertices = computeVertices(pts, vectors.vas, vectors.vbs, sides);
      var ids = computeIds(vertices.positions, sides);
      var uvs = computeUvs(vertices.positions, sides);
      var levelsData = computeLevels(pts, sides);

      var lineNormals = vectors.vas.reduce(function (vas, v, i) {
        for (var j = 0; j < sides; j++) {
          var id = 3 * (sides * i + j);
          vas[id] = v.x;
          vas[id + 1] = v.y;
          vas[id + 2] = v.z;
        }
        return vas;
      }, new Float32Array(vertices.positions.length));

      this.drawCallData.setIds(ids);
      this.drawCallData.setAttributes({
        aVertexPosition: vertices.positions,
        aVertexNormal: vertices.normals,
        aCenter: vertices.centers,
        aLevel: levelsData.levels,
        aLevelRatio: levelsData.levelRatios,
        aLineNormal: lineNormals,
        aUV: uvs
      });

      return vectors;
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return TubeGeometry;
})();

exports["default"] = TubeGeometry;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../math/Vec3":55}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _CubeGeometry = require("./CubeGeometry");

var _CubeGeometry2 = _interopRequireDefault(_CubeGeometry);

var _CylinderGeometry = require("./CylinderGeometry");

var _CylinderGeometry2 = _interopRequireDefault(_CylinderGeometry);

var _QuadGeometry = require("./QuadGeometry");

var _QuadGeometry2 = _interopRequireDefault(_QuadGeometry);

var _SphereGeometry = require("./SphereGeometry");

var _SphereGeometry2 = _interopRequireDefault(_SphereGeometry);

var _TorusGeometry = require("./TorusGeometry");

var _TorusGeometry2 = _interopRequireDefault(_TorusGeometry);

var _TubeGeometry = require("./TubeGeometry");

var _TubeGeometry2 = _interopRequireDefault(_TubeGeometry);

exports["default"] = {
  CubeGeometry: _CubeGeometry2["default"],
  CylinderGeometry: _CylinderGeometry2["default"],
  QuadGeometry: _QuadGeometry2["default"],
  SphereGeometry: _SphereGeometry2["default"],
  TorusGeometry: _TorusGeometry2["default"],
  TubeGeometry: _TubeGeometry2["default"]
};
module.exports = exports["default"];

},{"./CubeGeometry":63,"./CylinderGeometry":64,"./QuadGeometry":65,"./SphereGeometry":66,"./TorusGeometry":67,"./TubeGeometry":68}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreConsts = require("../core/consts");

var _coreConsts2 = _interopRequireDefault(_coreConsts);

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _coreProgram = require("../core/Program");

var _coreProgram2 = _interopRequireDefault(_coreProgram);

var _SceneNode2 = require("./SceneNode");

var _SceneNode3 = _interopRequireDefault(_SceneNode2);

var vertexSrc = "\nprecision mediump float;\n\nattribute vec3 aVertexPosition;\nuniform mat4 globalTransform;\nvarying vec3 vPos;\n\nstruct Camera\n{\n  mat4 transform;\n  mat4 globalTransform;\n  mat4 projection;\n  vec3 position;\n};\nuniform Camera camera;\n\nvoid main()\n{\n  vec4 vertexWorldPosition =  vec4(aVertexPosition, 1.0); \n  vPos = vertexWorldPosition.xyz;\n  gl_Position = camera.projection * camera.transform * vertexWorldPosition;\n}";

var fragmentSrc = "\nprecision mediump float;\n\nvarying vec3 vPos;\n\nvoid main()\n{\n  gl_FragColor = vec4(normalize(vPos), 1.0);\n}";

var Basis = (function (_SceneNode) {
  _inherits(Basis, _SceneNode);

  function Basis() {
    _classCallCheck(this, Basis);

    _get(Object.getPrototypeOf(Basis.prototype), "constructor", this).call(this);
    this.triggersDrawCall = true;
    this.drawCallData.program = new _coreProgram2["default"](vertexSrc, fragmentSrc);
    this.drawCallData.drawMethod = _coreConsts2["default"].LINES;

    this.drawCallData.setAttributes({
      aVertexPosition: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1])
    });
    this.drawCallData.setIds(new Uint16Array([0, 1, 0, 2, 0, 3]));
  }

  _createClass(Basis, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }]);

  return Basis;
})(_SceneNode3["default"]);

exports["default"] = Basis;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../core/Program":13,"../core/consts":17,"./SceneNode":74}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SceneNode2 = require("./SceneNode");

var _SceneNode3 = _interopRequireDefault(_SceneNode2);

var _mathMat4 = require("../math/Mat4");

var _mathMat42 = _interopRequireDefault(_mathMat4);

var Camera = (function (_SceneNode) {
  _inherits(Camera, _SceneNode);

  function Camera(fov, aspect, near, far) {
    _classCallCheck(this, Camera);

    _get(Object.getPrototypeOf(Camera.prototype), "constructor", this).call(this);
    this.name = "camera";

    this._fov = fov;
    this._aspect = aspect;
    this._near = near;
    this._far = far;

    this._viewMatrix = new _mathMat42["default"]();
    this._projectionMatrix = new _mathMat42["default"]();

    this._projectionChanged = true;
  }

  _createClass(Camera, [{
    key: "computeProjectionMatrix",
    value: function computeProjectionMatrix() {
      _mathMat42["default"].projection(this._fov * Math.PI / 180, this._aspect, this._near, this._far, this._projectionMatrix);
      this._projectionChanged = false;
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      if (this._projectionChanged) {
        this.computeProjectionMatrix();
      }
      this._viewMatrix.copy(this._globalTransform);
      this._viewMatrix.invert();
      //console.log(this._viewMatrix.toString());
      //
      this.drawCallData.setUniforms({
        camera: {
          globalTransform: this._globalTransform,
          transform: this._viewMatrix,
          projection: this._projectionMatrix,
          position: this.position
        }
      });
      return this.drawCallData;
    }
  }, {
    key: "fov",
    get: function get() {
      return this._fov;
    },
    set: function set(value) {
      this._fov = value;
      this._projectionChanged = true;
    }
  }, {
    key: "aspect",
    get: function get() {
      return this._aspect;
    },
    set: function set(value) {
      this._aspect = value;
      this._projectionChanged = true;
    }
  }, {
    key: "near",
    get: function get() {
      return this._near;
    },
    set: function set(value) {
      this._near = value;
      this._projectionChanged = true;
    }
  }, {
    key: "far",
    get: function get() {
      return this._far;
    },
    set: function set(value) {
      this._far = value;
      this._projectionChanged = true;
    }
  }]);

  return Camera;
})(_SceneNode3["default"]);

exports["default"] = Camera;
module.exports = exports["default"];

},{"../math/Mat4":50,"./SceneNode":74}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SceneNode2 = require("./SceneNode");

var _SceneNode3 = _interopRequireDefault(_SceneNode2);

var Group = (function (_SceneNode) {
  _inherits(Group, _SceneNode);

  function Group() {
    _classCallCheck(this, Group);

    _get(Object.getPrototypeOf(Group.prototype), "constructor", this).call(this);
    this.children = [];
  }

  _createClass(Group, [{
    key: "add",
    value: function add(node) {
      node.detach();
      this.children.push(node);
      node.parent = this;
    }
  }, {
    key: "remove",
    value: function remove(node) {
      var id = this.children.indexOf(node);
      if (id === -1) {
        return;
      }

      this.children.splice(id, 1);
      node.parent = undefined;
    }
  }]);

  return Group;
})(_SceneNode3["default"]);

exports["default"] = Group;
module.exports = exports["default"];

},{"./SceneNode":74}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SceneNode2 = require("./SceneNode");

var _SceneNode3 = _interopRequireDefault(_SceneNode2);

var _mathMat3 = require("../math/Mat3");

var _mathMat32 = _interopRequireDefault(_mathMat3);

var Mesh = (function (_SceneNode) {
  _inherits(Mesh, _SceneNode);

  function Mesh(geometry, material) {
    _classCallCheck(this, Mesh);

    _get(Object.getPrototypeOf(Mesh.prototype), "constructor", this).call(this);
    this._normalMatrix = new _mathMat32["default"]();
    this.triggersDrawCall = true;
    this.geometry = geometry;
    this.material = material;
  }

  _createClass(Mesh, [{
    key: "getDrawCallData",
    value: function getDrawCallData() {
      this.drawCallData.setUniforms({
        globalTransform: this._globalTransform,
        normalMatrix: this.normalMatrix
      });
      return [this.drawCallData, this.geometry.getDrawCallData(), this.material.getDrawCallData()];
    }
  }, {
    key: "normalMatrix",
    get: function get() {
      var t = this._globalTransform.data;

      this._normalMatrix.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]).invert().transpose();
      return this._normalMatrix.clone();
    }
  }]);

  return Mesh;
})(_SceneNode3["default"]);

exports["default"] = Mesh;
module.exports = exports["default"];

},{"../math/Mat3":49,"./SceneNode":74}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _mathVec3 = require("../math/Vec3");

var _mathVec32 = _interopRequireDefault(_mathVec3);

var _mathQuaternion = require("../math/Quaternion");

var _mathQuaternion2 = _interopRequireDefault(_mathQuaternion);

var _mathMat4 = require("../math/Mat4");

var _mathMat42 = _interopRequireDefault(_mathMat4);

var _mathMat3 = require("../math/Mat3");

var _mathMat32 = _interopRequireDefault(_mathMat3);

var SceneNode = (function () {
  function SceneNode() {
    _classCallCheck(this, SceneNode);

    this.drawCallData = new _coreDrawCallData2["default"]();

    this._transform = new _mathMat42["default"]();
    this._globalTransform = new _mathMat42["default"]();
    this.position = new _mathVec32["default"]();
    this.orientation = new _mathMat32["default"]();
    //this.orientation = new Quaternion();
    this.scale = new _mathVec32["default"](1, 1, 1);
  }

  _createClass(SceneNode, [{
    key: "detach",
    value: function detach() {
      if (this.parent !== undefined) {
        this.parent.remove(this);
      }
    }
  }, {
    key: "lookAt",
    value: function lookAt(target, up) {
      this.orientation.lookAt(this.position, target, up);
    }
  }, {
    key: "getDrawCallData",
    value: function getDrawCallData() {
      return this.drawCallData;
    }
  }, {
    key: "transform",
    get: function get() {
      //this._transform.multiplyMat3(this.orientation);
      var t = this.orientation.data;
      this._transform.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1);
      //this._transform.identity();
      this._transform.scaleV(this.scale);
      this._transform.translateV(this.position);
      return this._transform.clone();
    }
  }, {
    key: "globalTransform",
    get: function get() {
      return this._globalTransform.clone();
    }
  }]);

  return SceneNode;
})();

exports["default"] = SceneNode;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"../math/Mat3":49,"../math/Mat4":50,"../math/Quaternion":51,"../math/Vec3":55}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Camera = require("./Camera");

var _Camera2 = _interopRequireDefault(_Camera);

var _Group = require("./Group");

var _Group2 = _interopRequireDefault(_Group);

var _Mesh = require("./Mesh");

var _Mesh2 = _interopRequireDefault(_Mesh);

var _SceneNode = require("./SceneNode");

var _SceneNode2 = _interopRequireDefault(_SceneNode);

var _Basis = require("./Basis");

var _Basis2 = _interopRequireDefault(_Basis);

exports["default"] = {
  Camera: _Camera2["default"],
  Group: _Group2["default"],
  Mesh: _Mesh2["default"],
  SceneNode: _SceneNode2["default"],
  Basis: _Basis2["default"]
};
module.exports = exports["default"];

},{"./Basis":70,"./Camera":71,"./Group":72,"./Mesh":73,"./SceneNode":74}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCall = require("../core/DrawCall");

var _coreDrawCall2 = _interopRequireDefault(_coreDrawCall);

var DrawCallsVisitor = (function () {
  function DrawCallsVisitor() {
    _classCallCheck(this, DrawCallsVisitor);

    this.drawCalls = [];
    this.drawCallData = [];
  }

  _createClass(DrawCallsVisitor, [{
    key: "enterNode",
    value: function enterNode(node) {
      this.drawCallData.push(node.getDrawCallData());
      if (node.triggersDrawCall) {
        this.drawCalls.push(new _coreDrawCall2["default"](this.drawCallData.concat()));
      }
      return true;
    }
  }, {
    key: "exitNode",
    value: function exitNode(node) {
      this.drawCallData.pop();
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.drawCalls;
    }
  }]);

  return DrawCallsVisitor;
})();

exports["default"] = DrawCallsVisitor;
module.exports = exports["default"];

},{"../core/DrawCall":9}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var LightsVisitor = (function () {
  function LightsVisitor() {
    _classCallCheck(this, LightsVisitor);

    this.lights = [];
    this.lightsDrawCallDatas = [];
    this.drawCallData = new _coreDrawCallData2["default"]();
  }

  _createClass(LightsVisitor, [{
    key: "enterNode",
    value: function enterNode(node) {
      if (node.isLightEmitter) {
        this.lights.push(node);
        this.lightsDrawCallDatas.push(node.getDrawCallData());
        if (node.lightType !== undefined) {
          var defineName = node.lightType.toUpperCase() + "_LIGHT_COUNT";
          if (this.drawCallData.defines[defineName] === undefined) {
            this.drawCallData.defines[defineName] = 0;
          }
          this.drawCallData.defines[defineName]++;
        }
      }
      return true;
    }
  }, {
    key: "exitNode",
    value: function exitNode(node) {}
  }, {
    key: "getResult",
    value: function getResult() {
      return {
        drawCallData: [this.drawCallData, this.lightsDrawCallDatas],
        lights: this.lights
      };
    }
  }]);

  return LightsVisitor;
})();

exports["default"] = LightsVisitor;
module.exports = exports["default"];

},{"../core/DrawCallData":10}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NamesVisitor = (function () {
  function NamesVisitor() {
    _classCallCheck(this, NamesVisitor);

    this.result = [];
    this.tabs = [];
  }

  _createClass(NamesVisitor, [{
    key: "enterNode",
    value: function enterNode(node) {
      this.result.push(this.tabs.join("") + node.type + (node.name ? " : " + node.name + " " : ""));
      this.tabs.push("\t");
      return true;
    }
  }, {
    key: "exitNode",
    value: function exitNode(node) {
      this.tabs.pop();
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result.join("\n");
    }
  }]);

  return NamesVisitor;
})();

exports["default"] = NamesVisitor;
module.exports = exports["default"];

},{}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _coreDrawCallData = require("../core/DrawCallData");

var _coreDrawCallData2 = _interopRequireDefault(_coreDrawCallData);

var _DrawCallsVisitor = require("./DrawCallsVisitor");

var _DrawCallsVisitor2 = _interopRequireDefault(_DrawCallsVisitor);

var _LightsVisitor = require("./LightsVisitor");

var _LightsVisitor2 = _interopRequireDefault(_LightsVisitor);

var _TransformsVisitor = require("./TransformsVisitor");

var _TransformsVisitor2 = _interopRequireDefault(_TransformsVisitor);

var _traverseTree = require("./traverseTree");

var _traverseTree2 = _interopRequireDefault(_traverseTree);

var SceneRenderer = (function () {
  function SceneRenderer(context) {
    _classCallCheck(this, SceneRenderer);

    this.context = context;
    this.drawCallData = new _coreDrawCallData2["default"]();
  }

  _createClass(SceneRenderer, [{
    key: "setUniforms",
    value: function setUniforms(uniforms) {
      this.drawCallData.setUniforms(uniforms);
    }
  }, {
    key: "render",
    value: function render(scene, camera, target) {
      var _this = this;

      if (target === undefined) {
        target = this.context;
      }

      if (camera.parent === undefined) {
        console.warn("camera not attached to node, camera transform can't be computed");
      }

      if (target.autoClear) {
        target.clear();
      }
      var drawCallsVisitor = new _DrawCallsVisitor2["default"]();
      var transformsVisitor = new _TransformsVisitor2["default"]();
      var lightsVisitor = new _LightsVisitor2["default"]();

      (0, _traverseTree2["default"])(scene, [transformsVisitor, lightsVisitor, drawCallsVisitor]);

      var drawCalls = drawCallsVisitor.getResult();
      if (drawCalls.length === 0) {
        console.warn("Scene doesn't contain any drawable object");
      }

      var lightsResult = lightsVisitor.getResult();
      drawCalls.forEach(function (drawCall) {
        drawCall.addData([_this.drawCallData, lightsResult.drawCallData, target.getDrawCallData(), camera.getDrawCallData()]);
        drawCall.exec(_this.context, target);
      });

      return drawCalls;
    }
  }]);

  return SceneRenderer;
})();

exports["default"] = SceneRenderer;
module.exports = exports["default"];

},{"../core/DrawCallData":10,"./DrawCallsVisitor":76,"./LightsVisitor":77,"./TransformsVisitor":80,"./traverseTree":82}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mathMat4 = require("../math/Mat4");

var _mathMat42 = _interopRequireDefault(_mathMat4);

var TransformsVisitor = (function () {
  function TransformsVisitor() {
    _classCallCheck(this, TransformsVisitor);

    this.transform = new _mathMat42["default"]();
    this.transforms = [];
  }

  _createClass(TransformsVisitor, [{
    key: "enterNode",
    value: function enterNode(node) {
      this.transform = node.transform.multiplyMat(this.transform);
      this.transforms.push(this.transform);
      node._globalTransform.copy(this.transform);
      return true;
    }
  }, {
    key: "exitNode",
    value: function exitNode(node) {
      this.transforms.pop();
      this.transform = this.transforms[this.transforms.length - 1];
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return;
    }
  }]);

  return TransformsVisitor;
})();

exports["default"] = TransformsVisitor;
module.exports = exports["default"];

},{"../math/Mat4":50}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _DrawCallsVisitor = require("./DrawCallsVisitor");

var _DrawCallsVisitor2 = _interopRequireDefault(_DrawCallsVisitor);

var _LightsVisitor = require("./LightsVisitor");

var _LightsVisitor2 = _interopRequireDefault(_LightsVisitor);

var _NamesVisitor = require("./NamesVisitor");

var _NamesVisitor2 = _interopRequireDefault(_NamesVisitor);

var _SceneRenderer = require("./SceneRenderer");

var _SceneRenderer2 = _interopRequireDefault(_SceneRenderer);

var _TransformsVisitor = require("./TransformsVisitor");

var _TransformsVisitor2 = _interopRequireDefault(_TransformsVisitor);

var _traverseTree = require("./traverseTree");

var _traverseTree2 = _interopRequireDefault(_traverseTree);

exports["default"] = {
  DrawCallsVisitor: _DrawCallsVisitor2["default"],
  LightsVisitor: _LightsVisitor2["default"],
  NamesVisitor: _NamesVisitor2["default"],
  SceneRenderer: _SceneRenderer2["default"],
  TransformsVisitor: _TransformsVisitor2["default"],
  traverseTree: _traverseTree2["default"]
};
module.exports = exports["default"];

},{"./DrawCallsVisitor":76,"./LightsVisitor":77,"./NamesVisitor":78,"./SceneRenderer":79,"./TransformsVisitor":80,"./traverseTree":82}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = traverseTree;
function traverseNode(node, visitors) {
  //unclear
  var visitNext = true;
  var visitorsToExit = visitors.filter(function (visitor) {
    if (visitNext) {
      visitNext = visitor.enterNode(node) !== false;
      return true;
    } else {
      return false;
    }
  });
  if (visitNext && node.children) {
    node.children.forEach(function (child) {
      traverseNode(child, visitors);
    });
  }
  visitorsToExit.forEach(function (visitor) {
    visitor.exitNode(node);
  });
}

function traverseTree(tree, visitors) {
  traverseNode(tree, visitors);
}

module.exports = exports["default"];

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Log;

function Log() {
  var isActivated = false;
  var prefix;

  var log = function log() {
    if (!isActivated) return;
    var args = Array.prototype.slice.call(arguments);
    if (prefix !== undefined) {
      args.unshift(prefix);
    }

    if (console.log.apply !== undefined) {
      console.log.apply(console, args);
    } else {
      console.log(args.join(", "));
    }
  };

  log.activate = function (prefixStr) {
    if (prefixStr !== undefined) {
      prefix = prefixStr;
    }
    isActivated = true;
  };
  return log;
}

module.exports = exports["default"];

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Signal = require("./Signal");

var _Signal2 = _interopRequireDefault(_Signal);

require("./polyfills");

var Loop = (function () {
  function Loop(callback, scope, autoPlay) {
    _classCallCheck(this, Loop);

    this.onUpdate = new _Signal2["default"]();
    this.isPaused = true;
    this.frameId = 0;
    if (callback) {
      this.onUpdate.add(callback, scope);
      if (autoPlay || autoPlay === undefined) {
        this.play();
      }
    }
  }

  _createClass(Loop, [{
    key: "play",
    value: function play() {
      if (!this.isPaused) return;
      this.isPaused = false;
      this._onUpdate();
    }
  }, {
    key: "_onUpdate",
    value: function _onUpdate() {
      //can cause the loop to be paused
      this.onUpdate.dispatch(this.frameId);
      if (!this.isPaused) {
        this._requestFrame = requestAnimationFrame(this._onUpdate.bind(this));
      }
      this.frameId++;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPaused = true;
      cancelAnimationFrame(this._requestFrame);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.onUpdate.dispose();
      pause();
    }
  }]);

  return Loop;
})();

exports["default"] = Loop;
module.exports = exports["default"];

},{"./Signal":85,"./polyfills":87}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("./polyfills");

var Listener = (function () {
  function Listener(signal, callback, scope, args) {
    _classCallCheck(this, Listener);

    this.callback = callback;
    this.scope = scope;
    this.args = args;
    this.once = false;
  }

  _createClass(Listener, [{
    key: "dispatch",
    value: function dispatch(args) {
      this.callback.apply(this.scope, args.concat(this.args));
    }
  }]);

  return Listener;
})();

var Signal = (function () {
  function Signal() {
    _classCallCheck(this, Signal);

    this.listeners = [];
  }

  _createClass(Signal, [{
    key: "add",
    value: function add(callback, scope) {
      if (callback === undefined) {
        throw new Error("no callback specified");
      }
      var args = Array.prototype.slice.call(arguments, 2);
      var n = this.listeners.length;
      var listener = new Listener(this, callback, scope, args);
      this.listeners.push(listener);
      return listener;
    }
  }, {
    key: "addOnce",
    value: function addOnce(callback, scope) {
      var listener = this.add.apply(this, arguments);
      listener.once = true;
      return listener;
    }
  }, {
    key: "remove",
    value: function remove(callback, scope) {
      var n = this.listeners.length;
      for (var i = 0; i < n; i++) {
        var listener = this.listeners[i];
        if (listener.callback == callback && listener.scope == scope) {
          this.listeners.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      var id = this.listeners.length;
      if (id !== -1) {
        this.listeners.splice(id, 1);
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch() {
      var args = Array.prototype.slice.call(arguments);
      var n = this.listeners.length;
      for (var i = 0; i < n; i++) {
        var listener = this.listeners[i];
        listener.dispatch(args);
        if (listener.once) {
          this.listeners.splice(i, 1);
          n--;
          i--;
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.listeners = [];
    }
  }]);

  return Signal;
})();

exports["default"] = Signal;
module.exports = exports["default"];

},{"./polyfills":87}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Log = require("./Log");

var _Log2 = _interopRequireDefault(_Log);

var _Loop = require("./Loop");

var _Loop2 = _interopRequireDefault(_Loop);

var _polyfills = require("./polyfills");

var _polyfills2 = _interopRequireDefault(_polyfills);

var _Signal = require("./Signal");

var _Signal2 = _interopRequireDefault(_Signal);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

exports["default"] = {
  Log: _Log2["default"],
  Loop: _Loop2["default"],
  polyfills: _polyfills2["default"],
  Signal: _Signal2["default"],
  utils: _utils2["default"]
};
module.exports = exports["default"];

},{"./Log":83,"./Loop":84,"./Signal":85,"./polyfills":87,"./utils":88}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
  return setTimeout(fn, 50 / 3);
};

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || function (id) {
  clearTimeout(id);
};

if (!Function.prototype.bind) {
  Function.prototype.bind = function (scope) {
    if (!method) throw new Error("no method specified");
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
      var params = Array.prototype.slice.call(arguments);
      method.apply(scope, params.concat(args));
    };
  };
}

if (window.console === undefined || console.log === undefined) {
  window.console = {
    log: function log() {}
  };
}

exports["default"] = {};
module.exports = exports["default"];

},{}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isFunction = isFunction;
exports.defaultOptions = defaultOptions;
exports.wait = wait;

require("./polyfills");

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function defaultOptions(options, defaults) {
    if (options === undefined) {
        options = {};
    }
    for (var key in defaults) {
        if (options[key] === undefined) {
            options[key] = defaults[key];
        }
    }
    return options;
}

function wait(test, callback) {
    (function check() {
        if (test()) {
            callback();
        } else {
            requestAnimationFrame(check);
        }
    })();
}

},{"./polyfills":87}],89:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _glglBundlesGiggle = require("../glgl/bundles/Giggle");

var _glglBundlesGiggle2 = _interopRequireDefault(_glglBundlesGiggle);

var _glglGlgl = require("../glgl/glgl");

var temp = new _glglGlgl.Vec3();

var Particle = (function () {
  function Particle(mesh, radius, x, y, z) {
    _classCallCheck(this, Particle);

    this.mesh = mesh;
    this.pos = new _glglGlgl.Vec3(x, y, z);
    this.oPos = new _glglGlgl.Vec3(x, y, z);
    this.force = new _glglGlgl.Vec3(0, 0, 0);
    this.mass = 1;
    this.radius = radius;
    this.mesh.scale.scale(this.radius);
  }

  _createClass(Particle, [{
    key: "update",
    value: function update(dt) {
      temp.copy(this.pos);
      this.pos.scale(2).sub(this.oPos).add(this.force.scale(dt * dt / this.mass));
      this.oPos.copy(temp);
      this.mesh.position.copy(this.pos);
    }
  }]);

  return Particle;
})();

var Main = (function () {
  function Main() {
    _classCallCheck(this, Main);

    this.ctx = new _glglBundlesGiggle2["default"]();
    this.nParticles = 200;
    this.boundingSphere = new _glglGlgl.Sphere(new _glglGlgl.Vec3(0, 0, 0), 3);
    this.ctx.camera.position.z = 7;
    this.initParticles();
    this.movingForce = new _glglGlgl.Vec3();
    this.changeMovingParticle();

    this.ctx.ambientLight.color.hex = 0xcccccc;

    this.ctx.directionalLight.ambient.hex = 0x555555;
    this.ctx.directionalLight.specular.hex = 0x555555;
    this.ctx.directionalLight.diffuse.hex = 0x555555;

    this.ctx.defaultMaterial.ambient.hex = 0x888888;
    this.ctx.defaultMaterial.specular.hex = 0x555555;

    var pointLight = new _glglGlgl.PointLight();
    pointLight.diffuse.hex = 0x888888;
    pointLight.specular.copy(pointLight.diffuse).scale(0.4);
    pointLight.ambient.copy(pointLight.diffuse).scale(0.4);
    this.ctx.scene.add(pointLight);

    this.ctx.start(this.update.bind(this));
  }

  _createClass(Main, [{
    key: "initParticles",
    value: function initParticles() {
      this.particles = [];
      var geometry = new _glglGlgl.SphereGeometry(18, 18);
      for (var i = 0; i < this.nParticles; i++) {
        var mesh = this.ctx.create(geometry);
        var particle = new Particle(mesh, 0.05 + Math.pow(1 - i / this.nParticles, 5) * 1, Math.random() * this.boundingSphere.radius, Math.random() * this.boundingSphere.radius, Math.random() * this.boundingSphere.radius);
        this.particles[i] = particle;
      }
    }
  }, {
    key: "resetParticles",
    value: function resetParticles() {
      for (var i = 0; i < this.nParticles; i++) {
        this.particles[i].force.set(0, 0);
      }
    }
  }, {
    key: "separateParticles",
    value: function separateParticles() {
      var diff = new _glglGlgl.Vec3();
      for (var i = 0; i < this.nParticles; i++) {
        var p0 = this.particles[i];
        for (var j = i + 1; j < this.nParticles; j++) {
          var p1 = this.particles[j];
          diff.copy(p1.pos).sub(p0.pos);
          var minDist = p0.radius + p1.radius;
          var d2 = diff.squaredLength;
          if (d2 < minDist * minDist) {
            var dist = Math.sqrt(d2);
            var separation = diff.scale(0.5 * (minDist - dist) / dist);
            p0.force.sub(separation);
            p1.force.add(separation);
          }
        }
      }
    }
  }, {
    key: "constraintFrame",
    value: function constraintFrame() {
      for (var i = 0; i < this.nParticles; i++) {
        var p = this.particles[i];
        if (p.pos.length > this.boundingSphere.radius) {
          p.pos.length = this.boundingSphere.radius;
        }
      }
    }
  }, {
    key: "applyFriction",
    value: function applyFriction() {
      var temp = new _glglGlgl.Vec3();
      for (var i = 0; i < this.nParticles; i++) {
        var p = this.particles[i];
        temp.copy(p.pos).sub(p.oPos).scale(0.9);
        p.pos.copy(p.oPos).add(temp);
      }
    }
  }, {
    key: "updateParticles",
    value: function updateParticles() {
      var dt = 0.1;
      for (var i = 0; i < this.nParticles; i++) {
        var p = this.particles[i].update(dt);
      }
    }
  }, {
    key: "changeMovingParticle",
    value: function changeMovingParticle() {
      this.movingParticle = this.particles[Math.floor(Math.pow(Math.random(), 3) * this.nParticles)];
      this.movingForce.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).scale(3);
    }
  }, {
    key: "updateMovingParticle",
    value: function updateMovingParticle() {
      this.movingParticle.force.add(this.movingForce);
    }
  }, {
    key: "update",
    value: function update(dt) {
      this.resetParticles();
      this.updateMovingParticle();
      for (var i = 0; i < 5; i++) {
        this.separateParticles();
      }
      this.applyFriction();
      this.constraintFrame();
      this.updateParticles();
      if (Math.random() < 0.03) this.changeMovingParticle();
    }
  }]);

  return Main;
})();

new Main();

},{"../glgl/bundles/Giggle":1,"../glgl/glgl":23}]},{},[89]);
