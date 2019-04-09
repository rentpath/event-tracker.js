"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FocusTracker =
/*#__PURE__*/
function () {
  function FocusTracker(config, tracker) {
    _classCallCheck(this, FocusTracker);

    this.config = _objectSpread({}, config);
    this.tracker = tracker;
    this.handleFocus = this.handleFocus.bind(this);
    this.addListener();
  }

  _createClass(FocusTracker, [{
    key: "track",
    value: function track() {
      var _this$tracker;

      (_this$tracker = this.tracker).track.apply(_this$tracker, arguments);
    }
  }, {
    key: "canTrack",
    value: function canTrack(node) {
      return node && !!~['INPUT', 'TEXTAREA', 'SELECT'].indexOf(node.nodeName);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(event) {
      if (this.canTrack(event.target)) {
        this.track('focus', {
          event: event
        });
      }
    }
  }, {
    key: "addListener",
    value: function addListener() {
      document.addEventListener('focus', this.handleFocus, {
        capture: true
      });
    }
  }]);

  return FocusTracker;
}();

exports["default"] = FocusTracker;