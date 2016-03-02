'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetaReducer = function () {
  function MetaReducer(config) {
    _classCallCheck(this, MetaReducer);

    this.config = _extends(this.defaults, config);
  }

  _createClass(MetaReducer, [{
    key: 'reduce',
    value: function reduce() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return _extends(data, this.data);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var meta = document.querySelectorAll('meta' + (this.config.filter || ''));
      var tags = Array.prototype.slice.call(meta);

      return tags.reduce(function (data, tag) {
        if (tag.name) _extends(data, _defineProperty({}, tag.name, tag.content));
        return data;
      }, {});
    }
  }, {
    key: 'data',
    get: function get() {
      return this._data || (this._data = this.getData());
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        filter: null
      };
    }
  }]);

  return MetaReducer;
}();

exports.default = MetaReducer;
module.exports = exports['default'];