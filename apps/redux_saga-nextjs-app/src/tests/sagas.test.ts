import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"
import { getTodos, updateTodo } from "@/apiActions"
import { todosSagaActions } from "@/store/sagas/todosSaga"
import { todosPiping } from "@/store/slices/todosSlice"
import type { Todo, TypedResponse } from "@/types"
import { test } from "node:test"
import { db } from "@/data/todoDb"

const fetchResponseSnapShot: Awaited<TypedResponse<Todo[]>> = {
  status: 200,
  data: db.todos,
}

test("[api mocked] GetTodosAction success", async () => {
  // arrange
  const mockInitTodos: Todo[] = [{ id: 1, text: "Learn React", done: true, active: true }]
  const mockApiResponse: Awaited<TypedResponse<Todo[]>> = {
    status: 200,
    data: mockInitTodos,
  }
  // act
  await expectSaga(todosSagaActions.getTodosAction)
    .provide([[call(getTodos), mockApiResponse]])
    .put(todosPiping.todosFetchSucceeded(mockInitTodos))
    .run()
})
test("[api actual] GetTodosAction success", async () => {
  await expectSaga(todosSagaActions.getTodosAction)
    .provide([[call(getTodos), fetchResponseSnapShot]])
    .put(todosPiping.startFetchingTodos())
    .put(todosPiping.todosFetchSucceeded(fetchResponseSnapShot.data))
    .run()
})
test("[api mocked] When updateTodoAction fails(!200) it will revert the optimal update.", async () => {
  // arrange
  const errorMsg = "Failed to update todo"
  const targetTodo: Todo = { id: 1, text: "Learn React", done: true, active: true }
  const ogTodo: Todo = { id: 1, text: "Learn React", done: false, active: true }
  const mockApiResponse: Awaited<TypedResponse<undefined>> = {
    status: 500,
    data: undefined,
  }
  await expectSaga(todosSagaActions.updateTodoAction, {
    type: "UPDATE_TODO_REQUESTED",
    payload: { target: targetTodo, og: ogTodo },
  })
    .provide([[call(updateTodo, targetTodo), mockApiResponse]])
    .put(todosPiping.optimalUpdateTodo(targetTodo))
    .put(todosPiping.optimalUpdateTodo(ogTodo))
    .put(todosPiping.todosFetchFailed(errorMsg))
    .run()
})

test("[api mocked] When updateTodoAction success(200) it will update the todo.", async () => {
  // arrange
  const targetTodo: Todo = { id: 1, text: "Learn React", done: true, active: true }
  const ogTodo: Todo = { id: 1, text: "Learn React", done: false, active: true }
  const mockApiResponse: Awaited<TypedResponse<undefined>> = {
    status: 200,
    data: undefined,
  }
  await expectSaga(todosSagaActions.updateTodoAction, {
    type: "UPDATE_TODO_REQUESTED",
    payload: { target: targetTodo, og: ogTodo },
  })
    .provide([[call(updateTodo, targetTodo), mockApiResponse]])
    .put(todosPiping.optimalUpdateTodo(targetTodo))
    .put({ type: "TODOS_FETCH_REQUESTED" })
    .run()
})
