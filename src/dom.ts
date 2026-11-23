export const elements = {
  input: document.querySelector<HTMLInputElement>('#todo-input'),
  button: document.querySelector<HTMLButtonElement>('#add-todo-button'),
  list: document.querySelector<HTMLUListElement>('#todo-elements'),
  errorMessage: document.querySelector<HTMLParagraphElement>('#error-message'),
  deleteAllBtn: document.querySelector<HTMLButtonElement>('#delete-all'),
  dateInput: document.querySelector<HTMLInputElement>('#todo-date-input'),
  overdueMessage:
    document.querySelector<HTMLParagraphElement>('#overdue-message'),
  today: new Date().toLocaleDateString('en-CA'),
}

export const Url = 'https://api.todos.in.jt-lab.ch'
