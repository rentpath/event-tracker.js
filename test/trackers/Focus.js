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

  it('triggers a focus action for input elements', function() {
    const event = new Event('focus')
    Object.defineProperty(event, 'target', { value: { nodeName: 'INPUT' } })
    document.dispatchEvent(event)
    expect(this.spy.called).to.be.true
  })

  it('triggers a focus action for select elements', function() {
    const event = new Event('focus')
    Object.defineProperty(event, 'target', { value: { nodeName: 'SELECT' } })
    document.dispatchEvent(event)
    expect(this.spy.called).to.be.true
  })

  it('triggers a focus action for textarea elements', function() {
    const event = new Event('focus')
    Object.defineProperty(event, 'target', { value: { nodeName: 'TEXTAREA' } })
    document.dispatchEvent(event)
    expect(this.spy.called).to.be.true
  })

  it('does not trigger a focus action for anchor elements', function() {
    const event = new Event('focus')
    Object.defineProperty(event, 'target', { value: { nodeName: 'A' } })
    document.dispatchEvent(event)
    expect(this.spy.called).to.be.false
  })
})
