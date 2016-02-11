export default class ElementReducer {
  constructor(config) {
    this.config = Object.assign(this.defaults, config)
  }

  reduce(data = {}) {
    const node = data.element || (data.event && data.event.target)
    if (node) {
      Object.assign(data, this.getData(node))
    }
    return data
  }

  getData(element) {
    return this.getStack(element).reduce((data, node) => (
      Object.assign(data, this.getAtts(node), this.getTags(node))
    ), this.getInfo(element))
  }

  getStack(element) {
    const stack = []
    let node = element
    while (node) {
      stack.push(node)
      node = node.parentNode
    }
    return stack.slice(0, -1).reverse()
  }

  getTags(element) {
    const atts = element.attributes
    const prefix = this.config.tagPrefix
    return Object.keys(atts).filter(key => (
      atts[key].name.substr(0, prefix.length) === prefix
    )).reduce((obj, key) => {
      const tags = obj
      tags[atts[key].name.substr(prefix.length)] = atts[key].value
      return tags
    }, {})
  }

  getInfo(element) {
    const info = {}
    if (element.src) {
      info.image = element.src
    }
    if (this.isInput(element)) {
      info.value = element.value
    }
    return info
  }

  getAtts(element) {
    const atts = {}
    if (element.href) {
      atts.href = element.getAttribute('href')
    }
    return atts
  }

  isInput(node) {
    return ~['INPUT', 'TEXTAREA', 'SELECT'].indexOf(node.nodeName)
  }

  get defaults() {
    return {
      tagPrefix: 'data-tag_'
    }
  }
}
