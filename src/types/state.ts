import { store } from '../store/store.ts';
import { Offer, OfferDetails } from './offer.ts';
import { Review } from './review.ts';
import { AuthorizationStatus, CITIES, NameSpace } from '../constants.ts';

export type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
};

export type OfferState = {
  offer: OfferDetails | null;
  offerReviews: Review[];
  nearbyOffers: Offer[];
  isLoading: boolean;
  hasError: boolean;
}

export type FavoriteOffersState = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
}

export type CityState = {
  currentCity: typeof CITIES[number];
}

export type UserState = {
  user: null | {
    email: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  auth: {
    status: AuthorizationStatus;
  };
}

export type RootState = {
  [NameSpace.Offers]: OffersState;
  [NameSpace.Offer]: OfferState;
  [NameSpace.FavoriteOffers]: FavoriteOffersState;
  [NameSpace.City]: CityState;
  [NameSpace.User]: UserState;
};

export type AppDispatch = typeof store.dispatch;
