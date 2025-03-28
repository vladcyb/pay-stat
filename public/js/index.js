import { payments as allPayments } from './payments.js'
import { $, createDiv } from './lib.js'
import { DayView } from './models/DayView.js'
import { TotalStatisticsView } from './models/TotalStatisticsView.js'
import { PaymentsStatistics } from './models/PaymentsStatistics.js'

document.addEventListener('DOMContentLoaded', () => {
  const root = $('#root')
  const container = createDiv('container')
  root.append(container)
  const totalStatistic = new PaymentsStatistics(allPayments)

  // Display total statistics at the top
  const totalStatisticsView = new TotalStatisticsView(totalStatistic)
  container.append(totalStatisticsView.render())

  // Display daily statistics
  Object.entries(allPayments).forEach(([date, dayPayments]) => {
    const dayStatistics = new PaymentsStatistics(dayPayments)
    const dayView = new DayView(date, dayPayments, dayStatistics)
    container.append(dayView.render())
  })
})
