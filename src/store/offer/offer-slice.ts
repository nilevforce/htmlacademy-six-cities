import { Offer, OfferDetails } from '../../types/offer.ts';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants.ts';
import { Review } from '../../types/review.ts';
import {
  fetchNearbyOffers,
  fetchOfferById,
  fetchOfferReviews
} from './offer-api-actions.ts';
import {
  changeOfferFavoriteStatus
} from '../favorite-offers/favorite-offers-api-actions.ts';

interface OfferState {
  offer: OfferDetails | null;
  offerReviews: Review[];
  nearbyOffers: Offer[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: OfferState = {
  offer: null,
  offerReviews: [],
  nearbyOffers: [],
  isLoading: false,
  hasError: false
};

const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Offer
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // Offer reviews
      .addCase(fetchOfferReviews.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.offerReviews = action.payload;
      })
      .addCase(fetchOfferReviews.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // Nearby offer
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // Favorite offer status changed
      .addCase(changeOfferFavoriteStatus.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }

        const updatedOfferId = action.payload.id;
        const updatedOfferIsFavorite = action.payload.isFavorite;

        if (state?.offer?.id === updatedOfferId) {
          state.offer.isFavorite = updatedOfferIsFavorite;
        }

        const nearbyOffer = state.nearbyOffers.find((offer) => offer.id === updatedOfferId);

        if (nearbyOffer) {
          nearbyOffer.isFavorite = updatedOfferIsFavorite;
        }
      })
});

export default offerSlice;
