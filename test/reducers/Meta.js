import { expect } from 'chai'
import MetaReducer from '../../src/reducers/Meta'

describe('MetaReducer', function () {
  before(function () {
    this.jsdom = require('jsdom-global')()

    const meta = [
      Object.assign(document.createElement('meta'), { name: 'foo', content: 'bar' }),
    ]
    meta.forEach((tag) => {
      document.getElementsByTagName('head')[0].appendChild(tag)
    })
  })

  after(function () {
    this.jsdom()
  })

  beforeEach(function () {
    let reducer = new MetaReducer()
    this.reduce = reducer.reduce.bind(reducer)
  })

  describe('#reduce', function () {
    it('assigns values collected from meta tags', function () {
      expect(this.reduce().foo).to.equal('bar')
    })
  })
})
