"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Tealium = _interopRequireDefault(require("./Tealium"));

var _GoogleTagManager = _interopRequireDefault(require("./GoogleTagManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Tealium: _Tealium["default"],
  GoogleTagManager: _GoogleTagManager["default"]
};
exports["default"] = _default;