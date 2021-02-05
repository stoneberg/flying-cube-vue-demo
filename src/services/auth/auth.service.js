import Api from '@/services/api.common';

const END_POINT = '/api/auth'; // VUE_APP_FC2_API=http://localhost:9090

// service api be used by feature.store.action
export default {
  signin(data) {
    return Api.post(`${END_POINT}/signin`, data);
  },

  signout(username) {
    return Api.delete(`${END_POINT}/signout/${username}`);
  },
  refresh(data) {
    return Api.post(`${END_POINT}/refresh`, data);
  }
};
