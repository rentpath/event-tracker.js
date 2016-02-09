import sinon from 'sinon'
import { expect } from 'chai'
import SessionReducer from '../../src/reducers/Session'

describe('SessionReducer', function () {
  beforeEach(function () {
    this.jsdom = require('jsdom-global')()

    let reducer = new SessionReducer()
    this.reduce = reducer.reduce.bind(reducer)

    sinon.stub(reducer, 'requestId').returns('123')
  })

  afterEach(function () {
    this.jsdom()
  })

  describe('#reduce', function () {
    it('assigns a visitor ID', function () {
      expect(this.reduce().visitor_id).to.exist
    })

    it('assigns a session ID', function () {
      expect(this.reduce().session_id).to.exist
    })

    it('assigns a visit ID', function () {
      expect(this.reduce().visit_id).to.exist
    })

    it('uses a visitor ID stored in cookies', function () {
      document.cookie = 'rp_visitor_id=abc'
      expect(this.reduce().visitor_id).to.equal('abc')
    })

    it('uses a session ID stored in cookies', function () {
      document.cookie = 'rp_session_id=abc'
      expect(this.reduce().session_id).to.equal('abc')
    })

    it('generates a new visitor ID if one is not found in cookies', function () {
      expect(this.reduce().session_id).to.equal('123')
    })

    it('generates a new session ID if one is not found in cookies', function () {
      expect(this.reduce().session_id).to.equal('123')
    })
  })
})
