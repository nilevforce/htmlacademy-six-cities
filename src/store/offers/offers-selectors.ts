import { NameSpace } from '../../constants.ts';
import { Offer } from '../../types/offer.ts';
import type { RootState } from '../../types/state.ts';

const getOffers = (state: RootState): Offer[] => state[NameSpace.Offers].offers;
const getOffersLoadingStatus = (state: RootState): boolean => state[NameSpace.Offers].isLoading;
const getOffersErrorStatus = (state: RootState): boolean => state[NameSpace.Offers].hasError;

export {
  getOffers,
  getOffersLoadingStatus,
  getOffersErrorStatus
};
