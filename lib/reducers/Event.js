"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventReducer =
/*#__PURE__*/
function () {
  function EventReducer() {
    _classCallCheck(this, EventReducer);
  }

  _createClass(EventReducer, [{
    key: "reduce",
    value: function reduce() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!data.event || !data.event.pageX || !data.event.pageY) {
        return data;
      }

      return Object.assign(data, {
        x_coordinate: data.event.pageX,
        y_coordinate: data.event.pageY
      });
    }
  }]);

  return EventReducer;
}();

exports["default"] = EventReducer;