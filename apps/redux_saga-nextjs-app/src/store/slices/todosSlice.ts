import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "../../types"

interface TodosSliceState {
  sliceData: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodosSliceState = {
  sliceData: [],
  loading: false,
  error: null,
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
    todosFetchFailed(state, action: PayloadAction<string>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    todosClearError: (state) => {
      return {
        ...state,
        error: null,
      }
    },
  },
})

export const todosPiping = {
  ...todosSlice.actions,
}
