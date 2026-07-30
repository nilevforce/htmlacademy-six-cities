import favoriteOffersSlice from './favorite-offers-slice.ts';
import {
  changeOfferFavoriteStatus,
  fetchFavoriteOffers
} from './favorite-offers-api-actions.ts';
import { makeFakeOffer } from '../../helpers/mocks.ts';

describe('Favorite offers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isLoading: false,
      hasError: false
    };

    const result = favoriteOffersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isLoading: false,
      hasError: false
    };

    const result = favoriteOffersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchFavoriteOffers', () => {
    it('should set loading state when pending', () => {
      const initialState = {
        offers: [],
        isLoading: false,
        hasError: false
      };

      const expectedState = {
        offers: [],
        isLoading: true,
        hasError: false
      };

      const result = favoriteOffersSlice.reducer(
        initialState,
        fetchFavoriteOffers.pending('', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should save favorite offers when fulfilled', () => {
      const mockOffer = makeFakeOffer();

      const initialState = {
        offers: [],
        isLoading: true,
        hasError: false
      };

      const expectedState = {
        offers: [mockOffer],
        isLoading: false,
        hasError: false
      };

      const result = favoriteOffersSlice.reducer(
        initialState,
        fetchFavoriteOffers.fulfilled([mockOffer], '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set error state when rejected', () => {
      const mockOffer = makeFakeOffer();

      const initialState = {
        offers: [mockOffer],
        isLoading: true,
        hasError: false
      };

      const expectedState = {
        offers: [mockOffer],
        isLoading: false,
        hasError: true
      };

      const result = favoriteOffersSlice.reducer(
        initialState,
        fetchFavoriteOffers.rejected(null, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('changeOfferFavoriteStatus', () => {
    it('should set loading state when pending', () => {
      const initialState = {
        offers: [],
        isLoading: false,
        hasError: false
      };

      const expectedState = {
        offers: [],
        isLoading: true,
        hasError: false
      };

      const result = favoriteOffersSlice.reducer(
        initialState,
        changeOfferFavoriteStatus.pending('', {
          offerId: '',
          status: true
        })
      );

      expect(result).toEqual(expectedState);
    });

    it('should update offer favorite status to "true" and add to favorite offers when fulfilled', () => {
      const mockOffer = makeFakeOffer();
      mockOffer.isFavorite = false;

      const updatedOffer = {
        ...mockOffer,
        isFavorite: !mockOffer.isFavorite
      };

      const initialState = {
        offers: [],
        isLoading: true,
        hasError: false
      };

      const expectedState = {
        offers: [updatedOffer],
        isLoading: false,
        hasError: false
      };

      const result = favoriteOffersSlice.reducer(
        initialState,
        changeOfferFavoriteStatus.fulfilled(
          updatedOffer,
          '',
          {
            offerId: mockOffer.id,
            status: updatedOffer.isFavorite
          }
        )
      );

      expect(result).toEqual(expectedState);
    });

    it('should update offer favorite status to "false" and remove from favorite offers when fulfilled', () => {
      const mockOffer = makeFakeOffer();
      mockOffer.isFavorite = true;

      const updatedOffer = {
        ...mockOffer,
        isFavorite: !mockOffer.isFavorite
      };

      const initialState = {
        offers: [mockOffer],
        isLoading: true,
        hasError: false
      };

      const expectedState = {
        offers: [],
        isLoading: false,
        hasError: false
      };

      const result = favoriteOffersSlice.reducer(
        initialState,
        changeOfferFavoriteStatus.fulfilled(
          updatedOffer,
          '',
          {
            offerId: mockOffer.id,
            status: updatedOffer.isFavorite
          }
        )
      );

      expect(result).toEqual(expectedState);
    });

    it('should set error state when rejected', () => {
      const initialState = {
        offers: [],
        isLoading: true,
        hasError: false
      };

      const expectedState = {
        offers: [],
        isLoading: false,
        hasError: true
      };

      const result = favoriteOffersSlice.reducer(
        initialState, changeOfferFavoriteStatus.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });
});
