import configurable from '../utils/configurable'

@configurable
export default class Tealium {
  constructor(config) {
    this.configure(this.defaults, config)
    this.load()
  }

  get url() {
    const { account, profile, env } = this.config
    return `//tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.js`
  }

  get queue() {
    return this._queue || (this._queue = [])
  }

  track(data) {
    this.queue.push(data)
  }

  deliver(data) {
    window.utag.link(data)
  }

  load() {
    const script = this.createScript()
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  onLoad() {
    this.track = data => this.deliver(data)
    const { queue } = this
    while (queue.length) {
      this.track(queue.pop())
    }
  }

  createScript() {
    const script = document.createElement('script')
    script.addEventListener('load', () => this.onLoad())
    return Object.assign(script, {
      src: this.url,
      type: 'text/javascript',
      async: true
    })
  }

  get defaults() {
    return {
      env: 'dev',
      account: undefined,
      profile: undefined
    }
  }
}
