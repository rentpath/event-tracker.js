import sinon from 'sinon'
import { expect } from 'chai'
import EventTracker from '../../src/trackers/Event'

describe('EventTracker', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.spy = sinon.spy()
    this.tracker = new EventTracker({ events: { foo: 'foo' } }, { track: this.spy })
  })

  afterEach(function() {
    this.jsdom()
  })

  it('triggers an action for custom events', function() {
    document.dispatchEvent(new Event('foo'))
    expect(this.spy.called).to.be.true
  })
})
