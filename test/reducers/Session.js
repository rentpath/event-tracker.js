import sinon from 'sinon'
import { expect } from 'chai'
import SessionReducer from '../../src/reducers/Session'

describe('SessionReducer', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.stub = sinon.stub(SessionReducer.prototype, 'requestId').returns('123')
  })

  afterEach(function() {
    this.jsdom()
    this.stub.restore()
  })

  describe('#reduce', function() {
    it('assigns a visitor ID', function() {
      const reducer = new SessionReducer()
      expect(reducer.reduce().visitor_id).to.exist
    })

    it('assigns a session ID', function() {
      const reducer = new SessionReducer()
      expect(reducer.reduce().session_id).to.exist
    })

    it('assigns a visit ID', function() {
      const reducer = new SessionReducer()
      expect(reducer.reduce().visit_id).to.exist
    })

    it('uses a visitor ID stored in cookies', function() {
      document.cookie = 'rp_visitor_id=abc'
      const reducer = new SessionReducer()
      expect(reducer.reduce().visitor_id).to.equal('abc')
    })

    it('uses a session ID stored in cookies', function() {
      document.cookie = 'rp_session_id=abc'
      const reducer = new SessionReducer()
      expect(reducer.reduce().session_id).to.equal('abc')
    })

    it('generates a new visitor ID if one is not found in cookies', function() {
      const reducer = new SessionReducer()
      expect(reducer.reduce().session_id).to.equal('123')
    })

    it('generates a new session ID if one is not found in cookies', function() {
      const reducer = new SessionReducer()
      expect(reducer.reduce().session_id).to.equal('123')
    })
  })
})
