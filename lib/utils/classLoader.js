'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = classLoader;

var _classMap = require('./classMap');

var _classMap2 = _interopRequireDefault(_classMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}

function classLoader(base) {
  var map = arguments.length <= 1 || arguments[1] === undefined ? _classMap2.default : arguments[1];

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var items = args.shift();
    if (isObject(items)) {
      items = Object.keys(items).map(function (item) {
        return [item, Object(items[item])];
      });
    }

    return items.reduce(function (prev, item) {
      var config = [];
      if (Array.isArray(item)) {
        var _item = item;

        var _item2 = _slicedToArray(_item, 2);

        item = _item2[0];
        config = _item2[1];
      }
      if (typeof item === 'string') {
        item = map[base ? base + '/' + item : item];
      }

      var Item = item;
      return prev.concat(new (Function.prototype.bind.apply(Item, [null].concat(args, [config])))());
    }, []);
  };
}
module.exports = exports['default'];