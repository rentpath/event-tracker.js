export default function configurable(target) {
  Object.assign(target.prototype, {
    configure(...args) {
      this.config = Object.assign({}, ...args)
    }
  })
}
