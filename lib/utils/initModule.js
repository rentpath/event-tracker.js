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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var map = { providers: _providers2.default, reducers: _reducers2.default, trackers: _trackers2.default };

function initModule(type, name) {
  var parts = Array.isArray(name) ? name : [name];

  var _parts = _toArray(parts);

  var item = _parts[0];
  var config = _parts[1];

  var extra = _parts.slice(2);

  var Module = item;
  if (typeof item === 'string') {
    Module = map[type] && map[type][item];
    if (!Module) throw new Error('Unable to extract module "' + item + '"');
  }

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Module, [null].concat([config], _toConsumableArray(extra.concat(args)))))();
}
module.exports = exports['default'];