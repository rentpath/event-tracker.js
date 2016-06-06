"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventReducer = function () {
  function EventReducer() {
    _classCallCheck(this, EventReducer);
  }

  EventReducer.prototype.reduce = function reduce() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!data.event || !data.event.pageX || !data.event.pageY) {
      return data;
    }
    return _extends(data, {
      x_coordinate: data.event.pageX,
      y_coordinate: data.event.pageY
    });
  };

  return EventReducer;
}();

exports.default = EventReducer;
module.exports = exports['default'];