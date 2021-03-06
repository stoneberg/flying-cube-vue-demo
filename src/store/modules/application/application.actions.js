import ApplicationService from '@/services/application';

/**
 * Action Of Deployment Component
 */
export const getDeployments = async ({ commit }, params) => {
  const response = await ApplicationService.deployment.getAll(params);
  let { totalElements, number, size } = response.data.data;
  commit('SET_DEPLOYMENTS', response.data.data.content);
  commit('SET_DEPLOYMENT_PAGINATION', { totalElements, number, size });
};

export const createDeployment = async ({ dispatch }, data) => {
  const response = await ApplicationService.deployment.save(data);
  dispatch('getDeployments', { page: 0, size: 10 });
};

export const updateDeployment = async ({ commit }, data) => {
  const response = await ApplicationService.deployment.update(data.id, data);
  commit('UPDATE_DEPLOYMENT', response.data.data);
};

export const deleteDeployment = async ({ commit }, id) => {
  const response = await ApplicationService.deployment.delete(id);
  commit('DELETE_DEPLOYMENT', id);
};
