import emitter from './utils/emitter'
import sanitize from './utils/sanitize'
import initModule from './utils/initModule'
import configurable from './utils/configurable'

@emitter
@configurable
export default class EventTracker {
  static create(...args) {
    return new EventTracker(...args)
  }

  constructor(config) {
    this.configure(this.defaults, config)
    this._initModules('providers', 'reducers', 'trackers')
  }

  track(action, props) {
    const data = this._process(Object.assign({ action }, this._data, props))
    this.trigger('track', data)
    this.providers.forEach(provider => provider.track(data))
    return this
  }

  view(...args) {
    this.trigger('view', ...args)
    return this.track('view', ...args)
  }

  include(data, merge = true) {
    this._data = Object.assign(merge && this._data || {}, data)
    return this
  }

  debug(...args) {
    if (args.length) this._debug = !!args[0]
    return this._debug
  }

  _process(data) {
    return sanitize(this._reduce(data))
  }

  _reduce(data) {
    return this.reducers.reduce((obj, reducer) => reducer.reduce(obj), data)
  }

  _initModules(...groups) {
    groups.forEach(group => {
      this[group] = (this.config[group] || []).reduce((prev, name) => (
        prev.concat(initModule(group, name, this))
      ), [])
    })
  }

  get defaults() {
    return {
      providers: [],
      trackers: [],
      reducers: []
    }
  }
}
