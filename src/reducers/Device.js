import Parser from 'ua-parser-js'

export default class DeviceReducer {
  constructor(config) {
    this.config = Object.assign(this.defaults, config)
  }

  reduce(data = {}) {
    return Object.assign(data, this.data)
  }

  getData() {
    return {
      screen_type: this.screenType,
      screen_resolution: this.screenResolution,
      operating_system: this.operatingSystem,
      operating_system_version: this.operatingSystemVersion,
    }
  }

  get data() {
    const data = this._data || (this._data = this.getData())
    return data
  }

  get screenResolution() {
    return `${window.screen.width}x${window.screen.height}`
  }

  get screenType() {
    const type = this.parser.getDevice().type
    return this.config.enabledTypes[type] ? type : this.config.defaultType
  }

  get parser() {
    const parser = this._parser || (this._parser = new Parser())
    return parser
  }

  get operatingSystem() {
    return this.parser.getOS().name
  }

  get operatingSystemVersion() {
    return (this.parser.getOS().version || '').split('.')[0]
  }

  get defaults() {
    return {
      defaultType: 'desktop',
      enabledTypes: {
        desktop: true,
        mobile: true,
        tablet: true,
      },
    }
  }
}
