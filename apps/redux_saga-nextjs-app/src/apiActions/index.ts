import { Todo } from "../types"

const BASE_URL = "http://localhost:3000/api/todos"

export const getTodos = async (): Promise<Todo[]> => fetch(`${BASE_URL}`).then((res) => res.json())

export const createTodo = async (text: string): Promise<Todo> =>
  fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  }).then((res) => res.json())

export const updateTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}?id=${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json())

export const deleteTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}?id=${todo.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(() => todo)
