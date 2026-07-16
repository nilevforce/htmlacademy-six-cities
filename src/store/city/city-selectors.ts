import { NameSpace } from '../../constants.ts';
import type { RootState } from '../../types/state.ts';

const getCurrentCity = (state: RootState) => state[NameSpace.City].currentCity;

export {
  getCurrentCity
};
