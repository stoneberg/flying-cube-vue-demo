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
    console.log('normal response success===========>');
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
    if (isAccessTokenExpiredError(errorResponse)) {
      console.error('access token expired=======================>');
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
  console.log('1.================================================');
  try {
    console.log('2.================================================');
    const { response: errorResponse } = error;
    const refreshToken = await tokenUtil.getItem('refreshToken'); // Your own mechanism to get the refresh token to refresh the JWT token
    if (!refreshToken) {
      console.log('3.================================================');
      // We can't refresh, throw the error anyway
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    console.log('4.================================================');
    const retryOriginalRequest = new Promise(resolve => {
      /* We need to add the request retry to the queue
        since there another request that already attempt to
        refresh the token */
      console.log('5.================================================');
      addSubscriber(accessToken => {
        errorResponse.config.headers.Authorization = 'Bearer ' + accessToken;
        resolve(axios(errorResponse.config));
        console.log('18.================================================');
      });
    });

    console.log('7.================================================');
    if (!isAlreadyFetchingAccessToken) {
      console.log('8.================================================');
      isAlreadyFetchingAccessToken = true;
      const response = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_FC2_API}/api/auth/refresh`,
        data: {
          refreshToken: refreshToken
        }
      });
      console.log('9.================================================');

      if (!response.data) {
        console.log('10.================================================');
        return Promise.reject(error);
      }

      console.log('11.================================================');
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      tokenUtil.setItem('accessToken', newAccessToken); // save the newly refreshed access token for other requests to use
      tokenUtil.setItem('refreshToken', newRefreshToken);

      isAlreadyFetchingAccessToken = false;

      console.log('12.================================================');
      onAccessTokenFetched(newAccessToken);
    }
    console.log('13.================================================');
    return retryOriginalRequest;
  } catch (err) {
    console.log('14.================================================');
    console.error('refresh token expired=============>', err);
    tokenUtil.removeItem('username');
    tokenUtil.removeItem('accessToken'); // save the newly refreshed access token for other requests to use
    tokenUtil.removeItem('refreshToken');
    location.reload();
    console.log('15.================================================');
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(accessToken) {
  console.log('14.================================================');
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
  console.log('15.================================================');
}

function addSubscriber(callback) {
  console.log('16.================================================');
  subscribers.push(callback);
  console.log('17.================================================');
}

export default Api;
