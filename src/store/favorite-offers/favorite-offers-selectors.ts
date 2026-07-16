import { NameSpace } from '../../constants.ts';

import type { RootState } from '../../types/state.ts';

const getFavoriteOffers = (state: RootState) => state[NameSpace.FavoriteOffers].offers;
const getFavoriteOffersCount = (state: RootState) => state[NameSpace.FavoriteOffers].offers.length;

export {
  getFavoriteOffers,
  getFavoriteOffersCount
};
