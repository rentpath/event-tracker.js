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
        container[event] = container[event].filter(cb => cb !== fn)
      }
      return this
    },

    trigger(event, ...args) {
      let list = []
      if (container['*']) {
        list = list.concat(container['*'])
      }
      if (container[event]) {
        list = list.concat(container[event])
      }
      list.forEach(fn => fn(...args))
      return this
    },
  })
}
