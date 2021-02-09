import Api from '@/services/api.common';

const END_POINT = '/api/users';

export default {
  get(username) {
    return Api.get(`${END_POINT}/${username}`);
  }
};
