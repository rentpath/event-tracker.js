"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Click = _interopRequireDefault(require("./Click"));

var _Event = _interopRequireDefault(require("./Event"));

var _Select = _interopRequireDefault(require("./Select"));

var _View = _interopRequireDefault(require("./View"));

var _Focus = _interopRequireDefault(require("./Focus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Click: _Click["default"],
  Event: _Event["default"],
  Select: _Select["default"],
  View: _View["default"],
  Focus: _Focus["default"]
};
exports["default"] = _default;