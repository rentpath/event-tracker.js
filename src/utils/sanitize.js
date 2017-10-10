export default function sanitize(data = {}) {
  return Object.keys(data).reduce((sanitized, key) => {
    const obj = sanitized
    const val = data[key]

    if (val === 0 || Array.isArray(val) || (val && typeof val !== 'object')) {
      obj[key] = val.toString()
    }
    return obj
  }, {})
}
