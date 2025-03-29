import { $, createDiv, createElement, validatePaymentsFile } from './lib.js'
import { DayView } from './models/DayView.js'
import { TotalStatisticsView } from './models/TotalStatisticsView.js'
import { PaymentsStatistics } from './models/PaymentsStatistics.js'

// Store all payments data
let fileContent = null

function handleFileDrop(event) {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      fileContent = JSON.parse(e.target.result)
      validatePaymentsFile(fileContent)
      renderPayments(fileContent)

      // Encode data and update URL
      const encodedData = encodeURIComponent(JSON.stringify(fileContent))
      const newUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`
      window.history.pushState({}, '', newUrl)
    } catch (error) {
      alert(
        error.message ||
          'Ошибка при чтении файла. Убедитесь, что файл содержит корректный JSON.'
      )
    }
  }
  reader.readAsText(file)
}

function handleDragOver(event) {
  event.preventDefault()
}

function handleDragLeave(event) {
  event.preventDefault()
}

function renderPayments(fileContent) {
  const root = $('#root')
  // Keep the drop zone
  const dropZone = $('#drop-zone')
  root.innerHTML = ''
  root.append(dropZone)

  const { payments, title } = fileContent

  const container = createDiv('container')
  root.append(container)

  // Hide the initial message if we have payments
  const initialMessage = $('#initial-message')
  if (initialMessage) {
    initialMessage.style.display =
      Object.keys(payments).length > 0 ? 'none' : 'block'
  }

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
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add drag and drop handlers to the entire document
  document.addEventListener('dragover', handleDragOver)
  document.addEventListener('dragleave', handleDragLeave)
  document.addEventListener('drop', handleFileDrop)

  // Check for data in URL on page load
  const urlParams = new URLSearchParams(window.location.search)
  const data = urlParams.get('data')
  if (data) {
    try {
      const decodedData = JSON.parse(decodeURIComponent(data))
      validatePaymentsFile(decodedData)
      renderPayments(decodedData)
    } catch (error) {
      document
        .getElementById('initialMessage')
        .classList.remove('initialMessage_hidden')
      console.error('Error parsing URL data:', error)
    }
  } else {
    document
      .getElementById('initialMessage')
      .classList.remove('initialMessage_hidden')
  }
})
