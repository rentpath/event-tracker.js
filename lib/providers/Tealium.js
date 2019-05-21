"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configurable = _interopRequireDefault(require("../utils/configurable"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tealium = (0, _configurable["default"])(_class =
/*#__PURE__*/
function () {
  function Tealium(config) {
    _classCallCheck(this, Tealium);

    this.configure(this.defaults, config);
    this.load();
  }

  _createClass(Tealium, [{
    key: "track",
    value: function track(data) {
      this.queue.push(data);
    }
  }, {
    key: "deliver",
    value: function deliver(data) {
      window.utag.link(data);
    }
  }, {
    key: "load",
    value: function load() {
      var script = this.createScript();
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }, {
    key: "onLoad",
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
    key: "createScript",
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
    key: "url",
    get: function get() {
      var _this$config = this.config,
          account = _this$config.account,
          profile = _this$config.profile,
          env = _this$config.env;
      return "//tags.tiqcdn.com/utag/".concat(account, "/").concat(profile, "/").concat(env, "/utag.js");
    }
  }, {
    key: "queue",
    get: function get() {
      var queue = this._queue || (this._queue = []);
      return queue;
    }
  }, {
    key: "defaults",
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

exports["default"] = Tealium;