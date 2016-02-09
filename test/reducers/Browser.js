import { expect } from 'chai'
import BrowserReducer from '../../src/reducers/Browser'

describe('BrowserReducer', function () {
  before(function () {
    this.jsdom = require('jsdom-global')()
  })

  after(function () {
    this.jsdom()
  })

  beforeEach(function () {
    let reducer = new BrowserReducer()
    this.reduce = reducer.reduce.bind(reducer)
  })

  describe('#reduce', function () {
    it('assigns a browser name', function () {
      expect(this.reduce().browser).to.exist
    })

    it('assigns a browser version', function () {
      expect(this.reduce().browser_version).to.exist
    })

    it('assigns a browser size', function () {
      expect(this.reduce().browser_size).to.exist
    })
  })
})
