import sinon from 'sinon'
import { expect } from 'chai'
import SelectTracker from '../../src/trackers/Select'

describe('SelectTracker', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.spy = sinon.spy()
    this.tracker = new SelectTracker(null, { track: this.spy })
  })

  afterEach(function() {
    this.jsdom()
  })

  it('triggers an action for change events', function() {
    document.dispatchEvent(new Event('change'))
    expect(this.spy.called).to.be.true
  })
})
