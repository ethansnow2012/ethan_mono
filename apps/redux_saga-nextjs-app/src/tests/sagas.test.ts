import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"
import { getTodos } from "@/apiActions"
import { todosSagaActions } from "@/store/todosSaga"
import { todosPiping } from "@/store/todosSlice"
import type { Todo, TypedResponse } from "@/types"
import { test } from "node:test"
import assert from "assert"

// Mock data
// const mockTodos: Todo[] = [
//   { id: 1, text: "Learn Redux Saga", done: false },
//   { id: 2, text: "Learn Testing", done: true }
// ];

// // Mock API response
const initTodos: Todo[] = [{ id: 1, text: "Learn React", done: true, active: true }]
const mockApiResponse: Awaited<TypedResponse<Todo[]>> = {
  status: 200,
  data: initTodos,
}

test("getTodosAction success", async () => {
  await expectSaga(todosSagaActions.getTodosAction)
    .provide([[call(getTodos), mockApiResponse]])
    .put({ type: "todos/startFetchingTodos" })
    .run()
})
