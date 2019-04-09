import configurable from '../utils/configurable'

let initialPageview = 1

@configurable
export default class GoogleTagManager {

  constructor(config) {
    this.configure(this.defaults, config)
    window.dataLayer = window.dataLayer || []
  }

  get url() {
    const {
      gtmAuth, gtmPreview, gtmId,
    } = this.config
    return `https://www.googletagmanager.com/gtm.js?id=${gtmId}&gtm_auth=${gtmAuth}&gtm_preview=${gtmPreview}&gtm_cookies_win=x`
  }

  reset() {
    const { gtmId } = this.config

    if (window.google_tag_manager && window.google_tag_manager[gtmId]) {
      window.google_tag_manager[gtmId].dataLayer.reset()
    }
  }

  track(data) {
    window.performance.mark('gtmTrackStart')
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

    const delayedPageview = []

    const trackDelayedPageView = () => {
      if (
        window.google_tag_manager
        && window.google_tag_manager.dataLayer
        && window.google_tag_manager.dataLayer.gtmLoad) {
        delayedPageview.map(delayedData => window.dataLayer.push(delayedData))
      } else {
        // call trackDelayedPageview again
        // to ensure dataLayer.gtmLoad is true
        setTimeout(trackDelayedPageView, 100)
      }
    }

    window.addEventListener('load', trackDelayedPageView)

    // Tagging team requests that all initial gtm.view
    // events be flagged with initialPageview=1
    if (newData.event === 'gtm.view' && initialPageview === 1) {
      newData.initialPageview = 1
      initialPageview = 0
    } else {
      newData.initialPageview = 0
    }

    // we don't want `gtm.view` to fire before the default
    // Page View and Window Loaded events
    // but want the data, so delay in until after those events
    if (document.readyState !== 'complete' && newData.event === 'gtm.view') {
      // clone data and send it with a new event name
      window.dataLayer.push({ ...newData, event: 'gtm.pageinfo' })
      // send gtm.view later
      delayedPageview.push(newData)
    } else {
      window.dataLayer.push(newData)
    }
    window.performance.mark('gtmTrackEnd')
    window.performance.measure('gtmTrack', 'gtmTrackStart', 'gtmTrackEnd')
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
