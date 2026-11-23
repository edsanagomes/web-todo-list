import { Url } from './dom'
import type { todo } from './types'

export async function getTodos(): Promise<todo[]> {
  const response = await fetch(`${Url}/todos`)
  if (!response.ok) {
    throw new Error('Unable to retrieve tasks !')
  }
  return response.json()
}

export async function createTodos(newTodo: todo): Promise<todo> {
  const response = await fetch(`${Url}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  })
  if (!response.ok) {
    throw new Error('Unable to create task !')
  }
  return response.json()
}

export async function updateTodos(todoItem: todo): Promise<void> {
  const response = await fetch(`${Url}/todos/${todoItem.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: todoItem.completed }),
  })
  if (!response.ok) {
    throw new Error('Unable to update task !')
  }
}

export async function deleteTodos(id: number): Promise<void> {
  const response = await fetch(`${Url}/todos/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Unable to delete task !')
  }
}
