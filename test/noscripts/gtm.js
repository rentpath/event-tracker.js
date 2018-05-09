import { expect } from 'chai'
import { iframe, iframeSrc } from '../../src/noscripts/gtm'

describe('utils/sanitize', function() {
  it('calling iframe with empty config', function() {
    expect(iframe({})).to.eql('<iframe src="//www.googletagmanager.com/ns.html?id=undefined&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>')
  })
  it('calling iframe with config', function() {
    expect(iframe({ gtmId: 'test' })).to.eql('<iframe src="//www.googletagmanager.com/ns.html?id=test&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>')
  })
  it('calling iframeSrc with empty config', function() {
    expect(iframeSrc({})).to.eql('//www.googletagmanager.com/ns.html?id=undefined&gtm_cookies_win=x')
  })
  it('calling iframeSrc with config', function() {
    expect(iframeSrc({ gtmId: 'test' })).to.eql('//www.googletagmanager.com/ns.html?id=test&gtm_cookies_win=x')
  })
})
