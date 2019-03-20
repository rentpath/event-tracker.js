import Parser from 'ua-parser-js'

const screenSizeType = {
  mobile: {
    min: 0,
    max: 480,
  },
  tablet: {
    min: 481,
    max: 1145,
  },
  desktop: {
    min: 1146,
    max: 99999,
  },
}

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

  isScreenSize(width) {
    return ['mobile', 'tablet'].find(size => {
      const type = screenSizeType[size]
      return width >= type.min && width <= type.max
    })
  }

  get screenType() {
    // We want to set the screen_type based pixel size and not via the
    // userAgent to align with how GA handles attribution
    const width = window.screen.width

    if (width > 0) {
      return this.isScreenSize(width) || 'desktop'
    }

    // Fallback to our old logic of using the device userAgent to figure out
    // screen_type
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
