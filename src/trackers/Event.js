export default class EventTracker {
  constructor (track, config) {
    this.config = Object.assign(this.defaults, config)
    this._track = track
    this.addListeners()
  }

  track (...args) {
    this._track(...args)
  }

  addListeners () {
    const { events } = this.config
    Object.keys(events).forEach((name) => this.addListener(name, events[name]))
  }

  addListener (name, action) {
    document.addEventListener(name, (event) => this.track(action, { event }))
  }

  get defaults () {
    return {
      events: {}
    }
  }
}
