import EventTracker from './Event'

export default class SelectTracker extends EventTracker {
  get defaults() {
    return {
      events: {
        change: 'select',
      },
    }
  }

  canTrack(node) {
    // eslint-disable-next-line no-bitwise
    return node && !!(~['SELECT', 'OPTION'].indexOf(node.nodeName))
  }

  track(action, { event }) {
    if (this.canTrack(event.target)) {
      this.tracker.track(action, { event })
    }
  }
}
