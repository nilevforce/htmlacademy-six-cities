import { NameSpace } from '../../constants.ts';
import { Offer } from '../../types/offer.ts';
import type { RootState } from '../../types/state.ts';

const getOffers = (state: Pick<RootState, NameSpace.Offers>): Offer[] => state[NameSpace.Offers].offers;
const getOffersLoadingStatus = (state: Pick<RootState, NameSpace.Offers>): boolean => state[NameSpace.Offers].isLoading;
const getOffersErrorStatus = (state: Pick<RootState, NameSpace.Offers>): boolean => state[NameSpace.Offers].hasError;

export {
  getOffers,
  getOffersLoadingStatus,
  getOffersErrorStatus
};
