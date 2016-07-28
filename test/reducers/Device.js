import { expect } from 'chai'
import DeviceReducer from '../../src/reducers/Device'

describe('DeviceReducer', function() {
  before(function() {
    this.jsdom = require('jsdom-global')()
  })

  after(function() {
    this.jsdom()
  })

  beforeEach(function() {
    const reducer = new DeviceReducer()
    this.reduce = reducer.reduce.bind(reducer)
    /* eslint-disable max-len */
    reducer.parser.setUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36')
    /* eslint-enable max-len */
  })

  describe('#reduce', function() {
    it('assigns a screen type', function() {
      expect(this.reduce().screen_type).to.exist
    })

    it('assigns a screen resolution', function() {
      expect(this.reduce().screen_resolution).to.exist
    })

    it('assigns an operating system', function() {
      expect(this.reduce().operating_system).to.exist
    })

    it('assigns an operating system version', function() {
      expect(this.reduce().operating_system_version).to.exist
    })
  })
})
