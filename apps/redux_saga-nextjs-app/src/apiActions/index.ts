import { Todo } from "../types"

const BASE_URL = "http://localhost:3000/api/todos"

const handleResponse = async <T = undefined>(response: Response) => {
  const data = await response.json()
  return { status: response.status, data: data as T }
}
export type TypedResponse<T> = ReturnType<typeof handleResponse<T>>

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}`)
  return handleResponse<Todo[]>(response)
}

export const createTodo = async (text: string) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  })
  return handleResponse<Todo>(response)
}

export const updateTodo = async (todo: Todo) => {
  const response = await fetch(`${BASE_URL}?id=${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
  return handleResponse<Todo>(response)
}

export const deleteTodo = async (todo: Todo) => {
  const response = await fetch(`${BASE_URL}?id=${todo.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<undefined>(response)
}
