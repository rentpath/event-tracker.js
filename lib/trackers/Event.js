"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventTracker =
/*#__PURE__*/
function () {
  function EventTracker(config, tracker) {
    _classCallCheck(this, EventTracker);

    this.config = Object.assign(this.defaults, config);
    this.tracker = tracker;
    this.addListeners();
  }

  _createClass(EventTracker, [{
    key: "track",
    value: function track() {
      var _this$tracker;

      (_this$tracker = this.tracker).track.apply(_this$tracker, arguments);
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this = this;

      var events = this.config.events;
      Object.keys(events).forEach(function (name) {
        return _this.addListener(name, events[name]);
      });
    }
  }, {
    key: "addListener",
    value: function addListener(name, action) {
      var _this2 = this;

      document.addEventListener(name, function (event) {
        return _this2.track(action, {
          event: event
        });
      });
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        events: {}
      };
    }
  }]);

  return EventTracker;
}();

exports["default"] = EventTracker;