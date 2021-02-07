import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.VUE_APP_FC2_API
});

// Add a request interceptor
Api.interceptors.request.use(
  async function(config) {
    let accessToken = localStorage.getItem('accessToken');
    console.log('@accessToken=====>', accessToken);
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    };
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Api.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('@response.error====>', error.config);
    console.log('@response.error.status====>', error.response.status);
    console.log('@response.error.data====>', error.response.data);
    const originalRequest = error.config;
    const message = error.response.data.message;
    const errorStatus = error.response.status;
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('@refreshToken====>', refreshToken);

    if (errorStatus === 401 && refreshToken) {
      console.log('expired jwt #####################################');
      console.error('401 error======>', message);
      return fetchAccessToken(refreshToken, originalRequest);
    }

    if (errorStatus === 401 && !refreshToken) {
      console.log('unauthenticated ##################################');
      console.error('401 error======>', message);
    }

    return Promise.reject(error);
  }
);

async function fetchAccessToken(refreshToken, originalRequest) {
  try {
    const response = await Api.post('/api/auth/token/refresh/', {
      refreshToken: refreshToken
    });
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
    return await axios(originalRequest);
  } catch (error) {
    console.log(error);
  }
}

export default Api;
