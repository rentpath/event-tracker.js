import emitter from './utils/emitter'
import sanitize from './utils/sanitize'
import configurable from './utils/configurable'
import extractClass from './utils/extractClass'

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
    const data = this._process(Object.assign({ action }, props))
    this.trigger('track', data)
    this.providers.forEach((provider) => provider.track(data))
    return this
  }

  view(...args) {
    return this.track('view', ...args)
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
      this[group] = this.config[group].reduce((prev, item) => {
        const [Module, config, ...args] = extractClass(item, group)
        return prev.concat(new Module(config, ...args.concat(this)))
      }, [])
    })
  }

  get defaults() {
    return {
      providers: [
        'tealium',
      ],
      trackers: [
        'view',
        'click',
        'select',
      ],
      reducers: [
        'session',
        'browser',
        'device',
        'element',
      ],
    }
  }
}
