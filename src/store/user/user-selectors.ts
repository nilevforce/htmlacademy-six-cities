import { NameSpace } from '../../constants.ts';
import { State } from '../../types/state.ts';

const getAuthStatus = (state: State) => state[NameSpace.User].auth.status;
const getUserEmail = (state: State) => state[NameSpace.User].user?.email;

export {
  getAuthStatus,
  getUserEmail
};
