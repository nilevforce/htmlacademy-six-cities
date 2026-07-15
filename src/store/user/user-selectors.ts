import { NameSpace } from '../../constants.ts';
import { RootState } from '../../types/state.ts';

const getAuthStatus = (state: RootState) => state[NameSpace.User].auth.status;
const getUserEmail = (state: RootState) => state[NameSpace.User].user?.email;

export {
  getAuthStatus,
  getUserEmail
};
