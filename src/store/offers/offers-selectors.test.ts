import { NameSpace } from '../../constants.ts';
import {
  makeFakeOffer
} from '../../helpers/mocks.ts';
import {
  getOffers,
  getOffersLoadingStatus,
  getOffersErrorStatus
} from './offers-selectors.ts';

describe('Offers selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: Array(3).fill(makeFakeOffer()),
      isLoading: false,
      hasError: false
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return offers loading status from state', () => {
    const { isLoading } = state[NameSpace.Offers];
    const result = getOffersLoadingStatus(state);
    expect(result).toBe(isLoading);
  });

  it('should return offers error status from state', () => {
    const { hasError } = state[NameSpace.Offers];
    const result = getOffersErrorStatus(state);
    expect(result).toBe(hasError);
  });
});
