"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configurable;
function configurable(target) {
  Object.assign(target.prototype, {
    configure: function configure() {
      var _Object;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.config = (_Object = Object).assign.apply(_Object, [{}].concat(args));
    }
  });
}
module.exports = exports['default'];