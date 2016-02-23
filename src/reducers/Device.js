import browserDetect from 'browser-detect'

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
      operating_system: this.operatingSystem
    }
  }

  get data() {
    return this._data || (this._data = this.getData())
  }

  get screenResolution() {
    return `${window.screen.width}x${window.screen.height}`
  }

  get screenType() {
    const screenWidth = window.innerWidth
    const breakpoints = this.config.breakpoints
    return Object.keys(breakpoints).reduce((prev, name) => (
      screenWidth >= breakpoints[name] ? name : prev
    ))
  }

  get operatingSystem() {
    return browserDetect().OS
  }

  get defaults() {
    return {
      breakpoints: {
        smartphone: 0,
        tablet: 768,
        desktop: 1024
      }
    }
  }
}
