import { NameSpace } from '../../constants.ts';

import { State } from '../store.ts';

const getFavoriteOffers = (state: State) => state[NameSpace.FavoriteOffers].offers;
const getFavoriteOffersCount = (state: State) => state[NameSpace.FavoriteOffers].offers.length;

export {
  getFavoriteOffers,
  getFavoriteOffersCount
};
