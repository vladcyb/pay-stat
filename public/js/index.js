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
})
