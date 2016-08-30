'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementReducer = function () {
  function ElementReducer(config) {
    _classCallCheck(this, ElementReducer);

    this.config = _extends(this.defaults, config);
  }

  ElementReducer.prototype.reduce = function reduce() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var node = data.element || data.event && data.event.target;
    if (node) {
      _extends(data, this.getData(node));
    }
    return data;
  };

  ElementReducer.prototype.getData = function getData(element) {
    var _this = this;

    return this.getStack(element).reduce(function (data, node) {
      return _extends(data, _this.getAtts(node), _this.getTags(node));
    }, this.getInfo(element));
  };

  ElementReducer.prototype.getStack = function getStack(element) {
    var stack = [];
    var node = element.correspondingElement || element;
    while (node) {
      stack.push(node);
      node = node.parentNode;
    }
    return stack.slice(0, -1).reverse();
  };

  ElementReducer.prototype.getTags = function getTags(element) {
    var atts = element.attributes;
    var prefix = this.config.tagPrefix;
    return Object.keys(atts).filter(function (key) {
      return atts[key] && atts[key].name && atts[key].name.substr(0, prefix.length) === prefix;
    }).reduce(function (obj, key) {
      var tags = obj;
      tags[atts[key].name.substr(prefix.length)] = atts[key].value;
      return tags;
    }, {});
  };

  ElementReducer.prototype.getInfo = function getInfo(element) {
    var info = {};
    if (element.src) {
      info.image = element.src;
    }
    if (this.isInput(element)) {
      if (this.isSelect(element)) {
        var node = element.options[element.selectedIndex];
        var attr = this.config.tagPrefix + 'value';
        info.value = node.getAttribute(attr) || node.value;
      } else {
        info.value = element.value;
      }
    }
    return info;
  };

  ElementReducer.prototype.getAtts = function getAtts(element) {
    var atts = {};
    var href = element.getAttribute('href');
    if (href && !href.match(/^(?:javascript|#)/)) {
      atts.href = href;
    }
    return atts;
  };

  ElementReducer.prototype.isInput = function isInput(node) {
    return ~['INPUT', 'TEXTAREA', 'SELECT'].indexOf(node.nodeName);
  };

  ElementReducer.prototype.isSelect = function isSelect(node) {
    return node.nodeName === 'SELECT';
  };

  _createClass(ElementReducer, [{
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