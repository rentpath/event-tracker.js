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

var DEFAULT_CAMPAIGN_FACTOR = 1.75;

var EcommerceReducer =
/*#__PURE__*/
function () {
  function EcommerceReducer() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EcommerceReducer);

    this.config = Object.assign(this.defaults, config);
  }

  _createClass(EcommerceReducer, [{
    key: "requestId",
    value: function requestId() {
      return Date.now() + Math.floor((1 + Math.random()) * 1000);
    }
  }, {
    key: "getStorageData",
    value: function getStorageData(key) {
      return window.sessionStorage ? window.sessionStorage.getItem(key) : undefined;
    }
  }, {
    key: "setStorageData",
    value: function setStorageData(key, value) {
      if (window.sessionStorage) window.sessionStorage.setItem(key, value);
    }
  }, {
    key: "multiplierMatrix",
    value: function multiplierMatrix() {
      var today = new Date();
      var dayOfWeek = today.getDay();
      return this.config.multiplierMatrix && this.config.multiplierMatrix[dayOfWeek] && this.config.multiplierMatrix[dayOfWeek][today.getHours()] || DEFAULT_CAMPAIGN_FACTOR;
    }
  }, {
    key: "calculateFactor",
    value: function calculateFactor(campaignId, selection, screenType) {
      if (selection === 'email' && screenType === 'desktop') {
        if (campaignId && this.config.multiplierMatrix && this.config.multiplierMatrix.length > 0) {
          return this.multiplierMatrix();
        } else if (campaignId) {
          return DEFAULT_CAMPAIGN_FACTOR;
        }

        return 2;
      }

      return 1;
    }
  }, {
    key: "adjustedTotal",
    value: function adjustedTotal(factor, revenue) {
      return revenue && !isNaN(revenue) ? (parseFloat(revenue) * factor).toFixed(2) : revenue;
    }
  }, {
    key: "reduce",
    value: function reduce() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!data.action || data.action !== 'lead_submission') {
        return data;
      }

      var _this$config = this.config,
          sessionKey = _this$config.sessionKey,
          campaignKey = _this$config.campaignKey;

      var cookies = _cookie["default"].parse(document.cookie);

      var sessionId = cookies[sessionKey];
      var listingId = data.listing_id;
      var revenue = data.revenue;
      var selection = data.selection;
      var transactionId = this.requestId();
      var uniqueSubmission = this.getStorageData("".concat(sessionId, "_").concat(listingId)) ? 'false' : 'true';
      var factor = this.calculateFactor(cookies[campaignKey], selection, data.screen_type);
      var transactionAdjustedTotal = this.adjustedTotal(factor, revenue);
      this.setStorageData("".concat(sessionId, "_").concat(listingId), true);
      return Object.assign(data, {
        transactionId: transactionId,
        transactionAffiliation: selection,
        transactionAdjustedTotal: transactionAdjustedTotal,
        transactionTotal: revenue,
        uniqueSubmission: uniqueSubmission,
        transactionProducts: "[{\n        sku: ".concat(listingId, ",\n        name: ").concat(listingId, ",\n        category: ").concat(selection, ",\n        price: ").concat(revenue, ",\n        quantity: 1,\n      }]")
      });
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        campaignKey: 'campaign_id',
        sessionKey: 'rp_session_id'
      };
    }
  }]);

  return EcommerceReducer;
}();

exports["default"] = EcommerceReducer;