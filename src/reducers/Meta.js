export default class MetaReducer {
  constructor(config) {
    this.config = Object.assign(this.defaults, config)
  }

  reduce(data = {}) {
    return Object.assign(data, this.data)
  }

  getData() {
    const filter = this.config.filter
    const result = document.querySelectorAll(`meta${filter ? filter : ''}`)

    return Array.from(result).reduce((data, tag) => {
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
