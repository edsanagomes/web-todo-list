import './style.css'

const input = document.getElementById('todo-input') as HTMLInputElement
const button = document.getElementById('add-todo-button') as HTMLButtonElement
const list = document.getElementById('todo-elements') as HTMLUListElement
const errorMessage = document.getElementById('error-message') as HTMLDivElement
const savedTodos = localStorage.getItem('todos')
const todos: string[] = savedTodos ? JSON.parse(savedTodos) : []

function renderTodos() {
  // display all todos in the list
  list.innerHTML = ''
  todos.forEach((text) => {
    const item = document.createElement('li')
    item.textContent = text
    list.appendChild(item)
  })
}
renderTodos()

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function addTodo() {
  const text = input.value.trim()
  if (text === '') {
    errorMessage.textContent = 'Please add a task !'
    return
  }
  errorMessage.textContent = ''
  todos.push(text)
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
