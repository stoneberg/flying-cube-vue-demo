import AuthApi from '@/services/auth/auth.service.js';
import router from '@/router';

export const signin = async ({ commit }, data) => {
  const response = await AuthApi.signin(data);
  if (response.status === 200) {
    console.log('isLogin OK?====>', response.data);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    console.log('@user====>', response.data.user);
    commit('SET_USER', response.data.user);
    if (localStorage.getItem('accessToken') != null) {
      router.push({ name: 'main' });
    } else {
      router.push({ name: 'login' });
    }
  }
};

export const refresh = async ({ commit }, data) => {
  console.log('refresh>>>>>>>>>>>>>>>>>>>>>>>');
  const response = await AuthApi.signin(data);
  if (response.status === 200) {
    console.log('isLogin OK?====>', response.data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  }
};

export const signout = ({ commit }) => {
  console.log('signout>>>>>>>>>>>>>>>>>>>>>>>');
  const user = null;
  commit('DELETE_USER', user);
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  location.reload();
};
