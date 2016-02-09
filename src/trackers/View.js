export default class ViewTracker {
  constructor (track) {
    document.addEventListener('DOMContentLoaded', () => track('view'))
  }
}
