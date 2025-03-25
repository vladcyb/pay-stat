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

export class PaymentsStatistic extends Map {
  constructor() {
    super()
  }

  add(key, value) {
    if (this.has(key)) {
      this.set(key, this.get(key) + value)
    } else {
      this.set(key, value)
    }
  }
}
