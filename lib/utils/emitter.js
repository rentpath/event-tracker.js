"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = emitter;
function emitter(target) {
  var listeners = [];

  Object.assign(target.prototype, {
    on: function on(event) {
      var _listeners$event;

      listeners[event] = listeners[event] || [];

      for (var _len = arguments.length, callbacks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        callbacks[_key - 1] = arguments[_key];
      }

      (_listeners$event = listeners[event]).push.apply(_listeners$event, callbacks);
      return this;
    },
    trigger: function trigger(event) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (listeners[event]) {
        listeners[event].slice().forEach(function (fn) {
          return fn.apply(undefined, args);
        });
      }
      return this;
    }
  });
}
module.exports = exports['default'];