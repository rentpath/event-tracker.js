import { expect } from 'chai'
import DeviceReducer from '../../src/reducers/Device'

describe('DeviceReducer', function () {
  before(function () {
    this.jsdom = require('jsdom-global')()
  })

  after(function () {
    this.jsdom()
  })

  beforeEach(function () {
    let reducer = new DeviceReducer()
    this.reduce = reducer.reduce.bind(reducer)
  })

  describe('#reduce', function () {
    it('assigns a screen type', function () {
      expect(this.reduce().screen_type).to.exist
    })

    it('assigns a screen resolution', function () {
      expect(this.reduce().screen_resolution).to.exist
    })

    it('assigns an operating system', function () {
      expect(this.reduce().operating_system).to.exist
    })
  })
})
