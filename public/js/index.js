import { categoryRussian } from './categories.js'
import { $ } from './lib.js'
import { DataLoader } from './models/DataLoader.js'

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Fill categories guide
  $('.categories-format-example').innerHTML = Object.entries(categoryRussian)
    .map(([key, value]) => {
      return `<div class="categories-format-example__line">${key} - ${value}</div>`
    })
    .join('')

  // Initialize data loader
  new DataLoader()
})
