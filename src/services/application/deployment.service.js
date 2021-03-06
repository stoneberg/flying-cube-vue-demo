import Api from '@/services/api.common';
import toast from '@/shared/utils/toast-service';

const END_POINT = '/api/application/deployments'; // VUE_APP_FC2_API=http://localhost:9090

// service api be used by feature.store.action
export default {
  getAll(params) {
    return Api.get(END_POINT, { params }).then(res => {
      if (res.data && res.data.message) {
        const message = res.data.message;
        toast.success(message);
      }
      return res;
    });
    //   .catch(err => {
    //     console.error('@@@err==>', err);
    //   });
  },

  get(id) {
    return Api.get(`${END_POINT}/${id}`);
  },

  save(data) {
    return Api.post(END_POINT, data);
  },

  update(id, data) {
    return Api.put(`${END_POINT}/${id}`, data);
  },

  delete(id) {
    return Api.delete(`${END_POINT}/${id}`);
  }
};
