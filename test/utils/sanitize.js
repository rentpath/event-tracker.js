import { expect } from 'chai'
import sanitize from '../../src/utils/sanitize'

describe('utils/sanitize', function() {
  it('removes null values', function() {
    expect(sanitize({ empty: '', null: null, undef: undefined })).to.eql({})
  })

  it('removes objects', function() {
    expect(sanitize({ obj: {} })).to.eql({})
  })

  it('converts integers to string', function() {
    expect(sanitize({ int: 1 })).to.eql({ int: '1' })
  })

  it('converts arrays to string', function() {
    expect(sanitize({ arr: [1, 2] })).to.eql({ arr: '1,2' })
  })

  it('treats zero as a valid value', function() {
    expect(sanitize({ int: 0 })).to.eql({ int: '0' })
  })
})
