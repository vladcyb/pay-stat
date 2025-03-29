import { createDiv } from '../lib.js'

export class GuideView {
  #className
  constructor(className) {
    this.#className = className
  }

  render() {
    const container = createDiv(this.#className)
    container.innerHTML = `
    <h1>Анализ расходов</h1>
    <h2>Формат входного файла</h2>
        <p>Файл должен быть в формате JSON со следующей структурой:</p>
        <pre class="format-example">
{
  <span class="code-key">"title"</span>: <span class="code-string">"Название отчета"</span>,
  <span class="code-key">"payments"</span>: {
    <span class="code-key">"20240329"</span>: [
      {
        <span class="code-key">"category"</span>: <span class="code-number">1</span>,
        <span class="code-key">"value"</span>: <span class="code-number">100</span>,
        <span class="code-key">"name"</span>: <span class="code-string">"помидоры"</span>
      },
      {
        <span class="code-key">"category"</span>: <span class="code-number">2</span>,
        <span class="code-key">"value"</span>: <span class="code-number">400</span>,
        <span class="code-key">"name"</span>: <span class="code-string">"бургер"</span>
      }
    ],
    <span class="code-key">"20240328"</span>: [
      {
        <span class="code-key">"category"</span>: <span class="code-number">7</span>,
        <span class="code-key">"value"</span>: <span class="code-number">500</span>,
        <span class="code-key">"name"</span>: <span class="code-string">"Такси"</span>
      }
    ]
  }
}</pre>
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
