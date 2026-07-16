import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../types/state.ts';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
