import { NameSpace } from '../../constants.ts';
import { State } from '../../types/state.ts';

const getCurrentCity = (state: State) => state[NameSpace.City].currentCity;

export {
  getCurrentCity
};
