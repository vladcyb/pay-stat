import { $, createDiv, createElement, getPercent } from '../lib.js'
import { StatisticsTable } from './StatisticsTable.js'
import { Chart } from 'chart.js/auto'
import { categoryRussian } from '../categories'
import { doughnutColors } from '../constants/doughnutColors'

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
    const closeBtn = createElement('button', 'totalStatistics__close')
    closeBtn.innerHTML = `<svg class="totalStatistics__close-img" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 35.75C8.19695 35.75 0.25 27.8031 0.25 18C0.25 8.19695 8.19695 0.25 18 0.25C27.8031 0.25 35.75 8.19695 35.75 18C35.75 27.8031 27.8031 35.75 18 35.75Z"  stroke="#CDCDCD" stroke-width="0.5"/>
<path d="M26 9.36753L9 26M9 9L26 25.6325" stroke="black"/>
</svg>
`
    container.append(closeBtn)
    closeBtn.addEventListener('click', () => {
      document
        .querySelector('#statisticsContainer')
        .childNodes.forEach((child) => {
          child.remove()
        })
      $('#initialContent').classList.remove('d-none')
      if (location.search) {
        location.search = ''
      }
    })
    const statisticsTable = new StatisticsTable()

    const allTimeCash = this.#statistics.reduce((acc, item) => {
      return acc + item[1]
    }, 0)

    this.#statistics.forEach(([category, value]) => {
      statisticsTable.addCategory(
        category,
        value,
        getPercent(value, allTimeCash)
      )
    })

    statisticsTable.addTotal(allTimeCash)
    const doughnutContainer = createDiv('totalExpensesPieContainer')
    const doughnut = createElement('canvas', 'totalExpensesPie')
    doughnut.width = 800
    doughnut.height = 800
    doughnutContainer.append(doughnut)
    container.append(doughnutContainer)
    container.append(statisticsTable.render())

    new Chart(doughnut, {
      type: 'bar',
      data: {
        labels: this.#statistics.map(([category]) => categoryRussian[category]),
        datasets: [
          {
            data: this.#statistics.map(([, value]) => value),
            backgroundColor: doughnutColors.map((item) => item),
            hoverOffset: 4,
          },
        ],
      },
    })

    return container
  }
}
