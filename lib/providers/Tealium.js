'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

  _createClass(Tealium, [{
    key: 'track',
    value: function track(data) {
      this.queue.push(data);
    }
  }, {
    key: 'deliver',
    value: function deliver(data) {
      window.utag.link(data);
    }
  }, {
    key: 'load',
    value: function load() {
      var script = this.createScript();
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this = this;

      this.track = function (data) {
        return _this.deliver(data);
      };
      var queue = this.queue;

      while (queue.length) {
        this.track(queue.pop());
      }
    }
  }, {
    key: 'createScript',
    value: function createScript() {
      var _this2 = this;

      var script = document.createElement('script');
      script.addEventListener('load', function () {
        return _this2.onLoad();
      });
      return Object.assign(script, {
        src: this.url,
        type: 'text/javascript',
        async: true
      });
    }
  }, {
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
        account: 'rentpath',
        profile: '[profile]'
      };
    }
  }]);

  return Tealium;
}()) || _class;

exports.default = Tealium;
module.exports = exports['default'];