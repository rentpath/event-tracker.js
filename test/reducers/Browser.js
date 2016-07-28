import { expect } from 'chai'
import BrowserReducer from '../../src/reducers/Browser'

describe('BrowserReducer', function() {
  before(function() {
    this.jsdom = require('jsdom-global')()
  })

  after(function() {
    this.jsdom()
  })

  beforeEach(function() {
    const reducer = new BrowserReducer()
    this.reduce = reducer.reduce.bind(reducer)
    /* eslint-disable max-len */
    reducer.parser.setUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36')
    /* eslint-enable max-len */
  })

  describe('#reduce', function() {
    it('assigns a browser name', function() {
      expect(this.reduce().browser).to.exist
    })

    it('assigns a browser version', function() {
      expect(this.reduce().browser_version).to.exist
    })

    it('assigns a browser size', function() {
      expect(this.reduce().browser_size).to.exist
    })
  })
})
