import ApplicationApi from '@/services/application';

/**
 * Action Of Deployment Component
 */
export const getDeployments = async ({ commit }, params) => {
  const response = await ApplicationApi.deployment.getAll(params);
  let { totalElements, number, size } = response.data.data;
  if (response.status === 200) {
    commit('SET_DEPLOYMENTS', response.data.data.content);
    commit('SET_DEPLOYMENT_PAGINATION', { totalElements, number, size });
  }
};

export const createDeployment = async ({ dispatch }, data) => {
  const response = await ApplicationApi.deployment.save(data);
  if (response.status === 200) {
    dispatch('getDeployments', { page: 0, size: 10 });
  }
};

export const updateDeployment = async ({ commit }, data) => {
  const response = await ApplicationApi.deployment.update(data.id, data);
  if (response.status === 200) {
    commit('UPDATE_DEPLOYMENT', response.data.data);
  }
};

export const deleteDeployment = async ({ commit }, id) => {
  const response = await ApplicationApi.deployment.delete(id);
  if (response.status === 200) {
    commit('DELETE_DEPLOYMENT', id);
  }
};
