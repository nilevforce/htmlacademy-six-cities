import { NameSpace } from '../../constants.ts';
import type { RootState } from '../../types/state.ts';

const getCurrentCity = (state: Pick<RootState, NameSpace.City>) => state[NameSpace.City].currentCity;

export {
  getCurrentCity
};
