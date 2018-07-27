import cookie from 'cookie'

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

  adjustedTotal(selection, screenType, campaignId, revenue) {
    let factor = 1

    if (selection === 'email' && screenType === 'desktop') {
      factor = 2
      if (campaignId) factor = 1.75
    }
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
    const transactionAdjustedTotal = this.adjustedTotal(selection,
      data.screen_type, cookies[campaignKey], revenue)
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
