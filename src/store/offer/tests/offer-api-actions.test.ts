import createAPI from '../../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import type { RootState } from '../../../types/state.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  makeFakeOffer,
  makeFakeOfferDetails,
  makeFakeReview,
  makeFakeReviewData
} from '../../../helpers/mocks.ts';
import { APIRoute, NameSpace } from '../../../constants.ts';
import {
  addOfferReview,
  fetchNearbyOffers,
  fetchOfferById,
  fetchOfferReviews
} from '../offer-api-actions.ts';
import { Offer, OfferDetails } from '../../../types/offer.ts';
import { Review } from '../../../types/review.ts';
import { ReviewData } from '../../../types/review-data.ts';

describe('Offer async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({ api: axios })];
  const mockStoreCreator = configureMockStore<RootState, PayloadAction, AppThunkDispatch>(middleware);

  type Store = ReturnType<typeof mockStoreCreator>;

  let store: Store;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Offer]: {
        offer: null,
        offerReviews: [],
        nearbyOffers: [],
        isLoading: false,
        hasError: false
      }
    });

    mockAxiosAdapter.reset();
  });

  describe('fetchOfferById', () => {
    let mockOfferDetails: OfferDetails;
    let endpoint: string;

    beforeEach(() => {
      mockOfferDetails = makeFakeOfferDetails();
      endpoint = APIRoute.Offer
        .replace(':offerId', mockOfferDetails.id);
    });

    it('should dispatch "fetchOfferById.pending" and "fetchOfferById.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(200, mockOfferDetails);

      await store.dispatch(fetchOfferById(mockOfferDetails.id));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchOfferById.pending.type,
        fetchOfferById.fulfilled.type
      ]);

      const fulfillAction = store.getActions().find(
        (action) => action.type === fetchOfferById.fulfilled.type
      );

      expect(fulfillAction?.payload).toEqual(mockOfferDetails);
    });

    it('should dispatch "fetchOfferById.pending" and "fetchOfferById.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(404);

      await store.dispatch(fetchOfferById(mockOfferDetails.id));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchOfferById.pending.type,
        fetchOfferById.rejected.type
      ]);
    });
  });

  describe('fetchOfferReviews', () => {
    let mockOfferDetails: OfferDetails;
    let mockOfferReviews: Review[];
    let endpoint: string;

    beforeEach(() => {
      mockOfferDetails = makeFakeOfferDetails();
      mockOfferReviews = Array.from({ length: 3 }, () => makeFakeReview());
      endpoint = APIRoute.OfferComments
        .replace(':offerId', mockOfferDetails.id);
    });

    it('should dispatch "fetchOfferReviews.pending" and "fetchOfferReviews.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(200, mockOfferReviews);

      await store.dispatch(fetchOfferReviews(mockOfferDetails.id));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchOfferReviews.pending.type,
        fetchOfferReviews.fulfilled.type
      ]);

      const fulfillAction = store.getActions().find(
        (action) => action.type === fetchOfferReviews.fulfilled.type
      );

      expect(fulfillAction?.payload).toEqual(mockOfferReviews);
    });

    it('should dispatch "fetchOfferReviews.pending" and "fetchOfferReviews.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(404);

      await store.dispatch(fetchOfferReviews(mockOfferDetails.id));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchOfferReviews.pending.type,
        fetchOfferReviews.rejected.type
      ]);
    });
  });

  describe('fetchNearbyOffers', () => {
    let mockOfferDetails: OfferDetails;
    let mockNearbyOffers: Offer[];
    let endpoint: string;

    beforeEach(() => {
      mockOfferDetails = makeFakeOfferDetails();
      mockNearbyOffers = Array.from({ length: 3 }, () => makeFakeOffer());
      endpoint = APIRoute.NearbyOffers
        .replace(':offerId', mockOfferDetails.id);
    });

    it('should dispatch "fetchNearbyOffers.pending" and "fetchNearbyOffers.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyOffers(mockOfferDetails.id));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.fulfilled.type
      ]);

      const fulfillAction = store.getActions().find(
        (action) => action.type === fetchNearbyOffers.fulfilled.type
      );

      expect(fulfillAction?.payload).toEqual(mockNearbyOffers);
    });

    it('should dispatch "fetchNearbyOffers.pending" and "fetchNearbyOffers.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(404);

      await store.dispatch(fetchNearbyOffers(mockOfferDetails.id));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.rejected.type
      ]);
    });
  });

  describe('addOfferReview', () => {
    let mockOffer: Offer;
    let mockReview: Review;
    let mockReviewData: ReviewData;
    let endpoint: string;

    beforeEach(() => {
      mockOffer = makeFakeOffer();
      mockReview = makeFakeReview();
      mockReviewData = makeFakeReviewData();
      endpoint = APIRoute.OfferComments
        .replace(':offerId', mockOffer.id);
    });

    it('should dispatch "addOfferReview.pending" and "addOfferReview.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(endpoint).reply(200, mockReview);

      await store.dispatch(addOfferReview({
        offerId: mockOffer.id,
        review: mockReviewData
      }));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        addOfferReview.pending.type,
        addOfferReview.fulfilled.type
      ]);

      const fulfillAction = store.getActions().find(
        (action) => action.type === addOfferReview.fulfilled.type
      );

      expect(fulfillAction?.payload).toEqual(mockReview);
    });

    it('should dispatch "addOfferReview.pending" and "addOfferReview.rejected" when server response 404', async () => {
      mockAxiosAdapter.onPost(endpoint).reply(404);

      await store.dispatch(addOfferReview({
        offerId: mockOffer.id,
        review: mockReviewData
      }));

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        addOfferReview.pending.type,
        addOfferReview.rejected.type
      ]);
    });
  });
});
