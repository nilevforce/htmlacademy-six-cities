import { NameSpace } from '../../constants.ts';
import {
  getFavoriteOffersCount,
  getFavoriteOffers
} from './favorite-offers-selectors.ts';
import { makeFakeOffer } from '../../helpers/mocks.ts';

describe('Favorite offers selectors', () => {
  const state = {
    [NameSpace.FavoriteOffers]: {
      offers: Array(3).fill(makeFakeOffer()),
      isLoading: false,
      hasError: false
    }
  };

  it('should return favorite offers from state', () => {
    const { offers } = state[NameSpace.FavoriteOffers];
    const result = getFavoriteOffers(state);
    expect(result).toBe(offers);
  });

  it('should return favorite offers count from state', () => {
    const { offers } = state[NameSpace.FavoriteOffers];
    const result = getFavoriteOffersCount(state);
    expect(result).toBe(offers.length);
  });
});
