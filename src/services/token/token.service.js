import Api from '@/services/api.common';
import storeUtil from '@/shared/utils/localstore-util';

const END_POINT = '/api/auth/refresh';

export default {
  getNewToken(data) {
    return Api.post(END_POINT, data);
  },

  //   getNewToken(data) {
  //     return Api.post(END_POINT, data).then(res => {
  //       console.log('refreshed tokens===>', res.data);
  //       const newAccessToken = res.data.accessToken;
  //       const newRefreshToken = res.data.refreshToken;
  //       storeUtil.setItem(storeUtil.ACCESS_TOKEN_KEY, newAccessToken); // save the newly refreshed access token for other requests to use
  //       storeUtil.setItem(storeUtil.REFRESH_TOKEN_KEY, newRefreshToken);
  //       location.reload();
  //     });
  //   },

  getToken() {
    return storeUtil.getItem(storeUtil.ACCESS_TOKEN_KEY);
  },

  saveToken(accessToken) {
    storeUtil.setItem(storeUtil.ACCESS_TOKEN_KEY, accessToken);
  },

  removeToken() {
    storeUtil.removeItem(storeUtil.ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return storeUtil.getItem(storeUtil.REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    storeUtil.setItem(storeUtil.REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    storeUtil.removeItem(storeUtil.REFRESH_TOKEN_KEY);
  },
  isValidToken() {
    const accessToken = storeUtil.getItem(storeUtil.ACCESS_TOKEN_KEY);
    const refreshToken = storeUtil.getItem(storeUtil.REFRESH_TOKEN_KEY);

    if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
      return false;
    } else if (
      !refreshToken ||
      refreshToken === 'null' ||
      refreshToken === 'undefined'
    ) {
      return false;
    }

    return true;
  },
  invalidateTokens() {
    storeUtil.removeItem(storeUtil.USERNAME);
    storeUtil.removeItem(storeUtil.ACCESS_TOKEN_KEY); // save the newly refreshed access token for other requests to use
    storeUtil.removeItem(storeUtil.REFRESH_TOKEN_KEY);
    location.reload();
  },
  reloadTokens(data) {
    console.log('refreshed tokens===>', data);
    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken;
    storeUtil.setItem(storeUtil.ACCESS_TOKEN_KEY, newAccessToken); // save the newly refreshed access token for other requests to use
    storeUtil.setItem(storeUtil.REFRESH_TOKEN_KEY, newRefreshToken);
    location.reload();
  }
};
