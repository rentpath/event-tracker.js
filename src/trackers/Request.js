import configurable from '../utils/configurable'

@configurable
export default class RequestTracker {
  constructor(config, tracker) {
    this.configure(this.defaults, config)
    this.tracker = tracker
  }

  get defaults () {
    return {

    }
  }
}
