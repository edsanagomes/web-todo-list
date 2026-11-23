import './style.css'
import { getTodos } from './api.ts'
import { elements } from './dom'
import { addTodo, saveTodos } from './todos'
import type { todo } from './types.ts'

const { input, button, list, deleteAllBtn, overdueMessage } = elements
const todos: todo[] = await getTodos()
const requiredDomErreur =
  'Fatal Error: A required DOM element could not be found.'

if (!input || !button || !deleteAllBtn) {
  // ! - if elements doesn't exist
  throw new Error(requiredDomErreur)
}

function renderTodos() {
  // display all todos in the list
  if (!list) {
    throw new Error('requiredDomErreur')
  }

  list.innerHTML = ''
  todos.forEach((todo, index) => {
    const item = document.createElement('li')
    if (todo.due_date) {
      item.classList.add(getUrgencyColor(todo.due_date))
    }
    const checkbox = createCheckbox(todo)
    const span = createSpan(todo.title)
    const dateParagraph = createDateElement(todo.due_date)
    const removeBtn = createRemoveButton(index)

    item.appendChild(checkbox)
    item.appendChild(span)
    item.appendChild(dateParagraph)
    item.appendChild(removeBtn)
    list.appendChild(item)
  })
  checkOverdueAlert()
}

function createCheckbox(todo: todo): HTMLInputElement {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = todo.done
  checkbox.addEventListener('change', () => {
    todo.done = checkbox.checked
    saveTodos(todos)
  })
  return checkbox
}

function checkOverdueAlert() {
  if (!overdueMessage) return
  const hasOverdue = todos.some((todo) => {
    if (!todo.due_date) return false
    return getUrgencyColor(todo.due_date) === 'urgent-overdue'
  })
  if (hasOverdue) {
    overdueMessage.style.display = 'block'
  } else {
    overdueMessage.style.display = 'none'
  }
}

function createDateElement(date?: string): HTMLParagraphElement {
  const dateParagraph = document.createElement('p')
  if (date) {
    const timeElement = document.createElement('time')
    timeElement.dateTime = date
    timeElement.textContent = date
    dateParagraph.appendChild(timeElement)
  } else {
    dateParagraph.textContent = 'no due date'
  }
  return dateParagraph
}

function createRemoveButton(index: number): HTMLButtonElement {
  const removeBtn = document.createElement('button')
  const icon = document.createElement('img')
  removeBtn.appendChild(icon)
  icon.src = 'src/delete_icon.svg'
  removeBtn.classList.add('remove-btn')
  removeBtn.addEventListener('click', () => {
    todos.splice(index, 1)
    saveTodos(todos)
    renderTodos()
  })
  return removeBtn
}

function createSpan(text: string): HTMLSpanElement {
  const span = document.createElement('span')
  span.textContent = text
  return span
}

function getUrgencyColor(dateString: string): string {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const due = new Date(`${dateString}T00:00:00`)
  const daysLeft = Math.round(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  )
  if (daysLeft < 0) return 'urgent-overdue'
  if (daysLeft === 0) return 'urgent-today'
  if (daysLeft <= 4) return 'urgent-soon'
  return 'urgent-later'
}

function deleteAll() {
  todos.length = 0
  localStorage.removeItem('todos')
  renderTodos()
}
button.addEventListener('click', () => {
  addTodo(todos, renderTodos)
})
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo(todos, renderTodos)
  }
})

deleteAllBtn.addEventListener('click', deleteAll)
renderTodos()
console.log('Hello from typescript')
