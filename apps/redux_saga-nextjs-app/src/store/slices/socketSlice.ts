import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Socket } from "socket.io-client"
import { ChatObj } from "@/types"

export interface SocketSliceState {
  connected: boolean
  // socket: Socket | null // store should only have serializable data
  chatMessages: ChatObj[]
}

const initialState: SocketSliceState = {
  connected: false,
  chatMessages: [],
}

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connected: (state) => {
      console.log("connected")
      return {
        ...state,
        connected: true,
      }
    },
    disconnected: (state) => {
      state.connected = false
    },
    receiveMessage: (state, payload: PayloadAction<ChatObj>) => {
      console.log("receiveMessage", payload.payload)
      state.chatMessages.push(payload.payload)
    },
    connectionFailed: (state) => {
      state.connected = false
    },
  },
})

export const socketPiping = {
  ...socketSlice.actions,
}
