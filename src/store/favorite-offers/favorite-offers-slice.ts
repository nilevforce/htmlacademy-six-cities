import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants.ts';
import {
  changeOfferFavoriteStatus,
  fetchFavoriteOffers
} from './favorite-offers-api-actions.ts';
import type { FavoriteOffersState } from '../../types/state.ts';

const initialState: FavoriteOffersState = {
  offers: [],
  isLoading: false,
  hasError: false
};

const favoriteOffersSlice = createSlice({
  name: NameSpace.FavoriteOffers,
  initialState,
  reducers: {
    clearOffers: (state) => {
      state.offers = [];
    }
  },
  extraReducers: (builder) =>
    builder
      // Fetch offers
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.offers = action.payload;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // Change favorite offer status
      .addCase(changeOfferFavoriteStatus.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(changeOfferFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.isLoading = false;
        state.hasError = false;

        const index = state.offers.findIndex((offer) => offer.id === updatedOffer.id);

        if (updatedOffer.isFavorite) {
          if (index === -1) {
            state.offers.push(updatedOffer);
          } else {
            state.offers[index] = updatedOffer;
          }
        } else {
          if (index !== -1) {
            state.offers.splice(index, 1);
          }
        }
      })
      .addCase(changeOfferFavoriteStatus.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
});

export default favoriteOffersSlice;
