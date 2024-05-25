import type { Todo, TypedResponse } from "@/types"
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/apiActions"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { todosPiping } from "./todosSlice"

function* getTodosAction() {
  const { data: todos } = yield call(getTodos)
  yield put(todosPiping.todosFetchSucceeded(todos as Todo[]))
}

function* createTodoAction({ payload }: { type: "CREATE_TODO_REQUESTED"; payload: string }) {
  yield createTodo(payload)
  yield put({ type: "TODOS_FETCH_REQUESTED" })
}

// spliting procedure
function* updateTodoAction({ payload }: { type: "UPDATE_TODO_REQUESTED"; payload: { target: Todo; og: Todo } }) {
  const { target, og } = payload
  try {
    yield put(todosPiping.optimalUpdateTodo(target))
    const { status }: { status: number } = yield updateTodo(target)
    if (status !== 200) {
      throw new Error("Failed to update todo")
    }
    yield put({ type: "TODOS_FETCH_REQUESTED" })
  } catch (e) {
    yield put(todosPiping.optimalUpdateTodo(og))
  }
}

function* deleteTodoAction({ payload }: { type: "DELETE_TODO_REQUESTED"; payload: Todo }) {
  yield deleteTodo(payload)
  yield put({ type: "TODOS_FETCH_REQUESTED" })
}

function* rootSaga() {
  yield takeEvery("TODOS_FETCH_REQUESTED", getTodosAction)
  yield takeEvery("CREATE_TODO_REQUESTED", createTodoAction)
  yield takeLatest("UPDATE_TODO_REQUESTED", updateTodoAction)
  yield takeLatest("DELETE_TODO_REQUESTED", deleteTodoAction)
}

export default rootSaga
