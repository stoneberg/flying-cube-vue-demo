import AuthApi from '@/services/auth/auth.service.js';
import UserApi from '@/services/usermgmt/usermgmt.service.js';
import router from '@/router';
import tokenUtil from '@/shared/utils/token-util';

export const signin = async ({ commit }, data) => {
  const response = await AuthApi.signin(data);
  console.log('isLogin OK?====>', response.data);
  localStorage.setItem('username', response.data.user.username);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  console.log('@user====>', response.data.user);
  commit('SET_USER', response.data.user);
  if (localStorage.getItem('accessToken') != null) {
    router.push({ name: 'main' });
  } else {
    router.push({ name: 'login' });
  }
};

export const signout = ({ commit }) => {
  const user = {};
  commit('DELETE_USER', user);
  localStorage.removeItem('username');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  location.reload();
};

export const getUser = async ({ commit }) => {
  const username = await tokenUtil.getItem('username');
  console.log('@username====>', username);
  if (username) {
    const response = await UserApi.get(username);
    commit('SET_USER', response.data.data);
  }
};
