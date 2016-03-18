"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestReducer = function () {
  function RequestReducer() {
    _classCallCheck(this, RequestReducer);
  }

  RequestReducer.prototype.reduce = function reduce() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _extends(data, this.data);
  };

  RequestReducer.prototype.getData = function getData() {
    var req = window.location;
    return {
      url: req.href,
      path: req.pathname,
      hash: req.hash.substr(1),
      domain: req.hostname,
      query_string: req.search.substr(1)
    };
  };

  _createClass(RequestReducer, [{
    key: "data",
    get: function get() {
      return this._data || (this._data = this.getData());
    }
  }]);

  return RequestReducer;
}();

exports.default = RequestReducer;
module.exports = exports['default'];