const mapped = {
  providers: [
    'tealium'
  ],
  trackers: [
    'view',
    'click',
    'select',
    'event',
    'form',
    'request'
  ],
  reducers: [
    'session',
    'browser',
    'device',
    'element',
    'meta',
    'request'
  ]
}

const classMap = Object.keys(mapped).reduce((map, group) => {
  return Object.assign(map, mapped[group].reduce((prev, name) => {
    const fileName = name.charAt(0).toUpperCase() + name.slice(1)
    prev[`${group}/${name}`] = require(`../${group}/${fileName}`)
    return prev
  }, {}))
}, {})

export default function extractClass(item, namespace) {
  const result = Array.isArray(item) ? item : [item]

  if (typeof result[0] === 'string') {
    const found = classMap[`${namespace}/${result[0]}`]
    if (!found) throw new Error(`Unable to extract class "${result[0]}"`)
    result[0] = found
  }

  return result
}
