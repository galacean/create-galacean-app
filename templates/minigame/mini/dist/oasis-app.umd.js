(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("oasis-engine")) : typeof define === "function" && define.amd ? define(["oasis-engine"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.oasisEngine));
})(this, function(oasisEngine) {
  "use strict";
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  var ESP$1 = oasisEngine.MathUtil.zeroTolerance;
  var Spherical = /* @__PURE__ */ function() {
    function Spherical2(radius, phi, theta) {
      this.radius = void 0;
      this.phi = void 0;
      this.theta = void 0;
      this.radius = radius !== void 0 ? radius : 1;
      this.phi = phi !== void 0 ? phi : 0;
      this.theta = theta !== void 0 ? theta : 0;
    }
    var _proto = Spherical2.prototype;
    _proto.set = function set(radius, phi, theta) {
      this.radius = radius;
      this.phi = phi;
      this.theta = theta;
      return this;
    };
    _proto.makeSafe = function makeSafe() {
      this.phi = oasisEngine.MathUtil.clamp(this.phi, ESP$1, Math.PI - ESP$1);
      return this;
    };
    _proto.setFromVec3 = function setFromVec3(v3) {
      this.radius = v3.length();
      if (this.radius === 0) {
        this.theta = 0;
        this.phi = 0;
      } else {
        this.theta = Math.atan2(v3.x, v3.z);
        this.phi = Math.acos(oasisEngine.MathUtil.clamp(v3.y / this.radius, -1, 1));
      }
      return this;
    };
    _proto.setToVec3 = function setToVec3(v3) {
      var sinPhiRadius = Math.sin(this.phi) * this.radius;
      v3.x = sinPhiRadius * Math.sin(this.theta);
      v3.y = Math.cos(this.phi) * this.radius;
      v3.z = sinPhiRadius * Math.cos(this.theta);
      return this;
    };
    return Spherical2;
  }();
  oasisEngine.MathUtil.zeroTolerance;
  var OrbitControl = /* @__PURE__ */ function(_Script) {
    _inheritsLoose(OrbitControl2, _Script);
    function OrbitControl2(entity) {
      var _this;
      _this = _Script.call(this, entity) || this;
      _this.camera = void 0;
      _this.domElement = void 0;
      _this.mainElement = void 0;
      _this.fov = void 0;
      _this.target = void 0;
      _this.up = void 0;
      _this.minDistance = void 0;
      _this.maxDistance = void 0;
      _this.minZoom = void 0;
      _this.maxZoom = void 0;
      _this.enableDamping = void 0;
      _this.zoomFactor = void 0;
      _this.enableRotate = void 0;
      _this.keyPanSpeed = void 0;
      _this.minPolarAngle = void 0;
      _this.maxPolarAngle = void 0;
      _this.minAzimuthAngle = void 0;
      _this.maxAzimuthAngle = void 0;
      _this.enableZoom = void 0;
      _this.dampingFactor = void 0;
      _this.zoomSpeed = void 0;
      _this.enablePan = void 0;
      _this.autoRotate = void 0;
      _this.autoRotateSpeed = Math.PI;
      _this.rotateSpeed = void 0;
      _this.enableKeys = void 0;
      _this.keys = void 0;
      _this.mouseButtons = void 0;
      _this.touchFingers = void 0;
      _this.STATE = void 0;
      _this.mouseUpEvents = void 0;
      _this.constEvents = void 0;
      _this._position = void 0;
      _this._offset = void 0;
      _this._spherical = void 0;
      _this._sphericalDelta = void 0;
      _this._sphericalDump = void 0;
      _this._zoomFrag = void 0;
      _this._scale = void 0;
      _this._panOffset = void 0;
      _this._isMouseUp = void 0;
      _this._vPan = void 0;
      _this._state = void 0;
      _this._rotateStart = void 0;
      _this._rotateEnd = void 0;
      _this._rotateDelta = void 0;
      _this._panStart = void 0;
      _this._panEnd = void 0;
      _this._panDelta = void 0;
      _this._zoomStart = void 0;
      _this._zoomEnd = void 0;
      _this._zoomDelta = void 0;
      _this.camera = entity;
      _this.mainElement = _this.engine.canvas._webCanvas;
      _this.domElement = document;
      _this.fov = 45;
      _this.target = new oasisEngine.Vector3();
      _this.up = new oasisEngine.Vector3(0, 1, 0);
      _this.minDistance = 0.1;
      _this.maxDistance = Infinity;
      _this.minZoom = 0;
      _this.maxZoom = Infinity;
      _this.minPolarAngle = 0;
      _this.maxPolarAngle = Math.PI;
      _this.minAzimuthAngle = -Infinity;
      _this.maxAzimuthAngle = Infinity;
      _this.enableDamping = true;
      _this.dampingFactor = 0.1;
      _this.zoomFactor = 0.2;
      _this.enableZoom = true;
      _this.zoomSpeed = 1;
      _this.enableRotate = true;
      _this.rotateSpeed = 1;
      _this.enablePan = true;
      _this.keyPanSpeed = 7;
      _this.autoRotate = false;
      _this.enableKeys = false;
      _this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
      };
      _this.mouseButtons = {
        ORBIT: 0,
        ZOOM: 1,
        PAN: 2
      };
      _this.touchFingers = {
        ORBIT: 1,
        ZOOM: 2,
        PAN: 3
      };
      _this._position = new oasisEngine.Vector3();
      _this._offset = new oasisEngine.Vector3();
      _this._spherical = new Spherical();
      _this._sphericalDelta = new Spherical();
      _this._sphericalDump = new Spherical();
      _this._zoomFrag = 0;
      _this._scale = 1;
      _this._panOffset = new oasisEngine.Vector3();
      _this._isMouseUp = true;
      _this._vPan = new oasisEngine.Vector3();
      _this._rotateStart = new oasisEngine.Vector2();
      _this._rotateEnd = new oasisEngine.Vector2();
      _this._rotateDelta = new oasisEngine.Vector2();
      _this._panStart = new oasisEngine.Vector2();
      _this._panEnd = new oasisEngine.Vector2();
      _this._panDelta = new oasisEngine.Vector2();
      _this._zoomStart = new oasisEngine.Vector2();
      _this._zoomEnd = new oasisEngine.Vector2();
      _this._zoomDelta = new oasisEngine.Vector2();
      _this.STATE = {
        NONE: -1,
        ROTATE: 0,
        ZOOM: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_ZOOM: 4,
        TOUCH_PAN: 5
      };
      _this._state = _this.STATE.NONE;
      _this.constEvents = [{
        type: "mousedown",
        listener: _this.onMouseDown.bind(_assertThisInitialized(_this))
      }, {
        type: "wheel",
        listener: _this.onMouseWheel.bind(_assertThisInitialized(_this))
      }, {
        type: "keydown",
        listener: _this.onKeyDown.bind(_assertThisInitialized(_this)),
        element: window
      }, {
        type: "touchstart",
        listener: _this.onTouchStart.bind(_assertThisInitialized(_this))
      }, {
        type: "touchmove",
        listener: _this.onTouchMove.bind(_assertThisInitialized(_this))
      }, {
        type: "touchend",
        listener: _this.onTouchEnd.bind(_assertThisInitialized(_this))
      }, {
        type: "contextmenu",
        listener: _this.onContextMenu.bind(_assertThisInitialized(_this))
      }];
      _this.mouseUpEvents = [{
        type: "mousemove",
        listener: _this.onMouseMove.bind(_assertThisInitialized(_this))
      }, {
        type: "mouseup",
        listener: _this.onMouseUp.bind(_assertThisInitialized(_this))
      }];
      _this.constEvents.forEach(function(ele) {
        if (ele.element) {
          ele.element.addEventListener(ele.type, ele.listener, false);
        } else {
          _this.mainElement.addEventListener(ele.type, ele.listener, false);
        }
      });
      return _this;
    }
    var _proto = OrbitControl2.prototype;
    _proto.onDisable = function onDisable() {
      var element = this.domElement === document ? this.domElement.body : this.domElement;
      this.mainElement.removeEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
      element.removeEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
    };
    _proto.onDestroy = function onDestroy() {
      var _this2 = this;
      this.constEvents.forEach(function(ele) {
        if (ele.element) {
          ele.element.removeEventListener(ele.type, ele.listener, false);
        } else {
          _this2.mainElement.removeEventListener(ele.type, ele.listener, false);
        }
      });
      var element = this.domElement === document ? this.domElement.body : this.domElement;
      this.mainElement.removeEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
      element.removeEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
    };
    _proto.onUpdate = function onUpdate(dtime) {
      if (!this.enabled)
        return;
      var position = this.camera.transform.position;
      position.cloneTo(this._offset);
      this._offset.subtract(this.target);
      this._spherical.setFromVec3(this._offset);
      if (this.autoRotate && this._state === this.STATE.NONE) {
        this.rotateLeft(this.getAutoRotationAngle(dtime));
      }
      this._spherical.theta += this._sphericalDelta.theta;
      this._spherical.phi += this._sphericalDelta.phi;
      this._spherical.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this._spherical.theta));
      this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
      this._spherical.makeSafe();
      if (this._scale !== 1) {
        this._zoomFrag = this._spherical.radius * (this._scale - 1);
      }
      this._spherical.radius += this._zoomFrag;
      this._spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this._spherical.radius));
      this.target.add(this._panOffset);
      this._spherical.setToVec3(this._offset);
      this.target.cloneTo(this._position);
      this._position.add(this._offset);
      this.camera.transform.position = this._position;
      this.camera.transform.lookAt(this.target, this.up);
      if (this.enableDamping === true) {
        this._sphericalDump.theta *= 1 - this.dampingFactor;
        this._sphericalDump.phi *= 1 - this.dampingFactor;
        this._zoomFrag *= 1 - this.zoomFactor;
        if (this._isMouseUp) {
          this._sphericalDelta.theta = this._sphericalDump.theta;
          this._sphericalDelta.phi = this._sphericalDump.phi;
        } else {
          this._sphericalDelta.set(0, 0, 0);
        }
      } else {
        this._sphericalDelta.set(0, 0, 0);
        this._zoomFrag = 0;
      }
      this._scale = 1;
      this._panOffset.setValue(0, 0, 0);
    };
    _proto.getAutoRotationAngle = function getAutoRotationAngle(dtime) {
      return this.autoRotateSpeed / 1e3 * dtime;
    };
    _proto.getZoomScale = function getZoomScale() {
      return Math.pow(0.95, this.zoomSpeed);
    };
    _proto.rotateLeft = function rotateLeft(radian) {
      this._sphericalDelta.theta -= radian;
      if (this.enableDamping) {
        this._sphericalDump.theta = -radian;
      }
    };
    _proto.rotateUp = function rotateUp(radian) {
      this._sphericalDelta.phi -= radian;
      if (this.enableDamping) {
        this._sphericalDump.phi = -radian;
      }
    };
    _proto.panLeft = function panLeft(distance, worldMatrix) {
      var e = worldMatrix.elements;
      this._vPan.setValue(e[0], e[1], e[2]);
      this._vPan.scale(distance);
      this._panOffset.add(this._vPan);
    };
    _proto.panUp = function panUp(distance, worldMatrix) {
      var e = worldMatrix.elements;
      this._vPan.setValue(e[4], e[5], e[6]);
      this._vPan.scale(distance);
      this._panOffset.add(this._vPan);
    };
    _proto.pan = function pan(deltaX, deltaY) {
      var element = this.domElement === document ? this.domElement.body : this.domElement;
      var position = this.camera.position;
      position.cloneTo(this._vPan);
      this._vPan.subtract(this.target);
      var targetDistance = this._vPan.length();
      targetDistance *= this.fov / 2 * (Math.PI / 180);
      this.panLeft(-2 * deltaX * (targetDistance / element.clientHeight), this.camera.transform.worldMatrix);
      this.panUp(2 * deltaY * (targetDistance / element.clientHeight), this.camera.transform.worldMatrix);
    };
    _proto.zoomIn = function zoomIn(zoomScale) {
      this._scale *= zoomScale;
    };
    _proto.zoomOut = function zoomOut(zoomScale) {
      this._scale /= zoomScale;
    };
    _proto.handleMouseDownRotate = function handleMouseDownRotate(event) {
      this._rotateStart.setValue(event.clientX, event.clientY);
    };
    _proto.handleMouseDownZoom = function handleMouseDownZoom(event) {
      this._zoomStart.setValue(event.clientX, event.clientY);
    };
    _proto.handleMouseDownPan = function handleMouseDownPan(event) {
      this._panStart.setValue(event.clientX, event.clientY);
    };
    _proto.handleMouseMoveRotate = function handleMouseMoveRotate(event) {
      this._rotateEnd.setValue(event.clientX, event.clientY);
      oasisEngine.Vector2.subtract(this._rotateEnd, this._rotateStart, this._rotateDelta);
      var element = this.domElement === document ? document.body : this.domElement;
      this.rotateLeft(2 * Math.PI * (this._rotateDelta.x / element.clientWidth) * this.rotateSpeed);
      this.rotateUp(2 * Math.PI * (this._rotateDelta.y / element.clientHeight) * this.rotateSpeed);
      this._rotateEnd.cloneTo(this._rotateStart);
    };
    _proto.handleMouseMoveZoom = function handleMouseMoveZoom(event) {
      this._zoomEnd.setValue(event.clientX, event.clientY);
      oasisEngine.Vector2.subtract(this._zoomEnd, this._zoomStart, this._zoomDelta);
      if (this._zoomDelta.y > 0) {
        this.zoomOut(this.getZoomScale());
      } else if (this._zoomDelta.y < 0) {
        this.zoomIn(this.getZoomScale());
      }
      this._zoomEnd.cloneTo(this._zoomStart);
    };
    _proto.handleMouseMovePan = function handleMouseMovePan(event) {
      this._panEnd.setValue(event.clientX, event.clientY);
      oasisEngine.Vector2.subtract(this._panEnd, this._panStart, this._panDelta);
      this.pan(this._panDelta.x, this._panDelta.y);
      this._panEnd.cloneTo(this._panStart);
    };
    _proto.handleMouseWheel = function handleMouseWheel(event) {
      if (event.deltaY < 0) {
        this.zoomIn(this.getZoomScale());
      } else if (event.deltaY > 0) {
        this.zoomOut(this.getZoomScale());
      }
    };
    _proto.handleKeyDown = function handleKeyDown(event) {
      switch (event.keyCode) {
        case this.keys.UP:
          this.pan(0, this.keyPanSpeed);
          break;
        case this.keys.BOTTOM:
          this.pan(0, -this.keyPanSpeed);
          break;
        case this.keys.LEFT:
          this.pan(this.keyPanSpeed, 0);
          break;
        case this.keys.RIGHT:
          this.pan(-this.keyPanSpeed, 0);
          break;
      }
    };
    _proto.handleTouchStartRotate = function handleTouchStartRotate(event) {
      this._rotateStart.setValue(event.touches[0].pageX, event.touches[0].pageY);
    };
    _proto.handleTouchStartZoom = function handleTouchStartZoom(event) {
      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      this._zoomStart.setValue(0, distance);
    };
    _proto.handleTouchStartPan = function handleTouchStartPan(event) {
      this._panStart.setValue(event.touches[0].pageX, event.touches[0].pageY);
    };
    _proto.handleTouchMoveRotate = function handleTouchMoveRotate(event) {
      this._rotateEnd.setValue(event.touches[0].pageX, event.touches[0].pageY);
      oasisEngine.Vector2.subtract(this._rotateEnd, this._rotateStart, this._rotateDelta);
      var element = this.domElement === document ? this.domElement.body : this.domElement;
      this.rotateLeft(2 * Math.PI * this._rotateDelta.x / element.clientWidth * this.rotateSpeed);
      this.rotateUp(2 * Math.PI * this._rotateDelta.y / element.clientHeight * this.rotateSpeed);
      this._rotateEnd.cloneTo(this._rotateStart);
    };
    _proto.handleTouchMoveZoom = function handleTouchMoveZoom(event) {
      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      this._zoomEnd.setValue(0, distance);
      oasisEngine.Vector2.subtract(this._zoomEnd, this._zoomStart, this._zoomDelta);
      if (this._zoomDelta.y > 0) {
        this.zoomIn(this.getZoomScale());
      } else if (this._zoomDelta.y < 0) {
        this.zoomOut(this.getZoomScale());
      }
      this._zoomEnd.cloneTo(this._zoomStart);
    };
    _proto.handleTouchMovePan = function handleTouchMovePan(event) {
      this._panEnd.setValue(event.touches[0].pageX, event.touches[0].pageY);
      oasisEngine.Vector2.subtract(this._panEnd, this._panStart, this._panDelta);
      this.pan(this._panDelta.x, this._panDelta.y);
      this._panEnd.cloneTo(this._panStart);
    };
    _proto.onMouseDown = function onMouseDown(event) {
      if (this.enabled === false)
        return;
      event.preventDefault();
      this._isMouseUp = false;
      switch (event.button) {
        case this.mouseButtons.ORBIT:
          if (this.enableRotate === false)
            return;
          this.handleMouseDownRotate(event);
          this._state = this.STATE.ROTATE;
          break;
        case this.mouseButtons.ZOOM:
          if (this.enableZoom === false)
            return;
          this.handleMouseDownZoom(event);
          this._state = this.STATE.ZOOM;
          break;
        case this.mouseButtons.PAN:
          if (this.enablePan === false)
            return;
          this.handleMouseDownPan(event);
          this._state = this.STATE.PAN;
          break;
      }
      if (this._state !== this.STATE.NONE) {
        var element = this.domElement === document ? this.domElement.body : this.domElement;
        this.mainElement.addEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
        element.addEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
      }
    };
    _proto.onMouseMove = function onMouseMove(event) {
      if (this.enabled === false)
        return;
      event.preventDefault();
      switch (this._state) {
        case this.STATE.ROTATE:
          if (this.enableRotate === false)
            return;
          this.handleMouseMoveRotate(event);
          break;
        case this.STATE.ZOOM:
          if (this.enableZoom === false)
            return;
          this.handleMouseMoveZoom(event);
          break;
        case this.STATE.PAN:
          if (this.enablePan === false)
            return;
          this.handleMouseMovePan(event);
          break;
      }
    };
    _proto.onMouseUp = function onMouseUp() {
      var _this3 = this;
      if (this.enabled === false)
        return;
      this._isMouseUp = true;
      this.mouseUpEvents.forEach(function(ele) {
        var element = _this3.domElement === document ? _this3.domElement.body : _this3.domElement;
        element.removeEventListener(ele.type, ele.listener, false);
        _this3.mainElement.removeEventListener(ele.type, ele.listener, false);
      });
      this._state = this.STATE.NONE;
    };
    _proto.onMouseWheel = function onMouseWheel(event) {
      if (this.enabled === false || this.enableZoom === false || this._state !== this.STATE.NONE && this._state !== this.STATE.ROTATE)
        return;
      event.preventDefault();
      event.stopPropagation();
      this.handleMouseWheel(event);
    };
    _proto.onKeyDown = function onKeyDown(event) {
      if (this.enabled === false || this.enableKeys === false || this.enablePan === false)
        return;
      this.handleKeyDown(event);
    };
    _proto.onTouchStart = function onTouchStart(event) {
      if (this.enabled === false)
        return;
      this._isMouseUp = false;
      switch (event.touches.length) {
        case this.touchFingers.ORBIT:
          if (this.enableRotate === false)
            return;
          this.handleTouchStartRotate(event);
          this._state = this.STATE.TOUCH_ROTATE;
          break;
        case this.touchFingers.ZOOM:
          if (this.enableZoom === false)
            return;
          this.handleTouchStartZoom(event);
          this._state = this.STATE.TOUCH_ZOOM;
          break;
        case this.touchFingers.PAN:
          if (this.enablePan === false)
            return;
          this.handleTouchStartPan(event);
          this._state = this.STATE.TOUCH_PAN;
          break;
        default:
          this._state = this.STATE.NONE;
      }
    };
    _proto.onTouchMove = function onTouchMove(event) {
      if (this.enabled === false)
        return;
      event.preventDefault();
      event.stopPropagation();
      switch (event.touches.length) {
        case this.touchFingers.ORBIT:
          if (this.enableRotate === false)
            return;
          if (this._state !== this.STATE.TOUCH_ROTATE)
            return;
          this.handleTouchMoveRotate(event);
          break;
        case this.touchFingers.ZOOM:
          if (this.enableZoom === false)
            return;
          if (this._state !== this.STATE.TOUCH_ZOOM)
            return;
          this.handleTouchMoveZoom(event);
          break;
        case this.touchFingers.PAN:
          if (this.enablePan === false)
            return;
          if (this._state !== this.STATE.TOUCH_PAN)
            return;
          this.handleTouchMovePan(event);
          break;
        default:
          this._state = this.STATE.NONE;
      }
    };
    _proto.onTouchEnd = function onTouchEnd() {
      if (this.enabled === false)
        return;
      this._isMouseUp = true;
      this._state = this.STATE.NONE;
    };
    _proto.onContextMenu = function onContextMenu(event) {
      if (this.enabled === false)
        return;
      event.preventDefault();
    };
    return OrbitControl2;
  }(oasisEngine.Script);
  init();
  function init() {
    const engine = new oasisEngine.WebGLEngine("canvas");
    engine.canvas.resizeByClientSize();
    const scene = engine.sceneManager.activeScene;
    const rootEntity = scene.createRootEntity();
    scene.ambientLight.diffuseSolidColor = new oasisEngine.Color(0.6, 0.6, 0.6);
    const cameraEntity = rootEntity.createChild("Camera");
    cameraEntity.transform.setPosition(0, 0, 20);
    cameraEntity.addComponent(oasisEngine.Camera);
    cameraEntity.addComponent(OrbitControl);
    const lightEntity = rootEntity.createChild("DirectLight");
    const light = lightEntity.addComponent(oasisEngine.DirectLight);
    light.intensity = 0.6;
    engine.resourceManager.load({
      url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*ArCHTbfVPXUAAAAAAAAAAAAAARQnAQ",
      type: oasisEngine.AssetType.Texture2D
    }).then((texture) => {
      const distanceX = 2.5;
      const distanceY = 2.5;
      const position = new oasisEngine.Vector3();
      const material = new oasisEngine.BlinnPhongMaterial(engine);
      material.renderFace = oasisEngine.RenderFace.Double;
      material.baseTexture = texture;
      for (let i = 0; i < 3; i++) {
        const posX = (i - 1) * distanceX;
        position.setValue(posX, distanceY * 2.5, 0);
        generatePrimitiveEntity(rootEntity, "cuboid", position, material, oasisEngine.PrimitiveMesh.createCuboid(engine));
        position.setValue(posX, distanceY * 1.5, 0);
        generatePrimitiveEntity(rootEntity, "sphere", position, material, oasisEngine.PrimitiveMesh.createSphere(engine));
        position.setValue(posX, distanceY * 0.5, 0);
        generatePrimitiveEntity(rootEntity, "plane", position, material, oasisEngine.PrimitiveMesh.createPlane(engine));
        position.setValue(posX, -distanceY * 0.5, 0);
        generatePrimitiveEntity(rootEntity, "cylinder", position, material, oasisEngine.PrimitiveMesh.createCylinder(engine));
        position.setValue(posX, -distanceY * 1.5, 0);
        generatePrimitiveEntity(rootEntity, "cone", position, material, oasisEngine.PrimitiveMesh.createCone(engine));
        position.setValue(posX, -distanceY * 2.5, 0);
        generatePrimitiveEntity(rootEntity, "torus", position, material, oasisEngine.PrimitiveMesh.createTorus(engine));
      }
    });
    engine.run();
  }
  function generatePrimitiveEntity(rootEntity, name, position, material, mesh) {
    const entity = rootEntity.createChild(name);
    entity.transform.setPosition(position.x, position.y, position.z);
    entity.addComponent(RotateScript);
    const renderer = entity.addComponent(oasisEngine.MeshRenderer);
    renderer.mesh = mesh;
    renderer.setMaterial(material);
    return entity;
  }
  class RotateScript extends oasisEngine.Script {
    onUpdate(deltaTime) {
      this.entity.transform.rotate(0.5, 0.6, 0);
    }
  }
});
