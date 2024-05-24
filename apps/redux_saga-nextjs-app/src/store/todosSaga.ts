import type { Todo } from "../types"
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/apiActions"
import { put, takeEvery } from "redux-saga/effects"

function* getTodosAction() {
  const todos: Todo[] = yield getTodos()
  yield put({ type: "TODOS_FETCH_SUCCEEDED", payload: todos })
}

function* createTodoAction({ payload }: { type: "CREATE_TODO_REQUESTED"; payload: string }) {
  yield createTodo(payload)
  yield put({ type: "TODOS_FETCH_REQUESTED" })
}

function* updateTodoAction({ payload }: { type: "UPDATE_TODO_REQUESTED"; payload: Todo }) {
  yield updateTodo(payload)
  yield put({ type: "TODOS_FETCH_REQUESTED" })
}

function* deleteTodoAction({ payload }: { type: "DELETE_TODO_REQUESTED"; payload: Todo }) {
  yield deleteTodo(payload)
  yield put({ type: "TODOS_FETCH_REQUESTED" })
}

function* rootSaga() {
  yield takeEvery("TODOS_FETCH_REQUESTED", getTodosAction)
  yield takeEvery("UPDATE_TODO_REQUESTED", updateTodoAction)
  yield takeEvery("DELETE_TODO_REQUESTED", deleteTodoAction)
  yield takeEvery("CREATE_TODO_REQUESTED", createTodoAction)
}

export default rootSaga
