'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetaReducer = function () {
  function MetaReducer() {
    _classCallCheck(this, MetaReducer);
  }

  _createClass(MetaReducer, [{
    key: 'reduce',
    value: function reduce() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return Object.assign(data, this.data);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var tags = Array.from(document.getElementsByTagName('meta'));
      return tags.reduce(function (data, tag) {
        if (tag.name) Object.assign(data, _defineProperty({}, tag.name, tag.content));
        return data;
      }, {});
    }
  }, {
    key: 'data',
    get: function get() {
      return this._data || (this._data = this.getData());
    }
  }]);

  return MetaReducer;
}();

exports.default = MetaReducer;
module.exports = exports['default'];