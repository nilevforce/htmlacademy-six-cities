import createAPI from '../../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import type { RootState } from '../../../types/state.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppThunkDispatch, makeFakeOffer } from '../../../helpers/mocks.ts';
import { APIRoute, NameSpace } from '../../../constants.ts';
import { Offer } from '../../../types/offer.ts';
import { fetchOffers } from '../offers-api-actions.ts';

describe('Offers async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({ api: axios })];
  const mockStoreCreator = configureMockStore<RootState, PayloadAction, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Offers]: {
        offers: [],
        isLoading: false,
        hasError: false
      }
    });

    mockAxiosAdapter.reset();
  });

  describe('fetchOffers', () => {
    let mockOffers: Offer[];
    let endpoint: string;

    beforeEach(() => {
      mockOffers = Array.from({ length: 3 }, () => makeFakeOffer());
      endpoint = APIRoute.Offers;
    });

    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);

      const fulfillAction = emittedActions.find(
        (action) => action.type === fetchOffers.fulfilled.type
      );

      expect(fulfillAction?.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffers.pending" and "fetchOffers.rejected" when server response 500', async () => {
      mockAxiosAdapter.onGet(endpoint).reply(500);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });
});
