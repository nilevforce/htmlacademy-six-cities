import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/state.ts';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
