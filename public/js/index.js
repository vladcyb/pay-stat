import { $, createDiv, createElement, validatePaymentsFile } from './lib.js'
import { DayView } from './models/DayView.js'
import { TotalStatisticsView } from './models/TotalStatisticsView.js'
import { PaymentsStatistics } from './models/PaymentsStatistics.js'
import { GuideView } from './models/GuideView.js'

// Store all payments data
let fileContent = null

function handleFileContent(content) {
  try {
    fileContent = JSON.parse(content)
    validatePaymentsFile(fileContent)
    renderPayments(fileContent)
  } catch (error) {
    alert(
      error.message ||
        'Ошибка при чтении данных. Убедитесь, что данные содержат корректный JSON.'
    )
  }
}

function handleFileDrop(event) {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => handleFileContent(e.target.result)
  reader.readAsText(file)
}

function handleFileInput(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => handleFileContent(e.target.result)
  reader.readAsText(file)
}

function handleJsonSubmit() {
  const jsonInput = $('#json-input')
  const content = jsonInput.value.trim()
  if (content) {
    handleFileContent(content)
  }
}

function handleDragOver(event) {
  event.preventDefault()
}

function handleDragLeave(event) {
  event.preventDefault()
}

function renderPayments(fileContent) {
  const statisticsContainer = $('#statistics-container')
  const { payments, title } = fileContent

  // Create container for statistics
  const container = createDiv('container')

  const totalStatistic = new PaymentsStatistics(payments)

  // Display total statistics at the top
  const totalStatisticsView = new TotalStatisticsView(title, totalStatistic)
  container.append(totalStatisticsView.render())

  const dailyStatisticsTitle = createElement('h2', 'dailyStatisticsTitle')
  dailyStatisticsTitle.innerText = 'Статистика по дням'
  container.append(dailyStatisticsTitle)

  // Display daily statistics
  Object.entries(payments).forEach(([date, dayPayments]) => {
    const dayStatistics = new PaymentsStatistics(dayPayments)

    const dayView = new DayView(date, dayPayments, dayStatistics)
    container.append(dayView.render())
  })

  // Hide the initial message if we have payments
  const initialMessage = $('#initialMessage')
  if (initialMessage) {
    initialMessage.classList.add('initialMessage_hidden')
  }

  // Clear statistics container and append new content
  statisticsContainer.innerHTML = ''
  statisticsContainer.append(container)
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add drag and drop handlers to the entire document
  document.addEventListener('dragover', handleDragOver)
  document.addEventListener('dragleave', handleDragLeave)
  document.addEventListener('drop', handleFileDrop)

  document.querySelector('#format-guide').append(new GuideView().render())

  // Add file input handler
  const fileInput = $('#file-input')
  fileInput.addEventListener('change', handleFileInput)

  // Add JSON submit handler
  const submitButton = $('#submit-json')
  submitButton.addEventListener('click', handleJsonSubmit)

  document
    .getElementById('initialMessage')
    .classList.remove('initialMessage_hidden')
})
