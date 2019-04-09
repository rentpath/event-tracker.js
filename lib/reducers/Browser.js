"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BrowserReducer =
/*#__PURE__*/
function () {
  function BrowserReducer() {
    _classCallCheck(this, BrowserReducer);
  }

  _createClass(BrowserReducer, [{
    key: "reduce",
    value: function reduce() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.assign(data, this.data);
    }
  }, {
    key: "getData",
    value: function getData() {
      return {
        browser: this.browserName,
        browser_size: this.browserSize,
        browser_version: this.browserVersion
      };
    }
  }, {
    key: "data",
    get: function get() {
      var data = this._data || (this._data = this.getData());
      return data;
    }
  }, {
    key: "parser",
    get: function get() {
      var parser = this._parser || (this._parser = new _uaParserJs["default"]());
      return parser;
    }
  }, {
    key: "browserName",
    get: function get() {
      return this.parser.getBrowser().name;
    }
  }, {
    key: "browserSize",
    get: function get() {
      return "".concat(window.innerWidth, "x").concat(window.innerHeight);
    }
  }, {
    key: "browserVersion",
    get: function get() {
      return (this.parser.getBrowser().version || '').split('.')[0];
    }
  }]);

  return BrowserReducer;
}();

exports["default"] = BrowserReducer;