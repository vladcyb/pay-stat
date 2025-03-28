export function $(selector) {
  return document.querySelector(selector)
}

function createElement(tagName, className) {
  const el = document.createElement(tagName)

  if (className) {
    el.className = className
  }

  return el
}

export function createTable(className) {
  return createElement('table', className)
}

export function createTableRow(className) {
  return createElement('tr', className)
}

export function createTableCell(className) {
  return createElement('td', className)
}

export function createTableHeadCell(className) {
  return createElement('th', className)
}

export function createDiv(className) {
  return createElement('div', className)
}

export function formatDate(date) {
  return `${date.slice(6)}.${date.slice(4, 6)}.${date.slice(0, 4)}`
}

export function validatePaymentsFile(payments) {
  const fieldTypes = {
    name: 'string',
    category: 'number',
    value: 'number',
  }

  Object.entries(payments).forEach(([date, dayPayments]) => {
    if (!dayPayments || !Array.isArray(dayPayments)) {
      throw new Error(`Данные за ${date} не являются массивом.`)
    }

    dayPayments.forEach((payment, index) => {
      if (typeof payment !== 'object' || !payment || Array.isArray(payment)) {
        throw new Error(
          `Платеж за ${date} не является объектом. Индекс ${index}.`
        )
      }

      Object.entries(fieldTypes).forEach(([fieldName, fieldType]) => {
        if (typeof payment[fieldName] !== fieldType) {
          throw new Error(
            `Поле ${fieldName} должно быть ${fieldType}, а не ${typeof payment[fieldName]}.\nДата: ${date}. Индекс: ${index}.`
          )
        }
      })
    })
  })
}
