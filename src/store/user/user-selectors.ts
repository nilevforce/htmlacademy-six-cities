import { NameSpace } from '../../constants.ts';
import type { RootState } from '../../types/state.ts';

const getAuthStatus = (state: RootState) => state[NameSpace.User].auth.status;
const getUserEmail = (state: RootState) => state[NameSpace.User].user?.email;

export {
  getAuthStatus,
  getUserEmail
};
