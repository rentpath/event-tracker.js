import configurable from '../utils/configurable'

@configurable
export default class GoogleTagManager {

  constructor(config) {
    this.configure(this.defaults, config)
    window.dataLayer = window.dataLayer || []
  }

  get url() {
    const { gtmAuth, gtmPreview, gtmId } = this.config
    return `https://www.googletagmanager.com/gtm.js?id=${gtmId}&gtm_auth=${gtmAuth}&gtm_preview=${gtmPreview}&gtm_cookies_win=x`
  }

  reset() {
    const { gtmId } = this.config

    if (window.google_tag_manager && window.google_tag_manager[gtmId]) {
      window.google_tag_manager[gtmId].dataLayer.reset()
    }
  }

  track(data) {
    const { trackCallback, trackTimeout } = this.config

    const newData = { ...data }

    if (trackCallback) {
      // If you specify eventCallback in the data layer,
      // GTM will call the function when the tracking call has completed
      newData.eventCallback = () => {
        // Pass the data back so trackCallback will know what tagging was requested
        trackCallback(data)
      }
    }

    if (trackTimeout) {
      // If you specify eventTimeout in the data layer,
      // GTM will call eventCallback even if the tracking call fails
      // (for example, if the browser blocks the GTM call)
      newData.eventTimeout = trackTimeout
    }

    window.dataLayer.push(newData)
  }

  loadWithData(reducerModules) {
    const script = this.createScriptDoc(reducerModules)
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  onLoad(reducerModules) {
    const { dataLayer } = this.config
    const dataLayerData = reducerModules.reduce((obj, reducer) => reducer.reduce(obj),
      { 'gtm.start': new Date().getTime(), event: 'gtm.js', ...dataLayer })
    this.track(dataLayerData)
  }

  createScriptDoc(reducerModules) {
    const script = document.createElement('script')
    script.addEventListener('load', () => this.onLoad(reducerModules))
    return Object.assign(script, {
      src: this.url,
      type: 'text/javascript',
      async: true,
    })
  }

  get defaults() {
    return {
      gtmId: undefined,
      dataLayer: {},
      gtmAuth: '',
      gtmPreview: '',
    }
  }
}
