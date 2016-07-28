import sinon from 'sinon'
import { expect } from 'chai'
import ViewTracker from '../../src/trackers/View'
import jsdom from 'jsdom-global'

describe('ViewTracker', function() {
  beforeEach(function() {
    this.jsdom = jsdom()
    this.spy = sinon.spy()
    this.tracker = new ViewTracker(null, { view: this.spy })
  })

  afterEach(function() {
    this.jsdom()
  })

  it('triggers an action for DOM ready events', function() {
    document.dispatchEvent(new Event('DOMContentLoaded'))
    expect(this.spy.called).to.be.true
  })
})
