import {
  createTable,
  createTableCell,
  createTableHeadCell,
  createTableRow,
} from '../lib.js'
import { categoryRussian } from '../categories.js'

export class PaymentTable {
  #table

  constructor(payments, className = '') {
    this.#table = createTable(className)
    this.addHeader()

    payments
      .toSorted((a, b) => b.value - a.value)
      .forEach((payment) => {
        this.addPayment(payment)
      })
  }

  addHeader() {
    const row = createTableRow(`${this.#table.className}__tr`)
    ;['Наименование', 'Стоимость', 'Категория'].forEach((text) => {
      const cell = createTableHeadCell(`${this.#table.className}__th`)
      cell.innerText = text
      row.append(cell)
    })
    this.#table.append(row)
  }

  render() {
    return this.#table
  }

  addPayment(payment) {
    const row = createTableRow()
    const nameCell = createTableCell()
    const valueCell = createTableCell()
    const categoryCell = createTableCell()

    nameCell.innerText = payment.name
    valueCell.innerText = payment.value
    categoryCell.innerText = categoryRussian[payment.category]
    row.append(nameCell, valueCell, categoryCell)
    this.#table.append(row)
  }
}
