"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gtmIframe = exports.gtmIframeSrc = void 0;

var gtmIframeSrc = function gtmIframeSrc(config) {
  return "https://www.googletagmanager.com/ns.html?id=".concat(config.gtmId || undefined, "&gtm_auth=").concat(config.gtmAuth || '', "&gtm_preview=").concat(config.gtmPreview || '', "&gtm_cookies_win=x");
};

exports.gtmIframeSrc = gtmIframeSrc;

var gtmIframe = function gtmIframe(config) {
  return "<iframe src=\"".concat(gtmIframeSrc(config), "\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\" id=\"tag-manager\"></iframe>");
};

exports.gtmIframe = gtmIframe;