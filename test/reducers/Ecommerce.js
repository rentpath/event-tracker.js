import sinon from 'sinon'
import { expect } from 'chai'
import EcommerceReducer from '../../src/reducers/Ecommerce'

describe('EcommerceReducer', function() {
  beforeEach(function() {
    this.jsdom = require('jsdom-global')()
    this.stub = sinon.stub(EcommerceReducer.prototype, 'requestId').returns('123')
    this.stub2 = sinon.stub(EcommerceReducer.prototype, 'getStorageData').returns(false)
    this.stub3 = sinon.stub(EcommerceReducer.prototype, 'setStorageData')
  })

  afterEach(function() {
    this.jsdom()
    this.stub.restore()
    this.stub2.restore()
    this.stub3.restore()
  })

  describe('#reduce', function() {
    it('does nothing unless action is provided', function() {
      const reducer = new EcommerceReducer()
      expect(reducer.reduce()).to.eql({})
    })

    it('does nothing unless action is lead_submission', function() {
      const reducer = new EcommerceReducer()
      expect(reducer.reduce({ action: 'click' })).to.eql({ action: 'click' })
    })

    it('adds transaction tags for lead_submission action', function() {
      const reducer = new EcommerceReducer()
      const expected = {
        action: 'lead_submission',
        transactionAdjustedTotal: undefined,
        transactionAffiliation: undefined,
        transactionId: '123',
        transactionTotal: undefined,
        uniqueSubmission: 'true',
        transactionProducts: `[{
        sku: undefined,
        name: undefined,
        category: undefined,
        price: undefined,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce({ action: 'lead_submission' })).to.eql(expected)
    })
    it('checks uniqueSubmission is true', function() {
      document.cookie = 'rp_session_id=abc'
      const reducer = new EcommerceReducer()
      const expected = {
        action: 'lead_submission',
        transactionAdjustedTotal: undefined,
        transactionAffiliation: 'email',
        listing_id: '1234',
        selection: 'email',
        transactionId: '123',
        transactionTotal: undefined,
        uniqueSubmission: 'true',
        transactionProducts: `[{
        sku: 1234,
        name: 1234,
        category: email,
        price: undefined,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce({ action: 'lead_submission', listing_id: '1234', selection: 'email' })).to.eql(expected)
    })
    it('checks uniqueSubmission is false', function() {
      document.cookie = 'rp_session_id=abc'
      this.stub2.restore()
      this.stub2 = sinon.stub(EcommerceReducer.prototype, 'getStorageData').returns(true)
      const reducer = new EcommerceReducer()
      const expected = {
        action: 'lead_submission',
        transactionAdjustedTotal: undefined,
        transactionAffiliation: 'email',
        listing_id: '1234',
        selection: 'email',
        transactionId: '123',
        transactionTotal: undefined,
        uniqueSubmission: 'false',
        transactionProducts: `[{
        sku: 1234,
        name: 1234,
        category: email,
        price: undefined,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce({ action: 'lead_submission', listing_id: '1234', selection: 'email' })).to.eql(expected)
    })
    it('checks transactionAdjustedTotal is twice of transactionTotal for desktop email lead with no campaign_id', function() {
      document.cookie = 'rp_session_id=abc'
      const reducer = new EcommerceReducer()
      const data = {
        action: 'lead_submission',
        listing_id: '1234',
        selection: 'email',
        revenue: '20',
        screen_type: 'desktop',
      }
      const expected = {
        ...data,
        transactionAdjustedTotal: 40,
        transactionAffiliation: 'email',
        transactionId: '123',
        transactionTotal: '20',
        uniqueSubmission: 'true',
        transactionProducts: `[{
        sku: 1234,
        name: 1234,
        category: email,
        price: 20,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce(data)).to.eql(expected)
    })
    it('checks transactionAdjustedTotal is 1.75 times of transactionTotal for desktop email lead with campaign_id without a supplied multiplierMatrix', function() {
      document.cookie = 'rp_session_id=abc'
      document.cookie = 'campaign_id=12345'
      const config = {
        multiplierMatrix: undefined,
      }
      const reducer = new EcommerceReducer(config)
      const data = {
        action: 'lead_submission',
        listing_id: '1234',
        selection: 'email',
        revenue: '20',
        screen_type: 'desktop',
      }
      const expected = {
        ...data,
        transactionAdjustedTotal: 35,
        transactionAffiliation: 'email',
        transactionId: '123',
        transactionTotal: '20',
        uniqueSubmission: 'true',
        transactionProducts: `[{
        sku: 1234,
        name: 1234,
        category: email,
        price: 20,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce(data)).to.eql(expected)
    })
    it('checks if the multiplierMatrix function supplied, it is called to determine the factor for desktop email leads with a campaign_id', function() {
      document.cookie = 'rp_session_id=abc'
      document.cookie = 'campaign_id=12345'
      const spy = sinon.spy()
      const config = {
        multiplierMatrix: spy,
      }
      const reducer = new EcommerceReducer(config)
      const data = {
        action: 'lead_submission',
        listing_id: '1234',
        selection: 'email',
        revenue: '20',
        screen_type: 'desktop',
      }
      reducer.reduce(data)
      expect(spy.called).to.be.true
    })
    it('checks transactionAdjustedTotal is same as transactionTotal for desktop phone leads', function() {
      document.cookie = 'rp_session_id=abc'
      document.cookie = 'campaign_id=12345'
      const reducer = new EcommerceReducer()
      const data = {
        action: 'lead_submission',
        listing_id: '1234',
        selection: 'phone',
        revenue: '20',
        screen_type: 'desktop',
      }
      const expected = {
        ...data,
        transactionAdjustedTotal: 20,
        transactionAffiliation: 'phone',
        transactionId: '123',
        transactionTotal: '20',
        uniqueSubmission: 'true',
        transactionProducts: `[{
        sku: 1234,
        name: 1234,
        category: phone,
        price: 20,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce(data)).to.eql(expected)
    })
    it('checks transactionAdjustedTotal is same as transactionTotal for mobile email leads', function() {
      document.cookie = 'rp_session_id=abc'
      document.cookie = 'campaign_id=12345'
      const reducer = new EcommerceReducer()
      const data = {
        action: 'lead_submission',
        listing_id: '1234',
        selection: 'email',
        revenue: '20',
        screen_type: 'mobile',
      }
      const expected = {
        ...data,
        transactionAdjustedTotal: 20,
        transactionAffiliation: 'email',
        transactionId: '123',
        transactionTotal: '20',
        uniqueSubmission: 'true',
        transactionProducts: `[{
        sku: 1234,
        name: 1234,
        category: email,
        price: 20,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce(data)).to.eql(expected)
    })
    it('checks transactionAdjustedTotal is same as transactionTotal for mobile phone leads', function() {
      document.cookie = 'rp_session_id=abc'
      document.cookie = 'campaign_id=12345'
      const reducer = new EcommerceReducer()
      const data = {
        action: 'lead_submission',
        listing_id: '1234',
        selection: 'phone',
        revenue: '20',
        screen_type: 'mobile',
      }
      const expected = {
        ...data,
        transactionAdjustedTotal: 20,
        transactionAffiliation: 'phone',
        transactionId: '123',
        transactionTotal: '20',
        uniqueSubmission: 'true',
        transactionProducts: `[{
        sku: 1234,
        name: 1234,
        category: phone,
        price: 20,
        quantity: 1,
      }]`,
      }
      expect(reducer.reduce(data)).to.eql(expected)
    })
  })
})
