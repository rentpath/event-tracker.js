'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

  var _parts = _slicedToArray(parts, 2);

  var item = _parts[0];
  var config = _parts[1];


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