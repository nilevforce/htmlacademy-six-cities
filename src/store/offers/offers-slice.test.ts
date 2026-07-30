import offersSlice from './offers-slice.ts';
import { fetchOffers } from './offers-api-actions.ts';
import {
  changeOfferFavoriteStatus
} from '../favorite-offers/favorite-offers-api-actions.ts';
import { makeFakeOffer } from '../../helpers/mocks.ts';

describe('Offers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { offers: [], isLoading: false, hasError: false };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { offers: [], isLoading: false, hasError: false };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchOffers', () => {
    it('should set loading state when pending', () => {
      const initialState = { offers: [], isLoading: false, hasError: false };
      const expectedState = { offers: [], isLoading: true, hasError: false };

      const result = offersSlice.reducer(
        initialState, fetchOffers.pending('', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should save offers when fulfilled', () => {
      const offers = [makeFakeOffer()];
      const initialState = { offers: [], isLoading: true, hasError: false };
      const expectedState = { offers, isLoading: false, hasError: false };

      const result = offersSlice.reducer(
        initialState, fetchOffers.fulfilled(offers, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set error state when rejected', () => {
      const initialState = { offers: [], isLoading: true, hasError: false };
      const expectedState = { offers: [], isLoading: false, hasError: true };

      const result = offersSlice.reducer(
        initialState, fetchOffers.rejected(null, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('changeOfferFavoriteStatus', () => {
    it('should update offer favorite status when fulfilled', () => {
      const offer = { ...makeFakeOffer(), isFavorite: false };
      const updatedOffer = { ...offer, isFavorite: true };
      const initialState = {
        offers: [offer],
        isLoading: false,
        hasError: false
      };
      const expectedState = {
        offers: [updatedOffer], isLoading: false, hasError: false
      };

      const result = offersSlice.reducer(
        initialState,
        changeOfferFavoriteStatus.fulfilled(updatedOffer, '', {
          offerId: offer.id,
          status: true
        })
      );

      expect(result).toEqual(expectedState);
    });
  });
});
