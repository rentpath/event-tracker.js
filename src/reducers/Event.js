export default class EventReducer {
  reduce(data = {}) {
    if (!data.event || !data.event.pageX || !data.event.pageY) {
      return data
    }
    return Object.assign(data, {
      x_coordinate: data.event.pageX,
      y_coordinate: data.event.pageY
    })
  }
}
