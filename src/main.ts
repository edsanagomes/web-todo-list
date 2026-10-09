import './style.css'

const input = document.getElementById('todo-input') as HTMLInputElement
const button = document.getElementById('add-todo-button') as HTMLButtonElement
const list = document.getElementById('todo-elements') as HTMLUListElement
const errorMessage = document.getElementById('error-message') as HTMLDivElement
function addTodo() {
  const text = input.value
  if (text === '') {
    errorMessage.textContent = 'Please add a task !'
    return
  }
  errorMessage.textContent = ''
  const item = document.createElement('li')
  item.textContent = text
  list.appendChild(item)
  input.value = ''
}
button.addEventListener('click', addTodo)
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo()
  }
})
console.log('Hello from typescript')
