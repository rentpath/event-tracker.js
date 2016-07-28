'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uaParserJs = require('ua-parser-js');

var _uaParserJs2 = _interopRequireDefault(_uaParserJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeviceReducer = function () {
  function DeviceReducer(config) {
    _classCallCheck(this, DeviceReducer);

    this.config = _extends(this.defaults, config);
  }

  DeviceReducer.prototype.reduce = function reduce() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _extends(data, this.data);
  };

  DeviceReducer.prototype.getData = function getData() {
    return {
      screen_type: this.screenType,
      screen_resolution: this.screenResolution,
      operating_system: this.operatingSystem,
      operating_system_version: this.operatingSystemVersion
    };
  };

  _createClass(DeviceReducer, [{
    key: 'data',
    get: function get() {
      return this._data || (this._data = this.getData());
    }
  }, {
    key: 'screenResolution',
    get: function get() {
      return window.screen.width + 'x' + window.screen.height;
    }
  }, {
    key: 'screenType',
    get: function get() {
      var screenWidth = window.innerWidth;
      var breakpoints = this.config.breakpoints;
      return Object.keys(breakpoints).reduce(function (prev, name) {
        return screenWidth >= breakpoints[name] ? name : prev;
      });
    }
  }, {
    key: 'parser',
    get: function get() {
      return this._parser || (this._parser = new _uaParserJs2.default());
    }
  }, {
    key: 'operatingSystem',
    get: function get() {
      return this.parser.getOS().name;
    }
  }, {
    key: 'operatingSystemVersion',
    get: function get() {
      return (this.parser.getOS().version || '').split('.')[0];
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        breakpoints: {
          smartphone: 0,
          tablet: 768,
          desktop: 1024
        }
      };
    }
  }]);

  return DeviceReducer;
}();

exports.default = DeviceReducer;
module.exports = exports['default'];