import { expect } from 'chai'
import EventReducer from '../../src/reducers/Event'

describe('BrowserReducer', function() {
  before(function() {
    this.jsdom = require('jsdom-global')()
  })

  after(function() {
    this.jsdom()
  })

  beforeEach(function() {
    const reducer = new EventReducer()
    this.reduce = reducer.reduce.bind(reducer)
  })

  describe('#reduce', function() {
    it('does nothing unless event object with x/y coordinates is provided', function() {
      expect(this.reduce()).to.eql({})
    })

    it('adds x and y coordinates', function() {
      const event = { pageX: 10, pageY: 20 }
      expect(this.reduce({ event })).to.eql({ event, x_coordinate: 10, y_coordinate: 20 })
    })
  })
})
