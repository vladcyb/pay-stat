import { categoryRussian } from '../categories.js'
import { createElement } from '../lib.js'

export class CategoryMappingView {
  render() {
    const container = createElement('div', 'guide')

    const title = createElement('h2')
    title.innerText = 'Категории расходов'
    container.append(title)

    const description = createElement('p')
    description.innerText =
      'Каждая категория расходов имеет свой уникальный код:'
    container.append(description)

    const example = createElement('pre', 'format-example')
    example.innerText = Object.entries(categoryRussian)
      .map(([code, name]) => `${code} - ${name}`)
      .join('\n')
    container.append(example)

    const notes = createElement('div', 'format-notes')
    const notesTitle = createElement('h3')
    notesTitle.innerText = 'Правила:'
    notes.append(notesTitle)

    const notesList = createElement('ul')
    notesList.innerHTML = `
      <li>В файле с данными используется только код категории</li>
      <li>Название категории используется только для отображения</li>
    `
    notes.append(notesList)

    container.append(notes)
    return container
  }
}
