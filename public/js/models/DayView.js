import { createDiv, formatDate } from '../lib.js'
import { PaymentTable } from './PaymentTable.js'
import { StatisticsTable } from './StatisticsTable.js'

export class DayView {
  #date
  #payments
  #statistics

  constructor(date, payments, statistics) {
    this.#date = date
    this.#payments = payments
    this.#statistics = [...statistics].toSorted((a, b) => b[1] - a[1])
  }

  render() {
    const dayRoot = createDiv('day')
    const dateTitleDiv = createDiv('day__header')
    dateTitleDiv.innerText = formatDate(this.#date)
    dayRoot.append(dateTitleDiv)

    const dayContent = createDiv('day__content')
    const paymentsTable = new PaymentTable(this.#payments, 'dayTable')
    dayContent.append(paymentsTable.render())
    dayRoot.append(dayContent)

    const statisticsContainer = createDiv('day__statistics')
    const statisticsTable = new StatisticsTable('dayStatisticsTable')

    const dayTotal = this.#statistics.reduce((acc, curr) => acc + curr[1], 0)
    this.#statistics.forEach(([category, value]) => {
      statisticsTable.addCategory(
        category,
        value,
        Math.floor((100 * value) / dayTotal) + '%'
      )
    })
    statisticsTable.addTotal(dayTotal)

    statisticsContainer.append(statisticsTable.render())
    dayRoot.append(statisticsContainer)

    return dayRoot
  }
}
