import AuthService from '@/services/auth/auth.service.js';
import UserService from '@/services/usermgmt/usermgmt.service.js';
import router from '@/router';
import storeUtil from '@/shared/utils/localstore-util';

export const signin = async ({ commit }, data) => {
  const response = await AuthService.signin(data);
  console.log('isLogin OK?====>', response.data);
  storeUtil.setItem(storeUtil.USERNAME, response.data.user.username);
  storeUtil.setItem(storeUtil.ACCESS_TOKEN_KEY, response.data.accessToken);
  storeUtil.setItem(storeUtil.REFRESH_TOKEN_KEY, response.data.refreshToken);
  console.log('@user====>', response.data.user);
  commit('SET_USER', response.data.user);
  if (storeUtil.getItem(storeUtil.ACCESS_TOKEN_KEY) != null) {
    router.push({ name: 'main' });
  } else {
    router.push({ name: 'login' });
  }
};

export const signout = ({ commit }) => {
  const user = {};
  commit('DELETE_USER', user);
  storeUtil.removeItem(storeUtil.USERNAME);
  storeUtil.removeItem(storeUtil.ACCESS_TOKEN_KEY);
  storeUtil.removeItem(storeUtil.REFRESH_TOKEN_KEY);
  location.reload();
};

export const getUser = async ({ commit }) => {
  const username = storeUtil.getItem(storeUtil.USERNAME);
  console.log('@username====>', username);
  if (username) {
    const response = await UserService.get(username);
    commit('SET_USER', response.data.data);
  }
};
