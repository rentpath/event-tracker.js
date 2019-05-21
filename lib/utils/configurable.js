"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = configurable;

function configurable(target) {
  Object.assign(target.prototype, {
    configure: function configure() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.config = Object.assign.apply(Object, [{}].concat(args));
    }
  });
}