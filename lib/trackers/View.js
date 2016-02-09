'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewTracker = function ViewTracker(track) {
  _classCallCheck(this, ViewTracker);

  document.addEventListener('DOMContentLoaded', function () {
    return track('view');
  });
};

exports.default = ViewTracker;
module.exports = exports['default'];