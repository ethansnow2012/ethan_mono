import { call, put, takeEvery, takeLatest, select, take, delay, spawn, fork } from "redux-saga/effects"
import { counterPiping } from "../counterSlice"

interface RootState {
  counterSlice: {
    value: number
    isCounting: boolean
  }
}
function* counterIncrease() {
  yield put(counterPiping.increment())
}

function* counterDecrease() {
  yield put(counterPiping.decrement())
}

function* incrementEverySecond() {
  //: Generator<any, void, boolean>
  while (true) {
    const isCounting: boolean = yield select((state: RootState): boolean => state.counterSlice.isCounting)
    if (isCounting) {
      yield put({ type: "COUNTER_INCREMENT_REQUESTED" })
    }
    yield delay(1000) // Wait for 1 second
  }
}

function* watchStartCounting() {
  while (true) {
    yield take("START_COUNTING")
    yield put(counterPiping.startCounting())
  }
}

function* watchStopCounting() {
  while (true) {
    yield take("STOP_COUNTING")
    yield put(counterPiping.stopCounting())
  }
}

export default function* rootSaga() {
  yield takeEvery("COUNTER_INCREMENT_REQUESTED", counterIncrease)
  yield takeEvery("COUNTER_DECREMENT_REQUESTED", counterDecrease)
  yield spawn(incrementEverySecond)
  yield fork(watchStartCounting)
  yield fork(watchStopCounting)
}
