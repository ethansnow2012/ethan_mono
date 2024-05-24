import createSagaMiddleware from "@redux-saga/core"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { todosSlice } from "./todosSlice"

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  todosSlice: todosSlice,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
