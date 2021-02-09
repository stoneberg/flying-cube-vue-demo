import axios from 'axios';
import tokenUtil from '@/shared/utils/token-util';
import toast from '@/shared/utils/toast-service';
import store from '@/store';

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
    const accessToken = await tokenUtil.getItem('accessToken');
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
    console.error('errorResponse========>', errorResponse);
    if (isTokenExpiredError(errorResponse)) {
      return resetTokenAndReattemptRequest(error);
    } else {
      handleRestRequestError(errorResponse);
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

// Your own logic to determine if the error is due to JWT token expired returns a boolean value
function isTokenExpiredError(errorResponse) {
  const errorStatus = (errorResponse && errorResponse.status) || null;
  const errorCode = (errorResponse && errorResponse.data.code) || null;
  if (errorStatus === 401 && errorCode === 'INVALID_JWT') {
    return true;
  }
  return false;
}

// handle all request error except jwt-expired
function handleRestRequestError(errorResponse) {
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
    store.dispatch('loader', true);
    const { response: errorResponse } = error;
    const refreshToken = await tokenUtil.getItem('refreshToken'); // Your own mechanism to get the refresh token to refresh the JWT token
    if (!refreshToken) {
      // We can't refresh, throw the error anyway
      store.dispatch('loader', false);
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
      /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
        resolve(axios(errorResponse.config));
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_FC2_API}/api/auth/refresh`,
        data: {
          refreshToken: refreshToken
        }
      });

      if (!response.data) {
        store.dispatch('loader', false);
        return Promise.reject(error);
      }

      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;

      tokenUtil.setItem('accessToken', newAccessToken); // save the newly refreshed access token for other requests to use
      tokenUtil.setItem('refreshToken', newRefreshToken); // save the newly refreshed refresh token for other requests to use
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(newAccessToken);
    }
    store.dispatch('loader', false);
    return retryOriginalRequest;
  } catch (err) {
    store.dispatch('loader', false);
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(access_token) {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default Api;
