'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _configurable = require('../utils/configurable');

var _configurable2 = _interopRequireDefault(_configurable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestTracker = (0, _configurable2.default)(_class = function () {
  function RequestTracker(config, tracker) {
    _classCallCheck(this, RequestTracker);

    this.configure(this.defaults, config);
    this.tracker = tracker;
  }

  _createClass(RequestTracker, [{
    key: 'defaults',
    get: function get() {
      return {};
    }
  }]);

  return RequestTracker;
}()) || _class;

exports.default = RequestTracker;
module.exports = exports['default'];