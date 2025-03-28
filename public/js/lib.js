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
