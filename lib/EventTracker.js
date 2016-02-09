'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classLoader = require('./utils/classLoader');

var _classLoader2 = _interopRequireDefault(_classLoader);

var _sanitize = require('./utils/sanitize');

var _sanitize2 = _interopRequireDefault(_sanitize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventTracker = function () {
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

    this.config = Object.assign(this.defaults, config);
    this._initModules('providers');
    this._initModules('reducers');
    this._initModules('trackers', this.track.bind(this));
  }

  _createClass(EventTracker, [{
    key: 'track',
    value: function track(action, props) {
      var data = this._process(Object.assign({ action: action }, props));
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
      return (0, _sanitize2.default)(this._reduce(Object.assign({}, this._data, data)));
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
    value: function _initModules(type) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      this[type] = (0, _classLoader2.default)(type).apply(undefined, [this.config[type]].concat(args));
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
}();

exports.default = EventTracker;
module.exports = exports['default'];