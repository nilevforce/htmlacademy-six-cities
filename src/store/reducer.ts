import { createReducer } from '@reduxjs/toolkit/src';
import { AuthorizationStatus, CITIES } from '../constants.ts';
import {
  changeCity, changeOfferFavoriteStatus,
  fillCurrentOffer, fillCurrentOfferReviews,
  fillFavoriteOffers, fillNearbyOffers,
  fillOffers,
  requireAuthorization,
} from './action.ts';
import { Offer, OfferDetails } from '../types/offer.ts';
import { UserData } from '../types/user-data.ts';
import { Review } from '../types/review.ts';

type UserState = Pick<UserData, 'email' | 'name' | 'avatarUrl' | 'isPro'>;

interface InitialState {
  city: string;
  offers: Offer[];
  favoriteOffers: Offer[];
  currentOffer: OfferDetails | null;
  currentOfferReviews: Review[];
  nearbyOffers: Offer[];
  authStatus: AuthorizationStatus;
  user: UserState | null;
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  currentOfferReviews: [],
  nearbyOffers: [],
  authStatus: AuthorizationStatus.Unknown,
  user: null
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(fillFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload.offers;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload.authStatus;
      state.user = action.payload.user || null;

      if (state.authStatus !== AuthorizationStatus.Auth) {
        state.favoriteOffers = [];
      }
    })
    .addCase(fillCurrentOffer, (state, action) => {
      state.currentOffer = action.payload.offer;
    })
    .addCase(fillCurrentOfferReviews, (state, action) => {
      state.currentOfferReviews = action.payload.reviews;
    })
    .addCase(fillNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload.offers;
    })
    .addCase(changeOfferFavoriteStatus, (state, action) => {
      // TODO: Нужно нормализовать данные, иначе сейчас при изменении
      //  избранного приходится менять его во всех местах

      // Обновленное предложение
      const updatedOffer = action.payload.offer;

      // Обновляем предложение в списке предложений
      const offerInList = state.offers.find((offer) => offer.id === updatedOffer.id);
      if (offerInList) {
        offerInList.isFavorite = updatedOffer.isFavorite;

        // Изменяем предложение в списке избранных
        state.favoriteOffers = updatedOffer.isFavorite
          ? [...state.favoriteOffers, offerInList]
          : state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);
      }

      // Изменяем предложение в списке предложений поблизости
      const offerInNearbyList = state.nearbyOffers
        .find((offer) => offer.id === updatedOffer.id);
      if (offerInNearbyList) {
        offerInNearbyList.isFavorite = updatedOffer.isFavorite;
      }

      // Обновляем предложение в глобальном состоянии
      if (state.currentOffer?.id === updatedOffer.id) {
        state.currentOffer = updatedOffer;
      }
    });
});

export {
  appReducer
};
