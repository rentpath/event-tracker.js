import { expect } from 'chai'
import MetaReducer from '../../src/reducers/Meta'

describe('MetaReducer', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    const meta = [
      { name: 'foo', content: 'bar' },
      { name: 'bar', content: 'baz', className: 'bar' }
    ]
    meta.forEach(props => {
      const tag = Object.assign(document.createElement('meta'), props)
      document.getElementsByTagName('head')[0].appendChild(tag)
    })
  })

  afterEach(function() {
    this.jsdom()
  })

  describe('#reduce', function() {
    it('assigns values collected from meta tags', function() {
      const reducer = new MetaReducer()
      expect(reducer.reduce()).to.eql({ foo: 'bar', bar: 'baz' })
    })

    it('uses a custom selector to filter meta tags', function() {
      const reducer = new MetaReducer({ filter: '.bar' })
      expect(reducer.reduce()).to.eql({ bar: 'baz' })
    })
  })
})
