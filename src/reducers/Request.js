export default class RequestReducer {
  reduce(data = {}) {
    return Object.assign(data, this.data)
  }

  get data() {
    const data = this._data || (this._data = this.getData())
    return data
  }

  getData() {
    const req = window.location
    return {
      url: req.href,
      path: req.pathname,
      hash: req.hash.substr(1),
      domain: req.hostname,
      query_string: req.search.substr(1),
    }
  }
}
