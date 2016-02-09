export default class ElementReducer {
  constructor (config) {
    this.config = Object.assign(this.defaults, config)
  }

  reduce (data = {}) {
    const node = data.element || (data.event && data.event.target)
    if (node) {
      return Object.assign(data, this.getData(node))
    } else {
      return data
    }
  }

  getData (node) {
    return this.getStack(node).reduce((data, node) => {
      return Object.assign(data, this.getAtts(node), this.getTags(node))
    }, this.getInfo(node))
  }

  getStack (node) {
    const stack = []
    while (node) {
      stack.push(node)
      node = node.parentNode
    }
    return stack.slice(0, -1).reverse()
  }

  getTags (node) {
    const atts = node.attributes
    const prefix = this.config.tagPrefix
    return Object.keys(atts).filter((key) => {
      return atts[key].name.substr(0, prefix.length) === prefix
    }).reduce((obj, key) => {
      obj[atts[key].name.substr(prefix.length)] = atts[key].value
      return obj
    }, {})
  }

  getInfo (node) {
    const info = {}
    if (node.src) {
      info.image = node.src
    }
    if (this.isInput(node)) {
      info.value = node.value
    }
    return info
  }

  getAtts (node) {
    const atts = {}
    if (node.href) {
      atts.href = node.getAttribute('href')
    }
    return atts
  }

  isInput (node) {
    return ~['INPUT', 'TEXTAREA', 'SELECT'].indexOf(node.nodeName)
  }

  get defaults () {
    return {
      tagPrefix: 'data-tag_'
    }
  }
}
