import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "../types"

const initialState: Todo[] = [{ id: 1, text: "Learn React", done: true, active: true }]

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //TODOS_FETCH_SUCCEEDED
    addTodo: (state, action: PayloadAction<Todo>) => {
      console.log("addTodo:", action.payload)
      state.push(action.payload)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.done = !todo.done
      }
    },
    todosFetchSucceeded: (state, action: PayloadAction<Todo[]>) => {
      console.log("todosFetchSucceeded:", action.payload)
      return action.payload
    },
  },
})
export const fetchTodos = () => ({ type: "TODOS_FETCH_REQUESTED" })

export const { addTodo, toggleTodo } = todosSlice.actions

export const todosPiping = {
  todosFetchSucceeded: todosSlice.actions.todosFetchSucceeded,
}
