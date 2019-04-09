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

var screenSizeType = {
  mobile: {
    min: 0,
    max: 480
  },
  tablet: {
    min: 481,
    max: 1145
  },
  desktop: {
    min: 1146,
    max: 99999
  }
};

var DeviceReducer =
/*#__PURE__*/
function () {
  function DeviceReducer(config) {
    _classCallCheck(this, DeviceReducer);

    this.config = Object.assign(this.defaults, config);
  }

  _createClass(DeviceReducer, [{
    key: "reduce",
    value: function reduce() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.assign(data, this.data);
    }
  }, {
    key: "getData",
    value: function getData() {
      return {
        screen_type: this.screenType,
        screen_resolution: this.screenResolution,
        operating_system: this.operatingSystem,
        operating_system_version: this.operatingSystemVersion
      };
    }
  }, {
    key: "isScreenSize",
    value: function isScreenSize(width) {
      return ['mobile', 'tablet'].find(function (size) {
        var type = screenSizeType[size];
        return width >= type.min && width <= type.max;
      });
    }
  }, {
    key: "data",
    get: function get() {
      var data = this._data || (this._data = this.getData());
      return data;
    }
  }, {
    key: "screenResolution",
    get: function get() {
      return "".concat(window.screen.width, "x").concat(window.screen.height);
    }
  }, {
    key: "screenType",
    get: function get() {
      // We want to set the screen_type based pixel size and not via the
      // userAgent to align with how GA handles attribution
      var width = window.screen.width;

      if (width > 0) {
        return this.isScreenSize(width) || 'desktop';
      } // Fallback to our old logic of using the device userAgent to figure out
      // screen_type


      var type = this.parser.getDevice().type;
      return this.config.enabledTypes[type] ? type : this.config.defaultType;
    }
  }, {
    key: "parser",
    get: function get() {
      var parser = this._parser || (this._parser = new _uaParserJs["default"]());
      return parser;
    }
  }, {
    key: "operatingSystem",
    get: function get() {
      return this.parser.getOS().name;
    }
  }, {
    key: "operatingSystemVersion",
    get: function get() {
      return (this.parser.getOS().version || '').split('.')[0];
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        defaultType: 'desktop',
        enabledTypes: {
          desktop: true,
          mobile: true,
          tablet: true
        }
      };
    }
  }]);

  return DeviceReducer;
}();

exports["default"] = DeviceReducer;