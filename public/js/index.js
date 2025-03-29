import { GuideView } from './models/GuideView.js'
import { CategoryMappingView } from './models/CategoryMappingView.js'
import { DataLoader } from './models/DataLoader.js'

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add guides
  document.querySelector('#format-guide').append(new GuideView().render())
  document
    .querySelector('#categories-guide')
    .append(new CategoryMappingView().render())

  // Initialize data loader
  new DataLoader()

  // Add file input handler
  // const fileInput = $('#file-input')
  // fileInput.addEventListener('change', handleFileInput)

  // Add JSON submit handler
  // const submitButton = $('#submit-json')
  // submitButton.addEventListener('click', handleJsonSubmit)

  document
    .getElementById('initialMessage')
    .classList.remove('initialMessage_hidden')
})
