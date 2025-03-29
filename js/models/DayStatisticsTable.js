import { categoryRussian } from '../categories.js'
import { createTable, createTableCell, createTableRow } from '../lib.js'

export class DayStatisticsTable {
  #table

  constructor() {
    this.#table = createTable()
  }

  render() {
    return this.#table
  }

  addCategory(category, value) {
    const row = createTableRow()
    const nameCell = createTableCell()
    const valueCell = createTableCell()
    nameCell.innerText = categoryRussian[category]
    valueCell.innerText = value
    row.append(nameCell, valueCell)
    this.#table.append(row)
  }

  addTotal(total) {
    const row = createTableRow('day__selected-row')
    const nameCell = createTableCell()
    const valueCell = createTableCell()
    nameCell.innerText = 'Итого'
    valueCell.innerText = total
    row.append(nameCell, valueCell)
    this.#table.append(row)
  }
}
