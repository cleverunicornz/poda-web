var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../apps/web/node_modules/.pnpm/events@3.3.0/node_modules/events/events.js
var require_events = __commonJS({
  "../../apps/web/node_modules/.pnpm/events@3.3.0/node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/Capabilities.js
var require_Capabilities = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/Capabilities.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.VideoConferenceCapabilities = exports.StickerpickerCapabilities = exports.MatrixCapabilities = void 0;
    exports.getTimelineRoomIDFromCapability = getTimelineRoomIDFromCapability;
    exports.isTimelineCapability = isTimelineCapability;
    exports.isTimelineCapabilityFor = isTimelineCapabilityFor;
    var MatrixCapabilities = /* @__PURE__ */ (function(MatrixCapabilities2) {
      MatrixCapabilities2["Screenshots"] = "m.capability.screenshot";
      MatrixCapabilities2["StickerSending"] = "m.sticker";
      MatrixCapabilities2["AlwaysOnScreen"] = "m.always_on_screen";
      MatrixCapabilities2["RequiresClient"] = "io.element.requires_client";
      MatrixCapabilities2["MSC2931Navigate"] = "org.matrix.msc2931.navigate";
      MatrixCapabilities2["MSC3846TurnServers"] = "town.robin.msc3846.turn_servers";
      MatrixCapabilities2["MSC3973UserDirectorySearch"] = "org.matrix.msc3973.user_directory_search";
      MatrixCapabilities2["MSC4039UploadFile"] = "org.matrix.msc4039.upload_file";
      MatrixCapabilities2["MSC4039DownloadFile"] = "org.matrix.msc4039.download_file";
      MatrixCapabilities2["MSC4157SendDelayedEvent"] = "org.matrix.msc4157.send.delayed_event";
      MatrixCapabilities2["MSC4157UpdateDelayedEvent"] = "org.matrix.msc4157.update_delayed_event";
      MatrixCapabilities2["MSC4407SendStickyEvent"] = "org.matrix.msc4407.send.sticky_event";
      MatrixCapabilities2["MSC4407ReceiveStickyEvent"] = "org.matrix.msc4407.receive.sticky_event";
      MatrixCapabilities2["MSC4515RtcTransports"] = "org.matrix.msc4515.rtc_transports";
      MatrixCapabilities2["MSC4533RtcLivekitGetToken"] = "org.matrix.msc4533.rtc_livekit_get_token";
      MatrixCapabilities2["MSC4533RtcLivekitDelegateDelayedLeave"] = "org.matrix.msc4533.rtc_livekit_delegate_delayed_leave";
      return MatrixCapabilities2;
    })({});
    exports.MatrixCapabilities = MatrixCapabilities;
    var StickerpickerCapabilities = [MatrixCapabilities.StickerSending];
    exports.StickerpickerCapabilities = StickerpickerCapabilities;
    var VideoConferenceCapabilities = [MatrixCapabilities.AlwaysOnScreen];
    exports.VideoConferenceCapabilities = VideoConferenceCapabilities;
    function isTimelineCapability(capability) {
      return capability === null || capability === void 0 ? void 0 : capability.startsWith("org.matrix.msc2762.timeline:");
    }
    function isTimelineCapabilityFor(capability, roomId) {
      return capability === "org.matrix.msc2762.timeline:".concat(roomId);
    }
    function getTimelineRoomIDFromCapability(capability) {
      return capability.substring(capability.indexOf(":") + 1);
    }
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetApiDirection.js
var require_WidgetApiDirection = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetApiDirection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetApiDirection = void 0;
    exports.invertedDirection = invertedDirection;
    var WidgetApiDirection = /* @__PURE__ */ (function(WidgetApiDirection2) {
      WidgetApiDirection2["ToWidget"] = "toWidget";
      WidgetApiDirection2["FromWidget"] = "fromWidget";
      return WidgetApiDirection2;
    })({});
    exports.WidgetApiDirection = WidgetApiDirection;
    function invertedDirection(dir) {
      if (dir === WidgetApiDirection.ToWidget) {
        return WidgetApiDirection.FromWidget;
      } else if (dir === WidgetApiDirection.FromWidget) {
        return WidgetApiDirection.ToWidget;
      } else {
        throw new Error("Invalid direction");
      }
    }
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/ApiVersion.js
var require_ApiVersion = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/ApiVersion.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UnstableApiVersion = exports.MatrixApiVersion = exports.CurrentApiVersions = void 0;
    var MatrixApiVersion = /* @__PURE__ */ (function(MatrixApiVersion2) {
      MatrixApiVersion2["Prerelease1"] = "0.0.1";
      MatrixApiVersion2["Prerelease2"] = "0.0.2";
      return MatrixApiVersion2;
    })({});
    exports.MatrixApiVersion = MatrixApiVersion;
    var UnstableApiVersion = /* @__PURE__ */ (function(UnstableApiVersion2) {
      UnstableApiVersion2["MSC2762"] = "org.matrix.msc2762";
      UnstableApiVersion2["MSC2762_UPDATE_STATE"] = "org.matrix.msc2762_update_state";
      UnstableApiVersion2["MSC2871"] = "org.matrix.msc2871";
      UnstableApiVersion2["MSC2873"] = "org.matrix.msc2873";
      UnstableApiVersion2["MSC2931"] = "org.matrix.msc2931";
      UnstableApiVersion2["MSC2974"] = "org.matrix.msc2974";
      UnstableApiVersion2["MSC2876"] = "org.matrix.msc2876";
      UnstableApiVersion2["MSC3819"] = "org.matrix.msc3819";
      UnstableApiVersion2["MSC3846"] = "town.robin.msc3846";
      UnstableApiVersion2["MSC3869"] = "org.matrix.msc3869";
      UnstableApiVersion2["MSC3973"] = "org.matrix.msc3973";
      UnstableApiVersion2["MSC4039"] = "org.matrix.msc4039";
      UnstableApiVersion2["MSC4515"] = "org.matrix.msc4515";
      UnstableApiVersion2["MSC4533"] = "org.matrix.msc4533";
      return UnstableApiVersion2;
    })({});
    exports.UnstableApiVersion = UnstableApiVersion;
    var CurrentApiVersions = [
      MatrixApiVersion.Prerelease1,
      MatrixApiVersion.Prerelease2,
      //MatrixApiVersion.V010,
      UnstableApiVersion.MSC2762,
      UnstableApiVersion.MSC2762_UPDATE_STATE,
      UnstableApiVersion.MSC2871,
      UnstableApiVersion.MSC2873,
      UnstableApiVersion.MSC2931,
      UnstableApiVersion.MSC2974,
      UnstableApiVersion.MSC2876,
      UnstableApiVersion.MSC3819,
      UnstableApiVersion.MSC3846,
      UnstableApiVersion.MSC3869,
      UnstableApiVersion.MSC3973,
      UnstableApiVersion.MSC4039,
      UnstableApiVersion.MSC4515,
      UnstableApiVersion.MSC4533
    ];
    exports.CurrentApiVersions = CurrentApiVersions;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/transport/PostmessageTransport.js
var require_PostmessageTransport = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/transport/PostmessageTransport.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PostmessageTransport = void 0;
    var _events = require_events();
    var _ = require_lib();
    var _excluded = ["message"];
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _objectWithoutProperties(e, t) {
      if (null == e) return {};
      var o, r, i = _objectWithoutPropertiesLoose(e, t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
      }
      return i;
    }
    function _objectWithoutPropertiesLoose(r, e) {
      if (null == r) return {};
      var t = {};
      for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
      }
      return t;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _inherits(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
    }
    function _setPrototypeOf(t, e) {
      return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
        return t2.__proto__ = e2, t2;
      }, _setPrototypeOf(t, e);
    }
    function _createSuper(t) {
      var r = _isNativeReflectConstruct();
      return function() {
        var e, o = _getPrototypeOf(t);
        if (r) {
          var s = _getPrototypeOf(this).constructor;
          e = Reflect.construct(o, arguments, s);
        } else e = o.apply(this, arguments);
        return _possibleConstructorReturn(this, e);
      };
    }
    function _possibleConstructorReturn(t, e) {
      if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(t);
    }
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function _isNativeReflectConstruct() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch (t2) {
      }
      return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
      })();
    }
    function _getPrototypeOf(t) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
        return t2.__proto__ || Object.getPrototypeOf(t2);
      }, _getPrototypeOf(t);
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var PostmessageTransport = /* @__PURE__ */ (function(_EventEmitter) {
      _inherits(PostmessageTransport2, _EventEmitter);
      var _super = _createSuper(PostmessageTransport2);
      function PostmessageTransport2(sendDirection, initialWidgetId, transportWindow, inboundWindow) {
        var _this;
        _classCallCheck(this, PostmessageTransport2);
        _this = _super.call(this);
        _this.sendDirection = sendDirection;
        _this.transportWindow = transportWindow;
        _this.inboundWindow = inboundWindow;
        _defineProperty(_assertThisInitialized(_this), "strictOriginCheck", false);
        _defineProperty(_assertThisInitialized(_this), "targetOrigin", "*");
        _defineProperty(_assertThisInitialized(_this), "timeoutSeconds", 10);
        _defineProperty(_assertThisInitialized(_this), "_ready", false);
        _defineProperty(_assertThisInitialized(_this), "_widgetId", void 0);
        _defineProperty(_assertThisInitialized(_this), "outboundRequests", /* @__PURE__ */ new Map());
        _defineProperty(_assertThisInitialized(_this), "stopController", new AbortController());
        _defineProperty(_assertThisInitialized(_this), "handleMessage", function(ev) {
          if (_this.stopController.signal.aborted) return;
          if (!ev.data) return;
          if (_this.strictOriginCheck && ev.origin !== globalThis.origin) return;
          var response = ev.data;
          if (!response.action || !response.requestId || !response.widgetId) return;
          if (response.response) {
            if (response.api !== _this.sendDirection) return;
            _this.handleResponse(response);
          } else {
            var request = response;
            if (request.api !== (0, _.invertedDirection)(_this.sendDirection)) return;
            _this.handleRequest(request);
          }
        });
        _this._widgetId = initialWidgetId;
        return _this;
      }
      _createClass(PostmessageTransport2, [{
        key: "ready",
        get: function get() {
          return this._ready;
        }
      }, {
        key: "widgetId",
        get: function get() {
          return this._widgetId || null;
        }
      }, {
        key: "nextRequestId",
        get: function get() {
          var idBase = "widgetapi-".concat(Date.now());
          var index = 0;
          var id = idBase;
          while (this.outboundRequests.has(id)) {
            id = "".concat(idBase, "-").concat(index++);
          }
          this.outboundRequests.set(id, null);
          return id;
        }
      }, {
        key: "sendInternal",
        value: function sendInternal(message) {
          console.log("[PostmessageTransport] Sending object to ".concat(this.targetOrigin, ": "), message);
          this.transportWindow.postMessage(message, this.targetOrigin);
        }
      }, {
        key: "reply",
        value: function reply(request, responseData) {
          return this.sendInternal(_objectSpread(_objectSpread({}, request), {}, {
            response: responseData
          }));
        }
      }, {
        key: "send",
        value: function send(action, data) {
          return this.sendComplete(action, data).then(function(r) {
            return r.response;
          });
        }
      }, {
        key: "sendComplete",
        value: function sendComplete(action, data) {
          var _this2 = this;
          if (!this.ready || !this.widgetId) {
            return Promise.reject(new Error("Not ready or unknown widget ID"));
          }
          var request = {
            api: this.sendDirection,
            widgetId: this.widgetId,
            requestId: this.nextRequestId,
            action,
            data
          };
          if (action === _.WidgetApiToWidgetAction.UpdateVisibility) {
            request["visible"] = data["visible"];
          }
          return new Promise(function(prResolve, prReject) {
            var resolve = function resolve2(response) {
              cleanUp();
              prResolve(response);
            };
            var reject = function reject2(err) {
              cleanUp();
              prReject(err);
            };
            var timerId = setTimeout(function() {
              return reject(new Error("Request timed out"));
            }, (_this2.timeoutSeconds || 1) * 1e3);
            var onStop = function onStop2() {
              return reject(new Error("Transport stopped"));
            };
            _this2.stopController.signal.addEventListener("abort", onStop);
            var cleanUp = function cleanUp2() {
              _this2.outboundRequests["delete"](request.requestId);
              clearTimeout(timerId);
              _this2.stopController.signal.removeEventListener("abort", onStop);
            };
            _this2.outboundRequests.set(request.requestId, {
              request,
              resolve,
              reject
            });
            _this2.sendInternal(request);
          });
        }
      }, {
        key: "start",
        value: function start() {
          this.inboundWindow.addEventListener("message", this.handleMessage);
          this._ready = true;
        }
      }, {
        key: "stop",
        value: function stop() {
          this._ready = false;
          this.stopController.abort();
          this.inboundWindow.removeEventListener("message", this.handleMessage);
        }
      }, {
        key: "handleRequest",
        value: function handleRequest(request) {
          if (this.widgetId) {
            if (this.widgetId !== request.widgetId) return;
          } else {
            this._widgetId = request.widgetId;
          }
          this.emit("message", new CustomEvent("message", {
            detail: request
          }));
        }
      }, {
        key: "handleResponse",
        value: function handleResponse(response) {
          if (response.widgetId !== this.widgetId) return;
          var req = this.outboundRequests.get(response.requestId);
          if (!req) return;
          if ((0, _.isErrorResponse)(response.response)) {
            var _response$response$er = response.response.error, message = _response$response$er.message, data = _objectWithoutProperties(_response$response$er, _excluded);
            req.reject(new _.WidgetApiResponseError(message, data));
          } else {
            req.resolve(response);
          }
        }
      }]);
      return PostmessageTransport2;
    })(_events.EventEmitter);
    exports.PostmessageTransport = PostmessageTransport;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetApiAction.js
var require_WidgetApiAction = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetApiAction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetApiToWidgetAction = exports.WidgetApiFromWidgetAction = void 0;
    var WidgetApiToWidgetAction = /* @__PURE__ */ (function(WidgetApiToWidgetAction2) {
      WidgetApiToWidgetAction2["SupportedApiVersions"] = "supported_api_versions";
      WidgetApiToWidgetAction2["Capabilities"] = "capabilities";
      WidgetApiToWidgetAction2["NotifyCapabilities"] = "notify_capabilities";
      WidgetApiToWidgetAction2["ThemeChange"] = "theme_change";
      WidgetApiToWidgetAction2["LanguageChange"] = "language_change";
      WidgetApiToWidgetAction2["TakeScreenshot"] = "screenshot";
      WidgetApiToWidgetAction2["UpdateVisibility"] = "visibility";
      WidgetApiToWidgetAction2["OpenIDCredentials"] = "openid_credentials";
      WidgetApiToWidgetAction2["WidgetConfig"] = "widget_config";
      WidgetApiToWidgetAction2["CloseModalWidget"] = "close_modal";
      WidgetApiToWidgetAction2["ButtonClicked"] = "button_clicked";
      WidgetApiToWidgetAction2["SendEvent"] = "send_event";
      WidgetApiToWidgetAction2["SendToDevice"] = "send_to_device";
      WidgetApiToWidgetAction2["UpdateState"] = "update_state";
      WidgetApiToWidgetAction2["UpdateTurnServers"] = "update_turn_servers";
      return WidgetApiToWidgetAction2;
    })({});
    exports.WidgetApiToWidgetAction = WidgetApiToWidgetAction;
    var WidgetApiFromWidgetAction = /* @__PURE__ */ (function(WidgetApiFromWidgetAction2) {
      WidgetApiFromWidgetAction2["SupportedApiVersions"] = "supported_api_versions";
      WidgetApiFromWidgetAction2["ContentLoaded"] = "content_loaded";
      WidgetApiFromWidgetAction2["SendSticker"] = "m.sticker";
      WidgetApiFromWidgetAction2["UpdateAlwaysOnScreen"] = "set_always_on_screen";
      WidgetApiFromWidgetAction2["GetOpenIDCredentials"] = "get_openid";
      WidgetApiFromWidgetAction2["CloseModalWidget"] = "close_modal";
      WidgetApiFromWidgetAction2["OpenModalWidget"] = "open_modal";
      WidgetApiFromWidgetAction2["SetModalButtonEnabled"] = "set_button_enabled";
      WidgetApiFromWidgetAction2["SendEvent"] = "send_event";
      WidgetApiFromWidgetAction2["SendToDevice"] = "send_to_device";
      WidgetApiFromWidgetAction2["WatchTurnServers"] = "watch_turn_servers";
      WidgetApiFromWidgetAction2["UnwatchTurnServers"] = "unwatch_turn_servers";
      WidgetApiFromWidgetAction2["BeeperReadRoomAccountData"] = "com.beeper.read_room_account_data";
      WidgetApiFromWidgetAction2["MSC2876ReadEvents"] = "org.matrix.msc2876.read_events";
      WidgetApiFromWidgetAction2["MSC2931Navigate"] = "org.matrix.msc2931.navigate";
      WidgetApiFromWidgetAction2["MSC2974RenegotiateCapabilities"] = "org.matrix.msc2974.request_capabilities";
      WidgetApiFromWidgetAction2["MSC3869ReadRelations"] = "org.matrix.msc3869.read_relations";
      WidgetApiFromWidgetAction2["MSC3973UserDirectorySearch"] = "org.matrix.msc3973.user_directory_search";
      WidgetApiFromWidgetAction2["MSC4039GetMediaConfigAction"] = "org.matrix.msc4039.get_media_config";
      WidgetApiFromWidgetAction2["MSC4039UploadFileAction"] = "org.matrix.msc4039.upload_file";
      WidgetApiFromWidgetAction2["MSC4039DownloadFileAction"] = "org.matrix.msc4039.download_file";
      WidgetApiFromWidgetAction2["MSC4157UpdateDelayedEvent"] = "org.matrix.msc4157.update_delayed_event";
      WidgetApiFromWidgetAction2["MSC4515GetRtcTransports"] = "org.matrix.msc4515.get_rtc_transports";
      WidgetApiFromWidgetAction2["MSC4533RtcLivekitGetToken"] = "org.matrix.msc4533.rtc_livekit_get_token";
      WidgetApiFromWidgetAction2["MSC4533RtcLivekitDelegateDelayedLeave"] = "org.matrix.msc4533.rtc_livekit_delegate_delayed_leave";
      return WidgetApiFromWidgetAction2;
    })({});
    exports.WidgetApiFromWidgetAction = WidgetApiFromWidgetAction;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/GetOpenIDAction.js
var require_GetOpenIDAction = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/GetOpenIDAction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.OpenIDRequestState = void 0;
    var OpenIDRequestState = /* @__PURE__ */ (function(OpenIDRequestState2) {
      OpenIDRequestState2["Allowed"] = "allowed";
      OpenIDRequestState2["Blocked"] = "blocked";
      OpenIDRequestState2["PendingUserConfirmation"] = "request";
      return OpenIDRequestState2;
    })({});
    exports.OpenIDRequestState = OpenIDRequestState;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetType.js
var require_WidgetType = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MatrixWidgetType = void 0;
    var MatrixWidgetType = /* @__PURE__ */ (function(MatrixWidgetType2) {
      MatrixWidgetType2["Custom"] = "m.custom";
      MatrixWidgetType2["JitsiMeet"] = "m.jitsi";
      MatrixWidgetType2["Stickerpicker"] = "m.stickerpicker";
      return MatrixWidgetType2;
    })({});
    exports.MatrixWidgetType = MatrixWidgetType;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/ModalWidgetActions.js
var require_ModalWidgetActions = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/ModalWidgetActions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BuiltInModalButtonID = void 0;
    var BuiltInModalButtonID = /* @__PURE__ */ (function(BuiltInModalButtonID2) {
      BuiltInModalButtonID2["Close"] = "m.close";
      return BuiltInModalButtonID2;
    })({});
    exports.BuiltInModalButtonID = BuiltInModalButtonID;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/WidgetEventCapability.js
var require_WidgetEventCapability = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/WidgetEventCapability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetEventCapability = exports.EventKind = exports.EventDirection = void 0;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var EventKind = /* @__PURE__ */ (function(EventKind2) {
      EventKind2["Event"] = "event";
      EventKind2["State"] = "state_event";
      EventKind2["ToDevice"] = "to_device";
      EventKind2["RoomAccount"] = "room_account";
      return EventKind2;
    })({});
    exports.EventKind = EventKind;
    var EventDirection = /* @__PURE__ */ (function(EventDirection2) {
      EventDirection2["Send"] = "send";
      EventDirection2["Receive"] = "receive";
      return EventDirection2;
    })({});
    exports.EventDirection = EventDirection;
    var WidgetEventCapability = /* @__PURE__ */ (function() {
      function WidgetEventCapability2(direction, eventType, kind, keyStr, raw) {
        _classCallCheck(this, WidgetEventCapability2);
        this.direction = direction;
        this.eventType = eventType;
        this.kind = kind;
        this.keyStr = keyStr;
        this.raw = raw;
      }
      _createClass(WidgetEventCapability2, [{
        key: "matchesAsStateEvent",
        value: function matchesAsStateEvent(direction, eventType, stateKey) {
          if (this.kind !== EventKind.State) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          if (this.keyStr === null) return true;
          if (this.keyStr === stateKey) return true;
          return false;
        }
      }, {
        key: "matchesAsToDeviceEvent",
        value: function matchesAsToDeviceEvent(direction, eventType) {
          if (this.kind !== EventKind.ToDevice) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          return true;
        }
      }, {
        key: "matchesAsRoomEvent",
        value: function matchesAsRoomEvent(direction, eventType) {
          var msgtype = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          if (this.kind !== EventKind.Event) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          if (this.eventType === "m.room.message") {
            if (this.keyStr === null) return true;
            if (this.keyStr === msgtype) return true;
          } else {
            return true;
          }
          return false;
        }
      }, {
        key: "matchesAsRoomAccountData",
        value: function matchesAsRoomAccountData(direction, eventType) {
          if (this.kind !== EventKind.RoomAccount) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          return true;
        }
      }], [{
        key: "forStateEvent",
        value: function forStateEvent(direction, eventType, stateKey) {
          eventType = eventType.replace(/#/g, "\\#");
          stateKey = stateKey !== null && stateKey !== void 0 ? "#".concat(stateKey) : "";
          var str = "org.matrix.msc2762.".concat(direction, ".state_event:").concat(eventType).concat(stateKey);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forToDeviceEvent",
        value: function forToDeviceEvent(direction, eventType) {
          var str = "org.matrix.msc3819.".concat(direction, ".to_device:").concat(eventType);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forRoomEvent",
        value: function forRoomEvent(direction, eventType) {
          var str = "org.matrix.msc2762.".concat(direction, ".event:").concat(eventType);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forRoomMessageEvent",
        value: function forRoomMessageEvent(direction, msgtype) {
          msgtype = msgtype === null || msgtype === void 0 ? "" : msgtype;
          var str = "org.matrix.msc2762.".concat(direction, ".event:m.room.message#").concat(msgtype);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forRoomAccountData",
        value: function forRoomAccountData(direction, eventType) {
          var str = "com.beeper.capabilities.".concat(direction, ".room_account_data:").concat(eventType);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
        /**
         * Parses a capabilities request to find all the event capability requests.
         * @param {Iterable<Capability>} capabilities The capabilities requested/to parse.
         * @returns {WidgetEventCapability[]} An array of event capability requests. May be empty, but never null.
         */
      }, {
        key: "findEventCapabilities",
        value: function findEventCapabilities(capabilities) {
          var parsed = [];
          var _iterator = _createForOfIteratorHelper(capabilities), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var cap = _step.value;
              var _direction = null;
              var eventSegment = void 0;
              var _kind = null;
              if (cap.startsWith("org.matrix.msc2762.send.event:")) {
                _direction = EventDirection.Send;
                _kind = EventKind.Event;
                eventSegment = cap.substring("org.matrix.msc2762.send.event:".length);
              } else if (cap.startsWith("org.matrix.msc2762.send.state_event:")) {
                _direction = EventDirection.Send;
                _kind = EventKind.State;
                eventSegment = cap.substring("org.matrix.msc2762.send.state_event:".length);
              } else if (cap.startsWith("org.matrix.msc3819.send.to_device:")) {
                _direction = EventDirection.Send;
                _kind = EventKind.ToDevice;
                eventSegment = cap.substring("org.matrix.msc3819.send.to_device:".length);
              } else if (cap.startsWith("org.matrix.msc2762.receive.event:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.Event;
                eventSegment = cap.substring("org.matrix.msc2762.receive.event:".length);
              } else if (cap.startsWith("org.matrix.msc2762.receive.state_event:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.State;
                eventSegment = cap.substring("org.matrix.msc2762.receive.state_event:".length);
              } else if (cap.startsWith("org.matrix.msc3819.receive.to_device:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.ToDevice;
                eventSegment = cap.substring("org.matrix.msc3819.receive.to_device:".length);
              } else if (cap.startsWith("com.beeper.capabilities.receive.room_account_data:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.RoomAccount;
                eventSegment = cap.substring("com.beeper.capabilities.receive.room_account_data:".length);
              }
              if (_direction === null || _kind === null || eventSegment === void 0) continue;
              var expectingKeyStr = eventSegment.startsWith("m.room.message#") || _kind === EventKind.State;
              var _keyStr = null;
              if (eventSegment.includes("#") && expectingKeyStr) {
                var parts = eventSegment.split("#");
                var idx = parts.findIndex(function(p) {
                  return !p.endsWith("\\");
                });
                eventSegment = parts.slice(0, idx + 1).map(function(p) {
                  return p.endsWith("\\") ? p.substring(0, p.length - 1) : p;
                }).join("#");
                _keyStr = parts.slice(idx + 1).join("#");
              }
              parsed.push(new WidgetEventCapability2(_direction, eventSegment, _kind, _keyStr, cap));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return parsed;
        }
      }]);
      return WidgetEventCapability2;
    })();
    exports.WidgetEventCapability = WidgetEventCapability;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/Symbols.js
var require_Symbols = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/Symbols.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Symbols = void 0;
    var Symbols = /* @__PURE__ */ (function(Symbols2) {
      Symbols2["AnyRoom"] = "*";
      return Symbols2;
    })({});
    exports.Symbols = Symbols;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/UpdateDelayedEventAction.js
var require_UpdateDelayedEventAction = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/UpdateDelayedEventAction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UpdateDelayedEventAction = void 0;
    var UpdateDelayedEventAction = /* @__PURE__ */ (function(UpdateDelayedEventAction2) {
      UpdateDelayedEventAction2["Cancel"] = "cancel";
      UpdateDelayedEventAction2["Restart"] = "restart";
      UpdateDelayedEventAction2["Send"] = "send";
      return UpdateDelayedEventAction2;
    })({});
    exports.UpdateDelayedEventAction = UpdateDelayedEventAction;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/WidgetApi.js
var require_WidgetApi = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/WidgetApi.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetApiResponseError = exports.WidgetApi = void 0;
    var _events = require_events();
    var _Capabilities = require_Capabilities();
    var _WidgetApiDirection = require_WidgetApiDirection();
    var _ApiVersion = require_ApiVersion();
    var _PostmessageTransport = require_PostmessageTransport();
    var _WidgetApiAction = require_WidgetApiAction();
    var _GetOpenIDAction = require_GetOpenIDAction();
    var _WidgetType = require_WidgetType();
    var _ModalWidgetActions = require_ModalWidgetActions();
    var _WidgetEventCapability = require_WidgetEventCapability();
    var _Symbols = require_Symbols();
    var _UpdateDelayedEventAction = require_UpdateDelayedEventAction();
    function _regeneratorRuntime() {
      "use strict";
      var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
      function n(r2) {
        var e2 = "function" == typeof r2 && r2.constructor;
        return !!e2 && (e2 === t || "GeneratorFunction" === (e2.displayName || e2.name));
      }
      var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 };
      function a(r2) {
        var e2, t2;
        return function(n2) {
          e2 || (e2 = { stop: function stop() {
            return t2(n2.a, 2);
          }, "catch": function _catch() {
            return n2.v;
          }, abrupt: function abrupt(r3, e3) {
            return t2(n2.a, o[r3], e3);
          }, delegateYield: function delegateYield(r3, o2, a2) {
            return e2.resultName = o2, t2(n2.d, _regeneratorValues(r3), a2);
          }, finish: function finish(r3) {
            return t2(n2.f, r3);
          } }, t2 = function t3(r3, _t, o2) {
            n2.p = e2.prev, n2.n = e2.next;
            try {
              return r3(_t, o2);
            } finally {
              e2.next = n2.n;
            }
          }), e2.resultName && (e2[e2.resultName] = n2.v, e2.resultName = void 0), e2.sent = n2.v, e2.next = n2.n;
          try {
            return r2.call(this, e2);
          } finally {
            n2.p = e2.prev, n2.n = e2.next;
          }
        };
      }
      return (_regeneratorRuntime = function _regeneratorRuntime2() {
        return { wrap: function wrap(e2, t2, n2, o2) {
          return r.w(a(e2), t2, n2, o2 && o2.reverse());
        }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r2, e2) {
          return new _OverloadYield(r2, e2);
        }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r2, e2, t2, o2, u) {
          return (n(e2) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r2), e2, t2, o2, u);
        }, keys: _regeneratorKeys, values: _regeneratorValues };
      })();
    }
    function _regeneratorValues(e) {
      if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return { next: function next() {
          return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
        } };
      }
      throw new TypeError(_typeof(e) + " is not iterable");
    }
    function _regeneratorKeys(e) {
      var n = Object(e), r = [];
      for (var t in n) r.unshift(t);
      return function e2() {
        for (; r.length; ) if ((t = r.pop()) in n) return e2.value = t, e2.done = false, e2;
        return e2.done = true, e2;
      };
    }
    function _regeneratorAsync(n, e, r, t, o) {
      var a = _regeneratorAsyncGen(n, e, r, t, o);
      return a.next().then(function(n2) {
        return n2.done ? n2.value : a.next();
      });
    }
    function _regeneratorAsyncGen(r, e, t, o, n) {
      return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise);
    }
    function _regeneratorAsyncIterator(t, e) {
      function n(r2, o, i, f) {
        try {
          var c = t[r2](o), u = c.value;
          return u instanceof _OverloadYield ? e.resolve(u.v).then(function(t2) {
            n("next", t2, i, f);
          }, function(t2) {
            n("throw", t2, i, f);
          }) : e.resolve(u).then(function(t2) {
            c.value = t2, i(c);
          }, function(t2) {
            return n("throw", t2, i, f);
          });
        } catch (t2) {
          f(t2);
        }
      }
      var r;
      this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
      })), _regeneratorDefine2(this, "_invoke", function(t2, o, i) {
        function f() {
          return new e(function(e2, r2) {
            n(t2, i, e2, r2);
          });
        }
        return r = r ? r.then(f, f) : f();
      }, true);
    }
    function _regenerator() {
      var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
      function i(r2, n2, o2, i2) {
        var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
        return _regeneratorDefine2(u2, "_invoke", (function(r3, n3, o3) {
          var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
            return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
          } };
          function d(r4, n4) {
            for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
              var o4, i4 = p[t], d2 = G.p, l = i4[2];
              r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
            }
            if (o4 || r4 > 1) return a;
            throw y = true, n4;
          }
          return function(o4, p2, l) {
            if (f2 > 1) throw TypeError("Generator is already running");
            for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
              i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
              try {
                if (f2 = 2, i3) {
                  if (c3 || (o4 = "next"), t = i3[o4]) {
                    if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                    if (!t.done) return t;
                    u3 = t.value, c3 < 2 && (c3 = 0);
                  } else 1 === c3 && (t = i3["return"]) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                  i3 = e;
                } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
              } catch (t2) {
                i3 = e, c3 = 1, u3 = t2;
              } finally {
                f2 = 1;
              }
            }
            return { value: t, done: y };
          };
        })(r2, o2, i2), true), u2;
      }
      var a = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      t = Object.getPrototypeOf;
      var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
        return this;
      }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
      function f(e2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
        return this;
      }), _regeneratorDefine2(u, "toString", function() {
        return "[object Generator]";
      }), (_regenerator = function _regenerator2() {
        return { w: i, m: f };
      })();
    }
    function _regeneratorDefine2(e, r, n, t) {
      var i = Object.defineProperty;
      try {
        i({}, "", {});
      } catch (e2) {
        i = 0;
      }
      _regeneratorDefine2 = function _regeneratorDefine(e2, r2, n2, t2) {
        function o(r3, n3) {
          _regeneratorDefine2(e2, r3, function(e3) {
            return this._invoke(r3, n3, e3);
          });
        }
        r2 ? i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
      }, _regeneratorDefine2(e, r, n, t);
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c), u = i.value;
      } catch (n2) {
        return void e(n2);
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
      return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
          var a = n.apply(t, e);
          function _next(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
          }
          function _throw(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
          }
          _next(void 0);
        });
      };
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _inherits(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
    }
    function _createSuper(t) {
      var r = _isNativeReflectConstruct();
      return function() {
        var e, o = _getPrototypeOf(t);
        if (r) {
          var s = _getPrototypeOf(this).constructor;
          e = Reflect.construct(o, arguments, s);
        } else e = o.apply(this, arguments);
        return _possibleConstructorReturn(this, e);
      };
    }
    function _possibleConstructorReturn(t, e) {
      if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(t);
    }
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function _wrapNativeSuper(t) {
      var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
      return _wrapNativeSuper = function _wrapNativeSuper2(t2) {
        if (null === t2 || !_isNativeFunction(t2)) return t2;
        if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== r) {
          if (r.has(t2)) return r.get(t2);
          r.set(t2, Wrapper);
        }
        function Wrapper() {
          return _construct(t2, arguments, _getPrototypeOf(this).constructor);
        }
        return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }), _setPrototypeOf(Wrapper, t2);
      }, _wrapNativeSuper(t);
    }
    function _construct(t, e, r) {
      if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
      var o = [null];
      o.push.apply(o, e);
      var p = new (t.bind.apply(t, o))();
      return r && _setPrototypeOf(p, r.prototype), p;
    }
    function _isNativeReflectConstruct() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch (t2) {
      }
      return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
      })();
    }
    function _isNativeFunction(t) {
      try {
        return -1 !== Function.toString.call(t).indexOf("[native code]");
      } catch (n) {
        return "function" == typeof t;
      }
    }
    function _setPrototypeOf(t, e) {
      return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
        return t2.__proto__ = e2, t2;
      }, _setPrototypeOf(t, e);
    }
    function _getPrototypeOf(t) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
        return t2.__proto__ || Object.getPrototypeOf(t2);
      }, _getPrototypeOf(t);
    }
    function _awaitAsyncGenerator(e) {
      return new _OverloadYield(e, 0);
    }
    function _wrapAsyncGenerator(e) {
      return function() {
        return new AsyncGenerator(e.apply(this, arguments));
      };
    }
    function AsyncGenerator(e) {
      var t, n;
      function resume(t2, n2) {
        try {
          var r = e[t2](n2), o = r.value, u = o instanceof _OverloadYield;
          Promise.resolve(u ? o.v : o).then(function(n3) {
            if (u) {
              var i = "return" === t2 && o.k ? t2 : "next";
              if (!o.k || n3.done) return resume(i, n3);
              n3 = e[i](n3).value;
            }
            settle(!!r.done, n3);
          }, function(e2) {
            resume("throw", e2);
          });
        } catch (e2) {
          settle(2, e2);
        }
      }
      function settle(e2, r) {
        2 === e2 ? t.reject(r) : t.resolve({ value: r, done: e2 }), (t = t.next) ? resume(t.key, t.arg) : n = null;
      }
      this._invoke = function(e2, r) {
        return new Promise(function(o, u) {
          var i = { key: e2, arg: r, resolve: o, reject: u, next: null };
          n ? n = n.next = i : (t = n = i, resume(e2, r));
        });
      }, "function" != typeof e["return"] && (this["return"] = void 0);
    }
    AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
      return this;
    }, AsyncGenerator.prototype.next = function(e) {
      return this._invoke("next", e);
    }, AsyncGenerator.prototype["throw"] = function(e) {
      return this._invoke("throw", e);
    }, AsyncGenerator.prototype["return"] = function(e) {
      return this._invoke("return", e);
    };
    function _OverloadYield(e, d) {
      this.v = e, this.k = d;
    }
    var WidgetApiResponseError = /* @__PURE__ */ (function(_Error) {
      _inherits(WidgetApiResponseError2, _Error);
      var _super = _createSuper(WidgetApiResponseError2);
      function WidgetApiResponseError2(message, data) {
        var _this2;
        _classCallCheck(this, WidgetApiResponseError2);
        _this2 = _super.call(this, message);
        _this2.data = data;
        return _this2;
      }
      return _createClass(WidgetApiResponseError2);
    })(/* @__PURE__ */ _wrapNativeSuper(Error));
    exports.WidgetApiResponseError = WidgetApiResponseError;
    WidgetApiResponseError.prototype.name = WidgetApiResponseError.name;
    var WidgetApi2 = /* @__PURE__ */ (function(_EventEmitter) {
      _inherits(WidgetApi3, _EventEmitter);
      var _super2 = _createSuper(WidgetApi3);
      function WidgetApi3() {
        var _this3;
        var widgetId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        var clientOrigin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        _classCallCheck(this, WidgetApi3);
        _this3 = _super2.call(this);
        _defineProperty(_assertThisInitialized(_this3), "transport", void 0);
        _defineProperty(_assertThisInitialized(_this3), "capabilitiesFinished", false);
        _defineProperty(_assertThisInitialized(_this3), "supportsMSC2974Renegotiate", false);
        _defineProperty(_assertThisInitialized(_this3), "requestedCapabilities", []);
        _defineProperty(_assertThisInitialized(_this3), "approvedCapabilities", void 0);
        _defineProperty(_assertThisInitialized(_this3), "cachedClientVersions", void 0);
        _defineProperty(_assertThisInitialized(_this3), "turnServerWatchers", 0);
        if (!globalThis.parent) {
          throw new Error("No parent window. This widget doesn't appear to be embedded properly.");
        }
        _this3.transport = new _PostmessageTransport.PostmessageTransport(_WidgetApiDirection.WidgetApiDirection.FromWidget, widgetId, globalThis.parent, globalThis);
        _this3.transport.targetOrigin = clientOrigin;
        _this3.transport.on("message", _this3.handleMessage.bind(_assertThisInitialized(_this3)));
        return _this3;
      }
      _createClass(WidgetApi3, [{
        key: "hasCapability",
        value: function hasCapability(capability) {
          if (Array.isArray(this.approvedCapabilities)) {
            return this.approvedCapabilities.includes(capability);
          }
          return this.requestedCapabilities.includes(capability);
        }
        /**
         * Request a capability from the client. It is not guaranteed to be allowed,
         * but will be asked for.
         * @param {Capability} capability The capability to request.
         * @throws Throws if the capabilities negotiation has already started and the
         * widget is unable to request additional capabilities.
         */
      }, {
        key: "requestCapability",
        value: function requestCapability(capability) {
          if (this.capabilitiesFinished && !this.supportsMSC2974Renegotiate) {
            throw new Error("Capabilities have already been negotiated");
          }
          this.requestedCapabilities.push(capability);
        }
        /**
         * Request capabilities from the client. They are not guaranteed to be allowed,
         * but will be asked for if the negotiation has not already happened.
         * @param {Capability[]} capabilities The capabilities to request.
         * @throws Throws if the capabilities negotiation has already started.
         */
      }, {
        key: "requestCapabilities",
        value: function requestCapabilities(capabilities) {
          var _iterator = _createForOfIteratorHelper(capabilities), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var cap = _step.value;
              this.requestCapability(cap);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        /**
         * Requests the capability to interact with rooms other than the user's currently
         * viewed room. Applies to event receiving and sending.
         * @param {string | Symbols.AnyRoom} roomId The room ID, or `Symbols.AnyRoom` to
         * denote all known rooms.
         */
      }, {
        key: "requestCapabilityForRoomTimeline",
        value: function requestCapabilityForRoomTimeline(roomId) {
          this.requestCapability("org.matrix.msc2762.timeline:".concat(roomId));
        }
        /**
         * Requests the capability to send a given state event with optional explicit
         * state key. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} eventType The state event type to ask for.
         * @param {string} stateKey If specified, the specific state key to request.
         * Otherwise all state keys will be requested.
         */
      }, {
        key: "requestCapabilityToSendState",
        value: function requestCapabilityToSendState(eventType, stateKey) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forStateEvent(_WidgetEventCapability.EventDirection.Send, eventType, stateKey).raw);
        }
        /**
         * Requests the capability to receive a given state event with optional explicit
         * state key. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} eventType The state event type to ask for.
         * @param {string} stateKey If specified, the specific state key to request.
         * Otherwise all state keys will be requested.
         */
      }, {
        key: "requestCapabilityToReceiveState",
        value: function requestCapabilityToReceiveState(eventType, stateKey) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forStateEvent(_WidgetEventCapability.EventDirection.Receive, eventType, stateKey).raw);
        }
        /**
         * Requests the capability to send a given to-device event. It is not
         * guaranteed to be allowed, but will be asked for if the negotiation has
         * not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToSendToDevice",
        value: function requestCapabilityToSendToDevice(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forToDeviceEvent(_WidgetEventCapability.EventDirection.Send, eventType).raw);
        }
        /**
         * Requests the capability to receive a given to-device event. It is not
         * guaranteed to be allowed, but will be asked for if the negotiation has
         * not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToReceiveToDevice",
        value: function requestCapabilityToReceiveToDevice(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forToDeviceEvent(_WidgetEventCapability.EventDirection.Receive, eventType).raw);
        }
        /**
         * Requests the capability to send a given room event. It is not guaranteed to be
         * allowed, but will be asked for if the negotiation has not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToSendEvent",
        value: function requestCapabilityToSendEvent(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomEvent(_WidgetEventCapability.EventDirection.Send, eventType).raw);
        }
        /**
         * Requests the capability to receive a given room event. It is not guaranteed to be
         * allowed, but will be asked for if the negotiation has not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToReceiveEvent",
        value: function requestCapabilityToReceiveEvent(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomEvent(_WidgetEventCapability.EventDirection.Receive, eventType).raw);
        }
        /**
         * Requests the capability to send a given message event with optional explicit
         * `msgtype`. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} msgtype If specified, the specific msgtype to request.
         * Otherwise all message types will be requested.
         */
      }, {
        key: "requestCapabilityToSendMessage",
        value: function requestCapabilityToSendMessage(msgtype) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomMessageEvent(_WidgetEventCapability.EventDirection.Send, msgtype).raw);
        }
        /**
         * Requests the capability to receive a given message event with optional explicit
         * `msgtype`. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} msgtype If specified, the specific msgtype to request.
         * Otherwise all message types will be requested.
         */
      }, {
        key: "requestCapabilityToReceiveMessage",
        value: function requestCapabilityToReceiveMessage(msgtype) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomMessageEvent(_WidgetEventCapability.EventDirection.Receive, msgtype).raw);
        }
        /**
         * Requests the capability to receive a given item in room account data. It is not guaranteed to be
         * allowed, but will be asked for if the negotiation has not already happened.
         * @param {string} eventType The state event type to ask for.
         */
      }, {
        key: "requestCapabilityToReceiveRoomAccountData",
        value: function requestCapabilityToReceiveRoomAccountData(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomAccountData(_WidgetEventCapability.EventDirection.Receive, eventType).raw);
        }
        /**
         * Requests the capability to obtain a JWT for a LiveKit SFU through the client.
         * It is not guaranteed to be allowed, but will be asked for if the negotiation
         * has not already happened.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "requestCapabilityToGetRtcLivekitToken",
        value: function requestCapabilityToGetRtcLivekitToken() {
          this.requestCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitGetToken);
        }
        /**
         * Requests the capability to hand a MatrixRTC session's delayed leave event over
         * to the server through the client. It is not guaranteed to be allowed, but will
         * be asked for if the negotiation has not already happened.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "requestCapabilityToDelegateRtcLivekitDelayedLeave",
        value: function requestCapabilityToDelegateRtcLivekitDelayedLeave() {
          this.requestCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitDelegateDelayedLeave);
        }
        /**
         * Requests an OpenID Connect token from the client for the currently logged in
         * user. This token can be validated server-side with the federation API. Note
         * that the widget is responsible for validating the token and caching any results
         * it needs.
         * @returns {Promise<IOpenIDCredentials>} Resolves to a token for verification.
         * @throws Throws if the user rejected the request or the request failed.
         */
      }, {
        key: "requestOpenIDConnectToken",
        value: function requestOpenIDConnectToken() {
          var _this4 = this;
          return new Promise(function(resolve, reject) {
            _this4.transport.sendComplete(_WidgetApiAction.WidgetApiFromWidgetAction.GetOpenIDCredentials, {}).then(function(response) {
              var rdata = response.response;
              if (rdata.state === _GetOpenIDAction.OpenIDRequestState.Allowed) {
                resolve(rdata);
              } else if (rdata.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
                reject(new Error("User declined to verify their identity"));
              } else if (rdata.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation) {
                var handlerFn = function handlerFn2(ev) {
                  ev.preventDefault();
                  var request = ev.detail;
                  if (request.data.original_request_id !== response.requestId) return;
                  if (request.data.state === _GetOpenIDAction.OpenIDRequestState.Allowed) {
                    resolve(request.data);
                    _this4.transport.reply(request, {});
                  } else if (request.data.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
                    reject(new Error("User declined to verify their identity"));
                    _this4.transport.reply(request, {});
                  } else {
                    reject(new Error("Invalid state on reply: " + rdata.state));
                    _this4.transport.reply(request, {
                      error: {
                        message: "Invalid state"
                      }
                    });
                  }
                  _this4.off("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials), handlerFn2);
                };
                _this4.on("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials), handlerFn);
              } else {
                reject(new Error("Invalid state: " + rdata.state));
              }
            })["catch"](reject);
          });
        }
        /**
         * Asks the client for additional capabilities. Capabilities can be queued for this
         * request with the requestCapability() functions.
         * @returns {Promise<void>} Resolves when complete. Note that the promise resolves when
         * the capabilities request has gone through, not when the capabilities are approved/denied.
         * Use the WidgetApiToWidgetAction.NotifyCapabilities action to detect changes.
         */
      }, {
        key: "updateRequestedCapabilities",
        value: function updateRequestedCapabilities() {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2974RenegotiateCapabilities, {
            capabilities: this.requestedCapabilities
          }).then();
        }
        /**
         * Tell the client that the content has been loaded.
         * @returns {Promise} Resolves when the client acknowledges the request.
         */
      }, {
        key: "sendContentLoaded",
        value: function sendContentLoaded() {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.ContentLoaded, {}).then();
        }
        /**
         * Sends a sticker to the client.
         * @param {IStickerActionRequestData} sticker The sticker to send.
         * @returns {Promise} Resolves when the client acknowledges the request.
         */
      }, {
        key: "sendSticker",
        value: function sendSticker(sticker) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendSticker, sticker).then();
        }
        /**
         * Asks the client to set the always-on-screen status for this widget.
         * @param {boolean} value The new state to request.
         * @returns {Promise<boolean>} Resolve with true if the client was able to fulfill
         * the request, resolves to false otherwise. Rejects if an error occurred.
         */
      }, {
        key: "setAlwaysOnScreen",
        value: function setAlwaysOnScreen(value) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.UpdateAlwaysOnScreen, {
            value
          }).then(function(res) {
            return res.success;
          });
        }
        /**
         * Opens a modal widget.
         * @param {string} url The URL to the modal widget.
         * @param {string} name The name of the widget.
         * @param {IModalWidgetOpenRequestDataButton[]} buttons The buttons to have on the widget.
         * @param {IModalWidgetCreateData} data Data to supply to the modal widget.
         * @param {WidgetType} type The type of modal widget.
         * @returns {Promise<void>} Resolves when the modal widget has been opened.
         */
      }, {
        key: "openModalWidget",
        value: function openModalWidget(url, name) {
          var buttons = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
          var data = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          var type = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : _WidgetType.MatrixWidgetType.Custom;
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.OpenModalWidget, {
            type,
            url,
            name,
            buttons,
            data
          }).then();
        }
        /**
         * Closes the modal widget. The widget's session will be terminated shortly after.
         * @param {IModalWidgetReturnData} data Optional data to close the modal widget with.
         * @returns {Promise<void>} Resolves when complete.
         */
      }, {
        key: "closeModalWidget",
        value: function closeModalWidget() {
          var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.CloseModalWidget, data).then();
        }
      }, {
        key: "sendRoomEvent",
        value: function sendRoomEvent(eventType, content, roomId, delay, parentDelayIdOrStickyDurationMs, stickyDurationMs) {
          var parentDelayId;
          if (typeof parentDelayIdOrStickyDurationMs === "number") {
            stickyDurationMs = parentDelayIdOrStickyDurationMs;
          } else {
            parentDelayId = parentDelayIdOrStickyDurationMs;
          }
          return this.sendEvent(eventType, void 0, content, roomId, delay, parentDelayId, stickyDurationMs);
        }
      }, {
        key: "sendStateEvent",
        value: function sendStateEvent(eventType, stateKey, content, roomId, delay, parentDelayId) {
          return this.sendEvent(eventType, stateKey, content, roomId, delay, parentDelayId);
        }
      }, {
        key: "sendEvent",
        value: function sendEvent(eventType, stateKey, content, roomId, delay, parentDelayId, stickyDurationMs) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendEvent, _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
            type: eventType,
            content
          }, stateKey !== void 0 && {
            state_key: stateKey
          }), roomId !== void 0 && {
            room_id: roomId
          }), delay !== void 0 && {
            delay
          }), parentDelayId !== void 0 && {
            parent_delay_id: parentDelayId
          }), stickyDurationMs !== void 0 && {
            sticky_duration_ms: stickyDurationMs
          }));
        }
        /**
         * @experimental This currently relies on an unstable MSC (MSC4157).
         */
      }, {
        key: "cancelScheduledDelayedEvent",
        value: function cancelScheduledDelayedEvent(delayId) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent, {
            delay_id: delayId,
            action: _UpdateDelayedEventAction.UpdateDelayedEventAction.Cancel
          });
        }
        /**
         * @experimental This currently relies on an unstable MSC (MSC4157).
         */
      }, {
        key: "restartScheduledDelayedEvent",
        value: function restartScheduledDelayedEvent(delayId) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent, {
            delay_id: delayId,
            action: _UpdateDelayedEventAction.UpdateDelayedEventAction.Restart
          });
        }
        /**
         * @experimental This currently relies on an unstable MSC (MSC4157).
         */
      }, {
        key: "sendScheduledDelayedEvent",
        value: function sendScheduledDelayedEvent(delayId) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent, {
            delay_id: delayId,
            action: _UpdateDelayedEventAction.UpdateDelayedEventAction.Send
          });
        }
        /**
         * Sends a to-device event.
         * @param {string} eventType The type of events being sent.
         * @param {boolean} encrypted Whether to encrypt the message contents.
         * @param {Object} contentMap A map from user IDs to device IDs to message contents.
         * @returns {Promise<ISendToDeviceFromWidgetResponseData>} Resolves when complete.
         */
      }, {
        key: "sendToDevice",
        value: function sendToDevice(eventType, encrypted, contentMap) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendToDevice, {
            type: eventType,
            encrypted,
            messages: contentMap
          });
        }
      }, {
        key: "readRoomAccountData",
        value: function readRoomAccountData(eventType, roomIds) {
          var data = {
            type: eventType
          };
          if (roomIds) {
            if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
              data.room_ids = _Symbols.Symbols.AnyRoom;
            } else {
              data.room_ids = roomIds;
            }
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.BeeperReadRoomAccountData, data).then(function(r) {
            return r.events;
          });
        }
      }, {
        key: "readRoomEvents",
        value: function readRoomEvents(eventType, limit, msgtype, roomIds, since) {
          var data = {
            type: eventType,
            msgtype
          };
          if (limit !== void 0) {
            data.limit = limit;
          }
          if (roomIds) {
            if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
              data.room_ids = _Symbols.Symbols.AnyRoom;
            } else {
              data.room_ids = roomIds;
            }
          }
          if (since) {
            data.since = since;
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents, data).then(function(r) {
            return r.events;
          });
        }
        /**
         * Reads all related events given a known eventId.
         * @param eventId The id of the parent event to be read.
         * @param roomId The room to look within. When undefined, the user's currently
         * viewed room.
         * @param relationType The relationship type of child events to search for.
         * When undefined, all relations are returned.
         * @param eventType The event type of child events to search for. When undefined,
         * all related events are returned.
         * @param limit The maximum number of events to retrieve per room. If not
         * supplied, the server will apply a default limit.
         * @param from The pagination token to start returning results from, as
         * received from a previous call. If not supplied, results start at the most
         * recent topological event known to the server.
         * @param to The pagination token to stop returning results at. If not
         * supplied, results continue up to limit or until there are no more events.
         * @param direction The direction to search for according to MSC3715.
         * @returns Resolves to the room relations.
         */
      }, {
        key: "readEventRelations",
        value: (function() {
          var _readEventRelations = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(eventId, roomId, relationType, eventType, limit, from, to, direction) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC3869)) {
                    _context.next = 5;
                    break;
                  }
                  throw new Error("The read_relations action is not supported by the client.");
                case 5:
                  data = {
                    event_id: eventId,
                    rel_type: relationType,
                    event_type: eventType,
                    room_id: roomId,
                    to,
                    from,
                    limit,
                    direction
                  };
                  return _context.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC3869ReadRelations, data));
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function readEventRelations(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
            return _readEventRelations.apply(this, arguments);
          }
          return readEventRelations;
        })()
      }, {
        key: "readStateEvents",
        value: function readStateEvents(eventType, limit, stateKey, roomIds) {
          var data = {
            type: eventType,
            state_key: stateKey === void 0 ? true : stateKey
          };
          if (limit !== void 0) {
            data.limit = limit;
          }
          if (roomIds) {
            if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
              data.room_ids = _Symbols.Symbols.AnyRoom;
            } else {
              data.room_ids = roomIds;
            }
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents, data).then(function(r) {
            return r.events;
          });
        }
        /**
         * Sets a button as disabled or enabled on the modal widget. Buttons are enabled by default.
         * @param {ModalButtonID} buttonId The button ID to enable/disable.
         * @param {boolean} isEnabled Whether or not the button is enabled.
         * @returns {Promise<void>} Resolves when complete.
         * @throws Throws if the button cannot be disabled, or the client refuses to disable the button.
         */
      }, {
        key: "setModalButtonEnabled",
        value: function setModalButtonEnabled(buttonId, isEnabled) {
          if (buttonId === _ModalWidgetActions.BuiltInModalButtonID.Close) {
            throw new Error("The close button cannot be disabled");
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SetModalButtonEnabled, {
            button: buttonId,
            enabled: isEnabled
          }).then();
        }
        /**
         * Attempts to navigate the client to the given URI. This can only be called with Matrix URIs
         * (currently only matrix.to, but in future a Matrix URI scheme will be defined).
         * @param {string} uri The URI to navigate to.
         * @returns {Promise<void>} Resolves when complete.
         * @throws Throws if the URI is invalid or cannot be processed.
         * @experimental This currently relies on an unstable MSC (MSC2931).
         */
      }, {
        key: "navigateTo",
        value: function navigateTo(uri) {
          if (!uri || !uri.startsWith("https://matrix.to/#")) {
            throw new Error("Invalid matrix.to URI");
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2931Navigate, {
            uri
          }).then();
        }
        /**
         * Starts watching for TURN servers, yielding an initial set of credentials as soon as possible,
         * and thereafter yielding new credentials whenever the previous ones expire.
         * @yields {ITurnServer} The TURN server URIs and credentials currently available to the widget.
         */
      }, {
        key: "getTurnServers",
        value: function getTurnServers() {
          var _this = this;
          return _wrapAsyncGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3() {
            var setTurnServer, onUpdateTurnServers;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  onUpdateTurnServers = /* @__PURE__ */ (function() {
                    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(ev) {
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            ev.preventDefault();
                            setTurnServer(ev.detail.data);
                            _this.transport.reply(ev.detail, {});
                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
                    }));
                    return function onUpdateTurnServers2(_x9) {
                      return _ref.apply(this, arguments);
                    };
                  })();
                  _this.on("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers), onUpdateTurnServers);
                  if (!(_this.turnServerWatchers === 0)) {
                    _context3.next = 12;
                    break;
                  }
                  _context3.prev = 3;
                  _context3.next = 6;
                  return _awaitAsyncGenerator(_this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.WatchTurnServers, {}));
                case 6:
                  _context3.next = 12;
                  break;
                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3["catch"](3);
                  _this.off("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers), onUpdateTurnServers);
                  throw _context3.t0;
                case 12:
                  _this.turnServerWatchers++;
                  _context3.prev = 13;
                case 14:
                  if (false) {
                    _context3.next = 21;
                    break;
                  }
                  _context3.next = 17;
                  return _awaitAsyncGenerator(new Promise(function(resolve) {
                    return setTurnServer = resolve;
                  }));
                case 17:
                  _context3.next = 19;
                  return _context3.sent;
                case 19:
                  _context3.next = 14;
                  break;
                case 21:
                  _context3.prev = 21;
                  _this.off("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers), onUpdateTurnServers);
                  _this.turnServerWatchers--;
                  if (!(_this.turnServerWatchers === 0)) {
                    _context3.next = 27;
                    break;
                  }
                  _context3.next = 27;
                  return _awaitAsyncGenerator(_this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.UnwatchTurnServers, {}));
                case 27:
                  return _context3.finish(21);
                case 28:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, null, [[3, 8], [13, , 21, 28]]);
          }))();
        }
        /**
         * Search for users in the user directory.
         * @param searchTerm The term to search for.
         * @param limit The maximum number of results to return. If not supplied, the
         * @returns Resolves to the search results.
         */
      }, {
        key: "searchUserDirectory",
        value: (function() {
          var _searchUserDirectory = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(searchTerm, limit) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context4.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC3973)) {
                    _context4.next = 5;
                    break;
                  }
                  throw new Error("The user_directory_search action is not supported by the client.");
                case 5:
                  data = {
                    search_term: searchTerm,
                    limit
                  };
                  return _context4.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC3973UserDirectorySearch, data));
                case 7:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function searchUserDirectory(_x0, _x1) {
            return _searchUserDirectory.apply(this, arguments);
          }
          return searchUserDirectory;
        })()
      }, {
        key: "getMediaConfig",
        value: (function() {
          var _getMediaConfig = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5() {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context5.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4039)) {
                    _context5.next = 5;
                    break;
                  }
                  throw new Error("The get_media_config action is not supported by the client.");
                case 5:
                  data = {};
                  return _context5.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4039GetMediaConfigAction, data));
                case 7:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
          function getMediaConfig() {
            return _getMediaConfig.apply(this, arguments);
          }
          return getMediaConfig;
        })()
      }, {
        key: "getRtcTransports",
        value: (function() {
          var _getRtcTransports = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee6() {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context6.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4515)) {
                    _context6.next = 5;
                    break;
                  }
                  throw new Error("The get_rtc_transports action is not supported by the client.");
                case 5:
                  data = {};
                  return _context6.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4515GetRtcTransports, data));
                case 7:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this);
          }));
          function getRtcTransports() {
            return _getRtcTransports.apply(this, arguments);
          }
          return getRtcTransports;
        })()
      }, {
        key: "uploadFile",
        value: (function() {
          var _uploadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee7(file) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context7.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4039)) {
                    _context7.next = 5;
                    break;
                  }
                  throw new Error("The upload_file action is not supported by the client.");
                case 5:
                  data = {
                    file
                  };
                  return _context7.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4039UploadFileAction, data));
                case 7:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function uploadFile(_x10) {
            return _uploadFile.apply(this, arguments);
          }
          return uploadFile;
        })()
      }, {
        key: "downloadFile",
        value: (function() {
          var _downloadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee8(contentUri) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context8.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4039)) {
                    _context8.next = 5;
                    break;
                  }
                  throw new Error("The download_file action is not supported by the client.");
                case 5:
                  data = {
                    content_uri: contentUri
                  };
                  return _context8.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4039DownloadFileAction, data));
                case 7:
                case "end":
                  return _context8.stop();
              }
            }, _callee8, this);
          }));
          function downloadFile(_x11) {
            return _downloadFile.apply(this, arguments);
          }
          return downloadFile;
        })()
      }, {
        key: "getRtcLivekitToken",
        value: (function() {
          var _getRtcLivekitToken = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee9(data) {
            var versions;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context9.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4533)) {
                    _context9.next = 5;
                    break;
                  }
                  throw new Error("The rtc_livekit_get_token action is not supported by the client.");
                case 5:
                  return _context9.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitGetToken, data));
                case 6:
                case "end":
                  return _context9.stop();
              }
            }, _callee9, this);
          }));
          function getRtcLivekitToken(_x12) {
            return _getRtcLivekitToken.apply(this, arguments);
          }
          return getRtcLivekitToken;
        })()
      }, {
        key: "delegateRtcLivekitDelayedLeave",
        value: (function() {
          var _delegateRtcLivekitDelayedLeave = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee0(data) {
            var versions;
            return _regeneratorRuntime().wrap(function _callee0$(_context0) {
              while (1) switch (_context0.prev = _context0.next) {
                case 0:
                  _context0.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context0.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4533)) {
                    _context0.next = 5;
                    break;
                  }
                  throw new Error("The rtc_livekit_delegate_delayed_leave action is not supported by the client.");
                case 5:
                  return _context0.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitDelegateDelayedLeave, data));
                case 6:
                case "end":
                  return _context0.stop();
              }
            }, _callee0, this);
          }));
          function delegateRtcLivekitDelayedLeave(_x13) {
            return _delegateRtcLivekitDelayedLeave.apply(this, arguments);
          }
          return delegateRtcLivekitDelayedLeave;
        })()
      }, {
        key: "start",
        value: function start() {
          var _this5 = this;
          this.transport.start();
          this.getClientVersions().then(function(v) {
            if (v.includes(_ApiVersion.UnstableApiVersion.MSC2974)) {
              _this5.supportsMSC2974Renegotiate = true;
            }
          });
        }
      }, {
        key: "handleMessage",
        value: function handleMessage(ev) {
          var actionEv = new CustomEvent("action:".concat(ev.detail.action), {
            detail: ev.detail,
            cancelable: true
          });
          this.emit("action:".concat(ev.detail.action), actionEv);
          if (!actionEv.defaultPrevented) {
            switch (ev.detail.action) {
              case _WidgetApiAction.WidgetApiToWidgetAction.SupportedApiVersions:
                return this.replyVersions(ev.detail);
              case _WidgetApiAction.WidgetApiToWidgetAction.Capabilities:
                return this.handleCapabilities(ev.detail);
              case _WidgetApiAction.WidgetApiToWidgetAction.UpdateVisibility:
                return this.transport.reply(ev.detail, {});
              // ack to avoid error spam
              case _WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities:
                return this.transport.reply(ev.detail, {});
              // ack to avoid error spam
              default:
                return this.transport.reply(ev.detail, {
                  error: {
                    message: "Unknown or unsupported to-widget action: " + ev.detail.action
                  }
                });
            }
          }
        }
      }, {
        key: "replyVersions",
        value: function replyVersions(request) {
          this.transport.reply(request, {
            supported_versions: _ApiVersion.CurrentApiVersions
          });
        }
      }, {
        key: "getClientVersions",
        value: function getClientVersions() {
          var _this6 = this;
          if (Array.isArray(this.cachedClientVersions)) {
            return Promise.resolve(this.cachedClientVersions);
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SupportedApiVersions, {}).then(function(r) {
            _this6.cachedClientVersions = r.supported_versions;
            return r.supported_versions;
          })["catch"](function(e) {
            console.warn("non-fatal error getting supported client versions: ", e);
            return [];
          });
        }
      }, {
        key: "handleCapabilities",
        value: function handleCapabilities(request) {
          var _this7 = this;
          if (this.capabilitiesFinished) {
            return this.transport.reply(request, {
              error: {
                message: "Capability negotiation already completed"
              }
            });
          }
          return this.getClientVersions().then(function(v) {
            if (v.includes(_ApiVersion.UnstableApiVersion.MSC2871)) {
              _this7.once("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities), function(ev) {
                _this7.approvedCapabilities = ev.detail.data.approved;
                _this7.emit("ready");
              });
            } else {
              _this7.emit("ready");
            }
            _this7.capabilitiesFinished = true;
            return _this7.transport.reply(request, {
              capabilities: _this7.requestedCapabilities
            });
          });
        }
      }]);
      return WidgetApi3;
    })(_events.EventEmitter);
    exports.WidgetApi = WidgetApi2;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/util/SimpleObservable.js
var require_SimpleObservable = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/util/SimpleObservable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SimpleObservable = void 0;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var SimpleObservable = /* @__PURE__ */ (function() {
      function SimpleObservable2(initialFn) {
        _classCallCheck(this, SimpleObservable2);
        _defineProperty(this, "listeners", []);
        if (initialFn) this.listeners.push(initialFn);
      }
      _createClass(SimpleObservable2, [{
        key: "onUpdate",
        value: function onUpdate(fn) {
          this.listeners.push(fn);
        }
      }, {
        key: "update",
        value: function update(val) {
          var _iterator = _createForOfIteratorHelper(this.listeners), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var listener = _step.value;
              listener(val);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }, {
        key: "close",
        value: function close() {
          this.listeners = [];
        }
      }]);
      return SimpleObservable2;
    })();
    exports.SimpleObservable = SimpleObservable;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/ClientWidgetApi.js
var require_ClientWidgetApi = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/ClientWidgetApi.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ClientWidgetApi = void 0;
    var _events = require_events();
    var _PostmessageTransport = require_PostmessageTransport();
    var _WidgetApiDirection = require_WidgetApiDirection();
    var _WidgetApiAction = require_WidgetApiAction();
    var _Capabilities = require_Capabilities();
    var _ApiVersion = require_ApiVersion();
    var _WidgetEventCapability = require_WidgetEventCapability();
    var _GetOpenIDAction = require_GetOpenIDAction();
    var _SimpleObservable = require_SimpleObservable();
    var _Symbols = require_Symbols();
    var _UpdateDelayedEventAction = require_UpdateDelayedEventAction();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _regeneratorRuntime() {
      "use strict";
      var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
      function n(r2) {
        var e2 = "function" == typeof r2 && r2.constructor;
        return !!e2 && (e2 === t || "GeneratorFunction" === (e2.displayName || e2.name));
      }
      var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 };
      function a(r2) {
        var e2, t2;
        return function(n2) {
          e2 || (e2 = { stop: function stop() {
            return t2(n2.a, 2);
          }, "catch": function _catch() {
            return n2.v;
          }, abrupt: function abrupt(r3, e3) {
            return t2(n2.a, o[r3], e3);
          }, delegateYield: function delegateYield(r3, o2, a2) {
            return e2.resultName = o2, t2(n2.d, _regeneratorValues(r3), a2);
          }, finish: function finish(r3) {
            return t2(n2.f, r3);
          } }, t2 = function t3(r3, _t, o2) {
            n2.p = e2.prev, n2.n = e2.next;
            try {
              return r3(_t, o2);
            } finally {
              e2.next = n2.n;
            }
          }), e2.resultName && (e2[e2.resultName] = n2.v, e2.resultName = void 0), e2.sent = n2.v, e2.next = n2.n;
          try {
            return r2.call(this, e2);
          } finally {
            n2.p = e2.prev, n2.n = e2.next;
          }
        };
      }
      return (_regeneratorRuntime = function _regeneratorRuntime2() {
        return { wrap: function wrap(e2, t2, n2, o2) {
          return r.w(a(e2), t2, n2, o2 && o2.reverse());
        }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r2, e2) {
          return new _OverloadYield(r2, e2);
        }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r2, e2, t2, o2, u) {
          return (n(e2) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r2), e2, t2, o2, u);
        }, keys: _regeneratorKeys, values: _regeneratorValues };
      })();
    }
    function _regeneratorValues(e) {
      if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return { next: function next() {
          return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
        } };
      }
      throw new TypeError(_typeof(e) + " is not iterable");
    }
    function _regeneratorKeys(e) {
      var n = Object(e), r = [];
      for (var t in n) r.unshift(t);
      return function e2() {
        for (; r.length; ) if ((t = r.pop()) in n) return e2.value = t, e2.done = false, e2;
        return e2.done = true, e2;
      };
    }
    function _regeneratorAsync(n, e, r, t, o) {
      var a = _regeneratorAsyncGen(n, e, r, t, o);
      return a.next().then(function(n2) {
        return n2.done ? n2.value : a.next();
      });
    }
    function _regeneratorAsyncGen(r, e, t, o, n) {
      return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise);
    }
    function _regeneratorAsyncIterator(t, e) {
      function n(r2, o, i, f) {
        try {
          var c = t[r2](o), u = c.value;
          return u instanceof _OverloadYield ? e.resolve(u.v).then(function(t2) {
            n("next", t2, i, f);
          }, function(t2) {
            n("throw", t2, i, f);
          }) : e.resolve(u).then(function(t2) {
            c.value = t2, i(c);
          }, function(t2) {
            return n("throw", t2, i, f);
          });
        } catch (t2) {
          f(t2);
        }
      }
      var r;
      this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
      })), _regeneratorDefine2(this, "_invoke", function(t2, o, i) {
        function f() {
          return new e(function(e2, r2) {
            n(t2, i, e2, r2);
          });
        }
        return r = r ? r.then(f, f) : f();
      }, true);
    }
    function _regenerator() {
      var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
      function i(r2, n2, o2, i2) {
        var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
        return _regeneratorDefine2(u2, "_invoke", (function(r3, n3, o3) {
          var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
            return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
          } };
          function d(r4, n4) {
            for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
              var o4, i4 = p[t], d2 = G.p, l = i4[2];
              r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
            }
            if (o4 || r4 > 1) return a;
            throw y = true, n4;
          }
          return function(o4, p2, l) {
            if (f2 > 1) throw TypeError("Generator is already running");
            for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
              i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
              try {
                if (f2 = 2, i3) {
                  if (c3 || (o4 = "next"), t = i3[o4]) {
                    if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                    if (!t.done) return t;
                    u3 = t.value, c3 < 2 && (c3 = 0);
                  } else 1 === c3 && (t = i3["return"]) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                  i3 = e;
                } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
              } catch (t2) {
                i3 = e, c3 = 1, u3 = t2;
              } finally {
                f2 = 1;
              }
            }
            return { value: t, done: y };
          };
        })(r2, o2, i2), true), u2;
      }
      var a = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      t = Object.getPrototypeOf;
      var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
        return this;
      }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
      function f(e2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
        return this;
      }), _regeneratorDefine2(u, "toString", function() {
        return "[object Generator]";
      }), (_regenerator = function _regenerator2() {
        return { w: i, m: f };
      })();
    }
    function _regeneratorDefine2(e, r, n, t) {
      var i = Object.defineProperty;
      try {
        i({}, "", {});
      } catch (e2) {
        i = 0;
      }
      _regeneratorDefine2 = function _regeneratorDefine(e2, r2, n2, t2) {
        function o(r3, n3) {
          _regeneratorDefine2(e2, r3, function(e3) {
            return this._invoke(r3, n3, e3);
          });
        }
        r2 ? i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
      }, _regeneratorDefine2(e, r, n, t);
    }
    function _OverloadYield(e, d) {
      this.v = e, this.k = d;
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c), u = i.value;
      } catch (n2) {
        return void e(n2);
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
      return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
          var a = n.apply(t, e);
          function _next(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
          }
          function _throw(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
          }
          _next(void 0);
        });
      };
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _inherits(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
    }
    function _setPrototypeOf(t, e) {
      return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
        return t2.__proto__ = e2, t2;
      }, _setPrototypeOf(t, e);
    }
    function _createSuper(t) {
      var r = _isNativeReflectConstruct();
      return function() {
        var e, o = _getPrototypeOf(t);
        if (r) {
          var s = _getPrototypeOf(this).constructor;
          e = Reflect.construct(o, arguments, s);
        } else e = o.apply(this, arguments);
        return _possibleConstructorReturn(this, e);
      };
    }
    function _possibleConstructorReturn(t, e) {
      if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(t);
    }
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function _isNativeReflectConstruct() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch (t2) {
      }
      return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
      })();
    }
    function _getPrototypeOf(t) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
        return t2.__proto__ || Object.getPrototypeOf(t2);
      }, _getPrototypeOf(t);
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _asyncIterator(r) {
      var n, t, o, e = 2;
      for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--; ) {
        if (t && null != (n = r[t])) return n.call(r);
        if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
        t = "@@asyncIterator", o = "@@iterator";
      }
      throw new TypeError("Object is not async iterable");
    }
    function AsyncFromSyncIterator(r) {
      function AsyncFromSyncIteratorContinuation(r2) {
        if (Object(r2) !== r2) return Promise.reject(new TypeError(r2 + " is not an object."));
        var n = r2.done;
        return Promise.resolve(r2.value).then(function(r3) {
          return { value: r3, done: n };
        });
      }
      return AsyncFromSyncIterator = function AsyncFromSyncIterator2(r2) {
        this.s = r2, this.n = r2.next;
      }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() {
        return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
      }, "return": function _return(r2) {
        var n = this.s["return"];
        return void 0 === n ? Promise.resolve({ value: r2, done: true }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      }, "throw": function _throw(r2) {
        var n = this.s["return"];
        return void 0 === n ? Promise.reject(r2) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      } }, new AsyncFromSyncIterator(r);
    }
    var ClientWidgetApi = /* @__PURE__ */ (function(_EventEmitter) {
      _inherits(ClientWidgetApi2, _EventEmitter);
      var _super = _createSuper(ClientWidgetApi2);
      function ClientWidgetApi2(widget, iframe, driver) {
        var _this;
        _classCallCheck(this, ClientWidgetApi2);
        _this = _super.call(this);
        _this.widget = widget;
        _this.driver = driver;
        _defineProperty(_assertThisInitialized(_this), "transport", void 0);
        _defineProperty(_assertThisInitialized(_this), "cachedWidgetVersions", null);
        _defineProperty(_assertThisInitialized(_this), "contentLoadedActionSent", false);
        _defineProperty(_assertThisInitialized(_this), "allowedCapabilities", /* @__PURE__ */ new Set());
        _defineProperty(_assertThisInitialized(_this), "allowedEvents", []);
        _defineProperty(_assertThisInitialized(_this), "isStopped", false);
        _defineProperty(_assertThisInitialized(_this), "turnServers", null);
        _defineProperty(_assertThisInitialized(_this), "contentLoadedWaitTimer", void 0);
        _defineProperty(_assertThisInitialized(_this), "pushRoomStateTasks", /* @__PURE__ */ new Set());
        _defineProperty(_assertThisInitialized(_this), "pushRoomStateResult", /* @__PURE__ */ new Map());
        _defineProperty(_assertThisInitialized(_this), "flushRoomStateTask", null);
        _defineProperty(_assertThisInitialized(_this), "viewedRoomId", null);
        if (!(iframe !== null && iframe !== void 0 && iframe.contentWindow)) {
          throw new Error("No iframe supplied");
        }
        if (!widget) {
          throw new Error("Invalid widget");
        }
        if (!driver) {
          throw new Error("Invalid driver");
        }
        _this.transport = new _PostmessageTransport.PostmessageTransport(_WidgetApiDirection.WidgetApiDirection.ToWidget, widget.id, iframe.contentWindow, globalThis);
        _this.transport.targetOrigin = widget.origin;
        _this.transport.on("message", _this.handleMessage.bind(_assertThisInitialized(_this)));
        iframe.addEventListener("load", _this.onIframeLoad.bind(_assertThisInitialized(_this)));
        _this.transport.start();
        return _this;
      }
      _createClass(ClientWidgetApi2, [{
        key: "hasCapability",
        value: function hasCapability(capability) {
          return this.allowedCapabilities.has(capability);
        }
      }, {
        key: "canUseRoomTimeline",
        value: function canUseRoomTimeline(roomId) {
          return this.hasCapability("org.matrix.msc2762.timeline:".concat(_Symbols.Symbols.AnyRoom)) || this.hasCapability("org.matrix.msc2762.timeline:".concat(roomId));
        }
      }, {
        key: "canSendRoomEvent",
        value: function canSendRoomEvent(eventType) {
          var msgtype = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          return this.allowedEvents.some(function(e) {
            return e.matchesAsRoomEvent(_WidgetEventCapability.EventDirection.Send, eventType, msgtype);
          });
        }
      }, {
        key: "canSendStateEvent",
        value: function canSendStateEvent(eventType, stateKey) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsStateEvent(_WidgetEventCapability.EventDirection.Send, eventType, stateKey);
          });
        }
      }, {
        key: "canSendToDeviceEvent",
        value: function canSendToDeviceEvent(eventType) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsToDeviceEvent(_WidgetEventCapability.EventDirection.Send, eventType);
          });
        }
      }, {
        key: "canReceiveRoomEvent",
        value: function canReceiveRoomEvent(eventType) {
          var msgtype = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          return this.allowedEvents.some(function(e) {
            return e.matchesAsRoomEvent(_WidgetEventCapability.EventDirection.Receive, eventType, msgtype);
          });
        }
      }, {
        key: "canReceiveStateEvent",
        value: function canReceiveStateEvent(eventType, stateKey) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsStateEvent(_WidgetEventCapability.EventDirection.Receive, eventType, stateKey);
          });
        }
      }, {
        key: "canReceiveToDeviceEvent",
        value: function canReceiveToDeviceEvent(eventType) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsToDeviceEvent(_WidgetEventCapability.EventDirection.Receive, eventType);
          });
        }
      }, {
        key: "canReceiveRoomAccountData",
        value: function canReceiveRoomAccountData(eventType) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsRoomAccountData(_WidgetEventCapability.EventDirection.Receive, eventType);
          });
        }
      }, {
        key: "stop",
        value: function stop() {
          this.isStopped = true;
          this.transport.stop();
        }
      }, {
        key: "getWidgetVersions",
        value: (function() {
          var _getWidgetVersions = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
            var r;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!Array.isArray(this.cachedWidgetVersions)) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return", this.cachedWidgetVersions);
                case 2:
                  _context.prev = 2;
                  _context.next = 5;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.SupportedApiVersions, {});
                case 5:
                  r = _context.sent;
                  this.cachedWidgetVersions = r.supported_versions;
                  return _context.abrupt("return", r.supported_versions);
                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](2);
                  console.warn("non-fatal error getting supported widget versions: ", _context.t0);
                  return _context.abrupt("return", []);
                case 14:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[2, 10]]);
          }));
          function getWidgetVersions() {
            return _getWidgetVersions.apply(this, arguments);
          }
          return getWidgetVersions;
        })()
      }, {
        key: "beginCapabilities",
        value: function beginCapabilities() {
          var _this2 = this;
          this.emit("preparing");
          var requestedCaps;
          this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.Capabilities, {}).then(function(caps) {
            requestedCaps = caps.capabilities;
            return _this2.driver.validateCapabilities(new Set(caps.capabilities));
          }).then(function(allowedCaps) {
            _this2.allowCapabilities(_toConsumableArray(allowedCaps), requestedCaps);
            _this2.emit("ready");
          })["catch"](function(e) {
            _this2.emit("error:preparing", e);
          });
        }
      }, {
        key: "allowCapabilities",
        value: function allowCapabilities(allowed, requested) {
          var _this$allowedEvents, _this3 = this;
          console.log("Widget ".concat(this.widget.id, " is allowed capabilities:"), allowed);
          var _iterator2 = _createForOfIteratorHelper(allowed), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var c = _step2.value;
              this.allowedCapabilities.add(c);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var allowedEvents = _WidgetEventCapability.WidgetEventCapability.findEventCapabilities(allowed);
          (_this$allowedEvents = this.allowedEvents).push.apply(_this$allowedEvents, _toConsumableArray(allowedEvents));
          this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities, {
            requested,
            approved: Array.from(this.allowedCapabilities)
          })["catch"](function(e) {
            console.warn("non-fatal error notifying widget of approved capabilities:", e);
          }).then(function() {
            _this3.emit("capabilitiesNotified");
          });
          var _iterator3 = _createForOfIteratorHelper(allowed), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var _c = _step3.value;
              if ((0, _Capabilities.isTimelineCapability)(_c)) {
                var roomId = (0, _Capabilities.getTimelineRoomIDFromCapability)(_c);
                if (roomId === _Symbols.Symbols.AnyRoom) {
                  var _iterator5 = _createForOfIteratorHelper(this.driver.getKnownRooms()), _step5;
                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                      var _roomId = _step5.value;
                      this.pushRoomState(_roomId);
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }
                } else {
                  this.pushRoomState(roomId);
                }
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          if (allowed.includes(_Capabilities.MatrixCapabilities.MSC4407ReceiveStickyEvent)) {
            console.debug("Widget ".concat(this.widget.id, " is allowed to receive sticky events, check current sticky state."));
            var roomIds = allowed.filter(function(capability) {
              return (0, _Capabilities.isTimelineCapability)(capability);
            }).map(function(timelineCapability) {
              return (0, _Capabilities.getTimelineRoomIDFromCapability)(timelineCapability);
            }).flatMap(function(roomIdOrWildcard) {
              if (roomIdOrWildcard === _Symbols.Symbols.AnyRoom) {
                return _this3.driver.getKnownRooms();
              } else {
                return roomIdOrWildcard;
              }
            });
            console.debug("Widget ".concat(this.widget.id, " is allowed to receive sticky events in rooms:"), roomIds);
            var _iterator4 = _createForOfIteratorHelper(roomIds), _step4;
            try {
              var _loop = function _loop2() {
                var roomId2 = _step4.value;
                _this3.pushStickyState(roomId2)["catch"](function(err) {
                  console.error("Failed to push sticky events to widget ".concat(_this3.widget.id, " for room ").concat(roomId2, ":"), err);
                });
              };
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                _loop();
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
          if (allowedEvents.length > 0 && this.viewedRoomId !== null && !this.canUseRoomTimeline(this.viewedRoomId)) {
            this.pushRoomState(this.viewedRoomId);
          }
        }
      }, {
        key: "onIframeLoad",
        value: function onIframeLoad(ev) {
          if (this.widget.waitForIframeLoad) {
            this.beginCapabilities();
          } else {
            console.log("waitForIframeLoad is false: waiting for widget to send contentLoaded");
            this.contentLoadedWaitTimer = setTimeout(function() {
              console.error("Widget specified waitForIframeLoad=false but timed out waiting for contentLoaded event!");
            }, 1e4);
            this.contentLoadedActionSent = false;
          }
        }
      }, {
        key: "handleContentLoadedAction",
        value: function handleContentLoadedAction(action) {
          if (this.contentLoadedWaitTimer !== void 0) {
            clearTimeout(this.contentLoadedWaitTimer);
            this.contentLoadedWaitTimer = void 0;
          }
          if (this.contentLoadedActionSent) {
            throw new Error("Improper sequence: ContentLoaded Action can only be sent once after the widget loaded and should only be used if waitForIframeLoad is false (default=true)");
          }
          if (this.widget.waitForIframeLoad) {
            this.transport.reply(action, {
              error: {
                message: "Improper sequence: not expecting ContentLoaded event if waitForIframeLoad is true (default=true)"
              }
            });
          } else {
            this.transport.reply(action, {});
            this.beginCapabilities();
          }
          this.contentLoadedActionSent = true;
        }
      }, {
        key: "replyVersions",
        value: function replyVersions(request) {
          this.transport.reply(request, {
            supported_versions: _ApiVersion.CurrentApiVersions
          });
        }
      }, {
        key: "supportsUpdateState",
        value: (function() {
          var _supportsUpdateState = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.getWidgetVersions();
                case 2:
                  return _context2.abrupt("return", _context2.sent.includes(_ApiVersion.UnstableApiVersion.MSC2762_UPDATE_STATE));
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function supportsUpdateState() {
            return _supportsUpdateState.apply(this, arguments);
          }
          return supportsUpdateState;
        })()
      }, {
        key: "handleCapabilitiesRenegotiate",
        value: function handleCapabilitiesRenegotiate(request) {
          var _request$data, _this4 = this;
          this.transport.reply(request, {});
          var requested = ((_request$data = request.data) === null || _request$data === void 0 ? void 0 : _request$data.capabilities) || [];
          var newlyRequested = new Set(requested.filter(function(r) {
            return !_this4.hasCapability(r);
          }));
          if (newlyRequested.size === 0) {
            this.allowCapabilities([], []);
          }
          this.driver.validateCapabilities(newlyRequested).then(function(allowed) {
            return _this4.allowCapabilities(_toConsumableArray(allowed), _toConsumableArray(newlyRequested));
          });
        }
      }, {
        key: "handleNavigate",
        value: function handleNavigate(request) {
          var _request$data2, _this5 = this;
          if (!this.hasCapability(_Capabilities.MatrixCapabilities.MSC2931Navigate)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability"
              }
            });
          }
          if (!((_request$data2 = request.data) !== null && _request$data2 !== void 0 && _request$data2.uri.startsWith("https://matrix.to/#"))) {
            return this.transport.reply(request, {
              error: {
                message: "Invalid matrix.to URI"
              }
            });
          }
          var onErr = function onErr2(e) {
            console.error("[ClientWidgetApi] Failed to handle navigation: ", e);
            _this5.handleDriverError(e, request, "Error handling navigation");
          };
          try {
            this.driver.navigate(request.data.uri.toString())["catch"](function(e) {
              return onErr(e);
            }).then(function() {
              return _this5.transport.reply(request, {});
            });
          } catch (e) {
            return onErr(e);
          }
        }
      }, {
        key: "handleOIDC",
        value: function handleOIDC(request) {
          var _this6 = this;
          var phase = 1;
          var replyState = function replyState2(state, credential) {
            credential = credential || {};
            if (phase > 1) {
              return _this6.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials, _objectSpread({
                state,
                original_request_id: request.requestId
              }, credential));
            } else {
              return _this6.transport.reply(request, _objectSpread({
                state
              }, credential));
            }
          };
          var replyError = function replyError2(msg) {
            console.error("[ClientWidgetApi] Failed to handle OIDC: ", msg);
            if (phase > 1) {
              return replyState(_GetOpenIDAction.OpenIDRequestState.Blocked);
            } else {
              return _this6.transport.reply(request, {
                error: {
                  message: msg
                }
              });
            }
          };
          var observer = new _SimpleObservable.SimpleObservable(function(update) {
            if (update.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation && phase > 1) {
              observer.close();
              return replyError("client provided out-of-phase response to OIDC flow");
            }
            if (update.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation) {
              replyState(update.state);
              phase++;
              return;
            }
            if (update.state === _GetOpenIDAction.OpenIDRequestState.Allowed && !update.token) {
              return replyError("client provided invalid OIDC token for an allowed request");
            }
            if (update.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
              update.token = void 0;
            }
            observer.close();
            return replyState(update.state, update.token);
          });
          this.driver.askOpenID(observer);
        }
      }, {
        key: "handleReadRoomAccountData",
        value: function handleReadRoomAccountData(request) {
          var _this7 = this;
          var events = this.driver.readRoomAccountData(request.data.type);
          if (!this.canReceiveRoomAccountData(request.data.type)) {
            return this.transport.reply(request, {
              error: {
                message: "Cannot read room account data of this type"
              }
            });
          }
          return events.then(function(evs) {
            _this7.transport.reply(request, {
              events: evs
            });
          });
        }
      }, {
        key: "handleReadEvents",
        value: (function() {
          var _handleReadEvents = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(request) {
            var _this8 = this;
            var askRoomIds, _iterator6, _step6, roomId, limit, since, stateKey, msgtype, _stateKey, events;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (request.data.type) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event type"
                    }
                  }));
                case 2:
                  if (!(request.data.limit !== void 0 && (!request.data.limit || request.data.limit < 0))) {
                    _context3.next = 4;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - limit out of range"
                    }
                  }));
                case 4:
                  if (!(request.data.room_ids === void 0)) {
                    _context3.next = 8;
                    break;
                  }
                  askRoomIds = this.viewedRoomId === null ? [] : [this.viewedRoomId];
                  _context3.next = 30;
                  break;
                case 8:
                  if (!(request.data.room_ids === _Symbols.Symbols.AnyRoom)) {
                    _context3.next = 12;
                    break;
                  }
                  askRoomIds = this.driver.getKnownRooms().filter(function(roomId2) {
                    return _this8.canUseRoomTimeline(roomId2);
                  });
                  _context3.next = 30;
                  break;
                case 12:
                  askRoomIds = request.data.room_ids;
                  _iterator6 = _createForOfIteratorHelper(askRoomIds);
                  _context3.prev = 14;
                  _iterator6.s();
                case 16:
                  if ((_step6 = _iterator6.n()).done) {
                    _context3.next = 22;
                    break;
                  }
                  roomId = _step6.value;
                  if (this.canUseRoomTimeline(roomId)) {
                    _context3.next = 20;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Unable to access room timeline: ".concat(roomId)
                    }
                  }));
                case 20:
                  _context3.next = 16;
                  break;
                case 22:
                  _context3.next = 27;
                  break;
                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3["catch"](14);
                  _iterator6.e(_context3.t0);
                case 27:
                  _context3.prev = 27;
                  _iterator6.f();
                  return _context3.finish(27);
                case 30:
                  limit = request.data.limit || 0;
                  since = request.data.since;
                  stateKey = void 0;
                  msgtype = void 0;
                  if (!(request.data.state_key !== void 0)) {
                    _context3.next = 40;
                    break;
                  }
                  stateKey = request.data.state_key === true ? void 0 : request.data.state_key.toString();
                  if (this.canReceiveStateEvent(request.data.type, (_stateKey = stateKey) !== null && _stateKey !== void 0 ? _stateKey : null)) {
                    _context3.next = 38;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Cannot read state events of this type"
                    }
                  }));
                case 38:
                  _context3.next = 43;
                  break;
                case 40:
                  msgtype = request.data.msgtype;
                  if (this.canReceiveRoomEvent(request.data.type, msgtype)) {
                    _context3.next = 43;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Cannot read room events of this type"
                    }
                  }));
                case 43:
                  if (!(request.data.room_ids === void 0 && askRoomIds.length === 0)) {
                    _context3.next = 50;
                    break;
                  }
                  console.warn("The widgetDriver uses deprecated behaviour:\n It does not set the viewedRoomId using `setViewedRoomId`");
                  _context3.next = 47;
                  return (
                    // This returns [] with the current driver of Element Web.
                    // Add default implementations of the `readRoomEvents` and `readStateEvents`
                    // methods to use `readRoomTimeline` and `readRoomState` if they are not overwritten.
                    request.data.state_key === void 0 ? this.driver.readRoomEvents(request.data.type, msgtype, limit, null, since) : this.driver.readStateEvents(request.data.type, stateKey, limit, null)
                  );
                case 47:
                  events = _context3.sent;
                  _context3.next = 68;
                  break;
                case 50:
                  _context3.next = 52;
                  return this.supportsUpdateState();
                case 52:
                  if (!_context3.sent) {
                    _context3.next = 58;
                    break;
                  }
                  _context3.next = 55;
                  return Promise.all(askRoomIds.map(function(roomId2) {
                    return _this8.driver.readRoomTimeline(roomId2, request.data.type, msgtype, stateKey, limit, since);
                  }));
                case 55:
                  events = _context3.sent.flat(1);
                  _context3.next = 68;
                  break;
                case 58:
                  if (!(request.data.state_key === void 0)) {
                    _context3.next = 64;
                    break;
                  }
                  _context3.next = 61;
                  return Promise.all(askRoomIds.map(function(roomId2) {
                    return _this8.driver.readRoomTimeline(roomId2, request.data.type, msgtype, stateKey, limit, since);
                  }));
                case 61:
                  _context3.t1 = _context3.sent;
                  _context3.next = 67;
                  break;
                case 64:
                  _context3.next = 66;
                  return Promise.all(askRoomIds.map(function(roomId2) {
                    return _this8.driver.readRoomState(roomId2, request.data.type, stateKey);
                  }));
                case 66:
                  _context3.t1 = _context3.sent;
                case 67:
                  events = _context3.t1.flat(1);
                case 68:
                  this.transport.reply(request, {
                    events
                  });
                case 69:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this, [[14, 24, 27, 30]]);
          }));
          function handleReadEvents(_x) {
            return _handleReadEvents.apply(this, arguments);
          }
          return handleReadEvents;
        })()
      }, {
        key: "handleSendEvent",
        value: function handleSendEvent(request) {
          var _this9 = this;
          if (!request.data.type) {
            return this.transport.reply(request, {
              error: {
                message: "Invalid request - missing event type"
              }
            });
          }
          if (!!request.data.room_id && !this.canUseRoomTimeline(request.data.room_id)) {
            return this.transport.reply(request, {
              error: {
                message: "Unable to access room timeline: ".concat(request.data.room_id)
              }
            });
          }
          if (request.data.parent_delay_id !== void 0) {
            console.warn("Data includes parent_delay_id, but the widgetDriver ignores it");
          }
          var delay = request.data.delay;
          if (delay !== void 0 && !this.hasCapability(_Capabilities.MatrixCapabilities.MSC4157SendDelayedEvent)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability for ".concat(_Capabilities.MatrixCapabilities.MSC4157SendDelayedEvent)
              }
            });
          }
          var isStickyEvent = request.data.sticky_duration_ms !== void 0;
          if (isStickyEvent && !this.hasCapability(_Capabilities.MatrixCapabilities.MSC4407SendStickyEvent)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability for ".concat(_Capabilities.MatrixCapabilities.MSC4407SendStickyEvent)
              }
            });
          }
          var sendEventPromise;
          if (request.data.state_key !== void 0) {
            if (!this.canSendStateEvent(request.data.type, request.data.state_key)) {
              return this.transport.reply(request, {
                error: {
                  message: "Cannot send state events of this type"
                }
              });
            }
            if (isStickyEvent) {
              return this.transport.reply(request, {
                error: {
                  message: "Cannot send a state event with a sticky duration"
                }
              });
            }
            if (delay !== void 0) {
              sendEventPromise = this.driver.sendDelayedEvent(delay, request.data.type, request.data.content || {}, request.data.state_key, request.data.room_id);
            } else {
              sendEventPromise = this.driver.sendEvent(request.data.type, request.data.content || {}, request.data.state_key, request.data.room_id);
            }
          } else {
            var content = request.data.content || {};
            var msgtype = content["msgtype"];
            if (!this.canSendRoomEvent(request.data.type, msgtype)) {
              return this.transport.reply(request, {
                error: {
                  message: "Cannot send room events of this type"
                }
              });
            }
            var params2 = [
              request.data.type,
              content,
              null,
              // not sending a state event
              request.data.room_id
            ];
            if (delay !== void 0 && request.data.sticky_duration_ms) {
              sendEventPromise = this.driver.sendDelayedStickyEvent(delay, request.data.sticky_duration_ms, request.data.type, content, request.data.room_id);
            } else if (delay !== void 0) {
              var _this$driver;
              sendEventPromise = (_this$driver = this.driver).sendDelayedEvent.apply(_this$driver, [delay].concat(params2));
            } else if (request.data.sticky_duration_ms) {
              sendEventPromise = this.driver.sendStickyEvent(request.data.sticky_duration_ms, request.data.type, content, request.data.room_id);
            } else {
              var _this$driver2;
              sendEventPromise = (_this$driver2 = this.driver).sendEvent.apply(_this$driver2, params2);
            }
          }
          sendEventPromise.then(function(sentEvent) {
            return _this9.transport.reply(request, _objectSpread({
              room_id: sentEvent.roomId
            }, "eventId" in sentEvent ? {
              event_id: sentEvent.eventId
            } : {
              delay_id: sentEvent.delayId
            }));
          })["catch"](function(e) {
            console.error("error sending event: ", e);
            _this9.handleDriverError(e, request, "Error sending event");
          });
        }
      }, {
        key: "handleUpdateDelayedEvent",
        value: function handleUpdateDelayedEvent(request) {
          var _this0 = this;
          if (!request.data.delay_id) {
            return this.transport.reply(request, {
              error: {
                message: "Invalid request - missing delay_id"
              }
            });
          }
          if (!this.hasCapability(_Capabilities.MatrixCapabilities.MSC4157UpdateDelayedEvent)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability"
              }
            });
          }
          var updateDelayedEvent;
          switch (request.data.action) {
            case _UpdateDelayedEventAction.UpdateDelayedEventAction.Cancel:
              updateDelayedEvent = this.driver.cancelScheduledDelayedEvent;
              break;
            case _UpdateDelayedEventAction.UpdateDelayedEventAction.Restart:
              updateDelayedEvent = this.driver.restartScheduledDelayedEvent;
              break;
            case _UpdateDelayedEventAction.UpdateDelayedEventAction.Send:
              updateDelayedEvent = this.driver.sendScheduledDelayedEvent;
              break;
            default:
              return this.transport.reply(request, {
                error: {
                  message: "Invalid request - unsupported action"
                }
              });
          }
          updateDelayedEvent.call(this.driver, request.data.delay_id).then(function() {
            return _this0.transport.reply(request, {});
          })["catch"](function(e) {
            console.error("error updating delayed event: ", e);
            _this0.handleDriverError(e, request, "Error updating delayed event");
          });
        }
      }, {
        key: "handleSendToDevice",
        value: (function() {
          var _handleSendToDevice = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(request) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (request.data.type) {
                    _context4.next = 4;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event type"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 4:
                  if (request.data.messages) {
                    _context4.next = 8;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event contents"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 8:
                  if (!(typeof request.data.encrypted !== "boolean")) {
                    _context4.next = 12;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing encryption flag"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 12:
                  if (this.canSendToDeviceEvent(request.data.type)) {
                    _context4.next = 16;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Cannot send to-device events of this type"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 16:
                  _context4.prev = 16;
                  _context4.next = 19;
                  return this.driver.sendToDevice(request.data.type, request.data.encrypted, request.data.messages);
                case 19:
                  this.transport.reply(request, {});
                  _context4.next = 26;
                  break;
                case 22:
                  _context4.prev = 22;
                  _context4.t0 = _context4["catch"](16);
                  console.error("error sending to-device event", _context4.t0);
                  this.handleDriverError(_context4.t0, request, "Error sending event");
                case 26:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this, [[16, 22]]);
          }));
          function handleSendToDevice(_x2) {
            return _handleSendToDevice.apply(this, arguments);
          }
          return handleSendToDevice;
        })()
      }, {
        key: "pollTurnServers",
        value: (function() {
          var _pollTurnServers = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5(turnServers, initialServer) {
            var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, server;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return this.transport.send(
                    _WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers,
                    initialServer
                    // it's compatible, but missing the index signature
                  );
                case 3:
                  _iteratorAbruptCompletion = false;
                  _didIteratorError = false;
                  _context5.prev = 5;
                  _iterator = _asyncIterator(turnServers);
                case 7:
                  _context5.next = 9;
                  return _iterator.next();
                case 9:
                  if (!(_iteratorAbruptCompletion = !(_step = _context5.sent).done)) {
                    _context5.next = 16;
                    break;
                  }
                  server = _step.value;
                  _context5.next = 13;
                  return this.transport.send(
                    _WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers,
                    server
                    // it's compatible, but missing the index signature
                  );
                case 13:
                  _iteratorAbruptCompletion = false;
                  _context5.next = 7;
                  break;
                case 16:
                  _context5.next = 22;
                  break;
                case 18:
                  _context5.prev = 18;
                  _context5.t0 = _context5["catch"](5);
                  _didIteratorError = true;
                  _iteratorError = _context5.t0;
                case 22:
                  _context5.prev = 22;
                  _context5.prev = 23;
                  if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                    _context5.next = 27;
                    break;
                  }
                  _context5.next = 27;
                  return _iterator["return"]();
                case 27:
                  _context5.prev = 27;
                  if (!_didIteratorError) {
                    _context5.next = 30;
                    break;
                  }
                  throw _iteratorError;
                case 30:
                  return _context5.finish(27);
                case 31:
                  return _context5.finish(22);
                case 32:
                  _context5.next = 37;
                  break;
                case 34:
                  _context5.prev = 34;
                  _context5.t1 = _context5["catch"](0);
                  console.error("error polling for TURN servers", _context5.t1);
                case 37:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this, [[0, 34], [5, 18, 22, 32], [23, , 27, 31]]);
          }));
          function pollTurnServers(_x3, _x4) {
            return _pollTurnServers.apply(this, arguments);
          }
          return pollTurnServers;
        })()
      }, {
        key: "handleWatchTurnServers",
        value: (function() {
          var _handleWatchTurnServers = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee6(request) {
            var turnServers, _yield$turnServers$ne, done, value;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC3846TurnServers)) {
                    _context6.next = 4;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  });
                  _context6.next = 26;
                  break;
                case 4:
                  if (!this.turnServers) {
                    _context6.next = 8;
                    break;
                  }
                  this.transport.reply(request, {});
                  _context6.next = 26;
                  break;
                case 8:
                  _context6.prev = 8;
                  turnServers = this.driver.getTurnServers();
                  _context6.next = 12;
                  return turnServers.next();
                case 12:
                  _yield$turnServers$ne = _context6.sent;
                  done = _yield$turnServers$ne.done;
                  value = _yield$turnServers$ne.value;
                  if (!done) {
                    _context6.next = 17;
                    break;
                  }
                  throw new Error("Client refuses to provide any TURN servers");
                case 17:
                  this.transport.reply(request, {});
                  this.pollTurnServers(turnServers, value);
                  this.turnServers = turnServers;
                  _context6.next = 26;
                  break;
                case 22:
                  _context6.prev = 22;
                  _context6.t0 = _context6["catch"](8);
                  console.error("error getting first TURN server results", _context6.t0);
                  this.transport.reply(request, {
                    error: {
                      message: "TURN servers not available"
                    }
                  });
                case 26:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this, [[8, 22]]);
          }));
          function handleWatchTurnServers(_x5) {
            return _handleWatchTurnServers.apply(this, arguments);
          }
          return handleWatchTurnServers;
        })()
      }, {
        key: "handleUnwatchTurnServers",
        value: (function() {
          var _handleUnwatchTurnServers = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee7(request) {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC3846TurnServers)) {
                    _context7.next = 4;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  });
                  _context7.next = 12;
                  break;
                case 4:
                  if (this.turnServers) {
                    _context7.next = 8;
                    break;
                  }
                  this.transport.reply(request, {});
                  _context7.next = 12;
                  break;
                case 8:
                  _context7.next = 10;
                  return this.turnServers["return"](void 0);
                case 10:
                  this.turnServers = null;
                  this.transport.reply(request, {});
                case 12:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function handleUnwatchTurnServers(_x6) {
            return _handleUnwatchTurnServers.apply(this, arguments);
          }
          return handleUnwatchTurnServers;
        })()
      }, {
        key: "handleReadRelations",
        value: (function() {
          var _handleReadRelations = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee8(request) {
            var _this1 = this;
            var result, chunk;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  if (request.data.event_id) {
                    _context8.next = 2;
                    break;
                  }
                  return _context8.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event ID"
                    }
                  }));
                case 2:
                  if (!(request.data.limit !== void 0 && request.data.limit < 0)) {
                    _context8.next = 4;
                    break;
                  }
                  return _context8.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - limit out of range"
                    }
                  }));
                case 4:
                  if (!(request.data.room_id !== void 0 && !this.canUseRoomTimeline(request.data.room_id))) {
                    _context8.next = 6;
                    break;
                  }
                  return _context8.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Unable to access room timeline: ".concat(request.data.room_id)
                    }
                  }));
                case 6:
                  _context8.prev = 6;
                  _context8.next = 9;
                  return this.driver.readEventRelations(request.data.event_id, request.data.room_id, request.data.rel_type, request.data.event_type, request.data.from, request.data.to, request.data.limit, request.data.direction);
                case 9:
                  result = _context8.sent;
                  chunk = result.chunk.filter(function(e) {
                    if (e.state_key !== void 0) {
                      return _this1.canReceiveStateEvent(e.type, e.state_key);
                    } else {
                      return _this1.canReceiveRoomEvent(e.type, e.content["msgtype"]);
                    }
                  });
                  return _context8.abrupt("return", this.transport.reply(request, {
                    chunk,
                    prev_batch: result.prevBatch,
                    next_batch: result.nextBatch
                  }));
                case 14:
                  _context8.prev = 14;
                  _context8.t0 = _context8["catch"](6);
                  console.error("error getting the relations", _context8.t0);
                  this.handleDriverError(_context8.t0, request, "Unexpected error while reading relations");
                case 18:
                case "end":
                  return _context8.stop();
              }
            }, _callee8, this, [[6, 14]]);
          }));
          function handleReadRelations(_x7) {
            return _handleReadRelations.apply(this, arguments);
          }
          return handleReadRelations;
        })()
      }, {
        key: "handleUserDirectorySearch",
        value: (function() {
          var _handleUserDirectorySearch = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee9(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC3973UserDirectorySearch)) {
                    _context9.next = 2;
                    break;
                  }
                  return _context9.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  if (!(typeof request.data.search_term !== "string")) {
                    _context9.next = 4;
                    break;
                  }
                  return _context9.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing search term"
                    }
                  }));
                case 4:
                  if (!(request.data.limit !== void 0 && request.data.limit < 0)) {
                    _context9.next = 6;
                    break;
                  }
                  return _context9.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - limit out of range"
                    }
                  }));
                case 6:
                  _context9.prev = 6;
                  _context9.next = 9;
                  return this.driver.searchUserDirectory(request.data.search_term, request.data.limit);
                case 9:
                  result = _context9.sent;
                  return _context9.abrupt("return", this.transport.reply(request, {
                    limited: result.limited,
                    results: result.results.map(function(r) {
                      return {
                        user_id: r.userId,
                        display_name: r.displayName,
                        avatar_url: r.avatarUrl
                      };
                    })
                  }));
                case 13:
                  _context9.prev = 13;
                  _context9.t0 = _context9["catch"](6);
                  console.error("error searching in the user directory", _context9.t0);
                  this.handleDriverError(_context9.t0, request, "Unexpected error while searching in the user directory");
                case 17:
                case "end":
                  return _context9.stop();
              }
            }, _callee9, this, [[6, 13]]);
          }));
          function handleUserDirectorySearch(_x8) {
            return _handleUserDirectorySearch.apply(this, arguments);
          }
          return handleUserDirectorySearch;
        })()
      }, {
        key: "handleGetMediaConfig",
        value: (function() {
          var _handleGetMediaConfig = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee0(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee0$(_context0) {
              while (1) switch (_context0.prev = _context0.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4039UploadFile)) {
                    _context0.next = 2;
                    break;
                  }
                  return _context0.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context0.prev = 2;
                  _context0.next = 5;
                  return this.driver.getMediaConfig();
                case 5:
                  result = _context0.sent;
                  return _context0.abrupt("return", this.transport.reply(request, result));
                case 9:
                  _context0.prev = 9;
                  _context0.t0 = _context0["catch"](2);
                  console.error("error while getting the media configuration", _context0.t0);
                  this.handleDriverError(_context0.t0, request, "Unexpected error while getting the media configuration");
                case 13:
                case "end":
                  return _context0.stop();
              }
            }, _callee0, this, [[2, 9]]);
          }));
          function handleGetMediaConfig(_x9) {
            return _handleGetMediaConfig.apply(this, arguments);
          }
          return handleGetMediaConfig;
        })()
      }, {
        key: "handleRtcTransports",
        value: (function() {
          var _handleRtcTransports = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee1(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee1$(_context1) {
              while (1) switch (_context1.prev = _context1.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4515RtcTransports)) {
                    _context1.next = 2;
                    break;
                  }
                  return _context1.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context1.prev = 2;
                  _context1.next = 5;
                  return this.driver.getRtcTransports();
                case 5:
                  result = _context1.sent;
                  return _context1.abrupt("return", this.transport.reply(request, {
                    rtc_transports: result.rtc_transports
                  }));
                case 9:
                  _context1.prev = 9;
                  _context1.t0 = _context1["catch"](2);
                  console.error("error while getting the RTC transports", _context1.t0);
                  this.handleDriverError(_context1.t0, request, "Unexpected error while getting the RTC transports");
                case 13:
                case "end":
                  return _context1.stop();
              }
            }, _callee1, this, [[2, 9]]);
          }));
          function handleRtcTransports(_x0) {
            return _handleRtcTransports.apply(this, arguments);
          }
          return handleRtcTransports;
        })()
      }, {
        key: "handleUploadFile",
        value: (function() {
          var _handleUploadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee10(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee10$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4039UploadFile)) {
                    _context10.next = 2;
                    break;
                  }
                  return _context10.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context10.prev = 2;
                  _context10.next = 5;
                  return this.driver.uploadFile(request.data.file);
                case 5:
                  result = _context10.sent;
                  return _context10.abrupt("return", this.transport.reply(request, {
                    content_uri: result.contentUri
                  }));
                case 9:
                  _context10.prev = 9;
                  _context10.t0 = _context10["catch"](2);
                  console.error("error while uploading a file", _context10.t0);
                  this.handleDriverError(_context10.t0, request, "Unexpected error while uploading a file");
                case 13:
                case "end":
                  return _context10.stop();
              }
            }, _callee10, this, [[2, 9]]);
          }));
          function handleUploadFile(_x1) {
            return _handleUploadFile.apply(this, arguments);
          }
          return handleUploadFile;
        })()
      }, {
        key: "handleDownloadFile",
        value: (function() {
          var _handleDownloadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee11(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4039DownloadFile)) {
                    _context11.next = 2;
                    break;
                  }
                  return _context11.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context11.prev = 2;
                  _context11.next = 5;
                  return this.driver.downloadFile(request.data.content_uri);
                case 5:
                  result = _context11.sent;
                  return _context11.abrupt("return", this.transport.reply(request, {
                    file: result.file
                  }));
                case 9:
                  _context11.prev = 9;
                  _context11.t0 = _context11["catch"](2);
                  console.error("error while downloading a file", _context11.t0);
                  this.handleDriverError(_context11.t0, request, "Unexpected error while downloading a file");
                case 13:
                case "end":
                  return _context11.stop();
              }
            }, _callee11, this, [[2, 9]]);
          }));
          function handleDownloadFile(_x10) {
            return _handleDownloadFile.apply(this, arguments);
          }
          return handleDownloadFile;
        })()
      }, {
        key: "handleRtcLivekitGetToken",
        value: (function() {
          var _handleRtcLivekitGetToken = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee12(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
              while (1) switch (_context12.prev = _context12.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitGetToken)) {
                    _context12.next = 2;
                    break;
                  }
                  return _context12.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context12.prev = 2;
                  _context12.next = 5;
                  return this.driver.getRtcLivekitToken(request.data);
                case 5:
                  result = _context12.sent;
                  return _context12.abrupt("return", this.transport.reply(request, result));
                case 9:
                  _context12.prev = 9;
                  _context12.t0 = _context12["catch"](2);
                  console.error("error while getting a LiveKit token", _context12.t0);
                  this.handleDriverError(_context12.t0, request, "Unexpected error while getting a LiveKit token");
                case 13:
                case "end":
                  return _context12.stop();
              }
            }, _callee12, this, [[2, 9]]);
          }));
          function handleRtcLivekitGetToken(_x11) {
            return _handleRtcLivekitGetToken.apply(this, arguments);
          }
          return handleRtcLivekitGetToken;
        })()
      }, {
        key: "handleRtcLivekitDelegateDelayedLeave",
        value: (function() {
          var _handleRtcLivekitDelegateDelayedLeave = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee13(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee13$(_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitDelegateDelayedLeave)) {
                    _context13.next = 2;
                    break;
                  }
                  return _context13.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context13.prev = 2;
                  _context13.next = 5;
                  return this.driver.delegateRtcLivekitDelayedLeave(request.data);
                case 5:
                  result = _context13.sent;
                  return _context13.abrupt("return", this.transport.reply(request, result));
                case 9:
                  _context13.prev = 9;
                  _context13.t0 = _context13["catch"](2);
                  console.error("error while delegating a LiveKit delayed leave", _context13.t0);
                  this.handleDriverError(_context13.t0, request, "Unexpected error while delegating a LiveKit delayed leave");
                case 13:
                case "end":
                  return _context13.stop();
              }
            }, _callee13, this, [[2, 9]]);
          }));
          function handleRtcLivekitDelegateDelayedLeave(_x12) {
            return _handleRtcLivekitDelegateDelayedLeave.apply(this, arguments);
          }
          return handleRtcLivekitDelegateDelayedLeave;
        })()
      }, {
        key: "handleDriverError",
        value: function handleDriverError(e, request, message) {
          var data = this.driver.processError(e);
          this.transport.reply(request, {
            error: _objectSpread({
              message
            }, data)
          });
        }
      }, {
        key: "handleMessage",
        value: function handleMessage(ev) {
          if (this.isStopped) return;
          var actionEv = new CustomEvent("action:".concat(ev.detail.action), {
            detail: ev.detail,
            cancelable: true
          });
          this.emit("action:".concat(ev.detail.action), actionEv);
          if (!actionEv.defaultPrevented) {
            switch (ev.detail.action) {
              case _WidgetApiAction.WidgetApiFromWidgetAction.ContentLoaded:
                return this.handleContentLoadedAction(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.SupportedApiVersions:
                return this.replyVersions(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.SendEvent:
                return this.handleSendEvent(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.SendToDevice:
                return this.handleSendToDevice(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.GetOpenIDCredentials:
                return this.handleOIDC(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2931Navigate:
                return this.handleNavigate(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2974RenegotiateCapabilities:
                return this.handleCapabilitiesRenegotiate(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents:
                return this.handleReadEvents(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.WatchTurnServers:
                return this.handleWatchTurnServers(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.UnwatchTurnServers:
                return this.handleUnwatchTurnServers(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC3869ReadRelations:
                return this.handleReadRelations(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC3973UserDirectorySearch:
                return this.handleUserDirectorySearch(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.BeeperReadRoomAccountData:
                return this.handleReadRoomAccountData(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4039GetMediaConfigAction:
                return this.handleGetMediaConfig(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4515GetRtcTransports:
                return this.handleRtcTransports(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4039UploadFileAction:
                return this.handleUploadFile(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4039DownloadFileAction:
                return this.handleDownloadFile(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent:
                return this.handleUpdateDelayedEvent(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitGetToken:
                return this.handleRtcLivekitGetToken(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitDelegateDelayedLeave:
                return this.handleRtcLivekitDelegateDelayedLeave(ev.detail);
              default:
                return this.transport.reply(ev.detail, {
                  error: {
                    message: "Unknown or unsupported from-widget action: " + ev.detail.action
                  }
                });
            }
          }
        }
        /**
         * Informs the widget that the client's theme has changed.
         * @param theme The theme data, as an object with arbitrary contents.
         */
      }, {
        key: "updateTheme",
        value: function updateTheme(theme) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.ThemeChange, theme);
        }
        /**
         * Informs the widget that the client's language has changed.
         * @param lang The BCP 47 identifier representing the client's current language.
         */
      }, {
        key: "updateLanguage",
        value: function updateLanguage(lang) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.LanguageChange, {
            lang
          });
        }
        /**
         * Takes a screenshot of the widget.
         * @returns Resolves to the widget's screenshot.
         * @throws Throws if there is a problem.
         */
      }, {
        key: "takeScreenshot",
        value: function takeScreenshot() {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.TakeScreenshot, {});
        }
        /**
         * Alerts the widget to whether or not it is currently visible.
         * @param {boolean} isVisible Whether the widget is visible or not.
         * @returns {Promise<IWidgetApiResponseData>} Resolves when the widget acknowledges the update.
         */
      }, {
        key: "updateVisibility",
        value: function updateVisibility(isVisible) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.UpdateVisibility, {
            visible: isVisible
          });
        }
      }, {
        key: "sendWidgetConfig",
        value: function sendWidgetConfig(data) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.WidgetConfig, data).then();
        }
      }, {
        key: "notifyModalWidgetButtonClicked",
        value: function notifyModalWidgetButtonClicked(id) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.ButtonClicked, {
            id
          }).then();
        }
      }, {
        key: "notifyModalWidgetClose",
        value: function notifyModalWidgetClose(data) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.CloseModalWidget, data).then();
        }
        /**
         * Feeds an event to the widget. As a client you are expected to call this
         * for every new event in every room to which you are joined or invited.
         * @param {IRoomEvent} rawEvent The event to (try to) send to the widget.
         * @param {string} currentViewedRoomId The room ID the user is currently
         *   interacting with. Not the room ID of the event.
         * @returns {Promise<void>} Resolves when delivered or if the widget is not
         *   able to read the event due to permissions, rejects if the widget failed
         *   to handle the event.
         * @deprecated It is recommended to communicate the viewed room ID by calling
         *   {@link ClientWidgetApi.setViewedRoomId} rather than passing it to this
         *   method.
         */
      }, {
        key: "feedEvent",
        value: (function() {
          var _feedEvent = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee14(rawEvent, currentViewedRoomId) {
            var _rawEvent$content;
            return _regeneratorRuntime().wrap(function _callee14$(_context14) {
              while (1) switch (_context14.prev = _context14.next) {
                case 0:
                  if (currentViewedRoomId !== void 0) this.setViewedRoomId(currentViewedRoomId);
                  if (!(rawEvent.room_id !== this.viewedRoomId && !this.canUseRoomTimeline(rawEvent.room_id))) {
                    _context14.next = 3;
                    break;
                  }
                  return _context14.abrupt("return");
                case 3:
                  if (!(rawEvent.state_key !== void 0 && rawEvent.state_key !== null)) {
                    _context14.next = 8;
                    break;
                  }
                  if (this.canReceiveStateEvent(rawEvent.type, rawEvent.state_key)) {
                    _context14.next = 6;
                    break;
                  }
                  return _context14.abrupt("return");
                case 6:
                  _context14.next = 10;
                  break;
                case 8:
                  if (this.canReceiveRoomEvent(rawEvent.type, (_rawEvent$content = rawEvent.content) === null || _rawEvent$content === void 0 ? void 0 : _rawEvent$content["msgtype"])) {
                    _context14.next = 10;
                    break;
                  }
                  return _context14.abrupt("return");
                case 10:
                  _context14.next = 12;
                  return this.transport.send(
                    _WidgetApiAction.WidgetApiToWidgetAction.SendEvent,
                    // it's compatible, but missing the index signature
                    rawEvent
                  );
                case 12:
                case "end":
                  return _context14.stop();
              }
            }, _callee14, this);
          }));
          function feedEvent(_x13, _x14) {
            return _feedEvent.apply(this, arguments);
          }
          return feedEvent;
        })()
        /**
         * Feeds a to-device event to the widget. As a client you are expected to
         * call this for every to-device event you receive.
         * @param {IRoomEvent} rawEvent The event to (try to) send to the widget.
         * @param {boolean} encrypted Whether the event contents were encrypted.
         * @returns {Promise<void>} Resolves when delivered or if the widget is not
         *   able to receive the event due to permissions, rejects if the widget
         *   failed to handle the event.
         */
      }, {
        key: "feedToDevice",
        value: (function() {
          var _feedToDevice = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee15(message, encrypted) {
            return _regeneratorRuntime().wrap(function _callee15$(_context15) {
              while (1) switch (_context15.prev = _context15.next) {
                case 0:
                  if (!this.canReceiveToDeviceEvent(message.type)) {
                    _context15.next = 3;
                    break;
                  }
                  _context15.next = 3;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.SendToDevice, _objectSpread(_objectSpread({}, message), {}, {
                    encrypted
                  }));
                case 3:
                case "end":
                  return _context15.stop();
              }
            }, _callee15, this);
          }));
          function feedToDevice(_x15, _x16) {
            return _feedToDevice.apply(this, arguments);
          }
          return feedToDevice;
        })()
      }, {
        key: "setViewedRoomId",
        value: (
          /**
           * Indicate that a room is being viewed (making it possible for the widget
           * to interact with it).
           */
          function setViewedRoomId(roomId) {
            this.viewedRoomId = roomId;
            if (roomId !== null && !this.canUseRoomTimeline(roomId)) this.pushRoomState(roomId);
          }
        )
      }, {
        key: "flushRoomState",
        value: (function() {
          var _flushRoomState = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee16() {
            var events, _iterator7, _step7, eventTypeMap, _iterator8, _step8, stateKeyMap;
            return _regeneratorRuntime().wrap(function _callee16$(_context16) {
              while (1) switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.prev = 0;
                case 1:
                  _context16.next = 3;
                  return Promise.all(this.pushRoomStateTasks);
                case 3:
                  if (this.pushRoomStateTasks.size > 0) {
                    _context16.next = 1;
                    break;
                  }
                case 4:
                  events = [];
                  _iterator7 = _createForOfIteratorHelper(this.pushRoomStateResult.values());
                  try {
                    for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
                      eventTypeMap = _step7.value;
                      _iterator8 = _createForOfIteratorHelper(eventTypeMap.values());
                      try {
                        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
                          stateKeyMap = _step8.value;
                          events.push.apply(events, _toConsumableArray(stateKeyMap.values()));
                        }
                      } catch (err) {
                        _iterator8.e(err);
                      } finally {
                        _iterator8.f();
                      }
                    }
                  } catch (err) {
                    _iterator7.e(err);
                  } finally {
                    _iterator7.f();
                  }
                  _context16.next = 9;
                  return this.getWidgetVersions();
                case 9:
                  if (!_context16.sent.includes(_ApiVersion.UnstableApiVersion.MSC2762_UPDATE_STATE)) {
                    _context16.next = 12;
                    break;
                  }
                  _context16.next = 12;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.UpdateState, {
                    state: events
                  });
                case 12:
                  _context16.prev = 12;
                  this.flushRoomStateTask = null;
                  return _context16.finish(12);
                case 15:
                case "end":
                  return _context16.stop();
              }
            }, _callee16, this, [[0, , 12, 15]]);
          }));
          function flushRoomState() {
            return _flushRoomState.apply(this, arguments);
          }
          return flushRoomState;
        })()
        /**
         * Reads the current sticky state of the room and pushes it to the widget.
         *
         * It will only push events that the widget is allowed to receive.
         * @param roomId
         * @private
         */
      }, {
        key: "pushStickyState",
        value: (function() {
          var _pushStickyState = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee18(roomId) {
            var _this10 = this;
            return _regeneratorRuntime().wrap(function _callee18$(_context18) {
              while (1) switch (_context18.prev = _context18.next) {
                case 0:
                  console.debug("Pushing sticky state to widget for room", roomId);
                  return _context18.abrupt("return", this.driver.readStickyEvents(roomId).then(function(events) {
                    var filtered = events.filter(function(e) {
                      var _e$content;
                      return _this10.canReceiveRoomEvent(e.type, typeof ((_e$content = e.content) === null || _e$content === void 0 ? void 0 : _e$content.msgtype) === "string" ? e.content.msgtype : null);
                    });
                    return {
                      roomId,
                      stickyEvents: filtered
                    };
                  }).then(/* @__PURE__ */ (function() {
                    var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee17(_ref) {
                      var roomId2, stickyEvents, promises;
                      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                        while (1) switch (_context17.prev = _context17.next) {
                          case 0:
                            roomId2 = _ref.roomId, stickyEvents = _ref.stickyEvents;
                            console.debug("Pushing", stickyEvents.length, "sticky events to widget for room", roomId2);
                            promises = stickyEvents.map(function(rawEvent) {
                              return _this10.transport.send(
                                _WidgetApiAction.WidgetApiToWidgetAction.SendEvent,
                                // copied from feedEvent; it's compatible, but missing the index signature
                                rawEvent
                              );
                            });
                            _context17.next = 5;
                            return Promise.all(promises);
                          case 5:
                          case "end":
                            return _context17.stop();
                        }
                      }, _callee17);
                    }));
                    return function(_x18) {
                      return _ref2.apply(this, arguments);
                    };
                  })()));
                case 2:
                case "end":
                  return _context18.stop();
              }
            }, _callee18, this);
          }));
          function pushStickyState(_x17) {
            return _pushStickyState.apply(this, arguments);
          }
          return pushStickyState;
        })()
      }, {
        key: "pushRoomState",
        value: function pushRoomState(roomId) {
          var _this11 = this;
          var _iterator9 = _createForOfIteratorHelper(this.allowedEvents), _step9;
          try {
            var _loop2 = function _loop22() {
              var cap = _step9.value;
              if (cap.kind === _WidgetEventCapability.EventKind.State && cap.direction === _WidgetEventCapability.EventDirection.Receive) {
                var _cap$keyStr, _this11$flushRoomStat;
                var events = _this11.driver.readRoomState(roomId, cap.eventType, (_cap$keyStr = cap.keyStr) !== null && _cap$keyStr !== void 0 ? _cap$keyStr : void 0);
                var task = events.then(function(events2) {
                  var _iterator0 = _createForOfIteratorHelper(events2), _step0;
                  try {
                    for (_iterator0.s(); !(_step0 = _iterator0.n()).done; ) {
                      var event = _step0.value;
                      var eventTypeMap = _this11.pushRoomStateResult.get(roomId);
                      if (eventTypeMap === void 0) {
                        eventTypeMap = /* @__PURE__ */ new Map();
                        _this11.pushRoomStateResult.set(roomId, eventTypeMap);
                      }
                      var stateKeyMap = eventTypeMap.get(cap.eventType);
                      if (stateKeyMap === void 0) {
                        stateKeyMap = /* @__PURE__ */ new Map();
                        eventTypeMap.set(cap.eventType, stateKeyMap);
                      }
                      if (!stateKeyMap.has(event.state_key)) stateKeyMap.set(event.state_key, event);
                    }
                  } catch (err) {
                    _iterator0.e(err);
                  } finally {
                    _iterator0.f();
                  }
                }, function(e) {
                  return console.error("Failed to read room state for ".concat(roomId, " (").concat(cap.eventType, ", ").concat(cap.keyStr, ")"), e);
                }).then(function() {
                  _this11.pushRoomStateTasks["delete"](task);
                });
                _this11.pushRoomStateTasks.add(task);
                (_this11$flushRoomStat = _this11.flushRoomStateTask) !== null && _this11$flushRoomStat !== void 0 ? _this11$flushRoomStat : _this11.flushRoomStateTask = _this11.flushRoomState();
                _this11.flushRoomStateTask["catch"](function(e) {
                  return console.error("Failed to push room state", e);
                });
              }
            };
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
              _loop2();
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
        /**
         * Feeds a room state update to the widget. As a client you are expected to
         * call this for every state update in every room to which you are joined or
         * invited.
         * @param {IRoomEvent} rawEvent The state event corresponding to the updated
         *   room state entry.
         * @returns {Promise<void>} Resolves when delivered or if the widget is not
         *   able to receive the room state due to permissions, rejects if the
         *   widget failed to handle the update.
         */
      }, {
        key: "feedStateUpdate",
        value: (function() {
          var _feedStateUpdate = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee19(rawEvent) {
            var eventTypeMap, stateKeyMap;
            return _regeneratorRuntime().wrap(function _callee19$(_context19) {
              while (1) switch (_context19.prev = _context19.next) {
                case 0:
                  if (!(rawEvent.state_key === void 0)) {
                    _context19.next = 2;
                    break;
                  }
                  throw new Error("Not a state event");
                case 2:
                  if (!((rawEvent.room_id === this.viewedRoomId || this.canUseRoomTimeline(rawEvent.room_id)) && this.canReceiveStateEvent(rawEvent.type, rawEvent.state_key))) {
                    _context19.next = 21;
                    break;
                  }
                  if (!(this.pushRoomStateTasks.size === 0)) {
                    _context19.next = 11;
                    break;
                  }
                  _context19.next = 6;
                  return this.getWidgetVersions();
                case 6:
                  if (!_context19.sent.includes(_ApiVersion.UnstableApiVersion.MSC2762_UPDATE_STATE)) {
                    _context19.next = 9;
                    break;
                  }
                  _context19.next = 9;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.UpdateState, {
                    state: [rawEvent]
                  });
                case 9:
                  _context19.next = 21;
                  break;
                case 11:
                  eventTypeMap = this.pushRoomStateResult.get(rawEvent.room_id);
                  if (eventTypeMap === void 0) {
                    eventTypeMap = /* @__PURE__ */ new Map();
                    this.pushRoomStateResult.set(rawEvent.room_id, eventTypeMap);
                  }
                  stateKeyMap = eventTypeMap.get(rawEvent.type);
                  if (stateKeyMap === void 0) {
                    stateKeyMap = /* @__PURE__ */ new Map();
                    eventTypeMap.set(rawEvent.type, stateKeyMap);
                  }
                  if (!stateKeyMap.has(rawEvent.type)) stateKeyMap.set(rawEvent.state_key, rawEvent);
                case 16:
                  _context19.next = 18;
                  return Promise.all(this.pushRoomStateTasks);
                case 18:
                  if (this.pushRoomStateTasks.size > 0) {
                    _context19.next = 16;
                    break;
                  }
                case 19:
                  _context19.next = 21;
                  return this.flushRoomStateTask;
                case 21:
                case "end":
                  return _context19.stop();
              }
            }, _callee19, this);
          }));
          function feedStateUpdate(_x19) {
            return _feedStateUpdate.apply(this, arguments);
          }
          return feedStateUpdate;
        })()
      }]);
      return ClientWidgetApi2;
    })(_events.EventEmitter);
    exports.ClientWidgetApi = ClientWidgetApi;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/IWidgetApiErrorResponse.js
var require_IWidgetApiErrorResponse = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/IWidgetApiErrorResponse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isErrorResponse = isErrorResponse;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isErrorResponse(responseData) {
      var error = responseData.error;
      return _typeof(error) === "object" && error !== null && "message" in error && typeof error.message === "string";
    }
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetKind.js
var require_WidgetKind = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/WidgetKind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetKind = void 0;
    var WidgetKind = /* @__PURE__ */ (function(WidgetKind2) {
      WidgetKind2["Room"] = "room";
      WidgetKind2["Account"] = "account";
      WidgetKind2["Modal"] = "modal";
      return WidgetKind2;
    })({});
    exports.WidgetKind = WidgetKind;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/ModalButtonKind.js
var require_ModalButtonKind = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/interfaces/ModalButtonKind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ModalButtonKind = void 0;
    var ModalButtonKind = /* @__PURE__ */ (function(ModalButtonKind2) {
      ModalButtonKind2["Primary"] = "m.primary";
      ModalButtonKind2["Secondary"] = "m.secondary";
      ModalButtonKind2["Warning"] = "m.warning";
      ModalButtonKind2["Danger"] = "m.danger";
      ModalButtonKind2["Link"] = "m.link";
      return ModalButtonKind2;
    })({});
    exports.ModalButtonKind = ModalButtonKind;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/validation/url.js
var require_url = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/validation/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isValidUrl = isValidUrl;
    function isValidUrl(val) {
      if (!val) return false;
      try {
        var parsed = new URL(val);
        if (parsed.protocol !== "http" && parsed.protocol !== "https") {
          return false;
        }
        return true;
      } catch (e) {
        if (e instanceof TypeError) {
          return false;
        }
        throw e;
      }
    }
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/validation/utils.js
var require_utils = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/validation/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.assertPresent = assertPresent;
    function assertPresent(obj, key) {
      if (!obj[key]) {
        throw new Error("".concat(String(key), " is required"));
      }
    }
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/Widget.js
var require_Widget = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/Widget.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Widget = void 0;
    var _ = require_lib();
    var _utils = require_utils();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var Widget = /* @__PURE__ */ (function() {
      function Widget2(definition) {
        _classCallCheck(this, Widget2);
        this.definition = definition;
        if (!this.definition) throw new Error("Definition is required");
        (0, _utils.assertPresent)(definition, "id");
        (0, _utils.assertPresent)(definition, "creatorUserId");
        (0, _utils.assertPresent)(definition, "type");
        (0, _utils.assertPresent)(definition, "url");
      }
      _createClass(Widget2, [{
        key: "creatorUserId",
        get: function get() {
          return this.definition.creatorUserId;
        }
        /**
         * The type of widget.
         */
      }, {
        key: "type",
        get: function get() {
          return this.definition.type;
        }
        /**
         * The ID of the widget.
         */
      }, {
        key: "id",
        get: function get() {
          return this.definition.id;
        }
        /**
         * The name of the widget, or null if not set.
         */
      }, {
        key: "name",
        get: function get() {
          return this.definition.name || null;
        }
        /**
         * The title for the widget, or null if not set.
         */
      }, {
        key: "title",
        get: function get() {
          return this.rawData.title || null;
        }
        /**
         * The templated URL for the widget.
         */
      }, {
        key: "templateUrl",
        get: function get() {
          return this.definition.url;
        }
        /**
         * The origin for this widget.
         */
      }, {
        key: "origin",
        get: function get() {
          return new URL(this.templateUrl).origin;
        }
        /**
         * Whether or not the client should wait for the iframe to load. Defaults
         * to true.
         */
      }, {
        key: "waitForIframeLoad",
        get: function get() {
          if (this.definition.waitForIframeLoad === false) return false;
          if (this.definition.waitForIframeLoad === true) return true;
          return true;
        }
        /**
         * The raw data for the widget. This will always be defined, though
         * may be empty.
         */
      }, {
        key: "rawData",
        get: function get() {
          return this.definition.data || {};
        }
        /**
         * Gets a complete widget URL for the client to render.
         * @param {ITemplateParams} params The template parameters.
         * @returns {string} A templated URL.
         */
      }, {
        key: "getCompleteUrl",
        value: function getCompleteUrl(params2) {
          return (0, _.runTemplate)(this.templateUrl, this.definition, params2);
        }
      }]);
      return Widget2;
    })();
    exports.Widget = Widget;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/WidgetParser.js
var require_WidgetParser = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/models/WidgetParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetParser = void 0;
    var _Widget = require_Widget();
    var _url = require_url();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var WidgetParser = /* @__PURE__ */ (function() {
      function WidgetParser2() {
        _classCallCheck(this, WidgetParser2);
      }
      _createClass(WidgetParser2, null, [{
        key: "parseAccountData",
        value: function parseAccountData(content) {
          if (!content) return [];
          var result = [];
          for (var _i = 0, _Object$keys = Object.keys(content); _i < _Object$keys.length; _i++) {
            var _widgetId = _Object$keys[_i];
            var roughWidget = content[_widgetId];
            if (!roughWidget) continue;
            if (roughWidget.type !== "m.widget" && roughWidget.type !== "im.vector.modular.widgets") continue;
            if (!roughWidget.sender) continue;
            var probableWidgetId = roughWidget.state_key || roughWidget.id;
            if (probableWidgetId !== _widgetId) continue;
            var asStateEvent = {
              content: roughWidget.content,
              sender: roughWidget.sender,
              type: "m.widget",
              state_key: _widgetId,
              event_id: "$example",
              room_id: "!example",
              origin_server_ts: 1
            };
            var widget = WidgetParser2.parseRoomWidget(asStateEvent);
            if (widget) result.push(widget);
          }
          return result;
        }
        /**
         * Parses all the widgets possible in the given array. This will always return
         * an array, though may be empty if no widgets could be parsed.
         * @param {IStateEvent[]} currentState The room state to parse.
         * @returns {Widget[]} The widgets in the state, or an empty array.
         */
      }, {
        key: "parseWidgetsFromRoomState",
        value: function parseWidgetsFromRoomState(currentState) {
          if (!currentState) return [];
          var result = [];
          var _iterator = _createForOfIteratorHelper(currentState), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var state = _step.value;
              var widget = WidgetParser2.parseRoomWidget(state);
              if (widget) result.push(widget);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return result;
        }
        /**
         * Parses a state event into a widget. If the state event does not represent
         * a widget (wrong event type, invalid widget, etc) then null is returned.
         * @param {IStateEvent} stateEvent The state event.
         * @returns {Widget|null} The widget, or null if invalid
         */
      }, {
        key: "parseRoomWidget",
        value: function parseRoomWidget(stateEvent) {
          if (!stateEvent) return null;
          if (stateEvent.type !== "m.widget" && stateEvent.type !== "im.vector.modular.widgets") {
            return null;
          }
          var content = stateEvent.content || {};
          var estimatedWidget = {
            id: stateEvent.state_key,
            creatorUserId: content["creatorUserId"] || stateEvent.sender,
            name: content["name"],
            type: content["type"],
            url: content["url"],
            waitForIframeLoad: content["waitForIframeLoad"],
            data: content["data"]
          };
          return WidgetParser2.processEstimatedWidget(estimatedWidget);
        }
      }, {
        key: "processEstimatedWidget",
        value: function processEstimatedWidget(widget) {
          if (!widget.id || !widget.creatorUserId || !widget.type) {
            return null;
          }
          if (!(0, _url.isValidUrl)(widget.url)) {
            return null;
          }
          return new _Widget.Widget(widget);
        }
      }]);
      return WidgetParser2;
    })();
    exports.WidgetParser = WidgetParser;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/templating/url-template.js
var require_url_template = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/templating/url-template.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.runTemplate = runTemplate;
    exports.toString = toString;
    function runTemplate(url, widget, params2) {
      var variables = Object.assign({}, widget.data, {
        "matrix_room_id": params2.widgetRoomId || "",
        "matrix_user_id": params2.currentUserId,
        "matrix_display_name": params2.userDisplayName || params2.currentUserId,
        "matrix_avatar_url": params2.userHttpAvatarUrl || "",
        "matrix_widget_id": widget.id,
        // TODO: Convert to stable (https://github.com/matrix-org/matrix-doc/pull/2873)
        "org.matrix.msc2873.client_id": params2.clientId || "",
        "org.matrix.msc2873.client_theme": params2.clientTheme || "",
        "org.matrix.msc2873.client_language": params2.clientLanguage || "",
        // TODO: Convert to stable (https://github.com/matrix-org/matrix-spec-proposals/pull/3819)
        "org.matrix.msc3819.matrix_device_id": params2.deviceId || "",
        // TODO: Convert to stable (https://github.com/matrix-org/matrix-spec-proposals/pull/4039)
        "org.matrix.msc4039.matrix_base_url": params2.baseUrl || ""
      });
      var result = url;
      for (var _i = 0, _Object$keys = Object.keys(variables); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var pattern = "$".concat(key).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        var rexp = new RegExp(pattern, "g");
        result = result.replace(rexp, encodeURIComponent(toString(variables[key])));
      }
      return result;
    }
    function toString(a) {
      if (a === null || a === void 0) {
        return "".concat(a);
      }
      return String(a);
    }
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/driver/WidgetDriver.js
var require_WidgetDriver = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/driver/WidgetDriver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetDriver = void 0;
    var _ = require_lib();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var WidgetDriver = /* @__PURE__ */ (function() {
      function WidgetDriver2() {
        _classCallCheck(this, WidgetDriver2);
      }
      _createClass(WidgetDriver2, [{
        key: "validateCapabilities",
        value: (
          /**
           * Verifies the widget's requested capabilities, returning the ones
           * it is approved to use. Mutating the requested capabilities will
           * have no effect.
           *
           * This SHOULD result in the user being prompted to approve/deny
           * capabilities.
           *
           * By default this rejects all capabilities (returns an empty set).
           * @param {Set<Capability>} requested The set of requested capabilities.
           * @returns {Promise<Set<Capability>>} Resolves to the allowed capabilities.
           */
          function validateCapabilities(requested) {
            return Promise.resolve(/* @__PURE__ */ new Set());
          }
        )
        /**
         * Sends an event into a room. If `roomId` is falsy, the client should send the event
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {string} eventType The event type to be sent.
         * @param {*} content The content for the event.
         * @param {string|null} stateKey The state key if this is a state event, otherwise null.
         * May be an empty string.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendEventDetails>} Resolves when the event has been sent with
         * details of that event.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendEvent",
        value: function sendEvent(eventType, content) {
          var stateKey = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          var roomId = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4407
         * Sends a sticky event into a room. If `roomId` is falsy, the client should send the event
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {number} stickyDurationMs The length of time a sticky event may remain sticky, in milliseconds.
         * @param {string} eventType The event type to be sent.
         * @param {*} content The content for the event.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendEventDetails>} Resolves when the event has been sent with
         * details of that event.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendStickyEvent",
        value: function sendStickyEvent(stickyDurationMs, eventType, content) {
          var roomId = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          throw new Error("Method not implemented.");
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Sends a delayed event into a room. If `roomId` is falsy, the client should send it
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {number} delay How much later to send the event.
         * @param {string} eventType The event type of the event to be sent.
         * @param {*} content The content for the event to be sent.
         * @param {string|null} stateKey The state key if the event to be sent a state event,
         * otherwise null. May be an empty string.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendDelayedEventDetails>} Resolves when the delayed event has been
         * prepared with details of how to refer to it for updating/sending/canceling it later.
         * @throws Rejected when the delayed event could not be sent.
         */
      }, {
        key: "sendDelayedEvent",
        value: function sendDelayedEvent(delay, eventType, content) {
          var stateKey = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          var roomId = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4140, MSC4157 and MSC4407
         * Sends a delayed sticky event into a room. If `roomId` is falsy, the client should send the event
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {number} stickyDurationMs The length of time a sticky event may remain sticky, in milliseconds.
         * @param {number} delay How much later to send the event.
         * @param {string} eventType The event type to be sent.
         * @param {*} content The content for the event.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendDelayedEventDetails>} Resolves when the event has been sent with
         * details of that event.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendDelayedStickyEvent",
        value: function sendDelayedStickyEvent(delay, stickyDurationMs, eventType, content) {
          var roomId = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
          throw new Error("Method not implemented.");
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Cancel the scheduled delivery of the delayed event matching the provided {@link delayId}.
         * @throws Rejected when there is no matching delayed event,
         * or when the delayed event failed to be cancelled.
         */
      }, {
        key: "cancelScheduledDelayedEvent",
        value: function cancelScheduledDelayedEvent(delayId) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Restart the scheduled delivery of the delayed event matching the provided {@link delayId}.
         * @throws Rejected when there is no matching delayed event,
         * or when the delayed event failed to be restarted.
         */
      }, {
        key: "restartScheduledDelayedEvent",
        value: function restartScheduledDelayedEvent(delayId) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Immediately send the delayed event matching the provided {@link delayId},
         * instead of waiting for its scheduled delivery.
         * @throws Rejected when there is no matching delayed event,
         * or when the delayed event failed to be sent.
         */
      }, {
        key: "sendScheduledDelayedEvent",
        value: function sendScheduledDelayedEvent(delayId) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * Sends a to-device event. The widget API will have already verified that the widget
         * is capable of sending the event.
         * @param {string} eventType The event type to be sent.
         * @param {boolean} encrypted Whether to encrypt the message contents.
         * @param {Object} contentMap A map from user ID and device ID to event content.
         * @returns {Promise<void>} Resolves when the event has been sent.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendToDevice",
        value: function sendToDevice(eventType, encrypted, contentMap) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * Reads an element of room account data. The widget API will have already verified that the widget is
         * capable of receiving the `eventType` of the requested information. If `roomIds` is supplied, it may
         * contain `Symbols.AnyRoom` to denote that the piece of room account data in each of the client's known
         * rooms should be returned. When `null`, only the room the user is currently looking at should be considered.
         * @param eventType The event type to be read.
         * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
         * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
         * @returns {Promise<IRoomAccountData[]>} Resolves to the element of room account data, or an empty array.
         */
      }, {
        key: "readRoomAccountData",
        value: function readRoomAccountData(eventType) {
          var roomIds = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          return Promise.resolve([]);
        }
        /**
         * Reads all events of the given type, and optionally `msgtype` (if applicable/defined),
         * the user has access to. The widget API will have already verified that the widget is
         * capable of receiving the events. Less events than the limit are allowed to be returned,
         * but not more. If `roomIds` is supplied, it may contain `Symbols.AnyRoom` to denote that
         * `limit` in each of the client's known rooms should be returned. When `null`, only the
         * room the user is currently looking at should be considered. If `since` is specified but
         * the event ID isn't present in the number of events fetched by the client due to `limit`,
         * the client will return all the events.
         * @param eventType The event type to be read.
         * @param msgtype The msgtype of the events to be read, if applicable/defined.
         * @param stateKey The state key of the events to be read, if applicable/defined.
         * @param limit The maximum number of events to retrieve per room. Will be zero to denote "as many
         * as possible".
         * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
         * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
         * @param since When null, retrieves the number of events specified by the "limit" parameter.
         * Otherwise, the event ID at which only subsequent events will be returned, as many as specified
         * in "limit".
         * @returns {Promise<IRoomEvent[]>} Resolves to the room events, or an empty array.
         * @deprecated Clients are advised to implement {@link WidgetDriver.readRoomTimeline} instead.
         */
      }, {
        key: "readRoomEvents",
        value: function readRoomEvents(eventType, msgtype, limit) {
          var roomIds = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          var since = arguments.length > 4 ? arguments[4] : void 0;
          return Promise.resolve([]);
        }
        /**
         * Reads all events of the given type, and optionally state key (if applicable/defined),
         * the user has access to. The widget API will have already verified that the widget is
         * capable of receiving the events. Less events than the limit are allowed to be returned,
         * but not more. If `roomIds` is supplied, it may contain `Symbols.AnyRoom` to denote that
         * `limit` in each of the client's known rooms should be returned. When `null`, only the
         * room the user is currently looking at should be considered.
         * @param eventType The event type to be read.
         * @param stateKey The state key of the events to be read, if applicable/defined.
         * @param limit The maximum number of events to retrieve. Will be zero to denote "as many
         * as possible".
         * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
         * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
         * @returns {Promise<IRoomEvent[]>} Resolves to the state events, or an empty array.
         * @deprecated Clients are advised to implement {@link WidgetDriver.readRoomTimeline} instead.
         */
      }, {
        key: "readStateEvents",
        value: function readStateEvents(eventType, stateKey, limit) {
          var roomIds = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          return Promise.resolve([]);
        }
        /**
         * Gets all sticky events of the given type the user has access to.
         * The widget API will have already verified that the widget is capable of receiving the events.
         *
         * This is needed because widgets will get only live messages as they appear in the timeline.
         * However, sticky events act like a state, and the current state is made by events that may have been
         * sent before the widget was loaded.
         * Events are sticky for 1h maximum, so the widget has access to the past hour of sticky events maximum.
         *
         * @experimental Part of MSC4407 - Sticky Events (Widget API)
         * @param roomId - The ID of the room.
         */
      }, {
        key: "readStickyEvents",
        value: function readStickyEvents(roomId) {
          throw new Error("readStickyEvents is not implemented");
        }
        /**
         * Reads all events of the given type, and optionally `msgtype` (if applicable/defined),
         * the user has access to. The widget API will have already verified that the widget is
         * capable of receiving the events. Less events than the limit are allowed to be returned,
         * but not more.
         * @param roomId The ID of the room to look within.
         * @param eventType The event type to be read.
         * @param msgtype The msgtype of the events to be read, if applicable/defined.
         * @param stateKey The state key of the events to be read, if applicable/defined.
         * @param limit The maximum number of events to retrieve. Will be zero to denote "as many as
         * possible".
         * @param since When null, retrieves the number of events specified by the "limit" parameter.
         * Otherwise, the event ID at which only subsequent events will be returned, as many as specified
         * in "limit".
         * @returns {Promise<IRoomEvent[]>} Resolves to the room events, or an empty array.
         */
      }, {
        key: "readRoomTimeline",
        value: function readRoomTimeline(roomId, eventType, msgtype, stateKey, limit, since) {
          if (stateKey === void 0) return this.readRoomEvents(eventType, msgtype, limit, [roomId], since);
          else return this.readStateEvents(eventType, stateKey, limit, [roomId]);
        }
        /**
         * Reads the current values of all matching room state entries.
         * @param roomId The ID of the room.
         * @param eventType The event type of the entries to be read.
         * @param stateKey The state key of the entry to be read. If undefined,
         * all room state entries with a matching event type should be returned.
         * @returns {Promise<IRoomEvent[]>} Resolves to the events representing the
         * current values of the room state entries.
         */
      }, {
        key: "readRoomState",
        value: function readRoomState(roomId, eventType, stateKey) {
          return this.readStateEvents(eventType, stateKey, Number.MAX_SAFE_INTEGER, [roomId]);
        }
        /**
         * Reads all events that are related to a given event. The widget API will
         * have already verified that the widget is capable of receiving the event,
         * or will make sure to reject access to events which are returned from this
         * function, but are not capable of receiving. If `relationType` or `eventType`
         * are set, the returned events should already be filtered. Less events than
         * the limit are allowed to be returned, but not more.
         * @param eventId The id of the parent event to be read.
         * @param roomId The room to look within. When undefined, the user's
         * currently viewed room.
         * @param relationType The relationship type of child events to search for.
         * When undefined, all relations are returned.
         * @param eventType The event type of child events to search for. When undefined,
         * all related events are returned.
         * @param from The pagination token to start returning results from, as
         * received from a previous call. If not supplied, results start at the most
         * recent topological event known to the server.
         * @param to The pagination token to stop returning results at. If not
         * supplied, results continue up to limit or until there are no more events.
         * @param limit The maximum number of events to retrieve per room. If not
         * supplied, the server will apply a default limit.
         * @param direction The direction to search for according to MSC3715
         * @returns Resolves to the room relations.
         */
      }, {
        key: "readEventRelations",
        value: function readEventRelations(eventId, roomId, relationType, eventType, from, to, limit, direction) {
          return Promise.resolve({
            chunk: []
          });
        }
        /**
         * Asks the user for permission to validate their identity through OpenID Connect. The
         * interface for this function is an observable which accepts the state machine of the
         * OIDC exchange flow. For example, if the client/user blocks the request then it would
         * feed back a `{state: Blocked}` into the observable. Similarly, if the user already
         * approved the widget then a `{state: Allowed}` would be fed into the observable alongside
         * the token itself. If the client is asking for permission, it should feed in a
         * `{state: PendingUserConfirmation}` followed by the relevant Allowed or Blocked state.
         *
         * The widget API will reject the widget's request with an error if this contract is not
         * met properly. By default, the widget driver will block all OIDC requests.
         * @param {SimpleObservable<IOpenIDUpdate>} observer The observable to feed updates into.
         */
      }, {
        key: "askOpenID",
        value: function askOpenID(observer) {
          observer.update({
            state: _.OpenIDRequestState.Blocked
          });
        }
        /**
         * Navigates the client with a matrix.to URI. In future this function will also be provided
         * with the Matrix URIs once matrix.to is replaced. The given URI will have already been
         * lightly checked to ensure it looks like a valid URI, though the implementation is recommended
         * to do further checks on the URI.
         * @param {string} uri The URI to navigate to.
         * @returns {Promise<void>} Resolves when complete.
         * @throws Throws if there's a problem with the navigation, such as invalid format.
         */
      }, {
        key: "navigate",
        value: function navigate(uri) {
          throw new Error("Navigation is not implemented");
        }
        /**
         * Polls for TURN server data, yielding an initial set of credentials as soon as possible, and
         * thereafter yielding new credentials whenever the previous ones expire. The widget API will
         * have already verified that the widget has permission to access TURN servers.
         * @yields {ITurnServer} The TURN server URIs and credentials currently available to the client.
         */
      }, {
        key: "getTurnServers",
        value: function getTurnServers() {
          throw new Error("TURN server support is not implemented");
        }
        /**
         * Search for users in the user directory.
         * @param searchTerm The term to search for.
         * @param limit The maximum number of results to return. If not supplied, the
         * @returns Resolves to the search results.
         */
      }, {
        key: "searchUserDirectory",
        value: function searchUserDirectory(searchTerm, limit) {
          return Promise.resolve({
            limited: false,
            results: []
          });
        }
        /**
         * Get the config for the media repository.
         * @returns Promise which resolves with an object containing the config.
         */
      }, {
        key: "getMediaConfig",
        value: function getMediaConfig() {
          throw new Error("Get media config is not implemented");
        }
        /**
         * Discover the RTC transports (e.g. SFUs, TURN servers) the homeserver
         * supports, by delegating to the authenticated
         * `GET /_matrix/client/v1/rtc/transports` Client-Server endpoint (MSC4143).
         * @returns Promise which resolves with the available transports.
         */
      }, {
        key: "getRtcTransports",
        value: function getRtcTransports() {
          throw new Error("Get RTC transports is not implemented");
        }
        /**
         * Upload a file to the media repository on the homeserver.
         * @param file - The object to upload. Something that can be sent to
         *               XMLHttpRequest.send (typically a File).
         * @returns Resolves to the location of the uploaded file.
         */
      }, {
        key: "uploadFile",
        value: function uploadFile(file) {
          throw new Error("Upload file is not implemented");
        }
        /**
         * Download a file from the media repository on the homeserver.
         * @param contentUri - MXC URI of the file to download.
         * @returns Resolves to the contents of the file.
         */
      }, {
        key: "downloadFile",
        value: function downloadFile(contentUri) {
          throw new Error("Download file is not implemented");
        }
        /**
         * Obtains a JWT for a LiveKit SFU by calling the homeserver's
         * `/rtc/livekit/get_token` endpoint on the widget's behalf. The widget API
         * will have already verified that the widget has permission to do so.
         * @param data The request data, to be used as the request body verbatim.
         * @returns Resolves to the response body of the endpoint, verbatim.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "getRtcLivekitToken",
        value: function getRtcLivekitToken(data) {
          throw new Error("Getting a LiveKit token is not implemented");
        }
        /**
         * Hands a MatrixRTC session's delayed leave event over to the server by
         * calling the homeserver's `/rtc/livekit/delegate_delayed_leave` endpoint on
         * the widget's behalf. The widget API will have already verified that the
         * widget has permission to do so.
         * @param data The request data, to be used as the request body verbatim.
         * @returns Resolves to the response body of the endpoint, verbatim.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "delegateRtcLivekitDelayedLeave",
        value: function delegateRtcLivekitDelayedLeave(data) {
          throw new Error("Delegating a LiveKit delayed leave is not implemented");
        }
        /**
         * Gets the IDs of all joined or invited rooms currently known to the
         * client.
         * @returns The room IDs.
         */
      }, {
        key: "getKnownRooms",
        value: function getKnownRooms() {
          throw new Error("Querying known rooms is not implemented");
        }
        /**
         * Expresses an error thrown by this driver in a format compatible with the Widget API.
         * @param error The error to handle.
         * @returns The error expressed as a {@link IWidgetApiErrorResponseDataDetails},
         * or undefined if it cannot be expressed as one.
         */
      }, {
        key: "processError",
        value: function processError(error) {
          return void 0;
        }
      }]);
      return WidgetDriver2;
    })();
    exports.WidgetDriver = WidgetDriver;
  }
});

// ../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/index.js
var require_lib = __commonJS({
  "../../apps/web/node_modules/.pnpm/matrix-widget-api@1.19.0/node_modules/matrix-widget-api/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _WidgetApi = require_WidgetApi();
    Object.keys(_WidgetApi).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetApi[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetApi[key];
        }
      });
    });
    var _ClientWidgetApi = require_ClientWidgetApi();
    Object.keys(_ClientWidgetApi).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ClientWidgetApi[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ClientWidgetApi[key];
        }
      });
    });
    var _Symbols = require_Symbols();
    Object.keys(_Symbols).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _Symbols[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _Symbols[key];
        }
      });
    });
    var _PostmessageTransport = require_PostmessageTransport();
    Object.keys(_PostmessageTransport).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _PostmessageTransport[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _PostmessageTransport[key];
        }
      });
    });
    var _WidgetType = require_WidgetType();
    Object.keys(_WidgetType).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetType[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetType[key];
        }
      });
    });
    var _IWidgetApiErrorResponse = require_IWidgetApiErrorResponse();
    Object.keys(_IWidgetApiErrorResponse).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _IWidgetApiErrorResponse[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _IWidgetApiErrorResponse[key];
        }
      });
    });
    var _WidgetApiAction = require_WidgetApiAction();
    Object.keys(_WidgetApiAction).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetApiAction[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetApiAction[key];
        }
      });
    });
    var _WidgetApiDirection = require_WidgetApiDirection();
    Object.keys(_WidgetApiDirection).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetApiDirection[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetApiDirection[key];
        }
      });
    });
    var _ApiVersion = require_ApiVersion();
    Object.keys(_ApiVersion).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ApiVersion[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ApiVersion[key];
        }
      });
    });
    var _Capabilities = require_Capabilities();
    Object.keys(_Capabilities).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _Capabilities[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _Capabilities[key];
        }
      });
    });
    var _GetOpenIDAction = require_GetOpenIDAction();
    Object.keys(_GetOpenIDAction).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _GetOpenIDAction[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _GetOpenIDAction[key];
        }
      });
    });
    var _WidgetKind = require_WidgetKind();
    Object.keys(_WidgetKind).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetKind[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetKind[key];
        }
      });
    });
    var _ModalButtonKind = require_ModalButtonKind();
    Object.keys(_ModalButtonKind).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ModalButtonKind[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ModalButtonKind[key];
        }
      });
    });
    var _ModalWidgetActions = require_ModalWidgetActions();
    Object.keys(_ModalWidgetActions).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ModalWidgetActions[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ModalWidgetActions[key];
        }
      });
    });
    var _UpdateDelayedEventAction = require_UpdateDelayedEventAction();
    Object.keys(_UpdateDelayedEventAction).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _UpdateDelayedEventAction[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _UpdateDelayedEventAction[key];
        }
      });
    });
    var _WidgetEventCapability = require_WidgetEventCapability();
    Object.keys(_WidgetEventCapability).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetEventCapability[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetEventCapability[key];
        }
      });
    });
    var _url = require_url();
    Object.keys(_url).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _url[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _url[key];
        }
      });
    });
    var _utils = require_utils();
    Object.keys(_utils).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _utils[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _utils[key];
        }
      });
    });
    var _Widget = require_Widget();
    Object.keys(_Widget).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _Widget[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _Widget[key];
        }
      });
    });
    var _WidgetParser = require_WidgetParser();
    Object.keys(_WidgetParser).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetParser[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetParser[key];
        }
      });
    });
    var _urlTemplate = require_url_template();
    Object.keys(_urlTemplate).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _urlTemplate[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _urlTemplate[key];
        }
      });
    });
    var _SimpleObservable = require_SimpleObservable();
    Object.keys(_SimpleObservable).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _SimpleObservable[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _SimpleObservable[key];
        }
      });
    });
    var _WidgetDriver = require_WidgetDriver();
    Object.keys(_WidgetDriver).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetDriver[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetDriver[key];
        }
      });
    });
  }
});

// widget/widget.js
var import_matrix_widget_api = __toESM(require_lib(), 1);

// src/shared/profileFullView.js
var FULL_STYLES = `
.podaFullProfile { font-family: Inter, system-ui, sans-serif; max-width: 860px; margin: 0 auto; }
.podaFullProfile_banner { height: 140px; border-radius: 18px 18px 0 0; background: radial-gradient(circle at 30% 20%, #f9ba51 0%, #efb855 45%, #e5793e 100%); position: relative; }
.podaFullProfile_card { background: #fff; border: 1px solid #e2c4aa; border-top: none; border-radius: 0 0 18px 18px; padding: 0 28px 28px; box-shadow: 0 8px 24px #33221626; }
.podaFullProfile_heroRow { display: flex; gap: 18px; align-items: flex-end; margin-top: -44px; }
.podaFullProfile_avatar { width: 96px; height: 96px; border-radius: 20px; border: 4px solid #fff; background: radial-gradient(circle, #f9ba51 0%, #efb855 61%, #e5793e 100%); color: #fff; font-size: 34px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.podaFullProfile_names { padding-top: 52px; min-width: 0; }
.podaFullProfile_name { margin: 0; font-size: 26px; color: #332216; }
.podaFullProfile_headline { margin: 2px 0 0; color: #6b5142; font-size: 14px; }
.podaFullProfile_badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.podaFullProfile_badge { padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #ffebc7; color: #743719; }
.podaFullProfile_badge--muted { background: #f7f1eb; color: #6b5142; }
.podaFullProfile_badge--green { background: #d9f0e4; color: #006052; }
.podaFullProfile_section { margin-top: 26px; }
.podaFullProfile_section h3 { margin: 0 0 10px; font-size: 16px; color: #332216; }
.podaFullProfile_section h3 .vis { font-size: 11px; font-weight: 600; color: #8e7463; margin-left: 8px; }
.podaFullProfile_muted { color: #6b5142; font-size: 14px; line-height: 1.55; margin: 0; }
.podaFullProfile_pill { display: inline-block; margin: 0 6px 6px 0; padding: 4px 10px; border-radius: 999px; background: #ffebc7; color: #743719; font-size: 12px; font-weight: 600; }
.podaFullProfile_row { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f4e7d8; font-size: 13px; }
.podaFullProfile_row b { color: #563522; font-weight: 600; }
.podaFullProfile_row span { color: #332216; text-align: right; word-break: break-word; }
.podaFullProfile_grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.podaFullProfile_mini { border: 1px solid #e2c4aa; border-radius: 12px; padding: 14px; background: #fffdf9; }
.podaFullProfile_mini h4 { margin: 0 0 6px; font-size: 14px; color: #332216; }
.podaFullProfile_mini p { margin: 0; font-size: 13px; color: #6b5142; line-height: 1.5; }
.podaFullProfile_quote { border-left: 3px solid #f9ba51; padding: 4px 0 4px 14px; margin: 0 0 12px; }
.podaFullProfile_quote p { margin: 0 0 4px; font-size: 13px; color: #332216; font-style: italic; }
.podaFullProfile_quote span { font-size: 12px; color: #8e7463; }
.podaFullProfile_empty { color: #a58e7f; font-size: 13px; font-style: italic; }
.podaFullProfile_eyebrow { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #a58e7f; margin: 0 0 4px; }
.podaFullProfile_link { color: #006052; }
.podaFullProfile_footer { margin-top: 24px; font-size: 11px; color: #a58e7f; }
`;
function esc(value) {
  return String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}
function initials(name) {
  return (name || "?").split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function statusBadge(p) {
  const status = p.profileStatus === "published" ? `<span class="podaFullProfile_badge--green podaFullProfile_badge">Published</span>` : `<span class="podaFullProfile_badge--muted podaFullProfile_badge">Draft</span>`;
  const vis = p.isPublic ? `<span class="podaFullProfile_badge--green podaFullProfile_badge">Public</span>` : `<span class="podaFullProfile_badge--muted podaFullProfile_badge">Members only</span>`;
  return status + vis + (p.slug ? `<span class="podaFullProfile_badge--muted podaFullProfile_badge">poda.social/${esc(p.slug)}</span>` : "");
}
function section(title, visibility, innerHtml) {
  return `<section class="podaFullProfile_section"><h3>${esc(title)}${visibility ? `<span class="vis">${esc(visibility)}</span>` : ""}</h3>${innerHtml}</section>`;
}
function emptyNote(text) {
  return `<p class="podaFullProfile_empty">${esc(text)}</p>`;
}
function fullProfileMarkup(profile, { showAll = true } = {}) {
  const sv = profile.sectionVisibility ?? {};
  const parts = [];
  parts.push(`
        <div class="podaFullProfile_banner" role="presentation"></div>
        <div class="podaFullProfile_card">
            <div class="podaFullProfile_heroRow">
                <div class="podaFullProfile_avatar" aria-hidden="true">${esc(initials(profile.displayName))}</div>
                <div class="podaFullProfile_names">
                    <h2 class="podaFullProfile_name">${esc(profile.displayName || "Unnamed creator")}</h2>
                    <p class="podaFullProfile_headline">${esc(profile.headline || "No headline yet")}</p>
                    <p class="podaFullProfile_headline"><em>${esc(profile.tagline || "")}</em></p>
                    <div class="podaFullProfile_badges">${statusBadge(profile)}</div>
                </div>
            </div>
    `);
  parts.push(section("About", sv.about ?? "public", `
        ${profile.aboutShort ? `<p class="podaFullProfile_muted"><strong>${esc(profile.aboutShort)}</strong></p>` : emptyNote("No short intro yet.")}
        ${profile.bio ? `<p class="podaFullProfile_muted" style="margin-top:8px">${esc(profile.bio)}</p>` : emptyNote("No bio yet.")}
    `));
  parts.push(section("Topics", sv.topics ?? "public", profile.topics?.length ? profile.topics.map((t) => `<span class="podaFullProfile_pill">${esc(t)}</span>`).join("") : emptyNote("No topics set \u2014 add some in Edit.")));
  const ALL_SERVICES = ["website", "linkedin", "twitter", "youtube", "instagram", "tiktok", "calendly"];
  const socialRows = ALL_SERVICES.map((svc) => {
    const v = profile.socialLinks?.[svc];
    return `<div class="podaFullProfile_row"><b>${esc(svc)}</b><span class="${v ? "podaFullProfile_link" : "podaFullProfile_empty"}">${v ? esc(v) : "not set"}</span></div>`;
  }).join("");
  parts.push(section("Links", sv.links ?? "public", socialRows));
  if (showAll) {
    parts.push(section("Expertise cards", sv.expertiseCards ?? "public", profile.expertiseCards?.length ? `<div class="podaFullProfile_grid">${profile.expertiseCards.map((c) => `<div class="podaFullProfile_mini"><h4>${esc(c.title)}${c.icon ? ` <span class="podaFullProfile_empty" style="font-size:11px">icon: ${esc(c.icon)} \xB7 order ${c.order}</span>` : ""}</h4><p>${esc(c.description)}</p></div>`).join("")}</div>` : emptyNote("No expertise cards yet.")));
    parts.push(section("Custom fields", sv.customFields ?? "public", profile.customFields?.length ? profile.customFields.map((f) => `<div class="podaFullProfile_row"><b>${esc(f.name)}</b><span>${esc(f.value)}</span></div>`).join("") : emptyNote("No custom fields yet.")));
    parts.push(section("Booking", sv.booking ?? "public", profile.bookingUrl ? `<div class="podaFullProfile_row"><b>Book a call</b><span class="podaFullProfile_link">${esc(profile.bookingUrl)}</span></div>` : emptyNote("No booking link set.")));
    parts.push(section("Media kit", sv.mediaKit ?? "public", profile.mediaKit?.length ? profile.mediaKit.map((m) => `<div class="podaFullProfile_row"><b>${esc(m.name)}</b><span>${esc(m.type)}${m.size ? ` \xB7 ${(m.size / 1024 / 1024).toFixed(1)} MB` : ""}${m.filename ? ` \xB7 ${esc(m.filename)}` : ""}${m.mimeType ? ` \xB7 ${esc(m.mimeType)}` : ""}</span></div><div class="podaFullProfile_row"><b></b><span class="podaFullProfile_link">${esc(m.url)}</span></div>`).join("") : emptyNote("No media kit items.")));
    parts.push(section("Testimonials", sv.testimonials ?? "public", profile.testimonials?.length ? profile.testimonials.map((t) => `<blockquote class="podaFullProfile_quote"><p>\u201C${esc(t.quote)}\u201D</p><span>${esc(t.name)} \u2014 ${esc(t.role)}${t.avatarUrl ? ` \xB7 avatar: ${esc(t.avatarUrl)}` : " \xB7 no avatar"}</span></blockquote>`).join("") : emptyNote("No testimonials yet.")));
    parts.push(section("Featured appearances", sv.appearances ?? "public", profile.featuredAppearances?.length ? profile.featuredAppearances.map((a) => `<div class="podaFullProfile_row"><b>${esc(a.podcastName ?? "")}</b><span>${esc(a.episodeTitle ?? "")}${a.date ? ` \xB7 ${esc(a.date)}` : ""}${a.displayClass ? ` \xB7 ${esc(a.displayClass.replaceAll("_", " "))}` : ""}</span></div><div class="podaFullProfile_row"><b></b><span class="podaFullProfile_link">${a.url ? esc(a.url) : "no url"}</span></div>`).join("") : emptyNote("No featured appearances yet.")));
    parts.push(section("Best fit", sv.bestFitFor ?? "public", `
            ${profile.appearanceCount ? `<p class="podaFullProfile_muted">${profile.appearanceCount} appearances</p>` : ""}
            ${profile.bestFitFor?.length ? profile.bestFitFor.map((t) => `<span class="podaFullProfile_pill">${esc(t)}</span>`).join("") : emptyNote("No best-fit topics yet.")}
        `));
    parts.push(section("Intro video", sv.introVideo ?? "public", profile.introVideoUrl ? `<div class="podaFullProfile_row"><b>Intro video</b><span class="podaFullProfile_link">${esc(profile.introVideoUrl)}</span></div>` : emptyNote("No intro video set.")));
    parts.push(`<div class="podaFullProfile_footer">${profile.createdAt ? `Created ${esc(profile.createdAt.slice(0, 10))}` : "Not created yet"}${profile.updatedAt ? ` \xB7 Updated ${esc(profile.updatedAt.slice(0, 10))}` : ""}</div>`);
  }
  parts.push(`</div>`);
  return parts.join("");
}
function renderFullProfileView(container, { profile, hostLabel, extraActionsHtml = "" }) {
  container.innerHTML = `
        <style>${FULL_STYLES}</style>
        <div class="podaFullProfile" data-host="${esc(hostLabel)}">
            ${fullProfileMarkup(profile)}
            ${extraActionsHtml}
        </div>`;
}

// src/shared/profileFixtures.js
var PROFILE_FIXTURE_MIRA = {
  id: "user-mira",
  email: "mira@example.com",
  displayName: "Mira Chen",
  avatarUrl: null,
  bannerUrl: null,
  bio: "Mira Chen advises early-stage and growth teams on launch operations, AI-assisted research loops, and founder communications. Her best interviews are practical and specific: what broke, what worked, and how the team made the next launch less chaotic.",
  headline: "Founder ops strategist and launch systems advisor",
  tagline: "Turns messy launches into calm repeatable systems.",
  aboutShort: "Helps founder-led teams run high-stakes product launches without burning out the humans doing the work.",
  slug: "mira-chen",
  isPublic: true,
  profileStatus: "published",
  socialLinks: {
    website: "https://example.com/mira",
    linkedin: "https://linkedin.com/in/mira-chen",
    twitter: "https://x.com/mirachen",
    calendly: "https://calendly.com/mira/intro",
    youtube: "",
    instagram: "",
    tiktok: ""
  },
  topics: ["Founder operations", "Launch systems", "AI workflows", "Team rituals", "Calm execution"],
  expertiseCards: [
    { id: "exp-1", title: "Launch operating systems", description: "Runbooks, checklists, and team rhythms for launch weeks.", icon: "Target", order: 1 },
    { id: "exp-2", title: "AI research loops", description: "Practical agent-assisted briefing and synthesis workflows.", icon: "Sparkles", order: 2 }
  ],
  customFields: [
    { name: "Location", value: "Toronto, Canada" },
    { name: "Typical format", value: "45-min deep dive + async prep doc" }
  ],
  introVideoUrl: "https://example.com/mira/intro.mp4",
  mediaKit: [
    { id: "mk-1", name: "Headshots pack", url: "https://example.com/mk/headshots.zip", type: "headshot", size: 2411724, filename: "mira-headshots.zip", mimeType: "application/zip" },
    { id: "mk-2", name: "One-sheet PDF", url: "https://example.com/mk/onesheet.pdf", type: "pdf", size: 184320, filename: "mira-onesheet.pdf", mimeType: "application/pdf" }
  ],
  testimonials: [
    { id: "t-1", name: "Jordan Park", role: "Host, Ship It Weekly", quote: "Mira turned our chaos into a checklist our whole team actually uses.", order: 1 },
    { id: "t-2", name: "Sam Rivera", role: "CTO, Northbeam", quote: "The calmest launch we have ever run. Twice.", order: 2 }
  ],
  featuredAppearances: [
    { id: "fa-1", podcastName: "Launch Notes", episodeTitle: "Systems that do not collapse", url: "https://example.com/ep/42", date: "2026-05-14", imageUrl: null, order: 1, displayClass: "host_verified" },
    { id: "fa-2", podcastName: "Founder Office Hours", episodeTitle: "Research loops with agents", url: "https://example.com/ep/18", date: "2026-03-02", imageUrl: null, order: 2, displayClass: "platform_mutual" }
  ],
  appearanceCount: 12,
  bestFitFor: ["Technical founders", "Launch retrospectives", "Ops deep dives"],
  sectionVisibility: { introVideo: "public", appearances: "public", testimonials: "members", mediaKit: "collaborators" },
  bookingUrl: "https://calendly.com/mira/intro",
  createdAt: "2026-01-11T09:00:00Z",
  updatedAt: "2026-06-08T14:30:00Z"
};

// widget/widget.js
var params = new URLSearchParams(window.location.search);
var userId = params.get("matrix_user_id") ?? "unknown";
var viewerName = params.get("matrix_display_name") ?? userId;
var navBtnHtml = `<button id="podaProfileNavHost" type="button" style="margin-top:18px;padding:8px 14px;border:1px solid #c9a58a;border-radius:10px;background:#fff;color:#563522;font-size:13px;cursor:pointer;">Ask host to open General room</button>`;
renderFullProfileView(document.getElementById("root"), {
  profile: PROFILE_FIXTURE_MIRA,
  hostLabel: `widget (iframe) \u2014 viewer ${viewerName}`,
  extraActionsHtml: navBtnHtml
});
var widgetApi = null;
try {
  widgetApi = new import_matrix_widget_api.WidgetApi();
  widgetApi.start();
  widgetApi.sendContentLoaded();
} catch (error) {
  console.warn("Poda profile widget: no host bridge available", error);
}
document.getElementById("podaProfileNavHost")?.addEventListener("click", () => {
  widgetApi?.navigateTo("https://matrix.to/#/#general:localhost");
});
window.__PODA_PROFILE_FIXTURE = PROFILE_FIXTURE_MIRA;
/*! Bundled license information:

matrix-widget-api/lib/WidgetApi.js:
matrix-widget-api/lib/ClientWidgetApi.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE *)
*/
