import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "../types"

const initialState: Todo[] = [{ id: 1, text: "Learn React", done: true, active: true }]

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //getTodos: (state) => state,
    todosFetchSucceeded: (state, action: PayloadAction<Todo[]>) => {
      return action.payload
    },
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
  },
})
export const fetchTodos = () => ({ type: "TODOS_FETCH_REQUESTED" })

export const { addTodo, toggleTodo, todosFetchSucceeded } = todosSlice.actions
