"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cookie = _interopRequireDefault(require("cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SessionReducer =
/*#__PURE__*/
function () {
  function SessionReducer() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SessionReducer);

    this.config = Object.assign(this.defaults, config);
    this.data = this.getData();
  }

  _createClass(SessionReducer, [{
    key: "reduce",
    value: function reduce() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.assign(data, this.data);
    }
  }, {
    key: "requestId",
    value: function requestId() {
      return new Date().getTime() + "00".concat(Math.floor(Math.random() * 1000)).slice(-3);
    }
  }, {
    key: "setCookie",
    value: function setCookie(name, value, options) {
      document.cookie = _cookie["default"].serialize(name, value, Object.assign({
        domain: ".".concat(window.location.host),
        path: '/'
      }, options));
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this$config = this.config,
          sessionKey = _this$config.sessionKey,
          sessionAge = _this$config.sessionAge,
          visitorKey = _this$config.visitorKey,
          visitorAge = _this$config.visitorAge;

      var cookies = _cookie["default"].parse(document.cookie);

      var requestId = this.requestId();
      var visitorId = cookies[visitorKey] || requestId;
      var sessionId = cookies[sessionKey] || requestId;
      var timestamp = new Date().getTime();
      this.setCookie(visitorKey, visitorId, {
        expires: visitorAge ? new Date(timestamp + visitorAge) : null
      });
      this.setCookie(sessionKey, sessionId, {
        expires: sessionAge ? new Date(timestamp + sessionAge) : null
      }); // TODO: visit_id and visitor_id are going away after we transition away from Tealium

      return {
        visit_id: "".concat(visitorId, ".").concat(sessionId),
        visitor_id: visitorId,
        visit: "".concat(visitorId, ".").concat(sessionId),
        visitor: visitorId,
        session_id: sessionId
      };
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        visitorKey: 'rp_visitor_id',
        sessionKey: 'rp_session_id',
        visitorAge: 86400 * 365 * 5 * 1000,
        // 5 years
        sessionAge: 30 * 60 * 1000 // 30 minutes

      };
    }
  }]);

  return SessionReducer;
}();

exports["default"] = SessionReducer;