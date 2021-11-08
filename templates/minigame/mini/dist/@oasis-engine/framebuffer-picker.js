(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('oasis-engine')) :
  typeof define === 'function' && define.amd ? define(['exports', 'oasis-engine'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@oasisEngine/framebufferPicker"] = {}, global.oasisEngine));
})(this, (function (exports, oasisEngine) { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  var fs = "#define GLSLIFY 1\n#include <common>\n#include <common_frag>\nuniform vec3 u_colorId;void main(){gl_FragColor=vec4(u_colorId,1.0);}"; // eslint-disable-line

  var vs = "#define GLSLIFY 1\n#include <common>\n#include <common_vert>\n#include <blendShape_input>\nvoid main(){\n#include <begin_position_vert>\n#include <begin_normal_vert>\n#include <blendShape_vert>\n#include <skinning_vert>\n#include <position_vert>\n}"; // eslint-disable-line

  oasisEngine.Shader.create("framebuffer-picker-color", vs, fs);
  /**
   * Color material, render as marker.
   */

  var ColorMaterial = /*#__PURE__*/function (_Material) {
    _inheritsLoose(ColorMaterial, _Material);

    function ColorMaterial(engine) {
      var _this;

      _this = _Material.call(this, engine, oasisEngine.Shader.find("framebuffer-picker-color")) || this;
      _this._currentId = 0;
      _this._primitivesMap = [];
      return _this;
    }
    /**
     * Reset id and renderer element table.
     */


    var _proto = ColorMaterial.prototype;

    _proto.reset = function reset() {
      this._currentId = 0;
      this._primitivesMap = [];
    }
    /**
     * Convert id to RGB color value, 0 and 0xffffff are illegal values.
     */
    ;

    _proto.id2Color = function id2Color(id) {
      if (id >= 0xffffff) {
        oasisEngine.Logger.warn("Framebuffer Picker encounter primitive's id greater than " + 0xffffff);
        return new oasisEngine.Vector3(0, 0, 0);
      }

      var color = new oasisEngine.Vector3((id & 0xff) / 255, ((id & 0xff00) >> 8) / 255, ((id & 0xff0000) >> 16) / 255);
      return color;
    }
    /**
     * Convert RGB color to id.
     * @param color - Color
     */
    ;

    _proto.color2Id = function color2Id(color) {
      return color[0] | color[1] << 8 | color[2] << 16;
    }
    /**
     * Get renderer element by color.
     */
    ;

    _proto.getObjectByColor = function getObjectByColor(color) {
      return this._primitivesMap[this.color2Id(color)];
    }
    /**
     * @override
     */
    ;

    _proto._preRender = function _preRender(renderElement) {
      var component = renderElement.component,
          mesh = renderElement.mesh;
      this._currentId += 1;
      this._primitivesMap[this._currentId] = {
        component: component,
        mesh: mesh
      };
      component.shaderData.setVector3("u_colorId", this.id2Color(this._currentId));
    };

    return ColorMaterial;
  }(oasisEngine.Material);

  /**
   * Color render Pass, used to render marker.
   */

  var ColorRenderPass = /*#__PURE__*/function (_RenderPass) {
    _inheritsLoose(ColorRenderPass, _RenderPass);

    function ColorRenderPass(name, priority, renderTarget, mask, engine) {
      var _this;

      _this = _RenderPass.call(this, name, priority, renderTarget, new ColorMaterial(engine), mask) || this;
      _this._needPick = void 0;
      _this.onPick = void 0;
      _this._pickPos = void 0;
      _this._needPick = false;

      _this.onPick = function (o) {
        return console.log(o);
      };

      return _this;
    }
    /**
     * Determine whether need to render pass, reset state.
     * @override
     */


    var _proto = ColorRenderPass.prototype;

    _proto.preRender = function preRender() {
      if (this._needPick) {
        this.enabled = true;
        this.replaceMaterial.reset();
      } else {
        this.enabled = false;
      }
    }
    /**
     * Determine whether to pick up.
     * @override
     */
    ;

    _proto.postRender = function postRender(camera) {
      if (this._needPick) {
        var color = this.readColorFromRenderTarget(camera);
        var object = this.replaceMaterial.getObjectByColor(color);
        this._needPick = false;
        if (this.onPick) this.onPick(object);
      }
    }
    /**
     * Pick up coordinate pixels.
     */
    ;

    _proto.pick = function pick(x, y) {
      this._pickPos = [x, y];
      this._needPick = true;
    }
    /**
     * Get pixel color value from framebuffer.
     */
    ;

    _proto.readColorFromRenderTarget = function readColorFromRenderTarget(camera) {
      var gl = camera.engine._hardwareRenderer.gl;
      var screenPoint = this._pickPos;
      var canvas = gl.canvas;
      var clientWidth = canvas.clientWidth;
      var clientHeight = canvas.clientHeight;
      var canvasWidth = gl.drawingBufferWidth;
      var canvasHeight = gl.drawingBufferHeight;
      var px = screenPoint[0] / clientWidth * canvasWidth;
      var py = screenPoint[1] / clientHeight * canvasHeight;
      var viewport = camera.viewport;
      var viewWidth = (viewport.z - viewport.x) * canvasWidth;
      var viewHeight = (viewport.w - viewport.y) * canvasHeight;
      var nx = (px - viewport.x) / viewWidth;
      var ny = (py - viewport.y) / viewHeight;
      var left = Math.floor(nx * (this.renderTarget.width - 1));
      var bottom = Math.floor((1 - ny) * (this.renderTarget.height - 1));
      var pixel = new Uint8Array(4);
      this.renderTarget.getColorTexture().getPixelBuffer(null, left, bottom, 1, 1, pixel);
      return pixel;
    };

    return ColorRenderPass;
  }(oasisEngine.RenderPass);

  /**
   * Framebuffer picker.
   * @remarks Can pick up renderer at pixel level.
   */

  var FramebufferPicker = /*#__PURE__*/function (_Script) {
    _inheritsLoose(FramebufferPicker, _Script);

    function FramebufferPicker(entity) {
      var _this;

      _this = _Script.call(this, entity) || this;
      _this.colorRenderTarget = void 0;
      _this.colorRenderPass = void 0;
      _this._camera = void 0;
      _this._needPick = void 0;
      _this._pickPos = void 0;
      var width = 1024;
      var height = 1024;
      _this.colorRenderTarget = new oasisEngine.RenderTarget(_this.engine, width, height, new oasisEngine.RenderColorTexture(_this.engine, width, height));
      _this.colorRenderPass = new ColorRenderPass("ColorRenderTarget_FBP", -1, _this.colorRenderTarget, 0, _this.engine);
      return _this;
    }
    /**
     * Set the callback function after pick up.
     * @param {Function} fun Callback function. if there is an renderer selected, the parameter 1 is {component, primitive }, otherwise it is undefined
     */


    var _proto = FramebufferPicker.prototype;

    /**
     * Pick the object at the screen coordinate position.
     * @param offsetX Relative X coordinate of the canvas
     * @param offsetY Relative Y coordinate of the canvas
     */
    _proto.pick = function pick(offsetX, offsetY) {
      if (this.enabled) {
        this._needPick = true;
        this._pickPos = [offsetX, offsetY];
      }
    };

    _proto.onUpdate = function onUpdate(deltaTime) {
      _Script.prototype.onUpdate.call(this, deltaTime);

      if (this.enabled && this._needPick) {
        this.colorRenderPass.pick(this._pickPos[0], this._pickPos[1]);
        this._needPick = false;
      }
    };

    _proto.onDestroy = function onDestroy() {
      if (!this.camera.destroyed) {
        //@ts-ignore
        this.camera._renderPipeline.removeRenderPass(this.colorRenderPass);
      }
    };

    _createClass(FramebufferPicker, [{
      key: "camera",
      get:
      /**
       * Camera.
       */
      function get() {
        return this._camera;
      },
      set: function set(value) {
        if (this._camera !== value) {
          this._camera = value; //@ts-ignore

          this.camera._renderPipeline.addRenderPass(this.colorRenderPass);
        }
      }
    }, {
      key: "onPick",
      set: function set(fun) {
        if (typeof fun === "function") {
          this.colorRenderPass.onPick = fun;
        }
      }
    }]);

    return FramebufferPicker;
  }(oasisEngine.Script);

  exports.FramebufferPicker = FramebufferPicker;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
