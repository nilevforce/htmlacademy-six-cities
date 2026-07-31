import { NameSpace } from '../../../constants.ts';
import {
  makeFakeOffer,
  makeFakeOfferDetails,
  makeFakeReview
} from '../../../helpers/mocks.ts';
import {
  getOffer,
  getNearbyOffers,
  getOfferReviews,
  getOfferErrorStatus,
  getOfferLoadingStatus
} from '../offer-selectors.ts';

describe('Offer selectors', () => {
  const state = {
    [NameSpace.Offer]: {
      offer: makeFakeOfferDetails(),
      offerReviews: Array.from({ length: 3 }, () => makeFakeReview()),
      nearbyOffers: Array.from({ length: 3 }, () => makeFakeOffer()),
      isLoading: false,
      hasError: false
    }
  };

  it('should return offer from state', () => {
    const { offer } = state[NameSpace.Offer];
    const result = getOffer(state);
    expect(result).toEqual(offer);
  });

  it('should return nearby offers from state', () => {
    const { nearbyOffers } = state[NameSpace.Offer];
    const result = getNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });

  it('should return offer reviews from state', () => {
    const { offerReviews } = state[NameSpace.Offer];
    const result = getOfferReviews(state);
    expect(result).toEqual(offerReviews);
  });

  it('should return offer error status from state', () => {
    const { hasError } = state[NameSpace.Offer];
    const result = getOfferErrorStatus(state);
    expect(result).toBe(hasError);
  });

  it('should return offer loading status from state', () => {
    const { isLoading } = state[NameSpace.Offer];
    const result = getOfferLoadingStatus(state);
    expect(result).toBe(isLoading);
  });
});
