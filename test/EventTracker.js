import sinon from 'sinon'
import { expect } from 'chai'
import EventTracker from '../src/EventTracker'

describe('EventTracker', function() {
  class Provider {
    constructor(config) {
      this.spy = config.spy
    }

    track(...args) {
      this.spy(...args)
    }
  }

  before(function() {
    this.jsdom = require('jsdom-global')()
  })

  after(function() {
    this.jsdom()
  })

  beforeEach(function() {
    this.spy = sinon.spy()
    this.tracker = new EventTracker({
      providers: [[Provider, { spy: this.spy }]]
    })
  })

  describe('#track', function() {
    it('calls the track method on providers', function() {
      this.tracker.track()
      expect(this.spy.called).to.be.true
    })

    it('converts the first argument to an action name', function() {
      this.tracker.track('test')
      expect(this.spy.calledWith({ action: 'test' })).to.be.true
    })

    it('accepts a data object as the second parameter', function() {
      this.tracker.track('test', { foo: 'bar' })
      expect(this.spy.calledWith({ action: 'test', foo: 'bar' })).to.be.true
    })

    it('sanitizes data before passing it to providers', function() {
      this.tracker.track(null, { empty: '', null: null, undef: undefined })
      expect(this.spy.calledWith({})).to.be.true
    })
  })

  describe('#view', function() {
    it('calls the track method on providers with a action of `view`', function() {
      this.tracker.view()
      expect(this.spy.calledWith({ action: 'view' })).to.be.true
    })

    it('passes along all method arguments', function() {
      this.tracker.view({ foo: 'bar' })
      expect(this.spy.calledWith({ action: 'view', foo: 'bar' })).to.be.true
    })
  })
})
