import './style.css'

const input = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const list = document.querySelector<HTMLUListElement>('#todo-elements')
const errorMessage =
  document.querySelector<HTMLParagraphElement>('#error-message')
const deleteAllBtn = document.querySelector<HTMLButtonElement>('#delete-all')
const dateInput = document.querySelector<HTMLInputElement>('#todo-date-input')
const today = new Date().toLocaleDateString('en-CA')
const savedTodos = localStorage.getItem('todos')
const todos: todo[] = savedTodos ? JSON.parse(savedTodos) : []

if (!input || !button || !deleteAllBtn) {
  // ! - if elements doesn't exist
  throw new Error('Fatal Error: A required DOM element could not be found.')
}

type todo = {
  text: string
  completed: boolean
  date?: string
}

function createCheckbox(todo: todo): HTMLInputElement {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = todo.completed
  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked
    saveTodos()
  })
  return checkbox
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
    saveTodos()
    renderTodos()
  })
  return removeBtn
}

function createSpan(text: string): HTMLSpanElement {
  const span = document.createElement('span')
  span.textContent = text
  return span
}

function renderTodos() {
  // display all todos in the list
  if (!list) {
    // ! - if elements doesn't exist
    throw new Error('Fatal Error: A required DOM element could not be found.')
  }

  list.innerHTML = ''
  todos.forEach((todo, index) => {
    const item = document.createElement('li')
    const checkbox = createCheckbox(todo)
    const span = createSpan(todo.text)
    const dateParagraph = createDateElement(todo.date)
    const removeBtn = createRemoveButton(index)

    saveTodos()
    item.appendChild(checkbox)
    item.appendChild(span)
    item.appendChild(dateParagraph)
    item.appendChild(removeBtn)
    list.appendChild(item)
  })
}

function saveTodos() {
  if (!errorMessage) {
    // ! - if elements doesn't exist
    throw new Error('Fatal Error: A required DOM element could not be found.')
  }

  try {
    localStorage.setItem('todos', JSON.stringify(todos))
  } catch {
    errorMessage.textContent = 'storage is full or blocked'
  }
}

function addTodo() {
  if (!dateInput || !errorMessage || !input) {
    // ! - if elements doesn't exist
    throw new Error('Fatal Error: A required DOM element could not be found.')
  }

  const text = input.value.trim()
  if (text === '') {
    errorMessage.textContent = 'Please add a task !'
    return
  }
  if (dateInput.value !== '' && dateInput.value < today) {
    errorMessage.textContent = 'Selected date cannot be in the past !'
    return
  }
  errorMessage.textContent = ''
  todos.push({ text: text, completed: false, date: dateInput.value })
  saveTodos()
  renderTodos()
  input.value = ''
  dateInput.value = ''
}

function deleteAll() {
  todos.length = 0
  localStorage.removeItem('todos')
  renderTodos()
}

button.addEventListener('click', addTodo)
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo()
  }
})

deleteAllBtn.addEventListener('click', deleteAll)

console.log('Hello from typescript')
