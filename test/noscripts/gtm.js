import { expect } from 'chai'
import { gtmIframe, gtmIframeSrc } from '../../src/noscripts/gtm'

describe('utils/sanitize', function() {
  it('calling iframe with empty config', function() {
    expect(gtmIframe({})).to.eql('<iframe src="https://www.googletagmanager.com/ns.html?id=undefined&gtm_auth=&gtm_preview=&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>')
  })
  it('calling iframe with config', function() {
    expect(gtmIframe({ gtmId: 'test', gtmAuth: 'auth', gtmPreview: 'preview' })).to.eql('<iframe src="https://www.googletagmanager.com/ns.html?id=test&gtm_auth=auth&gtm_preview=preview&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>')
  })
  it('calling iframeSrc with empty config', function() {
    expect(gtmIframeSrc({})).to.eql('https://www.googletagmanager.com/ns.html?id=undefined&gtm_auth=&gtm_preview=&gtm_cookies_win=x')
  })
  it('calling iframeSrc with config', function() {
    expect(gtmIframeSrc({ gtmId: 'test', gtmAuth: 'auth', gtmPreview: 'preview' })).to.eql('https://www.googletagmanager.com/ns.html?id=test&gtm_auth=auth&gtm_preview=preview&gtm_cookies_win=x')
  })
})
