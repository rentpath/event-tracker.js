import { expect } from 'chai'
import TagManagerEventReducer from '../../src/reducers/TagManagerEvent'

describe('EventReducer', function() {
  before(function() {
    this.jsdom = require('jsdom-global')()
  })

  after(function() {
    this.jsdom()
  })

  beforeEach(function() {
    const reducer = new TagManagerEventReducer()
    this.reduce = reducer.reduce.bind(reducer)
  })

  describe('#reduce', function() {
    it('does nothing unless action is provided', function() {
      expect(this.reduce()).to.eql({})
    })

    it('transform action to event and event_action', function() {
      const event = { action: 'click' }
      expect(this.reduce(event)).to.eql({ action: 'click', event: 'gtm.click', event_action: 'click' })
    })

    it('transform action and item to gtm events', function() {
      const event = { action: 'click', item: 'tag' }
      expect(this.reduce(event)).to.eql({ action: 'click', event: 'gtm.click', event_action: 'click', event_label: 'tag', item: 'tag' })
    })

    it('transform action and section to gtm events', function() {
      const event = { action: 'click', section: 'tag' }
      expect(this.reduce(event)).to.eql({ action: 'click', event: 'gtm.click', event_action: 'click', event_category: 'tag', section: 'tag' })
    })
  })
})
