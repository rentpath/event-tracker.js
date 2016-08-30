import Parser from 'ua-parser-js'

export default class BrowserReducer {
  reduce(data = {}) {
    return Object.assign(data, this.data)
  }

  getData() {
    return {
      browser: this.browserName,
      browser_size: this.browserSize,
      browser_version: this.browserVersion,
    }
  }

  get data() {
    return this._data || (this._data = this.getData())
  }


  get parser() {
    return this._parser || (this._parser = new Parser())
  }

  get browserName() {
    return this.parser.getBrowser().name
  }

  get browserSize() {
    return `${window.innerWidth}x${window.innerHeight}`
  }

  get browserVersion() {
    return (this.parser.getBrowser().version || '').split('.')[0]
  }
}
