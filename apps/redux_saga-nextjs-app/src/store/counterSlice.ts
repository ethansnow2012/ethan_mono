import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CounterSliceState {
  conutValue: number
  isCounting: boolean
}

const initialState: CounterSliceState = {
  conutValue: 0,
  isCounting: false,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.conutValue += 1
    },
    decrement: (state) => {
      state.conutValue -= 1
    },
    startCounting(state) {
      state.isCounting = true
    },
    stopCounting(state) {
      state.isCounting = false
    },
  },
})

export const counterPiping = {
  ...counterSlice.actions,
}
