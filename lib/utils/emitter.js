'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = emitter;
function emitter(target) {
  var container = [];

  _extends(target.prototype, {
    on: function on(event, fn) {
      container[event] = container[event] || [];
      container[event].push(fn);
      return this;
    },
    off: function off(event, fn) {
      if (container[event]) {
        container[event] = container[event].filter(function (cb) {
          return cb !== fn;
        });
      }
      return this;
    },
    trigger: function trigger(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var list = [];
      if (container['*']) {
        list = list.concat(container['*']);
      }
      if (container[event]) {
        list = list.concat(container[event]);
      }
      list.forEach(function (fn) {
        return fn.apply(undefined, args);
      });
      return this;
    }
  });
}
module.exports = exports['default'];