import { categoryRussian } from './categories.js'
import { $ } from './lib.js'
import { DataLoader } from './models/DataLoader.js'
import { Chart } from 'chart.js/auto'

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Fill categories guide
  $('.categories-format-example').innerHTML = Object.entries(categoryRussian)
    .map(([key, value]) => {
      return `<div class="categories-format-example__line">${key} - ${value}</div>`
    })
    .join('')

  $('#loadJsonForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const url = $('#jsonUrl').value
    if (url) {
      location.href = `?source=${url}`
    }
  })

  // Initialize data loader
  new DataLoader()
})
