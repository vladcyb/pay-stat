import { categoryRussian } from './categories.js'

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

export function validatePaymentsFile(fileContent) {
  if (typeof fileContent.title !== 'string') {
    throw new Error(`Поле title должно быть типа 'string'.`)
  }

  if (typeof fileContent.payments !== 'object') {
    throw new Error(`Поле 'payments' должно быть типа 'object'.`)
  }

  const { payments } = fileContent

  Object.entries(payments).forEach(([date, dayPayments]) => {
    if (date.length !== 8) {
      throw new Error(`Дата (${date}) некорректна.`)
    }

    if (!dayPayments || !Array.isArray(dayPayments)) {
      throw new Error(`Данные за ${date} не являются массивом.`)
    }

    dayPayments.forEach((payment, index) => {
      if (typeof payment !== 'object' || !payment || Array.isArray(payment)) {
        throw new Error(
          `Платеж за ${date} не является объектом. Индекс ${index}.`
        )
      }

      const paymentFieldTypes = {
        name: 'string',
        category: 'number',
        value: 'number',
      }

      Object.entries(paymentFieldTypes).forEach(([fieldName, fieldType]) => {
        if (typeof payment[fieldName] !== fieldType) {
          throw new Error(
            `Поле ${fieldName} должно быть ${fieldType}, а не ${typeof payment[fieldName]}.\nДата: ${date}. Индекс: ${index}.`
          )
        }
      })

      if (!Object.keys(categoryRussian).includes(String(payment.category))) {
        throw new Error(
          `Платеж за ${date} содержит недопустимое поле category (${payment.category}). Индекс ${index}.`
        )
      }
    })
  })
}
