'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementReducer = function () {
  function ElementReducer(config) {
    _classCallCheck(this, ElementReducer);

    this.config = Object.assign(this.defaults, config);
  }

  _createClass(ElementReducer, [{
    key: 'reduce',
    value: function reduce() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var node = data.element || data.event && data.event.target;
      if (node) {
        Object.assign(data, this.getData(node));
      }
      return data;
    }
  }, {
    key: 'getData',
    value: function getData(element) {
      var _this = this;

      return this.getStack(element).reduce(function (data, node) {
        return Object.assign(data, _this.getAtts(node), _this.getTags(node));
      }, this.getInfo(element));
    }
  }, {
    key: 'getStack',
    value: function getStack(element) {
      var stack = [];
      var node = element;
      while (node) {
        stack.push(node);
        node = node.parentNode;
      }
      return stack.slice(0, -1).reverse();
    }
  }, {
    key: 'getTags',
    value: function getTags(element) {
      var atts = element.attributes;
      var prefix = this.config.tagPrefix;
      return Object.keys(atts).filter(function (key) {
        return atts[key].name.substr(0, prefix.length) === prefix;
      }).reduce(function (obj, key) {
        var tags = obj;
        tags[atts[key].name.substr(prefix.length)] = atts[key].value;
        return tags;
      }, {});
    }
  }, {
    key: 'getInfo',
    value: function getInfo(element) {
      var info = {};
      if (element.src) {
        info.image = element.src;
      }
      if (this.isInput(element)) {
        info.value = element.value;
      }
      return info;
    }
  }, {
    key: 'getAtts',
    value: function getAtts(element) {
      var atts = {};
      if (element.href) {
        atts.href = element.getAttribute('href');
      }
      return atts;
    }
  }, {
    key: 'isInput',
    value: function isInput(node) {
      return ~['INPUT', 'TEXTAREA', 'SELECT'].indexOf(node.nodeName);
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        tagPrefix: 'data-tag_'
      };
    }
  }]);

  return ElementReducer;
}();

exports.default = ElementReducer;
module.exports = exports['default'];