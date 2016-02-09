'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = sanitize;
function sanitize() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return Object.keys(data).reduce(function (sanitized, key) {
    var val = data[key];
    if (val === 0 || Array.isArray(val) || val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') {
      sanitized[key] = val.toString();
    }
    return sanitized;
  }, {});
}
module.exports = exports['default'];