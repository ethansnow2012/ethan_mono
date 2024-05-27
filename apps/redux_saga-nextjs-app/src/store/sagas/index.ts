import { all, fork, spawn } from "redux-saga/effects"
import todosRootSaga from "./todosSaga"
import counterRootSaga from "./counterSaga"
import socketRootSaga from "./socketSaga"
// import counterRootSaga from "./todosSaga"
export default function* rootSaga() {
  yield all([
    spawn(todosRootSaga),
    spawn(counterRootSaga),
    spawn(socketRootSaga),
  ])
}
