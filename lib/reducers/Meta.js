"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MetaReducer =
/*#__PURE__*/
function () {
  function MetaReducer(config) {
    _classCallCheck(this, MetaReducer);

    this.config = Object.assign(this.defaults, config);
  }

  _createClass(MetaReducer, [{
    key: "reduce",
    value: function reduce() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.assign(data, this.data);
    }
  }, {
    key: "getData",
    value: function getData() {
      var meta = document.querySelectorAll("meta".concat(this.config.filter || ''));
      var tags = Array.prototype.slice.call(meta);
      return tags.reduce(function (data, tag) {
        if (tag.name) Object.assign(data, _defineProperty({}, tag.name, tag.content));
        return data;
      }, {});
    }
  }, {
    key: "data",
    get: function get() {
      var data = this._data || (this._data = this.getData());
      return data;
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        filter: null
      };
    }
  }]);

  return MetaReducer;
}();

exports["default"] = MetaReducer;