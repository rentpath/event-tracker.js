import browserDetect from 'browser-detect'

export default class BrowserReducer {
  reduce (data = {}) {
    return Object.assign(data, this.data)
  }

  getData () {
    return {
      browser: this.browser,
      browser_size: this.browserSize,
      browser_version: this.browserVersion
    }
  }

  get data () {
    return this._data || (this._data = this.getData())
  }

  get browser () {
    return browserDetect().browser
  }

  get browserSize () {
    return `${window.screen.width}x${window.screen.height}`
  }

  get browserVersion () {
    return browserDetect().version
  }
}
