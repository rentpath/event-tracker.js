export default class ViewTracker {
  constructor(config, tracker) {
    this.config = Object.assign({}, config)
    const track = () => tracker.view()

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', track)
    } else {
      track()
    }
  }
}
