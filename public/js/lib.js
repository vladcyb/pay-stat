export function $(selector) {
  return document.querySelector(selector)
}

export function createElement(tagName, className) {
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

export function validatePaymentsFile(paymentsTextData) {
  if (typeof paymentsTextData.title !== 'string') {
    throw new Error(`Поле title должно быть типа 'string'.`)
  }

  if (typeof paymentsTextData.payments !== 'object') {
    throw new Error(`Поле 'payments' должно быть типа 'object'.`)
  }

  const paymentFieldTypes = {
    name: 'string',
    category: 'number',
    value: 'number',
  }

  const { payments } = paymentsTextData

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

      Object.entries(paymentFieldTypes).forEach(([fieldName, fieldType]) => {
        if (typeof payment[fieldName] !== fieldType) {
          throw new Error(
            `Поле ${fieldName} должно быть ${fieldType}, а не ${typeof payment[fieldName]}.\nДата: ${date}. Индекс: ${index}.`
          )
        }
      })
    })
  })
}
