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

var BrowserReducer = function () {
  function BrowserReducer() {
    _classCallCheck(this, BrowserReducer);
  }

  BrowserReducer.prototype.reduce = function reduce() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _extends(data, this.data);
  };

  BrowserReducer.prototype.getData = function getData() {
    return {
      browser: this.browserName,
      browser_size: this.browserSize,
      browser_version: this.browserVersion
    };
  };

  _createClass(BrowserReducer, [{
    key: 'data',
    get: function get() {
      return this._data || (this._data = this.getData());
    }
  }, {
    key: 'parser',
    get: function get() {
      return this._parser || (this._parser = new _uaParserJs2.default());
    }
  }, {
    key: 'browserName',
    get: function get() {
      return this.parser.getBrowser().name;
    }
  }, {
    key: 'browserSize',
    get: function get() {
      return window.innerWidth + 'x' + window.innerHeight;
    }
  }, {
    key: 'browserVersion',
    get: function get() {
      return (this.parser.getBrowser().version || '').split('.')[0];
    }
  }]);

  return BrowserReducer;
}();

exports.default = BrowserReducer;
module.exports = exports['default'];