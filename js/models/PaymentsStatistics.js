export class PaymentsStatistics extends Map {
  constructor(payments) {
    super()
    Object.values(payments)
      .flat()
      .forEach((item) => this.add(item.category, item.value))
  }

  add(key, value) {
    if (this.has(key)) {
      this.set(key, this.get(key) + value)
    } else {
      this.set(key, value)
    }
  }
}
