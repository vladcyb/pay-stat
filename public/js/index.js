import { payments } from './payments.js'
import { $, createDiv, PaymentsStatistic } from './lib.js'
import { DayView } from './models/DayView.js'

document.addEventListener('DOMContentLoaded', () => {
  const root = $('#root')
  const container = createDiv('container')
  root.append(container)
  const totalStatistic = new PaymentsStatistic()

  Object.entries(payments).forEach(([date, paymentsList]) => {
    const dayStatistic = new PaymentsStatistic()
    paymentsList.forEach((payment) => {
      dayStatistic.add(payment.category, payment.value)
      totalStatistic.add(payment.category, payment.value)
    })

    const dayView = new DayView(date, paymentsList, dayStatistic)
    container.append(dayView.render())
  })
})
