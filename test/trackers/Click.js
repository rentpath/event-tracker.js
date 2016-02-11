import sinon from 'sinon'
import { expect } from 'chai'
import ClickTracker from '../../src/trackers/Click'

describe('ClickTracker', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.spy = sinon.spy()
    this.tracker = new ClickTracker(null, { track: this.spy })
  })

  afterEach(function() {
    this.jsdom()
  })

  it('triggers an action for click events', function() {
    document.body.click()
    expect(this.spy.called).to.be.true
  })
})
