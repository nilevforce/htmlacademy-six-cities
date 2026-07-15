import { NameSpace } from '../../constants.ts';

import { State } from '../../types/state.ts';

const getOffer = (state: State) => state[NameSpace.Offer].offer;
const getOfferReviews = (state: State) => state[NameSpace.Offer].offerReviews;
const getNearbyOffers = (state: State) => state[NameSpace.Offer].nearbyOffers;
const getOfferLoadingStatus = (state: State) => state[NameSpace.Offer].isLoading;
const getOfferErrorStatus = (state: State) => state[NameSpace.Offer].hasError;

export {
  getOffer,
  getOfferReviews,
  getNearbyOffers,
  getOfferLoadingStatus,
  getOfferErrorStatus
};
