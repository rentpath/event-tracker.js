import classMap from './classMap'

function isObject(obj) {
  return obj === Object(obj) && !Array.isArray(obj)
}

export default function classLoader (base, map = classMap) {
  return function (...args) {
    let items = args.shift()
    if (isObject(items)) {
      items = Object.keys(items).map(item => [item, Object(items[item])])
    }

    return items.reduce((prev, item) => {
      let config = []
      if (Array.isArray(item)) {
        [item, config] = item
      }
      if (typeof item === 'string') {
        item = map[base ? `${base}/${item}` : item]
      }

      const Item = item
      return prev.concat(new Item(...args, config))
    }, [])
  }
}
