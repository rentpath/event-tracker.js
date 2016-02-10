import EventTracker from './Event'

export default class FormTracker extends EventTracker {
  get defaults() {
    return {
      events: {
        submit: 'submit'
      }
    }
  }
}
