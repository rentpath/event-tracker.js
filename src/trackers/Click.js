import EventTracker from './Event'

export default class ClickTracker extends EventTracker {
  get defaults() {
    return {
      events: {
        click: 'click',
      },
    }
  }
}
