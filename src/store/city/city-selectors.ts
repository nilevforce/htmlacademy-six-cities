import { NameSpace } from '../../constants.ts';

import { State } from '../store.ts';

const getCurrentCity = (state: State) => state[NameSpace.City].currentCity;

export {
  getCurrentCity
};
