import sinon from 'sinon'
import { expect } from 'chai'
import ViewTracker from '../../src/trackers/View'

describe('ViewTracker', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.spy = sinon.spy()
    this.tracker = new ViewTracker(null, { track: this.spy })
  })

  afterEach(function() {
    this.jsdom()
  })

  it('triggers an action for DOM ready events', function() {
    document.dispatchEvent(new Event('DOMContentLoaded'))
    expect(this.spy.called).to.be.true
  })
})
