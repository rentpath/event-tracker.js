import { expect } from 'chai'
import DeviceReducer from '../../src/reducers/Device'

/* eslint-disable max-len */
const agents = {
  desktop: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36',
  mobile: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1',
  tablet: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1',
}
/* eslint-enable max-len */

describe('DeviceReducer', function() {
  before(function() {
    this.jsdom = require('jsdom-global')()
  })

  after(function() {
    this.jsdom()
  })

  beforeEach(function() {
    this.reducer = new DeviceReducer()
  })

  describe('#reduce', function() {
    beforeEach(function() {
      this.reducer.parser.setUA(agents.desktop)
    })

    it('assigns a screen type', function() {
      expect(this.reducer.reduce().screen_type).to.exist
    })

    it('assigns a screen resolution', function() {
      expect(this.reducer.reduce().screen_resolution).to.exist
    })

    it('assigns an operating system', function() {
      expect(this.reducer.reduce().operating_system).to.exist
    })

    it('assigns an operating system version', function() {
      expect(this.reducer.reduce().operating_system_version).to.exist
    })

    it('only includes the major operating system version', function() {
      expect(this.reducer.reduce().operating_system_version).to.equal('10')
    })
  })

  describe('#screen_type', function() {
    it('defaults to desktop if ua is unknown', function() {
      this.reducer.parser.setUA('')
      expect(this.reducer.reduce().screen_type).to.equal('desktop')
    })

    it('identifies mobile devices', function() {
      this.reducer.parser.setUA(agents.mobile)
      expect(this.reducer.reduce().screen_type).to.equal('mobile')
    })

    it('identifies tablet devices', function() {
      this.reducer.parser.setUA(agents.tablet)
      expect(this.reducer.reduce().screen_type).to.equal('tablet')
    })

    it('uses default if type is not enabled', function() {
      this.reducer.parser.setUA(agents.tablet)
      this.reducer.config.enabledTypes.tablet = false
      expect(this.reducer.reduce().screen_type).to.equal('desktop')
    })
    it('identifies tablet us sets mobile devices', function() {
      // If you put tests below this you will need to reset or change
      // global.window
      global.window = { screen: { width: 410 } }
      this.reducer.parser.setUA(agents.tablet)
      expect(this.reducer.reduce().screen_type).to.equal('mobile')
    })
  })
})
