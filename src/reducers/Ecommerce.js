import cookie from 'cookie'

const DEFAULT_CAMPAIGN_FACTOR = 1.75

export default class EcommerceReducer {

  constructor(config = {}) {
    this.config = Object.assign(this.defaults, config)
  }

  requestId() {
    return (Date.now() + Math.floor((1 + Math.random()) * 1000))
  }

  getStorageData(key) {
    return window.sessionStorage ? window.sessionStorage.getItem(key) : undefined
  }

  setStorageData(key, value) {
    if (window.sessionStorage) window.sessionStorage.setItem(key, value)
  }

  multiplierMatrix() {
    const today = new Date()
    const dayOfWeek = today.getDay()
    return (
      this.config.multiplierMatrix &&
      this.config.multiplierMatrix[dayOfWeek] &&
      this.config.multiplierMatrix[dayOfWeek][today.getHours()]
    ) || DEFAULT_CAMPAIGN_FACTOR
  }

  calculateFactor(campaignId, selection, screenType) {
    if (selection === 'email' && screenType === 'desktop') {
      if (campaignId && this.config.multiplierMatrix && this.config.multiplierMatrix.length > 0) {
        return this.multiplierMatrix()
      } else if (campaignId) {
        return DEFAULT_CAMPAIGN_FACTOR
      }
      return 2
    }
    return 1
  }

  adjustedTotal(factor, revenue) {
    return revenue && !isNaN(revenue) ? (parseFloat(revenue) * factor)
      : revenue
  }

  reduce(data = {}) {
    if (!data.action || data.action !== 'lead_submission') {
      return data
    }
    const {
      sessionKey,
      campaignKey,
    } = this.config
    const cookies = cookie.parse(document.cookie)
    const sessionId = cookies[sessionKey]
    const listingId = data.listing_id
    const revenue = data.revenue
    const selection = data.selection
    const transactionId = this.requestId()
    const uniqueSubmission = this.getStorageData(`${sessionId}_${listingId}`) ? 'false' : 'true'
    const factor = this.calculateFactor(cookies[campaignKey], selection, data.screen_type)
    const transactionAdjustedTotal = this.adjustedTotal(factor, revenue)
    this.setStorageData(`${sessionId}_${listingId}`, true)

    return Object.assign(data, {
      transactionId,
      transactionAffiliation: selection,
      transactionAdjustedTotal,
      transactionTotal: revenue,
      uniqueSubmission,
      transactionProducts: `[{
        sku: ${listingId},
        name: ${listingId},
        category: ${selection},
        price: ${revenue},
        quantity: 1,
      }]`,
    })
  }

  get defaults() {
    return {
      campaignKey: 'campaign_id',
      sessionKey: 'rp_session_id',
    }
  }
}
