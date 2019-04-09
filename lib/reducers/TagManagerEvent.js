"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var gtmEventTranslation = {
  click: 'eventTrackerClick'
};

var TagManagerEventReducer =
/*#__PURE__*/
function () {
  function TagManagerEventReducer() {
    _classCallCheck(this, TagManagerEventReducer);
  }

  _createClass(TagManagerEventReducer, [{
    key: "reduce",
    value: function reduce() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!data.action) return data;
      var actionName = "".concat(data.action);
      var finalData = Object.assign(data, {
        event: "gtm.".concat(gtmEventTranslation[actionName] || actionName),
        event_action: data.action
      });
      if (data.item) finalData.event_label = data.item;
      if (data.section) finalData.event_category = data.section;
      return finalData;
    }
  }]);

  return TagManagerEventReducer;
}();

exports["default"] = TagManagerEventReducer;