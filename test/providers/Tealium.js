/* eslint no-unused-vars: 0 */
import { expect } from 'chai'
import Tealium from '../../src/providers/Tealium'

describe('Tealium', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
  })

  afterEach(function() {
    this.jsdom()
  })

  describe('#constructor', function() {
    it('loads utag.js', function() {
      const tealium = new Tealium()
      expect(document.getElementsByTagName('script').length).to.equal(1)
    })
  })
})
