"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapReducer = function () {
  function MapReducer() {
    var map = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, MapReducer);

    this.map = map;
  }

  _createClass(MapReducer, [{
    key: "reduce",
    value: function reduce(data) {
      var _this = this;

      return Object.keys(data).reduce(function (obj, key) {
        obj[_this.map[key] || key] = data[key];
      });
    }
  }]);

  return MapReducer;
}();

exports.default = MapReducer;
module.exports = exports['default'];