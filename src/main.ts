import './style.css'

const input = document.getElementById('todo-input') as HTMLInputElement
const button = document.getElementById('add-todo-button') as HTMLButtonElement
const list = document.getElementById('todo-elements') as HTMLUListElement
const errorMessage = document.getElementById('error-message') as HTMLDivElement
const savedTodos = localStorage.getItem('todos')
const todos: todo[] = savedTodos ? JSON.parse(savedTodos) : []

type todo = {
  text: string
  completed: boolean
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
    const removeBtn = document.createElement('button')
    removeBtn.textContent = '🚮'
    removeBtn.classList.add('remove-btn')
    removeBtn.addEventListener('click', () => {
      todos.splice(index, 1)
      saveTodos()
      renderTodos()
    })
    item.appendChild(checkbox)
    item.appendChild(span)
    item.appendChild(removeBtn)
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
  errorMessage.textContent = ''
  todos.push({ text: text, completed: false })
  saveTodos()
  renderTodos()
  input.value = ''
}

button.addEventListener('click', addTodo)
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo()
  }
})

console.log('Hello from typescript')
