import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import sudokuSlice from './sudokuSlice';

export const store = configureStore({
  reducer: {
    sudoku: sudokuSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
