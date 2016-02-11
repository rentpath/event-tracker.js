import sinon from 'sinon'
import { expect } from 'chai'
import FormTracker from '../../src/trackers/Form'

describe('FormTracker', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.spy = sinon.spy()
    this.tracker = new FormTracker(null, { track: this.spy })
  })

  afterEach(function() {
    this.jsdom()
  })

  it('triggers an action for submit events', function() {
    document.dispatchEvent(new Event('submit'))
    expect(this.spy.called).to.be.true
  })
})
