'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _browserDetect = require('browser-detect');

var _browserDetect2 = _interopRequireDefault(_browserDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrowserReducer = function () {
  function BrowserReducer() {
    _classCallCheck(this, BrowserReducer);
  }

  _createClass(BrowserReducer, [{
    key: 'reduce',
    value: function reduce() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return Object.assign(data, this.data);
    }
  }, {
    key: 'getData',
    value: function getData() {
      return {
        browser: this.browser,
        browser_size: this.browserSize,
        browser_version: this.browserVersion
      };
    }
  }, {
    key: 'data',
    get: function get() {
      return this._data || (this._data = this.getData());
    }
  }, {
    key: 'browser',
    get: function get() {
      return (0, _browserDetect2.default)().browser;
    }
  }, {
    key: 'browserSize',
    get: function get() {
      return window.screen.width + 'x' + window.screen.height;
    }
  }, {
    key: 'browserVersion',
    get: function get() {
      return (0, _browserDetect2.default)().version;
    }
  }]);

  return BrowserReducer;
}();

exports.default = BrowserReducer;
module.exports = exports['default'];