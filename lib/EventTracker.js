'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _emitter = require('./utils/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _sanitize = require('./utils/sanitize');

var _sanitize2 = _interopRequireDefault(_sanitize);

var _configurable = require('./utils/configurable');

var _configurable2 = _interopRequireDefault(_configurable);

var _extractClass3 = require('./utils/extractClass');

var _extractClass4 = _interopRequireDefault(_extractClass3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventTracker = (0, _emitter2.default)(_class = (0, _configurable2.default)(_class = function () {
  _createClass(EventTracker, null, [{
    key: 'create',
    value: function create() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(EventTracker, [null].concat(args)))();
    }
  }]);

  function EventTracker(config) {
    _classCallCheck(this, EventTracker);

    this.configure(this.defaults, config);
    this._initModules('providers', 'reducers', 'trackers');
  }

  _createClass(EventTracker, [{
    key: 'track',
    value: function track(action, props) {
      var data = this._process(Object.assign({ action: action }, props));
      this.trigger('track', data);
      this.providers.forEach(function (provider) {
        return provider.track(data);
      });
      return this;
    }
  }, {
    key: 'view',
    value: function view() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.track.apply(this, ['view'].concat(args));
    }
  }, {
    key: 'debug',
    value: function debug() {
      if (arguments.length) this._debug = !!(arguments.length <= 0 ? undefined : arguments[0]);
      return this._debug;
    }
  }, {
    key: '_process',
    value: function _process(data) {
      return (0, _sanitize2.default)(this._reduce(data));
    }
  }, {
    key: '_reduce',
    value: function _reduce(data) {
      return this.reducers.reduce(function (obj, reducer) {
        return reducer.reduce(obj);
      }, data);
    }
  }, {
    key: '_initModules',
    value: function _initModules() {
      var _this = this;

      for (var _len3 = arguments.length, groups = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        groups[_key3] = arguments[_key3];
      }

      groups.forEach(function (group) {
        _this[group] = _this.config[group].reduce(function (prev, item) {
          var _extractClass = (0, _extractClass4.default)(item, group);

          var _extractClass2 = _toArray(_extractClass);

          var Module = _extractClass2[0];
          var config = _extractClass2[1];

          var args = _extractClass2.slice(2);

          return prev.concat(new (Function.prototype.bind.apply(Module, [null].concat([config], _toConsumableArray(args.concat(_this)))))());
        }, []);
      });
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        providers: ['tealium'],
        trackers: ['view', 'click', 'select'],
        reducers: ['session', 'browser', 'device', 'element']
      };
    }
  }]);

  return EventTracker;
}()) || _class) || _class;

exports.default = EventTracker;
module.exports = exports['default'];