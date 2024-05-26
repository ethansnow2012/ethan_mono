import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"
import { getTodos } from "../apiActions"
import { todosSagaActions } from "../store/todosSaga"
import { todosPiping } from "../store/todosSlice"
import type { Todo, TypedResponse } from "../types"
import { test } from "node:test"
import { db } from "@/data/todoDb"

const fetchResponseSnapShot: Awaited<TypedResponse<Todo[]>> = {
  status: 200,
  data: db.todos,
}

test("getTodosAction success(mock api)", async () => {
  const mockInitTodos: Todo[] = [{ id: 1, text: "Learn React", done: true, active: true }]
  const mockApiResponse: Awaited<TypedResponse<Todo[]>> = {
    status: 200,
    data: mockInitTodos,
  }
  await expectSaga(todosSagaActions.getTodosAction)
    .provide([[call(getTodos), mockApiResponse]])
    .put(todosPiping.todosFetchSucceeded(mockInitTodos))
    .run()
})
test("getTodosAction success(actual api)", async () => {
  await expectSaga(todosSagaActions.getTodosAction)
    .provide([[call(getTodos), fetchResponseSnapShot]])
    .put(todosPiping.startFetchingTodos())
    .put(todosPiping.todosFetchSucceeded(fetchResponseSnapShot.data))
    .run()
})
