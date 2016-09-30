'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionReducer = function () {
  function SessionReducer() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, SessionReducer);

    this.config = _extends(this.defaults, config);
    this.data = this.getData();
  }

  SessionReducer.prototype.reduce = function reduce() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _extends(data, this.data);
  };

  SessionReducer.prototype.requestId = function requestId() {
    return new Date().getTime() + ('00' + Math.floor(Math.random() * 1000)).slice(-3);
  };

  SessionReducer.prototype.setCookie = function setCookie(name, value, options) {
    document.cookie = _cookie2.default.serialize(name, value, _extends({
      domain: '.' + window.location.host,
      path: '/'
    }, options));
  };

  SessionReducer.prototype.getData = function getData() {
    var _config = this.config;
    var sessionKey = _config.sessionKey;
    var sessionAge = _config.sessionAge;
    var visitorKey = _config.visitorKey;
    var visitorAge = _config.visitorAge;


    var cookies = _cookie2.default.parse(document.cookie);
    var requestId = this.requestId();
    var visitorId = cookies[visitorKey] || requestId;
    var sessionId = cookies[sessionKey] || requestId;
    var timestamp = new Date().getTime();

    this.setCookie(visitorKey, visitorId, {
      expires: visitorAge ? new Date(timestamp + visitorAge) : null
    });
    this.setCookie(sessionKey, sessionId, {
      expires: sessionAge ? new Date(timestamp + sessionAge) : null
    });

    return {
      visit_id: visitorId + '.' + sessionId,
      visitor_id: visitorId,
      session_id: sessionId
    };
  };

  _createClass(SessionReducer, [{
    key: 'defaults',
    get: function get() {
      return {
        visitorKey: 'rp_visitor_id',
        sessionKey: 'rp_session_id',
        visitorAge: 86400 * 365 * 5 * 1000, // 5 years
        sessionAge: 30 * 60 * 1000 };
    }
  }]);

  return SessionReducer;
}();

exports.default = SessionReducer;
module.exports = exports['default'];