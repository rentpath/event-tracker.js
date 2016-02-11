import { expect } from 'chai'
import emitter from '../../src/utils/emitter'

describe('utils/emitter', function() {
  beforeEach(function() {
    function Tracker() {}
    emitter(Tracker)
    this.subject = new Tracker()
  })

  it('adds on/trigger methods', function() {
    const calls = []
    this.subject.on('foo', num => calls.push('one', num))
    this.subject.trigger('foo', 1)
    expect(calls).to.eql(['one', 1])
  })
})
