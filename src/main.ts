import './style.css'

const input = document.getElementById('todo-input') as HTMLInputElement
const button = document.getElementById('add-todo-button') as HTMLButtonElement
const list = document.getElementById('todo-elements') as HTMLUListElement
const errorMessage = document.getElementById('error-message') as HTMLDivElement
const deleteAllBtn = document.getElementById('delete-all') as HTMLButtonElement
const dateInput = document.getElementById('todo-date-input') as HTMLInputElement
const today = new Date().toLocaleDateString('en-CA')
const savedTodos = localStorage.getItem('todos')
const todos: todo[] = savedTodos ? JSON.parse(savedTodos) : []

type todo = {
  text: string
  completed: boolean
  date?: string
}

function renderTodos() {
  // display all todos in the list
  list.innerHTML = ''
  todos.forEach((todo, index) => {
    const item = document.createElement('li')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked
      saveTodos()
    })

    const span = document.createElement('span')
    span.textContent = todo.text
    const dateParagraph = document.createElement('p')
    if (todo.date) {
      const timeElement = document.createElement('time')
      timeElement.dateTime = todo.date
      timeElement.textContent = todo.date
      dateParagraph.appendChild(timeElement)
    } else {
      dateParagraph.textContent = 'no due date'
    }

    const removeBtn = document.createElement('button')
    const icon = document.createElement('img')
    icon.src = 'src/delete_icon.svg'
    removeBtn.classList.add('remove-btn')
    removeBtn.addEventListener('click', () => {
      todos.splice(index, 1)
      saveTodos()
      renderTodos()
    })
    item.appendChild(checkbox)
    item.appendChild(span)
    item.appendChild(dateParagraph)
    item.appendChild(removeBtn)
    removeBtn.appendChild(icon)
    list.appendChild(item)
  })
}
renderTodos()

function saveTodos() {
  try {
    localStorage.setItem('todos', JSON.stringify(todos))
  } catch {
    errorMessage.textContent = 'storage is full or blocked'
  }
}

function addTodo() {
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
