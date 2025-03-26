import { payments } from './payments.js'
import { categoryRussian } from './categories.js'
import {
  $,
  createDiv,
  createTable,
  createTableCell,
  createTableHeadCell,
  createTableRow,
  formatDate,
  PaymentsStatistic,
} from './lib.js'

document.addEventListener('DOMContentLoaded', () => {
  const root = $('#root')
  const container = createDiv('container')
  root.append(container)
  const statistic = new PaymentsStatistic()

  /**
   * Add head to a table
   * @param {HTMLTableElement} table
   * @param {string} tableClassName
   */
  function addTableHead(table, tableClassName) {
    const row = createTableRow(`${tableClassName}__tr`)
    ;['Наименование', 'Стоимость', 'Категория'].forEach((text) => {
      const cell = createTableHeadCell(`${tableClassName}__th`)
      cell.innerText = text
      row.append(cell)
    })
    table.append(row)
  }

  /**
   * Add payment item to a table
   * @param {HTMLTableElement} table
   * @param {{name: string, category: number, value: number}} payment
   */
  function addPayment(table, payment) {
    const row = createTableRow()
    const nameCell = createTableCell()
    const valueCell = createTableCell()
    const categoryCell = createTableCell()

    nameCell.innerText = payment.name
    valueCell.innerText = payment.value
    categoryCell.innerText = categoryRussian[payment.category]
    row.append(nameCell, valueCell, categoryCell)
    table.append(row)
  }

  /**
   * @param {HTMLElement} targ
   * @param {PaymentsStatistic} statistic
   */
  function addStatistic(targ, statistic) {
    const statTable = createTable()
    let dayTotal = 0

    statistic.entries().forEach(([category, value]) => {
      dayTotal += value

      const categoryItem = createTableRow()
      const categoryName = createTableCell()
      const categoryValue = createTableCell()
      categoryName.innerText = categoryRussian[category]
      categoryValue.innerText = value
      categoryItem.append(categoryName, categoryValue)
      statTable.append(categoryItem)
    })

    const totalRow = createTableRow()
    const totalNameCell = createTableCell()
    const totalValueCell = createTableCell()
    totalNameCell.innerText = 'Итого'
    totalValueCell.innerText = dayTotal
    totalRow.append(totalNameCell, totalValueCell)
    statTable.append(totalRow)
    targ.append(statTable)
  }

  for (let [date, list] of Object.entries(payments)) {
    const dayRoot = createDiv('day')
    const dateTitleDiv = createDiv('day__header')
    dateTitleDiv.innerText = formatDate(date)
    dayRoot.append(dateTitleDiv)

    const dayContent = createDiv('day__content')
    const dayTableClassName = 'dayTable'
    const dayPaymentsTable = createTable(dayTableClassName)
    addTableHead(dayPaymentsTable, dayTableClassName)

    const dayStatistic = new PaymentsStatistic()

    for (let payment of list) {
      addPayment(dayPaymentsTable, payment)
      dayStatistic.add(payment.category, payment.value)
      statistic.add(payment.category, payment.value)
    }

    dayContent.append(dayPaymentsTable)

    const statisticsContainer = createDiv('day__statistics')

    addStatistic(statisticsContainer, dayStatistic)
    dayRoot.append(dayContent, statisticsContainer)
    container.append(dayRoot)
  }
})
