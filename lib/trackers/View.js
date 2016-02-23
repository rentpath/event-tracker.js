'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewTracker = function ViewTracker(config, tracker) {
  _classCallCheck(this, ViewTracker);

  this.config = Object.assign({}, config);
  var track = function track() {
    return tracker.track('view');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', track);
  } else {
    track();
  }
};

exports.default = ViewTracker;
module.exports = exports['default'];