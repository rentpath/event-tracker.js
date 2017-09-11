import EventTracker from './Event'

export default class FocusTracker extends EventTracker {
  get defaults() {
    return {
      events: {
        focus: 'focus',
      },
    }
  }
}
