const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USERNAME = 'username';

function setItem(key, value) {
  return localStorage.setItem(key, value);
}

function getItem(key) {
  return localStorage.getItem(key);
}

function removeItem(key) {
  return localStorage.removeItem(key);
}

export default {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USERNAME,
  setItem,
  getItem,
  removeItem
};
