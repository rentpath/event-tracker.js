import { expect } from 'chai'
import RequestReducer from '../../src/reducers/Request'

describe('RequestReducer', function () {
  before(function () {
    this.jsdom = require('jsdom-global')()
  })

  after(function () {
    this.jsdom()
  })

  beforeEach(function () {
    let reducer = new RequestReducer()
    this.reduce = reducer.reduce.bind(reducer)
  })

  describe('#reduce', function () {
    it('assigns a url', function () {
      expect(this.reduce().url).to.exist
    })

    it('assigns a path', function () {
      expect(this.reduce().path).to.exist
    })

    it('assigns a hash', function () {
      expect(this.reduce().hash).to.exist
    })

    it('assigns a domain', function () {
      expect(this.reduce().domain).to.exist
    })

    it('assigns a query string', function () {
      expect(this.reduce().query_string).to.exist
    })
  })
})
