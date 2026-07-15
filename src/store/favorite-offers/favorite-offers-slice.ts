import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants.ts';
import { Offer } from '../../types/offer.ts';
import {
  changeOfferFavoriteStatus,
  fetchFavoriteOffers
} from './favorite-offers-api-actions.ts';

interface FavoriteOffersState {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: FavoriteOffersState = {
  offers: [],
  isLoading: false,
  hasError: false
};

// TODO: Добавить обработку изменения избранного оффера
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
      .addCase(changeOfferFavoriteStatus.fulfilled, (state) => {
        // const updatedOffer = action.payload;

        state.isLoading = false;
        state.hasError = false;

        // const offerInList = state.offers.find((offer) => offer.id === updatedOffer.id);
      })
      .addCase(changeOfferFavoriteStatus.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
});

export default favoriteOffersSlice;
