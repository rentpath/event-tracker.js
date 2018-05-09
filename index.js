const EventTracker = require('./lib/EventTracker')
const { iframe, iframeSrc } = require('./lib/noscripts/gtm')

EventTracker.gtmIframe = iframe
EventTracker.gtmIframeSrc = iframeSrc

module.exports = EventTracker
