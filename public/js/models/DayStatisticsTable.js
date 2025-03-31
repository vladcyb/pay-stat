import { categoryRussian } from '../categories.js'
import { createTable, createTableCell, createTableRow } from '../lib.js'

export class DayStatisticsTable {
  #table
  #className
  constructor() {
    this.#className = 'mainStatisticsTable'
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

  addCategory(category, value) {
    const row = this.createTR()
    const nameCell = this.createTD()
    const valueCell = this.createTD()
    nameCell.innerText = categoryRussian[category]
    valueCell.innerText = value
    row.append(nameCell, valueCell)
    this.#table.append(row)
  }

  addTotal(total) {
    const row = this.createTR('day__selected-row')
    const nameCell = this.createTD()
    const valueCell = this.createTD()
    nameCell.innerText = 'Итого'
    valueCell.innerText = total
    row.append(nameCell, valueCell)
    this.#table.append(row)
  }
}
