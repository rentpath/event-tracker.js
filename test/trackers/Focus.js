import sinon from 'sinon'
import { expect } from 'chai'
import FocusTracker from '../../src/trackers/Focus'

describe('FocusTracker', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.spy = sinon.spy()
    this.tracker = new FocusTracker(null, { track: this.spy })
  })

  afterEach(function() {
    this.jsdom()
  })

  it('triggers an action for focus events', function() {
    document.dispatchEvent(new Event('focus'))
    expect(this.spy.called).to.be.true
  })
})
