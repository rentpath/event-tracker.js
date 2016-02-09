import classLoader from './utils/classLoader'
import sanitize from './utils/sanitize'

export default class EventTracker {
  static create (...args) {
    return new EventTracker(...args)
  }

  constructor (config) {
    this.config = Object.assign(this.defaults, config)
    this._initModules('providers')
    this._initModules('reducers')
    this._initModules('trackers', this.track.bind(this))
  }

  track (action, props) {
    const data = this._process(Object.assign({ action }, props))
    this.providers.forEach((provider) => provider.track(data))
    return this
  }

  view (...args) {
    return this.track('view', ...args)
  }

  _process (data) {
    return sanitize(this._reduce(Object.assign({}, this._data, data)))
  }

  _reduce (data) {
    return this.reducers.reduce((obj, reducer) => reducer.reduce(obj), data)
  }

  _initModules (type, ...args) {
    this[type] = classLoader(type)(this.config[type], ...args)
  }

  get defaults () {
    return {
      providers: [
        'tealium'
      ],
      trackers: [
        'view',
        'click',
        'select'
      ],
      reducers: [
        'session',
        'browser',
        'device',
        'element'
      ]
    }
  }
}
