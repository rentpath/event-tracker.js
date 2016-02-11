import cookie from 'cookie'

export default class SessionReducer {
  constructor(config = {}) {
    this.config = Object.assign(this.defaults, config)
  }

  reduce(data = {}) {
    return Object.assign(data, this.data)
  }

  requestId() {
    return (new Date()).getTime() + (`00${Math.floor(Math.random() * 1000)}`).slice(-3)
  }

  setCookie(name, value, options) {
    document.cookie = cookie.serialize(name, value, Object.assign({
      domain: `.${window.location.host}`,
      path: '/'
    }, options))
  }

  getData() {
    const {
      sessionKey,
      sessionAge,
      visitorKey,
      visitorAge
    } = this.config

    const cookies = cookie.parse(document.cookie)
    const requestId = this.requestId()
    const visitorId = cookies[visitorKey] || requestId
    const sessionId = cookies[sessionKey] || requestId
    const timestamp = new Date().getTime()

    this.setCookie(visitorKey, visitorId, {
      expires: new Date(timestamp + visitorAge)
    })
    this.setCookie(sessionKey, sessionId, {
      expires: new Date(timestamp + sessionAge)
    })

    return {
      visit_id: `${visitorId}.${sessionId}`,
      visitor_id: visitorId,
      session_id: sessionId
    }
  }

  get data() {
    return this._data || (this._data = this.getData())
  }

  get defaults() {
    return {
      visitorKey: 'rp_visitor_id',
      sessionKey: 'rp_session_id',
      visitorAge: 86400 * 365 * 5 * 1000, // 5 years
      sessionAge: 30 * 60 * 1000 // 30 minutes
    }
  }
}
