// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './reducers/book-reducer';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
