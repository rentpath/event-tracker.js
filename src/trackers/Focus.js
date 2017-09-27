export default class FocusTracker {
  constructor(config, tracker) {
    this.config = { ...config }
    this.tracker = tracker
    this.handleFocus = this.handleFocus.bind(this)
    this.addListener()
  }

  track(...args) {
    this.tracker.track(...args)
  }

  canTrack(node) {
    return node && !!(~['INPUT', 'TEXTAREA', 'SELECT'].indexOf(node.nodeName))
  }

  handleFocus(event) {
    if (this.canTrack(event.target)) {
      this.track('focus', { event })
    }
  }

  addListener() {
    document.addEventListener('focus', this.handleFocus, { capture: true })
  }
}
