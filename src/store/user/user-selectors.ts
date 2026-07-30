import { NameSpace } from '../../constants.ts';
import type { RootState } from '../../types/state.ts';

const getAuthStatus = (state: Pick<RootState, NameSpace.User>) => state[NameSpace.User].auth.status;
const getUserEmail = (state: Pick<RootState, NameSpace.User>) => state[NameSpace.User].user?.email;

export {
  getAuthStatus,
  getUserEmail
};
