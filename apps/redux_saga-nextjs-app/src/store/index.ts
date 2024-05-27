import createSagaMiddleware from "@redux-saga/core"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { todosSlice } from "./slices/todosSlice"
import { counterSlice } from "./slices/counterSlice"
import { socketSlice } from "./slices/socketSlice"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  todosSlice: todosSlice.reducer,
  counterSlice: counterSlice.reducer,
  socketSlice: socketSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store
