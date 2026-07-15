import { NameSpace } from '../../constants.ts';
import { Offer } from '../../types/offer.ts';

import { State } from '../store.ts';

const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isLoading;
const getOffersErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;

export {
  getOffers,
  getOffersLoadingStatus,
  getOffersErrorStatus
};
