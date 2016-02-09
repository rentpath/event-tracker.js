import { expect } from 'chai'
import classLoader from '../../src/utils/classLoader'

describe('utils/classLoader', function () {
  it('returns a function', function () {
    expect(classLoader()).to.be.a('function')
  })
})
