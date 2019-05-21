"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emitter = _interopRequireDefault(require("./utils/emitter"));

var _sanitize = _interopRequireDefault(require("./utils/sanitize"));

var _initModule = _interopRequireDefault(require("./utils/initModule"));

var _configurable = _interopRequireDefault(require("./utils/configurable"));

var _const = require("./const");

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventTracker = (0, _emitter["default"])(_class = (0, _configurable["default"])(_class =
/*#__PURE__*/
function () {
  _createClass(EventTracker, null, [{
    key: "create",
    value: function create() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(EventTracker, args);
    }
  }]);

  function EventTracker(config) {
    _classCallCheck(this, EventTracker);

    this.configure(this.defaults, config);

    this._initModules('providers', 'reducers', 'trackers');
  }

  _createClass(EventTracker, [{
    key: "track",
    value: function track(action, props) {
      var data = this._process(Object.assign({
        action: action
      }, this._data, props)); // Do not track if the event has been marked to be ignored.
      // This should be used only when you are manually calling the track function
      // instead of relying on the automatic click tracking.


      if (data.action === _const.IGNORE_ACTION) {
        return this;
      }

      this.trigger(action, data);
      this.providers.forEach(function (provider) {
        return provider.track(data);
      });
      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.providers.forEach(function (provider) {
        if (typeof provider.reset === 'function') provider.reset();
      });
    }
  }, {
    key: "view",
    value: function view() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.track.apply(this, [_const.VIEW_ACTION].concat(args));
    }
  }, {
    key: "include",
    value: function include(data) {
      var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this._data = Object.assign(merge && this._data || {}, data);
      return this;
    }
  }, {
    key: "debug",
    value: function debug() {
      if (arguments.length) this._debug = !!(arguments.length <= 0 ? undefined : arguments[0]);
      return this._debug;
    }
  }, {
    key: "_process",
    value: function _process(data) {
      return (0, _sanitize["default"])(this._reduce(data));
    }
  }, {
    key: "_reduce",
    value: function _reduce(data) {
      return this.reducers.reduce(function (obj, reducer) {
        return reducer.reduce(obj);
      }, data);
    }
  }, {
    key: "_initModules",
    value: function _initModules() {
      var _this = this;

      for (var _len3 = arguments.length, groups = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        groups[_key3] = arguments[_key3];
      }

      groups.forEach(function (group) {
        _this[group] = (_this.config[group] || []).reduce(function (prev, name) {
          return prev.concat((0, _initModule["default"])(group, name, _this));
        }, []);
      });
      this.providers.forEach(function (provider) {
        if (typeof provider.loadWithData === 'function') provider.loadWithData(_this.reducers);
      });
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        providers: [],
        trackers: [],
        reducers: []
      };
    }
  }]);

  return EventTracker;
}()) || _class) || _class;

exports["default"] = EventTracker;