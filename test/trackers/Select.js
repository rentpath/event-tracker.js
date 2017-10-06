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

  it('triggers a select action for select elements', function() {
    const event = new Event('change')
    Object.defineProperty(event, 'target', { value: { nodeName: 'SELECT' } })
    document.dispatchEvent(event)
    expect(this.spy.called).to.be.true
  })

  it('triggers a select action for option elements', function() {
    const event = new Event('change')
    Object.defineProperty(event, 'target', { value: { nodeName: 'OPTION' } })
    document.dispatchEvent(event)
    expect(this.spy.called).to.be.true
  })

  it('does not trigger a select action for input elements', function() {
    const event = new Event('change')
    Object.defineProperty(event, 'target', { value: { nodeName: 'INPUT' } })
    document.dispatchEvent(event)
    expect(this.spy.called).to.be.false
  })
})
