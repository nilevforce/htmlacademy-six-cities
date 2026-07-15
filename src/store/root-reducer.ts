import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants.ts';
import offersSlice from './offers/offers-slice.ts';
import offerSlice from './offer/offer-slice.ts';
import favoriteOffersSlice from './favorite-offers/favorite-offers-slice.ts';
import citySlice from './city/city-slice.ts';
import userSlice from './user/user-slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.FavoriteOffers]: favoriteOffersSlice.reducer,
  [NameSpace.City]: citySlice.reducer,
  [NameSpace.User]: userSlice.reducer
});
