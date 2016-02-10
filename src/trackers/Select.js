import EventTracker from './Event'

export default class SelectTracker extends EventTracker {
  get defaults() {
    return {
      events: {
        change: 'select'
      }
    }
  }
}
