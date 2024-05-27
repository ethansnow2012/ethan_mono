import { call, put, fork } from "redux-saga/effects"
import { expectSaga, testSaga } from "redux-saga-test-plan"
import { test } from "node:test"
import { socketDoing, handleSocketMessages, connect } from "@/store/sagas/socketSaga"
import { socketPiping } from "@/store/slices/socketSlice"

// Mock the socket object
const mockSocket = {
  connected: true,
  on: () => {},
  off: () => {},
  emit: () => {},
  disconnect: () => {},
}

test("connects successfully and forks handleSocketMessages", async () => {
  await expectSaga(connect)
    .provide([[call(socketDoing.connect), mockSocket]])
    .put(socketPiping.connected())
    .fork(handleSocketMessages, mockSocket)
    .run()
})

// test("handles connection failure", async () => {
//   const error = new Error("connection failed")

//   await expectSaga(connect)
//     .provide([[call(socketDoing.connect), Promise.reject(error)]])
//     .put(socketPiping.connectionFailed())
//     .run()
// })

// test("does not reconnect if socket is already connected", () => {
//   testSaga(connect).next().isDone()
// })
