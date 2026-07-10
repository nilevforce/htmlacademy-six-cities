const STORAGE_AUTH_TOKEN_KEY = 'six-cities-token';

const setToken = (token: string) => localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, token);
const getToken = () => localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
const dropToken = () => localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);

export {
  setToken,
  getToken,
  dropToken
};
