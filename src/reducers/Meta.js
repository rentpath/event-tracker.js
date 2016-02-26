export default class MetaReducer {
  constructor(config) {
    this.config = Object.assign(this.defaults, config)
  }

  reduce(data = {}) {
    return Object.assign(data, this.data)
  }

  getData() {
    const meta = document.querySelectorAll(`meta${this.config.filter || ''}`)
    const tags = Array.prototype.slice.call(meta)

    return tags.reduce((data, tag) => {
      if (tag.name) Object.assign(data, { [tag.name]: tag.content })
      return data
    }, {})
  }

  get data() {
    return this._data || (this._data = this.getData())
  }

  get defaults() {
    return {
      filter: null
    }
  }
}
