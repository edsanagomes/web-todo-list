import { elements } from './dom'

const { dateInput, errorMessage, input, today } = elements

import type { todo } from './types'

export function addTodo(todos: todo[], renderTodos: Function) {
  if (!dateInput || !errorMessage || !input) {
    throw new Error('requiredDomErreur')
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
  saveTodos(todos)
  renderTodos()
  input.value = ''
  dateInput.value = ''
}

export function saveTodos(todos: todo[]) {
  if (!errorMessage) {
    throw new Error('requiredDomErreur')
  }
  try {
    localStorage.setItem('todos', JSON.stringify(todos))
  } catch {
    errorMessage.textContent = 'storage is full or blocked'
  }
}
