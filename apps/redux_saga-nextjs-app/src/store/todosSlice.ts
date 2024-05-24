import { get } from "http"
import type { Todo } from "../types"
import { createSlice } from "@reduxjs/toolkit"

//   const reducer = (state: Todo[] = [], action: { type: "TODOS_FETCH_SUCCEEDED"; payload: Todo[] }) => {
//     switch (action.type) {
//       case "TODOS_FETCH_SUCCEEDED":
//         return action.payload
//       default:
//         return state
//     }
//   }

// export const selectTodos = (state: Todo[]) => state

// export const fetchTodos = () => ({ type: "TODOS_FETCH_REQUESTED" })
// export const toggleTodo = (todo: Todo) => ({
//   type: "UPDATE_TODO_REQUESTED",
//   payload: {
//     ...todo,
//     done: !todo.done,
//   },
// })
// export const removeTodo = (todo: Todo) => ({
//   type: "DELETE_TODO_REQUESTED",
//   payload: todo,
// })
// export const addTodo = (text: string) => ({
//   type: "CREATE_TODO_REQUESTED",
//   payload: text,
// })

export const todosSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: 1,
      text: "Learn React",
      done: false,
    },
    {
      id: 2,
      text: "Learn Redux",
      done: false,
    },
    {
      id: 3,
      text: "Learn Redux-Saga",
      done: false,
    },
  ],
  reducers: {
    getTodos: (state) => state,
  },
})
