'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewTracker = function ViewTracker(config, tracker) {
  _classCallCheck(this, ViewTracker);

  this.config = Object.assign({}, config);
  document.addEventListener('DOMContentLoaded', function () {
    return tracker.track('view');
  });
};

exports.default = ViewTracker;
module.exports = exports['default'];