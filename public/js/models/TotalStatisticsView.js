import { createDiv } from '../lib.js'
import { DayStatisticsTable } from './DayStatisticsTable.js'

export class TotalStatisticsView {
  #statistics

  constructor(statistics) {
    this.#statistics = [...statistics].toSorted((a, b) => b[1] - a[1])
  }

  render() {
    const container = createDiv('totalStatistics')
    const title = createDiv('totalStatistics__title')
    title.innerText = 'Общая статистика'
    container.append(title)

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
