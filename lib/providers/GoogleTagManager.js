"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configurable = _interopRequireDefault(require("../utils/configurable"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var initialPageview = 1;

var GoogleTagManager = (0, _configurable["default"])(_class =
/*#__PURE__*/
function () {
  function GoogleTagManager(config) {
    _classCallCheck(this, GoogleTagManager);

    this.configure(this.defaults, config);
    window.dataLayer = window.dataLayer || [];
  }

  _createClass(GoogleTagManager, [{
    key: "reset",
    value: function reset() {
      var gtmId = this.config.gtmId;

      if (window.google_tag_manager && window.google_tag_manager[gtmId]) {
        window.google_tag_manager[gtmId].dataLayer.reset();
      }
    }
  }, {
    key: "track",
    value: function track(data) {
      var _this$config = this.config,
          trackCallback = _this$config.trackCallback,
          trackTimeout = _this$config.trackTimeout;

      var newData = _objectSpread({}, data);

      if (trackCallback) {
        // If you specify eventCallback in the data layer,
        // GTM will call the function when the tracking call has completed
        newData.eventCallback = function () {
          // Pass the data back so trackCallback will know what tagging was requested
          trackCallback(data);
        };
      }

      if (trackTimeout) {
        // If you specify eventTimeout in the data layer,
        // GTM will call eventCallback even if the tracking call fails
        // (for example, if the browser blocks the GTM call)
        newData.eventTimeout = trackTimeout;
      } // const delayedPageview = []
      // const trackDelayedPageView = () => {
      //   if (
      //     window.google_tag_manager
      //     && window.google_tag_manager.dataLayer
      //     && window.google_tag_manager.dataLayer.gtmLoad) {
      //     delayedPageview.map(delayedData => window.dataLayer.push(delayedData))
      //   } else {
      //     // call trackDelayedPageview again
      //     // to ensure dataLayer.gtmLoad is true
      //     setTimeout(trackDelayedPageView, 100)
      //   }
      // }
      // window.addEventListener('load', trackDelayedPageView)
      // Tagging team requests that all initial gtm.view
      // events be flagged with initialPageview=1


      if (newData.event === 'gtm.view' && initialPageview === 1) {
        newData.initialPageview = 1;
        initialPageview = 0;
      } else {
        newData.initialPageview = 0;
      } // we don't want `gtm.view` to fire before the default
      // Page View and Window Loaded events
      // but want the data, so delay in until after those events


      if (document.readyState !== 'complete' && newData.event === 'gtm.view') {
        // clone data and send it with a new event name
        window.dataLayer.push(_objectSpread({}, newData, {
          event: 'gtm.pageinfo'
        }), _objectSpread({}, newData)); // send gtm.view later
        // window.dataLayer.push({ ...newData })
      } else {
        window.dataLayer.push(newData);
      }
    }
  }, {
    key: "loadWithData",
    value: function loadWithData(reducerModules) {
      var script = this.createScriptDoc(reducerModules);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }, {
    key: "onLoad",
    value: function onLoad(reducerModules) {
      var dataLayer = this.config.dataLayer;
      var dataLayerData = reducerModules.reduce(function (obj, reducer) {
        return reducer.reduce(obj);
      }, _objectSpread({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      }, dataLayer));
      this.track(dataLayerData);
    }
  }, {
    key: "createScriptDoc",
    value: function createScriptDoc(reducerModules) {
      var _this = this;

      var script = document.createElement('script');
      var gtmLoad = new Event('gtm_load', {
        bubbles: true
      });
      script.addEventListener('load', function () {
        window.dispatchEvent(gtmLoad);

        _this.onLoad(reducerModules);
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
      var _this$config2 = this.config,
          gtmAuth = _this$config2.gtmAuth,
          gtmPreview = _this$config2.gtmPreview,
          gtmId = _this$config2.gtmId;
      return "https://www.googletagmanager.com/gtm.js?id=".concat(gtmId, "&gtm_auth=").concat(gtmAuth, "&gtm_preview=").concat(gtmPreview, "&gtm_cookies_win=x");
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        gtmId: undefined,
        dataLayer: {},
        gtmAuth: '',
        gtmPreview: ''
      };
    }
  }]);

  return GoogleTagManager;
}()) || _class;

exports["default"] = GoogleTagManager;