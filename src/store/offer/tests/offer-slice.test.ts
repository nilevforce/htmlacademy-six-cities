import offerSlice from '../offer-slice.ts';
import {
  addOfferReview,
  fetchNearbyOffers,
  fetchOfferById,
  fetchOfferReviews
} from '../offer-api-actions.ts';
import {
  changeOfferFavoriteStatus
} from '../../favorite-offers/favorite-offers-api-actions.ts';
import {
  makeFakeOffer,
  makeFakeOfferDetails,
  makeFakeReview
} from '../../../helpers/mocks.ts';

describe('Offer slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      offerReviews: [],
      nearbyOffers: [],
      isLoading: false,
      hasError: false
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      offerReviews: [],
      nearbyOffers: [],
      isLoading: false,
      hasError: false
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchOfferById', () => {
    it('should set loading state when pending', () => {
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState, fetchOfferById.pending('', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });

    it('should save offer when fulfilled', () => {
      const offer = makeFakeOfferDetails();
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };
      const expectedState = {
        offer,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState, fetchOfferById.fulfilled(offer, '', offer.id)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set error state when rejected', () => {
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: true
      };

      const result = offerSlice.reducer(
        initialState, fetchOfferById.rejected(null, '', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOfferReviews', () => {
    it('should set loading state when pending', () => {
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState, fetchOfferReviews.pending('', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });

    it('should save offer reviews when fulfilled', () => {
      const reviews = [makeFakeReview()];
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: reviews,
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState, fetchOfferReviews.fulfilled(reviews, '', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });

    it('should set error state when rejected', () => {
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: true
      };

      const result = offerSlice.reducer(
        initialState, fetchOfferReviews.rejected(null, '', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should set loading state when pending', () => {
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState, fetchNearbyOffers.pending('', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });

    it('should save nearby offers when fulfilled', () => {
      const nearbyOffers = [makeFakeOffer()];
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [],
        nearbyOffers,
        isLoading: false,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState, fetchNearbyOffers.fulfilled(nearbyOffers, '', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });

    it('should set error state when rejected', () => {
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: true,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: true
      };

      const result = offerSlice.reducer(
        initialState, fetchNearbyOffers.rejected(null, '', 'offer-id')
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('changeOfferFavoriteStatus', () => {
    it('should update favorite status of offer and nearby offer when fulfilled', () => {
      const offer = { ...makeFakeOfferDetails(), isFavorite: false };
      const nearbyOffer = {
        ...makeFakeOffer(),
        id: offer.id,
        isFavorite: false
      };
      const updatedOffer = {
        ...makeFakeOffer(),
        id: offer.id,
        isFavorite: true
      };
      const initialState = {
        offer,
        offerReviews: [],
        nearbyOffers: [nearbyOffer],
        isLoading: false,
        hasError: false
      };
      const expectedState = {
        offer: { ...offer, isFavorite: true },
        offerReviews: [],
        nearbyOffers: [{ ...nearbyOffer, isFavorite: true }],
        isLoading: false,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState,
        changeOfferFavoriteStatus.fulfilled(updatedOffer, '', {
          offerId: offer.id,
          status: true
        })
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('addOfferReview', () => {
    it('should add review when fulfilled', () => {
      const review = makeFakeReview();
      const initialState = {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      };
      const expectedState = {
        offer: null,
        offerReviews: [review],
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      };

      const result = offerSlice.reducer(
        initialState,
        addOfferReview.fulfilled(review, '', {
          offerId: 'offer-id',
          review: { comment: 'Great stay', rating: 5 }
        })
      );

      expect(result).toEqual(expectedState);
    });
  });
});
