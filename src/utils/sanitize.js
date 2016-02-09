export default function sanitize (data = {}) {
  return Object.keys(data).reduce(function (sanitized, key) {
    let val = data[key]
    if (val === 0 || Array.isArray(val) || val && typeof val !== 'object') {
      sanitized[key] = val.toString()
    }
    return sanitized
  }, {})
}
