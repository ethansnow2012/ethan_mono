import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "../types"

export const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    todosFetchSucceeded: (state, action: PayloadAction<Todo[]>) => {
      return action.payload
    },
    optimalUpdateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload }
      }
    },
  },
})

export const todosPiping = {
  ...todosSlice.actions,
}
