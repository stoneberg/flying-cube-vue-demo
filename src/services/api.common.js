import axios from 'axios';
import toast from '@/shared/utils/toast-service';

const Api = axios.create({
  baseURL: process.env.VUE_APP_FC2_API
});

// Add a request interceptor
Api.interceptors.request.use(
  async function(config) {
    const accessToken = localStorage.getItem('accessToken');
    console.log('@accessToken=====>', accessToken);
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
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
    if (response.data && response.data.message) {
      const message = response.data.message;
      console.log('@@@@@@message=========>', message);
      toast.success(message);
    }
    return response;
  },
  async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('@error====>', error);
    console.log('@error.config====>', error.config);
    console.log('@error.response.status====>', error.response.status);
    console.log('@error.response.data====>', error.response.data);
    console.log('@error.response.data.code====>', error.response.data.code);
    const originalRequest = error.config;
    const errorStatus = (error.response && error.response.status) || null;
    const errorCode = error.response.data.code;
    let message = '';
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
      console.log('@@@@@@message=========>', message);
    }

    if (
      errorStatus === 401 &&
      originalRequest.url.includes('/api/auth/refresh')
    ) {
      window.location.href = `${process.env.VUE_APP_FC2_API}/login`;
      return Promise.reject(error);
    }

    if (errorStatus === 401 && errorCode === 'GE0007') {
      const refreshToken = localStorage.getItem('refreshToken');
      console.log('Token Expired #####################################');
      return fetch(`${process.env.VUE_APP_FC2_API}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log('@retry.jwt====>', res);
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          originalRequest.headers['Authorization'] =
            'Bearer ' + res.accessToken;
          return axios(originalRequest);
        });
    }

    console.log('Other Error #####################################');
    if (errorStatus === 401 && errorCode === 'GE0004') {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default Api;
