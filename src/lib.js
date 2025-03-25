export function $(selector) {
  return document.querySelector(selector)
}

export function createTable() {
  return document.createElement('table')
}

export function createTableRow() {
  return document.createElement('tr')
}

export function createTableCell(head) {
  return document.createElement(head ? 'th' : 'td')
}

export function createDiv() {
  return document.createElement('div')
}

export class DayMap extends Map {
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
