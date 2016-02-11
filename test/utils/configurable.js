import { expect } from 'chai'
import configurable from '../../src/utils/configurable'

describe('utils/configurable', function() {
  beforeEach(function() {
    function Tracker() {}
    configurable(Tracker)
    this.subject = new Tracker()
  })

  describe('#configure', function() {
    it('sets a `config` property on the instance class', function() {
      this.subject.configure()
      expect(this.subject.config).to.be.an('object')
    })

    it('merges method arguments values', function() {
      this.subject.configure({ foo: 'bar', baz: 'foo' }, { foo: 'baz' })
      expect(this.subject.config).to.eql({ foo: 'baz', baz: 'foo' })
    })

    it('does not mutate method arguments', function() {
      const obj = { foo: 'bar' }
      this.subject.configure(obj, { bar: 'foo' })
      expect(obj).to.eql({ foo: 'bar' })
    })
  })
})
