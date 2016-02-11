"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = emitter;
function emitter(target) {
  var container = [];

  Object.assign(target.prototype, {
    on: function on(event, fn) {
      container[event] = container[event] || [];
      container[event].push(fn);
      return this;
    },
    off: function off(event, fn) {
      if (container[event]) {
        var listeners = container[event];
        container[event] = [];

        listeners.forEach(function (listener) {
          if (fn !== listener) {
            container[event].push(listener);
          }
        });
      }
      return this;
    },
    trigger: function trigger(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (container[event]) {
        container[event].slice().forEach(function (fn) {
          return fn.apply(undefined, args);
        });
      }
      return this;
    }
  });
}
module.exports = exports['default'];