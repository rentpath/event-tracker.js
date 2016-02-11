export default function emitter(target) {
  const listeners = []

  Object.assign(target.prototype, {
    on(event, ...callbacks) {
      listeners[event] = listeners[event] || []
      listeners[event].push(...callbacks)
      return this
    },

    trigger(event, ...args) {
      if (listeners[event]) {
        listeners[event].slice().forEach(fn => fn(...args))
      }
      return this
    }
  })
}
