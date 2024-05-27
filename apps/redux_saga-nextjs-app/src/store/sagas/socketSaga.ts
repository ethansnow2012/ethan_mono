import { call, put, takeEvery, cancel, select, take, actionChannel, fork, cancelled } from "redux-saga/effects"
import { socketPiping } from "../slices/socketSlice"
import io from "socket.io-client"
import type { Socket } from "socket.io-client"
import { RootState } from "@/store"
import { eventChannel } from "redux-saga"
import type { EventChannel } from "redux-saga"
import { ChatObj } from "@/types"

let socket: Socket | null = null

const doing = {
  connect: () => {
    socket = io("http://localhost:3000") // Adjust the URL as needed
    return new Promise<Socket>((resolve, reject) => {
      socket!.on("connect", () => {
        resolve(socket!)
      })
      socket!.on("connect_error", (err) => {
        reject(err)
      })
    })
  },
  disconnect: (socket: Socket) => {
    return new Promise<void>((resolve) => {
      socket.disconnect()
      resolve()
    })
  },
}

function* connect(): Generator<any, void, Socket> {
  console.log("connect socket")
  if (socket && socket.connected) {
    console.log("Socket is already connected")
    return
  }

  try {
    socket = yield call(doing.connect)
    yield put(socketPiping.connected())

    // Fork a new saga to handle incoming messages
    yield fork(handleSocketMessages, socket)
  } catch (error) {
    console.error("Socket connection error:", error)
    alert("Socket connection error:")
    // yield put(socketPiping.connectionFailed(error));
  }
}

function* disconnect(): Generator<any, void, Socket> {
  console.log("disconnect socket")
  if (!socket) {
    console.log("No socket to disconnect")
    return
  }

  yield call(doing.disconnect, socket)
  yield put(socketPiping.disconnected())
}

function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel((emit) => {
    const messageHandler = (message: any) => {
      emit({ type: "message", payload: message })
    }

    socket.on("message", messageHandler)

    return () => {
      socket.off("message", messageHandler)
    }
  })
}

function* handleSocketMessages(socket: Socket): Generator<any, void, any> {
  console.log("handleSocketMessages")
  const socketChannel = yield call(createSocketChannel, socket)

  try {
    while (true) {
      const action = yield take(socketChannel)
      yield put(socketPiping.receiveMessage({ msg: action.payload }))
    }
  } finally {
    if (yield cancelled()) {
      socketChannel.close()
    }
  }
}

function* watchSocketRequests(): Generator<any, void, any> {
  const requestChan = yield actionChannel([
    "SOCKET_CONNECT_REQUESTED",
    "SOCKET_DISCONNECT_REQUESTED",
    "SEND_MESSAGE_REQUESTED",
  ])

  let socketTask

  while (true) {
    const action = yield take(requestChan)

    if (action.type === "SOCKET_CONNECT_REQUESTED") {
      if (socketTask) {
        console.log("Socket is already connected. Ignoring connect request.")
      } else {
        socketTask = yield fork(connect)
      }
    } else if (action.type === "SOCKET_DISCONNECT_REQUESTED") {
      if (socketTask) {
        yield cancel(socketTask)
        socketTask = null
        yield call(disconnect)
      } else {
        console.log("Socket is not connected. Ignoring disconnect request.")
      }
    } else if (action.type === "SEND_MESSAGE_REQUESTED") {
      // should sent do backend instead of put to store
      yield put(socketPiping.receiveMessage({ msg: action.payload }))
    }
  }
}

export default function* rootSaga() {
  yield fork(watchSocketRequests)
}
