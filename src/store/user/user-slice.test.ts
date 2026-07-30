import { AuthorizationStatus } from '../../constants.ts';
import { makeFakeUserData } from '../../helpers/mocks.ts';
import { checkAuth, login, logout } from './user-api-actions.ts';
import userSlice from './user-slice.ts';

describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      user: null,
      auth: { status: AuthorizationStatus.Unknown }
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      user: null,
      auth: { status: AuthorizationStatus.Unknown }
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('checkAuth', () => {
    it('should set auth status and save user data when fulfilled', () => {
      const userData = makeFakeUserData();
      const initialState = {
        user: null,
        auth: { status: AuthorizationStatus.Unknown }
      };
      const expectedState = {
        auth: { status: AuthorizationStatus.Auth },
        user: {
          email: userData.email,
          name: userData.name,
          avatarUrl: userData.avatarUrl,
          isPro: userData.isPro
        }
      };

      const result = userSlice.reducer(
        initialState, checkAuth.fulfilled(userData, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set no auth status and clear user data when rejected', () => {
      const initialState = {
        user: {
          email: 'test@example.com',
          name: 'Test',
          avatarUrl: 'avatar.jpg',
          isPro: true
        },
        auth: { status: AuthorizationStatus.Auth }
      };
      const expectedState = {
        user: null,
        auth: { status: AuthorizationStatus.NoAuth }
      };

      const result = userSlice.reducer(
        initialState, checkAuth.rejected(null, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('login', () => {
    it('should set auth status and save user data when fulfilled', () => {
      const userData = makeFakeUserData();
      const authData = { email: 'test@example.com', password: 'password' };
      const initialState = {
        user: null,
        auth: { status: AuthorizationStatus.Unknown }
      };
      const expectedState = {
        auth: { status: AuthorizationStatus.Auth },
        user: {
          email: userData.email,
          name: userData.name,
          avatarUrl: userData.avatarUrl,
          isPro: userData.isPro
        }
      };

      const result = userSlice.reducer(
        initialState, login.fulfilled(userData, '', authData)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set no auth status and clear user data when rejected', () => {
      const authData = { email: 'test@example.com', password: 'password' };
      const initialState = {
        user: {
          email: 'test@example.com',
          name: 'Test',
          avatarUrl: 'avatar.jpg',
          isPro: true
        },
        auth: { status: AuthorizationStatus.Auth }
      };
      const expectedState = {
        user: null,
        auth: { status: AuthorizationStatus.NoAuth }
      };

      const result = userSlice.reducer(
        initialState, login.rejected(null, '', authData)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('logout', () => {
    it('should set no auth status and clear user data when fulfilled', () => {
      const initialState = {
        user: {
          email: 'test@example.com',
          name: 'Test',
          avatarUrl: 'avatar.jpg',
          isPro: true
        },
        auth: { status: AuthorizationStatus.Auth }
      };
      const expectedState = {
        user: null,
        auth: { status: AuthorizationStatus.NoAuth }
      };

      const result = userSlice.reducer(
        initialState, logout.fulfilled(undefined, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });
});
