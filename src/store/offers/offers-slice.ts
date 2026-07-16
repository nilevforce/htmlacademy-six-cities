import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants.ts';
import { fetchOffers } from './offers-api-actions.ts';
import {
  changeOfferFavoriteStatus
} from '../favorite-offers/favorite-offers-api-actions.ts';
import type { OffersState } from '../../types/state.ts';

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  hasError: false
};

const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Offers
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // Update offer favorite status
      .addCase(changeOfferFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        const offerInList = state.offers.find((offer) => offer.id === updatedOffer.id);

        if (offerInList) {
          offerInList.isFavorite = updatedOffer.isFavorite;
        }
      })

});

export default offersSlice;
