export default class FocusTracker {
  constructor(config, tracker) {
    this.config = { ...config }
    this.tracker = tracker
    this.addListener()
  }

  track(...args) {
    this.tracker.track(...args)
  }

  addListener() {
    document.addEventListener('focus', event => this.track('focus', { event }), { capture: true })
  }
}
