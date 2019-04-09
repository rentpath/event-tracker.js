"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sanitize;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function sanitize() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(data).reduce(function (sanitized, key) {
    var obj = sanitized;
    var val = data[key];

    if (val === 0 || Array.isArray(val) || val && _typeof(val) !== 'object') {
      obj[key] = val.toString();
    }

    return obj;
  }, {});
}