import { NameSpace } from '../../constants.ts';

import type { RootState } from '../../types/state.ts';

const getFavoriteOffers = (state: Pick<RootState, NameSpace.FavoriteOffers>) => state[NameSpace.FavoriteOffers].offers;
const getFavoriteOffersCount = (state: Pick<RootState, NameSpace.FavoriteOffers>) => state[NameSpace.FavoriteOffers].offers.length;

export {
  getFavoriteOffers,
  getFavoriteOffersCount
};
