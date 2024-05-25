import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "../types"
import { start } from "repl"

interface TodosSliceState {
  sliceData: Todo[]
  loading: boolean
}

const initialState: TodosSliceState = {
  sliceData: [],
  loading: false,
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    startFetchingTodos: (state) => {
      return {
        ...state,
        loading: true,
      }
    },
    todosFetchSucceeded: (state, action: PayloadAction<Todo[]>) => {
      return {
        ...state,
        loading: false,
        sliceData: action.payload,
      }
    },
    optimalUpdateTodo: ({ sliceData }, action: PayloadAction<Todo>) => {
      const index = sliceData.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        sliceData[index] = { ...sliceData[index], ...action.payload }
      }
    },
  },
})

export const todosPiping = {
  ...todosSlice.actions,
}
