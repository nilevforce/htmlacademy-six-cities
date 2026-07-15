import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../constants.ts';
import { UserData } from '../../types/user-data.ts';
import { AuthData } from '../../types/auth-data.ts';
import { dropToken, setToken } from '../../services/token.ts';
import {
  fetchFavoriteOffers
} from '../favorite-offers/favorite-offers-api-actions.ts';

const checkAuth = createAsyncThunk<UserData, undefined, {
  extra: {
    api: AxiosInstance;
  };
}>(
  'user/checkAuth',
  async (_arg, { extra: { api } }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

const login = createAsyncThunk<UserData, AuthData, {
  extra: {
    api: AxiosInstance;
  };
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: { api } }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password
    });

    setToken(data.token);

    dispatch(fetchFavoriteOffers());

    return data;
  }
);

const logout = createAsyncThunk<void, undefined, {
  extra: {
    api: AxiosInstance;
  };
}>(
  'user/logout',
  async (_arg, { extra: { api } }) => {
    await api.delete<UserData>(APIRoute.Logout);
    dropToken();
  }
);

export {
  checkAuth,
  login,
  logout
};
