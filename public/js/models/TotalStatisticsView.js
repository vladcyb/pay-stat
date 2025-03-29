import { createDiv, createElement } from '../lib.js'
import { DayStatisticsTable } from './DayStatisticsTable.js'

export class TotalStatisticsView {
  #statistics
  #title
  constructor(title, statistics) {
    this.#title = title
    this.#statistics = [...statistics].toSorted((a, b) => b[1] - a[1])
  }

  render() {
    const container = createDiv('totalStatistics')
    const h1 = createElement('h1', 'totalStatistics__title')
    h1.innerText = this.#title
    container.append(h1)
    const h2 = createElement('h2', 'totalStatistics__subtitle')
    h2.innerText = 'Общая статистика'
    container.append(h2)

    const statisticsTable = new DayStatisticsTable()

    let total = 0
    this.#statistics.forEach(([category, value]) => {
      total += value
      statisticsTable.addCategory(category, value)
    })
    statisticsTable.addTotal(total)

    container.append(statisticsTable.render())
    return container
  }
}
