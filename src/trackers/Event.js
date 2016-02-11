export default class EventTracker {
  constructor(config, tracker) {
    this.config = Object.assign(this.defaults, config)
    this.tracker = tracker
    this.addListeners()
  }

  track(...args) {
    this.tracker.track(...args)
  }

  addListeners() {
    const { events } = this.config
    Object.keys(events).forEach(name => this.addListener(name, events[name]))
  }

  addListener(name, action) {
    document.addEventListener(name, event => this.track(action, { event }))
  }

  get defaults() {
    return {
      events: {}
    }
  }
}
