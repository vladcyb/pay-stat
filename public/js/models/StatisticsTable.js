import { categoryRussian } from '../categories.js'
import { createTable, createTableCell, createTableRow } from '../lib.js'
import { doughnutColors } from '../constants/doughnutColors'

export class StatisticsTable {
  #table
  #className
  constructor(className) {
    this.#className = className ?? 'mainStatisticsTable'
    this.#table = createTable(this.#className)
  }

  render() {
    return this.#table
  }

  createTR(className = '') {
    return createTableRow(`${this.#className}__tr ${className}`)
  }

  createTD() {
    return createTableCell(`${this.#className}__td`)
  }

  addCategory(category, value, percent) {
    const row = this.createTR()
    row.title = percent
    const nameCell = this.createTD()
    const valueCell = this.createTD()
    nameCell.innerHTML = `
      <span class="mainStatisticsTable__td-value">
          ${categoryRussian[category]}
      </span>
`
    valueCell.innerHTML = `

<span class="mainStatisticsTable__td-value">${value}</span>
<span class="mainStatisticsTable__td-percent">${percent}</span>
`
    row.append(nameCell, valueCell)
    this.#table.append(row)
  }

  addTotal(total) {
    const row = this.createTR('selected-row')
    const nameCell = this.createTD()
    const valueCell = this.createTD()
    nameCell.innerText = 'Итого'
    valueCell.innerText = total
    row.append(nameCell, valueCell)
    this.#table.append(row)
  }

  addColors() {
    const rows = document.querySelectorAll(`.${this.#className}__tr`)
    for (let i = 0; i < rows.length - 1; i++) {
      rows[i].style.backgroundColor = doughnutColors[i]
    }
  }
}
