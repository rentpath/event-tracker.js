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

var _initModule = require('./utils/initModule');

var _initModule2 = _interopRequireDefault(_initModule);

var _configurable = require('./utils/configurable');

var _configurable2 = _interopRequireDefault(_configurable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        _this[group] = _this.config[group].reduce(function (prev, name) {
          return prev.concat((0, _initModule2.default)(group, name, _this));
        }, []);
      });
    }
  }, {
    key: 'debug',
    get: function get() {
      return this._debug;
    },
    set: function set(debug) {
      this._debug = !!debug;
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        providers: ['Tealium'],
        trackers: ['View', 'Click', 'Select'],
        reducers: ['Session', 'Browser', 'Device', 'Element']
      };
    }
  }]);

  return EventTracker;
}()) || _class) || _class;

exports.default = EventTracker;
module.exports = exports['default'];