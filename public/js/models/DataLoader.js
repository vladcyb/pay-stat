import { $, createDiv, createElement, validatePaymentsFile } from '../lib.js'
import { DayView } from './DayView.js'
import { TotalStatisticsView } from './TotalStatisticsView.js'
import { PaymentsStatistics } from './PaymentsStatistics.js'

export class DataLoader {
  constructor() {
    this.handleFileContent = this.handleFileContent.bind(this)
    this.handleFileDrop = this.handleFileDrop.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
    this.handleJsonSubmit = this.handleJsonSubmit.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)

    // Add drag and drop handlers to the entire document
    document.addEventListener('dragover', this.handleDragOver)
    document.addEventListener('dragleave', this.handleDragLeave)
    document.addEventListener('drop', this.handleFileDrop)

    // Add file input handler
    const fileInput = $('#file-input')
    fileInput.addEventListener('change', this.handleFileInput)

    const source = new URLSearchParams(location.search).get('source')
    if (source) {
      this.handleSource(source)
    } else {
      this.showInitialContent()
    }
  }

  async handleSource(source) {
    const request = await fetch(source)
    const text = await request.text()
    if (request.status === 200) {
      this.handleFileContent(text)
    } else {
      alert('Недействительная ссылка')
      this.showInitialContent()
    }
  }

  showInitialContent() {
    $('.initialContent').classList.remove('d-none')
  }

  hideInitialContent() {
    $('.initialContent').classList.add('d-none')
  }


  handleFileContent(content) {
    try {
      const fileContent = JSON.parse(content)
      validatePaymentsFile(fileContent)
      const initialContent = $('#initialContent')
      if (initialContent) {
        this.hideInitialContent()
      }
      this.renderPayments(fileContent)
    } catch (error) {
      this.showInitialContent()
      alert(
        error.message ||
          'Ошибка при чтении данных. Убедитесь, что данные содержат корректный JSON.'
      )
    }
  }

  handleFileDrop(event) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => this.handleFileContent(e.target.result)
    reader.readAsText(file)
  }

  handleFileInput(event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => this.handleFileContent(e.target.result)
    reader.readAsText(file)
  }

  handleJsonSubmit() {
    const jsonInput = $('#json-input')
    const content = jsonInput.value.trim()
    if (content) {
      this.handleFileContent(content)
    }
  }

  handleDragOver(event) {
    event.preventDefault()
  }

  handleDragLeave(event) {
    event.preventDefault()
  }

  renderPayments(fileContent) {
    const statisticsContainer = $('#statisticsContainer')
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

    // Clear statistics container and append new content
    statisticsContainer.innerHTML = ''
    statisticsContainer.append(container)
  }
}
