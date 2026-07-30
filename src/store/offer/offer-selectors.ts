import { NameSpace } from '../../constants.ts';

import type { RootState } from '../../types/state.ts';

const getOffer = (state: Pick<RootState, NameSpace.Offer>) => state[NameSpace.Offer].offer;
const getOfferReviews = (state: Pick<RootState, NameSpace.Offer>) => state[NameSpace.Offer].offerReviews;
const getNearbyOffers = (state: Pick<RootState, NameSpace.Offer>) => state[NameSpace.Offer].nearbyOffers;
const getOfferLoadingStatus = (state: Pick<RootState, NameSpace.Offer>) => state[NameSpace.Offer].isLoading;
const getOfferErrorStatus = (state: Pick<RootState, NameSpace.Offer>) => state[NameSpace.Offer].hasError;

export {
  getOffer,
  getOfferReviews,
  getNearbyOffers,
  getOfferLoadingStatus,
  getOfferErrorStatus
};
