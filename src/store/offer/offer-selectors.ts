import { NameSpace } from '../../constants.ts';

import type { RootState } from '../../types/state.ts';

const getOffer = (state: RootState) => state[NameSpace.Offer].offer;
const getOfferReviews = (state: RootState) => state[NameSpace.Offer].offerReviews;
const getNearbyOffers = (state: RootState) => state[NameSpace.Offer].nearbyOffers;
const getOfferLoadingStatus = (state: RootState) => state[NameSpace.Offer].isLoading;
const getOfferErrorStatus = (state: RootState) => state[NameSpace.Offer].hasError;

export {
  getOffer,
  getOfferReviews,
  getNearbyOffers,
  getOfferLoadingStatus,
  getOfferErrorStatus
};
