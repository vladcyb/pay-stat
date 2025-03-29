import { createDiv } from '../lib.js'

export class GuideView {
  render() {
    const container = createDiv()
    container.innerHTML = `
    <h2>Формат файла</h2>
        <p>Файл должен быть в формате JSON со следующей структурой:</p>
        <pre class="format-example">${JSON.stringify(
          {
            title: 'Название отчета',
            payments: {
              20240329: [
                {
                  category: 1,
                  value: 100,
                  name: 'помидоры',
                },
                {
                  category: 2,
                  value: 400,
                  name: 'бургер',
                },
              ],
              20240328: [
                {
                  category: 7,
                  value: 500,
                  name: 'Такси',
                },
              ],
            },
          },
          null,
          2
        )}
    
        </pre>
        <div class="format-notes">
          <h3>Правила:</h3>
          <ul>
            <li>Даты должны быть в формате ГГГГММДД</li>
            <li>Суммы указываются в любой валюте</li>
            <li>В поле категории указывается номер категории (таблица категорий ниже)</li>
            <li>В один день может быть несколько платежей</li>
            <li>Дни можно писать в любом порядке (они будут отсортированы по дате)</li>
          </ul> 
    `

    return container
  }
}
