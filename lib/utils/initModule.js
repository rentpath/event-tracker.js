'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initModule;

var _providers = require('../providers');

var _providers2 = _interopRequireDefault(_providers);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _trackers = require('../trackers');

var _trackers2 = _interopRequireDefault(_trackers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = { providers: _providers2.default, reducers: _reducers2.default, trackers: _trackers2.default };

function initModule(type, name) {
  var parts = Array.isArray(name) ? name : [name];
  var item = parts[0];
  var config = parts[1] || {};

  var Module = item;
  if (typeof Module === 'string') {
    Module = map[type] && map[type][item];
    if (!Module) throw new Error('Unable to find module "' + item + '"');
  }

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Module, [null].concat([config], args)))();
}
module.exports = exports['default'];