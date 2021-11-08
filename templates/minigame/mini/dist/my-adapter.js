(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      factory((global.__MiniAdapter__ = {})));
})(this, function (exports) {
  "use strict";

  var chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  function InvalidCharacterError(message) {
    this.message = message;
  }

  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype.name = "InvalidCharacterError";
  function atob(input) {
    var str = String(input).replace(/=+$/, "");

    if (str.length % 4 === 1) {
      throw new InvalidCharacterError(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }

    var output = "";

    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0; // get next character
      (buffer = str.charAt(idx++)); // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer), // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
  function btoa(string) {
    string = String(string);
    var bitmap,
      a,
      b,
      c,
      result = "",
      i = 0,
      rest = string.length % 3; // To determine the final padding

    for (; i < string.length; ) {
      if (
        (a = string.charCodeAt(i++)) > 255 ||
        (b = string.charCodeAt(i++)) > 255 ||
        (c = string.charCodeAt(i++)) > 255
      )
        throw new TypeError(
          "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
        );
      bitmap = (a << 16) | (b << 8) | c;
      result +=
        chars.charAt((bitmap >> 18) & 63) +
        chars.charAt((bitmap >> 12) & 63) +
        chars.charAt((bitmap >> 6) & 63) +
        chars.charAt(bitmap & 63);
    } // If there's need of padding, replace the last 'A's with equal signs

    return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
  }

  var _my$getSystemInfoSync$2 = my.getSystemInfoSync(),
    devicePixelRatio = _my$getSystemInfoSync$2.pixelRatio;

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
    _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }

    return self;
  }

  var _my$getSystemInfoSync$1 = my.getSystemInfoSync(),
    screenWidth = _my$getSystemInfoSync$1.screenWidth,
    screenHeight = _my$getSystemInfoSync$1.screenHeight,
    windowWidth = _my$getSystemInfoSync$1.windowWidth,
    windowHeight = _my$getSystemInfoSync$1.windowHeight;

  var screen = {
    width: screenWidth,
    height: screenHeight,
    availWidth: windowWidth,
    availHeight: windowHeight,
    availLeft: 0,
    availTop: 0,
  };

  var innerWidth = screen.availWidth,
    innerHeight = screen.availHeight;
  function parentNode(obj, level) {
    if (!("parentNode" in obj)) {
      var _parent;

      if (level === 0) {
        _parent = function _parent() {
          // return document
          return null;
        };
      } else if (level === 1) {
        _parent = function _parent() {
          return document.documentElement;
        };
      } else {
        _parent = function _parent() {
          return document.body;
        };
      }

      Object.defineProperty(obj, "parentNode", {
        enumerable: true,
        get: _parent,
      });
    }

    if (!("parentElement" in obj)) {
      var _parent2;

      if (level === 0) {
        _parent2 = function _parent2() {
          return null;
        };
      } else if (level === 1) {
        _parent2 = function _parent2() {
          return document.documentElement;
        };
      } else {
        _parent2 = function _parent2() {
          return document.body;
        };
      }

      Object.defineProperty(obj, "parentElement", {
        enumerable: true,
        get: _parent2,
      });
    }
  }
  function style(obj) {
    obj.style = obj.style || {};
    Object.assign(obj.style, {
      top: "0px",
      left: "0px",
      width: innerWidth + "px",
      height: innerHeight + "px",
      margin: "0px",
      padding: "0px",
    });
  }
  function clientRegion(obj) {
    if (!("clientLeft" in obj)) {
      obj.clientLeft = 0;
      obj.clientTop = 0;
    }

    if (!("clientWidth" in obj)) {
      obj.clientWidth = innerWidth;
      obj.clientHeight = innerHeight;
    }

    if (!("getBoundingClientRect" in obj)) {
      obj.getBoundingClientRect = function () {
        var ret = {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          width: this.clientWidth,
          height: this.clientHeight,
          right: this.clientWidth,
          bottom: this.clientHeight,
        };
        return ret;
      };
    }
  }
  function offsetRegion(obj) {
    if (!("offsetLeft" in obj)) {
      obj.offsetLeft = 0;
      obj.offsetTop = 0;
    }

    if (!("offsetWidth" in obj)) {
      obj.offsetWidth = innerWidth;
      obj.offsetHeight = innerHeight;
    }
  }
  function scrollRegion(obj) {
    if (!("scrollLeft" in obj)) {
      obj.scrollLeft = 0;
      obj.scrollTop = 0;
    }

    if (!("scrollWidth" in obj)) {
      obj.scrollWidth = innerWidth;
      obj.scrollHeight = innerHeight;
    }
  }
  function classList(obj) {
    var noop = function noop() {};

    obj.classList = [];
    obj.classList.add = noop;
    obj.classList.remove = noop;
    obj.classList.contains = noop;
    obj.classList.toggle = noop;
  }

  var _events = new WeakMap();

  var EventTarget = /*#__PURE__*/ (function () {
    function EventTarget() {
      _events.set(this, {});
    }

    var _proto = EventTarget.prototype;

    _proto.addEventListener = function addEventListener(
      type,
      listener,
      options
    ) {
      if (options === void 0) {
        options = {};
      }

      var events = _events.get(this);

      if (!events) {
        events = {};
      }

      if (!events[type]) {
        events[type] = [];
      }

      events[type].push(listener);

      _events.set(this, events);

      if (options.capture);

      if (options.once);

      if (options.passive);
    };

    _proto.removeEventListener = function removeEventListener(
      type,
      listener,
      options
    ) {
      var events = _events.get(this);

      if (events) {
        var listeners = events[type];

        if (listeners && listeners.length > 0) {
          for (var i = listeners.length; i--; i > 0) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              break;
            }
          }
        }
      }
    };

    _proto.dispatchEvent = function dispatchEvent(event) {
      var listeners = _events.get(this)[event.type];

      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](event);
        }
      }
    };

    return EventTarget;
  })();

  var Node = /*#__PURE__*/ (function (_EventTarget) {
    _inheritsLoose(Node, _EventTarget);

    function Node() {
      var _this;

      _this = _EventTarget.call(this) || this;
      _this.childNodes = void 0;
      _this.childNodes = [];
      return _this;
    }

    var _proto = Node.prototype;

    _proto.appendChild = function appendChild(node) {
      this.childNodes.push(node); // if (node instanceof Node) {
      //   this.childNodes.push(node)
      // } else {
      //   throw new TypeError('Failed to executed \'appendChild\' on \'Node\': parameter 1 is not of type \'Node\'.')
      // }
    };

    _proto.cloneNode = function cloneNode() {
      var copyNode = Object.create(this);
      Object.assign(copyNode, this);
      return copyNode;
    };

    _proto.removeChild = function removeChild(node) {
      var index = this.childNodes.findIndex(function (child) {
        return child === node;
      });

      if (index > -1) {
        return this.childNodes.splice(index, 1);
      }

      return null;
    };

    return Node;
  })(EventTarget);

  var Element = /*#__PURE__*/ (function (_Node) {
    _inheritsLoose(Element, _Node);

    function Element() {
      var _this;

      _this = _Node.call(this) || this;
      _this.className = void 0;
      _this.children = void 0;
      _this.className = "";
      _this.children = [];
      return _this;
    }

    var _proto = Element.prototype;

    _proto.setAttribute = function setAttribute(name, value) {
      this[name] = value;
    };

    _proto.getAttribute = function getAttribute(name) {
      return this[name];
    };

    _proto.setAttributeNS = function setAttributeNS(name, value) {
      this[name] = value;
    };

    _proto.getAttributeNS = function getAttributeNS(name) {
      return this[name];
    };

    return Element;
  })(Node);

  function noop() {}

  var HTMLElement = /*#__PURE__*/ (function (_Element) {
    _inheritsLoose(HTMLElement, _Element);

    function HTMLElement(tagName, level) {
      var _this;

      if (tagName === void 0) {
        tagName = "";
      }

      _this = _Element.call(this) || this;
      _this.className = void 0;
      _this.children = void 0;
      _this.focus = void 0;
      _this.blur = void 0;
      _this.insertBefore = void 0;
      _this.appendChild = void 0;
      _this.removeChild = void 0;
      _this.remove = void 0;
      _this.innerHTML = void 0;
      _this.tagName = void 0;
      _this.className = "";
      _this.children = [];
      _this.focus = noop;
      _this.blur = noop;
      _this.insertBefore = noop;
      _this.appendChild = noop;
      _this.removeChild = noop;
      _this.remove = noop;
      _this.innerHTML = "";
      _this.tagName = tagName.toUpperCase();
      parentNode(_assertThisInitialized(_this), level);
      style(_assertThisInitialized(_this));
      classList(_assertThisInitialized(_this));
      clientRegion(_assertThisInitialized(_this));
      offsetRegion(_assertThisInitialized(_this));
      scrollRegion(_assertThisInitialized(_this));
      return _this;
    }

    return HTMLElement;
  })(Element);

  var HTMLMediaElement = /*#__PURE__*/ (function (_HTMLElement) {
    _inheritsLoose(HTMLMediaElement, _HTMLElement);

    function HTMLMediaElement(tagName) {
      return _HTMLElement.call(this, tagName) || this;
    }

    var _proto = HTMLMediaElement.prototype;

    _proto.addTextTrack = function addTextTrack() {};

    _proto.captureStream = function captureStream() {};

    _proto.fastSeek = function fastSeek() {};

    _proto.load = function load() {};

    _proto.pause = function pause() {};

    _proto.play = function play() {};

    return HTMLMediaElement;
  })(HTMLElement);

  var HTMLVideoElement = /*#__PURE__*/ (function (_HTMLMediaElement) {
    _inheritsLoose(HTMLVideoElement, _HTMLMediaElement);

    function HTMLVideoElement() {
      return _HTMLMediaElement.call(this, "video") || this;
    }

    return HTMLVideoElement;
  })(HTMLMediaElement);

  var Event = function Event(type) {
    this.cancelBubble = void 0;
    this.cancelable = void 0;
    this.target = void 0;
    this.currentTarget = void 0;
    this.preventDefault = void 0;
    this.stopPropagation = void 0;
    this.type = void 0;
    this.timeStamp = void 0;
    this.cancelBubble = false;
    this.cancelable = false;
    this.target = null;
    this.currentTarget = null;

    this.preventDefault = function () {};

    this.stopPropagation = function () {};

    this.type = type;
    this.timeStamp = Date.now();
  };

  var TouchEvent = /*#__PURE__*/ (function (_Event) {
    _inheritsLoose(TouchEvent, _Event);

    function TouchEvent(type) {
      var _this;

      _this = _Event.call(this, type) || this;
      _this.touches = void 0;
      _this.targetTouches = void 0;
      _this.changedTouches = void 0;
      _this.touches = [];
      _this.targetTouches = [];
      _this.changedTouches = [];
      _this.target = getCanvas();
      _this.currentTarget = getCanvas();
      return _this;
    }

    return TouchEvent;
  })(Event);

  function mapEvent(event) {
    var _ref = event || {},
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      _ref$clientX = _ref.clientX,
      clientX = _ref$clientX === void 0 ? 0 : _ref$clientX,
      _ref$clientY = _ref.clientY,
      clientY = _ref$clientY === void 0 ? 0 : _ref$clientY; // 小程序不支持Object.hasOwnProperty
    // (抹平不同的view事件)[https://docs.alipay.com/mini/framework/event-object]

    if (Object.keys(event).indexOf("x") !== -1) {
      event.pageX = event.clientX = x;
      event.pageY = event.clientY = y;
    } else {
      event.x = clientX;
      event.y = clientY;
    }
  }

  function eventHandlerFactory$2(type) {
    return function (rawEvent) {
      var event = new TouchEvent(type);
      event.changedTouches = rawEvent.changedTouches || rawEvent.touches;
      event.touches = rawEvent.touches;
      event.targetTouches = Array.prototype.slice.call(rawEvent.touches);
      event.timeStamp = rawEvent.timeStamp;
      event.changedTouches.forEach(function (e) {
        return mapEvent(e);
      });
      event.touches.forEach(function (e) {
        return mapEvent(e);
      });
      event.targetTouches.forEach(function (e) {
        return mapEvent(e);
      });
      document.dispatchEvent(event);
    };
  }

  var dispatchTouchStart = eventHandlerFactory$2("touchstart");
  var dispatchTouchMove = eventHandlerFactory$2("touchmove");
  var dispatchTouchEnd = eventHandlerFactory$2("touchend");
  var dispatchTouchCancel = eventHandlerFactory$2("touchcancel");

  /**同步和异步都需要的数据*/
  var canvas = {};
  var canvas2D = {};
  var _isMiniGame = false;
  /**异步注册3Dcanvas*/

  function registerCanvas(c, id) {
    if (id === void 0) {
      id = "canvas";
    }

    canvas = c;
    canvas.id = id;

    if (!("tagName" in canvas)) {
      canvas.tagName = "CANVAS";
    }

    canvas.type = "canvas";
    parentNode(canvas);
    style(canvas);
    classList(canvas);
    clientRegion(canvas);
    offsetRegion(canvas);
    var originGetContext = canvas.getContext.bind(canvas);

    canvas.getContext = function (type) {
      if (type === "2d") {
        return canvas2D.getContext(type);
      } else {
        return originGetContext(type);
      }
    };

    canvas.focus = function () {};

    canvas.blur = function () {};

    canvas.addEventListener = function (type, listener, options) {
      if (options === void 0) {
        options = {};
      }

      document.addEventListener(type, listener, options);
    };

    canvas.removeEventListener = function (type, listener) {
      document.removeEventListener(type, listener);
    };

    canvas.dispatchEvent = function (event) {
      document.dispatchEvent(event);
    };
  }
  /**异步注册2Dcanvas*/

  function registerCanvas2D(c, id) {
    if (id === void 0) {
      id = "canvas2D";
    }

    canvas2D = c;
    canvas2D.id = id;

    if (!("tagName" in canvas2D)) {
      canvas2D.tagName = "CANVAS";
    }

    canvas2D.type = "canvas";
    parentNode(canvas2D);
    style(canvas2D);
    classList(canvas2D);
    clientRegion(canvas2D);
    offsetRegion(canvas2D);

    canvas2D.focus = function () {};

    canvas2D.blur = function () {};

    canvas2D.addEventListener = function (type, listener, options) {
      if (options === void 0) {
        options = {};
      }

      document.addEventListener(type, listener, options);
    };

    canvas2D.removeEventListener = function (type, listener) {
      document.removeEventListener(type, listener);
    };

    canvas2D.dispatchEvent = function (event) {
      document.dispatchEvent(event);
    };
  }
  /** 注册小游戏 */

  function registerMiniGame() {
    if (_isMiniGame) return;
    _isMiniGame = true;

    for (var key in window$1) {
      //  @ts-ignore
      if (!window[key]) window[key] = window$1[key];
    } // 绑定小游戏事件

    my.onTouchStart(dispatchTouchStart);
    my.onTouchMove(dispatchTouchMove);
    my.onTouchEnd(dispatchTouchEnd);
    my.onTouchCancel(dispatchTouchCancel);
  }

  function isMiniGame() {
    return _isMiniGame;
  }
  /**异步获取3Dcanvas*/

  function getCanvas() {
    return canvas;
  }
  /**异步获取2Dcanvas*/

  function getCanvas2D() {
    return canvas2D;
  }

  var Image = function Image() {
    var image;

    if (isMiniGame()) {
      image = my.createImage();
    } else {
      var canvas = getCanvas();
      image = (canvas.createImage && canvas.createImage()) || {};
    }

    if (!("tagName" in image)) {
      image.tagName = "IMG";
      image.__proto__ = Image.prototype;
    }

    parentNode(image);
    classList(image);
    Object.assign(image, {
      addEventListener: function addEventListener(name, cb) {
        image["on" + name] = cb.bind(image);
      },
      removeEventListener: function removeEventListener(name) {
        image["on" + name] = null;
      },
    });
    return image;
  };

  var Body = /*#__PURE__*/ (function (_HTMLElement) {
    _inheritsLoose(Body, _HTMLElement);

    function Body() {
      // 为了性能, 此处不按照标准的DOM层级关系设计
      // 将 body 设置为 0级, parent元素为null
      return _HTMLElement.call(this, "body", 0) || this;
    }

    var _proto = Body.prototype;

    _proto.addEventListener = function addEventListener(
      type,
      listener,
      options
    ) {
      if (options === void 0) {
        options = {};
      }

      document.addEventListener(type, listener, options);
    };

    _proto.removeEventListener = function removeEventListener(type, listener) {
      document.removeEventListener(type, listener);
    };

    _proto.dispatchEvent = function dispatchEvent(event) {
      document.dispatchEvent(event);
    };

    return Body;
  })(HTMLElement);

  var DocumentElement = /*#__PURE__*/ (function (_HTMLElement2) {
    _inheritsLoose(DocumentElement, _HTMLElement2);

    function DocumentElement() {
      return _HTMLElement2.call(this, "html", 0) || this;
    }

    var _proto2 = DocumentElement.prototype;

    _proto2.addEventListener = function addEventListener(
      type,
      listener,
      options
    ) {
      if (options === void 0) {
        options = {};
      }

      document.addEventListener(type, listener, options);
    };

    _proto2.removeEventListener = function removeEventListener(type, listener) {
      document.removeEventListener(type, listener);
    };

    _proto2.dispatchEvent = function dispatchEvent(event) {
      document.dispatchEvent(event);
    };

    return DocumentElement;
  })(HTMLElement);

  var events = {};
  var document = {
    readyState: "complete",
    visibilityState: "visible",
    // 'visible' , 'hidden'
    hidden: false,
    fullscreen: true,
    scripts: [],
    style: {},
    ontouchstart: null,
    ontouchmove: null,
    ontouchend: null,
    onvisibilitychange: null,
    parentNode: null,
    parentElement: null,
    head: null,
    body: null,
    documentElement: null,
    createElement: function createElement(tagName) {
      tagName = tagName.toLowerCase();

      if (tagName === "canvas") {
        var originCanvas = getCanvas();

        if (isMiniGame()) {
          var canvas = my.createCanvas(); // 小游戏适配

          canvas.addEventListener = function (type, listener, options) {
            if (options === void 0) {
              options = {};
            }

            document.addEventListener(type, listener, options);
          };

          canvas.removeEventListener = function (type, listener) {
            document.removeEventListener(type, listener);
          };

          canvas.dispatchEvent = function (event) {
            document.dispatchEvent(event);
          };

          return canvas;
        } else {
          return originCanvas;
        }
      } else if (tagName === "img") {
        return new Image();
      } else if (tagName === "video") {
        return new HTMLVideoElement();
      }

      return new HTMLElement(tagName);
    },
    createElementNS: function createElementNS(nameSpace, tagName) {
      return this.createElement(tagName);
    },
    createTextNode: function createTextNode(text) {
      // TODO: Do we need the TextNode Class ???
      return text;
    },
    getElementById: function getElementById(id) {
      var canvas = getCanvas();
      var canvas2D = getCanvas2D();

      if (id === canvas.id) {
        return canvas;
      } else if (id === canvas2D.id) {
        return canvas2D;
      }

      return null;
    },
    getElementsByTagName: function getElementsByTagName(tagName) {
      tagName = tagName.toLowerCase();

      if (tagName === "head") {
        return [document.head];
      } else if (tagName === "body") {
        return [document.body];
      } else if (tagName === "canvas") {
        return [getCanvas(), getCanvas2D()];
      }

      return [];
    },
    getElementsByTagNameNS: function getElementsByTagNameNS(
      nameSpace,
      tagName
    ) {
      return this.getElementsByTagName(tagName);
    },
    getElementsByName: function getElementsByName(tagName) {
      if (tagName === "head") {
        return [document.head];
      } else if (tagName === "body") {
        return [document.body];
      } else if (tagName === "canvas") {
        return [getCanvas(), getCanvas2D()];
      }

      return [];
    },
    querySelector: function querySelector(query) {
      var canvas = getCanvas();
      var canvas2D = getCanvas2D();

      if (query === "head") {
        return document.head;
      } else if (query === "body") {
        return document.body;
      } else if (query === "canvas") {
        return canvas;
      } else if (query === "#" + canvas.id) {
        return canvas;
      } else if (query === "#" + canvas2D.id) {
        return canvas2D;
      }

      return null;
    },
    querySelectorAll: function querySelectorAll(query) {
      if (query === "head") {
        return [document.head];
      } else if (query === "body") {
        return [document.body];
      } else if (query === "canvas") {
        return [getCanvas(), getCanvas2D()];
      }

      return [];
    },
    addEventListener: function addEventListener(type, listener, options) {
      if (!events[type]) {
        events[type] = [];
      }

      events[type].push(listener);
    },
    removeEventListener: function removeEventListener(type, listener) {
      var listeners = events[type];

      if (listeners && listeners.length > 0) {
        for (var i = listeners.length; i--; i > 0) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
            break;
          }
        }
      }
    },
    dispatchEvent: function dispatchEvent(event) {
      var type = event.type;
      var listeners = events[type];

      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](event);
        }
      }

      if (event.target && typeof event.target["on" + type] === "function") {
        event.target["on" + type](event);
      }
    },
  };
  document.documentElement = new DocumentElement();
  document.head = new HTMLElement("head");
  document.body = new Body();

  var HTMLCanvasElement = Object;

  var _my$getSystemInfoSync = my.getSystemInfoSync(),
    system = _my$getSystemInfoSync.system,
    platform = _my$getSystemInfoSync.platform,
    language = _my$getSystemInfoSync.language;

  var android = system.toLowerCase().indexOf("android") !== -1;
  var uaDesc = android
    ? "Android; CPU Android 6.0"
    : "iPhone; CPU iPhone OS 10_3_1 like Mac OS X";
  var ua =
    "Mozilla/5.0 (" +
    uaDesc +
    ") AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/" +
    language;
  var navigator = {
    platform: platform,
    language: language,
    appVersion:
      "5.0 (" +
      uaDesc +
      ") AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    userAgent: ua,
  };

  var lastTime = 0;
  var id = 0;

  function hack(cb) {
    var now = Date.now();
    var nextTime = Math.max(lastTime + 23, now);
    id = setTimeout(function () {
      cb((lastTime = nextTime));
    }, nextTime - now);
    return id;
  }

  function requestAnimationFrame(cb) {
    var canvas = getCanvas();

    if (canvas.requestAnimationFrame) {
      return canvas.requestAnimationFrame(cb);
    } else {
      return hack(cb);
    }
  }

  function cancelAnimationFrame(id) {
    var canvas = getCanvas();

    if (canvas.cancelAnimationFrame) {
      return canvas.cancelAnimationFrame(id);
    } else {
      return clearTimeout(id);
    }
  }

  var _requestHeader = new Map();

  var _responseHeader = new Map();

  var _requestTask = new Map();

  var contentTypes = {
    json: "application/json",
    text: "application/text",
    arraybuffer: "application/octet-stream",
  };

  function _triggerEvent(type, event) {
    if (event === void 0) {
      event = {
        target: this,
      };
    }

    if (typeof this["on" + type] === "function") {
      this["on" + type].call(this, event);
    }
  }

  function _changeReadyState(readyState, event) {
    if (event === void 0) {
      event = {
        readyState: readyState,
      };
    }

    this.readyState = readyState;

    _triggerEvent.call(this, "readystatechange", event);
  }

  var XMLHttpRequest = /*#__PURE__*/ (function (_EventTarget) {
    _inheritsLoose(XMLHttpRequest, _EventTarget);

    function XMLHttpRequest() {
      var _this;

      _this = _EventTarget.call(this) || this;
      _this.onabort = void 0;
      _this.onerror = void 0;
      _this.onload = void 0;
      _this.onloadstart = void 0;
      _this.onprogress = void 0;
      _this.ontimeout = void 0;
      _this.onloadend = void 0;
      _this.onreadystatechange = void 0;
      _this.readyState = void 0;
      _this.response = void 0;
      _this.responseText = void 0;
      _this._responseType = void 0;
      _this.responseXML = void 0;
      _this.status = void 0;
      _this.statusText = void 0;
      _this.upload = void 0;
      _this.withCredentials = void 0;
      _this.timeout = void 0;
      _this._url = void 0;
      _this._method = void 0;
      _this.onabort = null;
      _this.onerror = null;
      _this.onload = null;
      _this.onloadstart = null;
      _this.onprogress = null;
      _this.ontimeout = null;
      _this.onloadend = null;
      _this.onreadystatechange = null;
      _this.readyState = 0;
      _this.response = null;
      _this.responseText = null;
      _this._responseType = "text";
      _this.responseXML = null;
      _this.status = 0;
      _this.statusText = "";
      _this.upload = {};
      _this.withCredentials = false;

      _requestHeader.set("requestHeader", {
        "content-type": "application/x-www-form-urlencoded",
      });

      return _this;
    }

    var _proto = XMLHttpRequest.prototype;

    _proto.abort = function abort() {
      var myRequestTask = _requestTask.get("requestTask");

      if (myRequestTask) {
        myRequestTask.abort();
      }
    };

    _proto.getAllResponseHeaders = function getAllResponseHeaders() {
      var responseHeader = _responseHeader.get("responseHeader");

      return Object.keys(responseHeader)
        .map(function (header) {
          return header + ": " + responseHeader[header];
        })
        .join("\n");
    };

    _proto.getResponseHeader = function getResponseHeader(header) {
      return _responseHeader.get("responseHeader")[header];
    };

    _proto.open = function open(
      method,
      url
      /* GET/POST*/
    ) {
      this._method = method;
      this._url = url;

      _changeReadyState.call(this, XMLHttpRequest.OPENED);
    };

    _proto.overrideMimeType = function overrideMimeType() {};

    _proto.send = function send(data) {
      var _this2 = this;

      if (data === void 0) {
        data = "";
      }

      if (this.readyState !== XMLHttpRequest.OPENED) {
        throw new Error(
          "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED."
        );
      } else {
        var url = this._url;

        var header = _requestHeader.get("requestHeader");

        var responseType = this._responseType;

        if (contentTypes[responseType]) {
          header["content-type"] = contentTypes[responseType];
        }

        delete this.response;
        this.response = null;

        var onSuccess = function onSuccess(_ref) {
          var data = _ref.data,
            status = _ref.status,
            headers = _ref.headers;
          status = status === undefined ? 200 : status;

          try {
            if (
              data == null ||
              (data instanceof ArrayBuffer && data.byteLength == 0)
            ) {
              status = 404;
            }
          } catch (e) {}

          _this2.status = status;

          if (headers) {
            _responseHeader.set("responseHeader", headers);
          }

          _triggerEvent.call(_this2, "loadstart");

          _changeReadyState.call(_this2, XMLHttpRequest.HEADERS_RECEIVED);

          _changeReadyState.call(_this2, XMLHttpRequest.LOADING);

          _this2.response = data;

          if (data instanceof ArrayBuffer) {
            //TODO temporary solution, fix native gc error.
            _this2.response = data.slice(0);
            Object.defineProperty(_this2, "responseText", {
              enumerable: true,
              configurable: true,
              get: function get() {
                throw (
                  "InvalidStateError : responseType is " + this._responseType
                );
              },
            });
          } else {
            _this2.responseText = data;
          }

          _changeReadyState.call(_this2, XMLHttpRequest.DONE);

          _triggerEvent.call(_this2, "load");

          _triggerEvent.call(_this2, "loadend");
        };

        var onFail = function onFail(e) {
          var errMsg = e.message || e.errorMessage; // TODO 规范错误

          if (!errMsg) {
            return;
          }

          if (errMsg.indexOf("abort") !== -1) {
            _triggerEvent.call(_this2, "abort", {
              message: errMsg + _this2._url,
            });
          } else {
            _triggerEvent.call(_this2, "error", {
              message: errMsg + _this2._url,
            });
          }

          _triggerEvent.call(_this2, "loadend");
        };

        var requestTask = my.request({
          data: data,
          url: url,
          method: this._method,
          timeout: this.timeout ? this.timeout : 30000,
          headers: header,
          dataType: responseType,
          success: onSuccess,
          fail: onFail,
        });

        _requestTask.set("requestTask", requestTask);
      }
    };

    _proto.setRequestHeader = function setRequestHeader(header, value) {
      var myHeader = _requestHeader.get("requestHeader");

      myHeader[header] = value;

      _requestHeader.set("requestHeader", myHeader);
    };

    _proto.addEventListener = function addEventListener(type, listener) {
      var _this3 = this;

      if (typeof listener !== "function") {
        return;
      }

      this["on" + type] = function (event) {
        if (event === void 0) {
          event = {};
        }

        event.target = event.target || _this3;
        listener.call(_this3, event);
      };
    };

    _proto.removeEventListener = function removeEventListener(type, listener) {
      if (this["on" + type] === listener) {
        this["on" + type] = null;
      }
    };

    _createClass(XMLHttpRequest, [
      {
        key: "responseType",
        set: function set(type) {
          this._responseType = type;
        },
      },
    ]);

    return XMLHttpRequest;
  })(EventTarget); // TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态

  XMLHttpRequest.UNSEND = void 0;
  XMLHttpRequest.OPENED = void 0;
  XMLHttpRequest.HEADERS_RECEIVED = void 0;
  XMLHttpRequest.LOADING = void 0;
  XMLHttpRequest.DONE = void 0;
  XMLHttpRequest.UNSEND = 0;
  XMLHttpRequest.OPENED = 1;
  XMLHttpRequest.HEADERS_RECEIVED = 2;
  XMLHttpRequest.LOADING = 3;
  XMLHttpRequest.DONE = 4;

  // 暂不支持
  var performance = null;

  var WebGL2RenderingContext = {};

  var WebGLRenderingContext = {
    GCCSO_SHADER_BINARY_FJ: 0x9260,
    _3DC_XY_AMD: 0x87fa,
    _3DC_X_AMD: 0x87f9,
    ACTIVE_ATTRIBUTES: 0x8b89,
    ACTIVE_ATTRIBUTE_MAX_LENGTH: 0x8b8a,
    ACTIVE_PROGRAM_EXT: 0x8259,
    ACTIVE_TEXTURE: 0x84e0,
    ACTIVE_UNIFORMS: 0x8b86,
    ACTIVE_UNIFORM_MAX_LENGTH: 0x8b87,
    ALIASED_LINE_WIDTH_RANGE: 0x846e,
    ALIASED_POINT_SIZE_RANGE: 0x846d,
    ALL_COMPLETED_NV: 0x84f2,
    ALL_SHADER_BITS_EXT: 0xffffffff,
    ALPHA: 0x1906,
    ALPHA16F_EXT: 0x881c,
    ALPHA32F_EXT: 0x8816,
    ALPHA8_EXT: 0x803c,
    ALPHA8_OES: 0x803c,
    ALPHA_BITS: 0xd55,
    ALPHA_TEST_FUNC_QCOM: 0xbc1,
    ALPHA_TEST_QCOM: 0xbc0,
    ALPHA_TEST_REF_QCOM: 0xbc2,
    ALREADY_SIGNALED_APPLE: 0x911a,
    ALWAYS: 0x207,
    AMD_compressed_3DC_texture: 0x1,
    AMD_compressed_ATC_texture: 0x1,
    AMD_performance_monitor: 0x1,
    AMD_program_binary_Z400: 0x1,
    ANGLE_depth_texture: 0x1,
    ANGLE_framebuffer_blit: 0x1,
    ANGLE_framebuffer_multisample: 0x1,
    ANGLE_instanced_arrays: 0x1,
    ANGLE_pack_reverse_row_order: 0x1,
    ANGLE_program_binary: 0x1,
    ANGLE_texture_compression_dxt3: 0x1,
    ANGLE_texture_compression_dxt5: 0x1,
    ANGLE_texture_usage: 0x1,
    ANGLE_translated_shader_source: 0x1,
    ANY_SAMPLES_PASSED_CONSERVATIVE_EXT: 0x8d6a,
    ANY_SAMPLES_PASSED_EXT: 0x8c2f,
    APPLE_copy_texture_levels: 0x1,
    APPLE_framebuffer_multisample: 0x1,
    APPLE_rgb_422: 0x1,
    APPLE_sync: 0x1,
    APPLE_texture_format_BGRA8888: 0x1,
    APPLE_texture_max_level: 0x1,
    ARM_mali_program_binary: 0x1,
    ARM_mali_shader_binary: 0x1,
    ARM_rgba8: 0x1,
    ARRAY_BUFFER: 0x8892,
    ARRAY_BUFFER_BINDING: 0x8894,
    ATC_RGBA_EXPLICIT_ALPHA_AMD: 0x8c93,
    ATC_RGBA_INTERPOLATED_ALPHA_AMD: 0x87ee,
    ATC_RGB_AMD: 0x8c92,
    ATTACHED_SHADERS: 0x8b85,
    BACK: 0x405,
    BGRA8_EXT: 0x93a1,
    BGRA_EXT: 0x80e1,
    BGRA_IMG: 0x80e1,
    BINNING_CONTROL_HINT_QCOM: 0x8fb0,
    BLEND: 0xbe2,
    BLEND_COLOR: 0x8005,
    BLEND_DST_ALPHA: 0x80ca,
    BLEND_DST_RGB: 0x80c8,
    BLEND_EQUATION: 0x8009,
    BLEND_EQUATION_ALPHA: 0x883d,
    BLEND_EQUATION_RGB: 0x8009,
    BLEND_SRC_ALPHA: 0x80cb,
    BLEND_SRC_RGB: 0x80c9,
    BLUE_BITS: 0xd54,
    BOOL: 0x8b56,
    BOOL_VEC2: 0x8b57,
    BOOL_VEC3: 0x8b58,
    BOOL_VEC4: 0x8b59,
    BUFFER: 0x82e0,
    BUFFER_ACCESS_OES: 0x88bb,
    BUFFER_MAPPED_OES: 0x88bc,
    BUFFER_MAP_POINTER_OES: 0x88bd,
    BUFFER_OBJECT_EXT: 0x9151,
    BUFFER_SIZE: 0x8764,
    BUFFER_USAGE: 0x8765,
    BYTE: 0x1400,
    CCW: 0x901,
    CLAMP_TO_BORDER_NV: 0x812d,
    CLAMP_TO_EDGE: 0x812f,
    COLOR_ATTACHMENT0: 0x8ce0,
    COLOR_ATTACHMENT0_NV: 0x8ce0,
    COLOR_ATTACHMENT10_NV: 0x8cea,
    COLOR_ATTACHMENT11_NV: 0x8ceb,
    COLOR_ATTACHMENT12_NV: 0x8cec,
    COLOR_ATTACHMENT13_NV: 0x8ced,
    COLOR_ATTACHMENT14_NV: 0x8cee,
    COLOR_ATTACHMENT15_NV: 0x8cef,
    COLOR_ATTACHMENT1_NV: 0x8ce1,
    COLOR_ATTACHMENT2_NV: 0x8ce2,
    COLOR_ATTACHMENT3_NV: 0x8ce3,
    COLOR_ATTACHMENT4_NV: 0x8ce4,
    COLOR_ATTACHMENT5_NV: 0x8ce5,
    COLOR_ATTACHMENT6_NV: 0x8ce6,
    COLOR_ATTACHMENT7_NV: 0x8ce7,
    COLOR_ATTACHMENT8_NV: 0x8ce8,
    COLOR_ATTACHMENT9_NV: 0x8ce9,
    COLOR_ATTACHMENT_EXT: 0x90f0,
    COLOR_BUFFER_BIT: 0x4000,
    COLOR_BUFFER_BIT0_QCOM: 0x1,
    COLOR_BUFFER_BIT1_QCOM: 0x2,
    COLOR_BUFFER_BIT2_QCOM: 0x4,
    COLOR_BUFFER_BIT3_QCOM: 0x8,
    COLOR_BUFFER_BIT4_QCOM: 0x10,
    COLOR_BUFFER_BIT5_QCOM: 0x20,
    COLOR_BUFFER_BIT6_QCOM: 0x40,
    COLOR_BUFFER_BIT7_QCOM: 0x80,
    COLOR_CLEAR_VALUE: 0xc22,
    COLOR_EXT: 0x1800,
    COLOR_WRITEMASK: 0xc23,
    COMPARE_REF_TO_TEXTURE_EXT: 0x884e,
    COMPILE_STATUS: 0x8b81,
    COMPRESSED_RGBA_ASTC_10x10_KHR: 0x93bb,
    COMPRESSED_RGBA_ASTC_10x5_KHR: 0x93b8,
    COMPRESSED_RGBA_ASTC_10x6_KHR: 0x93b9,
    COMPRESSED_RGBA_ASTC_10x8_KHR: 0x93ba,
    COMPRESSED_RGBA_ASTC_12x10_KHR: 0x93bc,
    COMPRESSED_RGBA_ASTC_12x12_KHR: 0x93bd,
    COMPRESSED_RGBA_ASTC_4x4_KHR: 0x93b0,
    COMPRESSED_RGBA_ASTC_5x4_KHR: 0x93b1,
    COMPRESSED_RGBA_ASTC_5x5_KHR: 0x93b2,
    COMPRESSED_RGBA_ASTC_6x5_KHR: 0x93b3,
    COMPRESSED_RGBA_ASTC_6x6_KHR: 0x93b4,
    COMPRESSED_RGBA_ASTC_8x5_KHR: 0x93b5,
    COMPRESSED_RGBA_ASTC_8x6_KHR: 0x93b6,
    COMPRESSED_RGBA_ASTC_8x8_KHR: 0x93b7,
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8c03,
    COMPRESSED_RGBA_PVRTC_2BPPV2_IMG: 0x9137,
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8c02,
    COMPRESSED_RGBA_PVRTC_4BPPV2_IMG: 0x9138,
    COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83f1,
    COMPRESSED_RGBA_S3TC_DXT3_ANGLE: 0x83f2,
    COMPRESSED_RGBA_S3TC_DXT5_ANGLE: 0x83f3,
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8c01,
    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8c00,
    COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83f0,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: 0x93db,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: 0x93d8,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: 0x93d9,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: 0x93da,
    COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: 0x93dc,
    COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: 0x93dd,
    COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: 0x93d0,
    COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: 0x93d1,
    COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: 0x93d2,
    COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: 0x93d3,
    COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: 0x93d4,
    COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: 0x93d5,
    COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: 0x93d6,
    COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: 0x93d7,
    COMPRESSED_SRGB_ALPHA_S3TC_DXT1_NV: 0x8c4d,
    COMPRESSED_SRGB_ALPHA_S3TC_DXT3_NV: 0x8c4e,
    COMPRESSED_SRGB_ALPHA_S3TC_DXT5_NV: 0x8c4f,
    COMPRESSED_SRGB_S3TC_DXT1_NV: 0x8c4c,
    COMPRESSED_TEXTURE_FORMATS: 0x86a3,
    CONDITION_SATISFIED_APPLE: 0x911c,
    CONSTANT_ALPHA: 0x8003,
    CONSTANT_COLOR: 0x8001,
    CONTEXT_FLAG_DEBUG_BIT: 0x2,
    CONTEXT_ROBUST_ACCESS_EXT: 0x90f3,
    COUNTER_RANGE_AMD: 0x8bc1,
    COUNTER_TYPE_AMD: 0x8bc0,
    COVERAGE_ALL_FRAGMENTS_NV: 0x8ed5,
    COVERAGE_ATTACHMENT_NV: 0x8ed2,
    COVERAGE_AUTOMATIC_NV: 0x8ed7,
    COVERAGE_BUFFERS_NV: 0x8ed3,
    COVERAGE_BUFFER_BIT_NV: 0x8000,
    COVERAGE_COMPONENT4_NV: 0x8ed1,
    COVERAGE_COMPONENT_NV: 0x8ed0,
    COVERAGE_EDGE_FRAGMENTS_NV: 0x8ed6,
    COVERAGE_SAMPLES_NV: 0x8ed4,
    CPU_OPTIMIZED_QCOM: 0x8fb1,
    CULL_FACE: 0xb44,
    CULL_FACE_MODE: 0xb45,
    CURRENT_PROGRAM: 0x8b8d,
    CURRENT_QUERY_EXT: 0x8865,
    CURRENT_VERTEX_ATTRIB: 0x8626,
    CW: 0x900,
    DEBUG_CALLBACK_FUNCTION: 0x8244,
    DEBUG_CALLBACK_USER_PARAM: 0x8245,
    DEBUG_GROUP_STACK_DEPTH: 0x826d,
    DEBUG_LOGGED_MESSAGES: 0x9145,
    DEBUG_NEXT_LOGGED_MESSAGE_LENGTH: 0x8243,
    DEBUG_OUTPUT: 0x92e0,
    DEBUG_OUTPUT_SYNCHRONOUS: 0x8242,
    DEBUG_SEVERITY_HIGH: 0x9146,
    DEBUG_SEVERITY_LOW: 0x9148,
    DEBUG_SEVERITY_MEDIUM: 0x9147,
    DEBUG_SEVERITY_NOTIFICATION: 0x826b,
    DEBUG_SOURCE_API: 0x8246,
    DEBUG_SOURCE_APPLICATION: 0x824a,
    DEBUG_SOURCE_OTHER: 0x824b,
    DEBUG_SOURCE_SHADER_COMPILER: 0x8248,
    DEBUG_SOURCE_THIRD_PARTY: 0x8249,
    DEBUG_SOURCE_WINDOW_SYSTEM: 0x8247,
    DEBUG_TYPE_DEPRECATED_BEHAVIOR: 0x824d,
    DEBUG_TYPE_ERROR: 0x824c,
    DEBUG_TYPE_MARKER: 0x8268,
    DEBUG_TYPE_OTHER: 0x8251,
    DEBUG_TYPE_PERFORMANCE: 0x8250,
    DEBUG_TYPE_POP_GROUP: 0x826a,
    DEBUG_TYPE_PORTABILITY: 0x824f,
    DEBUG_TYPE_PUSH_GROUP: 0x8269,
    DEBUG_TYPE_UNDEFINED_BEHAVIOR: 0x824e,
    DECR: 0x1e03,
    DECR_WRAP: 0x8508,
    DELETE_STATUS: 0x8b80,
    DEPTH24_STENCIL8_OES: 0x88f0,
    DEPTH_ATTACHMENT: 0x8d00,
    DEPTH_STENCIL_ATTACHMENT: 0x821a,
    DEPTH_BITS: 0xd56,
    DEPTH_BUFFER_BIT: 0x100,
    DEPTH_BUFFER_BIT0_QCOM: 0x100,
    DEPTH_BUFFER_BIT1_QCOM: 0x200,
    DEPTH_BUFFER_BIT2_QCOM: 0x400,
    DEPTH_BUFFER_BIT3_QCOM: 0x800,
    DEPTH_BUFFER_BIT4_QCOM: 0x1000,
    DEPTH_BUFFER_BIT5_QCOM: 0x2000,
    DEPTH_BUFFER_BIT6_QCOM: 0x4000,
    DEPTH_BUFFER_BIT7_QCOM: 0x8000,
    DEPTH_CLEAR_VALUE: 0xb73,
    DEPTH_COMPONENT: 0x1902,
    DEPTH_COMPONENT16: 0x81a5,
    DEPTH_COMPONENT16_NONLINEAR_NV: 0x8e2c,
    DEPTH_COMPONENT16_OES: 0x81a5,
    DEPTH_COMPONENT24_OES: 0x81a6,
    DEPTH_COMPONENT32_OES: 0x81a7,
    DEPTH_EXT: 0x1801,
    DEPTH_FUNC: 0xb74,
    DEPTH_RANGE: 0xb70,
    DEPTH_STENCIL: 0x84f9,
    DEPTH_STENCIL_OES: 0x84f9,
    DEPTH_TEST: 0xb71,
    DEPTH_WRITEMASK: 0xb72,
    DITHER: 0xbd0,
    DMP_shader_binary: 0x1,
    DONT_CARE: 0x1100,
    DRAW_BUFFER0_NV: 0x8825,
    DRAW_BUFFER10_NV: 0x882f,
    DRAW_BUFFER11_NV: 0x8830,
    DRAW_BUFFER12_NV: 0x8831,
    DRAW_BUFFER13_NV: 0x8832,
    DRAW_BUFFER14_NV: 0x8833,
    DRAW_BUFFER15_NV: 0x8834,
    DRAW_BUFFER1_NV: 0x8826,
    DRAW_BUFFER2_NV: 0x8827,
    DRAW_BUFFER3_NV: 0x8828,
    DRAW_BUFFER4_NV: 0x8829,
    DRAW_BUFFER5_NV: 0x882a,
    DRAW_BUFFER6_NV: 0x882b,
    DRAW_BUFFER7_NV: 0x882c,
    DRAW_BUFFER8_NV: 0x882d,
    DRAW_BUFFER9_NV: 0x882e,
    DRAW_BUFFER_EXT: 0xc01,
    DRAW_FRAMEBUFFER_ANGLE: 0x8ca9,
    DRAW_FRAMEBUFFER_APPLE: 0x8ca9,
    DRAW_FRAMEBUFFER_BINDING_ANGLE: 0x8ca6,
    DRAW_FRAMEBUFFER_BINDING_APPLE: 0x8ca6,
    DRAW_FRAMEBUFFER_BINDING_NV: 0x8ca6,
    DRAW_FRAMEBUFFER_NV: 0x8ca9,
    DST_ALPHA: 0x304,
    DST_COLOR: 0x306,
    DYNAMIC_DRAW: 0x88e8,
    ELEMENT_ARRAY_BUFFER: 0x8893,
    ELEMENT_ARRAY_BUFFER_BINDING: 0x8895,
    EQUAL: 0x202,
    ES_VERSION_2_0: 0x1,
    ETC1_RGB8_OES: 0x8d64,
    ETC1_SRGB8_NV: 0x88ee,
    EXTENSIONS: 0x1f03,
    EXT_blend_minmax: 0x1,
    EXT_color_buffer_half_float: 0x1,
    EXT_debug_label: 0x1,
    EXT_debug_marker: 0x1,
    EXT_discard_framebuffer: 0x1,
    EXT_map_buffer_range: 0x1,
    EXT_multi_draw_arrays: 0x1,
    EXT_multisampled_render_to_texture: 0x1,
    EXT_multiview_draw_buffers: 0x1,
    EXT_occlusion_query_boolean: 0x1,
    EXT_read_format_bgra: 0x1,
    EXT_robustness: 0x1,
    EXT_sRGB: 0x1,
    EXT_separate_shader_objects: 0x1,
    EXT_shader_framebuffer_fetch: 0x1,
    EXT_shader_texture_lod: 0x1,
    EXT_shadow_samplers: 0x1,
    EXT_texture_compression_dxt1: 0x1,
    EXT_texture_filter_anisotropic: 0x1,
    EXT_texture_format_BGRA8888: 0x1,
    EXT_texture_rg: 0x1,
    EXT_texture_storage: 0x1,
    EXT_texture_type_2_10_10_10_REV: 0x1,
    EXT_unpack_subimage: 0x1,
    FALSE: 0x0,
    FASTEST: 0x1101,
    FENCE_CONDITION_NV: 0x84f4,
    FENCE_STATUS_NV: 0x84f3,
    FIXED: 0x140c,
    FJ_shader_binary_GCCSO: 0x1,
    FLOAT: 0x1406,
    FLOAT_MAT2: 0x8b5a,
    FLOAT_MAT3: 0x8b5b,
    FLOAT_MAT4: 0x8b5c,
    FLOAT_VEC2: 0x8b50,
    FLOAT_VEC3: 0x8b51,
    FLOAT_VEC4: 0x8b52,
    FRAGMENT_SHADER: 0x8b30,
    FRAGMENT_SHADER_BIT_EXT: 0x2,
    FRAGMENT_SHADER_DERIVATIVE_HINT_OES: 0x8b8b,
    FRAGMENT_SHADER_DISCARDS_SAMPLES_EXT: 0x8a52,
    FRAMEBUFFER: 0x8d40,
    FRAMEBUFFER_ATTACHMENT_ANGLE: 0x93a3,
    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: 0x8210,
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8cd1,
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8cd0,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_3D_ZOFFSET_OES: 0x8cd4,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8cd3,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8cd2,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_SAMPLES_EXT: 0x8d6c,
    FRAMEBUFFER_BINDING: 0x8ca6,
    FRAMEBUFFER_COMPLETE: 0x8cd5,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8cd6,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8cd9,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8cd7,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_ANGLE: 0x8d56,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_APPLE: 0x8d56,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_EXT: 0x8d56,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_IMG: 0x9134,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_NV: 0x8d56,
    FRAMEBUFFER_UNDEFINED_OES: 0x8219,
    FRAMEBUFFER_UNSUPPORTED: 0x8cdd,
    FRONT: 0x404,
    FRONT_AND_BACK: 0x408,
    FRONT_FACE: 0xb46,
    FUNC_ADD: 0x8006,
    FUNC_REVERSE_SUBTRACT: 0x800b,
    FUNC_SUBTRACT: 0x800a,
    GENERATE_MIPMAP_HINT: 0x8192,
    GEQUAL: 0x206,
    GPU_OPTIMIZED_QCOM: 0x8fb2,
    GREATER: 0x204,
    GREEN_BITS: 0xd53,
    GUILTY_CONTEXT_RESET_EXT: 0x8253,
    HALF_FLOAT_OES: 0x8d61,
    HIGH_FLOAT: 0x8df2,
    HIGH_INT: 0x8df5,
    IMG_multisampled_render_to_texture: 0x1,
    IMG_program_binary: 0x1,
    IMG_read_format: 0x1,
    IMG_shader_binary: 0x1,
    IMG_texture_compression_pvrtc: 0x1,
    IMG_texture_compression_pvrtc2: 0x1,
    IMPLEMENTATION_COLOR_READ_FORMAT: 0x8b9b,
    IMPLEMENTATION_COLOR_READ_TYPE: 0x8b9a,
    INCR: 0x1e02,
    INCR_WRAP: 0x8507,
    INFO_LOG_LENGTH: 0x8b84,
    INNOCENT_CONTEXT_RESET_EXT: 0x8254,
    INT: 0x1404,
    INT_10_10_10_2_OES: 0x8df7,
    INT_VEC2: 0x8b53,
    INT_VEC3: 0x8b54,
    INT_VEC4: 0x8b55,
    INVALID_ENUM: 0x500,
    INVALID_FRAMEBUFFER_OPERATION: 0x506,
    INVALID_OPERATION: 0x502,
    INVALID_VALUE: 0x501,
    INVERT: 0x150a,
    KEEP: 0x1e00,
    KHR_debug: 0x1,
    KHR_texture_compression_astc_ldr: 0x1,
    LEFT: 0x0406,
    LEQUAL: 0x203,
    LESS: 0x201,
    LINEAR: 0x2601,
    LINEAR_MIPMAP_LINEAR: 0x2703,
    LINEAR_MIPMAP_NEAREST: 0x2701,
    LINES: 0x1,
    LINE_LOOP: 0x2,
    LINE_STRIP: 0x3,
    LINE_WIDTH: 0xb21,
    LINK_STATUS: 0x8b82,
    LOSE_CONTEXT_ON_RESET_EXT: 0x8252,
    LOW_FLOAT: 0x8df0,
    LOW_INT: 0x8df3,
    LUMINANCE: 0x1909,
    LUMINANCE16F_EXT: 0x881e,
    LUMINANCE32F_EXT: 0x8818,
    LUMINANCE4_ALPHA4_OES: 0x8043,
    LUMINANCE8_ALPHA8_EXT: 0x8045,
    LUMINANCE8_ALPHA8_OES: 0x8045,
    LUMINANCE8_EXT: 0x8040,
    LUMINANCE8_OES: 0x8040,
    LUMINANCE_ALPHA: 0x190a,
    LUMINANCE_ALPHA16F_EXT: 0x881f,
    LUMINANCE_ALPHA32F_EXT: 0x8819,
    MALI_PROGRAM_BINARY_ARM: 0x8f61,
    MALI_SHADER_BINARY_ARM: 0x8f60,
    MAP_FLUSH_EXPLICIT_BIT_EXT: 0x10,
    MAP_INVALIDATE_BUFFER_BIT_EXT: 0x8,
    MAP_INVALIDATE_RANGE_BIT_EXT: 0x4,
    MAP_READ_BIT_EXT: 0x1,
    MAP_UNSYNCHRONIZED_BIT_EXT: 0x20,
    MAP_WRITE_BIT_EXT: 0x2,
    MAX_3D_TEXTURE_SIZE_OES: 0x8073,
    MAX_COLOR_ATTACHMENTS_NV: 0x8cdf,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8b4d,
    MAX_CUBE_MAP_TEXTURE_SIZE: 0x851c,
    MAX_DEBUG_GROUP_STACK_DEPTH: 0x826c,
    MAX_DEBUG_LOGGED_MESSAGES: 0x9144,
    MAX_DEBUG_MESSAGE_LENGTH: 0x9143,
    MAX_DRAW_BUFFERS_NV: 0x8824,
    MAX_EXT: 0x8008,
    MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd,
    MAX_LABEL_LENGTH: 0x82e8,
    MAX_MULTIVIEW_BUFFERS_EXT: 0x90f2,
    MAX_RENDERBUFFER_SIZE: 0x84e8,
    MAX_SAMPLES_ANGLE: 0x8d57,
    MAX_SAMPLES_APPLE: 0x8d57,
    MAX_SAMPLES_EXT: 0x8d57,
    MAX_SAMPLES_IMG: 0x9135,
    MAX_SAMPLES_NV: 0x8d57,
    MAX_SERVER_WAIT_TIMEOUT_APPLE: 0x9111,
    MAX_TEXTURE_IMAGE_UNITS: 0x8872,
    MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84ff,
    MAX_TEXTURE_SIZE: 0xd33,
    MAX_VARYING_VECTORS: 0x8dfc,
    MAX_VERTEX_ATTRIBS: 0x8869,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8b4c,
    MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb,
    MAX_VIEWPORT_DIMS: 0xd3a,
    MEDIUM_FLOAT: 0x8df1,
    MEDIUM_INT: 0x8df4,
    MIN_EXT: 0x8007,
    MIRRORED_REPEAT: 0x8370,
    MULTISAMPLE_BUFFER_BIT0_QCOM: 0x1000000,
    MULTISAMPLE_BUFFER_BIT1_QCOM: 0x2000000,
    MULTISAMPLE_BUFFER_BIT2_QCOM: 0x4000000,
    MULTISAMPLE_BUFFER_BIT3_QCOM: 0x8000000,
    MULTISAMPLE_BUFFER_BIT4_QCOM: 0x10000000,
    MULTISAMPLE_BUFFER_BIT5_QCOM: 0x20000000,
    MULTISAMPLE_BUFFER_BIT6_QCOM: 0x40000000,
    MULTISAMPLE_BUFFER_BIT7_QCOM: 0x80000000,
    MULTIVIEW_EXT: 0x90f1,
    NEAREST: 0x2600,
    NEAREST_MIPMAP_LINEAR: 0x2702,
    NEAREST_MIPMAP_NEAREST: 0x2700,
    NEVER: 0x200,
    NICEST: 0x1102,
    NONE: 0x0,
    NOTEQUAL: 0x205,
    NO_ERROR: 0x0,
    NO_RESET_NOTIFICATION_EXT: 0x8261,
    NUM_COMPRESSED_TEXTURE_FORMATS: 0x86a2,
    NUM_PROGRAM_BINARY_FORMATS_OES: 0x87fe,
    NUM_SHADER_BINARY_FORMATS: 0x8df9,
    NV_coverage_sample: 0x1,
    NV_depth_nonlinear: 0x1,
    NV_draw_buffers: 0x1,
    NV_draw_instanced: 0x1,
    NV_fbo_color_attachments: 0x1,
    NV_fence: 0x1,
    NV_framebuffer_blit: 0x1,
    NV_framebuffer_multisample: 0x1,
    NV_generate_mipmap_sRGB: 0x1,
    NV_instanced_arrays: 0x1,
    NV_read_buffer: 0x1,
    NV_read_buffer_front: 0x1,
    NV_read_depth: 0x1,
    NV_read_depth_stencil: 0x1,
    NV_read_stencil: 0x1,
    NV_sRGB_formats: 0x1,
    NV_shadow_samplers_array: 0x1,
    NV_shadow_samplers_cube: 0x1,
    NV_texture_border_clamp: 0x1,
    NV_texture_compression_s3tc_update: 0x1,
    NV_texture_npot_2D_mipmap: 0x1,
    OBJECT_TYPE_APPLE: 0x9112,
    OES_EGL_image: 0x1,
    OES_EGL_image_external: 0x1,
    OES_compressed_ETC1_RGB8_texture: 0x1,
    OES_compressed_paletted_texture: 0x1,
    OES_depth24: 0x1,
    OES_depth32: 0x1,
    OES_depth_texture: 0x1,
    OES_element_index_uint: 0x1,
    OES_fbo_render_mipmap: 0x1,
    OES_fragment_precision_high: 0x1,
    OES_get_program_binary: 0x1,
    OES_mapbuffer: 0x1,
    OES_packed_depth_stencil: 0x1,
    OES_required_internalformat: 0x1,
    OES_rgb8_rgba8: 0x1,
    OES_standard_derivatives: 0x1,
    OES_stencil1: 0x1,
    OES_stencil4: 0x1,
    OES_surfaceless_context: 0x1,
    OES_texture_3D: 0x1,
    OES_texture_float: 0x1,
    OES_texture_float_linear: 0x1,
    OES_texture_half_float: 0x1,
    OES_texture_half_float_linear: 0x1,
    OES_texture_npot: 0x1,
    OES_vertex_array_object: 0x1,
    OES_vertex_half_float: 0x1,
    OES_vertex_type_10_10_10_2: 0x1,
    ONE: 0x1,
    ONE_MINUS_CONSTANT_ALPHA: 0x8004,
    ONE_MINUS_CONSTANT_COLOR: 0x8002,
    ONE_MINUS_DST_ALPHA: 0x305,
    ONE_MINUS_DST_COLOR: 0x307,
    ONE_MINUS_SRC_ALPHA: 0x303,
    ONE_MINUS_SRC_COLOR: 0x301,
    OUT_OF_MEMORY: 0x505,
    PACK_ALIGNMENT: 0xd05,
    PACK_REVERSE_ROW_ORDER_ANGLE: 0x93a4,
    PALETTE4_R5_G6_B5_OES: 0x8b92,
    PALETTE4_RGB5_A1_OES: 0x8b94,
    PALETTE4_RGB8_OES: 0x8b90,
    PALETTE4_RGBA4_OES: 0x8b93,
    PALETTE4_RGBA8_OES: 0x8b91,
    PALETTE8_R5_G6_B5_OES: 0x8b97,
    PALETTE8_RGB5_A1_OES: 0x8b99,
    PALETTE8_RGB8_OES: 0x8b95,
    PALETTE8_RGBA4_OES: 0x8b98,
    PALETTE8_RGBA8_OES: 0x8b96,
    PERCENTAGE_AMD: 0x8bc3,
    PERFMON_GLOBAL_MODE_QCOM: 0x8fa0,
    PERFMON_RESULT_AMD: 0x8bc6,
    PERFMON_RESULT_AVAILABLE_AMD: 0x8bc4,
    PERFMON_RESULT_SIZE_AMD: 0x8bc5,
    POINTS: 0x0,
    POLYGON_OFFSET_FACTOR: 0x8038,
    POLYGON_OFFSET_FILL: 0x8037,
    POLYGON_OFFSET_UNITS: 0x2a00,
    PROGRAM: 0x82e2,
    PROGRAM_BINARY_ANGLE: 0x93a6,
    PROGRAM_BINARY_FORMATS_OES: 0x87ff,
    PROGRAM_BINARY_LENGTH_OES: 0x8741,
    PROGRAM_OBJECT_EXT: 0x8b40,
    PROGRAM_PIPELINE_BINDING_EXT: 0x825a,
    PROGRAM_PIPELINE_OBJECT_EXT: 0x8a4f,
    PROGRAM_SEPARABLE_EXT: 0x8258,
    QCOM_alpha_test: 0x1,
    QCOM_binning_control: 0x1,
    QCOM_driver_control: 0x1,
    QCOM_extended_get: 0x1,
    QCOM_extended_get2: 0x1,
    QCOM_perfmon_global_mode: 0x1,
    QCOM_tiled_rendering: 0x1,
    QCOM_writeonly_rendering: 0x1,
    QUERY: 0x82e3,
    QUERY_OBJECT_EXT: 0x9153,
    QUERY_RESULT_AVAILABLE_EXT: 0x8867,
    QUERY_RESULT_EXT: 0x8866,
    R16F_EXT: 0x822d,
    R32F_EXT: 0x822e,
    R8_EXT: 0x8229,
    READ_BUFFER_EXT: 0xc02,
    READ_BUFFER_NV: 0xc02,
    READ_FRAMEBUFFER_ANGLE: 0x8ca8,
    READ_FRAMEBUFFER_APPLE: 0x8ca8,
    READ_FRAMEBUFFER_BINDING_ANGLE: 0x8caa,
    READ_FRAMEBUFFER_BINDING_APPLE: 0x8caa,
    READ_FRAMEBUFFER_BINDING_NV: 0x8caa,
    READ_FRAMEBUFFER_NV: 0x8ca8,
    RED_BITS: 0xd52,
    RED_EXT: 0x1903,
    RENDERBUFFER: 0x8d41,
    RENDERBUFFER_ALPHA_SIZE: 0x8d53,
    RENDERBUFFER_BINDING: 0x8ca7,
    RENDERBUFFER_BLUE_SIZE: 0x8d52,
    RENDERBUFFER_DEPTH_SIZE: 0x8d54,
    RENDERBUFFER_GREEN_SIZE: 0x8d51,
    RENDERBUFFER_HEIGHT: 0x8d43,
    RENDERBUFFER_INTERNAL_FORMAT: 0x8d44,
    RENDERBUFFER_RED_SIZE: 0x8d50,
    RENDERBUFFER_SAMPLES_ANGLE: 0x8cab,
    RENDERBUFFER_SAMPLES_APPLE: 0x8cab,
    RENDERBUFFER_SAMPLES_EXT: 0x8cab,
    RENDERBUFFER_SAMPLES_IMG: 0x9133,
    RENDERBUFFER_SAMPLES_NV: 0x8cab,
    RENDERBUFFER_STENCIL_SIZE: 0x8d55,
    RENDERBUFFER_WIDTH: 0x8d42,
    RENDERER: 0x1f01,
    RENDER_DIRECT_TO_FRAMEBUFFER_QCOM: 0x8fb3,
    REPEAT: 0x2901,
    REPLACE: 0x1e01,
    REQUIRED_TEXTURE_IMAGE_UNITS_OES: 0x8d68,
    RESET_NOTIFICATION_STRATEGY_EXT: 0x8256,
    RG16F_EXT: 0x822f,
    RG32F_EXT: 0x8230,
    RG8_EXT: 0x822b,
    RGB: 0x1907,
    RGB10_A2_EXT: 0x8059,
    RGB10_EXT: 0x8052,
    RGB16F_EXT: 0x881b,
    RGB32F_EXT: 0x8815,
    RGB565: 0x8d62,
    RGB565_OES: 0x8d62,
    RGB5_A1: 0x8057,
    RGB5_A1_OES: 0x8057,
    RGB8_OES: 0x8051,
    RGBA: 0x1908,
    RGBA16F_EXT: 0x881a,
    RGBA32F_EXT: 0x8814,
    RGBA4: 0x8056,
    RGBA4_OES: 0x8056,
    RGBA8_OES: 0x8058,
    RGB_422_APPLE: 0x8a1f,
    RG_EXT: 0x8227,
    RIGHT: 0x0407,
    SAMPLER: 0x82e6,
    SAMPLER_2D: 0x8b5e,
    SAMPLER_2D_ARRAY_SHADOW_NV: 0x8dc4,
    SAMPLER_2D_SHADOW_EXT: 0x8b62,
    SAMPLER_3D_OES: 0x8b5f,
    SAMPLER_CUBE: 0x8b60,
    SAMPLER_CUBE_SHADOW_NV: 0x8dc5,
    SAMPLER_EXTERNAL_OES: 0x8d66,
    SAMPLES: 0x80a9,
    SAMPLE_ALPHA_TO_COVERAGE: 0x809e,
    SAMPLE_BUFFERS: 0x80a8,
    SAMPLE_COVERAGE: 0x80a0,
    SAMPLE_COVERAGE_INVERT: 0x80ab,
    SAMPLE_COVERAGE_VALUE: 0x80aa,
    SCISSOR_BOX: 0xc10,
    SCISSOR_TEST: 0xc11,
    SGX_BINARY_IMG: 0x8c0a,
    SGX_PROGRAM_BINARY_IMG: 0x9130,
    SHADER: 0x82e1,
    SHADER_BINARY_DMP: 0x9250,
    SHADER_BINARY_FORMATS: 0x8df8,
    SHADER_BINARY_VIV: 0x8fc4,
    SHADER_COMPILER: 0x8dfa,
    SHADER_OBJECT_EXT: 0x8b48,
    SHADER_SOURCE_LENGTH: 0x8b88,
    SHADER_TYPE: 0x8b4f,
    SHADING_LANGUAGE_VERSION: 0x8b8c,
    SHORT: 0x1402,
    SIGNALED_APPLE: 0x9119,
    SLUMINANCE8_ALPHA8_NV: 0x8c45,
    SLUMINANCE8_NV: 0x8c47,
    SLUMINANCE_ALPHA_NV: 0x8c44,
    SLUMINANCE_NV: 0x8c46,
    SRC_ALPHA: 0x302,
    SRC_ALPHA_SATURATE: 0x308,
    SRC_COLOR: 0x300,
    SRGB8_ALPHA8_EXT: 0x8c43,
    SRGB8_NV: 0x8c41,
    SRGB_ALPHA_EXT: 0x8c42,
    SRGB_EXT: 0x8c40,
    STACK_OVERFLOW: 0x503,
    STACK_UNDERFLOW: 0x504,
    STATE_RESTORE: 0x8bdc,
    STATIC_DRAW: 0x88e4,
    STENCIL_ATTACHMENT: 0x8d20,
    STENCIL_BACK_FAIL: 0x8801,
    STENCIL_BACK_FUNC: 0x8800,
    STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
    STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
    STENCIL_BACK_REF: 0x8ca3,
    STENCIL_BACK_VALUE_MASK: 0x8ca4,
    STENCIL_BACK_WRITEMASK: 0x8ca5,
    STENCIL_BITS: 0xd57,
    STENCIL_BUFFER_BIT: 0x400,
    STENCIL_BUFFER_BIT0_QCOM: 0x10000,
    STENCIL_BUFFER_BIT1_QCOM: 0x20000,
    STENCIL_BUFFER_BIT2_QCOM: 0x40000,
    STENCIL_BUFFER_BIT3_QCOM: 0x80000,
    STENCIL_BUFFER_BIT4_QCOM: 0x100000,
    STENCIL_BUFFER_BIT5_QCOM: 0x200000,
    STENCIL_BUFFER_BIT6_QCOM: 0x400000,
    STENCIL_BUFFER_BIT7_QCOM: 0x800000,
    STENCIL_CLEAR_VALUE: 0xb91,
    STENCIL_EXT: 0x1802,
    STENCIL_FAIL: 0xb94,
    STENCIL_FUNC: 0xb92,
    STENCIL_INDEX1_OES: 0x8d46,
    STENCIL_INDEX4_OES: 0x8d47,
    STENCIL_INDEX: 0x1901,
    STENCIL_INDEX8: 0x8d48,
    STENCIL_PASS_DEPTH_FAIL: 0xb95,
    STENCIL_PASS_DEPTH_PASS: 0xb96,
    STENCIL_REF: 0xb97,
    STENCIL_TEST: 0xb90,
    STENCIL_VALUE_MASK: 0xb93,
    STENCIL_WRITEMASK: 0xb98,
    STREAM_DRAW: 0x88e0,
    SUBPIXEL_BITS: 0xd50,
    SYNC_CONDITION_APPLE: 0x9113,
    SYNC_FENCE_APPLE: 0x9116,
    SYNC_FLAGS_APPLE: 0x9115,
    SYNC_FLUSH_COMMANDS_BIT_APPLE: 0x1,
    SYNC_GPU_COMMANDS_COMPLETE_APPLE: 0x9117,
    SYNC_OBJECT_APPLE: 0x8a53,
    SYNC_STATUS_APPLE: 0x9114,
    TEXTURE: 0x1702,
    TEXTURE0: 0x84c0,
    TEXTURE1: 0x84c1,
    TEXTURE10: 0x84ca,
    TEXTURE11: 0x84cb,
    TEXTURE12: 0x84cc,
    TEXTURE13: 0x84cd,
    TEXTURE14: 0x84ce,
    TEXTURE15: 0x84cf,
    TEXTURE16: 0x84d0,
    TEXTURE17: 0x84d1,
    TEXTURE18: 0x84d2,
    TEXTURE19: 0x84d3,
    TEXTURE2: 0x84c2,
    TEXTURE20: 0x84d4,
    TEXTURE21: 0x84d5,
    TEXTURE22: 0x84d6,
    TEXTURE23: 0x84d7,
    TEXTURE24: 0x84d8,
    TEXTURE25: 0x84d9,
    TEXTURE26: 0x84da,
    TEXTURE27: 0x84db,
    TEXTURE28: 0x84dc,
    TEXTURE29: 0x84dd,
    TEXTURE3: 0x84c3,
    TEXTURE30: 0x84de,
    TEXTURE31: 0x84df,
    TEXTURE4: 0x84c4,
    TEXTURE5: 0x84c5,
    TEXTURE6: 0x84c6,
    TEXTURE7: 0x84c7,
    TEXTURE8: 0x84c8,
    TEXTURE9: 0x84c9,
    TEXTURE_2D: 0xde1,
    TEXTURE_3D_OES: 0x806f,
    TEXTURE_BINDING_2D: 0x8069,
    TEXTURE_BINDING_3D_OES: 0x806a,
    TEXTURE_BINDING_CUBE_MAP: 0x8514,
    TEXTURE_BINDING_EXTERNAL_OES: 0x8d67,
    TEXTURE_BORDER_COLOR_NV: 0x1004,
    TEXTURE_COMPARE_FUNC_EXT: 0x884d,
    TEXTURE_COMPARE_MODE_EXT: 0x884c,
    TEXTURE_CUBE_MAP: 0x8513,
    TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
    TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
    TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851a,
    TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
    TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
    TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
    TEXTURE_DEPTH_QCOM: 0x8bd4,
    TEXTURE_EXTERNAL_OES: 0x8d65,
    TEXTURE_FORMAT_QCOM: 0x8bd6,
    TEXTURE_HEIGHT_QCOM: 0x8bd3,
    TEXTURE_IMAGE_VALID_QCOM: 0x8bd8,
    TEXTURE_IMMUTABLE_FORMAT_EXT: 0x912f,
    TEXTURE_INTERNAL_FORMAT_QCOM: 0x8bd5,
    TEXTURE_MAG_FILTER: 0x2800,
    TEXTURE_MAX_ANISOTROPY_EXT: 0x84fe,
    TEXTURE_MAX_LEVEL_APPLE: 0x813d,
    TEXTURE_MIN_FILTER: 0x2801,
    TEXTURE_NUM_LEVELS_QCOM: 0x8bd9,
    TEXTURE_OBJECT_VALID_QCOM: 0x8bdb,
    TEXTURE_SAMPLES_IMG: 0x9136,
    TEXTURE_TARGET_QCOM: 0x8bda,
    TEXTURE_TYPE_QCOM: 0x8bd7,
    TEXTURE_USAGE_ANGLE: 0x93a2,
    TEXTURE_WIDTH_QCOM: 0x8bd2,
    TEXTURE_WRAP_R_OES: 0x8072,
    TEXTURE_WRAP_S: 0x2802,
    TEXTURE_WRAP_T: 0x2803,
    TIMEOUT_EXPIRED_APPLE: 0x911b,
    TIMEOUT_IGNORED_APPLE: 0xffffffffffffffff,
    TRANSLATED_SHADER_SOURCE_LENGTH_ANGLE: 0x93a0,
    TRIANGLES: 0x4,
    TRIANGLE_FAN: 0x6,
    TRIANGLE_STRIP: 0x5,
    TRUE: 0x1,
    UNKNOWN_CONTEXT_RESET_EXT: 0x8255,
    UNPACK_ALIGNMENT: 0xcf5,
    UNPACK_ROW_LENGTH: 0xcf2,
    UNPACK_SKIP_PIXELS: 0xcf4,
    UNPACK_SKIP_ROWS: 0xcf3,
    UNSIGNALED_APPLE: 0x9118,
    UNSIGNED_BYTE: 0x1401,
    UNSIGNED_INT: 0x1405,
    UNSIGNED_INT64_AMD: 0x8bc2,
    UNSIGNED_INT_10_10_10_2_OES: 0x8df6,
    UNSIGNED_INT_24_8_OES: 0x84fa,
    UNSIGNED_INT_2_10_10_10_REV_EXT: 0x8368,
    UNSIGNED_NORMALIZED_EXT: 0x8c17,
    UNSIGNED_SHORT: 0x1403,
    UNSIGNED_SHORT_1_5_5_5_REV_EXT: 0x8366,
    UNSIGNED_SHORT_4_4_4_4: 0x8033,
    UNSIGNED_SHORT_4_4_4_4_REV_EXT: 0x8365,
    UNSIGNED_SHORT_4_4_4_4_REV_IMG: 0x8365,
    UNSIGNED_SHORT_5_5_5_1: 0x8034,
    UNSIGNED_SHORT_5_6_5: 0x8363,
    UNSIGNED_SHORT_8_8_APPLE: 0x85ba,
    UNSIGNED_SHORT_8_8_REV_APPLE: 0x85bb,
    VALIDATE_STATUS: 0x8b83,
    VENDOR: 0x1f00,
    VERSION: 0x1f02,
    VERTEX_ARRAY_BINDING_OES: 0x85b5,
    VERTEX_ARRAY_OBJECT_EXT: 0x9154,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889f,
    VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: 0x88fe,
    VERTEX_ATTRIB_ARRAY_DIVISOR_NV: 0x88fe,
    VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
    VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886a,
    VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
    VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
    VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
    VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
    VERTEX_SHADER: 0x8b31,
    VERTEX_SHADER_BIT_EXT: 0x1,
    VIEWPORT: 0xba2,
    VIV_shader_binary: 0x1,
    WAIT_FAILED_APPLE: 0x911d,
    WRITEONLY_RENDERING_QCOM: 0x8823,
    WRITE_ONLY_OES: 0x88b9,
    Z400_BINARY_AMD: 0x8740,
    ZERO: 0x0,
    RASTERIZER_DISCARD: 0x8c89,
    UNPACK_FLIP_Y_WEBGL: 0x9240,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
    CONTEXT_LOST_WEBGL: 0x9242,
    UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,
    BROWSER_DEFAULT_WEBGL: 0x9244,
  };

  var URL = /*#__PURE__*/ (function () {
    /**
     * fake createObject, use base64 instead
     * @param blob
     */
    URL.createObjectURL = function createObjectURL(blob) {
      var buffer = blob.buffers[0];
      var type = typeof blob.type === "object" ? blob.type.type : blob.type;

      var base64 = _arrayBufferToBase64(buffer);

      var prefix = "data:" + type + ";base64,";
      return prefix + base64;
    };

    // todo: 完善URL对象
    function URL(url, host) {
      if (host === void 0) {
        host = "";
      }

      this.href = void 0;

      if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        this.href = url;
        return;
      }

      this.href = host + url;
    }

    return URL;
  })();

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  var Blob = /*#__PURE__*/ (function () {
    /**
     *
     * @param buffers only support zero index
     * @param type mimetype image/png image/webp...
     */
    function Blob(buffers, type) {
      this.buffers = buffers;
      this.type = type;
    }

    var _proto = Blob.prototype;

    _proto.arraybuffer = function arraybuffer() {
      return Promise.resolve(this.buffers[0]);
    };

    _proto.stream = function stream() {
      throw "not implemented";
    };

    _proto.text = function text() {
      throw "not implemented";
    };

    _proto.slice = function slice(start, end, contentType) {
      throw "not implemented";
    };

    return Blob;
  })();

  var ImageData = /*#__PURE__*/ (function () {
    function ImageData() {
      this._w = void 0;
      this._h = void 0;
      this._data = void 0;
      var len = arguments.length;

      if (len == 2) {
        if (
          typeof arguments[0] == "number" &&
          typeof arguments[1] == "number"
        ) {
          this._w = arguments[0];
          this._h = arguments[1];
          this._data = new Uint8ClampedArray(this._w * this._h * 4);
          return;
        }
      } else if (len == 3) {
        if (
          typeof arguments[0] == "object" &&
          typeof arguments[1] == "number" &&
          typeof arguments[2] == "number"
        ) {
          this._data = arguments[0];
          this._w = arguments[1];
          this._h = arguments[2];
        }
      }

      throw new Error("ImageData: params error");
    }

    _createClass(ImageData, [
      {
        key: "width",
        get: function get() {
          return this._w;
        },
      },
      {
        key: "height",
        get: function get() {
          return this._h;
        },
      },
      {
        key: "data",
        get: function get() {
          return this._data;
        },
      },
    ]);

    return ImageData;
  })();

  var location = {
    href: "",
  };

  var PointerEvent = /*#__PURE__*/ (function (_Event) {
    _inheritsLoose(PointerEvent, _Event);

    function PointerEvent(type) {
      var _this;

      _this = _Event.call(this, type) || this;
      _this.buttons = void 0;
      _this.which = void 0;
      _this.pointerId = void 0;
      _this.bubbles = void 0;
      _this.button = void 0;
      _this.width = void 0;
      _this.height = void 0;
      _this.pressure = void 0;
      _this.isPrimary = void 0;
      _this.pointerType = void 0;
      _this.altKey = void 0;
      _this.ctrlKey = void 0;
      _this.metaKey = void 0;
      _this.shiftKey = void 0;
      _this.target = getCanvas();
      _this.currentTarget = getCanvas();
      return _this;
    }

    return PointerEvent;
  })(Event);

  var CLONE_PROPS = [
    // MouseEvent
    "bubbles",
    "cancelable",
    "view",
    "detail",
    "screenX",
    "screenY",
    "clientX",
    "clientY",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "button",
    "relatedTarget", // PointerEvent
    "pointerId",
    "width",
    "height",
    "pressure",
    "tiltX",
    "tiltY",
    "pointerType",
    "hwTimestamp",
    "isPrimary", // event instance
    "pageX",
    "pageY",
    "timeStamp",
  ];
  var CLONE_DEFAULTS = [
    // MouseEvent
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null, // DOM Level 3
    0, // PointerEvent
    0,
    0,
    0,
    0,
    0,
    0,
    "",
    0,
    false, // event instance
    0,
    0,
    0,
  ];
  var POINTER_TYPE = "touch";

  function touchToPointer(type, touch, rawEvent) {
    var e = new PointerEvent(type);

    for (var i = 0; i < CLONE_PROPS.length; i++) {
      var p = CLONE_PROPS[i];
      e[p] = touch[p] || CLONE_DEFAULTS[i];
    }

    e.type = type;
    e.target = getCanvas();
    e.currentTarget = getCanvas();
    e.buttons = typeToButtons(type);
    e.which = e.buttons;
    e.pointerId = (touch.identifier || 0) + 2;
    e.bubbles = true;
    e.cancelable = true; // e.detail = this.clickCount;

    e.button = 0;
    e.width = (touch.radiusX || 0.5) * 2;
    e.height = (touch.radiusY || 0.5) * 2;
    e.pressure = touch.force || 0.5;
    e.isPrimary = isPrimaryPointer(touch);
    e.pointerType = POINTER_TYPE; // forward modifier keys

    e.altKey = rawEvent.altKey;
    e.ctrlKey = rawEvent.ctrlKey;
    e.metaKey = rawEvent.metaKey;
    e.shiftKey = rawEvent.shiftKey;

    if (rawEvent.preventDefault) {
      e.preventDefault = function () {
        rawEvent.preventDefault();
      };
    }

    return e;
  }

  function typeToButtons(type) {
    var ret = 0;

    if (
      type === "touchstart" ||
      type === "touchmove" ||
      type === "pointerdown" ||
      type === "pointermove"
    ) {
      ret = 1;
    }

    return ret;
  }

  var firstPointer = null;

  function isPrimaryPointer(touch) {
    return firstPointer === touch.identifier;
  }

  function setPrimaryPointer(touch) {
    if (firstPointer === null) {
      firstPointer = touch.identifier;
    }
  }

  function removePrimaryPointer(touch) {
    if (firstPointer === touch.identifier) {
      firstPointer = null;
    }
  }

  function eventHandlerFactory$1(type) {
    return function (rawEvent) {
      var changedTouches = rawEvent.changedTouches;

      for (var i = 0; i < changedTouches.length; i++) {
        var touch = changedTouches[i];

        if (i === 0 && type === "pointerdown") {
          setPrimaryPointer(touch);
        } else if (type === "pointerup" || type === "pointercancel") {
          removePrimaryPointer(touch);
        }

        var event = touchToPointer(type, touch, rawEvent);
        document.dispatchEvent(event);
      }
    };
  }

  var dispatchPointerDown = eventHandlerFactory$1("pointerdown");
  var dispatchPointerMove = eventHandlerFactory$1("pointermove");
  var dispatchPointerUp = eventHandlerFactory$1("pointerup");

  function eventHandlerFactory(type) {
    return function (rawEvent) {
      rawEvent.type = type;
      document.dispatchEvent(rawEvent);
    };
  }

  var dispatchMouseDown = eventHandlerFactory("mousedown");
  var dispatchMouseMove = eventHandlerFactory("mousemove");
  var dispatchMouseUp = eventHandlerFactory("mouseup");

  var window$1 = {
    atob: atob,
    btoa: btoa,
    devicePixelRatio: devicePixelRatio,
    Blob: Blob,
    document: document,
    Element: Element,
    Event: Event,
    EventTarget: EventTarget,
    HTMLCanvasElement: HTMLCanvasElement,
    HTMLElement: HTMLElement,
    HTMLMediaElement: HTMLMediaElement,
    HTMLVideoElement: HTMLVideoElement,
    Image: Image,
    navigator: navigator,
    Node: Node,
    requestAnimationFrame: requestAnimationFrame,
    cancelAnimationFrame: cancelAnimationFrame,
    screen: screen,
    XMLHttpRequest: XMLHttpRequest,
    performance: performance,
    URL: URL,
    WebGLRenderingContext: WebGLRenderingContext,
    WebGL2RenderingContext: WebGL2RenderingContext,
    addEventListener: function addEventListener(type, listener, options) {
      if (options === void 0) {
        options = {};
      }

      document.addEventListener(type, listener, options);
    },
    removeEventListener: function removeEventListener(type, listener) {
      document.removeEventListener(type, listener);
    },
    dispatchEvent: function dispatchEvent(event) {
      document.dispatchEvent(event);
    },
    innerWidth: screen.availWidth,
    innerHeight: screen.availHeight,
  };

  exports.$XMLHttpRequest = XMLHttpRequest;
  exports.$document = document;
  exports.$location = location;
  exports.$window = window$1;
  exports.Blob = Blob;
  exports.Element = Element;
  exports.Event = Event;
  exports.EventTarget = EventTarget;
  exports.HTMLCanvasElement = HTMLCanvasElement;
  exports.HTMLElement = HTMLElement;
  exports.HTMLMediaElement = HTMLMediaElement;
  exports.HTMLVideoElement = HTMLVideoElement;
  exports.Image = Image;
  exports.ImageData = ImageData;
  exports.Node = Node;
  exports.URL = URL;
  exports.WebGL2RenderingContext = WebGL2RenderingContext;
  exports.WebGLRenderingContext = WebGLRenderingContext;
  exports.XMLHttpRequest = XMLHttpRequest;
  exports.atob = atob;
  exports.btoa = btoa;
  exports.cancelAnimationFrame = cancelAnimationFrame;
  exports.devicePixelRatio = devicePixelRatio;
  exports.dispatchMouseDown = dispatchMouseDown;
  exports.dispatchMouseMove = dispatchMouseMove;
  exports.dispatchMouseUp = dispatchMouseUp;
  exports.dispatchPointerDown = dispatchPointerDown;
  exports.dispatchPointerMove = dispatchPointerMove;
  exports.dispatchPointerUp = dispatchPointerUp;
  exports.dispatchTouchCancel = dispatchTouchCancel;
  exports.dispatchTouchEnd = dispatchTouchEnd;
  exports.dispatchTouchMove = dispatchTouchMove;
  exports.dispatchTouchStart = dispatchTouchStart;
  exports.document = document;
  exports.location = location;
  exports.navigator = navigator;
  exports.performance = performance;
  exports.registerCanvas = registerCanvas;
  exports.registerCanvas2D = registerCanvas2D;
  exports.registerMiniGame = registerMiniGame;
  exports.requestAnimationFrame = requestAnimationFrame;
  exports.screen = screen;
  exports.window = window$1;

  Object.defineProperty(exports, "__esModule", { value: true });
});
