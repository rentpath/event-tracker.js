'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractClass;
var mapped = {
  providers: ['tealium'],
  trackers: ['view', 'click', 'select', 'event', 'form', 'request'],
  reducers: ['session', 'browser', 'device', 'element', 'meta', 'request']
};

var classMap = Object.keys(mapped).reduce(function (map, group) {
  return Object.assign(map, mapped[group].reduce(function (prev, name) {
    var fileName = name.charAt(0).toUpperCase() + name.slice(1);
    prev[group + '/' + name] = require('../' + group + '/' + fileName);
    return prev;
  }, {}));
}, {});

function extractClass(item, namespace) {
  var result = Array.isArray(item) ? item : [item];

  if (typeof result[0] === 'string') {
    var found = classMap[namespace + '/' + result[0]];
    if (!found) throw new Error('Unable to extract class "' + result[0] + '"');
    result[0] = found;
  }

  return result;
}
module.exports = exports['default'];