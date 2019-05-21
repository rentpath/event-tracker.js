"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _EventTracker["default"];
  }
});
Object.defineProperty(exports, "gtmIframe", {
  enumerable: true,
  get: function get() {
    return _gtm.gtmIframe;
  }
});
Object.defineProperty(exports, "gtmIframeSrc", {
  enumerable: true,
  get: function get() {
    return _gtm.gtmIframeSrc;
  }
});

var _EventTracker = _interopRequireDefault(require("./EventTracker"));

var _gtm = require("./noscripts/gtm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }