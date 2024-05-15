// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';



const rootReducer = combineReducers({
    todosStore: todosReducer,
    // Add other reducers here
  });

const store = configureStore({
    reducer: rootReducer,

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;