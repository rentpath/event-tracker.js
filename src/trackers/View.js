export default class ViewTracker {
  constructor(config, tracker) {
    this.config = Object.assign({}, config)
    document.addEventListener('DOMContentLoaded', () => tracker.track('view'))
  }
}
