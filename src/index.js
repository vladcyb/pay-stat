import {payments} from './payments.js'
import {categoryRussian} from './categories.js'
import {$, createDiv, createTable, createTableCell, createTableRow, DayMap} from './lib.js'


document.addEventListener('DOMContentLoaded', () => {


  const root = $('#root')

  /**
   * Add head to a table
   * @param {HTMLTableElement} table
   */
  function addTableHead(table) {
    const row = createTableRow()
    ;['Наименование', 'Стоимость', 'Категория'].forEach(text => {
      const cell = createTableCell(true)
      cell.innerText = text
      row.append(cell)
    })
    table.append(row)
  }

  /**
   * Add payment item to a table
   * @param {HTMLTableElement} table
   * @param {{date: string, name: string, category: number, value: number}} payment
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

  function addDayStatistics(appendTarget, dayMap) {
    const statisticsContainer = createDiv()
    const statTable = createTable()
    statisticsContainer.className = 'day__statistics'
    let dayTotal = 0

    dayMap.entries().forEach(([category, value]) => {
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

    statisticsContainer.append(statTable)
    appendTarget.append(statisticsContainer)
  }


  for (let [date, list] of Object.entries(payments)) {
    const dayRoot = createDiv()
    const dateTitleDiv = createDiv()
    dateTitleDiv.innerText = date
    dateTitleDiv.className = 'day__header'
    dayRoot.append(dateTitleDiv)
    dayRoot.className = 'day'

    const dayContent = createDiv()
    dayContent.className = 'day__content'
    const dayPaymentsTable = createTable()
    addTableHead(dayPaymentsTable)

    const dayMap = new DayMap()

    for (let payment of list) {
      addPayment(dayPaymentsTable, payment)
      dayMap.add(payment.category, payment.value)
    }
    dayContent.append(dayPaymentsTable)
    dayRoot.append(dayContent)
    addDayStatistics(dayContent, dayMap)
    root.append(dayRoot)
  }
})