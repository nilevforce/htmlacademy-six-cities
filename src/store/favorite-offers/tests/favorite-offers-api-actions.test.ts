import createAPI from '../../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import type { RootState } from '../../../types/state.ts';
import {
  AppThunkDispatch,
  makeFakeOffer, makeFakeOfferDetails, makeFakeUserData
} from '../../../helpers/mocks.ts';
import {
  APIRoute,
  AuthorizationStatus,
  NameSpace
} from '../../../constants.ts';
import {
  changeOfferFavoriteStatus,
  fetchFavoriteOffers
} from '../favorite-offers-api-actions.ts';
import type { Offer } from '../../../types/offer.ts';
import { PayloadAction } from '@reduxjs/toolkit';

describe('Favorite offers async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({ api: axios })];
  const mockStoreCreator = configureMockStore<RootState, PayloadAction, AppThunkDispatch>(middleware);

  type Store = ReturnType<typeof mockStoreCreator>;

  // Builds a store with the given offers preloaded into the Offers slice.
  const createStoreWithOffers = (offers: Offer[] = []): Store =>
    mockStoreCreator({
      [NameSpace.User]: {
        user: makeFakeUserData(),
        auth: {
          status: AuthorizationStatus.Auth,
        },
      },
      [NameSpace.Offers]: {
        offers,
      },
      [NameSpace.FavoriteOffers]: {
        offers: [],
      },
    });

  // Converts a boolean favorite status into the string param used in the API route.
  const toStatusParam = (status: boolean): string => String(Number(status));

  // Builds the "toggle favorite" endpoint URL for a given offer.
  const buildFavoriteStatusEndpoint = (offerId: string, status: boolean): string =>
    APIRoute.OfferFavoriteStatus
      .replace(':offerId', offerId)
      .replace(':status', toStatusParam(status));

  const getActionTypes = (store: Store): string[] =>
    store.getActions().map((action) => action.type);

  let store: Store;

  beforeEach(() => {
    store = createStoreWithOffers();
  });

  describe('fetchFavoriteOffers', () => {
    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" when server response 200', async () => {
      const mockOffers = Array.from({ length: 3 }, () => makeFakeOffer());
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, mockOffers);

      await store.dispatch(fetchFavoriteOffers());

      expect(getActionTypes(store)).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.fulfilled.type,
      ]);

      const fulfillAction = store.getActions().find(
        (action) => action.type === fetchFavoriteOffers.fulfilled.type
      );

      expect(fulfillAction?.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffers.pending" and "fetchOffers.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(401);

      await store.dispatch(fetchFavoriteOffers());

      expect(getActionTypes(store)).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.rejected.type,
      ]);
    });
  });

  describe('changeOfferFavoriteStatus', () => {
    it('should dispatch "changeStatus.pending" and "changeStatus.fulfilled" when server response 200', async () => {
      const offers = Array.from({ length: 3 }, () => makeFakeOffer());
      const favoriteOffer = offers[0];
      favoriteOffer.isFavorite = false;

      store = createStoreWithOffers(offers);

      // The server responds with OfferDetails reflecting the updated isFavorite value.
      const offerDetailsFromServer = makeFakeOfferDetails();
      offerDetailsFromServer.id = favoriteOffer.id;
      offerDetailsFromServer.isFavorite = !favoriteOffer.isFavorite;

      const endpoint = buildFavoriteStatusEndpoint(favoriteOffer.id, !favoriteOffer.isFavorite);
      mockAxiosAdapter.onPost(endpoint).reply(200, offerDetailsFromServer);

      await store.dispatch(changeOfferFavoriteStatus({
        offerId: favoriteOffer.id,
        status: !favoriteOffer.isFavorite,
      }));

      expect(getActionTypes(store)).toEqual([
        changeOfferFavoriteStatus.pending.type,
        changeOfferFavoriteStatus.fulfilled.type,
      ]);

      const fulfillAction = store.getActions().find(
        (action) => action.type === changeOfferFavoriteStatus.fulfilled.type
      );

      // The thunk should return the offer from the store merged with the updated isFavorite flag.
      expect(fulfillAction?.payload).toEqual({
        ...favoriteOffer,
        isFavorite: !favoriteOffer.isFavorite,
      });
    });

    it('should dispatch "changeStatus.pending" and "changeStatus.rejected" when server response 404', async () => {
      const offers = Array.from({ length: 3 }, () => makeFakeOffer());
      const favoriteOffer = offers[0];
      favoriteOffer.isFavorite = true;

      store = createStoreWithOffers(offers);

      const endpoint = buildFavoriteStatusEndpoint(favoriteOffer.id, !favoriteOffer.isFavorite);
      mockAxiosAdapter.onPost(endpoint).reply(404);

      await store.dispatch(changeOfferFavoriteStatus({
        offerId: favoriteOffer.id,
        status: !favoriteOffer.isFavorite,
      }));

      expect(getActionTypes(store)).toEqual([
        changeOfferFavoriteStatus.pending.type,
        changeOfferFavoriteStatus.rejected.type,
      ]);
    });
  });
});
