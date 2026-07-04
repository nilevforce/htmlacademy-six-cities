import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { State } from '../types/state.ts';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default useAppSelector;
