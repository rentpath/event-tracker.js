"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestReducer = function () {
  function RequestReducer() {
    _classCallCheck(this, RequestReducer);
  }

  _createClass(RequestReducer, [{
    key: "reduce",
    value: function reduce() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return Object.assign(data, this.data);
    }
  }, {
    key: "getData",
    value: function getData() {
      var req = window.location;
      return {
        url: req.href,
        path: req.pathname,
        hash: req.hash.substr(1),
        domain: req.hostname,
        query_string: req.search.substr(1)
      };
    }
  }, {
    key: "data",
    get: function get() {
      return this._data || (this._data = this.getData());
    }
  }]);

  return RequestReducer;
}();

exports.default = RequestReducer;
module.exports = exports['default'];