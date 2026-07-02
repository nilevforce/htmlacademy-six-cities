import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducer.ts';

const store = configureStore({
  reducer: appReducer,
  devTools: true
});

export default store;
