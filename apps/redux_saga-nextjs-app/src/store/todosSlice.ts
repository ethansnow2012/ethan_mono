import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "../types"
import { db } from "@/data/todoDb"

export const todosSlice = createSlice({
  name: "todos",
  initialState: db.todos as Todo[],
  reducers: {
    todosFetchSucceeded: (state, action: PayloadAction<Todo[]>) => {
      console.log("todosFetchSucceeded:", action.payload)
      return action.payload
    },
  },
})
export const fetchTodos = () => ({ type: "TODOS_FETCH_REQUESTED" })

//export const { addTodo, toggleTodo } = todosSlice.actions

export const todosPiping = {
  todosFetchSucceeded: todosSlice.actions.todosFetchSucceeded,
}
