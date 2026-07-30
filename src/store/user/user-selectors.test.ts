import { AuthorizationStatus, NameSpace } from '../../constants.ts';
import { makeFakeUserData } from '../../helpers/mocks.ts';
import { getAuthStatus, getUserEmail } from './user-selectors.ts';

describe('User selectors', () => {
  const state = {
    [NameSpace.User]: {
      user: makeFakeUserData(),
      auth: {
        status: AuthorizationStatus.Auth
      },
    }
  };

  it('should return user email from state', () => {
    const { email } = state[NameSpace.User].user;
    const result = getUserEmail(state);
    expect(result).toBe(email);
  });

  it('should return user auth status from state', () => {
    const { status } = state[NameSpace.User].auth;
    const result = getAuthStatus(state);
    expect(result).toBe(status);
  });
});
