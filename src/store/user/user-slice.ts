import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../constants.ts';
import { checkAuth, login, logout } from './user-api-actions.ts';

interface UserState {
  user: {
    email: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  } | null;
  auth: {
    status: AuthorizationStatus;
  };
}

const initialState: UserState = {
  user: null,
  auth: {
    status: AuthorizationStatus.Unknown
  }
};

const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Check auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.auth.status = AuthorizationStatus.Auth;

        state.user = {
          email: action.payload.email,
          name: action.payload.name,
          avatarUrl: action.payload.avatarUrl,
          isPro: action.payload.isPro
        };
      })
      .addCase(checkAuth.rejected, (state) => {
        state.auth.status = AuthorizationStatus.NoAuth;
        state.user = null;
      })

      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.auth.status = AuthorizationStatus.Auth;

        state.user = {
          email: action.payload.email,
          name: action.payload.name,
          avatarUrl: action.payload.avatarUrl,
          isPro: action.payload.isPro
        };
      })
      .addCase(login.rejected, (state) => {
        state.auth.status = AuthorizationStatus.NoAuth;
        state.user = null;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.auth.status = AuthorizationStatus.NoAuth;
        state.user = null;
      })
});

export default userSlice;
