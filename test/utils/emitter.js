import sinon from 'sinon'
import { expect } from 'chai'
import emitter from '../../src/utils/emitter'

describe('utils/emitter', function() {
  beforeEach(function() {
    function Tracker() {}
    emitter(Tracker)
    this.subject = new Tracker()
  })

  describe('#on', function() {
    it('adds event listeners', function () {
      const spy = sinon.spy()
      this.subject.on('foo', spy)
      this.subject.trigger('foo')
      expect(spy.called).to.be.true
    })
  })

  describe('#off', function() {
    it('removes event listeners', function() {
      const spy = sinon.spy()
      this.subject.on('foo', spy)
      this.subject.off('foo', spy)
      this.subject.trigger('foo')
      expect(spy.called).to.be.false
    })
  })

  describe('#trigger', function() {
    it('invokes listeners with passed arguments', function() {
      const spy = sinon.spy()
      this.subject.on('foo', spy)
      this.subject.trigger('foo', 'bar')
      expect(spy.calledWith('bar')).to.be.true
    })
  })
})
