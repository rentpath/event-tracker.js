'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Click = require('./Click');

var _Click2 = _interopRequireDefault(_Click);

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Click: _Click2.default,
  Event: _Event2.default,
  Select: _Select2.default,
  View: _View2.default
};
module.exports = exports['default'];