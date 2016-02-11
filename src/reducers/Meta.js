export default class MetaReducer {
  reduce(data = {}) {
    return Object.assign(data, this.data)
  }

  getData() {
    const tags = Array.from(document.getElementsByTagName('meta'))
    return tags.reduce((data, tag) => {
      if (tag.name) {
        Object.assign(data, { [tag.name]: tag.content })
      }
      return data
    }, {})
  }

  get data() {
    return this._data || (this._data = this.getData())
  }
}
