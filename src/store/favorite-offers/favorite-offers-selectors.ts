import { NameSpace } from '../../constants.ts';

import { State } from '../../types/state.ts';

const getFavoriteOffers = (state: State) => state[NameSpace.FavoriteOffers].offers;
const getFavoriteOffersCount = (state: State) => state[NameSpace.FavoriteOffers].offers.length;

export {
  getFavoriteOffers,
  getFavoriteOffersCount
};
