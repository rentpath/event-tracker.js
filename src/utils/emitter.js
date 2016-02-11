export default function emitter(target) {
  const container = []

  Object.assign(target.prototype, {
    on(event, fn) {
      container[event] = container[event] || []
      container[event].push(fn)
      return this
    },

    off(event, fn) {
      if (container[event]) {
        const listeners = container[event]
        container[event] = []

        listeners.forEach(listener => {
          if (fn !== listener) {
            container[event].push(listener)
          }
        })
      }
      return this
    },

    trigger(event, ...args) {
      if (container[event]) {
        container[event].slice().forEach(fn => fn(...args))
      }
      return this
    }
  })
}
