import { $, createDiv, validatePaymentsFile } from './lib.js'
import { DayView } from './models/DayView.js'
import { TotalStatisticsView } from './models/TotalStatisticsView.js'
import { PaymentsStatistics } from './models/PaymentsStatistics.js'

// Store all payments data
let allPayments = {}

function handleFileDrop(event) {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      allPayments = JSON.parse(e.target.result)
      validatePaymentsFile(allPayments)
      renderPayments(allPayments)
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

function renderPayments(payments) {
  const root = $('#root')
  // Keep the drop zone
  const dropZone = $('#drop-zone')
  root.innerHTML = ''
  root.append(dropZone)

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
  const totalStatisticsView = new TotalStatisticsView(totalStatistic)
  container.append(totalStatisticsView.render())

  // Display daily statistics
  Object.entries(payments)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
    .forEach(([date, dayPayments]) => {
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
})
