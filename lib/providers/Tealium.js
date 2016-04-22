'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _configurable = require('../utils/configurable');

var _configurable2 = _interopRequireDefault(_configurable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tealium = (0, _configurable2.default)(_class = function () {
  function Tealium(config) {
    _classCallCheck(this, Tealium);

    this.configure(this.defaults, config);
    this.load();
  }

  Tealium.prototype.track = function track(data) {
    this.queue.push(data);
  };

  Tealium.prototype.deliver = function deliver(data) {
    window.utag.link(data);
  };

  Tealium.prototype.load = function load() {
    var script = this.createScript();
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  Tealium.prototype.onLoad = function onLoad() {
    var _this = this;

    this.track = function (data) {
      return _this.deliver(data);
    };
    var queue = this.queue;

    while (queue.length) {
      this.track(queue.pop());
    }
  };

  Tealium.prototype.createScript = function createScript() {
    var _this2 = this;

    var script = document.createElement('script');
    script.addEventListener('load', function () {
      return _this2.onLoad();
    });
    return _extends(script, {
      src: this.url,
      type: 'text/javascript',
      async: true
    });
  };

  _createClass(Tealium, [{
    key: 'url',
    get: function get() {
      var _config = this.config;
      var account = _config.account;
      var profile = _config.profile;
      var env = _config.env;

      return '//tags.tiqcdn.com/utag/' + account + '/' + profile + '/' + env + '/utag.js';
    }
  }, {
    key: 'queue',
    get: function get() {
      return this._queue || (this._queue = []);
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        env: 'dev',
        account: undefined,
        profile: undefined
      };
    }
  }]);

  return Tealium;
}()) || _class;

exports.default = Tealium;
module.exports = exports['default'];