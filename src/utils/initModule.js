import providers from '../providers'
import reducers from '../reducers'
import trackers from '../trackers'

const map = { providers, reducers, trackers }

export default function initModule(type, name, ...args) {
  const parts = Array.isArray(name) ? name : [name]
  const [item, config] = parts

  let Module = item

  if (typeof Module === 'string') {
    Module = map[type] && map[type][item]
    if (!Module) throw new Error(`Unable to find module "${item}"`)
  }

  return new Module(config, ...args)
}
