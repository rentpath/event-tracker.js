import debounce from 'lodash.debounce'
import EventTracker from './Event'

export default class ScrollTracker extends EventTracker {
  addListener(name, action) {
    document.addEventListener(name, event => this.track(action, { event }))
  }

  get defaults() {
    return {
      events: {
        scroll: 'scroll',
      },
    }
  }
}
