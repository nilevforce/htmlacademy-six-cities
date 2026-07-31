import createAPI from '../../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import type { RootState } from '../../../types/state.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  makeFakeAuthData,
  makeFakeUserData
} from '../../../helpers/mocks.ts';
import {
  APIRoute,
  AuthorizationStatus,
  NameSpace
} from '../../../constants.ts';
import { checkAuth, login, logout } from '../user-api-actions.ts';
import * as tokenStorage from '../../../services/token.ts';

// Mock module Favorite Offers API Actions
enum FavoriteOffersActionTypes {
  fetchFavoriteOffersType = 'favoriteOffers/fetchOffers/mocked',
}

vi.mock('../../../store/favorite-offers/favorite-offers-api-actions.ts', () => ({
  fetchFavoriteOffers: vi.fn(() => ({ type: FavoriteOffersActionTypes.fetchFavoriteOffersType })),
}));

describe('User async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({ api: axios })];
  const mockStoreCreator = configureMockStore<RootState, PayloadAction, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.User]: {
        user: makeFakeUserData(),
        auth: {
          status: AuthorizationStatus.Auth
        }
      }
    });

    mockAxiosAdapter.reset();

  });

  describe('checkAuth', () => {
    it('should dispatch "checkAuth.pending" and "checkAuth.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuth());

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type
      ]);
    });

    it('should dispatch "checkAuth.pending" and "checkAuth.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuth());

      const emittedActions = store.getActions();
      const actions = emittedActions.map((action) => action.type);

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type
      ]);
    });

    describe('login', () => {
      it('should dispatch "login.pending" and "login.fulfilled" when server response 200', async () => {
        const mockAuthData = makeFakeAuthData();
        const mockServerReplay = makeFakeUserData();

        mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockServerReplay);

        await store.dispatch(login(mockAuthData));

        const emittedActions = store.getActions();
        const actions = emittedActions.map((action) => action.type);

        expect(actions).toEqual([
          login.pending.type,
          FavoriteOffersActionTypes.fetchFavoriteOffersType,
          login.fulfilled.type
        ]);
      });

      it('should call "saveToken" once with the received token', async () => {
        const mockAuthData = makeFakeAuthData();
        const mockServerReplay = makeFakeUserData();
        const mockSaveToken = vi.spyOn(tokenStorage, 'setToken');

        mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockServerReplay);

        await store.dispatch(login(mockAuthData));

        expect(mockSaveToken).toBeCalledTimes(1);
        expect(mockSaveToken).toBeCalledWith(mockServerReplay.token);
      });

      it('should dispatch "login.pending" and "login.rejected" when server response 401', async () => {
        const mockAuthData = makeFakeAuthData();

        mockAxiosAdapter.onPost(APIRoute.Login).reply(401);

        await store.dispatch(login(mockAuthData));

        const emittedActions = store.getActions();
        const actions = emittedActions.map((action) => action.type);

        expect(actions).toEqual([
          login.pending.type,
          login.rejected.type
        ]);
      });
    });

    describe('logout', () => {
      it('should dispatch "logout.pending" and "logout.fulfilled" when server response 204', async () => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

        await store.dispatch(logout());

        const emittedActions = store.getActions();
        const actions = emittedActions.map((action) => action.type);

        expect(actions).toEqual([
          logout.pending.type,
          logout.fulfilled.type
        ]);
      });

      it('should call "dropToken" once with the "logout"', async () => {
        const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

        await store.dispatch(logout());

        expect(mockDropToken).toBeCalledTimes(1);
      });

      it('should dispatch "logout.pending" and "logout.rejected" when server response 500', async () => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(500);

        await store.dispatch(logout());

        const emittedActions = store.getActions();
        const actions = emittedActions.map((action) => action.type);

        expect(actions).toEqual([
          logout.pending.type,
          logout.rejected.type
        ]);
      });
    });
  });
});
