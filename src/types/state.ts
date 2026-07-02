import store from '../store/store.ts';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
