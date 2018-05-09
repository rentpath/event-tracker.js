/* eslint no-unused-vars: 0 */
import { expect } from 'chai'
import GoogleTagManager from '../../src/providers/GoogleTagManager'

describe('GoogleTagManager', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
  })

  afterEach(function() {
    this.jsdom()
  })

  const config = {
    gtmId: 'test',
    dataLayer: { test: '123' },
    gtm_auth: 'auth',
    gtmPreview: 'env-test',
  }
  describe('#constructor', function() {
    it('calling loadWithData with empty object', function() {
      const gtm = new GoogleTagManager()
      gtm.loadWithData({})
      expect(document.getElementsByTagName('script').length).to.equal(1)
    })
    it('calling loadWithData with no parameters', function() {
      const gtm = new GoogleTagManager()
      gtm.loadWithData()
      expect(document.getElementsByTagName('script').length).to.equal(1)
    })
    it('not calling loadWithData', function() {
      const gtm = new GoogleTagManager()
      expect(document.getElementsByTagName('script').length).to.equal(0)
    })
    it('calling with config data', function() {
      const gtm = new GoogleTagManager(config)
      gtm.loadWithData()
      expect(document.getElementsByTagName('script')[0].src).to
      .equal('//www.googletagmanager.com/gtm.js?id=test&gtm_auth=&gtm_preview=env-test&gtm_cookies_win=x')
    })
  })
})
