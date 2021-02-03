import Api from '@/services/api.common';

const END_POINT = '/api/application/deployments'; // VUE_APP_FC2_API=http://localhost:9090

// service api be used by feature.store.action
export default {
  async getAll(params) {
    return Api.get(END_POINT, { params });
  },

  async get(id) {
    return Api.get(`${END_POINT}/${id}`);
  },

  async save(data) {
    return Api.post(END_POINT, data);
  },

  async update(id, data) {
    return Api.post(`${END_POINT}/${id}`, data);
  },

  async delete(id) {
    return Api.delete(`${END_POINT}/${id}`);
  }
};
