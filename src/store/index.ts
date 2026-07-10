import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducer.ts';
import createAPI from '../services/api.ts';

const api = createAPI();

const index = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: { api }
    }
  })
});

export default index;
