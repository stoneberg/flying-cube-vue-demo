import axios from 'axios';
import storeUtil from '@/shared/utils/localstore-util';
import toast from '@/shared/utils/toast-service';
import store from '@/store';
import tokenService from '@/services/token/token.service';

const Api = axios.create({
  baseURL: process.env.VUE_APP_FC2_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
Api.interceptors.request.use(
  async function(config) {
    store.dispatch('loader', true);
    const accessToken = storeUtil.getItem(storeUtil.ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    store.dispatch('loader', false);
    return Promise.reject(error);
  }
);

// Add a response interceptor
Api.interceptors.response.use(
  function(response) {
    store.dispatch('loader', false);
    // if (response.data && response.data.message) {
    //   const message = response.data.message;
    //   toast.success(message);
    // }
    return response;
  },
  function(error) {
    store.dispatch('loader', false);
    const errorResponse = error.response;
    if (isAccessTokenExpiredError(errorResponse)) {
      return resetTokenAndReattemptRequest(error);
    } else {
      handleOtherRequestErrors(errorResponse);
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

// Your own logic to determine if the error is due to JWT token expired returns a boolean value
function isAccessTokenExpiredError(errorResponse) {
  const errorStatus = (errorResponse && errorResponse.status) || null;
  const errorCode = (errorResponse && errorResponse.data.code) || null;
  if (errorStatus === 401 && errorCode === 'INVALID_ACCESS_JWT') {
    return true;
  }
  return false;
}

// handle all request error except jwt-expired
function handleOtherRequestErrors(errorResponse) {
  const errorStatus = (errorResponse && errorResponse.status) || null;
  const errorCode = (errorResponse && errorResponse.data.code) || null;
  const errorMessage = (errorResponse && errorResponse.data.message) || null;
  console.log(errorResponse);
  console.log(errorResponse.data);
  console.error(errorStatus, errorCode);
  errorMessage && toast.error(errorMessage);
}

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

async function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error;
    const refreshToken = storeUtil.getItem(storeUtil.REFRESH_TOKEN_KEY); // Your own mechanism to get the refresh token to refresh the JWT token

    if (!refreshToken) {
      return Promise.reject(error);
    }

    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(async accessToken => {
        errorResponse.config.headers.Authorization = 'Bearer ' + accessToken;
        store.dispatch('loader', true);
        const res = await axios(errorResponse.config);
        resolve(res);
        store.dispatch('loader', false);
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      //   const response = await tokenService.getNewToken({ refreshToken });
      //   console.log('@@@@@@response====>', response);

      const response = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_FC2_API}/api/auth/refresh`,
        data: {
          refreshToken: refreshToken
        }
      });

      if (!response.data) {
        return Promise.reject(error);
      }

      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      storeUtil.setItem(storeUtil.ACCESS_TOKEN_KEY, newAccessToken); // save the newly refreshed access token for other requests to use
      storeUtil.setItem(storeUtil.REFRESH_TOKEN_KEY, newRefreshToken);

      isAlreadyFetchingAccessToken = false;

      onAccessTokenFetched(newAccessToken);
    }
    return retryOriginalRequest;
  } catch (err) {
    // Catch INVALID_REFRESH_TOKEN ERROR
    tokenService.invalidateTokens();
    // storeUtil.removeItem(storeUtil.USERNAME);
    // storeUtil.removeItem(storeUtil.ACCESS_TOKEN_KEY); // save the newly refreshed access token for other requests to use
    // storeUtil.removeItem(storeUtil.REFRESH_TOKEN_KEY);
    // location.reload();
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(accessToken) {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default Api;
